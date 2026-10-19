import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const frames = new Map();
let nextFrame = 0;
let refreshes = 0;
const gsap = { registerPlugin() {} };
const context = {
  exports: {},
  require(name) {
    if (name === 'gsap') return { default: gsap };
    if (name === 'gsap/ScrollTrigger') return { ScrollTrigger: { refresh() { refreshes++; } } };
    if (name === 'gsap/CustomEase') return { CustomEase: { create() { return () => 0; } } };
    if (name === 'gsap/TextPlugin') return { TextPlugin: {} };
    throw Error(`Unexpected module: ${name}`);
  },
  requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
  cancelAnimationFrame(id) { frames.delete(id); },
};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/gsap.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, context);

const { createScrollRefresh } = context.exports;
const prepared = [];
const first = createScrollRefresh(() => prepared.push('first'));
const second = createScrollRefresh(() => prepared.push('second'));
const flush = () => {
  const callbacks = [...frames.values()];
  frames.clear();
  callbacks.forEach(callback => callback());
};
first.refresh(); first.refresh(); second.refresh();
assert.equal(frames.size, 1);
flush();
assert.equal(refreshes, 1);
assert.deepEqual(prepared, ['first', 'second']);
first.refresh(); second.refresh(); first.dispose();
flush();
assert.equal(refreshes, 2);
assert.deepEqual(prepared, ['first', 'second', 'second']);
first.refresh();
assert.equal(frames.size, 0, 'late font/image notifications must be ignored after disposal');
second.refresh(); second.dispose();
assert.equal(frames.size, 0, 'dispose must cancel the last queued refresh');
console.log('Scroll refresh batching, preparation order, and route cleanup passed.');
