!function(){function e(e,r,t,n){Object.defineProperty(e,r,{get:t,set:n,enumerable:!0,configurable:!0})}var r="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=r.parcelRequire94c2;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var r=n[e];delete n[e];var i={id:e,exports:{}};return t[e]=i,r.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,r){n[e]=r},r.parcelRequire94c2=i),i.register("iE7OH",(function(r,t){var n,i;e(r.exports,"register",(function(){return n}),(function(e){return n=e})),e(r.exports,"resolve",(function(){return i}),(function(e){return i=e}));var o={};n=function(e){for(var r=Object.keys(e),t=0;t<r.length;t++)o[r[t]]=e[r[t]]},i=function(e){var r=o[e];if(null==r)throw new Error("Could not resolve bundle with id "+e);return r}})),i("iE7OH").register(JSON.parse('{"6VGhN":"index.54f4efb5.js","49JnA":"world.70904a2e.js"}'));var o,a,f,s,u=document.querySelector("#renderer").transferControlToOffscreen();a=function(e,r,t){if(r===self.location.origin)return e;var n=t?"import "+JSON.stringify(e)+";":"importScripts("+JSON.stringify(e)+");";return URL.createObjectURL(new Blob([n],{type:"application/javascript"}))};var c={};function l(e){return(""+e).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/,"$1")+"/"}f=function(e){var r=c[e];return r||(r=function(){try{throw new Error}catch(r){var e=(""+r.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);if(e)return l(e[2])}return"/"}(),c[e]=r),r},s=function(e){var r=(""+e).match(/(https?|file|ftp):\/\/[^/]+/);if(!r)throw new Error("Origin not found");return r[0]};var d=f("6VGhN")+i("iE7OH").resolve("49JnA");o=a(d,s(d),!1);var p=new Worker(o),w=2e6;function h(){p.postMessage({msg:"resize",width:window.innerWidth,height:window.innerHeight})}p.postMessage({msg:"offscreen",canvas:u,numparticles:w},[u]),h(),window.addEventListener("resize",h,!1);for(var g=[{width:11,id:0,data:new Uint8Array([0,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,2,0,0,2,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,3,3,3,3,0,1,0,1,1,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0,0,0,1,1,1,1,0,0,0,1,1,0,1,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,2,0,0,2,0,1,0,1,1,1,0,0,0,0,0,0,1,0,1,1,1,0,3,3,3,3,0,1,0,1,1,0,1,0,0,0,0,1,0,0,1,1,0,0,1,1,1,1,0,0,0,1,1,0,0,1,1,1,1,0,0,1,1,0])},{width:8,id:1,data:new Uint8Array([5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5])}],v=0;v<2e4;v++)g.push({width:32,id:v+2,data:new Uint8Array(1024).fill(0).map((function(){return Math.floor(7*Math.random())}))});p.postMessage({msg:"uploadTextureBatch",images:g});var b=new Float32Array(w).fill(0).map((function(e,r){return r%20002}));p.postMessage({msg:"updateAttribute",key:"textureId",data:b})}();
//# sourceMappingURL=index.54f4efb5.js.map
