function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=r.parcelRequire94c2;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,r.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){n[e]=r},r.parcelRequire94c2=i),i.register("kyEFX",(function(r,t){var n,i;e(r.exports,"register",(function(){return n}),(function(e){return n=e})),e(r.exports,"resolve",(function(){return i}),(function(e){return i=e}));var o={};n=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)o[r[t]]=e[r[t]]},i=function(e){var r=o[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),i("kyEFX").register(JSON.parse('{"9etlm":"index.3b48ef0b.js","49JnA":"world.43864821.js"}'));const o=document.querySelector("#renderer").transferControlToOffscreen();var a,s;s=function(e,r,t){if(r===self.location.origin)return e;var n=t?"import "+JSON.stringify(e)+";":"importScripts("+JSON.stringify(e)+");";return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))};let l=new URL(i("kyEFX").resolve("49JnA"),import.meta.url);a=s(l.toString(),l.origin,!0);const d=new Worker(a);function f(){d.postMessage({msg:"resize",width:window.innerWidth,height:window.innerHeight})}d.postMessage({msg:"offscreen",canvas:o,numparticles:5e3},[o]),f(),window.addEventListener("resize",f,!1);const u=[{width:11,id:50,data:new Uint8Array([0,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,2,0,0,2,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,3,3,3,3,0,1,0,1,1,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,2,0,0,2,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,3,3,3,3,0,1,0,1,1,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0])},{width:8,id:51,data:new Uint8Array([5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5])}];for(let e=0;e<0;e++)u.push({wa:32,idx:e+55,data:new Uint8Array(1024).fill(0).map((()=>Math.floor(7*Math.random())))});d.postMessage({msg:"uploadTextureBatch",images:u});const c=new Float32Array(1e4).fill(0);for(let e=0;e<5e3;e++)c.set([50+(Math.random()>.5?0:1),e],2*e);d.postMessage({msg:"updateAttribute",key:"textureId",data:c});
//# sourceMappingURL=index.3b48ef0b.js.map
