"""Run with Blender's Python (or bpy) from the repository root.

Exports only the supplied pen geometry, with neutral materials, plus a poster.
The source .blend and its branded textures are never modified.
"""
from pathlib import Path
import math
import bpy
from mathutils import Vector

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public/models"
OUT.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.open_mainfile(filepath=str(ROOT / "public/toSend/GLP-1.blend"))
for obj in list(bpy.data.objects):
    if obj.name not in {"Pen", "Glass"}:
        bpy.data.objects.remove(obj, do_unlink=True)

objects = list(bpy.context.scene.objects)
points = [obj.matrix_world @ Vector(corner) for obj in objects for corner in obj.bound_box]
low = Vector(tuple(min(p[i] for p in points) for i in range(3)))
high = Vector(tuple(max(p[i] for p in points) for i in range(3)))
center = (low + high) / 2
factor = 4 / (high.z - low.z)
for obj in objects:
    world = obj.matrix_world.copy()
    for vertex in obj.data.vertices:
        vertex.co = (world @ vertex.co - center) * factor
    obj.matrix_world.identity()

def material(name, color, roughness, metallic=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    mat.use_nodes = True
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Roughness"].default_value = roughness
    shader.inputs["Metallic"].default_value = metallic
    return mat

ivory = material("Warm ivory polymer", (.78, .80, .69), .3)
sage = material("Sage grip", (.26, .38, .25), .38)
trim = material("Brushed sage trim", (.48, .58, .4), .25, .45)
window = material("Viewing window", (.12, .20, .16), .16, .2)
for obj in objects:
    obj.data.materials.clear()
    for mat in (ivory, sage, trim, window):
        obj.data.materials.append(mat)
    for face in obj.data.polygons:
        z = sum(obj.data.vertices[i].co.z for i in face.vertices) / len(face.vertices)
        t = (z + 2) / 4
        face.material_index = 3 if obj.name == "Glass" else (1 if t < .18 or t > .85 else (2 if .18 <= t < .20 else 0))
        face.use_smooth = True

bpy.ops.object.select_all(action="DESELECT")
for obj in objects:
    obj.select_set(True)
bpy.context.view_layer.objects.active = objects[0]
bpy.ops.export_scene.gltf(filepath=str(OUT / "care-pen.glb"), export_format="GLB", use_selection=True, export_yup=True, export_animations=False, export_cameras=False, export_lights=False)

# A still of the same geometry for mobile, reduced motion, and loading/errors.
for obj in objects:
    obj.rotation_euler[1] = math.radians(-15)
bpy.ops.object.camera_add(location=(4, -10, 2.5))
camera = bpy.context.object
camera.rotation_euler = (-camera.location).to_track_quat("-Z", "Y").to_euler()
camera.data.type = "ORTHO"
camera.data.ortho_scale = 5.8
bpy.context.scene.camera = camera
def light(location, power, size):
    bpy.ops.object.light_add(type="AREA", location=location)
    obj = bpy.context.object
    obj.data.energy = power
    obj.data.shape = "DISK"
    obj.data.size = size
    obj.rotation_euler = (-obj.location).to_track_quat("-Z", "Y").to_euler()
light((-3, -4, 5), 650, 5)
light((4, -2, 1), 450, 4)
light((1, 3, 4), 850, 3)
scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.samples = 32
scene.cycles.use_denoising = True
scene.world.color = (.3, .3, .3)
scene.render.film_transparent = True
scene.render.resolution_x = 720
scene.render.resolution_y = 960
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.color_mode = "RGBA"
scene.render.image_settings.quality = 88
scene.render.filepath = str(OUT / "care-pen.webp")
bpy.ops.render.render(write_still=True)
print("Exported:", [(p.name, p.stat().st_size) for p in OUT.iterdir()])
