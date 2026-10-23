from PIL import Image,ImageDraw
from pathlib import Path
files=[p for p in Path('public').rglob('*') if p.suffix.lower() in ['.png','.jpg','.webp','.jpeg']]
Path('tmp/image-index.txt').write_text('\n'.join(str(p) for p in files))
for start in range(0,len(files),120):
 canvas=Image.new('RGB',(1200,((min(120,len(files)-start)+9)//10)*105),'#dedede'); d=ImageDraw.Draw(canvas)
 for i,p in enumerate(files[start:start+120]):
  try:
   im=Image.open(p).convert('RGBA'); im.thumbnail((115,82));x=i%10*120;y=i//10*105;canvas.paste(im,(x,y),im);d.text((x,y+84),str(start+i),fill='black')
  except: pass
 canvas.save(f'tmp/image-index-{start//120}.jpg')
print(len(files))
