function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=r.parcelRequire94c2;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,r.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){n[e]=r},r.parcelRequire94c2=i),i.register("kyEFX",(function(r,t){var n,i;e(r.exports,"register",(function(){return n}),(function(e){return n=e})),e(r.exports,"resolve",(function(){return i}),(function(e){return i=e}));var o={};n=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)o[r[t]]=e[r[t]]},i=function(e){var r=o[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),i("kyEFX").register(JSON.parse('{"jb2IM":"index.358f198b.js","9vlMp":"world.410a2542.js"}'));const o=document.querySelector("#renderer").transferControlToOffscreen();var a,s;s=function(e,r,t){if(r===self.location.origin)return e;var n=t?"import "+JSON.stringify(e)+";":"importScripts("+JSON.stringify(e)+");";return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))};let l=new URL(i("kyEFX").resolve("9vlMp"),import.meta.url);a=s(l.toString(),l.origin,!0);const d=new Worker(a);function f(){d.postMessage({msg:"resize",width:window.innerWidth,height:window.innerHeight})}d.postMessage({msg:"offscreen",canvas:o,numparticles:2e6},[o]),f(),window.addEventListener("resize",f,!1);const u=[{width:11,id:0,data:new Uint8Array([0,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,2,0,0,2,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,3,3,3,3,0,1,0,1,1,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,2,0,0,2,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,3,3,3,3,0,1,0,1,1,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0])},{width:8,id:1,data:new Uint8Array([5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5])}];for(let e=0;e<2e4;e++)u.push({width:32,id:e+2,data:new Uint8Array(1024).fill(0).map((()=>Math.floor(7*Math.random())))});d.postMessage({msg:"uploadTextureBatch",images:u});const c=new Float32Array(2e6).fill(0).map(((e,r)=>r%20002));d.postMessage({msg:"updateAttribute",key:"textureId",data:c});
//# sourceMappingURL=index.358f198b.js.map