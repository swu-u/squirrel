(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();const Nm="modulepreload",Fm=function(i,t){return new URL(i,t).href},xf={},Om=function(t,e,n){let s=Promise.resolve();if(e&&e.length>0){const r=document.getElementsByTagName("link"),a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");s=Promise.allSettled(e.map(h=>{if(h=Fm(h,n),h in xf)return;xf[h]=!0;const c=h.endsWith(".css"),f=c?'[rel="stylesheet"]':"";if(!!n)for(let p=r.length-1;p>=0;p--){const v=r[p];if(v.href===h&&(!c||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${h}"]${f}`))return;const u=document.createElement("link");if(u.rel=c?"stylesheet":Nm,c||(u.as="script"),u.crossOrigin="",u.href=h,l&&u.setAttribute("nonce",l),document.head.appendChild(u),c)return new Promise((p,v)=>{u.addEventListener("load",p),u.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(r){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=r,window.dispatchEvent(a),!a.defaultPrevented)throw r}return s.then(r=>{for(const a of r||[])a.status==="rejected"&&o(a.reason);return t().catch(o)})};/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const _u="170",Bm=0,vf=1,Vm=2,mp=1,gp=2,ro=3,_o=0,Si=1,ni=2,go=0,fa=1,ul=2,yf=3,_f=4,xp=5,fr=100,Hm=101,Gm=102,Wm=103,qm=104,Xm=200,vp=201,Ym=202,$m=203,_h=204,Fc=205,jm=206,Km=207,Zm=208,Jm=209,Qm=210,t1=211,e1=212,n1=213,i1=214,Mh=0,bh=1,wh=2,ga=3,Sh=4,Th=5,Eh=6,Ah=7,Mu=0,s1=1,o1=2,Ho=0,yp=1,_p=2,Mp=3,bu=4,r1=5,bp=6,wp=7,Mf="attached",a1="detached",Sp=300,xa=301,va=302,Ch=303,Rh=304,$c=306,fl=1e3,Ps=1001,Ph=1002,Hi=1003,l1=1004,Pl=1005,Bi=1006,p0=1007,Ls=1008,Mo=1009,Tp=1010,Ep=1011,dl=1012,wu=1013,vr=1014,gs=1015,Is=1016,Su=1017,Tu=1018,ya=1020,Ap=35902,Cp=1021,Rp=1022,bi=1023,Pp=1024,Lp=1025,da=1026,_a=1027,Eu=1028,Au=1029,Dp=1030,Cu=1031,Ru=1033,Ac=33776,Cc=33777,Rc=33778,Pc=33779,Lh=35840,Dh=35841,Ih=35842,Uh=35843,zh=36196,kh=37492,Nh=37496,Fh=37808,Oh=37809,Bh=37810,Vh=37811,Hh=37812,Gh=37813,Wh=37814,qh=37815,Xh=37816,Yh=37817,$h=37818,jh=37819,Kh=37820,Zh=37821,Lc=36492,Jh=36494,Qh=36495,Ip=36283,tu=36284,eu=36285,nu=36286,c1=3200,Up=3201,Pu=0,h1=1,co="",ti="srgb",Ta="srgb-linear",jc="linear",dn="srgb",Pr=7680,bf=519,u1=512,f1=513,d1=514,zp=515,p1=516,m1=517,g1=518,x1=519,iu=35044,fs=35048,wf="300 es",uo=2e3,Oc=2001;class Ea{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const o=s.indexOf(e);o!==-1&&s.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let o=0,r=s.length;o<r;o++)s[o].call(this,t);t.target=null}}}const ci=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],m0=Math.PI/180,su=180/Math.PI;function Us(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ci[i&255]+ci[i>>8&255]+ci[i>>16&255]+ci[i>>24&255]+"-"+ci[t&255]+ci[t>>8&255]+"-"+ci[t>>16&15|64]+ci[t>>24&255]+"-"+ci[e&63|128]+ci[e>>8&255]+"-"+ci[e>>16&255]+ci[e>>24&255]+ci[n&255]+ci[n>>8&255]+ci[n>>16&255]+ci[n>>24&255]).toLowerCase()}function ei(i,t,e){return Math.max(t,Math.min(e,i))}function v1(i,t){return(i%t+t)%t}function g0(i,t,e){return(1-e)*i+e*t}function Es(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function gn(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Dt{constructor(t=0,e=0){Dt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ei(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*s+t.x,this.y=o*s+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ke{constructor(t,e,n,s,o,r,a,l,h){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,r,a,l,h)}set(t,e,n,s,o,r,a,l,h){const c=this.elements;return c[0]=t,c[1]=s,c[2]=a,c[3]=e,c[4]=o,c[5]=l,c[6]=n,c[7]=r,c[8]=h,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,r=n[0],a=n[3],l=n[6],h=n[1],c=n[4],f=n[7],d=n[2],u=n[5],p=n[8],v=s[0],m=s[3],g=s[6],M=s[1],T=s[4],E=s[7],A=s[2],w=s[5],_=s[8];return o[0]=r*v+a*M+l*A,o[3]=r*m+a*T+l*w,o[6]=r*g+a*E+l*_,o[1]=h*v+c*M+f*A,o[4]=h*m+c*T+f*w,o[7]=h*g+c*E+f*_,o[2]=d*v+u*M+p*A,o[5]=d*m+u*T+p*w,o[8]=d*g+u*E+p*_,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],h=t[7],c=t[8];return e*r*c-e*a*h-n*o*c+n*a*l+s*o*h-s*r*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],h=t[7],c=t[8],f=c*r-a*h,d=a*l-c*o,u=h*o-r*l,p=e*f+n*d+s*u;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=f*v,t[1]=(s*h-c*n)*v,t[2]=(a*n-s*r)*v,t[3]=d*v,t[4]=(c*e-s*l)*v,t[5]=(s*o-a*e)*v,t[6]=u*v,t[7]=(n*l-h*e)*v,t[8]=(r*e-n*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,o,r,a){const l=Math.cos(o),h=Math.sin(o);return this.set(n*l,n*h,-n*(l*r+h*a)+r+t,-s*h,s*l,-s*(-h*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(x0.makeScale(t,e)),this}rotate(t){return this.premultiply(x0.makeRotation(-t)),this}translate(t,e){return this.premultiply(x0.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const x0=new Ke;function kp(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Bc(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function y1(){const i=Bc("canvas");return i.style.display="block",i}const Sf={};function Qa(i){i in Sf||(Sf[i]=!0,console.warn(i))}function _1(i,t,e){return new Promise(function(n,s){function o(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(o,e);break;default:n()}}setTimeout(o,e)})}function M1(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function b1(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const an={enabled:!0,workingColorSpace:Ta,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===dn&&(i.r=xo(i.r),i.g=xo(i.g),i.b=xo(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===dn&&(i.r=pa(i.r),i.g=pa(i.g),i.b=pa(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===co?jc:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function xo(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function pa(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}const Tf=[.64,.33,.3,.6,.15,.06],Ef=[.2126,.7152,.0722],Af=[.3127,.329],Cf=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rf=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);an.define({[Ta]:{primaries:Tf,whitePoint:Af,transfer:jc,toXYZ:Cf,fromXYZ:Rf,luminanceCoefficients:Ef,workingColorSpaceConfig:{unpackColorSpace:ti},outputColorSpaceConfig:{drawingBufferColorSpace:ti}},[ti]:{primaries:Tf,whitePoint:Af,transfer:dn,toXYZ:Cf,fromXYZ:Rf,luminanceCoefficients:Ef,outputColorSpaceConfig:{drawingBufferColorSpace:ti}}});let Lr;class w1{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Lr===void 0&&(Lr=Bc("canvas")),Lr.width=t.width,Lr.height=t.height;const n=Lr.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Lr}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Bc("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),o=s.data;for(let r=0;r<o.length;r++)o[r]=xo(o[r]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(xo(e[n]/255)*255):e[n]=xo(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let S1=0;class Np{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:S1++}),this.uuid=Us(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let o;if(Array.isArray(s)){o=[];for(let r=0,a=s.length;r<a;r++)s[r].isDataTexture?o.push(v0(s[r].image)):o.push(v0(s[r]))}else o=v0(s);n.url=o}return e||(t.images[this.uuid]=n),n}}function v0(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?w1.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let T1=0;class mi extends Ea{constructor(t=mi.DEFAULT_IMAGE,e=mi.DEFAULT_MAPPING,n=Ps,s=Ps,o=Bi,r=Ls,a=bi,l=Mo,h=mi.DEFAULT_ANISOTROPY,c=co){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:T1++}),this.uuid=Us(),this.name="",this.source=new Np(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=o,this.minFilter=r,this.anisotropy=h,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Dt(0,0),this.repeat=new Dt(1,1),this.center=new Dt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=c,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Sp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fl:t.x=t.x-Math.floor(t.x);break;case Ps:t.x=t.x<0?0:1;break;case Ph:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fl:t.y=t.y-Math.floor(t.y);break;case Ps:t.y=t.y<0?0:1;break;case Ph:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}mi.DEFAULT_IMAGE=null;mi.DEFAULT_MAPPING=Sp;mi.DEFAULT_ANISOTROPY=1;class Sn{constructor(t=0,e=0,n=0,s=1){Sn.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*s+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*s+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*s+r[15]*o,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,o;const l=t.elements,h=l[0],c=l[4],f=l[8],d=l[1],u=l[5],p=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(c-d)<.01&&Math.abs(f-v)<.01&&Math.abs(p-m)<.01){if(Math.abs(c+d)<.1&&Math.abs(f+v)<.1&&Math.abs(p+m)<.1&&Math.abs(h+u+g-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(h+1)/2,E=(u+1)/2,A=(g+1)/2,w=(c+d)/4,_=(f+v)/4,S=(p+m)/4;return T>E&&T>A?T<.01?(n=0,s=.707106781,o=.707106781):(n=Math.sqrt(T),s=w/n,o=_/n):E>A?E<.01?(n=.707106781,s=0,o=.707106781):(s=Math.sqrt(E),n=w/s,o=S/s):A<.01?(n=.707106781,s=.707106781,o=0):(o=Math.sqrt(A),n=_/o,s=S/o),this.set(n,s,o,e),this}let M=Math.sqrt((m-p)*(m-p)+(f-v)*(f-v)+(d-c)*(d-c));return Math.abs(M)<.001&&(M=1),this.x=(m-p)/M,this.y=(f-v)/M,this.z=(d-c)/M,this.w=Math.acos((h+u+g-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class E1 extends Ea{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Sn(0,0,t,e),this.scissorTest=!1,this.viewport=new Sn(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new mi(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,o=this.textures.length;s<o;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Np(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ns extends E1{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Fp extends mi{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Hi,this.minFilter=Hi,this.wrapR=Ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class A1 extends mi{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Hi,this.minFilter=Hi,this.wrapR=Ps,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ti{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,o,r,a){let l=n[s+0],h=n[s+1],c=n[s+2],f=n[s+3];const d=o[r+0],u=o[r+1],p=o[r+2],v=o[r+3];if(a===0){t[e+0]=l,t[e+1]=h,t[e+2]=c,t[e+3]=f;return}if(a===1){t[e+0]=d,t[e+1]=u,t[e+2]=p,t[e+3]=v;return}if(f!==v||l!==d||h!==u||c!==p){let m=1-a;const g=l*d+h*u+c*p+f*v,M=g>=0?1:-1,T=1-g*g;if(T>Number.EPSILON){const A=Math.sqrt(T),w=Math.atan2(A,g*M);m=Math.sin(m*w)/A,a=Math.sin(a*w)/A}const E=a*M;if(l=l*m+d*E,h=h*m+u*E,c=c*m+p*E,f=f*m+v*E,m===1-a){const A=1/Math.sqrt(l*l+h*h+c*c+f*f);l*=A,h*=A,c*=A,f*=A}}t[e]=l,t[e+1]=h,t[e+2]=c,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,s,o,r){const a=n[s],l=n[s+1],h=n[s+2],c=n[s+3],f=o[r],d=o[r+1],u=o[r+2],p=o[r+3];return t[e]=a*p+c*f+l*u-h*d,t[e+1]=l*p+c*d+h*f-a*u,t[e+2]=h*p+c*u+a*d-l*f,t[e+3]=c*p-a*f-l*d-h*u,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,o=t._z,r=t._order,a=Math.cos,l=Math.sin,h=a(n/2),c=a(s/2),f=a(o/2),d=l(n/2),u=l(s/2),p=l(o/2);switch(r){case"XYZ":this._x=d*c*f+h*u*p,this._y=h*u*f-d*c*p,this._z=h*c*p+d*u*f,this._w=h*c*f-d*u*p;break;case"YXZ":this._x=d*c*f+h*u*p,this._y=h*u*f-d*c*p,this._z=h*c*p-d*u*f,this._w=h*c*f+d*u*p;break;case"ZXY":this._x=d*c*f-h*u*p,this._y=h*u*f+d*c*p,this._z=h*c*p+d*u*f,this._w=h*c*f-d*u*p;break;case"ZYX":this._x=d*c*f-h*u*p,this._y=h*u*f+d*c*p,this._z=h*c*p-d*u*f,this._w=h*c*f+d*u*p;break;case"YZX":this._x=d*c*f+h*u*p,this._y=h*u*f+d*c*p,this._z=h*c*p-d*u*f,this._w=h*c*f-d*u*p;break;case"XZY":this._x=d*c*f-h*u*p,this._y=h*u*f-d*c*p,this._z=h*c*p+d*u*f,this._w=h*c*f+d*u*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],o=e[8],r=e[1],a=e[5],l=e[9],h=e[2],c=e[6],f=e[10],d=n+a+f;if(d>0){const u=.5/Math.sqrt(d+1);this._w=.25/u,this._x=(c-l)*u,this._y=(o-h)*u,this._z=(r-s)*u}else if(n>a&&n>f){const u=2*Math.sqrt(1+n-a-f);this._w=(c-l)/u,this._x=.25*u,this._y=(s+r)/u,this._z=(o+h)/u}else if(a>f){const u=2*Math.sqrt(1+a-n-f);this._w=(o-h)/u,this._x=(s+r)/u,this._y=.25*u,this._z=(l+c)/u}else{const u=2*Math.sqrt(1+f-n-a);this._w=(r-s)/u,this._x=(o+h)/u,this._y=(l+c)/u,this._z=.25*u}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ei(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,o=t._z,r=t._w,a=e._x,l=e._y,h=e._z,c=e._w;return this._x=n*c+r*a+s*h-o*l,this._y=s*c+r*l+o*a-n*h,this._z=o*c+r*h+n*l-s*a,this._w=r*c-n*a-s*l-o*h,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+s*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=s,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const u=1-e;return this._w=u*r+e*this._w,this._x=u*n+e*this._x,this._y=u*s+e*this._y,this._z=u*o+e*this._z,this.normalize(),this}const h=Math.sqrt(l),c=Math.atan2(h,a),f=Math.sin((1-e)*c)/h,d=Math.sin(e*c)/h;return this._w=r*f+this._w*d,this._x=n*f+this._x*d,this._y=s*f+this._y*d,this._z=o*f+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(t=0,e=0,n=0){k.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Pf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Pf.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*s,this.y=o[1]*e+o[4]*n+o[7]*s,this.z=o[2]*e+o[5]*n+o[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*s+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*s+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*s+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*s+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,o=t.x,r=t.y,a=t.z,l=t.w,h=2*(r*s-a*n),c=2*(a*e-o*s),f=2*(o*n-r*e);return this.x=e+l*h+r*f-a*c,this.y=n+l*c+a*h-o*f,this.z=s+l*f+o*c-r*h,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*s,this.y=o[1]*e+o[5]*n+o[9]*s,this.z=o[2]*e+o[6]*n+o[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,o=t.z,r=e.x,a=e.y,l=e.z;return this.x=s*l-o*a,this.y=o*r-n*l,this.z=n*a-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return y0.copy(this).projectOnVector(t),this.sub(y0)}reflect(t){return this.sub(y0.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ei(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const y0=new k,Pf=new Ti;class ks{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(os.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(os.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=os.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,os):os.fromBufferAttribute(o,r),os.applyMatrix4(t.matrixWorld),this.expandByPoint(os);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ll.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ll.copy(n.boundingBox)),Ll.applyMatrix4(t.matrixWorld),this.union(Ll)}const s=t.children;for(let o=0,r=s.length;o<r;o++)this.expandByObject(s[o],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,os),os.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ka),Dl.subVectors(this.max,ka),Dr.subVectors(t.a,ka),Ir.subVectors(t.b,ka),Ur.subVectors(t.c,ka),Eo.subVectors(Ir,Dr),Ao.subVectors(Ur,Ir),jo.subVectors(Dr,Ur);let e=[0,-Eo.z,Eo.y,0,-Ao.z,Ao.y,0,-jo.z,jo.y,Eo.z,0,-Eo.x,Ao.z,0,-Ao.x,jo.z,0,-jo.x,-Eo.y,Eo.x,0,-Ao.y,Ao.x,0,-jo.y,jo.x,0];return!_0(e,Dr,Ir,Ur,Dl)||(e=[1,0,0,0,1,0,0,0,1],!_0(e,Dr,Ir,Ur,Dl))?!1:(Il.crossVectors(Eo,Ao),e=[Il.x,Il.y,Il.z],_0(e,Dr,Ir,Ur,Dl))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,os).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(os).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Js[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Js[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Js[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Js[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Js[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Js[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Js[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Js[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Js),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Js=[new k,new k,new k,new k,new k,new k,new k,new k],os=new k,Ll=new ks,Dr=new k,Ir=new k,Ur=new k,Eo=new k,Ao=new k,jo=new k,ka=new k,Dl=new k,Il=new k,Ko=new k;function _0(i,t,e,n,s){for(let o=0,r=i.length-3;o<=r;o+=3){Ko.fromArray(i,o);const a=s.x*Math.abs(Ko.x)+s.y*Math.abs(Ko.y)+s.z*Math.abs(Ko.z),l=t.dot(Ko),h=e.dot(Ko),c=n.dot(Ko);if(Math.max(-Math.max(l,h,c),Math.min(l,h,c))>a)return!1}return!0}const C1=new ks,Na=new k,M0=new k;class bo{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):C1.setFromPoints(t).getCenter(n);let s=0;for(let o=0,r=t.length;o<r;o++)s=Math.max(s,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Na.subVectors(t,this.center);const e=Na.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(Na,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(M0.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Na.copy(t.center).add(M0)),this.expandByPoint(Na.copy(t.center).sub(M0))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qs=new k,b0=new k,Ul=new k,Co=new k,w0=new k,zl=new k,S0=new k;class Op{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qs)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Qs.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qs.copy(this.origin).addScaledVector(this.direction,e),Qs.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){b0.copy(t).add(e).multiplyScalar(.5),Ul.copy(e).sub(t).normalize(),Co.copy(this.origin).sub(b0);const o=t.distanceTo(e)*.5,r=-this.direction.dot(Ul),a=Co.dot(this.direction),l=-Co.dot(Ul),h=Co.lengthSq(),c=Math.abs(1-r*r);let f,d,u,p;if(c>0)if(f=r*l-a,d=r*a-l,p=o*c,f>=0)if(d>=-p)if(d<=p){const v=1/c;f*=v,d*=v,u=f*(f+r*d+2*a)+d*(r*f+d+2*l)+h}else d=o,f=Math.max(0,-(r*d+a)),u=-f*f+d*(d+2*l)+h;else d=-o,f=Math.max(0,-(r*d+a)),u=-f*f+d*(d+2*l)+h;else d<=-p?(f=Math.max(0,-(-r*o+a)),d=f>0?-o:Math.min(Math.max(-o,-l),o),u=-f*f+d*(d+2*l)+h):d<=p?(f=0,d=Math.min(Math.max(-o,-l),o),u=d*(d+2*l)+h):(f=Math.max(0,-(r*o+a)),d=f>0?o:Math.min(Math.max(-o,-l),o),u=-f*f+d*(d+2*l)+h);else d=r>0?-o:o,f=Math.max(0,-(r*d+a)),u=-f*f+d*(d+2*l)+h;return n&&n.copy(this.origin).addScaledVector(this.direction,f),s&&s.copy(b0).addScaledVector(Ul,d),u}intersectSphere(t,e){Qs.subVectors(t.center,this.origin);const n=Qs.dot(this.direction),s=Qs.dot(Qs)-n*n,o=t.radius*t.radius;if(s>o)return null;const r=Math.sqrt(o-s),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,o,r,a,l;const h=1/this.direction.x,c=1/this.direction.y,f=1/this.direction.z,d=this.origin;return h>=0?(n=(t.min.x-d.x)*h,s=(t.max.x-d.x)*h):(n=(t.max.x-d.x)*h,s=(t.min.x-d.x)*h),c>=0?(o=(t.min.y-d.y)*c,r=(t.max.y-d.y)*c):(o=(t.max.y-d.y)*c,r=(t.min.y-d.y)*c),n>r||o>s||((o>n||isNaN(n))&&(n=o),(r<s||isNaN(s))&&(s=r),f>=0?(a=(t.min.z-d.z)*f,l=(t.max.z-d.z)*f):(a=(t.max.z-d.z)*f,l=(t.min.z-d.z)*f),n>l||a>s)||((a>n||n!==n)&&(n=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,Qs)!==null}intersectTriangle(t,e,n,s,o){w0.subVectors(e,t),zl.subVectors(n,t),S0.crossVectors(w0,zl);let r=this.direction.dot(S0),a;if(r>0){if(s)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Co.subVectors(this.origin,t);const l=a*this.direction.dot(zl.crossVectors(Co,zl));if(l<0)return null;const h=a*this.direction.dot(w0.cross(Co));if(h<0||l+h>r)return null;const c=-a*Co.dot(S0);return c<0?null:this.at(c/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qe{constructor(t,e,n,s,o,r,a,l,h,c,f,d,u,p,v,m){qe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,o,r,a,l,h,c,f,d,u,p,v,m)}set(t,e,n,s,o,r,a,l,h,c,f,d,u,p,v,m){const g=this.elements;return g[0]=t,g[4]=e,g[8]=n,g[12]=s,g[1]=o,g[5]=r,g[9]=a,g[13]=l,g[2]=h,g[6]=c,g[10]=f,g[14]=d,g[3]=u,g[7]=p,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qe().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/zr.setFromMatrixColumn(t,0).length(),o=1/zr.setFromMatrixColumn(t,1).length(),r=1/zr.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(s),h=Math.sin(s),c=Math.cos(o),f=Math.sin(o);if(t.order==="XYZ"){const d=r*c,u=r*f,p=a*c,v=a*f;e[0]=l*c,e[4]=-l*f,e[8]=h,e[1]=u+p*h,e[5]=d-v*h,e[9]=-a*l,e[2]=v-d*h,e[6]=p+u*h,e[10]=r*l}else if(t.order==="YXZ"){const d=l*c,u=l*f,p=h*c,v=h*f;e[0]=d+v*a,e[4]=p*a-u,e[8]=r*h,e[1]=r*f,e[5]=r*c,e[9]=-a,e[2]=u*a-p,e[6]=v+d*a,e[10]=r*l}else if(t.order==="ZXY"){const d=l*c,u=l*f,p=h*c,v=h*f;e[0]=d-v*a,e[4]=-r*f,e[8]=p+u*a,e[1]=u+p*a,e[5]=r*c,e[9]=v-d*a,e[2]=-r*h,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const d=r*c,u=r*f,p=a*c,v=a*f;e[0]=l*c,e[4]=p*h-u,e[8]=d*h+v,e[1]=l*f,e[5]=v*h+d,e[9]=u*h-p,e[2]=-h,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const d=r*l,u=r*h,p=a*l,v=a*h;e[0]=l*c,e[4]=v-d*f,e[8]=p*f+u,e[1]=f,e[5]=r*c,e[9]=-a*c,e[2]=-h*c,e[6]=u*f+p,e[10]=d-v*f}else if(t.order==="XZY"){const d=r*l,u=r*h,p=a*l,v=a*h;e[0]=l*c,e[4]=-f,e[8]=h*c,e[1]=d*f+v,e[5]=r*c,e[9]=u*f-p,e[2]=p*f-u,e[6]=a*c,e[10]=v*f+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(R1,t,P1)}lookAt(t,e,n){const s=this.elements;return ki.subVectors(t,e),ki.lengthSq()===0&&(ki.z=1),ki.normalize(),Ro.crossVectors(n,ki),Ro.lengthSq()===0&&(Math.abs(n.z)===1?ki.x+=1e-4:ki.z+=1e-4,ki.normalize(),Ro.crossVectors(n,ki)),Ro.normalize(),kl.crossVectors(ki,Ro),s[0]=Ro.x,s[4]=kl.x,s[8]=ki.x,s[1]=Ro.y,s[5]=kl.y,s[9]=ki.y,s[2]=Ro.z,s[6]=kl.z,s[10]=ki.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,o=this.elements,r=n[0],a=n[4],l=n[8],h=n[12],c=n[1],f=n[5],d=n[9],u=n[13],p=n[2],v=n[6],m=n[10],g=n[14],M=n[3],T=n[7],E=n[11],A=n[15],w=s[0],_=s[4],S=s[8],x=s[12],y=s[1],b=s[5],C=s[9],L=s[13],R=s[2],U=s[6],I=s[10],X=s[14],Y=s[3],st=s[7],bt=s[11],St=s[15];return o[0]=r*w+a*y+l*R+h*Y,o[4]=r*_+a*b+l*U+h*st,o[8]=r*S+a*C+l*I+h*bt,o[12]=r*x+a*L+l*X+h*St,o[1]=c*w+f*y+d*R+u*Y,o[5]=c*_+f*b+d*U+u*st,o[9]=c*S+f*C+d*I+u*bt,o[13]=c*x+f*L+d*X+u*St,o[2]=p*w+v*y+m*R+g*Y,o[6]=p*_+v*b+m*U+g*st,o[10]=p*S+v*C+m*I+g*bt,o[14]=p*x+v*L+m*X+g*St,o[3]=M*w+T*y+E*R+A*Y,o[7]=M*_+T*b+E*U+A*st,o[11]=M*S+T*C+E*I+A*bt,o[15]=M*x+T*L+E*X+A*St,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],o=t[12],r=t[1],a=t[5],l=t[9],h=t[13],c=t[2],f=t[6],d=t[10],u=t[14],p=t[3],v=t[7],m=t[11],g=t[15];return p*(+o*l*f-s*h*f-o*a*d+n*h*d+s*a*u-n*l*u)+v*(+e*l*u-e*h*d+o*r*d-s*r*u+s*h*c-o*l*c)+m*(+e*h*f-e*a*u-o*r*f+n*r*u+o*a*c-n*h*c)+g*(-s*a*c-e*l*f+e*a*d+s*r*f-n*r*d+n*l*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],o=t[3],r=t[4],a=t[5],l=t[6],h=t[7],c=t[8],f=t[9],d=t[10],u=t[11],p=t[12],v=t[13],m=t[14],g=t[15],M=f*m*h-v*d*h+v*l*u-a*m*u-f*l*g+a*d*g,T=p*d*h-c*m*h-p*l*u+r*m*u+c*l*g-r*d*g,E=c*v*h-p*f*h+p*a*u-r*v*u-c*a*g+r*f*g,A=p*f*l-c*v*l-p*a*d+r*v*d+c*a*m-r*f*m,w=e*M+n*T+s*E+o*A;if(w===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const _=1/w;return t[0]=M*_,t[1]=(v*d*o-f*m*o-v*s*u+n*m*u+f*s*g-n*d*g)*_,t[2]=(a*m*o-v*l*o+v*s*h-n*m*h-a*s*g+n*l*g)*_,t[3]=(f*l*o-a*d*o-f*s*h+n*d*h+a*s*u-n*l*u)*_,t[4]=T*_,t[5]=(c*m*o-p*d*o+p*s*u-e*m*u-c*s*g+e*d*g)*_,t[6]=(p*l*o-r*m*o-p*s*h+e*m*h+r*s*g-e*l*g)*_,t[7]=(r*d*o-c*l*o+c*s*h-e*d*h-r*s*u+e*l*u)*_,t[8]=E*_,t[9]=(p*f*o-c*v*o-p*n*u+e*v*u+c*n*g-e*f*g)*_,t[10]=(r*v*o-p*a*o+p*n*h-e*v*h-r*n*g+e*a*g)*_,t[11]=(c*a*o-r*f*o-c*n*h+e*f*h+r*n*u-e*a*u)*_,t[12]=A*_,t[13]=(c*v*s-p*f*s+p*n*d-e*v*d-c*n*m+e*f*m)*_,t[14]=(p*a*s-r*v*s-p*n*l+e*v*l+r*n*m-e*a*m)*_,t[15]=(r*f*s-c*a*s+c*n*l-e*f*l-r*n*d+e*a*d)*_,this}scale(t){const e=this.elements,n=t.x,s=t.y,o=t.z;return e[0]*=n,e[4]*=s,e[8]*=o,e[1]*=n,e[5]*=s,e[9]*=o,e[2]*=n,e[6]*=s,e[10]*=o,e[3]*=n,e[7]*=s,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),o=1-n,r=t.x,a=t.y,l=t.z,h=o*r,c=o*a;return this.set(h*r+n,h*a-s*l,h*l+s*a,0,h*a+s*l,c*a+n,c*l-s*r,0,h*l-s*a,c*l+s*r,o*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,o,r){return this.set(1,n,o,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,o=e._x,r=e._y,a=e._z,l=e._w,h=o+o,c=r+r,f=a+a,d=o*h,u=o*c,p=o*f,v=r*c,m=r*f,g=a*f,M=l*h,T=l*c,E=l*f,A=n.x,w=n.y,_=n.z;return s[0]=(1-(v+g))*A,s[1]=(u+E)*A,s[2]=(p-T)*A,s[3]=0,s[4]=(u-E)*w,s[5]=(1-(d+g))*w,s[6]=(m+M)*w,s[7]=0,s[8]=(p+T)*_,s[9]=(m-M)*_,s[10]=(1-(d+v))*_,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let o=zr.set(s[0],s[1],s[2]).length();const r=zr.set(s[4],s[5],s[6]).length(),a=zr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(o=-o),t.x=s[12],t.y=s[13],t.z=s[14],rs.copy(this);const h=1/o,c=1/r,f=1/a;return rs.elements[0]*=h,rs.elements[1]*=h,rs.elements[2]*=h,rs.elements[4]*=c,rs.elements[5]*=c,rs.elements[6]*=c,rs.elements[8]*=f,rs.elements[9]*=f,rs.elements[10]*=f,e.setFromRotationMatrix(rs),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,s,o,r,a=uo){const l=this.elements,h=2*o/(e-t),c=2*o/(n-s),f=(e+t)/(e-t),d=(n+s)/(n-s);let u,p;if(a===uo)u=-(r+o)/(r-o),p=-2*r*o/(r-o);else if(a===Oc)u=-r/(r-o),p=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=h,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=c,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=u,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,o,r,a=uo){const l=this.elements,h=1/(e-t),c=1/(n-s),f=1/(r-o),d=(e+t)*h,u=(n+s)*c;let p,v;if(a===uo)p=(r+o)*f,v=-2*f;else if(a===Oc)p=o*f,v=-1*f;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*h,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*c,l[9]=0,l[13]=-u,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const zr=new k,rs=new qe,R1=new k(0,0,0),P1=new k(1,1,1),Ro=new k,kl=new k,ki=new k,Lf=new qe,Df=new Ti;class Ei{constructor(t=0,e=0,n=0,s=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,o=s[0],r=s[4],a=s[8],l=s[1],h=s[5],c=s[9],f=s[2],d=s[6],u=s[10];switch(e){case"XYZ":this._y=Math.asin(ei(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-c,u),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(d,h),this._z=0);break;case"YXZ":this._x=Math.asin(-ei(c,-1,1)),Math.abs(c)<.9999999?(this._y=Math.atan2(a,u),this._z=Math.atan2(l,h)):(this._y=Math.atan2(-f,o),this._z=0);break;case"ZXY":this._x=Math.asin(ei(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,u),this._z=Math.atan2(-r,h)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-ei(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,u),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,h));break;case"YZX":this._z=Math.asin(ei(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-c,h),this._y=Math.atan2(-f,o)):(this._x=0,this._y=Math.atan2(a,u));break;case"XZY":this._z=Math.asin(-ei(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,h),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-c,u),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Lf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Lf,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Df.setFromEuler(this),this.setFromQuaternion(Df,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class Bp{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let L1=0;const If=new k,kr=new Ti,to=new qe,Nl=new k,Fa=new k,D1=new k,I1=new Ti,Uf=new k(1,0,0),zf=new k(0,1,0),kf=new k(0,0,1),Nf={type:"added"},U1={type:"removed"},Nr={type:"childadded",child:null},T0={type:"childremoved",child:null};class Nn extends Ea{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:L1++}),this.uuid=Us(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Nn.DEFAULT_UP.clone();const t=new k,e=new Ei,n=new Ti,s=new k(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qe},normalMatrix:{value:new Ke}}),this.matrix=new qe,this.matrixWorld=new qe,this.matrixAutoUpdate=Nn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Bp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return kr.setFromAxisAngle(t,e),this.quaternion.multiply(kr),this}rotateOnWorldAxis(t,e){return kr.setFromAxisAngle(t,e),this.quaternion.premultiply(kr),this}rotateX(t){return this.rotateOnAxis(Uf,t)}rotateY(t){return this.rotateOnAxis(zf,t)}rotateZ(t){return this.rotateOnAxis(kf,t)}translateOnAxis(t,e){return If.copy(t).applyQuaternion(this.quaternion),this.position.add(If.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uf,t)}translateY(t){return this.translateOnAxis(zf,t)}translateZ(t){return this.translateOnAxis(kf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(to.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Nl.copy(t):Nl.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Fa.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?to.lookAt(Fa,Nl,this.up):to.lookAt(Nl,Fa,this.up),this.quaternion.setFromRotationMatrix(to),s&&(to.extractRotation(s.matrixWorld),kr.setFromRotationMatrix(to),this.quaternion.premultiply(kr.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Nf),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(U1),T0.child=t,this.dispatchEvent(T0),T0.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),to.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),to.multiply(t.parent.matrixWorld)),t.applyMatrix4(to),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Nf),Nr.child=t,this.dispatchEvent(Nr),Nr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fa,t,D1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fa,I1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let o=0,r=s.length;o<r;o++)s[o].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let h=0,c=l.length;h<c;h++){const f=l[h];o(t.shapes,f)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,h=this.material.length;l<h;l++)a.push(o(t.materials,this.material[l]));s.material=a}else s.material=o(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(o(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),h=r(t.textures),c=r(t.images),f=r(t.shapes),d=r(t.skeletons),u=r(t.animations),p=r(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),h.length>0&&(n.textures=h),c.length>0&&(n.images=c),f.length>0&&(n.shapes=f),d.length>0&&(n.skeletons=d),u.length>0&&(n.animations=u),p.length>0&&(n.nodes=p)}return n.object=s,n;function r(a){const l=[];for(const h in a){const c=a[h];delete c.metadata,l.push(c)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}Nn.DEFAULT_UP=new k(0,1,0);Nn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Nn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const as=new k,eo=new k,E0=new k,no=new k,Fr=new k,Or=new k,Ff=new k,A0=new k,C0=new k,R0=new k,P0=new Sn,L0=new Sn,D0=new Sn;class es{constructor(t=new k,e=new k,n=new k){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),as.subVectors(t,e),s.cross(as);const o=s.lengthSq();return o>0?s.multiplyScalar(1/Math.sqrt(o)):s.set(0,0,0)}static getBarycoord(t,e,n,s,o){as.subVectors(s,e),eo.subVectors(n,e),E0.subVectors(t,e);const r=as.dot(as),a=as.dot(eo),l=as.dot(E0),h=eo.dot(eo),c=eo.dot(E0),f=r*h-a*a;if(f===0)return o.set(0,0,0),null;const d=1/f,u=(h*l-a*c)*d,p=(r*c-a*l)*d;return o.set(1-u-p,p,u)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,no)===null?!1:no.x>=0&&no.y>=0&&no.x+no.y<=1}static getInterpolation(t,e,n,s,o,r,a,l){return this.getBarycoord(t,e,n,s,no)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,no.x),l.addScaledVector(r,no.y),l.addScaledVector(a,no.z),l)}static getInterpolatedAttribute(t,e,n,s,o,r){return P0.setScalar(0),L0.setScalar(0),D0.setScalar(0),P0.fromBufferAttribute(t,e),L0.fromBufferAttribute(t,n),D0.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(P0,o.x),r.addScaledVector(L0,o.y),r.addScaledVector(D0,o.z),r}static isFrontFacing(t,e,n,s){return as.subVectors(n,e),eo.subVectors(t,e),as.cross(eo).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return as.subVectors(this.c,this.b),eo.subVectors(this.a,this.b),as.cross(eo).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return es.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return es.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,o){return es.getInterpolation(t,this.a,this.b,this.c,e,n,s,o)}containsPoint(t){return es.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return es.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,o=this.c;let r,a;Fr.subVectors(s,n),Or.subVectors(o,n),A0.subVectors(t,n);const l=Fr.dot(A0),h=Or.dot(A0);if(l<=0&&h<=0)return e.copy(n);C0.subVectors(t,s);const c=Fr.dot(C0),f=Or.dot(C0);if(c>=0&&f<=c)return e.copy(s);const d=l*f-c*h;if(d<=0&&l>=0&&c<=0)return r=l/(l-c),e.copy(n).addScaledVector(Fr,r);R0.subVectors(t,o);const u=Fr.dot(R0),p=Or.dot(R0);if(p>=0&&u<=p)return e.copy(o);const v=u*h-l*p;if(v<=0&&h>=0&&p<=0)return a=h/(h-p),e.copy(n).addScaledVector(Or,a);const m=c*p-u*f;if(m<=0&&f-c>=0&&u-p>=0)return Ff.subVectors(o,s),a=(f-c)/(f-c+(u-p)),e.copy(s).addScaledVector(Ff,a);const g=1/(m+v+d);return r=v*g,a=d*g,e.copy(n).addScaledVector(Fr,r).addScaledVector(Or,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Vp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Po={h:0,s:0,l:0},Fl={h:0,s:0,l:0};function I0(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class ge{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ti){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,an.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=an.workingColorSpace){return this.r=t,this.g=e,this.b=n,an.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=an.workingColorSpace){if(t=v1(t,1),e=ei(e,0,1),n=ei(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=I0(r,o,t+1/3),this.g=I0(r,o,t),this.b=I0(r,o,t-1/3)}return an.toWorkingColorSpace(this,s),this}setStyle(t,e=ti){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=s[1],a=s[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=s[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ti){const n=Vp[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=xo(t.r),this.g=xo(t.g),this.b=xo(t.b),this}copyLinearToSRGB(t){return this.r=pa(t.r),this.g=pa(t.g),this.b=pa(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ti){return an.fromWorkingColorSpace(hi.copy(this),t),Math.round(ei(hi.r*255,0,255))*65536+Math.round(ei(hi.g*255,0,255))*256+Math.round(ei(hi.b*255,0,255))}getHexString(t=ti){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=an.workingColorSpace){an.fromWorkingColorSpace(hi.copy(this),e);const n=hi.r,s=hi.g,o=hi.b,r=Math.max(n,s,o),a=Math.min(n,s,o);let l,h;const c=(a+r)/2;if(a===r)l=0,h=0;else{const f=r-a;switch(h=c<=.5?f/(r+a):f/(2-r-a),r){case n:l=(s-o)/f+(s<o?6:0);break;case s:l=(o-n)/f+2;break;case o:l=(n-s)/f+4;break}l/=6}return t.h=l,t.s=h,t.l=c,t}getRGB(t,e=an.workingColorSpace){return an.fromWorkingColorSpace(hi.copy(this),e),t.r=hi.r,t.g=hi.g,t.b=hi.b,t}getStyle(t=ti){an.fromWorkingColorSpace(hi.copy(this),t);const e=hi.r,n=hi.g,s=hi.b;return t!==ti?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Po),this.setHSL(Po.h+t,Po.s+e,Po.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Po),t.getHSL(Fl);const n=g0(Po.h,Fl.h,e),s=g0(Po.s,Fl.s,e),o=g0(Po.l,Fl.l,e);return this.setHSL(n,s,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*s,this.g=o[1]*e+o[4]*n+o[7]*s,this.b=o[2]*e+o[5]*n+o[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const hi=new ge;ge.NAMES=Vp;let z1=0;class _r extends Ea{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:z1++}),this.uuid=Us(),this.name="",this.blending=fa,this.side=_o,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_h,this.blendDst=Fc,this.blendEquation=fr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ge(0,0,0),this.blendAlpha=0,this.depthFunc=ga,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=bf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pr,this.stencilZFail=Pr,this.stencilZPass=Pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==fa&&(n.blending=this.blending),this.side!==_o&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==_h&&(n.blendSrc=this.blendSrc),this.blendDst!==Fc&&(n.blendDst=this.blendDst),this.blendEquation!==fr&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ga&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==bf&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Pr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Pr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Pr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(e){const o=s(t.textures),r=s(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let o=0;o!==s;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Kc extends _r{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Mu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Vn=new k,Ol=new Dt;class cn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=iu,this.updateRanges=[],this.gpuType=gs,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,o=this.itemSize;s<o;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ol.fromBufferAttribute(this,e),Ol.applyMatrix3(t),this.setXY(e,Ol.x,Ol.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Vn.fromBufferAttribute(this,e),Vn.applyMatrix3(t),this.setXYZ(e,Vn.x,Vn.y,Vn.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Vn.fromBufferAttribute(this,e),Vn.applyMatrix4(t),this.setXYZ(e,Vn.x,Vn.y,Vn.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Vn.fromBufferAttribute(this,e),Vn.applyNormalMatrix(t),this.setXYZ(e,Vn.x,Vn.y,Vn.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Vn.fromBufferAttribute(this,e),Vn.transformDirection(t),this.setXYZ(e,Vn.x,Vn.y,Vn.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=gn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Es(e,this.array)),e}setX(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Es(e,this.array)),e}setY(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Es(e,this.array)),e}setZ(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Es(e,this.array)),e}setW(t,e){return this.normalized&&(e=gn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array),s=gn(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t*=this.itemSize,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array),s=gn(s,this.array),o=gn(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==iu&&(t.usage=this.usage),t}}class Lu extends cn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Du extends cn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ce extends cn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let k1=0;const $i=new qe,U0=new Nn,Br=new k,Ni=new ks,Oa=new ks,Zn=new k;class bn extends Ea{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:k1++}),this.uuid=Us(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(kp(t)?Du:Lu)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Ke().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return $i.makeRotationFromQuaternion(t),this.applyMatrix4($i),this}rotateX(t){return $i.makeRotationX(t),this.applyMatrix4($i),this}rotateY(t){return $i.makeRotationY(t),this.applyMatrix4($i),this}rotateZ(t){return $i.makeRotationZ(t),this.applyMatrix4($i),this}translate(t,e,n){return $i.makeTranslation(t,e,n),this.applyMatrix4($i),this}scale(t,e,n){return $i.makeScale(t,e,n),this.applyMatrix4($i),this}lookAt(t){return U0.lookAt(t),U0.updateMatrix(),this.applyMatrix4(U0.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let s=0,o=t.length;s<o;s++){const r=t[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ce(n,3))}else{for(let n=0,s=e.count;n<s;n++){const o=t[n];e.setXYZ(n,o.x,o.y,o.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ks);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const o=e[n];Ni.setFromBufferAttribute(o),this.morphTargetsRelative?(Zn.addVectors(this.boundingBox.min,Ni.min),this.boundingBox.expandByPoint(Zn),Zn.addVectors(this.boundingBox.max,Ni.max),this.boundingBox.expandByPoint(Zn)):(this.boundingBox.expandByPoint(Ni.min),this.boundingBox.expandByPoint(Ni.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new bo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){const n=this.boundingSphere.center;if(Ni.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];Oa.setFromBufferAttribute(a),this.morphTargetsRelative?(Zn.addVectors(Ni.min,Oa.min),Ni.expandByPoint(Zn),Zn.addVectors(Ni.max,Oa.max),Ni.expandByPoint(Zn)):(Ni.expandByPoint(Oa.min),Ni.expandByPoint(Oa.max))}Ni.getCenter(n);let s=0;for(let o=0,r=t.count;o<r;o++)Zn.fromBufferAttribute(t,o),s=Math.max(s,n.distanceToSquared(Zn));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],l=this.morphTargetsRelative;for(let h=0,c=a.count;h<c;h++)Zn.fromBufferAttribute(a,h),l&&(Br.fromBufferAttribute(t,h),Zn.add(Br)),s=Math.max(s,n.distanceToSquared(Zn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],l=[];for(let S=0;S<n.count;S++)a[S]=new k,l[S]=new k;const h=new k,c=new k,f=new k,d=new Dt,u=new Dt,p=new Dt,v=new k,m=new k;function g(S,x,y){h.fromBufferAttribute(n,S),c.fromBufferAttribute(n,x),f.fromBufferAttribute(n,y),d.fromBufferAttribute(o,S),u.fromBufferAttribute(o,x),p.fromBufferAttribute(o,y),c.sub(h),f.sub(h),u.sub(d),p.sub(d);const b=1/(u.x*p.y-p.x*u.y);isFinite(b)&&(v.copy(c).multiplyScalar(p.y).addScaledVector(f,-u.y).multiplyScalar(b),m.copy(f).multiplyScalar(u.x).addScaledVector(c,-p.x).multiplyScalar(b),a[S].add(v),a[x].add(v),a[y].add(v),l[S].add(m),l[x].add(m),l[y].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:t.count}]);for(let S=0,x=M.length;S<x;++S){const y=M[S],b=y.start,C=y.count;for(let L=b,R=b+C;L<R;L+=3)g(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const T=new k,E=new k,A=new k,w=new k;function _(S){A.fromBufferAttribute(s,S),w.copy(A);const x=a[S];T.copy(x),T.sub(A.multiplyScalar(A.dot(x))).normalize(),E.crossVectors(w,x);const b=E.dot(l[S])<0?-1:1;r.setXYZW(S,T.x,T.y,T.z,b)}for(let S=0,x=M.length;S<x;++S){const y=M[S],b=y.start,C=y.count;for(let L=b,R=b+C;L<R;L+=3)_(t.getX(L+0)),_(t.getX(L+1)),_(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new cn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,u=n.count;d<u;d++)n.setXYZ(d,0,0,0);const s=new k,o=new k,r=new k,a=new k,l=new k,h=new k,c=new k,f=new k;if(t)for(let d=0,u=t.count;d<u;d+=3){const p=t.getX(d+0),v=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,p),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,m),c.subVectors(r,o),f.subVectors(s,o),c.cross(f),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),h.fromBufferAttribute(n,m),a.add(c),l.add(c),h.add(c),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,h.x,h.y,h.z)}else for(let d=0,u=e.count;d<u;d+=3)s.fromBufferAttribute(e,d+0),o.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),c.subVectors(r,o),f.subVectors(s,o),c.cross(f),n.setXYZ(d+0,c.x,c.y,c.z),n.setXYZ(d+1,c.x,c.y,c.z),n.setXYZ(d+2,c.x,c.y,c.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Zn.fromBufferAttribute(t,e),Zn.normalize(),t.setXYZ(e,Zn.x,Zn.y,Zn.z)}toNonIndexed(){function t(a,l){const h=a.array,c=a.itemSize,f=a.normalized,d=new h.constructor(l.length*c);let u=0,p=0;for(let v=0,m=l.length;v<m;v++){a.isInterleavedBufferAttribute?u=l[v]*a.data.stride+a.offset:u=l[v]*c;for(let g=0;g<c;g++)d[p++]=h[u++]}return new cn(d,c,f)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new bn,n=this.index.array,s=this.attributes;for(const a in s){const l=s[a],h=t(l,n);e.setAttribute(a,h)}const o=this.morphAttributes;for(const a in o){const l=[],h=o[a];for(let c=0,f=h.length;c<f;c++){const d=h[c],u=t(d,n);l.push(u)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const h=r[a];e.addGroup(h.start,h.count,h.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const h in l)l[h]!==void 0&&(t[h]=l[h]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const h=n[l];t.data.attributes[l]=h.toJSON(t.data)}const s={};let o=!1;for(const l in this.morphAttributes){const h=this.morphAttributes[l],c=[];for(let f=0,d=h.length;f<d;f++){const u=h[f];c.push(u.toJSON(t.data))}c.length>0&&(s[l]=c,o=!0)}o&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const h in s){const c=s[h];this.setAttribute(h,c.clone(e))}const o=t.morphAttributes;for(const h in o){const c=[],f=o[h];for(let d=0,u=f.length;d<u;d++)c.push(f[d].clone(e));this.morphAttributes[h]=c}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let h=0,c=r.length;h<c;h++){const f=r[h];this.addGroup(f.start,f.count,f.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Of=new qe,Zo=new Op,Bl=new bo,Bf=new k,Vl=new k,Hl=new k,Gl=new k,z0=new k,Wl=new k,Vf=new k,ql=new k;class Mn extends Nn{constructor(t=new bn,e=new Kc){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=s.length;o<r;o++){const a=s[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const a=this.morphTargetInfluences;if(o&&a){Wl.set(0,0,0);for(let l=0,h=o.length;l<h;l++){const c=a[l],f=o[l];c!==0&&(z0.fromBufferAttribute(f,t),r?Wl.addScaledVector(z0,c):Wl.addScaledVector(z0.sub(e),c))}e.add(Wl)}return e}raycast(t,e){const n=this.geometry,s=this.material,o=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Bl.copy(n.boundingSphere),Bl.applyMatrix4(o),Zo.copy(t.ray).recast(t.near),!(Bl.containsPoint(Zo.origin)===!1&&(Zo.intersectSphere(Bl,Bf)===null||Zo.origin.distanceToSquared(Bf)>(t.far-t.near)**2))&&(Of.copy(o).invert(),Zo.copy(t.ray).applyMatrix4(Of),!(n.boundingBox!==null&&Zo.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zo)))}_computeIntersections(t,e,n){let s;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,h=o.attributes.uv,c=o.attributes.uv1,f=o.attributes.normal,d=o.groups,u=o.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const m=d[p],g=r[m.materialIndex],M=Math.max(m.start,u.start),T=Math.min(a.count,Math.min(m.start+m.count,u.start+u.count));for(let E=M,A=T;E<A;E+=3){const w=a.getX(E),_=a.getX(E+1),S=a.getX(E+2);s=Xl(this,g,t,n,h,c,f,w,_,S),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,u.start),v=Math.min(a.count,u.start+u.count);for(let m=p,g=v;m<g;m+=3){const M=a.getX(m),T=a.getX(m+1),E=a.getX(m+2);s=Xl(this,r,t,n,h,c,f,M,T,E),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=d.length;p<v;p++){const m=d[p],g=r[m.materialIndex],M=Math.max(m.start,u.start),T=Math.min(l.count,Math.min(m.start+m.count,u.start+u.count));for(let E=M,A=T;E<A;E+=3){const w=E,_=E+1,S=E+2;s=Xl(this,g,t,n,h,c,f,w,_,S),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{const p=Math.max(0,u.start),v=Math.min(l.count,u.start+u.count);for(let m=p,g=v;m<g;m+=3){const M=m,T=m+1,E=m+2;s=Xl(this,r,t,n,h,c,f,M,T,E),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}}function N1(i,t,e,n,s,o,r,a){let l;if(t.side===Si?l=n.intersectTriangle(r,o,s,!0,a):l=n.intersectTriangle(s,o,r,t.side===_o,a),l===null)return null;ql.copy(a),ql.applyMatrix4(i.matrixWorld);const h=e.ray.origin.distanceTo(ql);return h<e.near||h>e.far?null:{distance:h,point:ql.clone(),object:i}}function Xl(i,t,e,n,s,o,r,a,l,h){i.getVertexPosition(a,Vl),i.getVertexPosition(l,Hl),i.getVertexPosition(h,Gl);const c=N1(i,t,e,n,Vl,Hl,Gl,Vf);if(c){const f=new k;es.getBarycoord(Vf,Vl,Hl,Gl,f),s&&(c.uv=es.getInterpolatedAttribute(s,a,l,h,f,new Dt)),o&&(c.uv1=es.getInterpolatedAttribute(o,a,l,h,f,new Dt)),r&&(c.normal=es.getInterpolatedAttribute(r,a,l,h,f,new k),c.normal.dot(n.direction)>0&&c.normal.multiplyScalar(-1));const d={a,b:l,c:h,normal:new k,materialIndex:0};es.getNormal(Vl,Hl,Gl,d.normal),c.face=d,c.barycoord=f}return c}class yl extends bn{constructor(t=1,e=1,n=1,s=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:o,depthSegments:r};const a=this;s=Math.floor(s),o=Math.floor(o),r=Math.floor(r);const l=[],h=[],c=[],f=[];let d=0,u=0;p("z","y","x",-1,-1,n,e,t,r,o,0),p("z","y","x",1,-1,n,e,-t,r,o,1),p("x","z","y",1,1,t,n,e,s,r,2),p("x","z","y",1,-1,t,n,-e,s,r,3),p("x","y","z",1,-1,t,e,n,s,o,4),p("x","y","z",-1,-1,t,e,-n,s,o,5),this.setIndex(l),this.setAttribute("position",new Ce(h,3)),this.setAttribute("normal",new Ce(c,3)),this.setAttribute("uv",new Ce(f,2));function p(v,m,g,M,T,E,A,w,_,S,x){const y=E/_,b=A/S,C=E/2,L=A/2,R=w/2,U=_+1,I=S+1;let X=0,Y=0;const st=new k;for(let bt=0;bt<I;bt++){const St=bt*b-L;for(let Ft=0;Ft<U;Ft++){const ye=Ft*y-C;st[v]=ye*M,st[m]=St*T,st[g]=R,h.push(st.x,st.y,st.z),st[v]=0,st[m]=0,st[g]=w>0?1:-1,c.push(st.x,st.y,st.z),f.push(Ft/_),f.push(1-bt/S),X+=1}}for(let bt=0;bt<S;bt++)for(let St=0;St<_;St++){const Ft=d+St+U*bt,ye=d+St+U*(bt+1),lt=d+(St+1)+U*(bt+1),vt=d+(St+1)+U*bt;l.push(Ft,ye,vt),l.push(ye,lt,vt),Y+=6}a.addGroup(u,Y,x),u+=Y,d+=X}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new yl(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Ma(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function _i(i){const t={};for(let e=0;e<i.length;e++){const n=Ma(i[e]);for(const s in n)t[s]=n[s]}return t}function F1(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Hp(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:an.workingColorSpace}const pl={clone:Ma,merge:_i};var O1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,B1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends _r{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=O1,this.fragmentShader=B1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ma(t.uniforms),this.uniformsGroups=F1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Gp extends Nn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qe,this.projectionMatrix=new qe,this.projectionMatrixInverse=new qe,this.coordinateSystem=uo}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Lo=new k,Hf=new Dt,Gf=new Dt;class ts extends Gp{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=su*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(m0*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return su*2*Math.atan(Math.tan(m0*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Lo.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Lo.x,Lo.y).multiplyScalar(-t/Lo.z),Lo.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Lo.x,Lo.y).multiplyScalar(-t/Lo.z)}getViewSize(t,e){return this.getViewBounds(t,Hf,Gf),e.subVectors(Gf,Hf)}setViewOffset(t,e,n,s,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(m0*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,o=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,h=r.fullHeight;o+=r.offsetX*s/l,e-=r.offsetY*n/h,s*=r.width/l,n*=r.height/h}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Vr=-90,Hr=1;class V1 extends Nn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new ts(Vr,Hr,t,e);s.layers=this.layers,this.add(s);const o=new ts(Vr,Hr,t,e);o.layers=this.layers,this.add(o);const r=new ts(Vr,Hr,t,e);r.layers=this.layers,this.add(r);const a=new ts(Vr,Hr,t,e);a.layers=this.layers,this.add(a);const l=new ts(Vr,Hr,t,e);l.layers=this.layers,this.add(l);const h=new ts(Vr,Hr,t,e);h.layers=this.layers,this.add(h)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,o,r,a,l]=e;for(const h of e)this.remove(h);if(t===uo)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Oc)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const h of e)this.add(h),h.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,h,c]=this.children,f=t.getRenderTarget(),d=t.getActiveCubeFace(),u=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,o),t.setRenderTarget(n,1,s),t.render(e,r),t.setRenderTarget(n,2,s),t.render(e,a),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,h),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,s),t.render(e,c),t.setRenderTarget(f,d,u),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Wp extends mi{constructor(t,e,n,s,o,r,a,l,h,c){t=t!==void 0?t:[],e=e!==void 0?e:xa,super(t,e,n,s,o,r,a,l,h,c),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class H1 extends ns{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Wp(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Bi}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new yl(5,5,5),o=new ii({name:"CubemapFromEquirect",uniforms:Ma(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Si,blending:go});o.uniforms.tEquirect.value=e;const r=new Mn(s,o),a=e.minFilter;return e.minFilter===Ls&&(e.minFilter=Bi),new V1(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,s){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,s);t.setRenderTarget(o)}}const k0=new k,G1=new k,W1=new Ke;class rr{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=k0.subVectors(n,e).cross(G1.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(k0),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/s;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||W1.getNormalMatrix(t),s=this.coplanarPoint(k0).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Jo=new bo,Yl=new k;class Iu{constructor(t=new rr,e=new rr,n=new rr,s=new rr,o=new rr,r=new rr){this.planes=[t,e,n,s,o,r]}set(t,e,n,s,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(s),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=uo){const n=this.planes,s=t.elements,o=s[0],r=s[1],a=s[2],l=s[3],h=s[4],c=s[5],f=s[6],d=s[7],u=s[8],p=s[9],v=s[10],m=s[11],g=s[12],M=s[13],T=s[14],E=s[15];if(n[0].setComponents(l-o,d-h,m-u,E-g).normalize(),n[1].setComponents(l+o,d+h,m+u,E+g).normalize(),n[2].setComponents(l+r,d+c,m+p,E+M).normalize(),n[3].setComponents(l-r,d-c,m-p,E-M).normalize(),n[4].setComponents(l-a,d-f,m-v,E-T).normalize(),e===uo)n[5].setComponents(l+a,d+f,m+v,E+T).normalize();else if(e===Oc)n[5].setComponents(a,f,v,T).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Jo.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Jo.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Jo)}intersectsSprite(t){return Jo.center.set(0,0,0),Jo.radius=.7071067811865476,Jo.applyMatrix4(t.matrixWorld),this.intersectsSphere(Jo)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Yl.x=s.normal.x>0?t.max.x:t.min.x,Yl.y=s.normal.y>0?t.max.y:t.min.y,Yl.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Yl)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qp(){let i=null,t=!1,e=null,n=null;function s(o,r){e(o,r),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){i=o}}}function q1(i){const t=new WeakMap;function e(a,l){const h=a.array,c=a.usage,f=h.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,h,c),a.onUploadCallback();let u;if(h instanceof Float32Array)u=i.FLOAT;else if(h instanceof Uint16Array)a.isFloat16BufferAttribute?u=i.HALF_FLOAT:u=i.UNSIGNED_SHORT;else if(h instanceof Int16Array)u=i.SHORT;else if(h instanceof Uint32Array)u=i.UNSIGNED_INT;else if(h instanceof Int32Array)u=i.INT;else if(h instanceof Int8Array)u=i.BYTE;else if(h instanceof Uint8Array)u=i.UNSIGNED_BYTE;else if(h instanceof Uint8ClampedArray)u=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:d,type:u,bytesPerElement:h.BYTES_PER_ELEMENT,version:a.version,size:f}}function n(a,l,h){const c=l.array,f=l.updateRanges;if(i.bindBuffer(h,a),f.length===0)i.bufferSubData(h,0,c);else{f.sort((u,p)=>u.start-p.start);let d=0;for(let u=1;u<f.length;u++){const p=f[d],v=f[u];v.start<=p.start+p.count+1?p.count=Math.max(p.count,v.start+v.count-p.start):(++d,f[d]=v)}f.length=d+1;for(let u=0,p=f.length;u<p;u++){const v=f[u];i.bufferSubData(h,v.start*c.BYTES_PER_ELEMENT,c,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(i.deleteBuffer(l.buffer),t.delete(a))}function r(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const c=t.get(a);(!c||c.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const h=t.get(a);if(h===void 0)t.set(a,e(a,l));else if(h.version<a.version){if(h.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(h.buffer,a,l),h.version=a.version}}return{get:s,remove:o,update:r}}class _l extends bn{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const o=t/2,r=e/2,a=Math.floor(n),l=Math.floor(s),h=a+1,c=l+1,f=t/a,d=e/l,u=[],p=[],v=[],m=[];for(let g=0;g<c;g++){const M=g*d-r;for(let T=0;T<h;T++){const E=T*f-o;p.push(E,-M,0),v.push(0,0,1),m.push(T/a),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let M=0;M<a;M++){const T=M+h*g,E=M+h*(g+1),A=M+1+h*(g+1),w=M+1+h*g;u.push(T,E,w),u.push(E,A,w)}this.setIndex(u),this.setAttribute("position",new Ce(p,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _l(t.width,t.height,t.widthSegments,t.heightSegments)}}var X1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Y1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,$1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,j1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,K1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Z1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,J1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Q1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,eg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ng=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ig=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,sg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,og=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,rg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ag=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,lg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,cg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hg=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,ug=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,fg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,dg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,pg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,mg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,gg=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xg=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,vg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_g=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Mg=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bg="gl_FragColor = linearToOutputTexel( gl_FragColor );",wg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Tg=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Eg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ag=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Cg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Rg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pg=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ig=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ug=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ng=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Fg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Og=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Bg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Hg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Gg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Wg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Xg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Yg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$g=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,t2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,e2=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,n2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,i2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,s2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,o2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,r2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,a2=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,l2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,h2=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,u2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,f2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,p2=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,m2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,g2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,x2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,v2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,y2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_2=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,M2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,b2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,w2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,S2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,T2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,E2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,A2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,C2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,R2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,P2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,L2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,D2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,I2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,U2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,z2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,k2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,N2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,F2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,O2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,B2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,V2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,H2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,G2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,W2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const q2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,X2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Y2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,j2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,J2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Q2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,tx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,ex=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ix=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sx=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ox=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,rx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ax=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,lx=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,hx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ux=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,fx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,dx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,px=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,gx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_x=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,wx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:X1,alphahash_pars_fragment:Y1,alphamap_fragment:$1,alphamap_pars_fragment:j1,alphatest_fragment:K1,alphatest_pars_fragment:Z1,aomap_fragment:J1,aomap_pars_fragment:Q1,batching_pars_vertex:tg,batching_vertex:eg,begin_vertex:ng,beginnormal_vertex:ig,bsdfs:sg,iridescence_fragment:og,bumpmap_pars_fragment:rg,clipping_planes_fragment:ag,clipping_planes_pars_fragment:lg,clipping_planes_pars_vertex:cg,clipping_planes_vertex:hg,color_fragment:ug,color_pars_fragment:fg,color_pars_vertex:dg,color_vertex:pg,common:mg,cube_uv_reflection_fragment:gg,defaultnormal_vertex:xg,displacementmap_pars_vertex:vg,displacementmap_vertex:yg,emissivemap_fragment:_g,emissivemap_pars_fragment:Mg,colorspace_fragment:bg,colorspace_pars_fragment:wg,envmap_fragment:Sg,envmap_common_pars_fragment:Tg,envmap_pars_fragment:Eg,envmap_pars_vertex:Ag,envmap_physical_pars_fragment:Fg,envmap_vertex:Cg,fog_vertex:Rg,fog_pars_vertex:Pg,fog_fragment:Lg,fog_pars_fragment:Dg,gradientmap_pars_fragment:Ig,lightmap_pars_fragment:Ug,lights_lambert_fragment:zg,lights_lambert_pars_fragment:kg,lights_pars_begin:Ng,lights_toon_fragment:Og,lights_toon_pars_fragment:Bg,lights_phong_fragment:Vg,lights_phong_pars_fragment:Hg,lights_physical_fragment:Gg,lights_physical_pars_fragment:Wg,lights_fragment_begin:qg,lights_fragment_maps:Xg,lights_fragment_end:Yg,logdepthbuf_fragment:$g,logdepthbuf_pars_fragment:jg,logdepthbuf_pars_vertex:Kg,logdepthbuf_vertex:Zg,map_fragment:Jg,map_pars_fragment:Qg,map_particle_fragment:t2,map_particle_pars_fragment:e2,metalnessmap_fragment:n2,metalnessmap_pars_fragment:i2,morphinstance_vertex:s2,morphcolor_vertex:o2,morphnormal_vertex:r2,morphtarget_pars_vertex:a2,morphtarget_vertex:l2,normal_fragment_begin:c2,normal_fragment_maps:h2,normal_pars_fragment:u2,normal_pars_vertex:f2,normal_vertex:d2,normalmap_pars_fragment:p2,clearcoat_normal_fragment_begin:m2,clearcoat_normal_fragment_maps:g2,clearcoat_pars_fragment:x2,iridescence_pars_fragment:v2,opaque_fragment:y2,packing:_2,premultiplied_alpha_fragment:M2,project_vertex:b2,dithering_fragment:w2,dithering_pars_fragment:S2,roughnessmap_fragment:T2,roughnessmap_pars_fragment:E2,shadowmap_pars_fragment:A2,shadowmap_pars_vertex:C2,shadowmap_vertex:R2,shadowmask_pars_fragment:P2,skinbase_vertex:L2,skinning_pars_vertex:D2,skinning_vertex:I2,skinnormal_vertex:U2,specularmap_fragment:z2,specularmap_pars_fragment:k2,tonemapping_fragment:N2,tonemapping_pars_fragment:F2,transmission_fragment:O2,transmission_pars_fragment:B2,uv_pars_fragment:V2,uv_pars_vertex:H2,uv_vertex:G2,worldpos_vertex:W2,background_vert:q2,background_frag:X2,backgroundCube_vert:Y2,backgroundCube_frag:$2,cube_vert:j2,cube_frag:K2,depth_vert:Z2,depth_frag:J2,distanceRGBA_vert:Q2,distanceRGBA_frag:tx,equirect_vert:ex,equirect_frag:nx,linedashed_vert:ix,linedashed_frag:sx,meshbasic_vert:ox,meshbasic_frag:rx,meshlambert_vert:ax,meshlambert_frag:lx,meshmatcap_vert:cx,meshmatcap_frag:hx,meshnormal_vert:ux,meshnormal_frag:fx,meshphong_vert:dx,meshphong_frag:px,meshphysical_vert:mx,meshphysical_frag:gx,meshtoon_vert:xx,meshtoon_frag:vx,points_vert:yx,points_frag:_x,shadow_vert:Mx,shadow_frag:bx,sprite_vert:wx,sprite_frag:Sx},le={common:{diffuse:{value:new ge(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new Dt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ge(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ge(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new ge(16777215)},opacity:{value:1},center:{value:new Dt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Ts={basic:{uniforms:_i([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:_i([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new ge(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:_i([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new ge(0)},specular:{value:new ge(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:_i([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new ge(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:_i([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new ge(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:_i([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:_i([le.points,le.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:_i([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:_i([le.common,le.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:_i([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:_i([le.sprite,le.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:_i([le.common,le.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:_i([le.lights,le.fog,{color:{value:new ge(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};Ts.physical={uniforms:_i([Ts.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new Dt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new ge(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new Dt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new ge(0)},specularColor:{value:new ge(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new Dt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const $l={r:0,b:0,g:0},Qo=new Ei,Tx=new qe;function Ex(i,t,e,n,s,o,r){const a=new ge(0);let l=o===!0?0:1,h,c,f=null,d=0,u=null;function p(M){let T=M.isScene===!0?M.background:null;return T&&T.isTexture&&(T=(M.backgroundBlurriness>0?e:t).get(T)),T}function v(M){let T=!1;const E=p(M);E===null?g(a,l):E&&E.isColor&&(g(E,1),T=!0);const A=i.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,r):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(M,T){const E=p(T);E&&(E.isCubeTexture||E.mapping===$c)?(c===void 0&&(c=new Mn(new yl(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:Ma(Ts.backgroundCube.uniforms),vertexShader:Ts.backgroundCube.vertexShader,fragmentShader:Ts.backgroundCube.fragmentShader,side:Si,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,w,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(c)),Qo.copy(T.backgroundRotation),Qo.x*=-1,Qo.y*=-1,Qo.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Qo.y*=-1,Qo.z*=-1),c.material.uniforms.envMap.value=E,c.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Tx.makeRotationFromEuler(Qo)),c.material.toneMapped=an.getTransfer(E.colorSpace)!==dn,(f!==E||d!==E.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,f=E,d=E.version,u=i.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null)):E&&E.isTexture&&(h===void 0&&(h=new Mn(new _l(2,2),new ii({name:"BackgroundMaterial",uniforms:Ma(Ts.background.uniforms),vertexShader:Ts.background.vertexShader,fragmentShader:Ts.background.fragmentShader,side:_o,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(h)),h.material.uniforms.t2D.value=E,h.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,h.material.toneMapped=an.getTransfer(E.colorSpace)!==dn,E.matrixAutoUpdate===!0&&E.updateMatrix(),h.material.uniforms.uvTransform.value.copy(E.matrix),(f!==E||d!==E.version||u!==i.toneMapping)&&(h.material.needsUpdate=!0,f=E,d=E.version,u=i.toneMapping),h.layers.enableAll(),M.unshift(h,h.geometry,h.material,0,0,null))}function g(M,T){M.getRGB($l,Hp(i)),n.buffers.color.setClear($l.r,$l.g,$l.b,T,r)}return{getClearColor:function(){return a},setClearColor:function(M,T=1){a.set(M),l=T,g(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(M){l=M,g(a,l)},render:v,addToRenderList:m}}function Ax(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let o=s,r=!1;function a(y,b,C,L,R){let U=!1;const I=f(L,C,b);o!==I&&(o=I,h(o.object)),U=u(y,L,C,R),U&&p(y,L,C,R),R!==null&&t.update(R,i.ELEMENT_ARRAY_BUFFER),(U||r)&&(r=!1,E(y,b,C,L),R!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(R).buffer))}function l(){return i.createVertexArray()}function h(y){return i.bindVertexArray(y)}function c(y){return i.deleteVertexArray(y)}function f(y,b,C){const L=C.wireframe===!0;let R=n[y.id];R===void 0&&(R={},n[y.id]=R);let U=R[b.id];U===void 0&&(U={},R[b.id]=U);let I=U[L];return I===void 0&&(I=d(l()),U[L]=I),I}function d(y){const b=[],C=[],L=[];for(let R=0;R<e;R++)b[R]=0,C[R]=0,L[R]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:b,enabledAttributes:C,attributeDivisors:L,object:y,attributes:{},index:null}}function u(y,b,C,L){const R=o.attributes,U=b.attributes;let I=0;const X=C.getAttributes();for(const Y in X)if(X[Y].location>=0){const bt=R[Y];let St=U[Y];if(St===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(St=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(St=y.instanceColor)),bt===void 0||bt.attribute!==St||St&&bt.data!==St.data)return!0;I++}return o.attributesNum!==I||o.index!==L}function p(y,b,C,L){const R={},U=b.attributes;let I=0;const X=C.getAttributes();for(const Y in X)if(X[Y].location>=0){let bt=U[Y];bt===void 0&&(Y==="instanceMatrix"&&y.instanceMatrix&&(bt=y.instanceMatrix),Y==="instanceColor"&&y.instanceColor&&(bt=y.instanceColor));const St={};St.attribute=bt,bt&&bt.data&&(St.data=bt.data),R[Y]=St,I++}o.attributes=R,o.attributesNum=I,o.index=L}function v(){const y=o.newAttributes;for(let b=0,C=y.length;b<C;b++)y[b]=0}function m(y){g(y,0)}function g(y,b){const C=o.newAttributes,L=o.enabledAttributes,R=o.attributeDivisors;C[y]=1,L[y]===0&&(i.enableVertexAttribArray(y),L[y]=1),R[y]!==b&&(i.vertexAttribDivisor(y,b),R[y]=b)}function M(){const y=o.newAttributes,b=o.enabledAttributes;for(let C=0,L=b.length;C<L;C++)b[C]!==y[C]&&(i.disableVertexAttribArray(C),b[C]=0)}function T(y,b,C,L,R,U,I){I===!0?i.vertexAttribIPointer(y,b,C,R,U):i.vertexAttribPointer(y,b,C,L,R,U)}function E(y,b,C,L){v();const R=L.attributes,U=C.getAttributes(),I=b.defaultAttributeValues;for(const X in U){const Y=U[X];if(Y.location>=0){let st=R[X];if(st===void 0&&(X==="instanceMatrix"&&y.instanceMatrix&&(st=y.instanceMatrix),X==="instanceColor"&&y.instanceColor&&(st=y.instanceColor)),st!==void 0){const bt=st.normalized,St=st.itemSize,Ft=t.get(st);if(Ft===void 0)continue;const ye=Ft.buffer,lt=Ft.type,vt=Ft.bytesPerElement,Pt=lt===i.INT||lt===i.UNSIGNED_INT||st.gpuType===wu;if(st.isInterleavedBufferAttribute){const wt=st.data,$t=wt.stride,xe=st.offset;if(wt.isInstancedInterleavedBuffer){for(let Xt=0;Xt<Y.locationSize;Xt++)g(Y.location+Xt,wt.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=wt.meshPerAttribute*wt.count)}else for(let Xt=0;Xt<Y.locationSize;Xt++)m(Y.location+Xt);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let Xt=0;Xt<Y.locationSize;Xt++)T(Y.location+Xt,St/Y.locationSize,lt,bt,$t*vt,(xe+St/Y.locationSize*Xt)*vt,Pt)}else{if(st.isInstancedBufferAttribute){for(let wt=0;wt<Y.locationSize;wt++)g(Y.location+wt,st.meshPerAttribute);y.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let wt=0;wt<Y.locationSize;wt++)m(Y.location+wt);i.bindBuffer(i.ARRAY_BUFFER,ye);for(let wt=0;wt<Y.locationSize;wt++)T(Y.location+wt,St/Y.locationSize,lt,bt,St*vt,St/Y.locationSize*wt*vt,Pt)}}else if(I!==void 0){const bt=I[X];if(bt!==void 0)switch(bt.length){case 2:i.vertexAttrib2fv(Y.location,bt);break;case 3:i.vertexAttrib3fv(Y.location,bt);break;case 4:i.vertexAttrib4fv(Y.location,bt);break;default:i.vertexAttrib1fv(Y.location,bt)}}}}M()}function A(){S();for(const y in n){const b=n[y];for(const C in b){const L=b[C];for(const R in L)c(L[R].object),delete L[R];delete b[C]}delete n[y]}}function w(y){if(n[y.id]===void 0)return;const b=n[y.id];for(const C in b){const L=b[C];for(const R in L)c(L[R].object),delete L[R];delete b[C]}delete n[y.id]}function _(y){for(const b in n){const C=n[b];if(C[y.id]===void 0)continue;const L=C[y.id];for(const R in L)c(L[R].object),delete L[R];delete C[y.id]}}function S(){x(),r=!0,o!==s&&(o=s,h(o.object))}function x(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:S,resetDefaultState:x,dispose:A,releaseStatesOfGeometry:w,releaseStatesOfProgram:_,initAttributes:v,enableAttribute:m,disableUnusedAttributes:M}}function Cx(i,t,e){let n;function s(h){n=h}function o(h,c){i.drawArrays(n,h,c),e.update(c,n,1)}function r(h,c,f){f!==0&&(i.drawArraysInstanced(n,h,c,f),e.update(c,n,f))}function a(h,c,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,h,0,c,0,f);let u=0;for(let p=0;p<f;p++)u+=c[p];e.update(u,n,1)}function l(h,c,f,d){if(f===0)return;const u=t.get("WEBGL_multi_draw");if(u===null)for(let p=0;p<h.length;p++)r(h[p],c[p],d[p]);else{u.multiDrawArraysInstancedWEBGL(n,h,0,c,0,d,0,f);let p=0;for(let v=0;v<f;v++)p+=c[v]*d[v];e.update(p,n,1)}}this.setMode=s,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Rx(i,t,e,n){let s;function o(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const _=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(_){return!(_!==bi&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(_){const S=_===Is&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(_!==Mo&&n.convert(_)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&_!==gs&&!S)}function l(_){if(_==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let h=e.precision!==void 0?e.precision:"highp";const c=l(h);c!==h&&(console.warn("THREE.WebGLRenderer:",h,"not supported, using",c,"instead."),h=c);const f=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),M=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),E=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),A=p>0,w=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:a,precision:h,logarithmicDepthBuffer:f,reverseDepthBuffer:d,maxTextures:u,maxVertexTextures:p,maxTextureSize:v,maxCubemapSize:m,maxAttributes:g,maxVertexUniforms:M,maxVaryings:T,maxFragmentUniforms:E,vertexTextures:A,maxSamples:w}}function Px(i){const t=this;let e=null,n=0,s=!1,o=!1;const r=new rr,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const u=f.length!==0||d||n!==0||s;return s=d,n=f.length,u},this.beginShadows=function(){o=!0,c(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(f,d){e=c(f,d,0)},this.setState=function(f,d,u){const p=f.clippingPlanes,v=f.clipIntersection,m=f.clipShadows,g=i.get(f);if(!s||p===null||p.length===0||o&&!m)o?c(null):h();else{const M=o?0:n,T=M*4;let E=g.clippingState||null;l.value=E,E=c(p,d,T,u);for(let A=0;A!==T;++A)E[A]=e[A];g.clippingState=E,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=M}};function h(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function c(f,d,u,p){const v=f!==null?f.length:0;let m=null;if(v!==0){if(m=l.value,p!==!0||m===null){const g=u+v*4,M=d.matrixWorldInverse;a.getNormalMatrix(M),(m===null||m.length<g)&&(m=new Float32Array(g));for(let T=0,E=u;T!==v;++T,E+=4)r.copy(f[T]).applyMatrix4(M,a),r.normal.toArray(m,E),m[E+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function Lx(i){let t=new WeakMap;function e(r,a){return a===Ch?r.mapping=xa:a===Rh&&(r.mapping=va),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Ch||a===Rh)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const h=new H1(l.height);return h.fromEquirectangularTexture(i,r),t.set(r,h),r.addEventListener("dispose",s),e(h.texture,r.mapping)}else return null}}return r}function s(r){const a=r.target;a.removeEventListener("dispose",s);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Uu extends Gp{constructor(t=-1,e=1,n=1,s=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const h=(this.right-this.left)/this.view.fullWidth/this.zoom,c=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=h*this.view.offsetX,r=o+h*this.view.width,a-=c*this.view.offsetY,l=a-c*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const oa=4,Wf=[.125,.215,.35,.446,.526,.582],dr=20,N0=new Uu,qf=new ge;let F0=null,O0=0,B0=0,V0=!1;const ar=(1+Math.sqrt(5))/2,Gr=1/ar,Xf=[new k(-ar,Gr,0),new k(ar,Gr,0),new k(-Gr,0,ar),new k(Gr,0,ar),new k(0,ar,-Gr),new k(0,ar,Gr),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)];class ou{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){F0=this._renderer.getRenderTarget(),O0=this._renderer.getActiveCubeFace(),B0=this._renderer.getActiveMipmapLevel(),V0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,s,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$f(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(F0,O0,B0),this._renderer.xr.enabled=V0,t.scissorTest=!1,jl(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===xa||t.mapping===va?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),F0=this._renderer.getRenderTarget(),O0=this._renderer.getActiveCubeFace(),B0=this._renderer.getActiveMipmapLevel(),V0=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Bi,minFilter:Bi,generateMipmaps:!1,type:Is,format:bi,colorSpace:Ta,depthBuffer:!1},s=Yf(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Yf(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dx(o)),this._blurMaterial=Ix(o,t,e)}return s}_compileMaterial(t){const e=new Mn(this._lodPlanes[0],t);this._renderer.compile(e,N0)}_sceneToCubeUV(t,e,n,s){const a=new ts(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],c=this._renderer,f=c.autoClear,d=c.toneMapping;c.getClearColor(qf),c.toneMapping=Ho,c.autoClear=!1;const u=new Kc({name:"PMREM.Background",side:Si,depthWrite:!1,depthTest:!1}),p=new Mn(new yl,u);let v=!1;const m=t.background;m?m.isColor&&(u.color.copy(m),t.background=null,v=!0):(u.color.copy(qf),v=!0);for(let g=0;g<6;g++){const M=g%3;M===0?(a.up.set(0,l[g],0),a.lookAt(h[g],0,0)):M===1?(a.up.set(0,0,l[g]),a.lookAt(0,h[g],0)):(a.up.set(0,l[g],0),a.lookAt(0,0,h[g]));const T=this._cubeSize;jl(s,M*T,g>2?T:0,T,T),c.setRenderTarget(s),v&&c.render(p,a),c.render(t,a)}p.geometry.dispose(),p.material.dispose(),c.toneMapping=d,c.autoClear=f,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===xa||t.mapping===va;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=jf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=$f());const o=s?this._cubemapMaterial:this._equirectMaterial,r=new Mn(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;jl(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(r,N0)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let o=1;o<s;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Xf[(s-o-1)%Xf.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,s,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,s,"latitudinal",o),this._halfBlur(r,t,n,n,s,"longitudinal",o)}_halfBlur(t,e,n,s,o,r,a){const l=this._renderer,h=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const c=3,f=new Mn(this._lodPlanes[s],h),d=h.uniforms,u=this._sizeLods[n]-1,p=isFinite(o)?Math.PI/(2*u):2*Math.PI/(2*dr-1),v=o/p,m=isFinite(o)?1+Math.floor(c*v):dr;m>dr&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${dr}`);const g=[];let M=0;for(let _=0;_<dr;++_){const S=_/v,x=Math.exp(-S*S/2);g.push(x),_===0?M+=x:_<m&&(M+=2*x)}for(let _=0;_<g.length;_++)g[_]=g[_]/M;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=g,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:T}=this;d.dTheta.value=p,d.mipInt.value=T-n;const E=this._sizeLods[s],A=3*E*(s>T-oa?s-T+oa:0),w=4*(this._cubeSize-E);jl(e,A,w,3*E,2*E),l.setRenderTarget(e),l.render(f,N0)}}function Dx(i){const t=[],e=[],n=[];let s=i;const o=i-oa+1+Wf.length;for(let r=0;r<o;r++){const a=Math.pow(2,s);e.push(a);let l=1/a;r>i-oa?l=Wf[r-i+oa-1]:r===0&&(l=0),n.push(l);const h=1/(a-2),c=-h,f=1+h,d=[c,c,f,c,f,f,c,c,f,f,c,f],u=6,p=6,v=3,m=2,g=1,M=new Float32Array(v*p*u),T=new Float32Array(m*p*u),E=new Float32Array(g*p*u);for(let w=0;w<u;w++){const _=w%3*2/3-1,S=w>2?0:-1,x=[_,S,0,_+2/3,S,0,_+2/3,S+1,0,_,S,0,_+2/3,S+1,0,_,S+1,0];M.set(x,v*p*w),T.set(d,m*p*w);const y=[w,w,w,w,w,w];E.set(y,g*p*w)}const A=new bn;A.setAttribute("position",new cn(M,v)),A.setAttribute("uv",new cn(T,m)),A.setAttribute("faceIndex",new cn(E,g)),t.push(A),s>oa&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Yf(i,t,e){const n=new ns(i,t,e);return n.texture.mapping=$c,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function jl(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function Ix(i,t,e){const n=new Float32Array(dr),s=new k(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:dr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:go,depthTest:!1,depthWrite:!1})}function $f(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:go,depthTest:!1,depthWrite:!1})}function jf(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:zu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:go,depthTest:!1,depthWrite:!1})}function zu(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ux(i){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,h=l===Ch||l===Rh,c=l===xa||l===va;if(h||c){let f=t.get(a);const d=f!==void 0?f.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new ou(i)),f=h?e.fromEquirectangular(a,f):e.fromCubemap(a,f),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),f.texture;if(f!==void 0)return f.texture;{const u=a.image;return h&&u&&u.height>0||c&&u&&s(u)?(e===null&&(e=new ou(i)),f=h?e.fromEquirectangular(a):e.fromCubemap(a),f.texture.pmremVersion=a.pmremVersion,t.set(a,f),a.addEventListener("dispose",o),f.texture):null}}}return a}function s(a){let l=0;const h=6;for(let c=0;c<h;c++)a[c]!==void 0&&l++;return l===h}function o(a){const l=a.target;l.removeEventListener("dispose",o);const h=t.get(l);h!==void 0&&(t.delete(l),h.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function zx(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&Qa("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function kx(i,t,e,n){const s={},o=new WeakMap;function r(f){const d=f.target;d.index!==null&&t.remove(d.index);for(const p in d.attributes)t.remove(d.attributes[p]);for(const p in d.morphAttributes){const v=d.morphAttributes[p];for(let m=0,g=v.length;m<g;m++)t.remove(v[m])}d.removeEventListener("dispose",r),delete s[d.id];const u=o.get(d);u&&(t.remove(u),o.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(f,d){return s[d.id]===!0||(d.addEventListener("dispose",r),s[d.id]=!0,e.memory.geometries++),d}function l(f){const d=f.attributes;for(const p in d)t.update(d[p],i.ARRAY_BUFFER);const u=f.morphAttributes;for(const p in u){const v=u[p];for(let m=0,g=v.length;m<g;m++)t.update(v[m],i.ARRAY_BUFFER)}}function h(f){const d=[],u=f.index,p=f.attributes.position;let v=0;if(u!==null){const M=u.array;v=u.version;for(let T=0,E=M.length;T<E;T+=3){const A=M[T+0],w=M[T+1],_=M[T+2];d.push(A,w,w,_,_,A)}}else if(p!==void 0){const M=p.array;v=p.version;for(let T=0,E=M.length/3-1;T<E;T+=3){const A=T+0,w=T+1,_=T+2;d.push(A,w,w,_,_,A)}}else return;const m=new(kp(d)?Du:Lu)(d,1);m.version=v;const g=o.get(f);g&&t.remove(g),o.set(f,m)}function c(f){const d=o.get(f);if(d){const u=f.index;u!==null&&d.version<u.version&&h(f)}else h(f);return o.get(f)}return{get:a,update:l,getWireframeAttribute:c}}function Nx(i,t,e){let n;function s(d){n=d}let o,r;function a(d){o=d.type,r=d.bytesPerElement}function l(d,u){i.drawElements(n,u,o,d*r),e.update(u,n,1)}function h(d,u,p){p!==0&&(i.drawElementsInstanced(n,u,o,d*r,p),e.update(u,n,p))}function c(d,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,o,d,0,p);let m=0;for(let g=0;g<p;g++)m+=u[g];e.update(m,n,1)}function f(d,u,p,v){if(p===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<d.length;g++)h(d[g]/r,u[g],v[g]);else{m.multiDrawElementsInstancedWEBGL(n,u,0,o,d,0,v,0,p);let g=0;for(let M=0;M<p;M++)g+=u[M]*v[M];e.update(g,n,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=h,this.renderMultiDraw=c,this.renderMultiDrawInstances=f}function Fx(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case i.TRIANGLES:e.triangles+=a*(o/3);break;case i.LINES:e.lines+=a*(o/2);break;case i.LINE_STRIP:e.lines+=a*(o-1);break;case i.LINE_LOOP:e.lines+=a*o;break;case i.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function Ox(i,t,e){const n=new WeakMap,s=new Sn;function o(r,a,l){const h=r.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=c!==void 0?c.length:0;let d=n.get(a);if(d===void 0||d.count!==f){let x=function(){_.dispose(),n.delete(a),a.removeEventListener("dispose",x)};d!==void 0&&d.texture.dispose();const u=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],g=a.morphAttributes.normal||[],M=a.morphAttributes.color||[];let T=0;u===!0&&(T=1),p===!0&&(T=2),v===!0&&(T=3);let E=a.attributes.position.count*T,A=1;E>t.maxTextureSize&&(A=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const w=new Float32Array(E*A*4*f),_=new Fp(w,E,A,f);_.type=gs,_.needsUpdate=!0;const S=T*4;for(let y=0;y<f;y++){const b=m[y],C=g[y],L=M[y],R=E*A*4*y;for(let U=0;U<b.count;U++){const I=U*S;u===!0&&(s.fromBufferAttribute(b,U),w[R+I+0]=s.x,w[R+I+1]=s.y,w[R+I+2]=s.z,w[R+I+3]=0),p===!0&&(s.fromBufferAttribute(C,U),w[R+I+4]=s.x,w[R+I+5]=s.y,w[R+I+6]=s.z,w[R+I+7]=0),v===!0&&(s.fromBufferAttribute(L,U),w[R+I+8]=s.x,w[R+I+9]=s.y,w[R+I+10]=s.z,w[R+I+11]=L.itemSize===4?s.w:1)}}d={count:f,texture:_,size:new Dt(E,A)},n.set(a,d),a.addEventListener("dispose",x)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",r.morphTexture,e);else{let u=0;for(let v=0;v<h.length;v++)u+=h[v];const p=a.morphTargetsRelative?1:1-u;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",h)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:o}}function Bx(i,t,e,n){let s=new WeakMap;function o(l){const h=n.render.frame,c=l.geometry,f=t.get(l,c);if(s.get(f)!==h&&(t.update(f),s.set(f,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==h&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const d=l.skeleton;s.get(d)!==h&&(d.update(),s.set(d,h))}return f}function r(){s=new WeakMap}function a(l){const h=l.target;h.removeEventListener("dispose",a),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:o,dispose:r}}class Xp extends mi{constructor(t,e,n,s,o,r,a,l,h,c=da){if(c!==da&&c!==_a)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&c===da&&(n=vr),n===void 0&&c===_a&&(n=ya),super(null,s,o,r,a,l,c,n,h),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Hi,this.minFilter=l!==void 0?l:Hi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Yp=new mi,Kf=new Xp(1,1),$p=new Fp,jp=new A1,Kp=new Wp,Zf=[],Jf=[],Qf=new Float32Array(16),td=new Float32Array(9),ed=new Float32Array(4);function Aa(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let o=Zf[s];if(o===void 0&&(o=new Float32Array(s),Zf[s]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,i[r].toArray(o,a)}return o}function Yn(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function $n(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Zc(i,t){let e=Jf[t];e===void 0&&(e=new Int32Array(t),Jf[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function Vx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function Hx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Yn(e,t))return;i.uniform2fv(this.addr,t),$n(e,t)}}function Gx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Yn(e,t))return;i.uniform3fv(this.addr,t),$n(e,t)}}function Wx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Yn(e,t))return;i.uniform4fv(this.addr,t),$n(e,t)}}function qx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Yn(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),$n(e,t)}else{if(Yn(e,n))return;ed.set(n),i.uniformMatrix2fv(this.addr,!1,ed),$n(e,n)}}function Xx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Yn(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),$n(e,t)}else{if(Yn(e,n))return;td.set(n),i.uniformMatrix3fv(this.addr,!1,td),$n(e,n)}}function Yx(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Yn(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),$n(e,t)}else{if(Yn(e,n))return;Qf.set(n),i.uniformMatrix4fv(this.addr,!1,Qf),$n(e,n)}}function $x(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function jx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Yn(e,t))return;i.uniform2iv(this.addr,t),$n(e,t)}}function Kx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Yn(e,t))return;i.uniform3iv(this.addr,t),$n(e,t)}}function Zx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Yn(e,t))return;i.uniform4iv(this.addr,t),$n(e,t)}}function Jx(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Qx(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Yn(e,t))return;i.uniform2uiv(this.addr,t),$n(e,t)}}function tv(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Yn(e,t))return;i.uniform3uiv(this.addr,t),$n(e,t)}}function ev(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Yn(e,t))return;i.uniform4uiv(this.addr,t),$n(e,t)}}function nv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let o;this.type===i.SAMPLER_2D_SHADOW?(Kf.compareFunction=zp,o=Kf):o=Yp,e.setTexture2D(t||o,s)}function iv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||jp,s)}function sv(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Kp,s)}function ov(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||$p,s)}function rv(i){switch(i){case 5126:return Vx;case 35664:return Hx;case 35665:return Gx;case 35666:return Wx;case 35674:return qx;case 35675:return Xx;case 35676:return Yx;case 5124:case 35670:return $x;case 35667:case 35671:return jx;case 35668:case 35672:return Kx;case 35669:case 35673:return Zx;case 5125:return Jx;case 36294:return Qx;case 36295:return tv;case 36296:return ev;case 35678:case 36198:case 36298:case 36306:case 35682:return nv;case 35679:case 36299:case 36307:return iv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return ov}}function av(i,t){i.uniform1fv(this.addr,t)}function lv(i,t){const e=Aa(t,this.size,2);i.uniform2fv(this.addr,e)}function cv(i,t){const e=Aa(t,this.size,3);i.uniform3fv(this.addr,e)}function hv(i,t){const e=Aa(t,this.size,4);i.uniform4fv(this.addr,e)}function uv(i,t){const e=Aa(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function fv(i,t){const e=Aa(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function dv(i,t){const e=Aa(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function pv(i,t){i.uniform1iv(this.addr,t)}function mv(i,t){i.uniform2iv(this.addr,t)}function gv(i,t){i.uniform3iv(this.addr,t)}function xv(i,t){i.uniform4iv(this.addr,t)}function vv(i,t){i.uniform1uiv(this.addr,t)}function yv(i,t){i.uniform2uiv(this.addr,t)}function _v(i,t){i.uniform3uiv(this.addr,t)}function Mv(i,t){i.uniform4uiv(this.addr,t)}function bv(i,t,e){const n=this.cache,s=t.length,o=Zc(e,s);Yn(n,o)||(i.uniform1iv(this.addr,o),$n(n,o));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||Yp,o[r])}function wv(i,t,e){const n=this.cache,s=t.length,o=Zc(e,s);Yn(n,o)||(i.uniform1iv(this.addr,o),$n(n,o));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||jp,o[r])}function Sv(i,t,e){const n=this.cache,s=t.length,o=Zc(e,s);Yn(n,o)||(i.uniform1iv(this.addr,o),$n(n,o));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||Kp,o[r])}function Tv(i,t,e){const n=this.cache,s=t.length,o=Zc(e,s);Yn(n,o)||(i.uniform1iv(this.addr,o),$n(n,o));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||$p,o[r])}function Ev(i){switch(i){case 5126:return av;case 35664:return lv;case 35665:return cv;case 35666:return hv;case 35674:return uv;case 35675:return fv;case 35676:return dv;case 5124:case 35670:return pv;case 35667:case 35671:return mv;case 35668:case 35672:return gv;case 35669:case 35673:return xv;case 5125:return vv;case 36294:return yv;case 36295:return _v;case 36296:return Mv;case 35678:case 36198:case 36298:case 36306:case 35682:return bv;case 35679:case 36299:case 36307:return wv;case 35680:case 36300:case 36308:case 36293:return Sv;case 36289:case 36303:case 36311:case 36292:return Tv}}class Av{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=rv(e.type)}}class Cv{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Ev(e.type)}}class Rv{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let o=0,r=s.length;o!==r;++o){const a=s[o];a.setValue(t,e[a.id],n)}}}const H0=/(\w+)(\])?(\[|\.)?/g;function nd(i,t){i.seq.push(t),i.map[t.id]=t}function Pv(i,t,e){const n=i.name,s=n.length;for(H0.lastIndex=0;;){const o=H0.exec(n),r=H0.lastIndex;let a=o[1];const l=o[2]==="]",h=o[3];if(l&&(a=a|0),h===void 0||h==="["&&r+2===s){nd(e,h===void 0?new Av(a,i,t):new Cv(a,i,t));break}else{let f=e.map[a];f===void 0&&(f=new Rv(a),nd(e,f)),e=f}}}class Dc{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const o=t.getActiveUniform(e,s),r=t.getUniformLocation(e,o.name);Pv(o,r,this)}}setValue(t,e,n,s){const o=this.map[e];o!==void 0&&o.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let o=0,r=e.length;o!==r;++o){const a=e[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,o=t.length;s!==o;++s){const r=t[s];r.id in e&&n.push(r)}return n}}function id(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const Lv=37297;let Dv=0;function Iv(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=s;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}const sd=new Ke;function Uv(i){an._getMatrix(sd,an.workingColorSpace,i);const t=`mat3( ${sd.elements.map(e=>e.toFixed(4))} )`;switch(an.getTransfer(i)){case jc:return[t,"LinearTransferOETF"];case dn:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function od(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+s+`

`+Iv(i.getShaderSource(t),r)}else return s}function zv(i,t){const e=Uv(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function kv(i,t){let e;switch(t){case yp:e="Linear";break;case _p:e="Reinhard";break;case Mp:e="Cineon";break;case bu:e="ACESFilmic";break;case bp:e="AgX";break;case wp:e="Neutral";break;case r1:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Kl=new k;function Nv(){an.getLuminanceCoefficients(Kl);const i=Kl.x.toFixed(4),t=Kl.y.toFixed(4),e=Kl.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fv(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(tl).join(`
`)}function Ov(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Bv(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const o=i.getActiveAttrib(t,s),r=o.name;let a=1;o.type===i.FLOAT_MAT2&&(a=2),o.type===i.FLOAT_MAT3&&(a=3),o.type===i.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:i.getAttribLocation(t,r),locationSize:a}}return e}function tl(i){return i!==""}function rd(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ad(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ru(i){return i.replace(Vv,Gv)}const Hv=new Map;function Gv(i,t){let e=je[t];if(e===void 0){const n=Hv.get(t);if(n!==void 0)e=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ru(e)}const Wv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ld(i){return i.replace(Wv,qv)}function qv(i,t,e,n){let s="";for(let o=parseInt(t);o<parseInt(e);o++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return s}function cd(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Xv(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===mp?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===gp?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===ro&&(t="SHADOWMAP_TYPE_VSM"),t}function Yv(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case xa:case va:t="ENVMAP_TYPE_CUBE";break;case $c:t="ENVMAP_TYPE_CUBE_UV";break}return t}function $v(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case va:t="ENVMAP_MODE_REFRACTION";break}return t}function jv(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Mu:t="ENVMAP_BLENDING_MULTIPLY";break;case s1:t="ENVMAP_BLENDING_MIX";break;case o1:t="ENVMAP_BLENDING_ADD";break}return t}function Kv(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Zv(i,t,e,n){const s=i.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=Xv(e),h=Yv(e),c=$v(e),f=jv(e),d=Kv(e),u=Fv(e),p=Ov(o),v=s.createProgram();let m,g,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(tl).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(tl).join(`
`),g.length>0&&(g+=`
`)):(m=[cd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(tl).join(`
`),g=[cd(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.envMap?"#define "+c:"",e.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ho?"#define TONE_MAPPING":"",e.toneMapping!==Ho?je.tonemapping_pars_fragment:"",e.toneMapping!==Ho?kv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,zv("linearToOutputTexel",e.outputColorSpace),Nv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(tl).join(`
`)),r=ru(r),r=rd(r,e),r=ad(r,e),a=ru(a),a=rd(a,e),a=ad(a,e),r=ld(r),a=ld(a),e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",e.glslVersion===wf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const T=M+m+r,E=M+g+a,A=id(s,s.VERTEX_SHADER,T),w=id(s,s.FRAGMENT_SHADER,E);s.attachShader(v,A),s.attachShader(v,w),e.index0AttributeName!==void 0?s.bindAttribLocation(v,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function _(b){if(i.debug.checkShaderErrors){const C=s.getProgramInfoLog(v).trim(),L=s.getShaderInfoLog(A).trim(),R=s.getShaderInfoLog(w).trim();let U=!0,I=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(U=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,A,w);else{const X=od(s,A,"vertex"),Y=od(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+b.name+`
Material Type: `+b.type+`

Program Info Log: `+C+`
`+X+`
`+Y)}else C!==""?console.warn("THREE.WebGLProgram: Program Info Log:",C):(L===""||R==="")&&(I=!1);I&&(b.diagnostics={runnable:U,programLog:C,vertexShader:{log:L,prefix:m},fragmentShader:{log:R,prefix:g}})}s.deleteShader(A),s.deleteShader(w),S=new Dc(s,v),x=Bv(s,v)}let S;this.getUniforms=function(){return S===void 0&&_(this),S};let x;this.getAttributes=function(){return x===void 0&&_(this),x};let y=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return y===!1&&(y=s.getProgramParameter(v,Lv)),y},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Dv++,this.cacheKey=t,this.usedTimes=1,this.program=v,this.vertexShader=A,this.fragmentShader=w,this}let Jv=0;class Qv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ty(t),e.set(t,n)),n}}class ty{constructor(t){this.id=Jv++,this.code=t,this.usedTimes=0}}function ey(i,t,e,n,s,o,r){const a=new Bp,l=new Qv,h=new Set,c=[],f=s.logarithmicDepthBuffer,d=s.vertexTextures;let u=s.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(x){return h.add(x),x===0?"uv":`uv${x}`}function m(x,y,b,C,L){const R=C.fog,U=L.geometry,I=x.isMeshStandardMaterial?C.environment:null,X=(x.isMeshStandardMaterial?e:t).get(x.envMap||I),Y=X&&X.mapping===$c?X.image.height:null,st=p[x.type];x.precision!==null&&(u=s.getMaxPrecision(x.precision),u!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const bt=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,St=bt!==void 0?bt.length:0;let Ft=0;U.morphAttributes.position!==void 0&&(Ft=1),U.morphAttributes.normal!==void 0&&(Ft=2),U.morphAttributes.color!==void 0&&(Ft=3);let ye,lt,vt,Pt;if(st){const ve=Ts[st];ye=ve.vertexShader,lt=ve.fragmentShader}else ye=x.vertexShader,lt=x.fragmentShader,l.update(x),vt=l.getVertexShaderID(x),Pt=l.getFragmentShaderID(x);const wt=i.getRenderTarget(),$t=i.state.buffers.depth.getReversed(),xe=L.isInstancedMesh===!0,Xt=L.isBatchedMesh===!0,Ot=!!x.map,yt=!!x.matcap,Lt=!!X,V=!!x.aoMap,Nt=!!x.lightMap,ft=!!x.bumpMap,Yt=!!x.normalMap,Tt=!!x.displacementMap,at=!!x.emissiveMap,At=!!x.metalnessMap,z=!!x.roughnessMap,D=x.anisotropy>0,Q=x.clearcoat>0,dt=x.dispersion>0,_t=x.iridescence>0,xt=x.sheen>0,jt=x.transmission>0,Bt=D&&!!x.anisotropyMap,oe=Q&&!!x.clearcoatMap,De=Q&&!!x.clearcoatNormalMap,Ut=Q&&!!x.clearcoatRoughnessMap,Vt=_t&&!!x.iridescenceMap,pe=_t&&!!x.iridescenceThicknessMap,Se=xt&&!!x.sheenColorMap,re=xt&&!!x.sheenRoughnessMap,Re=!!x.specularMap,we=!!x.specularColorMap,Je=!!x.specularIntensityMap,J=jt&&!!x.transmissionMap,G=jt&&!!x.thicknessMap,K=!!x.gradientMap,H=!!x.alphaMap,rt=x.alphaTest>0,ct=!!x.alphaHash,Ct=!!x.extensions;let Wt=Ho;x.toneMapped&&(wt===null||wt.isXRRenderTarget===!0)&&(Wt=i.toneMapping);const de={shaderID:st,shaderType:x.type,shaderName:x.name,vertexShader:ye,fragmentShader:lt,defines:x.defines,customVertexShaderID:vt,customFragmentShaderID:Pt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Xt,batchingColor:Xt&&L._colorsTexture!==null,instancing:xe,instancingColor:xe&&L.instanceColor!==null,instancingMorph:xe&&L.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:wt===null?i.outputColorSpace:wt.isXRRenderTarget===!0?wt.texture.colorSpace:Ta,alphaToCoverage:!!x.alphaToCoverage,map:Ot,matcap:yt,envMap:Lt,envMapMode:Lt&&X.mapping,envMapCubeUVHeight:Y,aoMap:V,lightMap:Nt,bumpMap:ft,normalMap:Yt,displacementMap:d&&Tt,emissiveMap:at,normalMapObjectSpace:Yt&&x.normalMapType===h1,normalMapTangentSpace:Yt&&x.normalMapType===Pu,metalnessMap:At,roughnessMap:z,anisotropy:D,anisotropyMap:Bt,clearcoat:Q,clearcoatMap:oe,clearcoatNormalMap:De,clearcoatRoughnessMap:Ut,dispersion:dt,iridescence:_t,iridescenceMap:Vt,iridescenceThicknessMap:pe,sheen:xt,sheenColorMap:Se,sheenRoughnessMap:re,specularMap:Re,specularColorMap:we,specularIntensityMap:Je,transmission:jt,transmissionMap:J,thicknessMap:G,gradientMap:K,opaque:x.transparent===!1&&x.blending===fa&&x.alphaToCoverage===!1,alphaMap:H,alphaTest:rt,alphaHash:ct,combine:x.combine,mapUv:Ot&&v(x.map.channel),aoMapUv:V&&v(x.aoMap.channel),lightMapUv:Nt&&v(x.lightMap.channel),bumpMapUv:ft&&v(x.bumpMap.channel),normalMapUv:Yt&&v(x.normalMap.channel),displacementMapUv:Tt&&v(x.displacementMap.channel),emissiveMapUv:at&&v(x.emissiveMap.channel),metalnessMapUv:At&&v(x.metalnessMap.channel),roughnessMapUv:z&&v(x.roughnessMap.channel),anisotropyMapUv:Bt&&v(x.anisotropyMap.channel),clearcoatMapUv:oe&&v(x.clearcoatMap.channel),clearcoatNormalMapUv:De&&v(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ut&&v(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Vt&&v(x.iridescenceMap.channel),iridescenceThicknessMapUv:pe&&v(x.iridescenceThicknessMap.channel),sheenColorMapUv:Se&&v(x.sheenColorMap.channel),sheenRoughnessMapUv:re&&v(x.sheenRoughnessMap.channel),specularMapUv:Re&&v(x.specularMap.channel),specularColorMapUv:we&&v(x.specularColorMap.channel),specularIntensityMapUv:Je&&v(x.specularIntensityMap.channel),transmissionMapUv:J&&v(x.transmissionMap.channel),thicknessMapUv:G&&v(x.thicknessMap.channel),alphaMapUv:H&&v(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Yt||D),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&(Ot||H),fog:!!R,useFog:x.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reverseDepthBuffer:$t,skinning:L.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:St,morphTextureStride:Ft,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&b.length>0,shadowMapType:i.shadowMap.type,toneMapping:Wt,decodeVideoTexture:Ot&&x.map.isVideoTexture===!0&&an.getTransfer(x.map.colorSpace)===dn,decodeVideoTextureEmissive:at&&x.emissiveMap.isVideoTexture===!0&&an.getTransfer(x.emissiveMap.colorSpace)===dn,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===ni,flipSided:x.side===Si,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ct&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ct&&x.extensions.multiDraw===!0||Xt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return de.vertexUv1s=h.has(1),de.vertexUv2s=h.has(2),de.vertexUv3s=h.has(3),h.clear(),de}function g(x){const y=[];if(x.shaderID?y.push(x.shaderID):(y.push(x.customVertexShaderID),y.push(x.customFragmentShaderID)),x.defines!==void 0)for(const b in x.defines)y.push(b),y.push(x.defines[b]);return x.isRawShaderMaterial===!1&&(M(y,x),T(y,x),y.push(i.outputColorSpace)),y.push(x.customProgramCacheKey),y.join()}function M(x,y){x.push(y.precision),x.push(y.outputColorSpace),x.push(y.envMapMode),x.push(y.envMapCubeUVHeight),x.push(y.mapUv),x.push(y.alphaMapUv),x.push(y.lightMapUv),x.push(y.aoMapUv),x.push(y.bumpMapUv),x.push(y.normalMapUv),x.push(y.displacementMapUv),x.push(y.emissiveMapUv),x.push(y.metalnessMapUv),x.push(y.roughnessMapUv),x.push(y.anisotropyMapUv),x.push(y.clearcoatMapUv),x.push(y.clearcoatNormalMapUv),x.push(y.clearcoatRoughnessMapUv),x.push(y.iridescenceMapUv),x.push(y.iridescenceThicknessMapUv),x.push(y.sheenColorMapUv),x.push(y.sheenRoughnessMapUv),x.push(y.specularMapUv),x.push(y.specularColorMapUv),x.push(y.specularIntensityMapUv),x.push(y.transmissionMapUv),x.push(y.thicknessMapUv),x.push(y.combine),x.push(y.fogExp2),x.push(y.sizeAttenuation),x.push(y.morphTargetsCount),x.push(y.morphAttributeCount),x.push(y.numDirLights),x.push(y.numPointLights),x.push(y.numSpotLights),x.push(y.numSpotLightMaps),x.push(y.numHemiLights),x.push(y.numRectAreaLights),x.push(y.numDirLightShadows),x.push(y.numPointLightShadows),x.push(y.numSpotLightShadows),x.push(y.numSpotLightShadowsWithMaps),x.push(y.numLightProbes),x.push(y.shadowMapType),x.push(y.toneMapping),x.push(y.numClippingPlanes),x.push(y.numClipIntersection),x.push(y.depthPacking)}function T(x,y){a.disableAll(),y.supportsVertexTextures&&a.enable(0),y.instancing&&a.enable(1),y.instancingColor&&a.enable(2),y.instancingMorph&&a.enable(3),y.matcap&&a.enable(4),y.envMap&&a.enable(5),y.normalMapObjectSpace&&a.enable(6),y.normalMapTangentSpace&&a.enable(7),y.clearcoat&&a.enable(8),y.iridescence&&a.enable(9),y.alphaTest&&a.enable(10),y.vertexColors&&a.enable(11),y.vertexAlphas&&a.enable(12),y.vertexUv1s&&a.enable(13),y.vertexUv2s&&a.enable(14),y.vertexUv3s&&a.enable(15),y.vertexTangents&&a.enable(16),y.anisotropy&&a.enable(17),y.alphaHash&&a.enable(18),y.batching&&a.enable(19),y.dispersion&&a.enable(20),y.batchingColor&&a.enable(21),x.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reverseDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),x.push(a.mask)}function E(x){const y=p[x.type];let b;if(y){const C=Ts[y];b=pl.clone(C.uniforms)}else b=x.uniforms;return b}function A(x,y){let b;for(let C=0,L=c.length;C<L;C++){const R=c[C];if(R.cacheKey===y){b=R,++b.usedTimes;break}}return b===void 0&&(b=new Zv(i,y,x,o),c.push(b)),b}function w(x){if(--x.usedTimes===0){const y=c.indexOf(x);c[y]=c[c.length-1],c.pop(),x.destroy()}}function _(x){l.remove(x)}function S(){l.dispose()}return{getParameters:m,getProgramCacheKey:g,getUniforms:E,acquireProgram:A,releaseProgram:w,releaseShaderCache:_,programs:c,dispose:S}}function ny(){let i=new WeakMap;function t(r){return i.has(r)}function e(r){let a=i.get(r);return a===void 0&&(a={},i.set(r,a)),a}function n(r){i.delete(r)}function s(r,a,l){i.get(r)[a]=l}function o(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:o}}function iy(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function hd(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function ud(){const i=[];let t=0;const e=[],n=[],s=[];function o(){t=0,e.length=0,n.length=0,s.length=0}function r(f,d,u,p,v,m){let g=i[t];return g===void 0?(g={id:f.id,object:f,geometry:d,material:u,groupOrder:p,renderOrder:f.renderOrder,z:v,group:m},i[t]=g):(g.id=f.id,g.object=f,g.geometry=d,g.material=u,g.groupOrder=p,g.renderOrder=f.renderOrder,g.z=v,g.group=m),t++,g}function a(f,d,u,p,v,m){const g=r(f,d,u,p,v,m);u.transmission>0?n.push(g):u.transparent===!0?s.push(g):e.push(g)}function l(f,d,u,p,v,m){const g=r(f,d,u,p,v,m);u.transmission>0?n.unshift(g):u.transparent===!0?s.unshift(g):e.unshift(g)}function h(f,d){e.length>1&&e.sort(f||iy),n.length>1&&n.sort(d||hd),s.length>1&&s.sort(d||hd)}function c(){for(let f=t,d=i.length;f<d;f++){const u=i[f];if(u.id===null)break;u.id=null,u.object=null,u.geometry=null,u.material=null,u.group=null}}return{opaque:e,transmissive:n,transparent:s,init:o,push:a,unshift:l,finish:c,sort:h}}function sy(){let i=new WeakMap;function t(n,s){const o=i.get(n);let r;return o===void 0?(r=new ud,i.set(n,[r])):s>=o.length?(r=new ud,o.push(r)):r=o[s],r}function e(){i=new WeakMap}return{get:t,dispose:e}}function oy(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new ge};break;case"SpotLight":e={position:new k,direction:new k,color:new ge,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new ge,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new ge,groundColor:new ge};break;case"RectAreaLight":e={color:new ge,position:new k,halfWidth:new k,halfHeight:new k};break}return i[t.id]=e,e}}}function ry(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Dt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let ay=0;function ly(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function cy(i){const t=new oy,e=ry(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)n.probe.push(new k);const s=new k,o=new qe,r=new qe;function a(h){let c=0,f=0,d=0;for(let x=0;x<9;x++)n.probe[x].set(0,0,0);let u=0,p=0,v=0,m=0,g=0,M=0,T=0,E=0,A=0,w=0,_=0;h.sort(ly);for(let x=0,y=h.length;x<y;x++){const b=h[x],C=b.color,L=b.intensity,R=b.distance,U=b.shadow&&b.shadow.map?b.shadow.map.texture:null;if(b.isAmbientLight)c+=C.r*L,f+=C.g*L,d+=C.b*L;else if(b.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(b.sh.coefficients[I],L);_++}else if(b.isDirectionalLight){const I=t.get(b);if(I.color.copy(b.color).multiplyScalar(b.intensity),b.castShadow){const X=b.shadow,Y=e.get(b);Y.shadowIntensity=X.intensity,Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,n.directionalShadow[u]=Y,n.directionalShadowMap[u]=U,n.directionalShadowMatrix[u]=b.shadow.matrix,M++}n.directional[u]=I,u++}else if(b.isSpotLight){const I=t.get(b);I.position.setFromMatrixPosition(b.matrixWorld),I.color.copy(C).multiplyScalar(L),I.distance=R,I.coneCos=Math.cos(b.angle),I.penumbraCos=Math.cos(b.angle*(1-b.penumbra)),I.decay=b.decay,n.spot[v]=I;const X=b.shadow;if(b.map&&(n.spotLightMap[A]=b.map,A++,X.updateMatrices(b),b.castShadow&&w++),n.spotLightMatrix[v]=X.matrix,b.castShadow){const Y=e.get(b);Y.shadowIntensity=X.intensity,Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,n.spotShadow[v]=Y,n.spotShadowMap[v]=U,E++}v++}else if(b.isRectAreaLight){const I=t.get(b);I.color.copy(C).multiplyScalar(L),I.halfWidth.set(b.width*.5,0,0),I.halfHeight.set(0,b.height*.5,0),n.rectArea[m]=I,m++}else if(b.isPointLight){const I=t.get(b);if(I.color.copy(b.color).multiplyScalar(b.intensity),I.distance=b.distance,I.decay=b.decay,b.castShadow){const X=b.shadow,Y=e.get(b);Y.shadowIntensity=X.intensity,Y.shadowBias=X.bias,Y.shadowNormalBias=X.normalBias,Y.shadowRadius=X.radius,Y.shadowMapSize=X.mapSize,Y.shadowCameraNear=X.camera.near,Y.shadowCameraFar=X.camera.far,n.pointShadow[p]=Y,n.pointShadowMap[p]=U,n.pointShadowMatrix[p]=b.shadow.matrix,T++}n.point[p]=I,p++}else if(b.isHemisphereLight){const I=t.get(b);I.skyColor.copy(b.color).multiplyScalar(L),I.groundColor.copy(b.groundColor).multiplyScalar(L),n.hemi[g]=I,g++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=c,n.ambient[1]=f,n.ambient[2]=d;const S=n.hash;(S.directionalLength!==u||S.pointLength!==p||S.spotLength!==v||S.rectAreaLength!==m||S.hemiLength!==g||S.numDirectionalShadows!==M||S.numPointShadows!==T||S.numSpotShadows!==E||S.numSpotMaps!==A||S.numLightProbes!==_)&&(n.directional.length=u,n.spot.length=v,n.rectArea.length=m,n.point.length=p,n.hemi.length=g,n.directionalShadow.length=M,n.directionalShadowMap.length=M,n.pointShadow.length=T,n.pointShadowMap.length=T,n.spotShadow.length=E,n.spotShadowMap.length=E,n.directionalShadowMatrix.length=M,n.pointShadowMatrix.length=T,n.spotLightMatrix.length=E+A-w,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=w,n.numLightProbes=_,S.directionalLength=u,S.pointLength=p,S.spotLength=v,S.rectAreaLength=m,S.hemiLength=g,S.numDirectionalShadows=M,S.numPointShadows=T,S.numSpotShadows=E,S.numSpotMaps=A,S.numLightProbes=_,n.version=ay++)}function l(h,c){let f=0,d=0,u=0,p=0,v=0;const m=c.matrixWorldInverse;for(let g=0,M=h.length;g<M;g++){const T=h[g];if(T.isDirectionalLight){const E=n.directional[f];E.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),f++}else if(T.isSpotLight){const E=n.spot[u];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),E.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(m),u++}else if(T.isRectAreaLight){const E=n.rectArea[p];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),r.identity(),o.copy(T.matrixWorld),o.premultiply(m),r.extractRotation(o),E.halfWidth.set(T.width*.5,0,0),E.halfHeight.set(0,T.height*.5,0),E.halfWidth.applyMatrix4(r),E.halfHeight.applyMatrix4(r),p++}else if(T.isPointLight){const E=n.point[d];E.position.setFromMatrixPosition(T.matrixWorld),E.position.applyMatrix4(m),d++}else if(T.isHemisphereLight){const E=n.hemi[v];E.direction.setFromMatrixPosition(T.matrixWorld),E.direction.transformDirection(m),v++}}}return{setup:a,setupView:l,state:n}}function fd(i){const t=new cy(i),e=[],n=[];function s(c){h.camera=c,e.length=0,n.length=0}function o(c){e.push(c)}function r(c){n.push(c)}function a(){t.setup(e)}function l(c){t.setupView(e,c)}const h={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:h,setupLights:a,setupLightsView:l,pushLight:o,pushShadow:r}}function hy(i){let t=new WeakMap;function e(s,o=0){const r=t.get(s);let a;return r===void 0?(a=new fd(i),t.set(s,[a])):o>=r.length?(a=new fd(i),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class Zp extends _r{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=c1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class uy extends _r{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const fy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function py(i,t,e){let n=new Iu;const s=new Dt,o=new Dt,r=new Sn,a=new Zp({depthPacking:Up}),l=new uy,h={},c=e.maxTextureSize,f={[_o]:Si,[Si]:_o,[ni]:ni},d=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Dt},radius:{value:4}},vertexShader:fy,fragmentShader:dy}),u=d.clone();u.defines.HORIZONTAL_PASS=1;const p=new bn;p.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Mn(p,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mp;let g=this.type;this.render=function(w,_,S){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;const x=i.getRenderTarget(),y=i.getActiveCubeFace(),b=i.getActiveMipmapLevel(),C=i.state;C.setBlending(go),C.buffers.color.setClear(1,1,1,1),C.buffers.depth.setTest(!0),C.setScissorTest(!1);const L=g!==ro&&this.type===ro,R=g===ro&&this.type!==ro;for(let U=0,I=w.length;U<I;U++){const X=w[U],Y=X.shadow;if(Y===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);const st=Y.getFrameExtents();if(s.multiply(st),o.copy(Y.mapSize),(s.x>c||s.y>c)&&(s.x>c&&(o.x=Math.floor(c/st.x),s.x=o.x*st.x,Y.mapSize.x=o.x),s.y>c&&(o.y=Math.floor(c/st.y),s.y=o.y*st.y,Y.mapSize.y=o.y)),Y.map===null||L===!0||R===!0){const St=this.type!==ro?{minFilter:Hi,magFilter:Hi}:{};Y.map!==null&&Y.map.dispose(),Y.map=new ns(s.x,s.y,St),Y.map.texture.name=X.name+".shadowMap",Y.camera.updateProjectionMatrix()}i.setRenderTarget(Y.map),i.clear();const bt=Y.getViewportCount();for(let St=0;St<bt;St++){const Ft=Y.getViewport(St);r.set(o.x*Ft.x,o.y*Ft.y,o.x*Ft.z,o.y*Ft.w),C.viewport(r),Y.updateMatrices(X,St),n=Y.getFrustum(),E(_,S,Y.camera,X,this.type)}Y.isPointLightShadow!==!0&&this.type===ro&&M(Y,S),Y.needsUpdate=!1}g=this.type,m.needsUpdate=!1,i.setRenderTarget(x,y,b)};function M(w,_){const S=t.update(v);d.defines.VSM_SAMPLES!==w.blurSamples&&(d.defines.VSM_SAMPLES=w.blurSamples,u.defines.VSM_SAMPLES=w.blurSamples,d.needsUpdate=!0,u.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ns(s.x,s.y)),d.uniforms.shadow_pass.value=w.map.texture,d.uniforms.resolution.value=w.mapSize,d.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(_,null,S,d,v,null),u.uniforms.shadow_pass.value=w.mapPass.texture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(_,null,S,u,v,null)}function T(w,_,S,x){let y=null;const b=S.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(b!==void 0)y=b;else if(y=S.isPointLight===!0?l:a,i.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0){const C=y.uuid,L=_.uuid;let R=h[C];R===void 0&&(R={},h[C]=R);let U=R[L];U===void 0&&(U=y.clone(),R[L]=U,_.addEventListener("dispose",A)),y=U}if(y.visible=_.visible,y.wireframe=_.wireframe,x===ro?y.side=_.shadowSide!==null?_.shadowSide:_.side:y.side=_.shadowSide!==null?_.shadowSide:f[_.side],y.alphaMap=_.alphaMap,y.alphaTest=_.alphaTest,y.map=_.map,y.clipShadows=_.clipShadows,y.clippingPlanes=_.clippingPlanes,y.clipIntersection=_.clipIntersection,y.displacementMap=_.displacementMap,y.displacementScale=_.displacementScale,y.displacementBias=_.displacementBias,y.wireframeLinewidth=_.wireframeLinewidth,y.linewidth=_.linewidth,S.isPointLight===!0&&y.isMeshDistanceMaterial===!0){const C=i.properties.get(y);C.light=S}return y}function E(w,_,S,x,y){if(w.visible===!1)return;if(w.layers.test(_.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&y===ro)&&(!w.frustumCulled||n.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(S.matrixWorldInverse,w.matrixWorld);const L=t.update(w),R=w.material;if(Array.isArray(R)){const U=L.groups;for(let I=0,X=U.length;I<X;I++){const Y=U[I],st=R[Y.materialIndex];if(st&&st.visible){const bt=T(w,st,x,y);w.onBeforeShadow(i,w,_,S,L,bt,Y),i.renderBufferDirect(S,null,L,bt,w,Y),w.onAfterShadow(i,w,_,S,L,bt,Y)}}}else if(R.visible){const U=T(w,R,x,y);w.onBeforeShadow(i,w,_,S,L,U,null),i.renderBufferDirect(S,null,L,U,w,null),w.onAfterShadow(i,w,_,S,L,U,null)}}const C=w.children;for(let L=0,R=C.length;L<R;L++)E(C[L],_,S,x,y)}function A(w){w.target.removeEventListener("dispose",A);for(const S in h){const x=h[S],y=w.target.uuid;y in x&&(x[y].dispose(),delete x[y])}}}const my={[Mh]:bh,[wh]:Eh,[Sh]:Ah,[ga]:Th,[bh]:Mh,[Eh]:wh,[Ah]:Sh,[Th]:ga};function gy(i,t){function e(){let J=!1;const G=new Sn;let K=null;const H=new Sn(0,0,0,0);return{setMask:function(rt){K!==rt&&!J&&(i.colorMask(rt,rt,rt,rt),K=rt)},setLocked:function(rt){J=rt},setClear:function(rt,ct,Ct,Wt,de){de===!0&&(rt*=Wt,ct*=Wt,Ct*=Wt),G.set(rt,ct,Ct,Wt),H.equals(G)===!1&&(i.clearColor(rt,ct,Ct,Wt),H.copy(G))},reset:function(){J=!1,K=null,H.set(-1,0,0,0)}}}function n(){let J=!1,G=!1,K=null,H=null,rt=null;return{setReversed:function(ct){if(G!==ct){const Ct=t.get("EXT_clip_control");G?Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.ZERO_TO_ONE_EXT):Ct.clipControlEXT(Ct.LOWER_LEFT_EXT,Ct.NEGATIVE_ONE_TO_ONE_EXT);const Wt=rt;rt=null,this.setClear(Wt)}G=ct},getReversed:function(){return G},setTest:function(ct){ct?wt(i.DEPTH_TEST):$t(i.DEPTH_TEST)},setMask:function(ct){K!==ct&&!J&&(i.depthMask(ct),K=ct)},setFunc:function(ct){if(G&&(ct=my[ct]),H!==ct){switch(ct){case Mh:i.depthFunc(i.NEVER);break;case bh:i.depthFunc(i.ALWAYS);break;case wh:i.depthFunc(i.LESS);break;case ga:i.depthFunc(i.LEQUAL);break;case Sh:i.depthFunc(i.EQUAL);break;case Th:i.depthFunc(i.GEQUAL);break;case Eh:i.depthFunc(i.GREATER);break;case Ah:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}H=ct}},setLocked:function(ct){J=ct},setClear:function(ct){rt!==ct&&(G&&(ct=1-ct),i.clearDepth(ct),rt=ct)},reset:function(){J=!1,K=null,H=null,rt=null,G=!1}}}function s(){let J=!1,G=null,K=null,H=null,rt=null,ct=null,Ct=null,Wt=null,de=null;return{setTest:function(ve){J||(ve?wt(i.STENCIL_TEST):$t(i.STENCIL_TEST))},setMask:function(ve){G!==ve&&!J&&(i.stencilMask(ve),G=ve)},setFunc:function(ve,ze,Kt){(K!==ve||H!==ze||rt!==Kt)&&(i.stencilFunc(ve,ze,Kt),K=ve,H=ze,rt=Kt)},setOp:function(ve,ze,Kt){(ct!==ve||Ct!==ze||Wt!==Kt)&&(i.stencilOp(ve,ze,Kt),ct=ve,Ct=ze,Wt=Kt)},setLocked:function(ve){J=ve},setClear:function(ve){de!==ve&&(i.clearStencil(ve),de=ve)},reset:function(){J=!1,G=null,K=null,H=null,rt=null,ct=null,Ct=null,Wt=null,de=null}}}const o=new e,r=new n,a=new s,l=new WeakMap,h=new WeakMap;let c={},f={},d=new WeakMap,u=[],p=null,v=!1,m=null,g=null,M=null,T=null,E=null,A=null,w=null,_=new ge(0,0,0),S=0,x=!1,y=null,b=null,C=null,L=null,R=null;const U=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,X=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Y)[1]),I=X>=1):Y.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),I=X>=2);let st=null,bt={};const St=i.getParameter(i.SCISSOR_BOX),Ft=i.getParameter(i.VIEWPORT),ye=new Sn().fromArray(St),lt=new Sn().fromArray(Ft);function vt(J,G,K,H){const rt=new Uint8Array(4),ct=i.createTexture();i.bindTexture(J,ct),i.texParameteri(J,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(J,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ct=0;Ct<K;Ct++)J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?i.texImage3D(G,0,i.RGBA,1,1,H,0,i.RGBA,i.UNSIGNED_BYTE,rt):i.texImage2D(G+Ct,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,rt);return ct}const Pt={};Pt[i.TEXTURE_2D]=vt(i.TEXTURE_2D,i.TEXTURE_2D,1),Pt[i.TEXTURE_CUBE_MAP]=vt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Pt[i.TEXTURE_2D_ARRAY]=vt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Pt[i.TEXTURE_3D]=vt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),o.setClear(0,0,0,1),r.setClear(1),a.setClear(0),wt(i.DEPTH_TEST),r.setFunc(ga),ft(!1),Yt(vf),wt(i.CULL_FACE),V(go);function wt(J){c[J]!==!0&&(i.enable(J),c[J]=!0)}function $t(J){c[J]!==!1&&(i.disable(J),c[J]=!1)}function xe(J,G){return f[J]!==G?(i.bindFramebuffer(J,G),f[J]=G,J===i.DRAW_FRAMEBUFFER&&(f[i.FRAMEBUFFER]=G),J===i.FRAMEBUFFER&&(f[i.DRAW_FRAMEBUFFER]=G),!0):!1}function Xt(J,G){let K=u,H=!1;if(J){K=d.get(G),K===void 0&&(K=[],d.set(G,K));const rt=J.textures;if(K.length!==rt.length||K[0]!==i.COLOR_ATTACHMENT0){for(let ct=0,Ct=rt.length;ct<Ct;ct++)K[ct]=i.COLOR_ATTACHMENT0+ct;K.length=rt.length,H=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,H=!0);H&&i.drawBuffers(K)}function Ot(J){return p!==J?(i.useProgram(J),p=J,!0):!1}const yt={[fr]:i.FUNC_ADD,[Hm]:i.FUNC_SUBTRACT,[Gm]:i.FUNC_REVERSE_SUBTRACT};yt[Wm]=i.MIN,yt[qm]=i.MAX;const Lt={[Xm]:i.ZERO,[vp]:i.ONE,[Ym]:i.SRC_COLOR,[_h]:i.SRC_ALPHA,[Qm]:i.SRC_ALPHA_SATURATE,[Zm]:i.DST_COLOR,[jm]:i.DST_ALPHA,[$m]:i.ONE_MINUS_SRC_COLOR,[Fc]:i.ONE_MINUS_SRC_ALPHA,[Jm]:i.ONE_MINUS_DST_COLOR,[Km]:i.ONE_MINUS_DST_ALPHA,[t1]:i.CONSTANT_COLOR,[e1]:i.ONE_MINUS_CONSTANT_COLOR,[n1]:i.CONSTANT_ALPHA,[i1]:i.ONE_MINUS_CONSTANT_ALPHA};function V(J,G,K,H,rt,ct,Ct,Wt,de,ve){if(J===go){v===!0&&($t(i.BLEND),v=!1);return}if(v===!1&&(wt(i.BLEND),v=!0),J!==xp){if(J!==m||ve!==x){if((g!==fr||E!==fr)&&(i.blendEquation(i.FUNC_ADD),g=fr,E=fr),ve)switch(J){case fa:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ul:i.blendFunc(i.ONE,i.ONE);break;case yf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _f:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",J);break}else switch(J){case fa:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ul:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case yf:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case _f:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",J);break}M=null,T=null,A=null,w=null,_.set(0,0,0),S=0,m=J,x=ve}return}rt=rt||G,ct=ct||K,Ct=Ct||H,(G!==g||rt!==E)&&(i.blendEquationSeparate(yt[G],yt[rt]),g=G,E=rt),(K!==M||H!==T||ct!==A||Ct!==w)&&(i.blendFuncSeparate(Lt[K],Lt[H],Lt[ct],Lt[Ct]),M=K,T=H,A=ct,w=Ct),(Wt.equals(_)===!1||de!==S)&&(i.blendColor(Wt.r,Wt.g,Wt.b,de),_.copy(Wt),S=de),m=J,x=!1}function Nt(J,G){J.side===ni?$t(i.CULL_FACE):wt(i.CULL_FACE);let K=J.side===Si;G&&(K=!K),ft(K),J.blending===fa&&J.transparent===!1?V(go):V(J.blending,J.blendEquation,J.blendSrc,J.blendDst,J.blendEquationAlpha,J.blendSrcAlpha,J.blendDstAlpha,J.blendColor,J.blendAlpha,J.premultipliedAlpha),r.setFunc(J.depthFunc),r.setTest(J.depthTest),r.setMask(J.depthWrite),o.setMask(J.colorWrite);const H=J.stencilWrite;a.setTest(H),H&&(a.setMask(J.stencilWriteMask),a.setFunc(J.stencilFunc,J.stencilRef,J.stencilFuncMask),a.setOp(J.stencilFail,J.stencilZFail,J.stencilZPass)),at(J.polygonOffset,J.polygonOffsetFactor,J.polygonOffsetUnits),J.alphaToCoverage===!0?wt(i.SAMPLE_ALPHA_TO_COVERAGE):$t(i.SAMPLE_ALPHA_TO_COVERAGE)}function ft(J){y!==J&&(J?i.frontFace(i.CW):i.frontFace(i.CCW),y=J)}function Yt(J){J!==Bm?(wt(i.CULL_FACE),J!==b&&(J===vf?i.cullFace(i.BACK):J===Vm?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):$t(i.CULL_FACE),b=J}function Tt(J){J!==C&&(I&&i.lineWidth(J),C=J)}function at(J,G,K){J?(wt(i.POLYGON_OFFSET_FILL),(L!==G||R!==K)&&(i.polygonOffset(G,K),L=G,R=K)):$t(i.POLYGON_OFFSET_FILL)}function At(J){J?wt(i.SCISSOR_TEST):$t(i.SCISSOR_TEST)}function z(J){J===void 0&&(J=i.TEXTURE0+U-1),st!==J&&(i.activeTexture(J),st=J)}function D(J,G,K){K===void 0&&(st===null?K=i.TEXTURE0+U-1:K=st);let H=bt[K];H===void 0&&(H={type:void 0,texture:void 0},bt[K]=H),(H.type!==J||H.texture!==G)&&(st!==K&&(i.activeTexture(K),st=K),i.bindTexture(J,G||Pt[J]),H.type=J,H.texture=G)}function Q(){const J=bt[st];J!==void 0&&J.type!==void 0&&(i.bindTexture(J.type,null),J.type=void 0,J.texture=void 0)}function dt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function _t(){try{i.compressedTexImage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function xt(){try{i.texSubImage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function jt(){try{i.texSubImage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function Bt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function oe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function De(){try{i.texStorage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function Ut(){try{i.texStorage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function Vt(){try{i.texImage2D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function pe(){try{i.texImage3D.apply(i,arguments)}catch(J){console.error("THREE.WebGLState:",J)}}function Se(J){ye.equals(J)===!1&&(i.scissor(J.x,J.y,J.z,J.w),ye.copy(J))}function re(J){lt.equals(J)===!1&&(i.viewport(J.x,J.y,J.z,J.w),lt.copy(J))}function Re(J,G){let K=h.get(G);K===void 0&&(K=new WeakMap,h.set(G,K));let H=K.get(J);H===void 0&&(H=i.getUniformBlockIndex(G,J.name),K.set(J,H))}function we(J,G){const H=h.get(G).get(J);l.get(G)!==H&&(i.uniformBlockBinding(G,H,J.__bindingPointIndex),l.set(G,H))}function Je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},st=null,bt={},f={},d=new WeakMap,u=[],p=null,v=!1,m=null,g=null,M=null,T=null,E=null,A=null,w=null,_=new ge(0,0,0),S=0,x=!1,y=null,b=null,C=null,L=null,R=null,ye.set(0,0,i.canvas.width,i.canvas.height),lt.set(0,0,i.canvas.width,i.canvas.height),o.reset(),r.reset(),a.reset()}return{buffers:{color:o,depth:r,stencil:a},enable:wt,disable:$t,bindFramebuffer:xe,drawBuffers:Xt,useProgram:Ot,setBlending:V,setMaterial:Nt,setFlipSided:ft,setCullFace:Yt,setLineWidth:Tt,setPolygonOffset:at,setScissorTest:At,activeTexture:z,bindTexture:D,unbindTexture:Q,compressedTexImage2D:dt,compressedTexImage3D:_t,texImage2D:Vt,texImage3D:pe,updateUBOMapping:Re,uniformBlockBinding:we,texStorage2D:De,texStorage3D:Ut,texSubImage2D:xt,texSubImage3D:jt,compressedTexSubImage2D:Bt,compressedTexSubImage3D:oe,scissor:Se,viewport:re,reset:Je}}function dd(i,t,e,n){const s=xy(n);switch(e){case Cp:return i*t;case Pp:return i*t;case Lp:return i*t*2;case Eu:return i*t/s.components*s.byteLength;case Au:return i*t/s.components*s.byteLength;case Dp:return i*t*2/s.components*s.byteLength;case Cu:return i*t*2/s.components*s.byteLength;case Rp:return i*t*3/s.components*s.byteLength;case bi:return i*t*4/s.components*s.byteLength;case Ru:return i*t*4/s.components*s.byteLength;case Ac:case Cc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Rc:case Pc:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Dh:case Uh:return Math.max(i,16)*Math.max(t,8)/4;case Lh:case Ih:return Math.max(i,8)*Math.max(t,8)/2;case zh:case kh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Nh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Fh:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Oh:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Bh:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Vh:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Hh:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Gh:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Wh:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case qh:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Xh:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Yh:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case $h:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case jh:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Kh:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case Zh:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case Lc:case Jh:case Qh:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Ip:case tu:return Math.ceil(i/4)*Math.ceil(t/4)*8;case eu:case nu:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function xy(i){switch(i){case Mo:case Tp:return{byteLength:1,components:1};case dl:case Ep:case Is:return{byteLength:2,components:1};case Su:case Tu:return{byteLength:2,components:4};case vr:case wu:case gs:return{byteLength:4,components:1};case Ap:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function vy(i,t,e,n,s,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new Dt,c=new WeakMap;let f;const d=new WeakMap;let u=!1;try{u=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(z,D){return u?new OffscreenCanvas(z,D):Bc("canvas")}function v(z,D,Q){let dt=1;const _t=At(z);if((_t.width>Q||_t.height>Q)&&(dt=Q/Math.max(_t.width,_t.height)),dt<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const xt=Math.floor(dt*_t.width),jt=Math.floor(dt*_t.height);f===void 0&&(f=p(xt,jt));const Bt=D?p(xt,jt):f;return Bt.width=xt,Bt.height=jt,Bt.getContext("2d").drawImage(z,0,0,xt,jt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+_t.width+"x"+_t.height+") to ("+xt+"x"+jt+")."),Bt}else return"data"in z&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+_t.width+"x"+_t.height+")."),z;return z}function m(z){return z.generateMipmaps}function g(z){i.generateMipmap(z)}function M(z){return z.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?i.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(z,D,Q,dt,_t=!1){if(z!==null){if(i[z]!==void 0)return i[z];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let xt=D;if(D===i.RED&&(Q===i.FLOAT&&(xt=i.R32F),Q===i.HALF_FLOAT&&(xt=i.R16F),Q===i.UNSIGNED_BYTE&&(xt=i.R8)),D===i.RED_INTEGER&&(Q===i.UNSIGNED_BYTE&&(xt=i.R8UI),Q===i.UNSIGNED_SHORT&&(xt=i.R16UI),Q===i.UNSIGNED_INT&&(xt=i.R32UI),Q===i.BYTE&&(xt=i.R8I),Q===i.SHORT&&(xt=i.R16I),Q===i.INT&&(xt=i.R32I)),D===i.RG&&(Q===i.FLOAT&&(xt=i.RG32F),Q===i.HALF_FLOAT&&(xt=i.RG16F),Q===i.UNSIGNED_BYTE&&(xt=i.RG8)),D===i.RG_INTEGER&&(Q===i.UNSIGNED_BYTE&&(xt=i.RG8UI),Q===i.UNSIGNED_SHORT&&(xt=i.RG16UI),Q===i.UNSIGNED_INT&&(xt=i.RG32UI),Q===i.BYTE&&(xt=i.RG8I),Q===i.SHORT&&(xt=i.RG16I),Q===i.INT&&(xt=i.RG32I)),D===i.RGB_INTEGER&&(Q===i.UNSIGNED_BYTE&&(xt=i.RGB8UI),Q===i.UNSIGNED_SHORT&&(xt=i.RGB16UI),Q===i.UNSIGNED_INT&&(xt=i.RGB32UI),Q===i.BYTE&&(xt=i.RGB8I),Q===i.SHORT&&(xt=i.RGB16I),Q===i.INT&&(xt=i.RGB32I)),D===i.RGBA_INTEGER&&(Q===i.UNSIGNED_BYTE&&(xt=i.RGBA8UI),Q===i.UNSIGNED_SHORT&&(xt=i.RGBA16UI),Q===i.UNSIGNED_INT&&(xt=i.RGBA32UI),Q===i.BYTE&&(xt=i.RGBA8I),Q===i.SHORT&&(xt=i.RGBA16I),Q===i.INT&&(xt=i.RGBA32I)),D===i.RGB&&Q===i.UNSIGNED_INT_5_9_9_9_REV&&(xt=i.RGB9_E5),D===i.RGBA){const jt=_t?jc:an.getTransfer(dt);Q===i.FLOAT&&(xt=i.RGBA32F),Q===i.HALF_FLOAT&&(xt=i.RGBA16F),Q===i.UNSIGNED_BYTE&&(xt=jt===dn?i.SRGB8_ALPHA8:i.RGBA8),Q===i.UNSIGNED_SHORT_4_4_4_4&&(xt=i.RGBA4),Q===i.UNSIGNED_SHORT_5_5_5_1&&(xt=i.RGB5_A1)}return(xt===i.R16F||xt===i.R32F||xt===i.RG16F||xt===i.RG32F||xt===i.RGBA16F||xt===i.RGBA32F)&&t.get("EXT_color_buffer_float"),xt}function E(z,D){let Q;return z?D===null||D===vr||D===ya?Q=i.DEPTH24_STENCIL8:D===gs?Q=i.DEPTH32F_STENCIL8:D===dl&&(Q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):D===null||D===vr||D===ya?Q=i.DEPTH_COMPONENT24:D===gs?Q=i.DEPTH_COMPONENT32F:D===dl&&(Q=i.DEPTH_COMPONENT16),Q}function A(z,D){return m(z)===!0||z.isFramebufferTexture&&z.minFilter!==Hi&&z.minFilter!==Bi?Math.log2(Math.max(D.width,D.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?D.mipmaps.length:1}function w(z){const D=z.target;D.removeEventListener("dispose",w),S(D),D.isVideoTexture&&c.delete(D)}function _(z){const D=z.target;D.removeEventListener("dispose",_),y(D)}function S(z){const D=n.get(z);if(D.__webglInit===void 0)return;const Q=z.source,dt=d.get(Q);if(dt){const _t=dt[D.__cacheKey];_t.usedTimes--,_t.usedTimes===0&&x(z),Object.keys(dt).length===0&&d.delete(Q)}n.remove(z)}function x(z){const D=n.get(z);i.deleteTexture(D.__webglTexture);const Q=z.source,dt=d.get(Q);delete dt[D.__cacheKey],r.memory.textures--}function y(z){const D=n.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),n.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let dt=0;dt<6;dt++){if(Array.isArray(D.__webglFramebuffer[dt]))for(let _t=0;_t<D.__webglFramebuffer[dt].length;_t++)i.deleteFramebuffer(D.__webglFramebuffer[dt][_t]);else i.deleteFramebuffer(D.__webglFramebuffer[dt]);D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer[dt])}else{if(Array.isArray(D.__webglFramebuffer))for(let dt=0;dt<D.__webglFramebuffer.length;dt++)i.deleteFramebuffer(D.__webglFramebuffer[dt]);else i.deleteFramebuffer(D.__webglFramebuffer);if(D.__webglDepthbuffer&&i.deleteRenderbuffer(D.__webglDepthbuffer),D.__webglMultisampledFramebuffer&&i.deleteFramebuffer(D.__webglMultisampledFramebuffer),D.__webglColorRenderbuffer)for(let dt=0;dt<D.__webglColorRenderbuffer.length;dt++)D.__webglColorRenderbuffer[dt]&&i.deleteRenderbuffer(D.__webglColorRenderbuffer[dt]);D.__webglDepthRenderbuffer&&i.deleteRenderbuffer(D.__webglDepthRenderbuffer)}const Q=z.textures;for(let dt=0,_t=Q.length;dt<_t;dt++){const xt=n.get(Q[dt]);xt.__webglTexture&&(i.deleteTexture(xt.__webglTexture),r.memory.textures--),n.remove(Q[dt])}n.remove(z)}let b=0;function C(){b=0}function L(){const z=b;return z>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+z+" texture units while this GPU supports only "+s.maxTextures),b+=1,z}function R(z){const D=[];return D.push(z.wrapS),D.push(z.wrapT),D.push(z.wrapR||0),D.push(z.magFilter),D.push(z.minFilter),D.push(z.anisotropy),D.push(z.internalFormat),D.push(z.format),D.push(z.type),D.push(z.generateMipmaps),D.push(z.premultiplyAlpha),D.push(z.flipY),D.push(z.unpackAlignment),D.push(z.colorSpace),D.join()}function U(z,D){const Q=n.get(z);if(z.isVideoTexture&&Tt(z),z.isRenderTargetTexture===!1&&z.version>0&&Q.__version!==z.version){const dt=z.image;if(dt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(dt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{lt(Q,z,D);return}}e.bindTexture(i.TEXTURE_2D,Q.__webglTexture,i.TEXTURE0+D)}function I(z,D){const Q=n.get(z);if(z.version>0&&Q.__version!==z.version){lt(Q,z,D);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Q.__webglTexture,i.TEXTURE0+D)}function X(z,D){const Q=n.get(z);if(z.version>0&&Q.__version!==z.version){lt(Q,z,D);return}e.bindTexture(i.TEXTURE_3D,Q.__webglTexture,i.TEXTURE0+D)}function Y(z,D){const Q=n.get(z);if(z.version>0&&Q.__version!==z.version){vt(Q,z,D);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Q.__webglTexture,i.TEXTURE0+D)}const st={[fl]:i.REPEAT,[Ps]:i.CLAMP_TO_EDGE,[Ph]:i.MIRRORED_REPEAT},bt={[Hi]:i.NEAREST,[l1]:i.NEAREST_MIPMAP_NEAREST,[Pl]:i.NEAREST_MIPMAP_LINEAR,[Bi]:i.LINEAR,[p0]:i.LINEAR_MIPMAP_NEAREST,[Ls]:i.LINEAR_MIPMAP_LINEAR},St={[u1]:i.NEVER,[x1]:i.ALWAYS,[f1]:i.LESS,[zp]:i.LEQUAL,[d1]:i.EQUAL,[g1]:i.GEQUAL,[p1]:i.GREATER,[m1]:i.NOTEQUAL};function Ft(z,D){if(D.type===gs&&t.has("OES_texture_float_linear")===!1&&(D.magFilter===Bi||D.magFilter===p0||D.magFilter===Pl||D.magFilter===Ls||D.minFilter===Bi||D.minFilter===p0||D.minFilter===Pl||D.minFilter===Ls)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(z,i.TEXTURE_WRAP_S,st[D.wrapS]),i.texParameteri(z,i.TEXTURE_WRAP_T,st[D.wrapT]),(z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY)&&i.texParameteri(z,i.TEXTURE_WRAP_R,st[D.wrapR]),i.texParameteri(z,i.TEXTURE_MAG_FILTER,bt[D.magFilter]),i.texParameteri(z,i.TEXTURE_MIN_FILTER,bt[D.minFilter]),D.compareFunction&&(i.texParameteri(z,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(z,i.TEXTURE_COMPARE_FUNC,St[D.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(D.magFilter===Hi||D.minFilter!==Pl&&D.minFilter!==Ls||D.type===gs&&t.has("OES_texture_float_linear")===!1)return;if(D.anisotropy>1||n.get(D).__currentAnisotropy){const Q=t.get("EXT_texture_filter_anisotropic");i.texParameterf(z,Q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(D.anisotropy,s.getMaxAnisotropy())),n.get(D).__currentAnisotropy=D.anisotropy}}}function ye(z,D){let Q=!1;z.__webglInit===void 0&&(z.__webglInit=!0,D.addEventListener("dispose",w));const dt=D.source;let _t=d.get(dt);_t===void 0&&(_t={},d.set(dt,_t));const xt=R(D);if(xt!==z.__cacheKey){_t[xt]===void 0&&(_t[xt]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,Q=!0),_t[xt].usedTimes++;const jt=_t[z.__cacheKey];jt!==void 0&&(_t[z.__cacheKey].usedTimes--,jt.usedTimes===0&&x(D)),z.__cacheKey=xt,z.__webglTexture=_t[xt].texture}return Q}function lt(z,D,Q){let dt=i.TEXTURE_2D;(D.isDataArrayTexture||D.isCompressedArrayTexture)&&(dt=i.TEXTURE_2D_ARRAY),D.isData3DTexture&&(dt=i.TEXTURE_3D);const _t=ye(z,D),xt=D.source;e.bindTexture(dt,z.__webglTexture,i.TEXTURE0+Q);const jt=n.get(xt);if(xt.version!==jt.__version||_t===!0){e.activeTexture(i.TEXTURE0+Q);const Bt=an.getPrimaries(an.workingColorSpace),oe=D.colorSpace===co?null:an.getPrimaries(D.colorSpace),De=D.colorSpace===co||Bt===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,D.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,D.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let Ut=v(D.image,!1,s.maxTextureSize);Ut=at(D,Ut);const Vt=o.convert(D.format,D.colorSpace),pe=o.convert(D.type);let Se=T(D.internalFormat,Vt,pe,D.colorSpace,D.isVideoTexture);Ft(dt,D);let re;const Re=D.mipmaps,we=D.isVideoTexture!==!0,Je=jt.__version===void 0||_t===!0,J=xt.dataReady,G=A(D,Ut);if(D.isDepthTexture)Se=E(D.format===_a,D.type),Je&&(we?e.texStorage2D(i.TEXTURE_2D,1,Se,Ut.width,Ut.height):e.texImage2D(i.TEXTURE_2D,0,Se,Ut.width,Ut.height,0,Vt,pe,null));else if(D.isDataTexture)if(Re.length>0){we&&Je&&e.texStorage2D(i.TEXTURE_2D,G,Se,Re[0].width,Re[0].height);for(let K=0,H=Re.length;K<H;K++)re=Re[K],we?J&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,re.width,re.height,Vt,pe,re.data):e.texImage2D(i.TEXTURE_2D,K,Se,re.width,re.height,0,Vt,pe,re.data);D.generateMipmaps=!1}else we?(Je&&e.texStorage2D(i.TEXTURE_2D,G,Se,Ut.width,Ut.height),J&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Ut.width,Ut.height,Vt,pe,Ut.data)):e.texImage2D(i.TEXTURE_2D,0,Se,Ut.width,Ut.height,0,Vt,pe,Ut.data);else if(D.isCompressedTexture)if(D.isCompressedArrayTexture){we&&Je&&e.texStorage3D(i.TEXTURE_2D_ARRAY,G,Se,Re[0].width,Re[0].height,Ut.depth);for(let K=0,H=Re.length;K<H;K++)if(re=Re[K],D.format!==bi)if(Vt!==null)if(we){if(J)if(D.layerUpdates.size>0){const rt=dd(re.width,re.height,D.format,D.type);for(const ct of D.layerUpdates){const Ct=re.data.subarray(ct*rt/re.data.BYTES_PER_ELEMENT,(ct+1)*rt/re.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,ct,re.width,re.height,1,Vt,Ct)}D.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,re.width,re.height,Ut.depth,Vt,re.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Se,re.width,re.height,Ut.depth,0,re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else we?J&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,re.width,re.height,Ut.depth,Vt,pe,re.data):e.texImage3D(i.TEXTURE_2D_ARRAY,K,Se,re.width,re.height,Ut.depth,0,Vt,pe,re.data)}else{we&&Je&&e.texStorage2D(i.TEXTURE_2D,G,Se,Re[0].width,Re[0].height);for(let K=0,H=Re.length;K<H;K++)re=Re[K],D.format!==bi?Vt!==null?we?J&&e.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,re.width,re.height,Vt,re.data):e.compressedTexImage2D(i.TEXTURE_2D,K,Se,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):we?J&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,re.width,re.height,Vt,pe,re.data):e.texImage2D(i.TEXTURE_2D,K,Se,re.width,re.height,0,Vt,pe,re.data)}else if(D.isDataArrayTexture)if(we){if(Je&&e.texStorage3D(i.TEXTURE_2D_ARRAY,G,Se,Ut.width,Ut.height,Ut.depth),J)if(D.layerUpdates.size>0){const K=dd(Ut.width,Ut.height,D.format,D.type);for(const H of D.layerUpdates){const rt=Ut.data.subarray(H*K/Ut.data.BYTES_PER_ELEMENT,(H+1)*K/Ut.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,H,Ut.width,Ut.height,1,Vt,pe,rt)}D.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,Ut.width,Ut.height,Ut.depth,Vt,pe,Ut.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Se,Ut.width,Ut.height,Ut.depth,0,Vt,pe,Ut.data);else if(D.isData3DTexture)we?(Je&&e.texStorage3D(i.TEXTURE_3D,G,Se,Ut.width,Ut.height,Ut.depth),J&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,Ut.width,Ut.height,Ut.depth,Vt,pe,Ut.data)):e.texImage3D(i.TEXTURE_3D,0,Se,Ut.width,Ut.height,Ut.depth,0,Vt,pe,Ut.data);else if(D.isFramebufferTexture){if(Je)if(we)e.texStorage2D(i.TEXTURE_2D,G,Se,Ut.width,Ut.height);else{let K=Ut.width,H=Ut.height;for(let rt=0;rt<G;rt++)e.texImage2D(i.TEXTURE_2D,rt,Se,K,H,0,Vt,pe,null),K>>=1,H>>=1}}else if(Re.length>0){if(we&&Je){const K=At(Re[0]);e.texStorage2D(i.TEXTURE_2D,G,Se,K.width,K.height)}for(let K=0,H=Re.length;K<H;K++)re=Re[K],we?J&&e.texSubImage2D(i.TEXTURE_2D,K,0,0,Vt,pe,re):e.texImage2D(i.TEXTURE_2D,K,Se,Vt,pe,re);D.generateMipmaps=!1}else if(we){if(Je){const K=At(Ut);e.texStorage2D(i.TEXTURE_2D,G,Se,K.width,K.height)}J&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,Vt,pe,Ut)}else e.texImage2D(i.TEXTURE_2D,0,Se,Vt,pe,Ut);m(D)&&g(dt),jt.__version=xt.version,D.onUpdate&&D.onUpdate(D)}z.__version=D.version}function vt(z,D,Q){if(D.image.length!==6)return;const dt=ye(z,D),_t=D.source;e.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+Q);const xt=n.get(_t);if(_t.version!==xt.__version||dt===!0){e.activeTexture(i.TEXTURE0+Q);const jt=an.getPrimaries(an.workingColorSpace),Bt=D.colorSpace===co?null:an.getPrimaries(D.colorSpace),oe=D.colorSpace===co||jt===Bt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,D.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,D.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const De=D.isCompressedTexture||D.image[0].isCompressedTexture,Ut=D.image[0]&&D.image[0].isDataTexture,Vt=[];for(let H=0;H<6;H++)!De&&!Ut?Vt[H]=v(D.image[H],!0,s.maxCubemapSize):Vt[H]=Ut?D.image[H].image:D.image[H],Vt[H]=at(D,Vt[H]);const pe=Vt[0],Se=o.convert(D.format,D.colorSpace),re=o.convert(D.type),Re=T(D.internalFormat,Se,re,D.colorSpace),we=D.isVideoTexture!==!0,Je=xt.__version===void 0||dt===!0,J=_t.dataReady;let G=A(D,pe);Ft(i.TEXTURE_CUBE_MAP,D);let K;if(De){we&&Je&&e.texStorage2D(i.TEXTURE_CUBE_MAP,G,Re,pe.width,pe.height);for(let H=0;H<6;H++){K=Vt[H].mipmaps;for(let rt=0;rt<K.length;rt++){const ct=K[rt];D.format!==bi?Se!==null?we?J&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,rt,0,0,ct.width,ct.height,Se,ct.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,rt,Re,ct.width,ct.height,0,ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):we?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,rt,0,0,ct.width,ct.height,Se,re,ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,rt,Re,ct.width,ct.height,0,Se,re,ct.data)}}}else{if(K=D.mipmaps,we&&Je){K.length>0&&G++;const H=At(Vt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,G,Re,H.width,H.height)}for(let H=0;H<6;H++)if(Ut){we?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,Vt[H].width,Vt[H].height,Se,re,Vt[H].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,Re,Vt[H].width,Vt[H].height,0,Se,re,Vt[H].data);for(let rt=0;rt<K.length;rt++){const Ct=K[rt].image[H].image;we?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,rt+1,0,0,Ct.width,Ct.height,Se,re,Ct.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,rt+1,Re,Ct.width,Ct.height,0,Se,re,Ct.data)}}else{we?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,Se,re,Vt[H]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,Re,Se,re,Vt[H]);for(let rt=0;rt<K.length;rt++){const ct=K[rt];we?J&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,rt+1,0,0,Se,re,ct.image[H]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+H,rt+1,Re,Se,re,ct.image[H])}}}m(D)&&g(i.TEXTURE_CUBE_MAP),xt.__version=_t.version,D.onUpdate&&D.onUpdate(D)}z.__version=D.version}function Pt(z,D,Q,dt,_t,xt){const jt=o.convert(Q.format,Q.colorSpace),Bt=o.convert(Q.type),oe=T(Q.internalFormat,jt,Bt,Q.colorSpace),De=n.get(D),Ut=n.get(Q);if(Ut.__renderTarget=D,!De.__hasExternalTextures){const Vt=Math.max(1,D.width>>xt),pe=Math.max(1,D.height>>xt);_t===i.TEXTURE_3D||_t===i.TEXTURE_2D_ARRAY?e.texImage3D(_t,xt,oe,Vt,pe,D.depth,0,jt,Bt,null):e.texImage2D(_t,xt,oe,Vt,pe,0,jt,Bt,null)}e.bindFramebuffer(i.FRAMEBUFFER,z),Yt(D)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,dt,_t,Ut.__webglTexture,0,ft(D)):(_t===i.TEXTURE_2D||_t>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&_t<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,dt,_t,Ut.__webglTexture,xt),e.bindFramebuffer(i.FRAMEBUFFER,null)}function wt(z,D,Q){if(i.bindRenderbuffer(i.RENDERBUFFER,z),D.depthBuffer){const dt=D.depthTexture,_t=dt&&dt.isDepthTexture?dt.type:null,xt=E(D.stencilBuffer,_t),jt=D.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Bt=ft(D);Yt(D)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Bt,xt,D.width,D.height):Q?i.renderbufferStorageMultisample(i.RENDERBUFFER,Bt,xt,D.width,D.height):i.renderbufferStorage(i.RENDERBUFFER,xt,D.width,D.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,jt,i.RENDERBUFFER,z)}else{const dt=D.textures;for(let _t=0;_t<dt.length;_t++){const xt=dt[_t],jt=o.convert(xt.format,xt.colorSpace),Bt=o.convert(xt.type),oe=T(xt.internalFormat,jt,Bt,xt.colorSpace),De=ft(D);Q&&Yt(D)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,De,oe,D.width,D.height):Yt(D)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,De,oe,D.width,D.height):i.renderbufferStorage(i.RENDERBUFFER,oe,D.width,D.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function $t(z,D){if(D&&D.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,z),!(D.depthTexture&&D.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const dt=n.get(D.depthTexture);dt.__renderTarget=D,(!dt.__webglTexture||D.depthTexture.image.width!==D.width||D.depthTexture.image.height!==D.height)&&(D.depthTexture.image.width=D.width,D.depthTexture.image.height=D.height,D.depthTexture.needsUpdate=!0),U(D.depthTexture,0);const _t=dt.__webglTexture,xt=ft(D);if(D.depthTexture.format===da)Yt(D)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,_t,0,xt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,_t,0);else if(D.depthTexture.format===_a)Yt(D)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,_t,0,xt):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,_t,0);else throw new Error("Unknown depthTexture format")}function xe(z){const D=n.get(z),Q=z.isWebGLCubeRenderTarget===!0;if(D.__boundDepthTexture!==z.depthTexture){const dt=z.depthTexture;if(D.__depthDisposeCallback&&D.__depthDisposeCallback(),dt){const _t=()=>{delete D.__boundDepthTexture,delete D.__depthDisposeCallback,dt.removeEventListener("dispose",_t)};dt.addEventListener("dispose",_t),D.__depthDisposeCallback=_t}D.__boundDepthTexture=dt}if(z.depthTexture&&!D.__autoAllocateDepthBuffer){if(Q)throw new Error("target.depthTexture not supported in Cube render targets");$t(D.__webglFramebuffer,z)}else if(Q){D.__webglDepthbuffer=[];for(let dt=0;dt<6;dt++)if(e.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer[dt]),D.__webglDepthbuffer[dt]===void 0)D.__webglDepthbuffer[dt]=i.createRenderbuffer(),wt(D.__webglDepthbuffer[dt],z,!1);else{const _t=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,xt=D.__webglDepthbuffer[dt];i.bindRenderbuffer(i.RENDERBUFFER,xt),i.framebufferRenderbuffer(i.FRAMEBUFFER,_t,i.RENDERBUFFER,xt)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,D.__webglFramebuffer),D.__webglDepthbuffer===void 0)D.__webglDepthbuffer=i.createRenderbuffer(),wt(D.__webglDepthbuffer,z,!1);else{const dt=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_t=D.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,_t),i.framebufferRenderbuffer(i.FRAMEBUFFER,dt,i.RENDERBUFFER,_t)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function Xt(z,D,Q){const dt=n.get(z);D!==void 0&&Pt(dt.__webglFramebuffer,z,z.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Q!==void 0&&xe(z)}function Ot(z){const D=z.texture,Q=n.get(z),dt=n.get(D);z.addEventListener("dispose",_);const _t=z.textures,xt=z.isWebGLCubeRenderTarget===!0,jt=_t.length>1;if(jt||(dt.__webglTexture===void 0&&(dt.__webglTexture=i.createTexture()),dt.__version=D.version,r.memory.textures++),xt){Q.__webglFramebuffer=[];for(let Bt=0;Bt<6;Bt++)if(D.mipmaps&&D.mipmaps.length>0){Q.__webglFramebuffer[Bt]=[];for(let oe=0;oe<D.mipmaps.length;oe++)Q.__webglFramebuffer[Bt][oe]=i.createFramebuffer()}else Q.__webglFramebuffer[Bt]=i.createFramebuffer()}else{if(D.mipmaps&&D.mipmaps.length>0){Q.__webglFramebuffer=[];for(let Bt=0;Bt<D.mipmaps.length;Bt++)Q.__webglFramebuffer[Bt]=i.createFramebuffer()}else Q.__webglFramebuffer=i.createFramebuffer();if(jt)for(let Bt=0,oe=_t.length;Bt<oe;Bt++){const De=n.get(_t[Bt]);De.__webglTexture===void 0&&(De.__webglTexture=i.createTexture(),r.memory.textures++)}if(z.samples>0&&Yt(z)===!1){Q.__webglMultisampledFramebuffer=i.createFramebuffer(),Q.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Q.__webglMultisampledFramebuffer);for(let Bt=0;Bt<_t.length;Bt++){const oe=_t[Bt];Q.__webglColorRenderbuffer[Bt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Q.__webglColorRenderbuffer[Bt]);const De=o.convert(oe.format,oe.colorSpace),Ut=o.convert(oe.type),Vt=T(oe.internalFormat,De,Ut,oe.colorSpace,z.isXRRenderTarget===!0),pe=ft(z);i.renderbufferStorageMultisample(i.RENDERBUFFER,pe,Vt,z.width,z.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Bt,i.RENDERBUFFER,Q.__webglColorRenderbuffer[Bt])}i.bindRenderbuffer(i.RENDERBUFFER,null),z.depthBuffer&&(Q.__webglDepthRenderbuffer=i.createRenderbuffer(),wt(Q.__webglDepthRenderbuffer,z,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(xt){e.bindTexture(i.TEXTURE_CUBE_MAP,dt.__webglTexture),Ft(i.TEXTURE_CUBE_MAP,D);for(let Bt=0;Bt<6;Bt++)if(D.mipmaps&&D.mipmaps.length>0)for(let oe=0;oe<D.mipmaps.length;oe++)Pt(Q.__webglFramebuffer[Bt][oe],z,D,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Bt,oe);else Pt(Q.__webglFramebuffer[Bt],z,D,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Bt,0);m(D)&&g(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(jt){for(let Bt=0,oe=_t.length;Bt<oe;Bt++){const De=_t[Bt],Ut=n.get(De);e.bindTexture(i.TEXTURE_2D,Ut.__webglTexture),Ft(i.TEXTURE_2D,De),Pt(Q.__webglFramebuffer,z,De,i.COLOR_ATTACHMENT0+Bt,i.TEXTURE_2D,0),m(De)&&g(i.TEXTURE_2D)}e.unbindTexture()}else{let Bt=i.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Bt=z.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(Bt,dt.__webglTexture),Ft(Bt,D),D.mipmaps&&D.mipmaps.length>0)for(let oe=0;oe<D.mipmaps.length;oe++)Pt(Q.__webglFramebuffer[oe],z,D,i.COLOR_ATTACHMENT0,Bt,oe);else Pt(Q.__webglFramebuffer,z,D,i.COLOR_ATTACHMENT0,Bt,0);m(D)&&g(Bt),e.unbindTexture()}z.depthBuffer&&xe(z)}function yt(z){const D=z.textures;for(let Q=0,dt=D.length;Q<dt;Q++){const _t=D[Q];if(m(_t)){const xt=M(z),jt=n.get(_t).__webglTexture;e.bindTexture(xt,jt),g(xt),e.unbindTexture()}}}const Lt=[],V=[];function Nt(z){if(z.samples>0){if(Yt(z)===!1){const D=z.textures,Q=z.width,dt=z.height;let _t=i.COLOR_BUFFER_BIT;const xt=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,jt=n.get(z),Bt=D.length>1;if(Bt)for(let oe=0;oe<D.length;oe++)e.bindFramebuffer(i.FRAMEBUFFER,jt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,jt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,jt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,jt.__webglFramebuffer);for(let oe=0;oe<D.length;oe++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(_t|=i.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(_t|=i.STENCIL_BUFFER_BIT)),Bt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,jt.__webglColorRenderbuffer[oe]);const De=n.get(D[oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,De,0)}i.blitFramebuffer(0,0,Q,dt,0,0,Q,dt,_t,i.NEAREST),l===!0&&(Lt.length=0,V.length=0,Lt.push(i.COLOR_ATTACHMENT0+oe),z.depthBuffer&&z.resolveDepthBuffer===!1&&(Lt.push(xt),V.push(xt),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,V)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Lt))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Bt)for(let oe=0;oe<D.length;oe++){e.bindFramebuffer(i.FRAMEBUFFER,jt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,jt.__webglColorRenderbuffer[oe]);const De=n.get(D[oe]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,jt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,De,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,jt.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.resolveDepthBuffer===!1&&l){const D=z.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[D])}}}function ft(z){return Math.min(s.maxSamples,z.samples)}function Yt(z){const D=n.get(z);return z.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&D.__useRenderToTexture!==!1}function Tt(z){const D=r.render.frame;c.get(z)!==D&&(c.set(z,D),z.update())}function at(z,D){const Q=z.colorSpace,dt=z.format,_t=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||Q!==Ta&&Q!==co&&(an.getTransfer(Q)===dn?(dt!==bi||_t!==Mo)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Q)),D}function At(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(h.width=z.naturalWidth||z.width,h.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(h.width=z.displayWidth,h.height=z.displayHeight):(h.width=z.width,h.height=z.height),h}this.allocateTextureUnit=L,this.resetTextureUnits=C,this.setTexture2D=U,this.setTexture2DArray=I,this.setTexture3D=X,this.setTextureCube=Y,this.rebindTextures=Xt,this.setupRenderTarget=Ot,this.updateRenderTargetMipmap=yt,this.updateMultisampleRenderTarget=Nt,this.setupDepthRenderbuffer=xe,this.setupFrameBufferTexture=Pt,this.useMultisampledRTT=Yt}function yy(i,t){function e(n,s=co){let o;const r=an.getTransfer(s);if(n===Mo)return i.UNSIGNED_BYTE;if(n===Su)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Tu)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ap)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Tp)return i.BYTE;if(n===Ep)return i.SHORT;if(n===dl)return i.UNSIGNED_SHORT;if(n===wu)return i.INT;if(n===vr)return i.UNSIGNED_INT;if(n===gs)return i.FLOAT;if(n===Is)return i.HALF_FLOAT;if(n===Cp)return i.ALPHA;if(n===Rp)return i.RGB;if(n===bi)return i.RGBA;if(n===Pp)return i.LUMINANCE;if(n===Lp)return i.LUMINANCE_ALPHA;if(n===da)return i.DEPTH_COMPONENT;if(n===_a)return i.DEPTH_STENCIL;if(n===Eu)return i.RED;if(n===Au)return i.RED_INTEGER;if(n===Dp)return i.RG;if(n===Cu)return i.RG_INTEGER;if(n===Ru)return i.RGBA_INTEGER;if(n===Ac||n===Cc||n===Rc||n===Pc)if(r===dn)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Ac)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Cc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Rc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Pc)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Ac)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Cc)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Rc)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Pc)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Lh||n===Dh||n===Ih||n===Uh)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Lh)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Dh)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ih)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Uh)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===zh||n===kh||n===Nh)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===zh||n===kh)return r===dn?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Nh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Fh||n===Oh||n===Bh||n===Vh||n===Hh||n===Gh||n===Wh||n===qh||n===Xh||n===Yh||n===$h||n===jh||n===Kh||n===Zh)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Fh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Bh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Vh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Hh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Gh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Wh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===qh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Xh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Yh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$h)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===jh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Kh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Zh)return r===dn?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Lc||n===Jh||n===Qh)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Lc)return r===dn?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Jh)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qh)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ip||n===tu||n===eu||n===nu)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Lc)return o.COMPRESSED_RED_RGTC1_EXT;if(n===tu)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===eu)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===nu)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ya?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class _y extends ts{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class Oo extends Nn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const My={type:"move"};class G0{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Oo,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Oo,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Oo,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,o=null,r=null;const a=this._targetRay,l=this._grip,h=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(h&&t.hand){r=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),g=this._getHandJoint(h,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}const c=h.joints["index-finger-tip"],f=h.joints["thumb-tip"],d=c.position.distanceTo(f.position),u=.02,p=.005;h.inputState.pinching&&d>u+p?(h.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!h.inputState.pinching&&d<=u-p&&(h.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&o!==null&&(s=o),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(My)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=o!==null),h!==null&&(h.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Oo;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const by=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,wy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Sy{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new mi,o=t.properties.get(s);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ii({vertexShader:by,fragmentShader:wy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Mn(new _l(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ty extends Ea{constructor(t,e){super();const n=this;let s=null,o=1,r=null,a="local-floor",l=1,h=null,c=null,f=null,d=null,u=null,p=null;const v=new Sy,m=e.getContextAttributes();let g=null,M=null;const T=[],E=[],A=new Dt;let w=null;const _=new ts;_.viewport=new Sn;const S=new ts;S.viewport=new Sn;const x=[_,S],y=new _y;let b=null,C=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(lt){let vt=T[lt];return vt===void 0&&(vt=new G0,T[lt]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(lt){let vt=T[lt];return vt===void 0&&(vt=new G0,T[lt]=vt),vt.getGripSpace()},this.getHand=function(lt){let vt=T[lt];return vt===void 0&&(vt=new G0,T[lt]=vt),vt.getHandSpace()};function L(lt){const vt=E.indexOf(lt.inputSource);if(vt===-1)return;const Pt=T[vt];Pt!==void 0&&(Pt.update(lt.inputSource,lt.frame,h||r),Pt.dispatchEvent({type:lt.type,data:lt.inputSource}))}function R(){s.removeEventListener("select",L),s.removeEventListener("selectstart",L),s.removeEventListener("selectend",L),s.removeEventListener("squeeze",L),s.removeEventListener("squeezestart",L),s.removeEventListener("squeezeend",L),s.removeEventListener("end",R),s.removeEventListener("inputsourceschange",U);for(let lt=0;lt<T.length;lt++){const vt=E[lt];vt!==null&&(E[lt]=null,T[lt].disconnect(vt))}b=null,C=null,v.reset(),t.setRenderTarget(g),u=null,d=null,f=null,s=null,M=null,ye.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(A.width,A.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(lt){o=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(lt){a=lt,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return h||r},this.setReferenceSpace=function(lt){h=lt},this.getBaseLayer=function(){return d!==null?d:u},this.getBinding=function(){return f},this.getFrame=function(){return p},this.getSession=function(){return s},this.setSession=async function(lt){if(s=lt,s!==null){if(g=t.getRenderTarget(),s.addEventListener("select",L),s.addEventListener("selectstart",L),s.addEventListener("selectend",L),s.addEventListener("squeeze",L),s.addEventListener("squeezestart",L),s.addEventListener("squeezeend",L),s.addEventListener("end",R),s.addEventListener("inputsourceschange",U),m.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(A),s.renderState.layers===void 0){const vt={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};u=new XRWebGLLayer(s,e,vt),s.updateRenderState({baseLayer:u}),t.setPixelRatio(1),t.setSize(u.framebufferWidth,u.framebufferHeight,!1),M=new ns(u.framebufferWidth,u.framebufferHeight,{format:bi,type:Mo,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let vt=null,Pt=null,wt=null;m.depth&&(wt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,vt=m.stencil?_a:da,Pt=m.stencil?ya:vr);const $t={colorFormat:e.RGBA8,depthFormat:wt,scaleFactor:o};f=new XRWebGLBinding(s,e),d=f.createProjectionLayer($t),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),M=new ns(d.textureWidth,d.textureHeight,{format:bi,type:Mo,depthTexture:new Xp(d.textureWidth,d.textureHeight,Pt,void 0,void 0,void 0,void 0,void 0,void 0,vt),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(l),h=null,r=await s.requestReferenceSpace(a),ye.setContext(s),ye.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function U(lt){for(let vt=0;vt<lt.removed.length;vt++){const Pt=lt.removed[vt],wt=E.indexOf(Pt);wt>=0&&(E[wt]=null,T[wt].disconnect(Pt))}for(let vt=0;vt<lt.added.length;vt++){const Pt=lt.added[vt];let wt=E.indexOf(Pt);if(wt===-1){for(let xe=0;xe<T.length;xe++)if(xe>=E.length){E.push(Pt),wt=xe;break}else if(E[xe]===null){E[xe]=Pt,wt=xe;break}if(wt===-1)break}const $t=T[wt];$t&&$t.connect(Pt)}}const I=new k,X=new k;function Y(lt,vt,Pt){I.setFromMatrixPosition(vt.matrixWorld),X.setFromMatrixPosition(Pt.matrixWorld);const wt=I.distanceTo(X),$t=vt.projectionMatrix.elements,xe=Pt.projectionMatrix.elements,Xt=$t[14]/($t[10]-1),Ot=$t[14]/($t[10]+1),yt=($t[9]+1)/$t[5],Lt=($t[9]-1)/$t[5],V=($t[8]-1)/$t[0],Nt=(xe[8]+1)/xe[0],ft=Xt*V,Yt=Xt*Nt,Tt=wt/(-V+Nt),at=Tt*-V;if(vt.matrixWorld.decompose(lt.position,lt.quaternion,lt.scale),lt.translateX(at),lt.translateZ(Tt),lt.matrixWorld.compose(lt.position,lt.quaternion,lt.scale),lt.matrixWorldInverse.copy(lt.matrixWorld).invert(),$t[10]===-1)lt.projectionMatrix.copy(vt.projectionMatrix),lt.projectionMatrixInverse.copy(vt.projectionMatrixInverse);else{const At=Xt+Tt,z=Ot+Tt,D=ft-at,Q=Yt+(wt-at),dt=yt*Ot/z*At,_t=Lt*Ot/z*At;lt.projectionMatrix.makePerspective(D,Q,dt,_t,At,z),lt.projectionMatrixInverse.copy(lt.projectionMatrix).invert()}}function st(lt,vt){vt===null?lt.matrixWorld.copy(lt.matrix):lt.matrixWorld.multiplyMatrices(vt.matrixWorld,lt.matrix),lt.matrixWorldInverse.copy(lt.matrixWorld).invert()}this.updateCamera=function(lt){if(s===null)return;let vt=lt.near,Pt=lt.far;v.texture!==null&&(v.depthNear>0&&(vt=v.depthNear),v.depthFar>0&&(Pt=v.depthFar)),y.near=S.near=_.near=vt,y.far=S.far=_.far=Pt,(b!==y.near||C!==y.far)&&(s.updateRenderState({depthNear:y.near,depthFar:y.far}),b=y.near,C=y.far),_.layers.mask=lt.layers.mask|2,S.layers.mask=lt.layers.mask|4,y.layers.mask=_.layers.mask|S.layers.mask;const wt=lt.parent,$t=y.cameras;st(y,wt);for(let xe=0;xe<$t.length;xe++)st($t[xe],wt);$t.length===2?Y(y,_,S):y.projectionMatrix.copy(_.projectionMatrix),bt(lt,y,wt)};function bt(lt,vt,Pt){Pt===null?lt.matrix.copy(vt.matrixWorld):(lt.matrix.copy(Pt.matrixWorld),lt.matrix.invert(),lt.matrix.multiply(vt.matrixWorld)),lt.matrix.decompose(lt.position,lt.quaternion,lt.scale),lt.updateMatrixWorld(!0),lt.projectionMatrix.copy(vt.projectionMatrix),lt.projectionMatrixInverse.copy(vt.projectionMatrixInverse),lt.isPerspectiveCamera&&(lt.fov=su*2*Math.atan(1/lt.projectionMatrix.elements[5]),lt.zoom=1)}this.getCamera=function(){return y},this.getFoveation=function(){if(!(d===null&&u===null))return l},this.setFoveation=function(lt){l=lt,d!==null&&(d.fixedFoveation=lt),u!==null&&u.fixedFoveation!==void 0&&(u.fixedFoveation=lt)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(y)};let St=null;function Ft(lt,vt){if(c=vt.getViewerPose(h||r),p=vt,c!==null){const Pt=c.views;u!==null&&(t.setRenderTargetFramebuffer(M,u.framebuffer),t.setRenderTarget(M));let wt=!1;Pt.length!==y.cameras.length&&(y.cameras.length=0,wt=!0);for(let xe=0;xe<Pt.length;xe++){const Xt=Pt[xe];let Ot=null;if(u!==null)Ot=u.getViewport(Xt);else{const Lt=f.getViewSubImage(d,Xt);Ot=Lt.viewport,xe===0&&(t.setRenderTargetTextures(M,Lt.colorTexture,d.ignoreDepthValues?void 0:Lt.depthStencilTexture),t.setRenderTarget(M))}let yt=x[xe];yt===void 0&&(yt=new ts,yt.layers.enable(xe),yt.viewport=new Sn,x[xe]=yt),yt.matrix.fromArray(Xt.transform.matrix),yt.matrix.decompose(yt.position,yt.quaternion,yt.scale),yt.projectionMatrix.fromArray(Xt.projectionMatrix),yt.projectionMatrixInverse.copy(yt.projectionMatrix).invert(),yt.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),xe===0&&(y.matrix.copy(yt.matrix),y.matrix.decompose(y.position,y.quaternion,y.scale)),wt===!0&&y.cameras.push(yt)}const $t=s.enabledFeatures;if($t&&$t.includes("depth-sensing")){const xe=f.getDepthInformation(Pt[0]);xe&&xe.isValid&&xe.texture&&v.init(t,xe,s.renderState)}}for(let Pt=0;Pt<T.length;Pt++){const wt=E[Pt],$t=T[Pt];wt!==null&&$t!==void 0&&$t.update(wt,vt,h||r)}St&&St(lt,vt),vt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:vt}),p=null}const ye=new qp;ye.setAnimationLoop(Ft),this.setAnimationLoop=function(lt){St=lt},this.dispose=function(){}}}const tr=new Ei,Ey=new qe;function Ay(i,t){function e(m,g){m.matrixAutoUpdate===!0&&m.updateMatrix(),g.value.copy(m.matrix)}function n(m,g){g.color.getRGB(m.fogColor.value,Hp(i)),g.isFog?(m.fogNear.value=g.near,m.fogFar.value=g.far):g.isFogExp2&&(m.fogDensity.value=g.density)}function s(m,g,M,T,E){g.isMeshBasicMaterial||g.isMeshLambertMaterial?o(m,g):g.isMeshToonMaterial?(o(m,g),f(m,g)):g.isMeshPhongMaterial?(o(m,g),c(m,g)):g.isMeshStandardMaterial?(o(m,g),d(m,g),g.isMeshPhysicalMaterial&&u(m,g,E)):g.isMeshMatcapMaterial?(o(m,g),p(m,g)):g.isMeshDepthMaterial?o(m,g):g.isMeshDistanceMaterial?(o(m,g),v(m,g)):g.isMeshNormalMaterial?o(m,g):g.isLineBasicMaterial?(r(m,g),g.isLineDashedMaterial&&a(m,g)):g.isPointsMaterial?l(m,g,M,T):g.isSpriteMaterial?h(m,g):g.isShadowMaterial?(m.color.value.copy(g.color),m.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function o(m,g){m.opacity.value=g.opacity,g.color&&m.diffuse.value.copy(g.color),g.emissive&&m.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.bumpMap&&(m.bumpMap.value=g.bumpMap,e(g.bumpMap,m.bumpMapTransform),m.bumpScale.value=g.bumpScale,g.side===Si&&(m.bumpScale.value*=-1)),g.normalMap&&(m.normalMap.value=g.normalMap,e(g.normalMap,m.normalMapTransform),m.normalScale.value.copy(g.normalScale),g.side===Si&&m.normalScale.value.negate()),g.displacementMap&&(m.displacementMap.value=g.displacementMap,e(g.displacementMap,m.displacementMapTransform),m.displacementScale.value=g.displacementScale,m.displacementBias.value=g.displacementBias),g.emissiveMap&&(m.emissiveMap.value=g.emissiveMap,e(g.emissiveMap,m.emissiveMapTransform)),g.specularMap&&(m.specularMap.value=g.specularMap,e(g.specularMap,m.specularMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest);const M=t.get(g),T=M.envMap,E=M.envMapRotation;T&&(m.envMap.value=T,tr.copy(E),tr.x*=-1,tr.y*=-1,tr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(tr.y*=-1,tr.z*=-1),m.envMapRotation.value.setFromMatrix4(Ey.makeRotationFromEuler(tr)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=g.reflectivity,m.ior.value=g.ior,m.refractionRatio.value=g.refractionRatio),g.lightMap&&(m.lightMap.value=g.lightMap,m.lightMapIntensity.value=g.lightMapIntensity,e(g.lightMap,m.lightMapTransform)),g.aoMap&&(m.aoMap.value=g.aoMap,m.aoMapIntensity.value=g.aoMapIntensity,e(g.aoMap,m.aoMapTransform))}function r(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform))}function a(m,g){m.dashSize.value=g.dashSize,m.totalSize.value=g.dashSize+g.gapSize,m.scale.value=g.scale}function l(m,g,M,T){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.size.value=g.size*M,m.scale.value=T*.5,g.map&&(m.map.value=g.map,e(g.map,m.uvTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function h(m,g){m.diffuse.value.copy(g.color),m.opacity.value=g.opacity,m.rotation.value=g.rotation,g.map&&(m.map.value=g.map,e(g.map,m.mapTransform)),g.alphaMap&&(m.alphaMap.value=g.alphaMap,e(g.alphaMap,m.alphaMapTransform)),g.alphaTest>0&&(m.alphaTest.value=g.alphaTest)}function c(m,g){m.specular.value.copy(g.specular),m.shininess.value=Math.max(g.shininess,1e-4)}function f(m,g){g.gradientMap&&(m.gradientMap.value=g.gradientMap)}function d(m,g){m.metalness.value=g.metalness,g.metalnessMap&&(m.metalnessMap.value=g.metalnessMap,e(g.metalnessMap,m.metalnessMapTransform)),m.roughness.value=g.roughness,g.roughnessMap&&(m.roughnessMap.value=g.roughnessMap,e(g.roughnessMap,m.roughnessMapTransform)),g.envMap&&(m.envMapIntensity.value=g.envMapIntensity)}function u(m,g,M){m.ior.value=g.ior,g.sheen>0&&(m.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),m.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(m.sheenColorMap.value=g.sheenColorMap,e(g.sheenColorMap,m.sheenColorMapTransform)),g.sheenRoughnessMap&&(m.sheenRoughnessMap.value=g.sheenRoughnessMap,e(g.sheenRoughnessMap,m.sheenRoughnessMapTransform))),g.clearcoat>0&&(m.clearcoat.value=g.clearcoat,m.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(m.clearcoatMap.value=g.clearcoatMap,e(g.clearcoatMap,m.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,e(g.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(m.clearcoatNormalMap.value=g.clearcoatNormalMap,e(g.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Si&&m.clearcoatNormalScale.value.negate())),g.dispersion>0&&(m.dispersion.value=g.dispersion),g.iridescence>0&&(m.iridescence.value=g.iridescence,m.iridescenceIOR.value=g.iridescenceIOR,m.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(m.iridescenceMap.value=g.iridescenceMap,e(g.iridescenceMap,m.iridescenceMapTransform)),g.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=g.iridescenceThicknessMap,e(g.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),g.transmission>0&&(m.transmission.value=g.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),g.transmissionMap&&(m.transmissionMap.value=g.transmissionMap,e(g.transmissionMap,m.transmissionMapTransform)),m.thickness.value=g.thickness,g.thicknessMap&&(m.thicknessMap.value=g.thicknessMap,e(g.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=g.attenuationDistance,m.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(m.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(m.anisotropyMap.value=g.anisotropyMap,e(g.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=g.specularIntensity,m.specularColor.value.copy(g.specularColor),g.specularColorMap&&(m.specularColorMap.value=g.specularColorMap,e(g.specularColorMap,m.specularColorMapTransform)),g.specularIntensityMap&&(m.specularIntensityMap.value=g.specularIntensityMap,e(g.specularIntensityMap,m.specularIntensityMapTransform))}function p(m,g){g.matcap&&(m.matcap.value=g.matcap)}function v(m,g){const M=t.get(g).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Cy(i,t,e,n){let s={},o={},r=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(M,T){const E=T.program;n.uniformBlockBinding(M,E)}function h(M,T){let E=s[M.id];E===void 0&&(p(M),E=c(M),s[M.id]=E,M.addEventListener("dispose",m));const A=T.program;n.updateUBOMapping(M,A);const w=t.render.frame;o[M.id]!==w&&(d(M),o[M.id]=w)}function c(M){const T=f();M.__bindingPointIndex=T;const E=i.createBuffer(),A=M.__size,w=M.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,A,w),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,T,E),E}function f(){for(let M=0;M<a;M++)if(r.indexOf(M)===-1)return r.push(M),M;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(M){const T=s[M.id],E=M.uniforms,A=M.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let w=0,_=E.length;w<_;w++){const S=Array.isArray(E[w])?E[w]:[E[w]];for(let x=0,y=S.length;x<y;x++){const b=S[x];if(u(b,w,x,A)===!0){const C=b.__offset,L=Array.isArray(b.value)?b.value:[b.value];let R=0;for(let U=0;U<L.length;U++){const I=L[U],X=v(I);typeof I=="number"||typeof I=="boolean"?(b.__data[0]=I,i.bufferSubData(i.UNIFORM_BUFFER,C+R,b.__data)):I.isMatrix3?(b.__data[0]=I.elements[0],b.__data[1]=I.elements[1],b.__data[2]=I.elements[2],b.__data[3]=0,b.__data[4]=I.elements[3],b.__data[5]=I.elements[4],b.__data[6]=I.elements[5],b.__data[7]=0,b.__data[8]=I.elements[6],b.__data[9]=I.elements[7],b.__data[10]=I.elements[8],b.__data[11]=0):(I.toArray(b.__data,R),R+=X.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,C,b.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(M,T,E,A){const w=M.value,_=T+"_"+E;if(A[_]===void 0)return typeof w=="number"||typeof w=="boolean"?A[_]=w:A[_]=w.clone(),!0;{const S=A[_];if(typeof w=="number"||typeof w=="boolean"){if(S!==w)return A[_]=w,!0}else if(S.equals(w)===!1)return S.copy(w),!0}return!1}function p(M){const T=M.uniforms;let E=0;const A=16;for(let _=0,S=T.length;_<S;_++){const x=Array.isArray(T[_])?T[_]:[T[_]];for(let y=0,b=x.length;y<b;y++){const C=x[y],L=Array.isArray(C.value)?C.value:[C.value];for(let R=0,U=L.length;R<U;R++){const I=L[R],X=v(I),Y=E%A,st=Y%X.boundary,bt=Y+st;E+=st,bt!==0&&A-bt<X.storage&&(E+=A-bt),C.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),C.__offset=E,E+=X.storage}}}const w=E%A;return w>0&&(E+=A-w),M.__size=E,M.__cache={},this}function v(M){const T={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(T.boundary=4,T.storage=4):M.isVector2?(T.boundary=8,T.storage=8):M.isVector3||M.isColor?(T.boundary=16,T.storage=12):M.isVector4?(T.boundary=16,T.storage=16):M.isMatrix3?(T.boundary=48,T.storage=48):M.isMatrix4?(T.boundary=64,T.storage=64):M.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",M),T}function m(M){const T=M.target;T.removeEventListener("dispose",m);const E=r.indexOf(T.__bindingPointIndex);r.splice(E,1),i.deleteBuffer(s[T.id]),delete s[T.id],delete o[T.id]}function g(){for(const M in s)i.deleteBuffer(s[M]);r=[],s={},o={}}return{bind:l,update:h,dispose:g}}class Ry{constructor(t={}){const{canvas:e=y1(),context:n=null,depth:s=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:h=!1,powerPreference:c="default",failIfMajorPerformanceCaveat:f=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=r;const p=new Uint32Array(4),v=new Int32Array(4);let m=null,g=null;const M=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ti,this.toneMapping=Ho,this.toneMappingExposure=1;const E=this;let A=!1,w=0,_=0,S=null,x=-1,y=null;const b=new Sn,C=new Sn;let L=null;const R=new ge(0);let U=0,I=e.width,X=e.height,Y=1,st=null,bt=null;const St=new Sn(0,0,I,X),Ft=new Sn(0,0,I,X);let ye=!1;const lt=new Iu;let vt=!1,Pt=!1;const wt=new qe,$t=new qe,xe=new k,Xt=new Sn,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let yt=!1;function Lt(){return S===null?Y:1}let V=n;function Nt(P,O){return e.getContext(P,O)}try{const P={alpha:!0,depth:s,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:h,powerPreference:c,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${_u}`),e.addEventListener("webglcontextlost",H,!1),e.addEventListener("webglcontextrestored",rt,!1),e.addEventListener("webglcontextcreationerror",ct,!1),V===null){const O="webgl2";if(V=Nt(O,P),V===null)throw Nt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let ft,Yt,Tt,at,At,z,D,Q,dt,_t,xt,jt,Bt,oe,De,Ut,Vt,pe,Se,re,Re,we,Je,J;function G(){ft=new zx(V),ft.init(),we=new yy(V,ft),Yt=new Rx(V,ft,t,we),Tt=new gy(V,ft),Yt.reverseDepthBuffer&&d&&Tt.buffers.depth.setReversed(!0),at=new Fx(V),At=new ny,z=new vy(V,ft,Tt,At,Yt,we,at),D=new Lx(E),Q=new Ux(E),dt=new q1(V),Je=new Ax(V,dt),_t=new kx(V,dt,at,Je),xt=new Bx(V,_t,dt,at),Se=new Ox(V,Yt,z),Ut=new Px(At),jt=new ey(E,D,Q,ft,Yt,Je,Ut),Bt=new Ay(E,At),oe=new sy,De=new hy(ft),pe=new Ex(E,D,Q,Tt,xt,u,l),Vt=new py(E,xt,Yt),J=new Cy(V,at,Yt,Tt),re=new Cx(V,ft,at),Re=new Nx(V,ft,at),at.programs=jt.programs,E.capabilities=Yt,E.extensions=ft,E.properties=At,E.renderLists=oe,E.shadowMap=Vt,E.state=Tt,E.info=at}G();const K=new Ty(E,V);this.xr=K,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){const P=ft.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=ft.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(P){P!==void 0&&(Y=P,this.setSize(I,X,!1))},this.getSize=function(P){return P.set(I,X)},this.setSize=function(P,O,q=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=P,X=O,e.width=Math.floor(P*Y),e.height=Math.floor(O*Y),q===!0&&(e.style.width=P+"px",e.style.height=O+"px"),this.setViewport(0,0,P,O)},this.getDrawingBufferSize=function(P){return P.set(I*Y,X*Y).floor()},this.setDrawingBufferSize=function(P,O,q){I=P,X=O,Y=q,e.width=Math.floor(P*q),e.height=Math.floor(O*q),this.setViewport(0,0,P,O)},this.getCurrentViewport=function(P){return P.copy(b)},this.getViewport=function(P){return P.copy(St)},this.setViewport=function(P,O,q,j){P.isVector4?St.set(P.x,P.y,P.z,P.w):St.set(P,O,q,j),Tt.viewport(b.copy(St).multiplyScalar(Y).round())},this.getScissor=function(P){return P.copy(Ft)},this.setScissor=function(P,O,q,j){P.isVector4?Ft.set(P.x,P.y,P.z,P.w):Ft.set(P,O,q,j),Tt.scissor(C.copy(Ft).multiplyScalar(Y).round())},this.getScissorTest=function(){return ye},this.setScissorTest=function(P){Tt.setScissorTest(ye=P)},this.setOpaqueSort=function(P){st=P},this.setTransparentSort=function(P){bt=P},this.getClearColor=function(P){return P.copy(pe.getClearColor())},this.setClearColor=function(){pe.setClearColor.apply(pe,arguments)},this.getClearAlpha=function(){return pe.getClearAlpha()},this.setClearAlpha=function(){pe.setClearAlpha.apply(pe,arguments)},this.clear=function(P=!0,O=!0,q=!0){let j=0;if(P){let $=!1;if(S!==null){const Mt=S.texture.format;$=Mt===Ru||Mt===Cu||Mt===Au}if($){const Mt=S.texture.type,pt=Mt===Mo||Mt===vr||Mt===dl||Mt===ya||Mt===Su||Mt===Tu,gt=pe.getClearColor(),zt=pe.getClearAlpha(),Qt=gt.r,ie=gt.g,Zt=gt.b;pt?(p[0]=Qt,p[1]=ie,p[2]=Zt,p[3]=zt,V.clearBufferuiv(V.COLOR,0,p)):(v[0]=Qt,v[1]=ie,v[2]=Zt,v[3]=zt,V.clearBufferiv(V.COLOR,0,v))}else j|=V.COLOR_BUFFER_BIT}O&&(j|=V.DEPTH_BUFFER_BIT),q&&(j|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),V.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",H,!1),e.removeEventListener("webglcontextrestored",rt,!1),e.removeEventListener("webglcontextcreationerror",ct,!1),oe.dispose(),De.dispose(),At.dispose(),D.dispose(),Q.dispose(),xt.dispose(),Je.dispose(),J.dispose(),jt.dispose(),K.dispose(),K.removeEventListener("sessionstart",sn),K.removeEventListener("sessionend",ue),He.stop()};function H(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function rt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const P=at.autoReset,O=Vt.enabled,q=Vt.autoUpdate,j=Vt.needsUpdate,$=Vt.type;G(),at.autoReset=P,Vt.enabled=O,Vt.autoUpdate=q,Vt.needsUpdate=j,Vt.type=$}function ct(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Ct(P){const O=P.target;O.removeEventListener("dispose",Ct),Wt(O)}function Wt(P){de(P),At.remove(P)}function de(P){const O=At.get(P).programs;O!==void 0&&(O.forEach(function(q){jt.releaseProgram(q)}),P.isShaderMaterial&&jt.releaseShaderCache(P))}this.renderBufferDirect=function(P,O,q,j,$,Mt){O===null&&(O=Ot);const pt=$.isMesh&&$.matrixWorld.determinant()<0,gt=nt(P,O,q,j,$);Tt.setMaterial(j,pt);let zt=q.index,Qt=1;if(j.wireframe===!0){if(zt=_t.getWireframeAttribute(q),zt===void 0)return;Qt=2}const ie=q.drawRange,Zt=q.attributes.position;let Oe=ie.start*Qt,tn=(ie.start+ie.count)*Qt;Mt!==null&&(Oe=Math.max(Oe,Mt.start*Qt),tn=Math.min(tn,(Mt.start+Mt.count)*Qt)),zt!==null?(Oe=Math.max(Oe,0),tn=Math.min(tn,zt.count)):Zt!=null&&(Oe=Math.max(Oe,0),tn=Math.min(tn,Zt.count));const ln=tn-Oe;if(ln<0||ln===1/0)return;Je.setup($,j,gt,q,zt);let Pn,en=re;if(zt!==null&&(Pn=dt.get(zt),en=Re,en.setIndex(Pn)),$.isMesh)j.wireframe===!0?(Tt.setLineWidth(j.wireframeLinewidth*Lt()),en.setMode(V.LINES)):en.setMode(V.TRIANGLES);else if($.isLine){let _e=j.linewidth;_e===void 0&&(_e=1),Tt.setLineWidth(_e*Lt()),$.isLineSegments?en.setMode(V.LINES):$.isLineLoop?en.setMode(V.LINE_LOOP):en.setMode(V.LINE_STRIP)}else $.isPoints?en.setMode(V.POINTS):$.isSprite&&en.setMode(V.TRIANGLES);if($.isBatchedMesh)if($._multiDrawInstances!==null)en.renderMultiDrawInstances($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount,$._multiDrawInstances);else if(ft.get("WEBGL_multi_draw"))en.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const _e=$._multiDrawStarts,Ai=$._multiDrawCounts,rn=$._multiDrawCount,ri=zt?dt.get(zt).bytesPerElement:1,Fs=At.get(j).currentProgram.getUniforms();for(let wn=0;wn<rn;wn++)Fs.setValue(V,"_gl_DrawID",wn),en.render(_e[wn]/ri,Ai[wn])}else if($.isInstancedMesh)en.renderInstances(Oe,ln,$.count);else if(q.isInstancedBufferGeometry){const _e=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Ai=Math.min(q.instanceCount,_e);en.renderInstances(Oe,ln,Ai)}else en.render(Oe,ln)};function ve(P,O,q){P.transparent===!0&&P.side===ni&&P.forceSinglePass===!1?(P.side=Si,P.needsUpdate=!0,N(P,O,q),P.side=_o,P.needsUpdate=!0,N(P,O,q),P.side=ni):N(P,O,q)}this.compile=function(P,O,q=null){q===null&&(q=P),g=De.get(q),g.init(O),T.push(g),q.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(g.pushLight($),$.castShadow&&g.pushShadow($))}),P!==q&&P.traverseVisible(function($){$.isLight&&$.layers.test(O.layers)&&(g.pushLight($),$.castShadow&&g.pushShadow($))}),g.setupLights();const j=new Set;return P.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Mt=$.material;if(Mt)if(Array.isArray(Mt))for(let pt=0;pt<Mt.length;pt++){const gt=Mt[pt];ve(gt,q,$),j.add(gt)}else ve(Mt,q,$),j.add(Mt)}),T.pop(),g=null,j},this.compileAsync=function(P,O,q=null){const j=this.compile(P,O,q);return new Promise($=>{function Mt(){if(j.forEach(function(pt){At.get(pt).currentProgram.isReady()&&j.delete(pt)}),j.size===0){$(P);return}setTimeout(Mt,10)}ft.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let ze=null;function Kt(P){ze&&ze(P)}function sn(){He.stop()}function ue(){He.start()}const He=new qp;He.setAnimationLoop(Kt),typeof self<"u"&&He.setContext(self),this.setAnimationLoop=function(P){ze=P,K.setAnimationLoop(P),P===null?He.stop():He.start()},K.addEventListener("sessionstart",sn),K.addEventListener("sessionend",ue),this.render=function(P,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(O),O=K.getCamera()),P.isScene===!0&&P.onBeforeRender(E,P,O,S),g=De.get(P,T.length),g.init(O),T.push(g),$t.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),lt.setFromProjectionMatrix($t),Pt=this.localClippingEnabled,vt=Ut.init(this.clippingPlanes,Pt),m=oe.get(P,M.length),m.init(),M.push(m),K.enabled===!0&&K.isPresenting===!0){const Mt=E.xr.getDepthSensingMesh();Mt!==null&&Tn(Mt,O,-1/0,E.sortObjects)}Tn(P,O,0,E.sortObjects),m.finish(),E.sortObjects===!0&&m.sort(st,bt),yt=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,yt&&pe.addToRenderList(m,P),this.info.render.frame++,vt===!0&&Ut.beginShadows();const q=g.state.shadowsArray;Vt.render(q,P,O),vt===!0&&Ut.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=m.opaque,$=m.transmissive;if(g.setupLights(),O.isArrayCamera){const Mt=O.cameras;if($.length>0)for(let pt=0,gt=Mt.length;pt<gt;pt++){const zt=Mt[pt];vs(j,$,P,zt)}yt&&pe.render(P);for(let pt=0,gt=Mt.length;pt<gt;pt++){const zt=Mt[pt];Fn(m,P,zt,zt.viewport)}}else $.length>0&&vs(j,$,P,O),yt&&pe.render(P),Fn(m,P,O);S!==null&&(z.updateMultisampleRenderTarget(S),z.updateRenderTargetMipmap(S)),P.isScene===!0&&P.onAfterRender(E,P,O),Je.resetDefaultState(),x=-1,y=null,T.pop(),T.length>0?(g=T[T.length-1],vt===!0&&Ut.setGlobalState(E.clippingPlanes,g.state.camera)):g=null,M.pop(),M.length>0?m=M[M.length-1]:m=null};function Tn(P,O,q,j){if(P.visible===!1)return;if(P.layers.test(O.layers)){if(P.isGroup)q=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(O);else if(P.isLight)g.pushLight(P),P.castShadow&&g.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||lt.intersectsSprite(P)){j&&Xt.setFromMatrixPosition(P.matrixWorld).applyMatrix4($t);const pt=xt.update(P),gt=P.material;gt.visible&&m.push(P,pt,gt,q,Xt.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||lt.intersectsObject(P))){const pt=xt.update(P),gt=P.material;if(j&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),Xt.copy(P.boundingSphere.center)):(pt.boundingSphere===null&&pt.computeBoundingSphere(),Xt.copy(pt.boundingSphere.center)),Xt.applyMatrix4(P.matrixWorld).applyMatrix4($t)),Array.isArray(gt)){const zt=pt.groups;for(let Qt=0,ie=zt.length;Qt<ie;Qt++){const Zt=zt[Qt],Oe=gt[Zt.materialIndex];Oe&&Oe.visible&&m.push(P,pt,Oe,q,Xt.z,Zt)}}else gt.visible&&m.push(P,pt,gt,q,Xt.z,null)}}const Mt=P.children;for(let pt=0,gt=Mt.length;pt<gt;pt++)Tn(Mt[pt],O,q,j)}function Fn(P,O,q,j){const $=P.opaque,Mt=P.transmissive,pt=P.transparent;g.setupLightsView(q),vt===!0&&Ut.setGlobalState(E.clippingPlanes,q),j&&Tt.viewport(b.copy(j)),$.length>0&&Di($,O,q),Mt.length>0&&Di(Mt,O,q),pt.length>0&&Di(pt,O,q),Tt.buffers.depth.setTest(!0),Tt.buffers.depth.setMask(!0),Tt.buffers.color.setMask(!0),Tt.setPolygonOffset(!1)}function vs(P,O,q,j){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[j.id]===void 0&&(g.state.transmissionRenderTarget[j.id]=new ns(1,1,{generateMipmaps:!0,type:ft.has("EXT_color_buffer_half_float")||ft.has("EXT_color_buffer_float")?Is:Mo,minFilter:Ls,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:an.workingColorSpace}));const Mt=g.state.transmissionRenderTarget[j.id],pt=j.viewport||b;Mt.setSize(pt.z,pt.w);const gt=E.getRenderTarget();E.setRenderTarget(Mt),E.getClearColor(R),U=E.getClearAlpha(),U<1&&E.setClearColor(16777215,.5),E.clear(),yt&&pe.render(q);const zt=E.toneMapping;E.toneMapping=Ho;const Qt=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),g.setupLightsView(j),vt===!0&&Ut.setGlobalState(E.clippingPlanes,j),Di(P,q,j),z.updateMultisampleRenderTarget(Mt),z.updateRenderTargetMipmap(Mt),ft.has("WEBGL_multisampled_render_to_texture")===!1){let ie=!1;for(let Zt=0,Oe=O.length;Zt<Oe;Zt++){const tn=O[Zt],ln=tn.object,Pn=tn.geometry,en=tn.material,_e=tn.group;if(en.side===ni&&ln.layers.test(j.layers)){const Ai=en.side;en.side=Si,en.needsUpdate=!0,F(ln,q,j,Pn,en,_e),en.side=Ai,en.needsUpdate=!0,ie=!0}}ie===!0&&(z.updateMultisampleRenderTarget(Mt),z.updateRenderTargetMipmap(Mt))}E.setRenderTarget(gt),E.setClearColor(R,U),Qt!==void 0&&(j.viewport=Qt),E.toneMapping=zt}function Di(P,O,q){const j=O.isScene===!0?O.overrideMaterial:null;for(let $=0,Mt=P.length;$<Mt;$++){const pt=P[$],gt=pt.object,zt=pt.geometry,Qt=j===null?pt.material:j,ie=pt.group;gt.layers.test(q.layers)&&F(gt,O,q,zt,Qt,ie)}}function F(P,O,q,j,$,Mt){P.onBeforeRender(E,O,q,j,$,Mt),P.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),$.onBeforeRender(E,O,q,j,P,Mt),$.transparent===!0&&$.side===ni&&$.forceSinglePass===!1?($.side=Si,$.needsUpdate=!0,E.renderBufferDirect(q,O,j,$,P,Mt),$.side=_o,$.needsUpdate=!0,E.renderBufferDirect(q,O,j,$,P,Mt),$.side=ni):E.renderBufferDirect(q,O,j,$,P,Mt),P.onAfterRender(E,O,q,j,$,Mt)}function N(P,O,q){O.isScene!==!0&&(O=Ot);const j=At.get(P),$=g.state.lights,Mt=g.state.shadowsArray,pt=$.state.version,gt=jt.getParameters(P,$.state,Mt,O,q),zt=jt.getProgramCacheKey(gt);let Qt=j.programs;j.environment=P.isMeshStandardMaterial?O.environment:null,j.fog=O.fog,j.envMap=(P.isMeshStandardMaterial?Q:D).get(P.envMap||j.environment),j.envMapRotation=j.environment!==null&&P.envMap===null?O.environmentRotation:P.envMapRotation,Qt===void 0&&(P.addEventListener("dispose",Ct),Qt=new Map,j.programs=Qt);let ie=Qt.get(zt);if(ie!==void 0){if(j.currentProgram===ie&&j.lightsStateVersion===pt)return W(P,gt),ie}else gt.uniforms=jt.getUniforms(P),P.onBeforeCompile(gt,E),ie=jt.acquireProgram(gt,zt),Qt.set(zt,ie),j.uniforms=gt.uniforms;const Zt=j.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(Zt.clippingPlanes=Ut.uniform),W(P,gt),j.needsLights=ut(P),j.lightsStateVersion=pt,j.needsLights&&(Zt.ambientLightColor.value=$.state.ambient,Zt.lightProbe.value=$.state.probe,Zt.directionalLights.value=$.state.directional,Zt.directionalLightShadows.value=$.state.directionalShadow,Zt.spotLights.value=$.state.spot,Zt.spotLightShadows.value=$.state.spotShadow,Zt.rectAreaLights.value=$.state.rectArea,Zt.ltc_1.value=$.state.rectAreaLTC1,Zt.ltc_2.value=$.state.rectAreaLTC2,Zt.pointLights.value=$.state.point,Zt.pointLightShadows.value=$.state.pointShadow,Zt.hemisphereLights.value=$.state.hemi,Zt.directionalShadowMap.value=$.state.directionalShadowMap,Zt.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Zt.spotShadowMap.value=$.state.spotShadowMap,Zt.spotLightMatrix.value=$.state.spotLightMatrix,Zt.spotLightMap.value=$.state.spotLightMap,Zt.pointShadowMap.value=$.state.pointShadowMap,Zt.pointShadowMatrix.value=$.state.pointShadowMatrix),j.currentProgram=ie,j.uniformsList=null,ie}function tt(P){if(P.uniformsList===null){const O=P.currentProgram.getUniforms();P.uniformsList=Dc.seqWithValue(O.seq,P.uniforms)}return P.uniformsList}function W(P,O){const q=At.get(P);q.outputColorSpace=O.outputColorSpace,q.batching=O.batching,q.batchingColor=O.batchingColor,q.instancing=O.instancing,q.instancingColor=O.instancingColor,q.instancingMorph=O.instancingMorph,q.skinning=O.skinning,q.morphTargets=O.morphTargets,q.morphNormals=O.morphNormals,q.morphColors=O.morphColors,q.morphTargetsCount=O.morphTargetsCount,q.numClippingPlanes=O.numClippingPlanes,q.numIntersection=O.numClipIntersection,q.vertexAlphas=O.vertexAlphas,q.vertexTangents=O.vertexTangents,q.toneMapping=O.toneMapping}function nt(P,O,q,j,$){O.isScene!==!0&&(O=Ot),z.resetTextureUnits();const Mt=O.fog,pt=j.isMeshStandardMaterial?O.environment:null,gt=S===null?E.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:Ta,zt=(j.isMeshStandardMaterial?Q:D).get(j.envMap||pt),Qt=j.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,ie=!!q.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Zt=!!q.morphAttributes.position,Oe=!!q.morphAttributes.normal,tn=!!q.morphAttributes.color;let ln=Ho;j.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(ln=E.toneMapping);const Pn=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,en=Pn!==void 0?Pn.length:0,_e=At.get(j),Ai=g.state.lights;if(vt===!0&&(Pt===!0||P!==y)){const ai=P===y&&j.id===x;Ut.setState(j,P,ai)}let rn=!1;j.version===_e.__version?(_e.needsLights&&_e.lightsStateVersion!==Ai.state.version||_e.outputColorSpace!==gt||$.isBatchedMesh&&_e.batching===!1||!$.isBatchedMesh&&_e.batching===!0||$.isBatchedMesh&&_e.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&_e.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&_e.instancing===!1||!$.isInstancedMesh&&_e.instancing===!0||$.isSkinnedMesh&&_e.skinning===!1||!$.isSkinnedMesh&&_e.skinning===!0||$.isInstancedMesh&&_e.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&_e.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&_e.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&_e.instancingMorph===!1&&$.morphTexture!==null||_e.envMap!==zt||j.fog===!0&&_e.fog!==Mt||_e.numClippingPlanes!==void 0&&(_e.numClippingPlanes!==Ut.numPlanes||_e.numIntersection!==Ut.numIntersection)||_e.vertexAlphas!==Qt||_e.vertexTangents!==ie||_e.morphTargets!==Zt||_e.morphNormals!==Oe||_e.morphColors!==tn||_e.toneMapping!==ln||_e.morphTargetsCount!==en)&&(rn=!0):(rn=!0,_e.__version=j.version);let ri=_e.currentProgram;rn===!0&&(ri=N(j,O,$));let Fs=!1,wn=!1,Os=!1;const fn=ri.getUniforms(),Ci=_e.uniforms;if(Tt.useProgram(ri.program)&&(Fs=!0,wn=!0,Os=!0),j.id!==x&&(x=j.id,wn=!0),Fs||y!==P){Tt.buffers.depth.getReversed()?(wt.copy(P.projectionMatrix),M1(wt),b1(wt),fn.setValue(V,"projectionMatrix",wt)):fn.setValue(V,"projectionMatrix",P.projectionMatrix),fn.setValue(V,"viewMatrix",P.matrixWorldInverse);const ss=fn.map.cameraPosition;ss!==void 0&&ss.setValue(V,xe.setFromMatrixPosition(P.matrixWorld)),Yt.logarithmicDepthBuffer&&fn.setValue(V,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&fn.setValue(V,"isOrthographic",P.isOrthographicCamera===!0),y!==P&&(y=P,wn=!0,Os=!0)}if($.isSkinnedMesh){fn.setOptional(V,$,"bindMatrix"),fn.setOptional(V,$,"bindMatrixInverse");const ai=$.skeleton;ai&&(ai.boneTexture===null&&ai.computeBoneTexture(),fn.setValue(V,"boneTexture",ai.boneTexture,z))}$.isBatchedMesh&&(fn.setOptional(V,$,"batchingTexture"),fn.setValue(V,"batchingTexture",$._matricesTexture,z),fn.setOptional(V,$,"batchingIdTexture"),fn.setValue(V,"batchingIdTexture",$._indirectTexture,z),fn.setOptional(V,$,"batchingColorTexture"),$._colorsTexture!==null&&fn.setValue(V,"batchingColorTexture",$._colorsTexture,z));const qo=q.morphAttributes;if((qo.position!==void 0||qo.normal!==void 0||qo.color!==void 0)&&Se.update($,q,ri),(wn||_e.receiveShadow!==$.receiveShadow)&&(_e.receiveShadow=$.receiveShadow,fn.setValue(V,"receiveShadow",$.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Ci.envMap.value=zt,Ci.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&O.environment!==null&&(Ci.envMapIntensity.value=O.environmentIntensity),wn&&(fn.setValue(V,"toneMappingExposure",E.toneMappingExposure),_e.needsLights&&ot(Ci,Os),Mt&&j.fog===!0&&Bt.refreshFogUniforms(Ci,Mt),Bt.refreshMaterialUniforms(Ci,j,Y,X,g.state.transmissionRenderTarget[P.id]),Dc.upload(V,tt(_e),Ci,z)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Dc.upload(V,tt(_e),Ci,z),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&fn.setValue(V,"center",$.center),fn.setValue(V,"modelViewMatrix",$.modelViewMatrix),fn.setValue(V,"normalMatrix",$.normalMatrix),fn.setValue(V,"modelMatrix",$.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const ai=j.uniformsGroups;for(let ss=0,Ii=ai.length;ss<Ii;ss++){const br=ai[ss];J.update(br,ri),J.bind(br,ri)}}return ri}function ot(P,O){P.ambientLightColor.needsUpdate=O,P.lightProbe.needsUpdate=O,P.directionalLights.needsUpdate=O,P.directionalLightShadows.needsUpdate=O,P.pointLights.needsUpdate=O,P.pointLightShadows.needsUpdate=O,P.spotLights.needsUpdate=O,P.spotLightShadows.needsUpdate=O,P.rectAreaLights.needsUpdate=O,P.hemisphereLights.needsUpdate=O}function ut(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return _},this.getRenderTarget=function(){return S},this.setRenderTargetTextures=function(P,O,q){At.get(P.texture).__webglTexture=O,At.get(P.depthTexture).__webglTexture=q;const j=At.get(P);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=q===void 0,j.__autoAllocateDepthBuffer||ft.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(P,O){const q=At.get(P);q.__webglFramebuffer=O,q.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(P,O=0,q=0){S=P,w=O,_=q;let j=!0,$=null,Mt=!1,pt=!1;if(P){const zt=At.get(P);if(zt.__useDefaultFramebuffer!==void 0)Tt.bindFramebuffer(V.FRAMEBUFFER,null),j=!1;else if(zt.__webglFramebuffer===void 0)z.setupRenderTarget(P);else if(zt.__hasExternalTextures)z.rebindTextures(P,At.get(P.texture).__webglTexture,At.get(P.depthTexture).__webglTexture);else if(P.depthBuffer){const Zt=P.depthTexture;if(zt.__boundDepthTexture!==Zt){if(Zt!==null&&At.has(Zt)&&(P.width!==Zt.image.width||P.height!==Zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");z.setupDepthRenderbuffer(P)}}const Qt=P.texture;(Qt.isData3DTexture||Qt.isDataArrayTexture||Qt.isCompressedArrayTexture)&&(pt=!0);const ie=At.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(ie[O])?$=ie[O][q]:$=ie[O],Mt=!0):P.samples>0&&z.useMultisampledRTT(P)===!1?$=At.get(P).__webglMultisampledFramebuffer:Array.isArray(ie)?$=ie[q]:$=ie,b.copy(P.viewport),C.copy(P.scissor),L=P.scissorTest}else b.copy(St).multiplyScalar(Y).floor(),C.copy(Ft).multiplyScalar(Y).floor(),L=ye;if(Tt.bindFramebuffer(V.FRAMEBUFFER,$)&&j&&Tt.drawBuffers(P,$),Tt.viewport(b),Tt.scissor(C),Tt.setScissorTest(L),Mt){const zt=At.get(P.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+O,zt.__webglTexture,q)}else if(pt){const zt=At.get(P.texture),Qt=O||0;V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,zt.__webglTexture,q||0,Qt)}x=-1},this.readRenderTargetPixels=function(P,O,q,j,$,Mt,pt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let gt=At.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&pt!==void 0&&(gt=gt[pt]),gt){Tt.bindFramebuffer(V.FRAMEBUFFER,gt);try{const zt=P.texture,Qt=zt.format,ie=zt.type;if(!Yt.textureFormatReadable(Qt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Yt.textureTypeReadable(ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=P.width-j&&q>=0&&q<=P.height-$&&V.readPixels(O,q,j,$,we.convert(Qt),we.convert(ie),Mt)}finally{const zt=S!==null?At.get(S).__webglFramebuffer:null;Tt.bindFramebuffer(V.FRAMEBUFFER,zt)}}},this.readRenderTargetPixelsAsync=async function(P,O,q,j,$,Mt,pt){if(!(P&&P.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let gt=At.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&pt!==void 0&&(gt=gt[pt]),gt){const zt=P.texture,Qt=zt.format,ie=zt.type;if(!Yt.textureFormatReadable(Qt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Yt.textureTypeReadable(ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=P.width-j&&q>=0&&q<=P.height-$){Tt.bindFramebuffer(V.FRAMEBUFFER,gt);const Zt=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,Zt),V.bufferData(V.PIXEL_PACK_BUFFER,Mt.byteLength,V.STREAM_READ),V.readPixels(O,q,j,$,we.convert(Qt),we.convert(ie),0);const Oe=S!==null?At.get(S).__webglFramebuffer:null;Tt.bindFramebuffer(V.FRAMEBUFFER,Oe);const tn=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await _1(V,tn,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,Zt),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Mt),V.deleteBuffer(Zt),V.deleteSync(tn),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(P,O=null,q=0){P.isTexture!==!0&&(Qa("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,P=arguments[1]);const j=Math.pow(2,-q),$=Math.floor(P.image.width*j),Mt=Math.floor(P.image.height*j),pt=O!==null?O.x:0,gt=O!==null?O.y:0;z.setTexture2D(P,0),V.copyTexSubImage2D(V.TEXTURE_2D,q,0,0,pt,gt,$,Mt),Tt.unbindTexture()},this.copyTextureToTexture=function(P,O,q=null,j=null,$=0){P.isTexture!==!0&&(Qa("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,P=arguments[1],O=arguments[2],$=arguments[3]||0,q=null);let Mt,pt,gt,zt,Qt,ie,Zt,Oe,tn;const ln=P.isCompressedTexture?P.mipmaps[$]:P.image;q!==null?(Mt=q.max.x-q.min.x,pt=q.max.y-q.min.y,gt=q.isBox3?q.max.z-q.min.z:1,zt=q.min.x,Qt=q.min.y,ie=q.isBox3?q.min.z:0):(Mt=ln.width,pt=ln.height,gt=ln.depth||1,zt=0,Qt=0,ie=0),j!==null?(Zt=j.x,Oe=j.y,tn=j.z):(Zt=0,Oe=0,tn=0);const Pn=we.convert(O.format),en=we.convert(O.type);let _e;O.isData3DTexture?(z.setTexture3D(O,0),_e=V.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(z.setTexture2DArray(O,0),_e=V.TEXTURE_2D_ARRAY):(z.setTexture2D(O,0),_e=V.TEXTURE_2D),V.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,O.flipY),V.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),V.pixelStorei(V.UNPACK_ALIGNMENT,O.unpackAlignment);const Ai=V.getParameter(V.UNPACK_ROW_LENGTH),rn=V.getParameter(V.UNPACK_IMAGE_HEIGHT),ri=V.getParameter(V.UNPACK_SKIP_PIXELS),Fs=V.getParameter(V.UNPACK_SKIP_ROWS),wn=V.getParameter(V.UNPACK_SKIP_IMAGES);V.pixelStorei(V.UNPACK_ROW_LENGTH,ln.width),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,ln.height),V.pixelStorei(V.UNPACK_SKIP_PIXELS,zt),V.pixelStorei(V.UNPACK_SKIP_ROWS,Qt),V.pixelStorei(V.UNPACK_SKIP_IMAGES,ie);const Os=P.isDataArrayTexture||P.isData3DTexture,fn=O.isDataArrayTexture||O.isData3DTexture;if(P.isRenderTargetTexture||P.isDepthTexture){const Ci=At.get(P),qo=At.get(O),ai=At.get(Ci.__renderTarget),ss=At.get(qo.__renderTarget);Tt.bindFramebuffer(V.READ_FRAMEBUFFER,ai.__webglFramebuffer),Tt.bindFramebuffer(V.DRAW_FRAMEBUFFER,ss.__webglFramebuffer);for(let Ii=0;Ii<gt;Ii++)Os&&V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,At.get(P).__webglTexture,$,ie+Ii),P.isDepthTexture?(fn&&V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,At.get(O).__webglTexture,$,tn+Ii),V.blitFramebuffer(zt,Qt,Mt,pt,Zt,Oe,Mt,pt,V.DEPTH_BUFFER_BIT,V.NEAREST)):fn?V.copyTexSubImage3D(_e,$,Zt,Oe,tn+Ii,zt,Qt,Mt,pt):V.copyTexSubImage2D(_e,$,Zt,Oe,tn+Ii,zt,Qt,Mt,pt);Tt.bindFramebuffer(V.READ_FRAMEBUFFER,null),Tt.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else fn?P.isDataTexture||P.isData3DTexture?V.texSubImage3D(_e,$,Zt,Oe,tn,Mt,pt,gt,Pn,en,ln.data):O.isCompressedArrayTexture?V.compressedTexSubImage3D(_e,$,Zt,Oe,tn,Mt,pt,gt,Pn,ln.data):V.texSubImage3D(_e,$,Zt,Oe,tn,Mt,pt,gt,Pn,en,ln):P.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,$,Zt,Oe,Mt,pt,Pn,en,ln.data):P.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,$,Zt,Oe,ln.width,ln.height,Pn,ln.data):V.texSubImage2D(V.TEXTURE_2D,$,Zt,Oe,Mt,pt,Pn,en,ln);V.pixelStorei(V.UNPACK_ROW_LENGTH,Ai),V.pixelStorei(V.UNPACK_IMAGE_HEIGHT,rn),V.pixelStorei(V.UNPACK_SKIP_PIXELS,ri),V.pixelStorei(V.UNPACK_SKIP_ROWS,Fs),V.pixelStorei(V.UNPACK_SKIP_IMAGES,wn),$===0&&O.generateMipmaps&&V.generateMipmap(_e),Tt.unbindTexture()},this.copyTextureToTexture3D=function(P,O,q=null,j=null,$=0){return P.isTexture!==!0&&(Qa("WebGLRenderer: copyTextureToTexture3D function signature has changed."),q=arguments[0]||null,j=arguments[1]||null,P=arguments[2],O=arguments[3],$=arguments[4]||0),Qa('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(P,O,q,j,$)},this.initRenderTarget=function(P){At.get(P).__webglFramebuffer===void 0&&z.setupRenderTarget(P)},this.initTexture=function(P){P.isCubeTexture?z.setTextureCube(P,0):P.isData3DTexture?z.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?z.setTexture2DArray(P,0):z.setTexture2D(P,0),Tt.unbindTexture()},this.resetState=function(){w=0,_=0,S=null,Tt.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return uo}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=an._getDrawingBufferColorSpace(t),e.unpackColorSpace=an._getUnpackColorSpace()}}class ku{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new ge(t),this.density=e}clone(){return new ku(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Jp extends Nn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Py{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=iu,this.updateRanges=[],this.version=0,this.uuid=Us()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,o=this.stride;s<o;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Us()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Us()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const xi=new k;class Vc{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)xi.fromBufferAttribute(this,e),xi.applyMatrix4(t),this.setXYZ(e,xi.x,xi.y,xi.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)xi.fromBufferAttribute(this,e),xi.applyNormalMatrix(t),this.setXYZ(e,xi.x,xi.y,xi.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)xi.fromBufferAttribute(this,e),xi.transformDirection(t),this.setXYZ(e,xi.x,xi.y,xi.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Es(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=gn(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=gn(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=gn(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=gn(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=gn(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Es(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Es(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Es(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Es(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array),s=gn(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,o){return t=t*this.data.stride+this.offset,this.normalized&&(e=gn(e,this.array),n=gn(n,this.array),s=gn(s,this.array),o=gn(o,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=o,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return new cn(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new Vc(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let o=0;o<this.itemSize;o++)e.push(this.data.array[s+o])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ly extends _r{static get type(){return"SpriteMaterial"}constructor(t){super(),this.isSpriteMaterial=!0,this.color=new ge(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Wr;const Ba=new k,qr=new k,Xr=new k,Yr=new Dt,Va=new Dt,Qp=new qe,Zl=new k,Ha=new k,Jl=new k,pd=new Dt,W0=new Dt,md=new Dt;class m3 extends Nn{constructor(t=new Ly){if(super(),this.isSprite=!0,this.type="Sprite",Wr===void 0){Wr=new bn;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Py(e,5);Wr.setIndex([0,1,2,0,2,3]),Wr.setAttribute("position",new Vc(n,3,0,!1)),Wr.setAttribute("uv",new Vc(n,2,3,!1))}this.geometry=Wr,this.material=t,this.center=new Dt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),qr.setFromMatrixScale(this.matrixWorld),Qp.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Xr.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&qr.multiplyScalar(-Xr.z);const n=this.material.rotation;let s,o;n!==0&&(o=Math.cos(n),s=Math.sin(n));const r=this.center;Ql(Zl.set(-.5,-.5,0),Xr,r,qr,s,o),Ql(Ha.set(.5,-.5,0),Xr,r,qr,s,o),Ql(Jl.set(.5,.5,0),Xr,r,qr,s,o),pd.set(0,0),W0.set(1,0),md.set(1,1);let a=t.ray.intersectTriangle(Zl,Ha,Jl,!1,Ba);if(a===null&&(Ql(Ha.set(-.5,.5,0),Xr,r,qr,s,o),W0.set(0,1),a=t.ray.intersectTriangle(Zl,Jl,Ha,!1,Ba),a===null))return;const l=t.ray.origin.distanceTo(Ba);l<t.near||l>t.far||e.push({distance:l,point:Ba.clone(),uv:es.getInterpolation(Ba,Zl,Ha,Jl,pd,W0,md,new Dt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Ql(i,t,e,n,s,o){Yr.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(Va.x=o*Yr.x-s*Yr.y,Va.y=s*Yr.x+o*Yr.y):Va.copy(Yr),i.copy(t),i.x+=Va.x,i.y+=Va.y,i.applyMatrix4(Qp)}const gd=new k,xd=new Sn,vd=new Sn,Dy=new k,yd=new qe,tc=new k,q0=new bo,_d=new qe,X0=new Op;class g3 extends Mn{constructor(t,e){super(t,e),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Mf,this.bindMatrix=new qe,this.bindMatrixInverse=new qe,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const t=this.geometry;this.boundingBox===null&&(this.boundingBox=new ks),this.boundingBox.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,tc),this.boundingBox.expandByPoint(tc)}computeBoundingSphere(){const t=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new bo),this.boundingSphere.makeEmpty();const e=t.getAttribute("position");for(let n=0;n<e.count;n++)this.getVertexPosition(n,tc),this.boundingSphere.expandByPoint(tc)}copy(t,e){return super.copy(t,e),this.bindMode=t.bindMode,this.bindMatrix.copy(t.bindMatrix),this.bindMatrixInverse.copy(t.bindMatrixInverse),this.skeleton=t.skeleton,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}raycast(t,e){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),q0.copy(this.boundingSphere),q0.applyMatrix4(s),t.ray.intersectsSphere(q0)!==!1&&(_d.copy(s).invert(),X0.copy(t.ray).applyMatrix4(_d),!(this.boundingBox!==null&&X0.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(t,e,X0)))}getVertexPosition(t,e){return super.getVertexPosition(t,e),this.applyBoneTransform(t,e),e}bind(t,e){this.skeleton=t,e===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.copy(e).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const t=new Sn,e=this.geometry.attributes.skinWeight;for(let n=0,s=e.count;n<s;n++){t.fromBufferAttribute(e,n);const o=1/t.manhattanLength();o!==1/0?t.multiplyScalar(o):t.set(1,0,0,0),e.setXYZW(n,t.x,t.y,t.z,t.w)}}updateMatrixWorld(t){super.updateMatrixWorld(t),this.bindMode===Mf?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===a1?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(t,e){const n=this.skeleton,s=this.geometry;xd.fromBufferAttribute(s.attributes.skinIndex,t),vd.fromBufferAttribute(s.attributes.skinWeight,t),gd.copy(e).applyMatrix4(this.bindMatrix),e.set(0,0,0);for(let o=0;o<4;o++){const r=vd.getComponent(o);if(r!==0){const a=xd.getComponent(o);yd.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),e.addScaledVector(Dy.copy(gd).applyMatrix4(yd),r)}}return e.applyMatrix4(this.bindMatrixInverse)}}class Iy extends Nn{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Ml extends mi{constructor(t=null,e=1,n=1,s,o,r,a,l,h=Hi,c=Hi,f,d){super(null,r,a,l,h,c,s,o,f,d),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Md=new qe,Uy=new qe;class tm{constructor(t=[],e=[]){this.uuid=Us(),this.bones=t.slice(0),this.boneInverses=e,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const t=this.bones,e=this.boneInverses;if(this.boneMatrices=new Float32Array(t.length*16),e.length===0)this.calculateInverses();else if(t.length!==e.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new qe)}}calculateInverses(){this.boneInverses.length=0;for(let t=0,e=this.bones.length;t<e;t++){const n=new qe;this.bones[t]&&n.copy(this.bones[t].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&n.matrixWorld.copy(this.boneInverses[t]).invert()}for(let t=0,e=this.bones.length;t<e;t++){const n=this.bones[t];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const t=this.bones,e=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let o=0,r=t.length;o<r;o++){const a=t[o]?t[o].matrixWorld:Uy;Md.multiplyMatrices(a,e[o]),Md.toArray(n,o*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new tm(this.bones,this.boneInverses)}computeBoneTexture(){let t=Math.sqrt(this.bones.length*4);t=Math.ceil(t/4)*4,t=Math.max(t,4);const e=new Float32Array(t*t*4);e.set(this.boneMatrices);const n=new Ml(e,t,t,bi,gs);return n.needsUpdate=!0,this.boneMatrices=e,this.boneTexture=n,this}getBoneByName(t){for(let e=0,n=this.bones.length;e<n;e++){const s=this.bones[e];if(s.name===t)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(t,e){this.uuid=t.uuid;for(let n=0,s=t.bones.length;n<s;n++){const o=t.bones[n];let r=e[o];r===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",o),r=new Iy),this.bones.push(r),this.boneInverses.push(new qe().fromArray(t.boneInverses[n]))}return this.init(),this}toJSON(){const t={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};t.uuid=this.uuid;const e=this.bones,n=this.boneInverses;for(let s=0,o=e.length;s<o;s++){const r=e[s];t.bones.push(r.uuid);const a=n[s];t.boneInverses.push(a.toArray())}return t}}class Ds extends cn{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const $r=new qe,bd=new qe,ec=[],wd=new ks,zy=new qe,Ga=new Mn,Wa=new bo;class sl extends Mn{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ds(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,zy)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ks),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$r),wd.copy(t.boundingBox).applyMatrix4($r),this.boundingBox.union(wd)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new bo),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,$r),Wa.copy(t.boundingSphere).applyMatrix4($r),this.boundingSphere.union(Wa)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,o=n.length+1,r=t*o+1;for(let a=0;a<n.length;a++)n[a]=s[r+a]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(Ga.geometry=this.geometry,Ga.material=this.material,Ga.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wa.copy(this.boundingSphere),Wa.applyMatrix4(n),t.ray.intersectsSphere(Wa)!==!1))for(let o=0;o<s;o++){this.getMatrixAt(o,$r),bd.multiplyMatrices(n,$r),Ga.matrixWorld=bd,Ga.raycast(t,ec);for(let r=0,a=ec.length;r<a;r++){const l=ec[r];l.instanceId=o,l.object=this,e.push(l)}ec.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ds(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ml(new Float32Array(s*this.count),s,this.count,Eu,gs));const o=this.morphTexture.source.data.data;let r=0;for(let h=0;h<n.length;h++)r+=n[h];const a=this.geometry.morphTargetsRelative?1:1-r,l=s*t;o[l]=a,o.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class em extends mi{constructor(t,e,n,s,o,r,a,l,h){super(t,e,n,s,o,r,a,l,h),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ns{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(s),e.push(o),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,l=o-1,h;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),h=n[s]-r,h<0)a=s+1;else if(h>0)l=s-1;else{l=s;break}if(s=l,n[s]===r)return s/(o-1);const c=n[s],d=n[s+1]-c,u=(r-c)/d;return(s+u)/(o-1)}getTangent(t,e){let s=t-1e-4,o=t+1e-4;s<0&&(s=0),o>1&&(o=1);const r=this.getPoint(s),a=this.getPoint(o),l=e||(r.isVector2?new Dt:new k);return l.copy(a).sub(r).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new k,s=[],o=[],r=[],a=new k,l=new qe;for(let u=0;u<=t;u++){const p=u/t;s[u]=this.getTangentAt(p,new k)}o[0]=new k,r[0]=new k;let h=Number.MAX_VALUE;const c=Math.abs(s[0].x),f=Math.abs(s[0].y),d=Math.abs(s[0].z);c<=h&&(h=c,n.set(1,0,0)),f<=h&&(h=f,n.set(0,1,0)),d<=h&&n.set(0,0,1),a.crossVectors(s[0],n).normalize(),o[0].crossVectors(s[0],a),r[0].crossVectors(s[0],o[0]);for(let u=1;u<=t;u++){if(o[u]=o[u-1].clone(),r[u]=r[u-1].clone(),a.crossVectors(s[u-1],s[u]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(ei(s[u-1].dot(s[u]),-1,1));o[u].applyMatrix4(l.makeRotationAxis(a,p))}r[u].crossVectors(s[u],o[u])}if(e===!0){let u=Math.acos(ei(o[0].dot(o[t]),-1,1));u/=t,s[0].dot(a.crossVectors(o[0],o[t]))>0&&(u=-u);for(let p=1;p<=t;p++)o[p].applyMatrix4(l.makeRotationAxis(s[p],u*p)),r[p].crossVectors(s[p],o[p])}return{tangents:s,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Nu extends Ns{constructor(t=0,e=0,n=1,s=1,o=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new Dt){const n=e,s=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=s;for(;o>s;)o-=s;o<Number.EPSILON&&(r?o=0:o=s),this.aClockwise===!0&&!r&&(o===s?o=-s:o=o-s);const a=this.aStartAngle+t*o;let l=this.aX+this.xRadius*Math.cos(a),h=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const c=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,u=h-this.aY;l=d*c-u*f+this.aX,h=d*f+u*c+this.aY}return n.set(l,h)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class ky extends Nu{constructor(t,e,n,s,o,r){super(t,e,n,n,s,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Fu(){let i=0,t=0,e=0,n=0;function s(o,r,a,l){i=o,t=a,e=-3*o+3*r-2*a-l,n=2*o-2*r+a+l}return{initCatmullRom:function(o,r,a,l,h){s(r,a,h*(a-o),h*(l-r))},initNonuniformCatmullRom:function(o,r,a,l,h,c,f){let d=(r-o)/h-(a-o)/(h+c)+(a-r)/c,u=(a-r)/c-(l-r)/(c+f)+(l-a)/f;d*=c,u*=c,s(r,a,d,u)},calc:function(o){const r=o*o,a=r*o;return i+t*o+e*r+n*a}}}const nc=new k,Y0=new Fu,$0=new Fu,j0=new Fu;class nm extends Ns{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new k){const n=e,s=this.points,o=s.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let h,c;this.closed||a>0?h=s[(a-1)%o]:(nc.subVectors(s[0],s[1]).add(s[0]),h=nc);const f=s[a%o],d=s[(a+1)%o];if(this.closed||a+2<o?c=s[(a+2)%o]:(nc.subVectors(s[o-1],s[o-2]).add(s[o-1]),c=nc),this.curveType==="centripetal"||this.curveType==="chordal"){const u=this.curveType==="chordal"?.5:.25;let p=Math.pow(h.distanceToSquared(f),u),v=Math.pow(f.distanceToSquared(d),u),m=Math.pow(d.distanceToSquared(c),u);v<1e-4&&(v=1),p<1e-4&&(p=v),m<1e-4&&(m=v),Y0.initNonuniformCatmullRom(h.x,f.x,d.x,c.x,p,v,m),$0.initNonuniformCatmullRom(h.y,f.y,d.y,c.y,p,v,m),j0.initNonuniformCatmullRom(h.z,f.z,d.z,c.z,p,v,m)}else this.curveType==="catmullrom"&&(Y0.initCatmullRom(h.x,f.x,d.x,c.x,this.tension),$0.initCatmullRom(h.y,f.y,d.y,c.y,this.tension),j0.initCatmullRom(h.z,f.z,d.z,c.z,this.tension));return n.set(Y0.calc(l),$0.calc(l),j0.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new k().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Sd(i,t,e,n,s){const o=(n-t)*.5,r=(s-e)*.5,a=i*i,l=i*a;return(2*e-2*n+o+r)*l+(-3*e+3*n-2*o-r)*a+o*i+e}function Ny(i,t){const e=1-i;return e*e*t}function Fy(i,t){return 2*(1-i)*i*t}function Oy(i,t){return i*i*t}function ol(i,t,e,n){return Ny(i,t)+Fy(i,e)+Oy(i,n)}function By(i,t){const e=1-i;return e*e*e*t}function Vy(i,t){const e=1-i;return 3*e*e*i*t}function Hy(i,t){return 3*(1-i)*i*i*t}function Gy(i,t){return i*i*i*t}function rl(i,t,e,n,s){return By(i,t)+Vy(i,e)+Hy(i,n)+Gy(i,s)}class im extends Ns{constructor(t=new Dt,e=new Dt,n=new Dt,s=new Dt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new Dt){const n=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(rl(t,s.x,o.x,r.x,a.x),rl(t,s.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wy extends Ns{constructor(t=new k,e=new k,n=new k,s=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new k){const n=e,s=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(rl(t,s.x,o.x,r.x,a.x),rl(t,s.y,o.y,r.y,a.y),rl(t,s.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class sm extends Ns{constructor(t=new Dt,e=new Dt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Dt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Dt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qy extends Ns{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class om extends Ns{constructor(t=new Dt,e=new Dt,n=new Dt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new Dt){const n=e,s=this.v0,o=this.v1,r=this.v2;return n.set(ol(t,s.x,o.x,r.x),ol(t,s.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Xy extends Ns{constructor(t=new k,e=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new k){const n=e,s=this.v0,o=this.v1,r=this.v2;return n.set(ol(t,s.x,o.x,r.x),ol(t,s.y,o.y,r.y),ol(t,s.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class rm extends Ns{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Dt){const n=e,s=this.points,o=(s.length-1)*t,r=Math.floor(o),a=o-r,l=s[r===0?r:r-1],h=s[r],c=s[r>s.length-2?s.length-1:r+1],f=s[r>s.length-3?s.length-1:r+2];return n.set(Sd(a,l.x,h.x,c.x,f.x),Sd(a,l.y,h.y,c.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new Dt().fromArray(s))}return this}}var au=Object.freeze({__proto__:null,ArcCurve:ky,CatmullRomCurve3:nm,CubicBezierCurve:im,CubicBezierCurve3:Wy,EllipseCurve:Nu,LineCurve:sm,LineCurve3:qy,QuadraticBezierCurve:om,QuadraticBezierCurve3:Xy,SplineCurve:rm});class Yy extends Ns{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new au[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),s=this.getCurveLengths();let o=0;for(;o<s.length;){if(s[o]>=n){const r=s[o]-n,a=this.curves[o],l=a.getLength(),h=l===0?0:1-r/l;return a.getPointAt(h,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let s=0,o=this.curves;s<o.length;s++){const r=o[s],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,l=r.getPoints(a);for(let h=0;h<l.length;h++){const c=l[h];n&&n.equals(c)||(e.push(c),n=c)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const s=t.curves[e];this.curves.push(new au[s.type]().fromJSON(s))}return this}}class lu extends Yy{constructor(t){super(),this.type="Path",this.currentPoint=new Dt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new sm(this.currentPoint.clone(),new Dt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){const o=new om(this.currentPoint.clone(),new Dt(t,e),new Dt(n,s));return this.curves.push(o),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,o,r){const a=new im(this.currentPoint.clone(),new Dt(t,e),new Dt(n,s),new Dt(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new rm(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,o,r){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,s,o,r),this}absarc(t,e,n,s,o,r){return this.absellipse(t,e,n,n,s,o,r),this}ellipse(t,e,n,s,o,r,a,l){const h=this.currentPoint.x,c=this.currentPoint.y;return this.absellipse(t+h,e+c,n,s,o,r,a,l),this}absellipse(t,e,n,s,o,r,a,l){const h=new Nu(t,e,n,s,o,r,a,l);if(this.curves.length>0){const f=h.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(h);const c=h.getPoint(1);return this.currentPoint.copy(c),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class ml extends bn{constructor(t=[new Dt(0,-.5),new Dt(.5,0),new Dt(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=ei(s,0,Math.PI*2);const o=[],r=[],a=[],l=[],h=[],c=1/e,f=new k,d=new Dt,u=new k,p=new k,v=new k;let m=0,g=0;for(let M=0;M<=t.length-1;M++)switch(M){case 0:m=t[M+1].x-t[M].x,g=t[M+1].y-t[M].y,u.x=g*1,u.y=-m,u.z=g*0,v.copy(u),u.normalize(),l.push(u.x,u.y,u.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:m=t[M+1].x-t[M].x,g=t[M+1].y-t[M].y,u.x=g*1,u.y=-m,u.z=g*0,p.copy(u),u.x+=v.x,u.y+=v.y,u.z+=v.z,u.normalize(),l.push(u.x,u.y,u.z),v.copy(p)}for(let M=0;M<=e;M++){const T=n+M*c*s,E=Math.sin(T),A=Math.cos(T);for(let w=0;w<=t.length-1;w++){f.x=t[w].x*E,f.y=t[w].y,f.z=t[w].x*A,r.push(f.x,f.y,f.z),d.x=M/e,d.y=w/(t.length-1),a.push(d.x,d.y);const _=l[3*w+0]*E,S=l[3*w+1],x=l[3*w+0]*A;h.push(_,S,x)}}for(let M=0;M<e;M++)for(let T=0;T<t.length-1;T++){const E=T+M*t.length,A=E,w=E+t.length,_=E+t.length+1,S=E+1;o.push(A,w,S),o.push(_,S,w)}this.setIndex(o),this.setAttribute("position",new Ce(r,3)),this.setAttribute("uv",new Ce(a,2)),this.setAttribute("normal",new Ce(h,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ml(t.points,t.segments,t.phiStart,t.phiLength)}}class Ou extends ml{constructor(t=1,e=1,n=4,s=8){const o=new lu;o.absarc(0,-e/2,t,Math.PI*1.5,0),o.absarc(0,e/2,t,0,Math.PI*.5),super(o.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new Ou(t.radius,t.length,t.capSegments,t.radialSegments)}}class Bu extends bn{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const o=[],r=[],a=[],l=[],h=new k,c=new Dt;r.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let f=0,d=3;f<=e;f++,d+=3){const u=n+f/e*s;h.x=t*Math.cos(u),h.y=t*Math.sin(u),r.push(h.x,h.y,h.z),a.push(0,0,1),c.x=(r[d]/t+1)/2,c.y=(r[d+1]/t+1)/2,l.push(c.x,c.y)}for(let f=1;f<=e;f++)o.push(f,f+1,0);this.setIndex(o),this.setAttribute("position",new Ce(r,3)),this.setAttribute("normal",new Ce(a,3)),this.setAttribute("uv",new Ce(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Bu(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Jc extends bn{constructor(t=1,e=1,n=1,s=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const h=this;s=Math.floor(s),o=Math.floor(o);const c=[],f=[],d=[],u=[];let p=0;const v=[],m=n/2;let g=0;M(),r===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(c),this.setAttribute("position",new Ce(f,3)),this.setAttribute("normal",new Ce(d,3)),this.setAttribute("uv",new Ce(u,2));function M(){const E=new k,A=new k;let w=0;const _=(e-t)/n;for(let S=0;S<=o;S++){const x=[],y=S/o,b=y*(e-t)+t;for(let C=0;C<=s;C++){const L=C/s,R=L*l+a,U=Math.sin(R),I=Math.cos(R);A.x=b*U,A.y=-y*n+m,A.z=b*I,f.push(A.x,A.y,A.z),E.set(U,_,I).normalize(),d.push(E.x,E.y,E.z),u.push(L,1-y),x.push(p++)}v.push(x)}for(let S=0;S<s;S++)for(let x=0;x<o;x++){const y=v[x][S],b=v[x+1][S],C=v[x+1][S+1],L=v[x][S+1];(t>0||x!==0)&&(c.push(y,b,L),w+=3),(e>0||x!==o-1)&&(c.push(b,C,L),w+=3)}h.addGroup(g,w,0),g+=w}function T(E){const A=p,w=new Dt,_=new k;let S=0;const x=E===!0?t:e,y=E===!0?1:-1;for(let C=1;C<=s;C++)f.push(0,m*y,0),d.push(0,y,0),u.push(.5,.5),p++;const b=p;for(let C=0;C<=s;C++){const R=C/s*l+a,U=Math.cos(R),I=Math.sin(R);_.x=x*I,_.y=m*y,_.z=x*U,f.push(_.x,_.y,_.z),d.push(0,y,0),w.x=U*.5+.5,w.y=I*.5*y+.5,u.push(w.x,w.y),p++}for(let C=0;C<s;C++){const L=A+C,R=b+C;E===!0?c.push(R,R+1,L):c.push(R+1,R,L),S+=3}h.addGroup(g,S,E===!0?1:2),g+=S}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Jc(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $y extends lu{constructor(t){super(t),this.uuid=Us(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const s=t.holes[e];this.holes.push(new lu().fromJSON(s))}return this}}const jy={triangulate:function(i,t,e=2){const n=t&&t.length,s=n?t[0]*e:i.length;let o=am(i,0,s,e,!0);const r=[];if(!o||o.next===o.prev)return r;let a,l,h,c,f,d,u;if(n&&(o=t_(i,t,o,e)),i.length>80*e){a=h=i[0],l=c=i[1];for(let p=e;p<s;p+=e)f=i[p],d=i[p+1],f<a&&(a=f),d<l&&(l=d),f>h&&(h=f),d>c&&(c=d);u=Math.max(h-a,c-l),u=u!==0?32767/u:0}return gl(o,r,e,a,l,u,0),r}};function am(i,t,e,n,s){let o,r;if(s===u_(i,t,e,n)>0)for(o=t;o<e;o+=n)r=Td(o,i[o],i[o+1],r);else for(o=e-n;o>=t;o-=n)r=Td(o,i[o],i[o+1],r);return r&&Qc(r,r.next)&&(vl(r),r=r.next),r}function yr(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(Qc(e,e.next)||Dn(e.prev,e,e.next)===0)){if(vl(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function gl(i,t,e,n,s,o,r){if(!i)return;!r&&o&&o_(i,n,s,o);let a=i,l,h;for(;i.prev!==i.next;){if(l=i.prev,h=i.next,o?Zy(i,n,s,o):Ky(i)){t.push(l.i/e|0),t.push(i.i/e|0),t.push(h.i/e|0),vl(i),i=h.next,a=h.next;continue}if(i=h,i===a){r?r===1?(i=Jy(yr(i),t,e),gl(i,t,e,n,s,o,2)):r===2&&Qy(i,t,e,n,s,o):gl(yr(i),t,e,n,s,o,1);break}}}function Ky(i){const t=i.prev,e=i,n=i.next;if(Dn(t,e,n)>=0)return!1;const s=t.x,o=e.x,r=n.x,a=t.y,l=e.y,h=n.y,c=s<o?s<r?s:r:o<r?o:r,f=a<l?a<h?a:h:l<h?l:h,d=s>o?s>r?s:r:o>r?o:r,u=a>l?a>h?a:h:l>h?l:h;let p=n.next;for(;p!==t;){if(p.x>=c&&p.x<=d&&p.y>=f&&p.y<=u&&ra(s,a,o,l,r,h,p.x,p.y)&&Dn(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function Zy(i,t,e,n){const s=i.prev,o=i,r=i.next;if(Dn(s,o,r)>=0)return!1;const a=s.x,l=o.x,h=r.x,c=s.y,f=o.y,d=r.y,u=a<l?a<h?a:h:l<h?l:h,p=c<f?c<d?c:d:f<d?f:d,v=a>l?a>h?a:h:l>h?l:h,m=c>f?c>d?c:d:f>d?f:d,g=cu(u,p,t,e,n),M=cu(v,m,t,e,n);let T=i.prevZ,E=i.nextZ;for(;T&&T.z>=g&&E&&E.z<=M;){if(T.x>=u&&T.x<=v&&T.y>=p&&T.y<=m&&T!==s&&T!==r&&ra(a,c,l,f,h,d,T.x,T.y)&&Dn(T.prev,T,T.next)>=0||(T=T.prevZ,E.x>=u&&E.x<=v&&E.y>=p&&E.y<=m&&E!==s&&E!==r&&ra(a,c,l,f,h,d,E.x,E.y)&&Dn(E.prev,E,E.next)>=0))return!1;E=E.nextZ}for(;T&&T.z>=g;){if(T.x>=u&&T.x<=v&&T.y>=p&&T.y<=m&&T!==s&&T!==r&&ra(a,c,l,f,h,d,T.x,T.y)&&Dn(T.prev,T,T.next)>=0)return!1;T=T.prevZ}for(;E&&E.z<=M;){if(E.x>=u&&E.x<=v&&E.y>=p&&E.y<=m&&E!==s&&E!==r&&ra(a,c,l,f,h,d,E.x,E.y)&&Dn(E.prev,E,E.next)>=0)return!1;E=E.nextZ}return!0}function Jy(i,t,e){let n=i;do{const s=n.prev,o=n.next.next;!Qc(s,o)&&lm(s,n,n.next,o)&&xl(s,o)&&xl(o,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),vl(n),vl(n.next),n=i=o),n=n.next}while(n!==i);return yr(n)}function Qy(i,t,e,n,s,o){let r=i;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&l_(r,a)){let l=cm(r,a);r=yr(r,r.next),l=yr(l,l.next),gl(r,t,e,n,s,o,0),gl(l,t,e,n,s,o,0);return}a=a.next}r=r.next}while(r!==i)}function t_(i,t,e,n){const s=[];let o,r,a,l,h;for(o=0,r=t.length;o<r;o++)a=t[o]*n,l=o<r-1?t[o+1]*n:i.length,h=am(i,a,l,n,!1),h===h.next&&(h.steiner=!0),s.push(a_(h));for(s.sort(e_),o=0;o<s.length;o++)e=n_(s[o],e);return e}function e_(i,t){return i.x-t.x}function n_(i,t){const e=i_(i,t);if(!e)return t;const n=cm(e,i);return yr(n,n.next),yr(e,e.next)}function i_(i,t){let e=t,n=-1/0,s;const o=i.x,r=i.y;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const d=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=o&&d>n&&(n=d,s=e.x<e.next.x?e:e.next,d===o))return s}e=e.next}while(e!==t);if(!s)return null;const a=s,l=s.x,h=s.y;let c=1/0,f;e=s;do o>=e.x&&e.x>=l&&o!==e.x&&ra(r<h?o:n,r,l,h,r<h?n:o,r,e.x,e.y)&&(f=Math.abs(r-e.y)/(o-e.x),xl(e,i)&&(f<c||f===c&&(e.x>s.x||e.x===s.x&&s_(s,e)))&&(s=e,c=f)),e=e.next;while(e!==a);return s}function s_(i,t){return Dn(i.prev,i,t.prev)<0&&Dn(t.next,i,i.next)<0}function o_(i,t,e,n){let s=i;do s.z===0&&(s.z=cu(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,r_(s)}function r_(i){let t,e,n,s,o,r,a,l,h=1;do{for(e=i,i=null,o=null,r=0;e;){for(r++,n=e,a=0,t=0;t<h&&(a++,n=n.nextZ,!!n);t++);for(l=h;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,a--):(s=n,n=n.nextZ,l--),o?o.nextZ=s:i=s,s.prevZ=o,o=s;e=n}o.nextZ=null,h*=2}while(r>1);return i}function cu(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function a_(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function ra(i,t,e,n,s,o,r,a){return(s-r)*(t-a)>=(i-r)*(o-a)&&(i-r)*(n-a)>=(e-r)*(t-a)&&(e-r)*(o-a)>=(s-r)*(n-a)}function l_(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!c_(i,t)&&(xl(i,t)&&xl(t,i)&&h_(i,t)&&(Dn(i.prev,i,t.prev)||Dn(i,t.prev,t))||Qc(i,t)&&Dn(i.prev,i,i.next)>0&&Dn(t.prev,t,t.next)>0)}function Dn(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function Qc(i,t){return i.x===t.x&&i.y===t.y}function lm(i,t,e,n){const s=sc(Dn(i,t,e)),o=sc(Dn(i,t,n)),r=sc(Dn(e,n,i)),a=sc(Dn(e,n,t));return!!(s!==o&&r!==a||s===0&&ic(i,e,t)||o===0&&ic(i,n,t)||r===0&&ic(e,i,n)||a===0&&ic(e,t,n))}function ic(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function sc(i){return i>0?1:i<0?-1:0}function c_(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&lm(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function xl(i,t){return Dn(i.prev,i,i.next)<0?Dn(i,t,i.next)>=0&&Dn(i,i.prev,t)>=0:Dn(i,t,i.prev)<0||Dn(i,i.next,t)<0}function h_(i,t){let e=i,n=!1;const s=(i.x+t.x)/2,o=(i.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&s<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function cm(i,t){const e=new hu(i.i,i.x,i.y),n=new hu(t.i,t.x,t.y),s=i.next,o=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function Td(i,t,e,n){const s=new hu(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function vl(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function hu(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function u_(i,t,e,n){let s=0;for(let o=t,r=e-n;o<e;o+=n)s+=(i[r]-i[o])*(i[o+1]+i[r+1]),r=o;return s}class al{static area(t){const e=t.length;let n=0;for(let s=e-1,o=0;o<e;s=o++)n+=t[s].x*t[o].y-t[o].x*t[s].y;return n*.5}static isClockWise(t){return al.area(t)<0}static triangulateShape(t,e){const n=[],s=[],o=[];Ed(t),Ad(n,t);let r=t.length;e.forEach(Ed);for(let l=0;l<e.length;l++)s.push(r),r+=e[l].length,Ad(n,e[l]);const a=jy.triangulate(n,s);for(let l=0;l<a.length;l+=3)o.push(a.slice(l,l+3));return o}}function Ed(i){const t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Ad(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}class hm extends bn{constructor(t=new $y([new Dt(.5,.5),new Dt(-.5,.5),new Dt(-.5,-.5),new Dt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,s=[],o=[];for(let a=0,l=t.length;a<l;a++){const h=t[a];r(h)}this.setAttribute("position",new Ce(s,3)),this.setAttribute("uv",new Ce(o,2)),this.computeVertexNormals();function r(a){const l=[],h=e.curveSegments!==void 0?e.curveSegments:12,c=e.steps!==void 0?e.steps:1,f=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,u=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:u-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const g=e.extrudePath,M=e.UVGenerator!==void 0?e.UVGenerator:f_;let T,E=!1,A,w,_,S;g&&(T=g.getSpacedPoints(c),E=!0,d=!1,A=g.computeFrenetFrames(c,!1),w=new k,_=new k,S=new k),d||(m=0,u=0,p=0,v=0);const x=a.extractPoints(h);let y=x.shape;const b=x.holes;if(!al.isClockWise(y)){y=y.reverse();for(let yt=0,Lt=b.length;yt<Lt;yt++){const V=b[yt];al.isClockWise(V)&&(b[yt]=V.reverse())}}const L=al.triangulateShape(y,b),R=y;for(let yt=0,Lt=b.length;yt<Lt;yt++){const V=b[yt];y=y.concat(V)}function U(yt,Lt,V){return Lt||console.error("THREE.ExtrudeGeometry: vec does not exist"),yt.clone().addScaledVector(Lt,V)}const I=y.length,X=L.length;function Y(yt,Lt,V){let Nt,ft,Yt;const Tt=yt.x-Lt.x,at=yt.y-Lt.y,At=V.x-yt.x,z=V.y-yt.y,D=Tt*Tt+at*at,Q=Tt*z-at*At;if(Math.abs(Q)>Number.EPSILON){const dt=Math.sqrt(D),_t=Math.sqrt(At*At+z*z),xt=Lt.x-at/dt,jt=Lt.y+Tt/dt,Bt=V.x-z/_t,oe=V.y+At/_t,De=((Bt-xt)*z-(oe-jt)*At)/(Tt*z-at*At);Nt=xt+Tt*De-yt.x,ft=jt+at*De-yt.y;const Ut=Nt*Nt+ft*ft;if(Ut<=2)return new Dt(Nt,ft);Yt=Math.sqrt(Ut/2)}else{let dt=!1;Tt>Number.EPSILON?At>Number.EPSILON&&(dt=!0):Tt<-Number.EPSILON?At<-Number.EPSILON&&(dt=!0):Math.sign(at)===Math.sign(z)&&(dt=!0),dt?(Nt=-at,ft=Tt,Yt=Math.sqrt(D)):(Nt=Tt,ft=at,Yt=Math.sqrt(D/2))}return new Dt(Nt/Yt,ft/Yt)}const st=[];for(let yt=0,Lt=R.length,V=Lt-1,Nt=yt+1;yt<Lt;yt++,V++,Nt++)V===Lt&&(V=0),Nt===Lt&&(Nt=0),st[yt]=Y(R[yt],R[V],R[Nt]);const bt=[];let St,Ft=st.concat();for(let yt=0,Lt=b.length;yt<Lt;yt++){const V=b[yt];St=[];for(let Nt=0,ft=V.length,Yt=ft-1,Tt=Nt+1;Nt<ft;Nt++,Yt++,Tt++)Yt===ft&&(Yt=0),Tt===ft&&(Tt=0),St[Nt]=Y(V[Nt],V[Yt],V[Tt]);bt.push(St),Ft=Ft.concat(St)}for(let yt=0;yt<m;yt++){const Lt=yt/m,V=u*Math.cos(Lt*Math.PI/2),Nt=p*Math.sin(Lt*Math.PI/2)+v;for(let ft=0,Yt=R.length;ft<Yt;ft++){const Tt=U(R[ft],st[ft],Nt);wt(Tt.x,Tt.y,-V)}for(let ft=0,Yt=b.length;ft<Yt;ft++){const Tt=b[ft];St=bt[ft];for(let at=0,At=Tt.length;at<At;at++){const z=U(Tt[at],St[at],Nt);wt(z.x,z.y,-V)}}}const ye=p+v;for(let yt=0;yt<I;yt++){const Lt=d?U(y[yt],Ft[yt],ye):y[yt];E?(_.copy(A.normals[0]).multiplyScalar(Lt.x),w.copy(A.binormals[0]).multiplyScalar(Lt.y),S.copy(T[0]).add(_).add(w),wt(S.x,S.y,S.z)):wt(Lt.x,Lt.y,0)}for(let yt=1;yt<=c;yt++)for(let Lt=0;Lt<I;Lt++){const V=d?U(y[Lt],Ft[Lt],ye):y[Lt];E?(_.copy(A.normals[yt]).multiplyScalar(V.x),w.copy(A.binormals[yt]).multiplyScalar(V.y),S.copy(T[yt]).add(_).add(w),wt(S.x,S.y,S.z)):wt(V.x,V.y,f/c*yt)}for(let yt=m-1;yt>=0;yt--){const Lt=yt/m,V=u*Math.cos(Lt*Math.PI/2),Nt=p*Math.sin(Lt*Math.PI/2)+v;for(let ft=0,Yt=R.length;ft<Yt;ft++){const Tt=U(R[ft],st[ft],Nt);wt(Tt.x,Tt.y,f+V)}for(let ft=0,Yt=b.length;ft<Yt;ft++){const Tt=b[ft];St=bt[ft];for(let at=0,At=Tt.length;at<At;at++){const z=U(Tt[at],St[at],Nt);E?wt(z.x,z.y+T[c-1].y,T[c-1].x+V):wt(z.x,z.y,f+V)}}}lt(),vt();function lt(){const yt=s.length/3;if(d){let Lt=0,V=I*Lt;for(let Nt=0;Nt<X;Nt++){const ft=L[Nt];$t(ft[2]+V,ft[1]+V,ft[0]+V)}Lt=c+m*2,V=I*Lt;for(let Nt=0;Nt<X;Nt++){const ft=L[Nt];$t(ft[0]+V,ft[1]+V,ft[2]+V)}}else{for(let Lt=0;Lt<X;Lt++){const V=L[Lt];$t(V[2],V[1],V[0])}for(let Lt=0;Lt<X;Lt++){const V=L[Lt];$t(V[0]+I*c,V[1]+I*c,V[2]+I*c)}}n.addGroup(yt,s.length/3-yt,0)}function vt(){const yt=s.length/3;let Lt=0;Pt(R,Lt),Lt+=R.length;for(let V=0,Nt=b.length;V<Nt;V++){const ft=b[V];Pt(ft,Lt),Lt+=ft.length}n.addGroup(yt,s.length/3-yt,1)}function Pt(yt,Lt){let V=yt.length;for(;--V>=0;){const Nt=V;let ft=V-1;ft<0&&(ft=yt.length-1);for(let Yt=0,Tt=c+m*2;Yt<Tt;Yt++){const at=I*Yt,At=I*(Yt+1),z=Lt+Nt+at,D=Lt+ft+at,Q=Lt+ft+At,dt=Lt+Nt+At;xe(z,D,Q,dt)}}}function wt(yt,Lt,V){l.push(yt),l.push(Lt),l.push(V)}function $t(yt,Lt,V){Xt(yt),Xt(Lt),Xt(V);const Nt=s.length/3,ft=M.generateTopUV(n,s,Nt-3,Nt-2,Nt-1);Ot(ft[0]),Ot(ft[1]),Ot(ft[2])}function xe(yt,Lt,V,Nt){Xt(yt),Xt(Lt),Xt(Nt),Xt(Lt),Xt(V),Xt(Nt);const ft=s.length/3,Yt=M.generateSideWallUV(n,s,ft-6,ft-3,ft-2,ft-1);Ot(Yt[0]),Ot(Yt[1]),Ot(Yt[3]),Ot(Yt[1]),Ot(Yt[2]),Ot(Yt[3])}function Xt(yt){s.push(l[yt*3+0]),s.push(l[yt*3+1]),s.push(l[yt*3+2])}function Ot(yt){o.push(yt.x),o.push(yt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return d_(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,r=t.shapes.length;o<r;o++){const a=e[t.shapes[o]];n.push(a)}const s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new au[s.type]().fromJSON(s)),new hm(n,t.options)}}const f_={generateTopUV:function(i,t,e,n,s){const o=t[e*3],r=t[e*3+1],a=t[n*3],l=t[n*3+1],h=t[s*3],c=t[s*3+1];return[new Dt(o,r),new Dt(a,l),new Dt(h,c)]},generateSideWallUV:function(i,t,e,n,s,o){const r=t[e*3],a=t[e*3+1],l=t[e*3+2],h=t[n*3],c=t[n*3+1],f=t[n*3+2],d=t[s*3],u=t[s*3+1],p=t[s*3+2],v=t[o*3],m=t[o*3+1],g=t[o*3+2];return Math.abs(a-c)<Math.abs(r-h)?[new Dt(r,1-l),new Dt(h,1-f),new Dt(d,1-p),new Dt(v,1-g)]:[new Dt(a,1-l),new Dt(c,1-f),new Dt(u,1-p),new Dt(m,1-g)]}};function d_(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){const o=i[n];e.shapes.push(o.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Vu extends bn{constructor(t=.5,e=1,n=32,s=1,o=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:o,thetaLength:r},n=Math.max(3,n),s=Math.max(1,s);const a=[],l=[],h=[],c=[];let f=t;const d=(e-t)/s,u=new k,p=new Dt;for(let v=0;v<=s;v++){for(let m=0;m<=n;m++){const g=o+m/n*r;u.x=f*Math.cos(g),u.y=f*Math.sin(g),l.push(u.x,u.y,u.z),h.push(0,0,1),p.x=(u.x/e+1)/2,p.y=(u.y/e+1)/2,c.push(p.x,p.y)}f+=d}for(let v=0;v<s;v++){const m=v*(n+1);for(let g=0;g<n;g++){const M=g+m,T=M,E=M+n+1,A=M+n+2,w=M+1;a.push(T,E,w),a.push(E,A,w)}}this.setIndex(a),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vu(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ba extends bn{constructor(t=1,e=32,n=16,s=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let h=0;const c=[],f=new k,d=new k,u=[],p=[],v=[],m=[];for(let g=0;g<=n;g++){const M=[],T=g/n;let E=0;g===0&&r===0?E=.5/e:g===n&&l===Math.PI&&(E=-.5/e);for(let A=0;A<=e;A++){const w=A/e;f.x=-t*Math.cos(s+w*o)*Math.sin(r+T*a),f.y=t*Math.cos(r+T*a),f.z=t*Math.sin(s+w*o)*Math.sin(r+T*a),p.push(f.x,f.y,f.z),d.copy(f).normalize(),v.push(d.x,d.y,d.z),m.push(w+E,1-T),M.push(h++)}c.push(M)}for(let g=0;g<n;g++)for(let M=0;M<e;M++){const T=c[g][M+1],E=c[g][M],A=c[g+1][M],w=c[g+1][M+1];(g!==0||r>0)&&u.push(T,E,w),(g!==n-1||l<Math.PI)&&u.push(E,A,w)}this.setIndex(u),this.setAttribute("position",new Ce(p,3)),this.setAttribute("normal",new Ce(v,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ba(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Hu extends bn{constructor(t=1,e=.4,n=12,s=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:o},n=Math.floor(n),s=Math.floor(s);const r=[],a=[],l=[],h=[],c=new k,f=new k,d=new k;for(let u=0;u<=n;u++)for(let p=0;p<=s;p++){const v=p/s*o,m=u/n*Math.PI*2;f.x=(t+e*Math.cos(m))*Math.cos(v),f.y=(t+e*Math.cos(m))*Math.sin(v),f.z=e*Math.sin(m),a.push(f.x,f.y,f.z),c.x=t*Math.cos(v),c.y=t*Math.sin(v),d.subVectors(f,c).normalize(),l.push(d.x,d.y,d.z),h.push(p/s),h.push(u/n)}for(let u=1;u<=n;u++)for(let p=1;p<=s;p++){const v=(s+1)*u+p-1,m=(s+1)*(u-1)+p-1,g=(s+1)*(u-1)+p,M=(s+1)*u+p;r.push(v,m,M),r.push(m,g,M)}this.setIndex(r),this.setAttribute("position",new Ce(a,3)),this.setAttribute("normal",new Ce(l,3)),this.setAttribute("uv",new Ce(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class p_ extends ii{static get type(){return"RawShaderMaterial"}constructor(t){super(t),this.isRawShaderMaterial=!0}}class Gn extends _r{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new ge(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pu,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class m_ extends Gn{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Dt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ei(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ge(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ge(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ge(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class g_ extends _r{static get type(){return"MeshLambertMaterial"}constructor(t){super(),this.isMeshLambertMaterial=!0,this.color=new ge(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ge(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pu,this.normalScale=new Dt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=Mu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class um extends Nn{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new ge(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class x_ extends um{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Nn.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ge(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const K0=new qe,Cd=new k,Rd=new k;class v_{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Dt(512,512),this.map=null,this.mapPass=null,this.matrix=new qe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Iu,this._frameExtents=new Dt(1,1),this._viewportCount=1,this._viewports=[new Sn(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Cd.setFromMatrixPosition(t.matrixWorld),e.position.copy(Cd),Rd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Rd),e.updateMatrixWorld(),K0.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(K0),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(K0)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class y_ extends v_{constructor(){super(new Uu(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class __ extends um{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Nn.DEFAULT_UP),this.updateMatrix(),this.target=new Nn,this.shadow=new y_}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Gu extends bn{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){const t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}}class M_{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Pd(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Pd();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Pd(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:_u}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=_u);const ji=4,Z0=(i,t)=>(i+2048)*4096+(t+2048),b_=new Ei,qa=new Ti,Ld=new qe;class w_{constructor(){this.prims=[],this.grid=new Map,this.groundFn=()=>0,this.groundPrim={type:"ground",id:-1,kind:"ground"},this.stamp=1,this.bounds={minX:-120,maxX:120,minZ:-120,maxZ:120},this._tmp={dist:0,point:new k,normal:new k,prim:null,t:0}}setGroundHeightFn(t){this.groundFn=t}groundHeight(t,e){return this.groundFn(t,e)}addCapsule(t,e,n,s=n,o={}){const r=e.x-t.x,a=e.y-t.y,l=e.z-t.z,h=Math.max(1e-5,Math.hypot(r,a,l)),c={type:"capsule",id:this.prims.length,stamp:0,kind:"branch",ax:t.x,ay:t.y,az:t.z,bx:e.x,by:e.y,bz:e.z,dx:r/h,dy:a/h,dz:l/h,len:h,ra:n,rb:s,...o};this.prims.push(c);const f=Math.max(n,s)+.01;return this._insert(c,Math.min(t.x,e.x)-f,Math.max(t.x,e.x)+f,Math.min(t.z,e.z)-f,Math.max(t.z,e.z)+f),c.minY=Math.min(t.y,e.y)-f,c.maxY=Math.max(t.y,e.y)+f,c}addBox(t,e,n=0,s={}){typeof n=="number"?qa.setFromEuler(b_.set(0,n,0)):n&&n.isEuler?qa.setFromEuler(n):n&&n.isQuaternion?qa.copy(n):qa.identity(),Ld.makeRotationFromQuaternion(qa);const o=Ld.elements,r={type:"box",id:this.prims.length,stamp:0,kind:"building",cx:t.x,cy:t.y,cz:t.z,hx:e.x,hy:e.y,hz:e.z,xx:o[0],xy:o[1],xz:o[2],yx:o[4],yy:o[5],yz:o[6],zx:o[8],zy:o[9],zz:o[10],...s};this.prims.push(r);const a=Math.abs(r.xx)*e.x+Math.abs(r.yx)*e.y+Math.abs(r.zx)*e.z,l=Math.abs(r.xy)*e.x+Math.abs(r.yy)*e.y+Math.abs(r.zy)*e.z,h=Math.abs(r.xz)*e.x+Math.abs(r.yz)*e.y+Math.abs(r.zz)*e.z;return r.minY=t.y-l,r.maxY=t.y+l,this._insert(r,t.x-a,t.x+a,t.z-h,t.z+h),r}finalize(){}_insert(t,e,n,s,o){const r=Math.floor(e/ji),a=Math.floor(n/ji),l=Math.floor(s/ji),h=Math.floor(o/ji);for(let c=r;c<=a;c++)for(let f=l;f<=h;f++){const d=Z0(c,f);let u=this.grid.get(d);u||this.grid.set(d,u=[]),u.push(t)}}queryPrims(t,e,n,s){const o=++this.stamp,r=Math.floor((t-n)/ji),a=Math.floor((t+n)/ji),l=Math.floor((e-n)/ji),h=Math.floor((e+n)/ji);for(let c=r;c<=a;c++)for(let f=l;f<=h;f++){const d=this.grid.get(Z0(c,f));if(d)for(let u=0;u<d.length;u++){const p=d[u];p.stamp!==o&&(p.stamp=o,s(p))}}}primDistance(t,e,n){if(t.type==="capsule"){let h=((e.x-t.ax)*t.dx+(e.y-t.ay)*t.dy+(e.z-t.az)*t.dz)/t.len;const c=h;h=h<0?0:h>1?1:h;const f=t.ax+t.dx*t.len*h,d=t.ay+t.dy*t.len*h,u=t.az+t.dz*t.len*h,p=t.ra+(t.rb-t.ra)*h;let v=e.x-f,m=e.y-d,g=e.z-u,M=Math.hypot(v,m,g);return M<1e-6?(v=-t.dy*t.dx,m=1-t.dy*t.dy,g=-t.dy*t.dz,M=Math.hypot(v,m,g),M<1e-6&&(v=1,m=0,g=0,M=1),v/=M,m/=M,g/=M,n.normal.set(v,m,g),n.point.set(f+v*p,d+m*p,u+g*p),n.dist=-p,n.t=c,n):(v/=M,m/=M,g/=M,n.normal.set(v,m,g),n.point.set(f+v*p,d+m*p,u+g*p),n.dist=M-p,n.t=c,n)}if(t.type==="box"){const h=e.x-t.cx,c=e.y-t.cy,f=e.z-t.cz,d=h*t.xx+c*t.xy+f*t.xz,u=h*t.yx+c*t.yy+f*t.yz,p=h*t.zx+c*t.zy+f*t.zz;let v=d<-t.hx?-t.hx:d>t.hx?t.hx:d,m=u<-t.hy?-t.hy:u>t.hy?t.hy:u,g=p<-t.hz?-t.hz:p>t.hz?t.hz:p,M,T,E,A;if(v===d&&m===u&&g===p){const w=t.hx-Math.abs(d),_=t.hz-Math.abs(p);let S=t.hy-Math.abs(u);t.grounded===void 0&&(t.grounded=t.yy>.7&&t.minY<=this.groundFn(t.cx,t.cz)+.45),t.grounded&&u<0&&(S=1/0),M=T=E=0,w<=S&&w<=_?(M=d<0?-1:1,v=M*t.hx,A=-w):S<=_?(T=u<0?-1:1,m=T*t.hy,A=-S):(E=p<0?-1:1,g=E*t.hz,A=-_)}else M=d-v,T=u-m,E=p-g,A=Math.hypot(M,T,E),M/=A,T/=A,E/=A;return n.point.set(t.cx+v*t.xx+m*t.yx+g*t.zx,t.cy+v*t.xy+m*t.yy+g*t.zy,t.cz+v*t.xz+m*t.yz+g*t.zz),n.normal.set(M*t.xx+T*t.yx+E*t.zx,M*t.xy+T*t.yy+E*t.zy,M*t.xz+T*t.yz+E*t.zz),n.dist=A,n.t=0,n}const s=this.groundFn(e.x,e.z),o=.35,r=(this.groundFn(e.x+o,e.z)-this.groundFn(e.x-o,e.z))/(2*o),a=(this.groundFn(e.x,e.z+o)-this.groundFn(e.x,e.z-o))/(2*o),l=1/Math.hypot(r,1,a);return n.normal.set(-r*l,l,-a*l),n.point.set(e.x,s,e.z),n.dist=(e.y-s)*l,n.t=0,n}nearest(t,e,n,s=null,o=!1){const r=this._tmp;let a=1/0;n.prim=null,o||(this.primDistance(this.groundPrim,t,r),r.dist<e&&(a=r.dist,n.dist=r.dist,n.point.copy(r.point),n.normal.copy(r.normal),n.prim=this.groundPrim,n.t=0));const l=++this.stamp,h=Math.floor((t.x-e)/ji),c=Math.floor((t.x+e)/ji),f=Math.floor((t.z-e)/ji),d=Math.floor((t.z+e)/ji);for(let u=h;u<=c;u++)for(let p=f;p<=d;p++){const v=this.grid.get(Z0(u,p));if(v)for(let m=0;m<v.length;m++){const g=v[m];g.stamp!==l&&(g.stamp=l,!(t.y<g.minY-e||t.y>g.maxY+e)&&(s&&!s(g)||(this.primDistance(g,t,r),r.dist<a&&r.dist<e&&(a=r.dist,n.dist=r.dist,n.point.copy(r.point),n.normal.copy(r.normal),n.prim=g,n.t=r.t))))}}return n.prim?n:null}raycast(t,e,n,s=.22,o=.05){const r=this._ray||(this._ray={dist:0,point:new k,normal:new k,prim:null,t:0}),a=this._rp||(this._rp=new k),l=c=>c.type==="box"?!(c.noCamera||c.kind==="ledge"||c.kind==="rail"||c.kind==="fence"):Math.max(c.ra,c.rb)>=s;let h=.3;for(let c=0;c<40&&h<n;c++){a.copy(e).multiplyScalar(h).add(t);const f=this.nearest(a,3,r,l);if(!f){h+=3;continue}if(f.dist<o)return h;h+=Math.max(f.dist,.06)}return 1/0}}function J0(){return{dist:0,point:new k,normal:new k,prim:null,t:0}}const Ji={sunColor:16765600,skyZenith:3109592,skyHorizon:16769986,fog:15911332,hemiSky:12375807,hemiGround:9071434,leaves:[14242846,15239467,15906354,12729122,10235679,12099886,7311162],bark:5981750},lo=new k(-.55,.52,.42).normalize(),S_=`
varying vec3 vDir;
void main(){
  vDir = normalize(position);
  vec4 p = modelViewMatrix * vec4(position, 0.0);
  gl_Position = projectionMatrix * vec4(p.xyz, 1.0);
  gl_Position.z = gl_Position.w; // far plane
}`,T_=`
precision highp float;
varying vec3 vDir;
uniform vec3 uSun; uniform vec3 uZenith; uniform vec3 uHorizon; uniform vec3 uSunCol; uniform float uTime;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float a=0.5, s=0.0; for(int i=0;i<5;i++){ s+=a*noise(p); p=p*2.03+vec2(11.3,7.7); a*=0.5; } return s; }
void main(){
  vec3 d = normalize(vDir);
  float h = max(d.y, 0.0);
  vec3 col = mix(uHorizon, uZenith, pow(h, 0.42));
  col = mix(col, uZenith * 0.9, smoothstep(0.25, 0.9, h) * 0.35);
  // warm band near horizon towards the sun
  float sd = max(dot(d, uSun), 0.0);
  col += uSunCol * 0.22 * pow(sd, 6.0) * (1.0 - h*0.8);
  col += uSunCol * 1.2 * pow(sd, 90.0);
  col += vec3(1.0,0.95,0.85) * 6.0 * smoothstep(0.9994, 0.9998, sd);
  // clouds
  if (d.y > 0.01) {
    vec2 uv = d.xz / (d.y + 0.12) * 0.9 + vec2(uTime*0.004, 0.0);
    float c = fbm(uv*1.4);
    float m = smoothstep(0.52, 0.78, c) * smoothstep(0.01, 0.18, d.y);
    vec3 cc = mix(vec3(1.0,0.86,0.74), vec3(1.0,0.97,0.93), smoothstep(0.55,0.9,c));
    cc += uSunCol * 0.4 * pow(sd, 4.0);
    col = mix(col, cc, m*0.85);
  }
  // below horizon: fade to haze
  col = mix(col, uHorizon*0.92, smoothstep(0.0, -0.25, d.y));
  gl_FragColor = vec4(col, 1.0);
}`;function E_(i,t,e={}){const n=e.shadowSize||2048,s=e.shadowRange||42;t.toneMapping=bu,t.toneMappingExposure=1,t.outputColorSpace=ti,t.shadowMap.enabled=!0,t.shadowMap.type=gp;const o=new ii({vertexShader:S_,fragmentShader:T_,side:Si,depthWrite:!1,depthTest:!0,fog:!1,uniforms:{uSun:{value:lo.clone()},uZenith:{value:new ge(Ji.skyZenith)},uHorizon:{value:new ge(Ji.skyHorizon)},uSunCol:{value:new ge(Ji.sunColor)},uTime:{value:0}}}),r=new Mn(new ba(1,32,16),o);r.frustumCulled=!1,r.renderOrder=-1e3,i.add(r);const a=new ou(t),l=new Jp,h=new Mn(new ba(10,32,16),o);l.add(h);const c=a.fromScene(l,.04);i.environment=c.texture,i.environmentIntensity=.55,a.dispose(),i.fog=new ku(Ji.fog,.0062);const f=new x_(Ji.hemiSky,Ji.hemiGround,.85);i.add(f);const d=new __(Ji.sunColor,3.4);d.castShadow=!0,d.shadow.mapSize.set(n,n);const u=d.shadow.camera;u.left=-s,u.right=s,u.top=s,u.bottom=-s,u.near=1,u.far=220,d.shadow.bias=-4e-4,d.shadow.normalBias=.04,d.shadow.radius=2.5,i.add(d),i.add(d.target);const p=s*2/n,v=new k,m=new k().crossVectors(new k(0,1,0),lo).normalize(),g=new k().crossVectors(lo,m).normalize();function M(T,E){o.uniforms.uTime.value=E;const A=Math.round(T.dot(m)/p)*p,w=Math.round(T.dot(g)/p)*p,_=T.dot(lo);v.copy(m).multiplyScalar(A).addScaledVector(g,w).addScaledVector(lo,_),d.target.position.copy(v),d.position.copy(v).addScaledVector(lo,110),d.target.updateMatrixWorld()}return M(new k,0),{sun:d,hemi:f,sky:r,update:M}}function on(i){let t=i>>>0;const e=()=>{t|=0,t=t+1831565813|0;let n=Math.imul(t^t>>>15,1|t);return n=n+Math.imul(n^n>>>7,61|n)^n,((n^n>>>14)>>>0)/4294967296};return e.range=(n,s)=>n+(s-n)*e(),e.int=(n,s)=>Math.floor(n+(s-n+1)*e()),e.pick=n=>n[Math.floor(e()*n.length)],e.sign=()=>e()<.5?-1:1,e}function wi(i,t){let e=Math.imul(i|0,374761393)+Math.imul(t|0,668265263);return e=Math.imul(e^e>>>13,1274126177),((e^e>>>16)>>>0)/4294967296}function A_(i,t){const e=Math.floor(i),n=Math.floor(t);let s=i-e,o=t-n;s=s*s*(3-2*s),o=o*o*(3-2*o);const r=wi(e,n),a=wi(e+1,n),l=wi(e,n+1),h=wi(e+1,n+1);return r+(a-r)*s+(l-r)*o+(r-a-l+h)*s*o}function uu(i,t,e=4){let n=0,s=.5;for(let o=0;o<e;o++)n+=s*A_(i,t),i=i*2.03+17.1,t=t*2.03+9.7,s*=.5;return n}const pi=Math.PI/180,Vi=new k(0,1,0),Ze=(i,t,e)=>i+(t-i)*e,yn=(i,t,e)=>i<t?t:i>e?e:i,di=(i,t,e)=>{const n=yn((e-i)/(t-i),0,1);return n*n*(3-2*n)},Dd={oak:{gen:"broad",h:[14,18],R:[7,8.6],fork:[3.1,3.9],topExtra:.125,trunkR:.031,trunkTaper:.74,lean:.035,boughs:[5,6],elev:[-27,66],elevPow:1.5,d0:[10,60],boughSegs:6,boughK:1.18,yc:.4,pUp:2.3,pDn:4,lobe:.13,gnarl:.15,flare:.75,maxLevel:4,clumpLevel:2,lv:{2:{sp:.9,t0:.22,len:.6,segs:4,lift:.16,div:[42,70],roll:[-18,50],rk:[.6,.8]},3:{sp:.8,t0:.2,len:.58,segs:3,lift:.12,div:[40,70],roll:[-25,55],rk:[.55,.7]},4:{sp:.5,t0:.15,len:.5,segs:2,lift:.1,div:[35,70],roll:[-30,60],rk:[.5,.6]}},twigLen:[.7,1.25],cards:3200,cardSize:[.85,1.3],spread:.75,layer:.75,tiles:[0,1],hues:[[4,3],[1,3],[5,2],[0,2.5],[3,1],[2,1.5]],bark:[.7,.56,.43],barkTile:0,moss:1,fallen:110},maple:{gen:"broad",h:[12,15],R:[5,6.3],fork:[2.5,3.2],topExtra:.12,trunkR:.031,trunkTaper:.74,lean:.03,boughs:[4,5],elev:[-14,68],elevPow:1.15,d0:[22,66],boughSegs:5,boughK:1.25,yc:.5,pUp:2.1,pDn:2.8,lobe:.1,gnarl:.11,flare:.6,maxLevel:4,clumpLevel:2,lv:{2:{sp:.72,t0:.22,len:.6,segs:4,lift:.26,div:[38,64],roll:[-10,55],rk:[.62,.8]},3:{sp:.78,t0:.2,len:.56,segs:3,lift:.2,div:[38,66],roll:[-20,55],rk:[.55,.7]},4:{sp:.5,t0:.15,len:.5,segs:2,lift:.15,div:[35,66],roll:[-30,60],rk:[.5,.6]}},twigLen:[.65,1.15],cards:2550,cardSize:[.8,1.25],spread:.7,layer:.6,tiles:[2,3],hues:[[3,3],[0,3.5],[1,3],[2,2],[4,1]],bark:[.52,.47,.43],barkTile:0,moss:.7,fallen:100},street:{gen:"broad",h:[8,10],R:[3.1,3.7],fork:[3,3.25],topExtra:.1,trunkR:.026,trunkTaper:.8,lean:.012,boughs:[5,6],elev:[-12,74],elevPow:1,d0:[28,72],boughSegs:4,boughK:1.4,yc:.46,pUp:2,pDn:2.4,lobe:.05,gnarl:.08,flare:.4,maxLevel:3,clumpLevel:1,lv:{2:{sp:.5,t0:.2,len:.62,segs:3,lift:.2,div:[40,66],roll:[-20,50],rk:[.6,.78]},3:{sp:.36,t0:.2,len:.5,segs:2,lift:.15,div:[35,62],roll:[-30,60],rk:[.5,.6]}},twigLen:[.6,1],cards:1250,cardSize:[.7,1.05],spread:.65,fill:.55,layer:.55,tiles:[0,2],hues:[[2,3],[1,3],[5,2],[0,1.5]],bark:[.5,.45,.42],barkTile:0,moss:.3,fallen:60},birch:{gen:"birch",h:[10,13],R:[2.5,3.2],fork:[2.7,3.5],trunkR:.0175,lean:.06,gnarl:.09,flare:.35,maxLevel:3,clumpLevel:1,leader:!0,pUp:2,pDn:2,lobe:.08,lv:{2:{sp:.48,t0:.22,len:.6,segs:3,lift:-.3,div:[35,62],roll:[-45,25],rk:[.4,.55]},3:{sp:.32,t0:.15,len:.6,segs:2,lift:-.75,div:[30,60],roll:[-60,10],rk:[.5,.6]}},twigLen:[.5,.95],cards:1500,cardSize:[.6,.9],spread:.4,fill:.5,layer:.15,hang:.8,tiles:[4,5],hues:[[2,5],[5,2],[1,1]],bark:[1,.98,.94],barkTile:1,moss:.15,fallen:70},pine:{gen:"pine",h:[16,20],R:[3.5,4.5],fork:[3.8,5],trunkR:.02,lean:.012,gnarl:.03,flare:.4,maxLevel:2,clumpLevel:1,leader:!0,pUp:2,pDn:2,lobe:0,lv:{},twigLen:[.5,.9],cards:2300,cardSize:[.95,1.45],spread:.3,layer:1,flat:!0,fill:.6,tiles:[6,7],hues:null,bark:[.62,.42,.33],barkTile:0,moss:.25,fallen:0}},aa=new k;new k;new k;const Fo=new k,oc=new k,C_=new k,Id=new k;function Ic(i,t){const e=i()*2-1,n=i()*6.28318,s=Math.sqrt(1-e*e);return t.set(s*Math.cos(n),e,s*Math.sin(n))}function vo(i,t,e,n,s,o){const r=[];for(let a=0;a<=n;a++){const l=a/n,h=(1-l)*(1-l),c=2*(1-l)*l,f=l*l;r.push(new k(i.x*h+t.x*c+e.x*f,i.y*h+t.y*c+e.y*f,i.z*h+t.z*c+e.z*f))}if(s>0){const a=i.distanceTo(e)/n;for(let l=1;l<n;l++)r[l].x+=(o()-.5)*2*s*a,r[l].y+=(o()-.5)*2*s*a,r[l].z+=(o()-.5)*2*s*a}return r}function yo(i,t,e,n,s,o,r,a=.9){const l=e.length-1,h=[0];for(let d=1;d<=l;d++)h.push(h[d-1]+e[d].distanceTo(e[d-1]));const c=[];for(let d=0;d<=l;d++)c.push(n+(s-n)*Math.pow(h[d]/h[l],a));const f={id:i.branches.length,level:t,pts:e,rad:c,cum:h,len:h[l],parent:o,parentRad:r,clump:0};return f.clump=o&&t>i.P.clumpLevel?o.clump:f.id,i.branches.push(f),f}function Wu(i,t,e,n){const s=t*i.len,o=i.pts.length-1;let r=0;for(;r<o-1&&i.cum[r+1]<s;)r++;const a=yn((s-i.cum[r])/Math.max(1e-6,i.cum[r+1]-i.cum[r]),0,1);return e.lerpVectors(i.pts[r],i.pts[r+1],a),n.subVectors(i.pts[r+1],i.pts[r]).normalize(),Ze(i.rad[r],i.rad[r+1],a)}function t0(i,t,e){const n=i.pts.length-1;let s=0;for(;s<n-1&&i.pts[s+1].y<t;)s++;const o=yn((t-i.pts[s].y)/Math.max(1e-6,i.pts[s+1].y-i.pts[s].y),0,1);return e.lerpVectors(i.pts[s],i.pts[s+1],o),Ze(i.rad[s],i.rad[s+1],o)}function fm(i,t){return 1+i.lobe*(.6*Math.sin(t*2+i.ph1)+.4*Math.sin(t*3+i.ph2))}function ll(i,t){const e=t.x-i.C.x,n=t.z-i.C.z,s=t.y-i.C.y,o=i.R*fm(i,Math.atan2(n,e)),r=s>=0,a=r?i.pUp:i.pDn;return Math.pow(Math.hypot(e,n)/o,a)+Math.pow(Math.abs(s)/(r?i.Ru:i.Rd),a)}function R_(i,t){const e=Math.hypot(t.x,t.z),n=i.R*fm(i,Math.atan2(t.z,t.x)),s=t.y>=0,o=s?i.pUp:i.pDn;return Math.pow(Math.pow(e/n,o)+Math.pow(Math.abs(t.y)/(s?i.Ru:i.Rd),o),-1/o)}function dm(i,t,e,n){if(Math.pow(ll(i,e),1/2)<=n)return 1;if(Math.pow(ll(i,t),1/2)>=n)return e.lerpVectors(t,e,.4),.4;let s=0,o=1;for(let r=0;r<12;r++){const a=(s+o)/2;Id.lerpVectors(t,e,a),Math.pow(ll(i,Id),1/2)<=n?s=a:o=a}return e.lerpVectors(t,e,s),s}const pm=i=>yn(i*.18,.011,.04);function qu(i,t,e){const n=i.P,s=i.rng,o=n.lv[e];if(!o)return;const r=e===n.maxLevel,a=i.scale,l=t.len;let h=Math.round(l*(.97-o.t0)/(o.sp*a)+s.range(-.4,.4));h<1&&(h=l>.6*a?1:0);let c=s.sign();const f=new k,d=new k,u=new k,p=new k,v=new k,m=new k,g=new k;for(let M=0;M<h;M++){const T=o.t0+(.97-o.t0)*(M+s.range(.25,.75))/h,E=Wu(t,T,f,d);let A=r?s.range(.012,.017)*Math.sqrt(a):Math.max(.016,E*s.range(o.rk[0],o.rk[1]));A=Math.min(A,E*.9);let w=r?s.range(n.twigLen[0],n.twigLen[1])*a:l*o.len*(1-.55*T)*s.range(.8,1.2);if(w=Math.min(w,A*(e<=2?70:48)),!r&&w<.5*a)continue;u.crossVectors(d,Vi),u.lengthSq()<.01&&u.set(f.x-i.axis.x,0,f.z-i.axis.z).cross(Vi),u.lengthSq()<1e-6&&u.set(1,0,0),u.normalize(),p.copy(Vi).addScaledVector(d,-d.y),p.lengthSq()<.01&&p.crossVectors(u,d),p.normalize();const _=s.range(o.div[0],o.div[1])*pi,S=s.range(o.roll[0],o.roll[1])*pi;for(let b=0;b<2;b++){v.copy(d).multiplyScalar(Math.cos(_)).addScaledVector(u,c*Math.cos(S)*Math.sin(_)).addScaledVector(p,Math.sin(S)*Math.sin(_)).normalize(),m.copy(f).addScaledVector(v,w),m.y+=w*o.lift;const C=Math.hypot(f.x-i.axis.x,f.z-i.axis.z),L=Math.hypot(m.x-i.axis.x,m.z-i.axis.z);if(e<=2&&L<C*.92&&b===0){c=-c;continue}break}if(dm(i.env,f,m,r?1.06:1.02)<.35&&!r)continue;g.copy(f).addScaledVector(v,f.distanceTo(m)*.5).addScaledVector(Ic(s,C_),f.distanceTo(m)*(r?.05:.11));const y=yo(i,e,vo(f,g,m,o.segs,r?.05:n.gnarl,s),A,r?A*.6:pm(A),t,E,e===2?1.1:.9);c=-c,qu(i,y,e+1)}}function P_(i){const t=i.P,e=i.rng,n=i.scale,s=e.range(t.h[0],t.h[1])*n,o=e.range(t.R[0],t.R[1])*n,r=e.range(t.fork[0],t.fork[1])*n,a=r+t.topExtra*s,l=t.trunkR*s*e.range(.93,1.07),h=e()*6.283,c=t.lean*a*e.range(.3,1),f=new k(Math.cos(h)*c,a,Math.sin(h)*c),d=r+(s-r)*t.yc;i.env={C:new k(f.x,d,f.z),R:o,Ru:s-d,Rd:d-r+.7*n,pUp:t.pUp,pDn:t.pDn,lobe:t.lobe,ph1:e()*6.28,ph2:e()*6.28},i.axis.set(f.x,0,f.z);const u=new k(0,-.5,0),p=new k(f.x*.15+e.range(-.1,.1)*n,a*.5,f.z*.15+e.range(-.1,.1)*n),v=yo(i,0,vo(u,p,f,5,.015,e),l,l*t.trunkTaper,null,0,1),m=e.int(t.boughs[0],t.boughs[1]),g=e()*6.283,M=[];let T=0;for(let x=0;x<m;x++)M.push(e.range(.8,1.25)),T+=M[x];const E=new k,A=new k,w=new k,_=new k,S=new k;for(let x=0;x<m;x++){const y=m>1?x/(m-1):1,b=(Ze(t.elev[0],t.elev[1],Math.pow(y,t.elevPow))+e.range(-5,5))*pi,C=g+x*2.39996+e.range(-.22,.22);E.set(Math.cos(b)*Math.cos(C),Math.sin(b),Math.cos(b)*Math.sin(C)),_.copy(i.env.C).addScaledVector(E,R_(i.env,E)*.95);const L=r+(a-r)*Math.pow(y,.75),R=t0(v,L,w),U=(Ze(t.d0[0],t.d0[1],y)+e.range(-6,6))*pi,I=C+e.range(-.3,.3);A.set(Math.cos(U)*Math.cos(I),Math.sin(U),Math.cos(U)*Math.sin(I)),S.copy(w).addScaledVector(A,w.distanceTo(_)*.45);const X=R*Math.sqrt(M[x]/T)*t.boughK,Y=yo(i,1,vo(w,S,_,t.boughSegs,t.gnarl,e),X,pm(X),v,R,1.25);qu(i,Y,2)}i.capTrunk=!0}function L_(i){const t=i.P,e=i.rng,n=i.scale,s=e.range(t.h[0],t.h[1])*n,o=e.range(t.R[0],t.R[1])*n,r=e.range(t.fork[0],t.fork[1])*n,a=t.trunkR*s*e.range(.93,1.07),l=e()*6.283,h=t.lean*s*e.range(.4,1),c=new k(Math.cos(l)*h,s*.97,Math.sin(l)*h),f=r+(s-r)*.5;i.env={C:new k(c.x*.6,f,c.z*.6),R:o,Ru:s-f+.4*n,Rd:f-r+1.2*n,pUp:t.pUp,pDn:t.pDn,lobe:t.lobe,ph1:e()*6.28,ph2:e()*6.28},i.axis.set(c.x*.6,0,c.z*.6);const d=new k(0,-.5,0),u=new k(c.x*.9+e.range(-.3,.3)*n,s*.45,c.z*.9+e.range(-.3,.3)*n),p=yo(i,0,vo(d,u,c,7,.012,e),a,.022*n,null,0,1.05),v=e.int(14,18),m=e()*6.283,g=new k,M=new k,T=new k,E=new k,A=new k;for(let w=0;w<v;w++){const _=w/(v-1),S=r+(s*.9-r)*Math.pow(_,.9),x=t0(p,S,M),y=m+w*2.39996+e.range(-.25,.25);A.set(Math.cos(y),0,Math.sin(y));const b=Ze(o*1.25,o*.5,_)*e.range(.85,1.12),C=(Ze(38,62,_)+e.range(-6,6))*pi;g.copy(A).multiplyScalar(Math.cos(C)).addScaledVector(Vi,Math.sin(C)),T.copy(M).addScaledVector(A,b*Ze(.8,.5,_)).addScaledVector(Vi,b*Ze(.5,.78,_)),E.copy(M).addScaledVector(g,b*.55),dm(i.env,M,T,1);const L=yn(x*.6,.062*n,.095*n),R=yo(i,1,vo(M,E,T,4,t.gnarl,e),L,.013,p,x,1.5);qu(i,R,2)}i.P.lv[2]&&mm(i,p,3,.72,.98,5)}function mm(i,t,e,n,s,o){const r=i.P,a=i.rng,l=i.scale,h=r.lv[e]||r.lv[r.maxLevel],c=new k,f=new k,d=new k,u=new k,p=new k;for(let v=0;v<o;v++){const m=Ze(n,s,(v+a())/o),g=Wu(t,m,c,f),M=a()*6.283,T=a.range(10,50)*pi;d.set(Math.cos(M)*Math.cos(T),Math.sin(T),Math.sin(M)*Math.cos(T));const E=a.range(r.twigLen[0],r.twigLen[1])*l;u.copy(c).addScaledVector(d,E),u.y+=E*(h?h.lift:0),p.copy(c).addScaledVector(d,E*.5);const A=Math.min(g*.8,a.range(.012,.017));yo(i,r.maxLevel,vo(c,p,u,2,.05,a),A,A*.6,t,g)}}function D_(i){const t=i.P,e=i.rng,n=i.scale,s=e.range(t.h[0],t.h[1])*n,o=e.range(t.R[0],t.R[1])*n,r=e.range(t.fork[0],t.fork[1])*n,a=t.trunkR*s*e.range(.93,1.07),l=e()*6.283,h=t.lean*s*e.range(.2,1),c=new k(Math.cos(l)*h,s,Math.sin(l)*h),f=r+(s-r)*.45;i.env={C:new k(c.x*.5,f,c.z*.5),R:o,Ru:s-f,Rd:f-r+1,pUp:2,pDn:2,lobe:0,ph1:0,ph2:0},i.axis.set(c.x*.5,0,c.z*.5);const d=new k(0,-.5,0),u=new k(c.x*.6,s*.5,c.z*.6),p=yo(i,0,vo(d,u,c,8,.006,e),a,.03*n,null,0,1.1),v=new k,m=new k,g=new k,M=new k,T=new k,E=new k,A=new k,w=new k,_=new k;let S=r,x=e()*6.283;for(;S<s-.9*n;){const y=(S-r)/(s-r),b=y>.82?3:e.int(3,5),C=Math.pow(1-y,.72)*(.5+.5*Math.min(1,y/.2));for(let L=0;L<b;L++){const R=x+(L+e.range(-.18,.18))*6.283/b;m.set(Math.cos(R),0,Math.sin(R));const U=Math.max(.8*n,o*C*e.range(.55,1.12)),I=t0(p,S+e.range(-.4,.4)*n,v),X=(Ze(6,42,y*y)+e.range(-5,8))*pi;g.copy(m).multiplyScalar(Math.cos(X)).addScaledVector(Vi,Math.sin(X)),M.copy(v).addScaledVector(m,U*.97).addScaledVector(Vi,U*(Ze(-.18,.5,Math.pow(y,1.5))+e.range(-.08,.1))),T.copy(v).addScaledVector(g,U*.5),T.y-=U*.06;const Y=y>.93?.046*n:yn(I*.42,.064*n,.1*n),st=yo(i,1,vo(v,T,M,U>2.2*n?4:3,t.gnarl,e),Y,.016,p,I,.85),bt=Math.round(U/(.72*n));let St=e.sign();for(let Ft=0;Ft<bt;Ft++){const ye=.28+.68*(Ft+e.range(.3,.7))/bt,lt=Wu(st,ye,E,A);w.crossVectors(A,Vi).normalize();const vt=e.range(48,64)*pi;_.copy(A).multiplyScalar(Math.cos(vt)).addScaledVector(w,St*Math.sin(vt)),_.y+=e.range(-.2,.22),_.normalize();const Pt=Math.max(.4*n,U*.4*(1-.5*ye)*e.range(.8,1.2));M.copy(E).addScaledVector(_,Pt),M.y+=Pt*.08,T.copy(E).addScaledVector(_,Pt*.5);const wt=Math.min(lt*.7,.024*n);yo(i,2,vo(E,T,M,2,.04,e),wt,wt*.55,st,lt),St=-St}}x+=.9+e.range(-.2,.2),S+=1.12*n*e.range(.8,1.2)}mm(i,p,2,.955,.995,3)}const Ud=new Dt(lo.x,lo.z).normalize(),I_=i=>i>=.26?10:i>=.12?8:i>=.07?6:i>=.036?5:i>=.024?4:3,zd=(i,t,e)=>{const n=Math.sin(i*1.7+t*.9)*Math.sin(e*1.9-t*1.3)+.5*Math.sin(i*4.1+e*3.7+t*2.3);return yn(.5+n*.4,0,1)},rc=[0,0,0];function U_(i,t,e,n,s,o,r,a){const l=i.P;let h,c,f;const d=e-i.y0;if(l.barkTile===1){const g=di(.02,.05,a);h=Ze(.3,1,g),c=Ze(.2,.98,g),f=Ze(.16,.94,g);const M=Ze(.5,1,di(0,1.1,d+zd(t*3,e,n*3)*.6));h*=M,c*=M,f*=M}else{const g=1-di(.02,.06,a);h=Ze(i.bark[0],i.bark[0]*.95,g),c=Ze(i.bark[1],i.bark[1]*.8,g),f=Ze(i.bark[2],i.bark[2]*.7,g)}const u=s*Ud.x+r*Ud.y,p=zd(t,e,n);let v=yn((o-.15)*1.5,0,1)*di(.035,.1,a)*(.25+.75*p);v=Math.max(v,yn(-u,0,1)*di(.12,.3,a)*p*Math.exp(-Math.max(d,0)/3.5)*.8),v*=l.moss,h=Ze(h,.46,v*.75),c=Ze(c,.56,v*.75),f=Ze(f,.2,v*.75);const m=(1-.16*yn(-u,0,1))*(1-.18*yn(-o,0,1))*(.9+.1*p);return rc[0]=h*m,rc[1]=c*m,rc[2]=f*m,rc}const Do=new k,Io=new k,ac=new k;function z_(i,t,e,n,s,o,r){const a=Math.max(1,Math.round(6.2832*n[Math.min(2,e.length-1)]/.62)),l=n[0]>=.12;let h=e,c=n,f=r;const d=[t.rng()];l&&(h=[e[0]],c=[n[0]],f=r?[r[0]]:null);{let M=d[0],T=1;for(let E=1;E<e.length;E++){const A=e[E-1],w=e[E],_=n[E-1],S=n[E],x=6.2832*Math.max(l?n[0]*.8:S,.03)/a*2.2;let y=A.distanceTo(w)/x;if(l){let b=0;const C=y;for(let L=0;L<12;L++){const R=T>0?1-M:M;if(y<=R+1e-4)break;b+=R/C,y-=R,M=T>0?1:0,T=-T,b>.04&&b<.96&&(h.push(new k().lerpVectors(A,w,b)),c.push(Ze(_,S,b)),f&&f.push(Ze(r[E-1],r[E],b)),d.push(M))}M+=T*y,h.push(w),c.push(S),f&&f.push(r[E]),d.push(yn(M,0,1))}else{M+=T*y;for(let b=0;b<8&&(M>1||M<0);b++)M>1?(M=2-M,T=-1):(M=-M,T=1);d.push(M)}}}const u=h.length,p=i.pos.length/3,v=t.lobeN,m=t.lobePh;for(let M=0;M<u;M++){M===0?Do.subVectors(h[1],h[0]):M===u-1?Do.subVectors(h[u-1],h[u-2]):Do.subVectors(h[M+1],h[M-1]),Do.normalize(),M===0&&(Math.abs(Do.y)<.9?Io.set(0,1,0):Io.set(1,0,0)),Io.addScaledVector(Do,-Io.dot(Do)).normalize(),ac.crossVectors(Do,Io);const T=c[M],E=h[M],A=(o+.02+.96*d[M])*.5,w=f?f[M]:0;for(let _=0;_<=s;_++){const S=_%s/s*6.283185,x=Math.cos(S),y=Math.sin(S),b=Io.x*x+ac.x*y,C=Io.y*x+ac.y*y,L=Io.z*x+ac.z*y;let R=T;if(w>0){const st=.5+.5*Math.sin(S*v+m);R*=1+w*st*st}const U=E.x+b*R,I=E.y+C*R,X=E.z+L*R;i.pos.push(U,I,X),i.nrm.push(b,C,L),i.uv.push(_/s*a,A);const Y=U_(t,U,I,X,b,C,L,T);i.col.push(Y[0],Y[1],Y[2])}}const g=s+1;for(let M=0;M<u-1;M++)for(let T=0;T<s;T++){const E=p+M*g+T,A=E+1,w=E+g,_=w+1;i.idx.push(E,A,w,A,_,w)}}const Q0=new k;function k_(i,t){const e=t.P;for(const n of t.branches){const s=n.pts.length-1;let o,r,a=null;if(n.level===0){o=[],r=[],a=[];const l=n.rad[0],h=Math.max(.5,l/.42),c=[-.45,-.06,.1,.27,.52,.9,1.5];for(const d of c){const u=d*h,p=new k,v=t0(n,t.y0+u,p);o.push(p),r.push(v*(1+e.flare*Math.exp(-Math.max(u,0)/(l*.85)))),a.push(.34*Math.exp(-Math.max(u,0)/(l*.75)))}const f=c[c.length-1]*h+.3;for(let d=1;d<=s;d++)n.pts[d].y-t.y0>f&&(o.push(n.pts[d]),r.push(n.rad[d]),a.push(0));if(t.capTrunk){const d=n.pts[s],u=n.rad[s],p=Q0.subVectors(n.pts[s],n.pts[s-1]).normalize();o.push(d.clone().addScaledVector(p,u*.45)),r.push(u*.86),a.push(0),o.push(d.clone().addScaledVector(p,u*.8)),r.push(u*.5),a.push(0),o.push(d.clone().addScaledVector(p,u*.95)),r.push(u*.04),a.push(0)}}else if(n.level===e.maxLevel){if(e.gen!=="pine"&&n.id%4)continue;o=[n.pts[0],n.pts[s]],r=[n.rad[0],n.rad[s]*.5]}else if(n.rad[0]<.036&&s===3)o=[n.pts[0],n.pts[2],n.pts[3]],r=[n.rad[0],n.rad[2],n.rad[3]];else if(n.rad[0]<.08&&n.parentRad>0&&n.rad[0]>=.036){const l=n.pts[0],h=n.pts[1],c=n.rad[0],f=l.distanceTo(h),d=Q0.subVectors(h,l).divideScalar(f),u=Math.min(n.parentRad+c*.8,f*.6);o=[l,l.clone().addScaledVector(d,u)],r=[c*1.12,Ze(c,n.rad[1],u/f)*1.06];for(let p=1;p<=s;p++)o.push(n.pts[p]),r.push(n.rad[p])}else if(n.rad[0]>=.08&&n.parentRad>0){const l=n.pts[0],h=n.pts[1],c=n.rad[0],f=l.distanceTo(h),d=Q0.subVectors(h,l).divideScalar(f),u=Math.min(n.parentRad*.8,f*.4),p=Math.min(n.parentRad*1.05+c*2.6,f*.8);o=[l,l.clone().addScaledVector(d,u),l.clone().addScaledVector(d,p)];const v=di(.04,.12,c);r=[c*(1+.12*v),c*(1.06+.16*v),Ze(c,n.rad[1],p/f)*(1.02+.04*v)];for(let m=1;m<=s;m++)o.push(n.pts[m]),r.push(n.rad[m])}else o=n.pts,r=n.rad;z_(i,t,o,r,I_(n.rad[0]),e.barkTile,a)}}function lc(i,t,e){let n=Math.imul(i,374761393)+Math.imul(t,668265263)+Math.imul(e,1442695041);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function el(i,t,e,n){const s=Math.floor(i),o=Math.floor(t);let r=i-s,a=t-o;r=r*r*(3-2*r),a=a*a*(3-2*a);const l=(s%e+e)%e,h=(l+1)%e,c=lc(l,o,n),f=lc(h,o,n),d=lc(l,o+1,n),u=lc(h,o+1,n);return c+(f-c)*r+(d-c)*a+(c-f-d+u)*r*a}function jr(i,t,e,n,s){let o=0,r=.5;for(let a=0;a<s;a++)o+=r*el(i,t,e,n+a*7),i*=2,t*=2,e*=2,r*=.5;return o/(1-Math.pow(.5,s))}function N_(){const n=new Uint8Array(2097152),s=new Uint8Array(512*1024*4),o=new Float32Array(512*1024),r=new Float32Array(512*1024*3);for(let f=0;f<512;f++)for(let d=0;d<512;d++){const u=d/512,p=f/512,v=f*512+d,m=jr(u*4,p*3,4,11,3)-.5,g=Math.abs(2*el(u*12+m*2.6,p*3.4+3.1,12,21)-1),M=Math.abs(2*el(u*27+m*4,p*7+1.7,27,31)-1),T=Math.abs(2*el(u*6+9,p*17+m*2,6,51)-1),E=jr(u*40,p*40,40,41,3);let A=di(0,.42,g)*.72+di(0,.45,M)*.28;A*=1-.3*(1-di(0,.1,T)),A=A*(.82+.18*E)+(E-.5)*.08,o[v]=A;const w=jr(u*3,p*2,3,61,3),_=el(u*90+m*6,p*9,90,77),S=(.4+.52*Math.pow(yn(A,0,1),1.1))*(.9+.14*_);r[v*3]=S*Ze(1,.94,w),r[v*3+1]=S*Ze(.94,.96,w),r[v*3+2]=S*Ze(.86,.98,w)}const a=512*512;for(let f=0;f<512;f++)for(let d=0;d<512;d++){const u=d/512,p=f/512,v=a+f*512+d,m=jr(u*3,p*2.5,3,71,4),g=jr(u*2,p*46,2,81,2),M=jr(u*30,p*60,30,91,2),T=.86+.12*m-.1*di(.55,.8,g)+(M-.5)*.05;o[v]=.6+.08*g+.04*M,r[v*3]=T,r[v*3+1]=T*Ze(.97,.99,m),r[v*3+2]=T*Ze(.9,.97,m)}const l=on(977),h=(f,d,u,p,v,m,g)=>{const M=Math.floor(f-u-2),T=Math.ceil(f+u+2),E=Math.max(0,Math.floor(d-p-2)),A=Math.min(511,Math.ceil(d+p+2));for(let w=E;w<=A;w++)for(let _=M;_<=T;_++){const S=(_-f)/u,x=(w-d)/p,y=S*S+x*x;if(y>1.6)continue;const b=1-di(g,1.3,y),C=a+w*512+(_%512+512)%512;r[C*3]=Ze(r[C*3],v,b),r[C*3+1]=Ze(r[C*3+1],v*.9,b),r[C*3+2]=Ze(r[C*3+2],v*.82,b),o[C]-=m*b}};for(let f=0;f<210;f++)h(l()*512,l()*512,l.range(4,22),l.range(.8,1.5),l.range(.1,.24),.25,.25);for(let f=0;f<7;f++){const d=l()*512,u=l.range(40,472),p=l.range(10,22);h(d,u,p,p*.3,.11,.4,.1),h(d-p*1.2,u+p*.35,p*.9,2.2,.14,.2,.2),h(d+p*1.2,u+p*.35,p*.9,2.2,.14,.2,.2)}for(let f=0;f<1024;f++){const d=f<512?0:512,u=f-d;for(let p=0;p<512;p++){const v=f*512+p,m=f*512+(p+512-1)%512,g=f*512+(p+1)%512,M=(d+Math.max(0,u-1))*512+p,T=(d+Math.min(511,u+1))*512+p,E=f<512?3.2:2;let A=(o[m]-o[g])*E,w=(o[M]-o[T])*E,_=1;const S=1/Math.hypot(A,w,_);A*=S,w*=S,_*=S,s[v*4]=(A*.5+.5)*255,s[v*4+1]=(w*.5+.5)*255,s[v*4+2]=(_*.5+.5)*255,s[v*4+3]=255,n[v*4]=yn(r[v*3],0,1)*255,n[v*4+1]=yn(r[v*3+1],0,1)*255,n[v*4+2]=yn(r[v*3+2],0,1)*255,n[v*4+3]=255}}const c=(f,d)=>{const u=new Ml(f,512,1024,bi);return u.wrapS=fl,u.wrapT=Ps,u.magFilter=Bi,u.minFilter=Ls,u.generateMipmaps=!0,u.anisotropy=4,d&&(u.colorSpace=ti),u.needsUpdate=!0,u};return{map:c(n,!0),normalMap:c(s,!1)}}function F_(i,t,e,n){if(i.beginPath(),t==="maple"){const s=[[180,.1],[150,.2],[112,.4],[84,.2],[55,.56],[26,.3],[0,.66],[-26,.3],[-55,.56],[-84,.2],[-112,.4],[-150,.2]],o=e*.42;s.forEach(([r,a],l)=>{const h=a*e*(.92+n()*.16),c=o+Math.cos(r*pi)*h,f=Math.sin(r*pi)*h;l===0?i.moveTo(c,f):i.lineTo(c,f)})}else{const o=[];for(let r=0;r<=26;r++){const a=r/26;let l;t==="oak"?l=.27*Math.pow(Math.sin(Math.PI*Math.pow(a,.8)),.7)*(.7+.3*Math.cos(a*6.283*3.6+.6))*(.5+.7*a):l=.36*Math.sin(Math.PI*Math.pow(a,.62))*(1-.35*a),o.push([.1*e+a*.9*e,l*e])}i.moveTo(o[0][0],0);for(let r=0;r<=26;r++)i.lineTo(o[r][0],o[r][1]);for(let r=26;r>=0;r--)i.lineTo(o[r][0],-o[r][1])}i.closePath()}function O_(i,t,e,n,s,o,r){i.save(),i.translate(e,n),i.rotate(s);const a=.8+r()*.2,l=r(),h=255*a,c=255*a*Ze(.9,1,l),f=255*a*Ze(.72,.9,l),d=i.createLinearGradient(0,0,o,0);if(d.addColorStop(0,`rgb(${h*.8|0},${c*.8|0},${f*.78|0})`),d.addColorStop(.55,`rgb(${h|0},${c|0},${f|0})`),d.addColorStop(1,`rgb(${h*.93|0},${c*.9|0},${f*.8|0})`),i.strokeStyle="rgb(110,84,60)",i.lineWidth=2.2,i.beginPath(),i.moveTo(0,0),i.lineTo(o*.14,0),i.stroke(),F_(i,t,o,r),i.fillStyle=d,i.fill(),i.strokeStyle=`rgba(${h*.72|0},${c*.66|0},${f*.58|0},0.5)`,i.lineWidth=1,i.stroke(),i.strokeStyle=`rgba(${h*.7|0},${c*.63|0},${f*.55|0},0.7)`,i.lineWidth=1.2,t==="maple"){const u=o*.42;for(const p of[0,55,-55,112,-112])i.beginPath(),i.moveTo(u-o*.3,0),i.lineTo(u,0),i.lineTo(u+Math.cos(p*pi)*o*.5,Math.sin(p*pi)*o*.5),i.stroke()}else{i.beginPath(),i.moveTo(o*.1,0),i.lineTo(o*.95,0),i.stroke(),i.lineWidth=.9;for(let u=1;u<=4;u++){const p=o*(.15+u*.16);for(const v of[-1,1])i.beginPath(),i.moveTo(p,0),i.lineTo(p+o*.12,v*o*.17),i.stroke()}}i.restore()}function B_(i,t,e){if(t==="pine"){const u=[[128,250,-90,150],[128,200,-140,80],[128,190,-40,85],[128,140,-150,70],[128,130,-30,72]];for(const[p,v,m,g]of u){const M=(m+e.range(-8,8))*pi,T=p+Math.cos(M)*g,E=v+Math.sin(M)*g;i.strokeStyle="rgb(120,92,66)",i.lineWidth=3,i.beginPath(),i.moveTo(p,v),i.lineTo(T,E),i.stroke();const A=Math.round(g*.85);for(let w=0;w<A;w++){const _=.12+.9*e(),S=p+(T-p)*_,x=v+(E-v)*_,y=M+e.sign()*e.range(22,62)*pi,b=e.range(30,46)*(1-.25*_),C=.72+e()*.28;i.strokeStyle=`rgb(${225*C|0},${255*C|0},${215*C|0})`,i.lineWidth=e.range(2.4,3.6),i.beginPath(),i.moveTo(S,x),i.lineTo(S+Math.cos(y)*b,x+Math.sin(y)*b),i.stroke()}}return}const n=t==="birch"?40:t==="maple"?60:54,s=t==="birch"?8:t==="maple"?4:6,o=e.range(-14,14),r=(u,p,v,m,g,M)=>{const T=A=>{const w=(v+M*A)*pi;return[u+Math.cos(w)*m*A,p+Math.sin(w)*m*A]};i.strokeStyle="rgb(112,86,62)",i.lineWidth=2.6,i.lineCap="round",i.beginPath(),i.moveTo(u,p);for(let A=1;A<=6;A++){const[w,_]=T(A/6);i.lineTo(w,_)}i.stroke();let E=e.sign();for(let A=0;A<g;A++){const w=A===g-1,_=w?1:.22+.76*A/(g-1),[S,x]=T(_),y=n*e.range(.82,1.12)*(w?1.08:Ze(.88,1,_)),b=v+M*_+(w?e.range(-12,12):E*e.range(42,76));O_(i,t,S,x,b*pi,y,e),E=-E}return T},a=r(128,254,-90+o*.3,176,s+2,o),[l,h]=a(.3),[c,f]=a(.5),d=e.sign();r(l,h,-90+d*e.range(44,58),96,s,d*14),r(c,f,-90-d*e.range(40,54),84,s-1,-d*14)}function V_(i){const t=i*4,e=i*2,n=document.createElement("canvas");n.width=t,n.height=e;const s=n.getContext("2d",{willReadFrequently:!0}),o=["oak","oak","maple","maple","birch","birch","pine","pine"],r=on(4242);for(let c=0;c<8;c++){const f=c%4,d=Math.floor(c/4);s.save(),s.translate(f*i,(1-d)*i),s.scale(i/256,i/256),s.beginPath(),s.rect(1,1,254,254),s.clip(),B_(s,o[c],r),s.restore()}const a=s.getImageData(0,0,t,e).data,l=new Uint8Array(t*e*4);for(let c=0;c<e;c++)for(let f=0;f<t;f++){const d=(c*t+f)*4,u=((e-1-c)*t+f)*4,p=a[d+3];p<8?(l[u]=232,l[u+1]=222,l[u+2]=190,l[u+3]=0):(l[u]=a[d],l[u+1]=a[d+1],l[u+2]=a[d+2],l[u+3]=p)}const h=new Ml(l,t,e,bi);return h.colorSpace=ti,h.magFilter=Bi,h.minFilter=Ls,h.generateMipmaps=!0,h.anisotropy=4,h.needsUpdate=!0,h}const cc={bark:null,leaf:{}};function H_(i){return{bark:cc.bark||(cc.bark=N_()),leaf:cc.leaf[i]||(cc.leaf[i]=V_(i))}}const kd=`
attribute vec4 aPos;   // anchor xyz (stem base), w = card size in metres
attribute vec4 aQuat;  // card orientation
attribute vec4 aNrm;   // shading normal bent towards a sphere around the clump, w = sway weight
attribute vec4 aCol;   // sRGB colour, a = (atlas tile + phase) / 8
uniform float uTime;
uniform vec3 uWind;    // xy = direction on the ground plane, z = strength
varying vec2 vLeafUv;
varying vec3 vLeafCol;
varying vec3 vWPos;
varying float vFar;
vec3 qrot(vec4 q, vec3 v){ return v + 2.0 * cross(q.xyz, cross(q.xyz, v) + q.w * v); }
vec3 leafWorld(out vec3 nrm){
  float code = aCol.a * 255.0 / 32.0;
  float tile = floor(code + 0.001), phase = fract(code);
  vLeafUv = (vec2(mod(tile, 4.0), floor(tile / 4.0)) + uv * 0.98 + 0.01) * vec2(0.25, 0.5);
  vec3 anchor = aPos.xyz;
  float size = aPos.w;
#ifdef LEAF_DEPTH
  vFar = 0.0;
#else
  vFar = smoothstep(22.0, 105.0, distance(anchor, cameraPosition));
  size *= 1.0 + 0.4 * vFar;
#endif
  float sway = aNrm.w;
  // gust fronts travelling across the park
  float ga = dot(anchor.xz, uWind.xy) * 0.06 - uTime * 1.0;
  float gust = 0.5 + 0.5 * sin(ga + 1.7 * sin(ga * 0.31 + anchor.z * 0.04));
  gust = uWind.z * (0.3 + 0.7 * gust * gust);
  vec3 lp = vec3(position.x, position.y, 0.0) * size;
  float w1 = sin(uTime * (2.1 + phase * 2.3) + phase * 40.0 + anchor.x * 0.7);
  float w2 = sin(uTime * (3.7 + phase * 3.1) + phase * 91.0 + anchor.z * 0.5);
  lp.z += (position.y * w1 * 0.13 + position.x * w2 * 0.12) * size * gust * sway; // rock about the stem, twist
  vec3 wp = anchor + qrot(aQuat, lp);
  wp.xz += uWind.xy * (gust * sway * 0.06 * (0.3 + position.y) * (0.6 + 0.4 * w1));
  nrm = normalize(aNrm.xyz + qrot(aQuat, vec3(position.x, position.y - 0.5, 0.0)) * 0.5);
  vWPos = wp;
  vLeafCol = pow(aCol.rgb, vec3(2.2));
  return wp;
}`,G_=`
uniform vec3 uFocus;
uniform float uFocusOn;
varying vec2 vLeafUv;
varying vec3 vLeafCol;
varying vec3 vWPos;
varying float vFar;
float ign(vec2 p){ return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715)))); }`,W_=`
vec4 leafTex = texture2D(map, vLeafUv);
if (leafTex.a < mix(0.5, 0.2, vFar)) discard;
{
  // camera friendly foliage: dither away leaves right in front of the lens and leaves inside
  // a soft tube from the camera to the player
  vec3 toP = vWPos - cameraPosition;
  float vis = smoothstep(0.25, 0.95, length(toP));
  if (uFocusOn > 0.5) {
    vec3 seg = uFocus - cameraPosition;
    float sl = max(length(seg), 0.001);
    vec3 sd = seg / sl;
    float along = dot(toP, sd);
    float d = length(toP - sd * along);
    float tt = clamp(along / sl, 0.0, 1.0);
    float rad = mix(0.22, 0.85, tt);
    float nearer = step(0.0, along) * (1.0 - smoothstep(sl + 0.1, sl + 0.9, along));
    vis = min(vis, mix(1.0, smoothstep(rad, rad * 2.1, d), nearer));
  }
  if (vis < 0.995 && vis <= ign(gl_FragCoord.xy)) discard;
}
diffuseColor.rgb *= leafTex.rgb * vLeafCol;`,q_=`
	float ndl = dot( geometryNormal, directLight.direction );
	float wrap = saturate( ( ndl + 0.3 ) / 1.3 );
	float back = saturate( -ndl );
	float vdl = saturate( dot( -geometryViewDir, directLight.direction ) ); // looking towards the sun
	vec3 through = material.diffuseColor * vec3( 1.5, 1.2, 0.5 ) + vec3( 0.06, 0.04, 0.0 );
	reflectedLight.directDiffuse += directLight.color * wrap * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directDiffuse += directLight.color * ( back * 0.22 + pow( vdl, 2.5 ) * ( 0.25 + 0.75 * back ) * 0.9 ) * BRDF_Lambert( through );`,X_=`
reflectedLight.indirectDiffuse *= 1.45;
reflectedLight.indirectDiffuse += diffuseColor.rgb * vec3( 1.0, 0.86, 0.62 ) * 0.2; // light bounced around inside the crown
#if NUM_DIR_LIGHTS > 0
{
	// light soaking through the crown when you look towards the low sun (not cut off by shadows)
	float vdl = saturate( dot( -normalize( vViewPosition ), directionalLights[ 0 ].direction ) );
	vec3 through = diffuseColor.rgb * vec3( 1.5, 1.15, 0.45 ) + vec3( 0.05, 0.03, 0.0 );
	reflectedLight.directDiffuse += directionalLights[ 0 ].color * through * ( pow( vdl, 2.0 ) * 0.14 );
}
#endif`;function Y_(i,t){const e=new g_({map:i,side:ni});e.onBeforeCompile=s=>{Object.assign(s.uniforms,t),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
`+kd).replace("#include <beginnormal_vertex>","vec3 leafN; vec3 leafP = leafWorld(leafN); vec3 objectNormal = leafN;").replace("#include <begin_vertex>","vec3 transformed = leafP;");let o=je.lights_lambert_pars_fragment;const r=o.indexOf("float dotNL"),a=o.indexOf("}",r);o=o.slice(0,r)+q_+`
`+o.slice(a),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
`+G_).replace("#include <map_fragment>",W_).replace("#include <normal_fragment_begin>","vec3 normal = normalize( vNormal ); vec3 nonPerturbedNormal = normal;").replace("#include <lights_lambert_pars_fragment>",o).replace("#include <lights_fragment_end>",`#include <lights_fragment_end>
`+X_)},e.customProgramCacheKey=()=>"squirrel-leaf";const n=new Zp({depthPacking:Up,map:i,side:ni});return n.onBeforeCompile=s=>{Object.assign(s.uniforms,t),s.vertexShader=s.vertexShader.replace("#include <common>",`#define LEAF_DEPTH
#include <common>
`+kd).replace("#include <begin_vertex>","vec3 leafN; vec3 transformed = leafWorld(leafN);"),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
varying vec2 vLeafUv;`).replace("#include <map_fragment>","if (texture2D(map, vLeafUv).a < 0.62) discard;")},n.customProgramCacheKey=()=>"squirrel-leaf-depth",{mat:e,depth:n}}const th=Ji.leaves.map(i=>new ge(i)),Nd=[new ge(4877108),new ge(6126134),new ge(4153144)],Fd=new qe,hc=new Ti,io=new ge,uc={h:0,s:0,l:0},vi=new k,Od=new k,Ms=new k,Kr=new k,ls=new k,Zr=new k,Xa=new k,Uo=new k;function Bd(i,t){let e=0;for(const s of t)e+=s[1];let n=i()*e;for(const s of t)if(n-=s[1],n<=0)return s[0];return t[0][0]}function Vd(i,t,e,n,s,o,r,a,l){i.pos.push(t.x,t.y,t.z,e),i.quat.push(n.x,n.y,n.z,n.w),i.nrm.push(s.x,s.y,s.z,o),i.col.push(r.r,r.g,r.b,(a+yn(l,0,.96)+.01)/8*(32*8/255))}function $_(i,t,e,n){const s=t.P,o=t.rng,r=t.scale,a=t.env,l=[],h=s.fill??.12;let c=0;const f=(A,w,_)=>{_*=h+(1-h)*di(.3,.72,Math.sqrt(ll(a,A.pts[w]))),l.push({p:A.pts[w],q:A.pts[w-1],w:_,clump:A.clump}),c+=_};for(const A of t.branches){const w=A.pts.length-1;if(A.level===s.maxLevel)for(let _=1;_<=w;_++)f(A,_,_===w?1.6:1.1);else if(A.level===s.maxLevel-1&&A.level>0)for(let _=1;_<=w;_++)_/w>.34&&f(A,_,_===w?1.4:.9);else(A.level>=1||s.leader)&&(f(A,w,1.4),A.level>=1&&f(A,w-1,.7))}const d=new Map;for(const A of l){let w=d.get(A.clump);w||d.set(A.clump,w={x:0,y:0,z:0,w:0,t:o()}),w.x+=A.p.x*A.w,w.y+=A.p.y*A.w,w.z+=A.p.z*A.w,w.w+=A.w}for(const A of d.values())A.x/=A.w,A.y/=A.w,A.z/=A.w;let u,p;if(s.hues){const A=o()<.12,w=A?6:Bd(o,s.hues);let _=o()<.3?w:Bd(o,s.hues);A&&(_=o()<.6?5:2),u=th[w],p=th[_]}else u=Nd[o.int(0,2)],p=Nd[o.int(0,2)];t.c1=u,t.c2=p;const v=o.range(.15,.5),m=Math.round(s.cards*e*r*r*o.range(.92,1.08)),g=1/Math.sqrt(Math.max(.3,e)),M=s.spread*r;for(const A of l){const w=Math.floor(A.w/c*m+o()),_=d.get(A.clump);Fo.subVectors(A.p,A.q).normalize();for(let S=0;S<w;S++){const x=o.range(s.cardSize[0],s.cardSize[1])*r*g;Ic(o,ls);const y=M*Math.cbrt(o());Uo.set(A.p.x+ls.x*y,A.p.y+ls.y*y*.6,A.p.z+ls.z*y).addScaledVector(Fo,o.range(-.25,.15)*r),Zr.subVectors(Uo,a.C);const b=Zr.length();Zr.divideScalar(Math.max(b,.001)),Xa.set(Uo.x-_.x,Uo.y-_.y,Uo.z-_.z);const C=Xa.length();Xa.divideScalar(Math.max(C,.001)),Ic(o,ls),s.flat?(vi.copy(Fo).addScaledVector(ls,.5),vi.y=vi.y*.6-.12):s.hang?vi.copy(Fo).multiplyScalar(.5).addScaledVector(ls,.55).addScaledVector(Vi,-s.hang):vi.copy(Fo).multiplyScalar(.55).addScaledVector(ls,.9).addScaledVector(Zr,.4),vi.normalize(),Ic(o,ls),Od.copy(Vi).multiplyScalar(s.layer).addScaledVector(Zr,.45).addScaledVector(ls,.6).normalize(),Ms.crossVectors(vi,Od),Ms.lengthSq()<1e-4&&Ms.crossVectors(vi,ls),Ms.normalize(),Kr.crossVectors(Ms,vi),hc.setFromRotationMatrix(Fd.makeBasis(Ms,vi,Kr)),aa.copy(Uo).addScaledVector(vi,-x*.4),Xa.multiplyScalar(.38).addScaledVector(Zr,.7).addScaledVector(Vi,.2).normalize();const L=yn(Math.sqrt(ll(a,Uo)),0,1.1),R=yn(v*.6+_.t*.55+(o()-.5)*.45,0,1);io.copy(u).lerp(p,R),s.hues&&io.lerp(th[o()<.5?2:5],(1-di(.35,.95,L))*.3),io.getHSL(uc),io.setHSL(uc.h+o.range(-.018,.018),yn(uc.s*o.range(.85,1.1),0,1),yn(uc.l*o.range(.82,1.18),0,1));const U=Ze(.74,1,di(.3,.95,L))*Ze(.9,1,di(-.6,.5,(Uo.y-_.y)/Math.max(.5,M*2)));io.multiplyScalar(U).convertLinearToSRGB();const I=s.tiles[o()<.5?0:1];Vd(i,aa,x,hc,Xa,Ze(.45,1,di(.4,1,L)),io,I,o())}}const T=Math.round((s.fallen||0)*e*r*r),E=t.env.R*1.25;for(let A=0;A<T;A++){const w=o()*6.283,_=E*Math.pow(o(),.7),S=t.env.C.x+Math.cos(w)*_,x=t.env.C.z+Math.sin(w)*_,y=o.range(.3,.5),b=o()*6.283;Ms.set(Math.cos(b),o.range(-.06,.06),Math.sin(b)).normalize(),Kr.set(o.range(-.08,.08),1,o.range(-.08,.08)).normalize(),vi.crossVectors(Kr,Ms).normalize(),Ms.crossVectors(vi,Kr),hc.setFromRotationMatrix(Fd.makeBasis(Ms,vi,Kr)),aa.set(S,n.groundHeight(S,x)+.035+o()*.02,x).addScaledVector(vi,-y*.5),io.copy(u).lerp(p,o()).lerp(io.clone().setHex(9067052),o.range(.15,.55)).multiplyScalar(o.range(.7,.95)).convertLinearToSRGB(),Vd(i,aa,y,hc,Vi,0,io,s.tiles[o()<.5?0:1],o())}}function j_(i,t){let e=0;const n=new k(0,-1/0,0),s=[];for(const l of t.branches){const h=l.pts.length-1;for(let c=0;c<h;c++){let f=l.rad[c];const d=l.rad[c+1];if((f+d)*.5<.045)continue;const u=l.pts[c],p=l.pts[c+1];if(l.level===0&&c===0&&(f*=1.18),i.addCapsule(u,p,f,d,{kind:l.level===0?"trunk":"branch"}),e++,p.y+d>n.y&&n.set(p.x,p.y+d,p.z),l.level===0)continue;const v=(f+d)*.5,m=u.distanceTo(p),g=(p.y-u.y)/m;if(v<.06||v>.3)continue;let M=m>1.6?[.3,.7]:[.5];if(c===0){const T=(l.parentRad+.2)/m;if(T>.9)continue;M=[Math.max(.6,T)]}for(const T of M){if(Fo.subVectors(p,u).divideScalar(m),oc.copy(Vi).addScaledVector(Fo,-Fo.y),oc.lengthSq()<1e-4)continue;oc.normalize();const E=Ze(f,d,T);s.push({p:new k().lerpVectors(u,p,T).addScaledVector(oc,E),steep:Math.abs(g)})}}}let o=s.filter(l=>l.steep<.72);o.length<8&&(o=s);const r=yn(Math.round(o.length/5),8,20),a=[];if(o.length){let l=0;for(let f=1;f<o.length;f++)o[f].p.y>o[l].p.y&&(l=f);const h=o.map(()=>1/0);let c=l;for(;a.length<r&&a.length<o.length;){a.push(o[c].p);let f=-1,d=-1;for(let u=0;u<o.length;u++){const p=o[u].p.distanceTo(o[c].p);p<h[u]&&(h[u]=p),h[u]>d&&(d=h[u],f=u)}if(d<.6)break;c=f}}return{count:e,top:n,perches:a}}function K_(i,t,e={}){const n=yn(e.quality??1,.25,1.5),s=e.chunkSize||80,o=new Oo;o.name="trees";const r=H_(e.leafTile||(n>=.8?512:256)),a={uTime:{value:0},uWind:{value:new k(.83,.55,1)},uFocus:{value:new k},uFocusOn:{value:0}},l=new Gn({map:r.bark.map,normalMap:r.bark.normalMap,normalScale:new Dt(1,1),vertexColors:!0,roughness:.96,metalness:0,envMapIntensity:.6}),h=Y_(r.leaf,a),c=new Map;let f=1/0,d=-1/0,u=1/0,p=-1/0;for(const _ of t)f=Math.min(f,_.x),d=Math.max(d,_.x),u=Math.min(u,_.z),p=Math.max(p,_.z);const v=Math.max(1,Math.ceil((d-f+1)/s)),m=Math.max(1,Math.ceil((p-u+1)/s)),g=(_,S)=>{const x=Math.min(v-1,Math.floor((_-f)/(d-f+1)*v))+","+Math.min(m-1,Math.floor((S-u)/(p-u+1)*m));let y=c.get(x);return y||c.set(x,y={G:{pos:[],nrm:[],uv:[],col:[],idx:[]},LF:{pos:[],quat:[],nrm:[],col:[]}}),y},M={trees:t.length,barkTriangles:0,leafCards:0,leafTriangles:0,triangles:0,capsules:0,drawCalls:0,perType:{}},T=[],E=new k;for(const _ of t){const S=Dd[_.type]||Dd.oak,x=on((_.seed??1)*2654435761+12345),y={P:S,rng:x,scale:_.scale||1,branches:[],env:null,axis:new k,y0:0,capTrunk:!1,bark:[S.bark[0]*x.range(.9,1.08),S.bark[1]*x.range(.9,1.08),S.bark[2]*x.range(.9,1.08)].map(st=>Math.min(1,st)),lobeN:x.int(4,6),lobePh:x()*6.28};S.gen==="pine"?D_(y):S.gen==="birch"?L_(y):P_(y),E.set(_.x,_.y??0,_.z),y.y0=E.y;for(const st of y.branches)for(const bt of st.pts)bt._moved||(bt.add(E),bt._moved=!0);y.env.C.add(E),y.axis.add(E);const b=g(_.x,_.z),C=b.G.idx.length,L=b.LF.pos.length;k_(b.G,y),$_(b.LF,y,n,i);const R=j_(i,y);let U=0,I=R.top.y;for(const st of y.branches)for(const bt of st.pts)U=Math.max(U,Math.hypot(bt.x-_.x,bt.z-_.z)),I=Math.max(I,bt.y);const X={spec:_,height:I-E.y+.3,crownRadius:U+.4,perches:R.perches,top:R.top};T.push(X),e.debug&&(M.skeletons||(M.skeletons=[])).push(y),M.capsules+=R.count;const Y=M.perType[_.type]||(M.perType[_.type]={n:0,barkTriangles:0,cards:0,capsules:0,perches:0});Y.n++,Y.barkTriangles+=(b.G.idx.length-C)/3,Y.cards+=(b.LF.pos.length-L)/4,Y.capsules+=R.count,Y.perches+=R.perches.length}const A={pos:new Float32Array([-.5,0,0,.5,0,0,.5,1,0,-.5,1,0]),uv:new Float32Array([0,0,1,0,1,1,0,1]),idx:[0,1,2,0,2,3]};for(const _ of c.values()){const{G:S,LF:x}=_;if(S.idx.length){const b=new bn;b.setAttribute("position",new cn(new Float32Array(S.pos),3)),b.setAttribute("normal",new cn(new Float32Array(S.nrm),3)),b.setAttribute("uv",new cn(new Float32Array(S.uv),2));const C=new Uint8Array(S.col.length);for(let R=0;R<C.length;R++)C[R]=yn(S.col[R],0,1)*255;b.setAttribute("color",new cn(C,3,!0)),b.setIndex(S.pos.length/3>65535?new cn(new Uint32Array(S.idx),1):new cn(new Uint16Array(S.idx),1)),b.computeBoundingSphere(),b.computeBoundingBox();const L=new Mn(b,l);L.castShadow=!0,L.receiveShadow=!0,L.name="bark",o.add(L),M.barkTriangles+=S.idx.length/3,M.drawCalls++}const y=x.pos.length/4;if(y){const b=new Gu;b.setAttribute("position",new cn(A.pos,3)),b.setAttribute("uv",new cn(A.uv,2)),b.setIndex(A.idx),b.instanceCount=y;const C=new Float32Array(x.pos),L=new Int16Array(y*4),R=new Int8Array(y*4),U=new Uint8Array(y*4),I=new ks;for(let Y=0;Y<y;Y++){for(let st=0;st<4;st++)L[Y*4+st]=Math.round(yn(x.quat[Y*4+st],-1,1)*32767),R[Y*4+st]=Math.round(yn(x.nrm[Y*4+st],-1,1)*127),U[Y*4+st]=Math.round(yn(x.col[Y*4+st],0,1)*255);aa.set(C[Y*4],C[Y*4+1],C[Y*4+2]),I.expandByPoint(aa)}b.setAttribute("aPos",new Ds(C,4)),b.setAttribute("aQuat",new Ds(L,4,!0)),b.setAttribute("aNrm",new Ds(R,4,!0)),b.setAttribute("aCol",new Ds(U,4,!0)),I.expandByScalar(2.5),b.boundingBox=I,b.boundingSphere=I.getBoundingSphere(new bo);const X=new Mn(b,h.mat);X.customDepthMaterial=h.depth,X.castShadow=!0,X.receiveShadow=!0,X.name="leaves",o.add(X),M.leafCards+=y,M.drawCalls++}}M.leafTriangles=M.leafCards*2,M.triangles=M.barkTriangles+M.leafTriangles;function w(_,S,x,y){a.uTime.value=S,y?(a.uFocus.value.copy(y),a.uFocusOn.value=1):a.uFocusOn.value=0}return{group:o,update:w,trees:T,stats:M,uniforms:a}}const fc=new Ti,eh=new Ti,Jr=new Ei(0,0,0,"YXZ"),Hd=new qe;new k;new k;const Qr=[1,1,1],dc=i=>Math.abs(i)<1e-12?0:Math.abs(i-1)<1e-12?1:Math.abs(i+1)<1e-12?-1:i,pc=new ge;function B(i,t=1){return pc.set(i),[pc.r*t,pc.g*t,pc.b*t]}function Le(i,t){return[i[0]*t,i[1]*t,i[2]*t]}function zs(i,t,e=.08){const n=1+(t()-.5)*2*e;return[i[0]*n,i[1]*n*(1+(t()-.5)*e),i[2]*n*(1+(t()-.5)*e)]}class Z_{constructor(t){this.mat=t,this.pos=[],this.nor=[],this.uv=[],this.col=[],this.idx=[],this.n=0}}const J_=[{k:"pz",n:[0,0,1],c:[[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],u:0,v:1},{k:"nz",n:[0,0,-1],c:[[1,-1,-1],[-1,-1,-1],[-1,1,-1],[1,1,-1]],u:0,v:1},{k:"px",n:[1,0,0],c:[[1,-1,1],[1,-1,-1],[1,1,-1],[1,1,1]],u:2,v:1},{k:"nx",n:[-1,0,0],c:[[-1,-1,-1],[-1,-1,1],[-1,1,1],[-1,1,-1]],u:2,v:1},{k:"py",n:[0,1,0],c:[[-1,1,1],[1,1,1],[1,1,-1],[-1,1,-1]],u:0,v:2},{k:"ny",n:[0,-1,0],c:[[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1]],u:0,v:2}];class Q_{constructor(t){this.world=t,this.batches=new Map,this.chunk="base",this.stack=[],this.fx=0,this.fy=0,this.fz=0,this.yaw=0,this.cs=1,this.sn=0,this.uvOx=0,this.uvOy=0,this.collide=!0}push(t,e,n,s=0){this.stack.push(this.fx,this.fy,this.fz,this.yaw);const o=this.wx(t,n),r=this.wz(t,n);this.fx=o,this.fy+=e,this.fz=r,this.yaw+=s,this.cs=dc(Math.cos(this.yaw)),this.sn=dc(Math.sin(this.yaw))}pushAbs(){this.stack.push(this.fx,this.fy,this.fz,this.yaw),this.fx=this.fy=this.fz=this.yaw=0,this.cs=1,this.sn=0}pop(){this.yaw=this.stack.pop(),this.fz=this.stack.pop(),this.fy=this.stack.pop(),this.fx=this.stack.pop(),this.cs=dc(Math.cos(this.yaw)),this.sn=dc(Math.sin(this.yaw))}wx(t,e){return this.fx+t*this.cs+e*this.sn}wz(t,e){return this.fz-t*this.sn+e*this.cs}toWorld(t,e,n,s=new k){return s.set(this.wx(t,n),this.fy+e,this.wz(t,n))}setChunk(t){this.chunk=t}batch(t){const e=t.name+"|"+(t.userData.global?"all":this.chunk);let n=this.batches.get(e);return n||this.batches.set(e,n=new Z_(t)),n}_v(t,e,n,s,o,r,a,l,h,c,f,d,u){return t.pos.push(this.fx+e*this.cs+s*this.sn,this.fy+n,this.fz-e*this.sn+s*this.cs),t.nor.push(o*this.cs+a*this.sn,r,-o*this.sn+a*this.cs),t.uv.push(l,h),t.col.push(c,f,d,u),t.n++}quad(t,e,n,s,o,r,a=Qr,l=1,h=1,c=null){const f=this.batch(t);let d,u,p;if(c&&c.length===4){const E=r?r[0]:0,A=r?r[1]:0,w=r?r[2]:1,_=r?r[3]:1,S=this._v(f,e[0],e[1],e[2],c[0][0],c[0][1],c[0][2],E,A,a[0]*l,a[1]*l,a[2]*l,l);this._v(f,n[0],n[1],n[2],c[1][0],c[1][1],c[1][2],w,A,a[0]*l,a[1]*l,a[2]*l,l),this._v(f,s[0],s[1],s[2],c[2][0],c[2][1],c[2][2],w,_,a[0]*h,a[1]*h,a[2]*h,h),this._v(f,o[0],o[1],o[2],c[3][0],c[3][1],c[3][2],E,_,a[0]*h,a[1]*h,a[2]*h,h),f.idx.push(S,S+1,S+2,S,S+2,S+3);return}if(c)d=c[0],u=c[1],p=c[2];else{const E=n[0]-e[0],A=n[1]-e[1],w=n[2]-e[2],_=o[0]-e[0],S=o[1]-e[1],x=o[2]-e[2];d=A*x-w*S,u=w*_-E*x,p=E*S-A*_;const y=Math.hypot(d,u,p)||1;d/=y,u/=y,p/=y}const v=r?r[0]:0,m=r?r[1]:0,g=r?r[2]:1,M=r?r[3]:1,T=this._v(f,e[0],e[1],e[2],d,u,p,v,m,a[0]*l,a[1]*l,a[2]*l,l);this._v(f,n[0],n[1],n[2],d,u,p,g,m,a[0]*l,a[1]*l,a[2]*l,l),this._v(f,s[0],s[1],s[2],d,u,p,g,M,a[0]*h,a[1]*h,a[2]*h,h),this._v(f,o[0],o[1],o[2],d,u,p,v,M,a[0]*h,a[1]*h,a[2]*h,h),f.idx.push(T,T+1,T+2,T,T+2,T+3)}fq(t,e,n,s,o,r,a,l=1,h=1,c=null){let f=c;if(!f){const d=t.userData.tile||1;f=[(e+this.uvOx)/d,(n+this.uvOy)/d,(s+this.uvOx)/d,(o+this.uvOy)/d]}this.quad(t,[e,n,r],[s,n,r],[s,o,r],[e,o,r],f,a,l,h)}hq(t,e,n,s,o,r,a,l){const h=l||t.userData.tile||1,c=this.wx(e,o),f=this.wz(e,o),d=s-e,u=o-n,p=this.batch(t),v=a||Qr,m=c/h,g=f/h,M=this._v(p,e,r,o,0,1,0,m,g,v[0],v[1],v[2],1);this._v(p,s,r,o,0,1,0,m+d/h,g,v[0],v[1],v[2],1),this._v(p,s,r,n,0,1,0,m+d/h,g+u/h,v[0],v[1],v[2],1),this._v(p,e,r,n,0,1,0,m,g+u/h,v[0],v[1],v[2],1),p.idx.push(M,M+1,M+2,M,M+2,M+3)}tri(t,e,n,s,o,r,a,l=Qr,h=1,c=1,f=1,d=null){const u=this.batch(t),p=n[0]-e[0],v=n[1]-e[1],m=n[2]-e[2],g=s[0]-e[0],M=s[1]-e[1],T=s[2]-e[2];let E=v*T-m*M,A=m*g-p*T,w=p*M-v*g;const _=Math.hypot(E,A,w)||1;E/=_,A/=_,w/=_,d&&(E=d[0],A=d[1],w=d[2]);const S=this._v(u,e[0],e[1],e[2],E,A,w,o[0],o[1],l[0]*h,l[1]*h,l[2]*h,h);this._v(u,n[0],n[1],n[2],E,A,w,r[0],r[1],l[0]*c,l[1]*c,l[2]*c,c),this._v(u,s[0],s[1],s[2],E,A,w,a[0],a[1],l[0]*f,l[1]*f,l[2]*f,f),u.idx.push(S,S+1,S+2)}_localQuat(t){return t&&t.rot?(Jr.set(t.rot[0],t.rot[1],t.rot[2],"YXZ"),fc.setFromEuler(Jr),fc):t&&t.yaw?(Jr.set(0,t.yaw,0,"YXZ"),fc.setFromEuler(Jr),fc):null}box(t,e,n,s,o,r,a,l){const h=this.batch(t),c=l&&l.c||Qr,f=l&&l.ao?l.ao[0]:1,d=l&&l.ao?l.ao[1]:1,u=l&&l.tile||t.userData.tile||1,p=l&&l.skip,v=this._localQuat(l);let m=[1,0,0],g=[0,1,0],M=[0,0,1];if(v){Hd.makeRotationFromQuaternion(v);const S=Hd.elements;m=[S[0],S[1],S[2]],g=[S[4],S[5],S[6]],M=[S[8],S[9],S[10]]}const T=o/2,E=r/2,A=a/2,w=[T,E,A],_=[e,n,s];for(let S=0;S<6;S++){const x=J_[S];if(p&&p.indexOf(x.k)>=0)continue;const y=x.n[0]*m[0]+x.n[1]*g[0]+x.n[2]*M[0],b=x.n[0]*m[1]+x.n[1]*g[1]+x.n[2]*M[1],C=x.n[0]*m[2]+x.n[1]*g[2]+x.n[2]*M[2],L=h.n;for(let R=0;R<4;R++){const U=x.c[R][0]*T,I=x.c[R][1]*E,X=x.c[R][2]*A,Y=e+m[0]*U+g[0]*I+M[0]*X,st=n+m[1]*U+g[1]*I+M[1]*X,bt=s+m[2]*U+g[2]*I+M[2]*X,St=x.c[R][1]<0?f:d,Ft=x.c[R][x.u]*w[x.u]+_[x.u],ye=x.c[R][x.v]*w[x.v]+_[x.v];this._v(h,Y,st,bt,y,b,C,(Ft+this.uvOx)/u,(ye+this.uvOy)/u,c[0]*St,c[1]*St,c[2]*St,St)}h.idx.push(L,L+1,L+2,L,L+2,L+3)}}cyl(t,e,n,s,o,r=8,a=Qr,l=2,h=1,c=1){const f=this.batch(t);let d=n[0]-e[0],u=n[1]-e[1],p=n[2]-e[2];const v=Math.hypot(d,u,p)||1e-6;d/=v,u/=v,p/=v;let m,g,M;if(Math.abs(u)>.99)m=1,g=0,M=0;else{m=-p,g=0,M=d;const y=Math.hypot(m,M);m/=y,M/=y}const T=u*M-p*g,E=p*m-d*M,A=d*g-u*m,w=t.userData.tile||1,_=(s-o)/v,S=f.n;for(let y=0;y<=r;y++){const b=y/r*Math.PI*2,C=Math.cos(b),L=Math.sin(b),R=m*C+T*L,U=g*C+E*L,I=M*C+A*L;let X=R+d*_,Y=U+u*_,st=I+p*_;const bt=Math.hypot(X,Y,st);X/=bt,Y/=bt,st/=bt;const St=y/r*Math.max(1,Math.round(Math.PI*2*Math.max(s,o)/w));this._v(f,e[0]+R*s,e[1]+U*s,e[2]+I*s,X,Y,st,St,0,a[0]*h,a[1]*h,a[2]*h,h),this._v(f,n[0]+R*o,n[1]+U*o,n[2]+I*o,X,Y,st,St,v/w,a[0]*c,a[1]*c,a[2]*c,c)}for(let y=0;y<r;y++){const b=S+y*2;f.idx.push(b,b+2,b+1,b+1,b+2,b+3)}const x=(y,b,C,L)=>{if(b<1e-4)return;const R=this._v(f,y[0],y[1],y[2],d*C,u*C,p*C,.5,.5,a[0]*L,a[1]*L,a[2]*L,L);for(let U=0;U<=r;U++){const I=U/r*Math.PI*2,X=Math.cos(I),Y=Math.sin(I);this._v(f,y[0]+(m*X+T*Y)*b,y[1]+(g*X+E*Y)*b,y[2]+(M*X+A*Y)*b,d*C,u*C,p*C,.5+X*.5,.5+Y*.5,a[0]*L,a[1]*L,a[2]*L,L)}for(let U=0;U<r;U++)C>0?f.idx.push(R,R+1+U,R+2+U):f.idx.push(R,R+2+U,R+1+U)};l&1&&x(e,s,-1,h),l&2&&x(n,o,1,c)}blob(t,e,n,s,o,r,a,l=Qr,h){const c=this.batch(t),f=h&&h.seg||8,d=h&&h.rings||5,u=h&&h.noise||0,p=h&&h.seed||1,v=h&&h.top||l,m=h&&h.bottomAo||.6,g=c.n;for(let M=0;M<=d;M++){const T=M/d,E=T*Math.PI,A=Math.sin(E),w=Math.cos(E);for(let _=0;_<=f;_++){const S=_%f/f,x=S*Math.PI*2;let y=1;if(u){const I=Math.sin(_%f*12.9898+M*78.233+p*37.719)*43758.5453;y=1+(I-Math.floor(I)-.5)*2*u}(M===0||M===d)&&(y=1);const b=A*Math.cos(x),C=w,L=A*Math.sin(x),R=(w+1)/2,U=m+(1-m)*R;this._v(c,e+b*o*y,n+C*r*y,s+L*a*y,b,C,L,S,T,(l[0]+(v[0]-l[0])*R)*U,(l[1]+(v[1]-l[1])*R)*U,(l[2]+(v[2]-l[2])*R)*U,1)}}for(let M=0;M<d;M++)for(let T=0;T<f;T++){const E=g+M*(f+1)+T,A=E+f+1;c.idx.push(E,E+1,A,E+1,A+1,A)}}cbox(t,e,n,s,o,r,a,l,h){if(!this.collide)return null;const c=this._localQuat(l);return Jr.set(0,this.yaw,0,"YXZ"),eh.setFromEuler(Jr),c&&eh.multiply(c),this.world.addBox({x:this.wx(t,n),y:this.fy+e,z:this.wz(t,n)},{x:s/2,y:o/2,z:r/2},eh,{kind:a,...h||{}})}ccap(t,e,n,s,o,r){return this.collide?this.world.addCapsule({x:this.wx(t[0],t[2]),y:this.fy+t[1],z:this.wz(t[0],t[2])},{x:this.wx(e[0],e[2]),y:this.fy+e[1],z:this.wz(e[0],e[2])},n,s,{kind:o,...r||{}}):null}ccyl(t,e,n,s,o,r,a){const l=o*Math.cos(Math.PI/8),h=o*Math.sin(Math.PI/8);for(let c=0;c<4;c++)this.cbox(t,(n+s)/2,e,l*2,s-n,h*2,r,{yaw:c*Math.PI/4},a)}sbox(t,e,n,s,o,r,a,l,h,c){return this.box(t,e,n,s,o,r,a,h),this.cbox(e,n,s,o,r,a,l,h,c)}scyl(t,e,n,s,o,r,a,l,h=2,c){return this.cyl(t,e,n,s,o,r,a,h),this.ccap(e,n,s,o,l,c)}build(t){let e=0;for(const[n,s]of this.batches){if(!s.n)continue;const o=new bn;o.setAttribute("position",new Ce(s.pos,3)),o.setAttribute("normal",new Ce(s.nor,3)),o.setAttribute("uv",new Ce(s.uv,2)),o.setAttribute("color",new Ce(s.col,4)),o.setIndex(s.n>65535?new Du(s.idx,1):new Lu(s.idx,1)),o.computeBoundingSphere(),o.computeBoundingBox();const r=new Mn(o,s.mat);r.name=n,r.castShadow=!!s.mat.userData.cast,r.receiveShadow=s.mat.userData.receive!==!1,r.matrixAutoUpdate=!1,s.mat.userData.order&&(r.renderOrder=s.mat.userData.order),t.add(r),e+=s.idx.length/3}return this.batches.clear(),e}}function un(i,t=i){const e=document.createElement("canvas");return e.width=i,e.height=t,e}const is=(i,t,e,n=1)=>`rgba(${Math.max(0,Math.min(255,i))|0},${Math.max(0,Math.min(255,t))|0},${Math.max(0,Math.min(255,e))|0},${n})`,Mi=(i,t=1)=>is(255*i,255*i,255*i,t),ma=(i,t,e,n,s=1)=>is(255*i*t,255*i*e,255*i*n,s);function gm(i,t,e,n){const s=Math.floor(i),o=Math.floor(t);let r=i-s,a=t-o;r=r*r*(3-2*r),a=a*a*(3-2*a);const l=u=>(u%e+e)%e,h=wi(l(s)+n*131,l(o)),c=wi(l(s+1)+n*131,l(o)),f=wi(l(s)+n*131,l(o+1)),d=wi(l(s+1)+n*131,l(o+1));return h+(c-h)*r+(f-h)*a+(h-c-f+d)*r*a}function wa(i,t,e,n,s=4){let o=0,r=.5,a=e;for(let l=0;l<s;l++)o+=r*gm(i*a,t*a,a,n+l),a*=2,r*=.5;return o}function Rn(i,t={}){const e=new em(i);return e.wrapS=e.wrapT=t.clamp?Ps:fl,e.colorSpace=t.data?co:ti,e.anisotropy=t.aniso||4,e}function Mr(i,t=2,e=4){const n=i.width,s=i.height,o=i.getContext("2d").getImageData(0,0,n,s).data,r=un(n,s),a=r.getContext("2d"),l=a.createImageData(n,s),h=l.data,c=(f,d)=>o[((d+s)%s*n+(f+n)%n)*4]/255;for(let f=0;f<s;f++)for(let d=0;d<n;d++){const u=(c(d+1,f)-c(d-1,f))*t,p=(c(d,f+1)-c(d,f-1))*t,v=1/Math.hypot(u,p,1),m=(f*n+d)*4;h[m]=(-u*v*.5+.5)*255,h[m+1]=(p*v*.5+.5)*255,h[m+2]=(v*.5+.5)*255,h[m+3]=255}return a.putImageData(l,0,0),Rn(r,{data:!0,aniso:e})}function tM(i,t,e){const n=i.getImageData(0,0,t,t),s=n.data;for(let o=0,r=0;o<t;o++)for(let a=0;a<t;a++,r+=4)e(s,r,a,o);i.putImageData(n,0,0)}function Wo(i,t,e,n,s=0){const o=on(n);tM(i,t,(r,a,l,h)=>{let c=1+(o()-.5)*e;s&&(c*=.9+.2*wa(l/t,h/t,s,n,3)),r[a]*=c,r[a+1]*=c,r[a+2]*=c})}function bl(i,t,e,n,s){for(let o=-1;o<=1;o++)for(let r=-1;r<=1;r++){const a=t+o*i,l=e+r*i;a>-n&&a<i+n&&l>-n&&l<i+n&&s(a,l)}}function eM(i=1){const e=un(512),n=e.getContext("2d"),s=un(512),o=s.getContext("2d");o.fillStyle=Mi(.18),o.fillRect(0,0,512,512);const r=24,a=8,l=512/a,h=512/r,c=2.3;for(let f=0;f<r;f++)for(let d=-1;d<=a;d++){const u=f%2?.5:0,p=(d+u)*l,v=f*h,m=(d%a+a)%a,g=wi(m+i*17,f),M=wi(m+91,f+i*5),T=wi(m*3+7,f*5+i);let E=.6+g*.3;M>.9&&(E*=.72),M<.07&&(E=.97),n.fillStyle=ma(E,1,.94+T*.1,.9+T*.16),n.beginPath(),n.roundRect(p+c/2,v+c/2,l-c,h-c,2.2),n.fill(),o.fillStyle=Mi(.72+T*.24),o.beginPath(),o.roundRect(p+c/2+.6,v+c/2+.6,l-c-1.2,h-c-1.2,2.4),o.fill()}return Wo(n,512,.16,i+5,4),Wo(o,512,.2,i+9),{map:Rn(e,{aniso:8}),normalMap:Mr(s,1.6,8),tile:2}}function nM(i=2){const e=un(512),n=e.getContext("2d"),s=un(512),o=s.getContext("2d");o.fillStyle=Mi(.15),o.fillRect(0,0,512,512);const r=on(i),a=[70,58,76,52,70,58,76,52];let l=0;for(let h=0;h<a.length;h++){const c=[];let f=0;for(;f<512;){const m=60+r()*110;c.push(m),f+=m}const d=512/f;let u=-r()*40;const p=u,v=c.map(()=>[.76+r()*.2,.97+r()*.05,.93+r()*.08,r()]);for(let m=0;m<2;m++){u=p+m*512;for(let g=0;g<c.length;g++){const M=c[g]*d,T=v[g];n.fillStyle=ma(T[0],1,T[1],T[2]),n.beginPath(),n.roundRect(u+2,l+2,M-4,a[h]-4,5),n.fill(),o.fillStyle=Mi(.7+T[3]*.25),o.beginPath(),o.roundRect(u+3,l+3,M-6,a[h]-6,6),o.fill(),u+=M}}l+=a[h]}return Wo(n,512,.2,i+3,8),Wo(o,512,.35,i+4,16),{map:Rn(e,{aniso:8}),normalMap:Mr(s,1.8,8),tile:2}}function iM(i=3){const e=un(256),n=e.getContext("2d"),s=un(256),o=s.getContext("2d"),r=n.createImageData(256,256),a=r.data,l=o.createImageData(256,256),h=l.data,c=on(i);for(let f=0,d=0;f<256;f++)for(let u=0;u<256;u++,d+=4){const p=wa(u/256,f/256,3,i,4),v=wa(u/256,f/256,32,i+7,2),m=c(),g=.86+(p-.47)*.22+(v-.47)*.1+(m-.5)*.04;a[d]=255*g,a[d+1]=255*g*.99,a[d+2]=255*g*.97,a[d+3]=255;const M=.5+(v-.47)*.9+(m-.5)*.25;h[d]=h[d+1]=h[d+2]=255*M,h[d+3]=255}return n.putImageData(r,0,0),o.putImageData(l,0,0),{map:Rn(e,{aniso:4}),normalMap:Mr(s,1.1),tile:2.4}}function sM(i=4){const e=un(512),n=e.getContext("2d"),s=un(512),o=s.getContext("2d");n.fillStyle=Mi(.3),n.fillRect(0,0,512,512),o.fillStyle=Mi(.2),o.fillRect(0,0,512,512);const r=8,a=8,l=512/a,h=512/r;for(let c=0;c<r;c++)for(let f=-1;f<=a;f++){const d=(f+(c%2?.5:0))*l,u=c*h,p=(f%a+a)%a,v=wi(p+i*3,c),m=wi(p*7+1,c+i);let g=.62+v*.3;m>.9&&(g*=.75);const M=n.createLinearGradient(0,u,0,u+h);M.addColorStop(0,ma(g*.55,1,.97,.94)),M.addColorStop(.25,ma(g*.9,1,.97+m*.05,.93+m*.1)),M.addColorStop(1,ma(Math.min(1,g*1.1),1,.97+m*.05,.93+m*.1)),n.fillStyle=M,n.beginPath(),n.roundRect(d+1.2,u,l-2.4,h-1,[0,0,9,9]),n.fill();const T=o.createLinearGradient(0,u,0,u+h);T.addColorStop(0,Mi(.25)),T.addColorStop(1,Mi(.95)),o.fillStyle=T,o.beginPath(),o.roundRect(d+1.5,u,l-3,h-1.5,[0,0,9,9]),o.fill()}return Wo(n,512,.14,i+2,6),{map:Rn(e,{aniso:8}),normalMap:Mr(s,1.5,8),tile:2}}function oM(i=5){const e=un(512),n=e.getContext("2d"),s=un(512),o=s.getContext("2d"),r=n.createImageData(512,512),a=r.data,l=o.createImageData(512,512),h=l.data,c=on(i),f=12,d=512/f,u=[];for(let p=0;p<f;p++)u.push([.78+c()*.2,c()*50,.95+c()*.08]);for(let p=0,v=0;p<512;p++)for(let m=0;m<512;m++,v+=4){const g=Math.floor(m/d),M=(m-g*d)/d,T=u[g],E=wa((m+T[1])/512*6,p/512,6,i+g,3),A=gm(m*.9+T[1],p*.06,512,i);let w=T[0]*(.84+(E-.5)*.3+(A-.5)*.14);const _=Math.min(M,1-M)*d;let S=.8+(A-.5)*.3;_<1.6?(w*=.38,S=.1):_<3.2&&(w*=.8,S=.55),a[v]=255*w,a[v+1]=255*w*T[2]*.97,a[v+2]=255*w*.93,a[v+3]=255,h[v]=h[v+1]=h[v+2]=255*Math.max(0,Math.min(1,S)),h[v+3]=255}n.putImageData(r,0,0),o.putImageData(l,0,0);for(let p=0;p<9;p++){const v=c()*512,m=c()*512;bl(512,v,m,20,(g,M)=>{n.fillStyle="rgba(60,40,25,0.55)",n.beginPath(),n.ellipse(g,M,3+c()*2,6+c()*4,0,0,7),n.fill()})}return{map:Rn(e,{aniso:8}),normalMap:Mr(s,1.2,8),tile:2}}function rM(i=6){const e=un(512),n=e.getContext("2d"),s=un(512),o=s.getContext("2d");n.fillStyle=Mi(.42),n.fillRect(0,0,512,512),o.fillStyle=Mi(.2),o.fillRect(0,0,512,512);const r=4,a=3,l=512/a,h=512/r;for(let f=0;f<r;f++)for(let d=-1;d<=a;d++){const u=(d+(f%2?.5:0))*l,p=f*h,v=(d%a+a)%a,m=wi(v+i,f*3),g=wi(v*5+2,f+i*3),M=.74+m*.2;n.fillStyle=ma(M,1,.985+g*.02,.95+g*.06),n.beginPath(),n.roundRect(u+1.6,p+1.6,l-3.2,h-3.2,3),n.fill(),n.strokeStyle=Mi(1,.12),n.lineWidth=2,n.strokeRect(u+4,p+4,l-8,h-8),o.fillStyle=Mi(.8+g*.15),o.beginPath(),o.roundRect(u+2.4,p+2.4,l-4.8,h-4.8,4),o.fill()}const c=on(i);for(let f=0;f<26;f++){const d=c()*512,u=c()*512,p=2+c()*5;bl(512,d,u,10,(v,m)=>{n.fillStyle=Mi(c()<.5?.25:.95,.16),n.beginPath(),n.arc(v,m,p,0,7),n.fill()})}return Wo(n,512,.2,i+1,8),Wo(o,512,.12,i+2),{map:Rn(e,{aniso:8}),normalMap:Mr(s,1.2,8),tile:2}}function aM(i=7){const e=un(512),n=e.getContext("2d"),s=un(512),o=s.getContext("2d"),r=n.createImageData(512,512),a=r.data,l=o.createImageData(512,512),h=l.data,c=on(i);for(let f=0,d=0;f<512;f++)for(let u=0;u<512;u++,d+=4){const p=wa(u/512,f/512,4,i,4),v=c();let m=.66+(p-.47)*.3+(v-.5)*.2;v>.965&&(m+=.22),v<.03&&(m-=.18),a[d]=255*m,a[d+1]=255*m,a[d+2]=255*m*1.02,a[d+3]=255;const g=.5+(v-.5)*.8;h[d]=h[d+1]=h[d+2]=255*g,h[d+3]=255}n.putImageData(r,0,0),o.putImageData(l,0,0),n.lineCap="round";for(let f=0;f<7;f++){let d=c()*512,u=c()*512,p=c()*6.28;const v=8+(c()*10|0);n.strokeStyle=Mi(.12,.5),n.lineWidth=1+c()*1.4,n.beginPath(),n.moveTo(d,u);for(let m=0;m<v;m++)p+=(c()-.5)*1.2,d+=Math.cos(p)*14,u+=Math.sin(p)*14,n.lineTo(d,u);n.stroke()}return{map:Rn(e,{aniso:8}),normalMap:Mr(s,.9,4),tile:4}}function lM(i=8){const e=un(512),n=e.getContext("2d"),s=on(i);n.fillStyle=is(118,124,112),n.fillRect(0,0,512,512),n.lineCap="round";for(let o=0;o<9e3;o++){const r=s()*512,a=s()*512,l=-1.57+(s()-.5)*2.2,h=5+s()*12,c=80+s()*110,f=.8+s()*1.2,d=s(),u=is(c*(.95+d*.25),c*1.06,c*(.78-d*.15),.75);bl(512,r,a,20,(p,v)=>{n.strokeStyle=u,n.lineWidth=f,n.beginPath(),n.moveTo(p,v),n.quadraticCurveTo(p+Math.cos(l)*h*.5+2,v+Math.sin(l)*h*.5,p+Math.cos(l+.3)*h,v+Math.sin(l+.3)*h),n.stroke()})}return Rn(e,{data:!0,aniso:8})}function cM(i=18){const e=un(256),n=e.getContext("2d"),s=on(i);n.fillStyle=is(170,176,150),n.fillRect(0,0,256,256),n.lineCap="round";for(let o=0;o<3200;o++){const r=s()*256,a=s()*256,l=-1.57+(s()-.5)*2.4,h=4+s()*9,c=130+s()*120,f=s(),d=is(c*(.92+f*.2),c*1.02,c*(.74-f*.1),.8);bl(256,r,a,16,(u,p)=>{n.strokeStyle=d,n.lineWidth=1,n.beginPath(),n.moveTo(u,p),n.lineTo(u+Math.cos(l)*h,p+Math.sin(l)*h),n.stroke()})}return{map:Rn(e,{aniso:8}),tile:1.6}}function hM(i=9){const e=un(512),n=e.getContext("2d"),s=on(i);n.fillStyle=is(122,120,116),n.fillRect(0,0,512,512);for(let o=0;o<5200;o++){const r=s()*512,a=s()*512,l=1.2+s()*3.4,h=70+s()*130,c=s()*3,f=is(h*1.03,h,h*.94,.85);bl(512,r,a,8,(d,u)=>{n.fillStyle=f,n.beginPath(),n.ellipse(d,u,l,l*(.6+s()*.4),c,0,7),n.fill()})}return Rn(e,{data:!0,aniso:8})}function uM(){const t=un(64),e=t.getContext("2d");return e.clearRect(0,0,64,64),e.fillStyle="#fff",e.fillRect(0,0,64/2,64),{map:Rn(t,{aniso:4}),tile:.56}}function fM(i=11){const e=un(128),n=e.getContext("2d"),s=on(i),o=n.createImageData(128,128),r=o.data;for(let a=0,l=0;a<128;a++)for(let h=0;h<128;h++,l+=4){const c=wa(h/128,a/128,6,i,3),f=s(),d=235+(f-.5)*24;let u=.94;c<.36&&(u=.25+c),f>.93&&(u*=.5),r[l]=d,r[l+1]=d,r[l+2]=d*.97,r[l+3]=255*u}return n.putImageData(o,0,0),{map:Rn(e,{aniso:8}),tile:1.5}}function dM(i=12){const e=un(128),n=e.getContext("2d"),s=on(i);n.clearRect(0,0,128,128);for(let r=0;r<34;r++){const a=64+(s()-.5)*60,l=a+(s()-.5)*80,h=50+s()*74,c=2.6+s()*3,f=150+s()*90,d=n.createLinearGradient(0,128,0,128-h);d.addColorStop(0,is(f*.5,f*.66,f*.36)),d.addColorStop(1,is(f*.86,f,f*.56)),n.fillStyle=d,n.beginPath(),n.moveTo(a-c,128),n.quadraticCurveTo((a+l)/2-c*.4,128-h*.6,l,128-h),n.quadraticCurveTo((a+l)/2+c*.6,128-h*.5,a+c,128),n.fill()}return Rn(e,{clamp:!0,aniso:2})}function pM(){const t=un(64),e=t.getContext("2d");e.clearRect(0,0,64,64),e.fillStyle="#fff",e.beginPath();const n=[[32,3],[40,14],[54,12],[50,26],[61,34],[47,40],[48,54],[36,48],[32,61],[28,48],[16,54],[17,40],[3,34],[14,26],[10,12],[24,14]];e.moveTo(n[0][0],n[0][1]);for(const s of n)e.lineTo(s[0],s[1]);return e.closePath(),e.fill(),e.strokeStyle="rgba(120,90,60,0.6)",e.lineWidth=2,e.beginPath(),e.moveTo(32,8),e.lineTo(32,60),e.moveTo(32,30),e.lineTo(14,18),e.moveTo(32,30),e.lineTo(50,18),e.moveTo(32,42),e.lineTo(18,44),e.moveTo(32,42),e.lineTo(46,44),e.stroke(),Rn(t,{clamp:!0,aniso:2})}function mM(){const t=un(64,128),e=t.getContext("2d");e.clearRect(0,0,64,128),e.strokeStyle="#5d8a3c",e.lineWidth=4,e.lineCap="round",e.beginPath(),e.moveTo(32,128),e.quadraticCurveTo(28,90,32,44),e.stroke(),e.fillStyle="#6c9a45",e.beginPath(),e.ellipse(22,98,12,5,-.6,0,7),e.fill(),e.beginPath(),e.ellipse(43,84,12,5,.6,0,7),e.fill(),e.fillStyle="#fff";for(let n=0;n<7;n++){const s=n/7*6.283;e.beginPath(),e.ellipse(32+Math.cos(s)*14,32+Math.sin(s)*14,12,7.5,s,0,7),e.fill()}return e.fillStyle="#ffd24a",e.beginPath(),e.arc(32,32,8,0,7),e.fill(),Rn(t,{clamp:!0,aniso:2})}const Fi=1024,cs=(i,t,e,n)=>[(i+.6)/Fi,1-(t+n-.6)/Fi,(i+e-.6)/Fi,1-(t+.6)/Fi],Cn={win:Array.from({length:8},(i,t)=>cs(t*128,0,128,256)),winLit:[2,3,5,7],winDark:[0,1,4,6],door:Array.from({length:4},(i,t)=>cs(t*128,256,128,256)),shop:[cs(512,256,256,256),cs(768,256,256,256)],sign:Array.from({length:8},(i,t)=>cs(t%2*512,512+(t>>1)*64,512,64)),stained:cs(256,768,128,256),clock:cs(384,768,256,256),round:cs(640,768,128,128),fan:cs(768,768,128,128),manhole:cs(896,768,128,128),poster:cs(640,896,128,128)},gM=["BAKERY","BOOKS","THE ACORN CAFE","FLOWERS","GROCER","CYCLES","TEA ROOM","HARDWARE"];function xM(i=21){const t=un(Fi),e=t.getContext("2d"),n=un(Fi),s=n.getContext("2d"),o=un(Fi),r=o.getContext("2d"),a=on(i);e.fillStyle="#777",e.fillRect(0,0,Fi,Fi),s.fillStyle="#000",s.fillRect(0,0,Fi,Fi),r.fillStyle=Mi(.72),r.fillRect(0,0,Fi,Fi);const l=(g,M,T,E,A)=>{r.fillStyle=is(0,255*A,0),r.fillRect(g,M,T,E)},h=["#efe9dc","#efe9dc","#f3ecdf","#e9e2d2","#2d3a34","#f1ebe0","#3a3230","#efe8da"],c=["#d9cdb8","#b9c4c9","#c98f6a","#e7dcc6","#8fa39a","#d6b98a","#b3a59a","#caa07e"];for(let g=0;g<8;g++){const M=g*128,T=0,E=128,A=256,w=Cn.winLit.includes(g),_=10;e.fillStyle=h[g],e.fillRect(M,T,E,A),l(M,T,E,A,.6);const S=M+_,x=T+_,y=E-2*_,b=A-2*_,C=(R,U)=>{if(R.save(),R.beginPath(),R.rect(S,x,y,b),R.clip(),w){const I=R.createRadialGradient(S+y*.5,x+b*.55,8,S+y*.5,x+b*.5,b*.75);I.addColorStop(0,U?"#ffe9b0":"#ffe2a0"),I.addColorStop(.5,U?"#f7b458":"#f3b25c"),I.addColorStop(1,U?"#b8662a":"#c8742f"),R.fillStyle=I,R.fillRect(S,x,y,b),R.fillStyle=U?"rgba(70,30,10,0.75)":"rgba(80,40,20,0.8)",g===3&&(R.beginPath(),R.ellipse(S+y*.3,x+b*.82,16,22,0,0,7),R.fill(),R.fillRect(S+y*.3-9,x+b*.88,18,30)),g===7&&(R.beginPath(),R.moveTo(S+y*.5,x+b*.34),R.lineTo(S+y*.74,x+b*.5),R.lineTo(S+y*.26,x+b*.5),R.fill(),R.fillRect(S+y*.48,x+b*.5,4,b*.5)),g===5&&(R.fillRect(S,x+b*.7,y,6),R.fillRect(S+y*.2,x+b*.52,14,b*.2),R.fillRect(S+y*.6,x+b*.58,22,b*.13)),R.fillStyle=U?"rgba(190,90,40,0.75)":c[g],R.globalAlpha=U?1:.9,R.beginPath(),R.moveTo(S,x),R.lineTo(S+y*.3,x),R.quadraticCurveTo(S+y*.26,x+b*.6,S+y*.1,x+b),R.lineTo(S,x+b),R.fill(),R.beginPath(),R.moveTo(S+y,x),R.lineTo(S+y*.7,x),R.quadraticCurveTo(S+y*.74,x+b*.6,S+y*.9,x+b),R.lineTo(S+y,x+b),R.fill(),R.globalAlpha=1}else if(!U){const I=R.createLinearGradient(0,x,0,x+b);if(I.addColorStop(0,"#5f7f9a"),I.addColorStop(.45,"#2f4458"),I.addColorStop(1,"#1d2a36"),R.fillStyle=I,R.fillRect(S,x,y,b),R.fillStyle="rgba(255,236,205,0.16)",R.beginPath(),R.moveTo(S,x+b*.5),R.lineTo(S+y,x+b*.12),R.lineTo(S+y,x+b*.3),R.lineTo(S,x+b*.72),R.fill(),R.fillStyle="rgba(255,236,205,0.09)",R.beginPath(),R.moveTo(S,x+b*.8),R.lineTo(S+y,x+b*.42),R.lineTo(S+y,x+b*.48),R.lineTo(S,x+b*.86),R.fill(),R.fillStyle=c[g],R.globalAlpha=.85,g===1||g===6){const X=g===1?b*.42:b*.68;R.fillRect(S,x,y,X),R.globalAlpha=.25,R.fillStyle="#000";for(let Y=0;Y<X;Y+=7)R.fillRect(S,x+Y,y,1.5)}else g===0?(R.beginPath(),R.moveTo(S,x),R.lineTo(S+y*.36,x),R.quadraticCurveTo(S+y*.3,x+b*.5,S+y*.08,x+b*.72),R.lineTo(S,x+b*.72),R.fill(),R.beginPath(),R.moveTo(S+y,x),R.lineTo(S+y*.64,x),R.quadraticCurveTo(S+y*.7,x+b*.5,S+y*.92,x+b*.72),R.lineTo(S+y,x+b*.72),R.fill()):(R.globalAlpha=.5,R.fillRect(S,x,y*.22,b),R.fillRect(S+y*.78,x,y*.22,b));R.globalAlpha=1}if(U)w&&(R.fillStyle="rgba(0,0,0,0.22)",R.fillRect(S,x,y,b));else{const I=R.createLinearGradient(0,x,0,x+26);I.addColorStop(0,"rgba(10,10,20,0.6)"),I.addColorStop(1,"rgba(10,10,20,0)"),R.fillStyle=I,R.fillRect(S,x,y,26);const X=R.createLinearGradient(S,0,S+14,0);X.addColorStop(0,"rgba(10,10,20,0.4)"),X.addColorStop(1,"rgba(10,10,20,0)"),R.fillStyle=X,R.fillRect(S,x,14,b)}R.restore()};C(e,!1),C(s,!0),l(S,x,y,b,w?.3:.07);const L=(R,U,I,X)=>{e.fillStyle=h[g],e.fillRect(R,U,I,X),s.fillStyle="#000",s.fillRect(R,U,I,X),l(R,U,I,X,.6),e.fillStyle="rgba(0,0,0,0.25)",e.fillRect(R,U+X,I,2)};L(S,T+A*.5-4,y,8),g%2===0&&L(M+E/2-3,x,6,b),(g===3||g===5)&&(L(M+E*.36,x,4,b*.47),L(M+E*.64-4,x,4,b*.47)),e.strokeStyle="rgba(0,0,0,0.28)",e.lineWidth=2,e.strokeRect(S-1,x-1,y+2,b+2)}const f=["#8f2f2b","#27405a","#2f5a42","#3a3a3e"];for(let g=0;g<4;g++){const M=g*128,T=256,E=128,A=256;e.fillStyle="#ece5d6",e.fillRect(M,T,E,A),l(M,T,E,A,.55);const w=g===0||g===2,_=(C,L)=>{C.fillStyle=w?L?"#e8a550":"#f6c170":L?"#000":"#31465a",C.fillRect(M+12,T+10,E-24,40),(!L||w)&&(C.fillStyle=L?"#000":"#ece5d6",C.fillRect(M+E/2-2,T+10,4,40),C.fillRect(M+E*.3,T+10,3,40),C.fillRect(M+E*.7,T+10,3,40))};_(e,!1),_(s,!0),l(M+12,T+10,E-24,40,.1);const S=M+12,x=T+58,y=E-24,b=A-58;if(e.fillStyle=f[g],e.fillRect(S,x,y,b),l(S,x,y,b,.35),g===3){const C=(L,R)=>{L.fillStyle=R?"#c98a44":"#e9c17a",L.fillRect(S+12,x+12,y-24,b*.62),R||(L.fillStyle="rgba(40,30,20,0.5)",L.fillRect(S+12,x+b*.45,y-24,b*.2))};C(e,!1),C(s,!0),l(S+12,x+12,y-24,b*.62,.1)}else{const C=(L,R,U,I)=>{e.fillStyle="rgba(0,0,0,0.28)",e.fillRect(L,R,U,I),e.fillStyle=f[g],e.fillRect(L+3,R+4,U-5,I-6),e.fillStyle="rgba(255,255,255,0.12)",e.fillRect(L+3,R+I-4,U-5,2)};C(S+10,x+10,y/2-15,70),C(S+y/2+5,x+10,y/2-15,70),C(S+10,x+90,y/2-15,50),C(S+y/2+5,x+90,y/2-15,50),C(S+10,x+150,y/2-15,40),C(S+y/2+5,x+150,y/2-15,40),e.fillStyle="#c9a24a",e.fillRect(S+y/2-16,x+84,32,5)}e.fillStyle="#d8b455",e.beginPath(),e.arc(S+y-14,x+b*.52,5,0,7),e.fill(),e.strokeStyle="rgba(0,0,0,0.35)",e.lineWidth=2,e.strokeRect(S,x,y,b)}for(let g=0;g<2;g++){const M=512+g*256,T=256,E=256,A=256;e.fillStyle=g?"#2c3a36":"#3a2f2a",e.fillRect(M,T,E,A),l(M,T,E,A,.5);const w=M+9,_=T+9,S=E-18,x=A-30,y=(b,C)=>{const L=b.createLinearGradient(0,_,0,_+x);g===0?(L.addColorStop(0,C?"#b56a2a":"#d98a40"),L.addColorStop(.5,C?"#f0b660":"#ffd590"),L.addColorStop(1,C?"#8a4a20":"#a8612c")):(L.addColorStop(0,C?"#7a8a80":"#9db0a4"),L.addColorStop(.5,C?"#d8d6b8":"#f1ecd2"),L.addColorStop(1,C?"#5a6258":"#74806f")),b.fillStyle=L,b.fillRect(w,_,S,x);const R=on(77+g);for(let U=0;U<3;U++){const I=_+x*(.42+U*.2);b.fillStyle=C?"rgba(40,20,10,0.6)":"rgba(60,35,20,0.85)",b.fillRect(w,I,S,5);for(let X=0;X<9;X++){const Y=w+8+X*(S-16)/9,st=12+R()*12,bt=10+R()*22,St=g===0?["#c98a3c","#e2b062","#a8652c","#f0d08a"]:["#b8443a","#3f6f8f","#e0b040","#5f8f5a","#e8e2d2"];b.fillStyle=St[R()*St.length|0],C&&(b.globalAlpha=.6),g===0?(b.beginPath(),b.ellipse(Y+st/2,I-bt*.35,st*.6,bt*.4,0,0,7),b.fill()):b.fillRect(Y,I-bt,st*.8,bt),b.globalAlpha=1}}if(C)b.fillStyle="rgba(0,0,0,0.25)",b.fillRect(w,_,S,x);else{b.fillStyle="rgba(255,240,215,0.13)",b.beginPath(),b.moveTo(w,_+x*.6),b.lineTo(w+S*.7,_),b.lineTo(w+S,_),b.lineTo(w,_+x*.95),b.fill();const U=b.createLinearGradient(0,_,0,_+30);U.addColorStop(0,"rgba(10,10,20,0.55)"),U.addColorStop(1,"rgba(10,10,20,0)"),b.fillStyle=U,b.fillRect(w,_,S,30)}};y(e,!1),y(s,!0),l(w,_,S,x,.08)}const d=["#2f4a3a","#7a2f2a","#27405a","#e6d8b8","#3a3230","#c9a24a","#5a3a4a","#2f3a4a"],u=["#f0e2b8","#f3e6c8","#f0d890","#5a2f2a","#e8c878","#2a2622","#f0dcc0","#e8e2d0"];for(let g=0;g<8;g++){const M=g%2*512,T=512+(g>>1)*64;e.fillStyle=d[g],e.fillRect(M,T,512,64),l(M,T,512,64,.45),e.strokeStyle=u[g],e.globalAlpha=.7,e.lineWidth=2,e.strokeRect(M+6,T+6,500,52),e.globalAlpha=1,e.fillStyle=u[g],e.font='bold 36px Georgia, "Times New Roman", serif',e.textAlign="center",e.textBaseline="middle";const E=gM[g];e.fillText(E.split("").join(" "),M+256,T+34,470)}{e.fillStyle="#6f756f",e.fillRect(0,768,256,256),l(0,768,256,256,.5);for(let T=0;T<256;T+=16)e.fillStyle="rgba(0,0,0,0.3)",e.fillRect(0,768+T,256,3),e.fillStyle="rgba(255,255,255,0.12)",e.fillRect(0,768+T+3,256,2);e.fillStyle="rgba(90,50,30,0.25)";for(let T=0;T<12;T++)e.fillRect(0+a()*250,918+a()*100,3+a()*4,20+a()*60)}{e.fillStyle="#8a8478",e.fillRect(256,768,128,256);const A=_=>{_.beginPath(),_.moveTo(270,1014),_.lineTo(270,864),_.quadraticCurveTo(272,798,256+128/2,778),_.quadraticCurveTo(368,798,370,864),_.lineTo(370,1014),_.closePath()},w=["#d94a3a","#e8a030","#3f7fbf","#4f9f6a","#f0d060","#8a4fa0","#e87850"];for(const[_,S]of[[e,0],[s,1]]){_.save(),A(_),_.clip();const x=on(5);for(let y=0;y<256;y+=22)for(let b=0;b<128;b+=19)_.fillStyle=w[x()*w.length|0],_.globalAlpha=S?.75:1,_.fillRect(256+b+(y/22|0)%2*9-9,768+y,18,21);_.globalAlpha=1,_.strokeStyle=S?"#000":"#2a2620",_.lineWidth=3,_.beginPath(),_.moveTo(256+128/2,768),_.lineTo(256+128/2,1024),_.stroke(),_.restore()}e.strokeStyle="#3a342c",e.lineWidth=4,A(e),e.stroke(),l(270,788,100,226,.15)}{e.fillStyle="#8a8478",e.fillRect(384,768,256,256);for(const[A,w]of[[e,0],[s,1]]){A.fillStyle=w?"#8a7a50":"#f3ead2",A.beginPath(),A.arc(512,896,112,0,7),A.fill(),A.strokeStyle=w?"#000":"#2a2620",A.lineWidth=9,A.beginPath(),A.arc(512,896,112,0,7),A.stroke(),A.lineWidth=3,A.beginPath(),A.arc(512,896,86,0,7),A.stroke();for(let S=0;S<12;S++){const x=S/12*6.283;A.lineWidth=S%3===0?9:5,A.beginPath(),A.moveTo(512+Math.sin(x)*90,896-Math.cos(x)*90),A.lineTo(512+Math.sin(x)*104,896-Math.cos(x)*104),A.stroke()}const _=(S,x,y)=>{A.lineWidth=y,A.lineCap="round",A.beginPath(),A.moveTo(512-Math.sin(S)*12,896+Math.cos(S)*12),A.lineTo(512+Math.sin(S)*x,896-Math.cos(S)*x),A.stroke()};_(4.7/12*6.283,56,10),_(42/60*6.283,84,6),A.fillStyle=w?"#000":"#2a2620",A.beginPath(),A.arc(512,896,9,0,7),A.fill()}}{e.fillStyle="#efe9dc",e.fillRect(640,768,128,128);for(const[A,w]of[[e,0],[s,1]])A.fillStyle=w?"#d9963f":"#f6c26a",A.beginPath(),A.arc(704,832,50,0,7),A.fill(),A.strokeStyle=w?"#000":"#efe9dc",A.lineWidth=6,A.beginPath(),A.moveTo(654,832),A.lineTo(754,832),A.moveTo(704,782),A.lineTo(704,882),A.stroke();e.strokeStyle="rgba(0,0,0,0.3)",e.lineWidth=2,e.beginPath(),e.arc(704,832,51,0,7),e.stroke(),l(654,782,100,100,.2)}{e.fillStyle="#c9cbc6",e.fillRect(768,768,128,128),l(768,768,128,128,.4),e.fillStyle="#26282a",e.beginPath(),e.arc(832,832,52,0,7),e.fill(),e.strokeStyle="#9a9c98",e.lineWidth=2;for(let A=10;A<52;A+=8)e.beginPath(),e.arc(832,832,A,0,7),e.stroke();for(let A=0;A<6;A++){const w=A*1.047;e.beginPath(),e.moveTo(832,832),e.lineTo(832+Math.cos(w)*52,832+Math.sin(w)*52),e.stroke()}e.fillStyle="#9a9c98",e.beginPath(),e.arc(832,832,8,0,7),e.fill()}{e.fillStyle="#56585c",e.fillRect(896,768,128,128),e.fillStyle="#3a3c40",e.beginPath(),e.arc(960,832,58,0,7),e.fill(),e.strokeStyle="#6a6c70",e.lineWidth=3;for(let A=-50;A<=50;A+=12)e.beginPath(),e.moveTo(960+A,788),e.lineTo(960+A,876),e.stroke(),e.beginPath(),e.moveTo(916,832+A),e.lineTo(1004,832+A),e.stroke();e.beginPath(),e.arc(960,832,56,0,7),e.stroke()}e.fillStyle="#e8dcc0",e.fillRect(640,896,128,128),e.fillStyle="#c9542a",e.fillRect(648,904,112,60),e.fillStyle="#f2b632",e.beginPath(),e.arc(704,940,22,0,7),e.fill(),e.fillStyle="#3a3230",e.font="bold 17px Georgia, serif",e.textAlign="center",e.fillText("AUTUMN FAIR",704,986),e.font="bold 12px Georgia, serif",e.fillText("IN THE PARK",704,1006),l(640,896,128,128,.7);{e.fillStyle="#b08a56",e.fillRect(768,896,128,128),e.strokeStyle="#6a4a2a",e.lineWidth=5,e.strokeRect(772,900,120,120);for(let T=1;T<4;T++)e.lineWidth=2,e.beginPath(),e.moveTo(768,896+T*32),e.lineTo(896,896+T*32),e.stroke();e.lineWidth=5,e.beginPath(),e.moveTo(772,900),e.lineTo(892,1020),e.stroke(),l(768,896,128,128,.8)}{e.fillStyle="#3c3e42",e.fillRect(896,896,128,128),e.fillStyle="#1c1d20";for(let T=10;T<120;T+=14)e.fillRect(908,896+T,104,7);e.strokeStyle="#5a5c60",e.lineWidth=4,e.strokeRect(900,900,120,120),l(896,896,128,128,.45)}const p=Rn(t,{clamp:!0,aniso:8}),v=Rn(n,{clamp:!0,aniso:4}),m=Rn(o,{clamp:!0,data:!0,aniso:4});return{map:p,emissiveMap:v,roughnessMap:m}}function vM(i=31){const e=un(256),n=e.getContext("2d"),s=un(256),o=s.getContext("2d"),r=on(i);n.fillStyle="#d6cfc4",n.fillRect(0,0,256,256),o.fillStyle="#000",o.fillRect(0,0,256,256);for(let a=0;a<4;a++){n.fillStyle="rgba(255,255,255,0.22)",n.fillRect(0,a*64,256,5),n.fillStyle="rgba(0,0,0,0.16)",n.fillRect(0,a*64+5,256,3);for(let l=0;l<4;l++){const h=r()<.14,c=l*64+19,f=a*64+16;n.fillStyle="#efe9de",n.fillRect(c-3,f-3,32,44);const d=n.createLinearGradient(0,f,0,f+38);h?(d.addColorStop(0,"#f2cf96"),d.addColorStop(1,"#d89a50")):(d.addColorStop(0,"#7f93a6"),d.addColorStop(1,"#4c5c6c")),n.fillStyle=d,n.fillRect(c,f,26,38),n.fillStyle="#efe9de",n.fillRect(c,f+18,26,2),n.fillRect(c+12,f,2,38),n.fillStyle="rgba(0,0,0,0.25)",n.fillRect(c-5,f+41,36,3),!h&&r()<.4&&(n.fillStyle="rgba(230,220,200,0.5)",n.fillRect(c,f,26,8+r()*12)),h&&(o.fillStyle="#7a4e22",o.fillRect(c,f,26,38))}}return Wo(n,256,.1,i+1,4),{map:Rn(e,{aniso:4}),emissiveMap:Rn(s,{aniso:2}),tile:12}}function yM(i=41){const e=un(256),n=e.getContext("2d"),s=on(i);n.clearRect(0,0,256,256),n.strokeStyle="#4a3b30",n.lineCap="round",n.lineWidth=11,n.beginPath(),n.moveTo(128,256),n.lineTo(127,150),n.stroke(),n.lineWidth=6;for(const[r,a]of[[80,110],[170,100],[128,80],[100,140],[160,140]])n.beginPath(),n.moveTo(127,170),n.quadraticCurveTo((127+r)/2,150,r,a),n.stroke();const o=[[128,92,62],[78,118,44],[178,112,46],[106,62,40],[156,58,40],[128,132,50]];for(let r=0;r<1500;r++){const a=o[s()*o.length|0],l=s()*6.283,h=Math.sqrt(s())*a[2],c=a[0]+Math.cos(l)*h,f=a[1]+Math.sin(l)*h*.9,d=.55+.45*Math.min(1,Math.max(0,(150-f)/120+(s()-.5)*.5)),u=255*d;n.fillStyle=is(u,u*(.93+s()*.07),u*(.86+s()*.1)),n.beginPath(),n.ellipse(c,f,4+s()*5,3+s()*3.5,s()*3,0,7),n.fill()}return Rn(e,{clamp:!0,aniso:4})}function bs(i,t,e,n={}){const s=new Gn({name:i,map:t.map,normalMap:t.normalMap||null,vertexColors:!0,roughness:n.roughness??.9,metalness:0,side:n.side||_o});t.normalMap&&s.normalScale.set(n.normal??1,n.normal??1);const o={value:new ge(e)};return s.onBeforeCompile=r=>{r.uniforms.uSecond=o,r.fragmentShader=r.fragmentShader.replace("void main() {",`uniform vec3 uSecond;
void main() {`).replace("#include <color_fragment>",`#include <color_fragment>
        #ifdef USE_MAP
          diffuseColor.rgb = mix(uSecond * vColor.a, diffuseColor.rgb, sampledDiffuseColor.a);
        #endif`)},s.customProgramCacheKey=()=>"tinted",s.userData={tile:t.tile||1,cast:n.cast!==!1,...n.user||{}},n.offset&&(s.polygonOffset=!0,s.polygonOffsetFactor=-n.offset,s.polygonOffsetUnits=-n.offset*2),s}function _M(i=1){const t=eM(1),e=nM(2),n=iM(3),s=sM(4),o=oM(5),r=rM(6),a=aM(7),l=uM(),h=fM(),c=cM(),f=xM(),d=vM(),u={};return u.brick=bs("brick",t,13616306,{roughness:.92,normal:.9}),u.stone=bs("stone",e,10722446,{roughness:.95,normal:1}),u.stucco=bs("stucco",n,16777215,{roughness:.95,normal:.6}),u.tiles=bs("tiles",s,2236962,{roughness:.8,normal:1}),u.wood=bs("wood",o,0,{roughness:.85,normal:.8}),u.paving=bs("paving",r,0,{roughness:.92,normal:.7,cast:!1}),u.asphalt=bs("asphalt",a,0,{roughness:.88,normal:.6,cast:!1}),u.roofing=bs("roofing",a,0,{roughness:.95,normal:.5,cast:!1}),u.roofing.userData.tile=3,u.cloth=bs("cloth",l,15985368,{roughness:.9,side:ni}),u.grassTile=bs("grassTile",c,0,{roughness:1,cast:!1,offset:1}),u.plain=new Gn({name:"plain",vertexColors:!0,roughness:.78,metalness:0}),u.plain.userData={cast:!0},u.gloss=new Gn({name:"gloss",vertexColors:!0,roughness:.28,metalness:.25,envMapIntensity:1.3}),u.gloss.userData={cast:!0},u.metal=new Gn({name:"metal",vertexColors:!0,roughness:.45,metalness:.75,envMapIntensity:1.2}),u.metal.userData={cast:!0},u.glow=new Gn({name:"glow",vertexColors:!0,roughness:.6,emissive:16760944,emissiveIntensity:2.2,color:16769200}),u.glow.userData={cast:!1,receive:!1},u.cards=new Gn({name:"cards",vertexColors:!0,roughness:.9,side:ni}),u.cards.userData={cast:!1},u.atlas=new Gn({name:"atlas",map:f.map,emissiveMap:f.emissiveMap,emissive:16777215,emissiveIntensity:1.15,roughnessMap:f.roughnessMap,roughness:1,metalness:0,vertexColors:!0,envMapIntensity:1.6}),u.atlas.userData={cast:!1},u.paint=new Gn({name:"paint",map:h.map,vertexColors:!0,transparent:!0,roughness:.8,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-4}),u.paint.userData={cast:!1,tile:h.tile,order:2},u.pane=new Gn({name:"pane",vertexColors:!0,transparent:!0,opacity:.38,roughness:.08,metalness:.1,envMapIntensity:2,side:ni,depthWrite:!1}),u.pane.userData={cast:!1,order:5},u.water=new m_({name:"water",color:4156006,roughness:.06,metalness:0,transparent:!0,opacity:.82,envMapIntensity:2.2,vertexColors:!0}),u.water.userData={cast:!1,order:3},u.far=new Gn({name:"far",map:d.map,emissiveMap:d.emissiveMap,emissive:16777215,emissiveIntensity:.6,vertexColors:!0,roughness:1}),u.far.userData={cast:!1,receive:!1,tile:d.tile,global:!0},u._tex={atlas:f,quality:i},u}function MM(i,t){const e=lM(),n=hM(),s=new Gn({name:"parkGround",map:i,roughness:1,metalness:0}),o={uDetA:{value:e},uDetB:{value:n},uMask:{value:t}};return s.onBeforeCompile=r=>{Object.assign(r.uniforms,o),r.vertexShader=r.vertexShader.replace("void main() {",`varying vec2 vWuv;
void main() {
 vWuv = position.xz;`),r.fragmentShader=r.fragmentShader.replace("void main() {",`uniform sampler2D uDetA; uniform sampler2D uDetB; uniform sampler2D uMask; varying vec2 vWuv;
void main() {`).replace("#include <map_fragment>",`#include <map_fragment>
        vec3 dA = mix(texture2D(uDetA, vWuv * 0.5).rgb, texture2D(uDetA, vWuv * 0.137 + 0.31).rgb, 0.45);
        vec3 dB = texture2D(uDetB, vWuv * 0.62).rgb;
        float pm = texture2D(uMask, vMapUv).r;
        diffuseColor.rgb *= mix(dA, dB, pm) * 2.0;`)},s.userData={cast:!1},s}function Uc(i,t,e){const n=new Gn({name:i,map:t,alphaTest:.42,side:ni,roughness:1,metalness:0}),s={value:0};return n.onBeforeCompile=o=>{o.uniforms.uTime=s,o.vertexShader=o.vertexShader.replace("void main() {",`uniform float uTime;
void main() {`).replace("#include <begin_vertex>",`#include <begin_vertex>
        #ifdef USE_INSTANCING
          float ph = instanceMatrix[3].x * 0.35 + instanceMatrix[3].z * 0.27;
          float sw = (sin(uTime * 1.6 + ph) + 0.5 * sin(uTime * 3.7 + ph * 2.3)) * ${e.toFixed(3)} * uv.y * uv.y;
          transformed.x += sw; transformed.z += sw * 0.6;
        #endif`),o.fragmentShader=o.fragmentShader.replace("#include <normal_fragment_begin>",`#include <normal_fragment_begin>
 normal = normalize(vNormal);`)},n.userData={uTime:s},n}const Xe={PARK:49,R0:53,R1:63,B0:67,EDGE:116,ROAD_Y:-.14},xs=[0,-Math.PI/2,Math.PI,Math.PI/2],bM=["S","E","N","W"],Gd=[[0,0,1.3,13],[-34,-2,1.1,11],[33,-4,1,11],[2,33,1,11],[-36,-36,1.5,12],[35,35,1.2,11],[31,-33,.9,10]],Fe={x:-21,z:19,r:8.5,level:-.15,island:{x:-19.6,z:18.2}},fu=[{name:"playground",x:22,z:21,r:8.5},{name:"gazebo",x:-20,z:-20,r:6},{name:"picnic",x:21,z:-21,r:7},{name:"pond",x:Fe.x,z:Fe.z,r:11,h:0}],nh=(i,t,e)=>{const n=Math.max(0,Math.min(1,(e-i)/(t-i)));return n*n*(3-2*n)};function xm(i,t){let e=0;for(let n=0;n<Gd.length;n++){const s=Gd[n],o=i-s[0],r=t-s[1];e+=s[2]*Math.exp(-(o*o+r*r)/(s[3]*s[3]))}return e+(uu(i*.06+3.1,t*.06+8.7,3)-.47)*.55}for(const i of fu)i.h===void 0&&(i.h=xm(i.x,i.z));function ho(i){return Fe.r*(1+.12*Math.sin(2*i+.5)+.08*Math.sin(3*i+2)+.05*Math.sin(5*i))}function hn(i,t){const e=Math.abs(i),n=Math.abs(t),s=e>n?e:n;if(s>=Xe.PARK){const h=Math.min(e-Xe.R0,Xe.R1-e),c=Math.min(n-Xe.R0,Xe.R1-n),f=h>c?h:c;return f<=0?0:f>=.1?Xe.ROAD_Y:Xe.ROAD_Y*(f/.1)}let o=xm(i,t);for(let h=0;h<fu.length;h++){const c=fu[h],f=Math.hypot(i-c.x,t-c.z);f<c.r+5&&(o+=(c.h-o)*(1-nh(c.r,c.r+5,f)))}const r=i-Fe.x,a=t-Fe.z,l=Math.hypot(r,a);if(l<Fe.r*1.4){const h=ho(Math.atan2(a,r));o-=.6*nh(1,.5,l/h);const c=i-Fe.island.x,f=t-Fe.island.z;o+=.8*Math.exp(-(c*c+f*f)/1.7)}return o*nh(47.5,41,s)}function hs(i,t,e){return new nm(i.map(s=>new k(s[0],0,s[1])),t,"centripetal").getSpacedPoints(e).map(s=>[s.x,s.z])}function wM(){const i=[];for(let n=0;n<24;n++){const s=n/24*Math.PI*2,o=39+1.5*Math.sin(3*s+.7)+.8*Math.sin(5*s);i.push([Math.cos(s)*o,Math.sin(s)*o])}const t=[];for(let n=0;n<16;n++){const s=n/16*Math.PI*2;t.push([Math.cos(s)*7.5,Math.sin(s)*7.5])}const e=[];for(let n=0;n<=8;n++){const s=-.95+n/8*2.75,o=ho(s)+2;e.push([Fe.x+Math.cos(s)*o,Fe.z+Math.sin(s)*o])}return e.push([-23.5,33],[-24.5,37.5]),[{name:"loop",w:2.6,pts:hs(i,!0,220)},{name:"north",w:2.4,pts:hs([[0,49.6],[1.2,42],[-2.2,31],[-2.6,20],[.4,12],[.6,7.4]],!1,44)},{name:"south",w:2.4,pts:hs([[0,-49.6],[-1.5,-42],[2,-31],[1.5,-20],[-.6,-12],[-.6,-7.4]],!1,44)},{name:"west",w:2.4,pts:hs([[-49.6,0],[-42,-1.2],[-31,2.2],[-20,1.8],[-12,-.5],[-7.4,-.5]],!1,44)},{name:"east",w:2.4,pts:hs([[49.6,0],[42,1.2],[31,-2],[20,-1.6],[12,.6],[7.4,.6]],!1,44)},{name:"ring",w:2.2,pts:hs(t,!0,50)},{name:"gazebo",w:1.8,pts:hs([[-5.3,-5.3],[-9,-11.5],[-13,-15],[-16.2,-16.6]],!1,16)},{name:"playground",w:1.8,pts:hs([[5.3,5.3],[10,9.5],[13.5,14],[16.2,16]],!1,16)},{name:"pondSpur",w:1.8,pts:hs([[-14,1.2],[-15.6,6.5],[-14.6,11],[e[0][0],e[0][1]]],!1,14)},{name:"pondArc",w:1.8,pts:hs(e,!1,36)},{name:"picnic",w:1.8,pts:hs([[16,-1.2],[16.6,-7],[17.6,-11.5],[18.4,-14.8]],!1,14)}]}function du(i,t,e){let n=1e9;for(const s of i){const o=s.w/2;for(let r=0;r<s.pts.length;r+=1){const a=Math.hypot(s.pts[r][0]-t,s.pts[r][1]-e)-o;a<n&&(n=a)}}return n}function SM(i){const t=i.q>=.6?2048:1024,e=un(t),n=e.getContext("2d"),s=512,o=un(s),r=o.getContext("2d"),a=t/98,l=b=>(b+49)*a,h=s/98,c=on(4242);{const C=un(196),L=C.getContext("2d"),R=L.createImageData(196,196),U=R.data,I=[112,130,64],X=[150,156,80],Y=[184,166,94];for(let st=0,bt=0;st<196;st++)for(let St=0;St<196;St++,bt+=4){const Ft=St/196*98-49,ye=st/196*98-49,lt=uu(Ft*.05+11,ye*.05+5,4),vt=uu(Ft*.11+40,ye*.11+71,3),Pt=Math.max(0,Math.min(1,(lt-.3)*2.2)),wt=Math.max(0,Math.min(1,(vt-.56)*4));for(let $t=0;$t<3;$t++)U[bt+$t]=(I[$t]+(X[$t]-I[$t])*Pt)*(1-wt*.55)+Y[$t]*wt*.55;U[bt+3]=255}L.putImageData(R,0,0),n.imageSmoothingEnabled=!0,n.imageSmoothingQuality="high",n.drawImage(C,0,0,t,t)}r.fillStyle="#000",r.fillRect(0,0,s,s);const f=(b,C,L,R,U,I)=>{b.fillStyle=I,b.beginPath(),b.arc((L+49)*C,(R+49)*C,U*C,0,7),b.fill()},d=(b,C,L,R,U)=>{const I=n.createRadialGradient(l(b),l(C),0,l(b),l(C),L*a);I.addColorStop(0,`rgba(${R},${U})`),I.addColorStop(.55,`rgba(${R},${U*.7})`),I.addColorStop(1,`rgba(${R},0)`),n.fillStyle=I,n.beginPath(),n.arc(l(b),l(C),L*a,0,7),n.fill()};for(const b of i.treeSpecs)b.type!=="street"&&(d(b.x,b.z,4.6*(b.scale||1),"96,72,44",.6),d(b.x,b.z,7.5*(b.scale||1),"150,96,40",.22));d(21,-21,8.5,"176,160,92",.5),f(n,a,22,21,8.9,"#8f7a52"),f(n,a,22,21,8.5,"#c7a877"),f(r,h,22,21,8.5,"#fff");const u=(b,C)=>{n.fillStyle=C,n.beginPath();for(let L=0;L<=72;L++){const R=L/72*Math.PI*2,U=ho(R)*b,I=l(Fe.x+Math.cos(R)*U),X=l(Fe.z+Math.sin(R)*U);L?n.lineTo(I,X):n.moveTo(I,X)}n.fill()};n.filter=`blur(${.5*a}px)`,u(1.16,"rgba(70,104,44,0.7)"),n.filter=`blur(${.25*a}px)`,u(1.03,"#a9976a"),u(.95,"#7b6c4a"),u(.86,"#465140"),u(.6,"#34423a"),n.filter="none",f(n,a,Fe.island.x,Fe.island.z,1.15,"#7b8a4a"),n.lineCap="round",n.lineJoin="round",r.lineCap="round",r.lineJoin="round";const p=(b,C,L,R,U)=>{b.strokeStyle=U,b.lineWidth=R*C,b.beginPath(),L.pts.forEach((I,X)=>{const Y=(I[0]+49)*C,st=(I[1]+49)*C;X?b.lineTo(Y,st):b.moveTo(Y,st)}),b.stroke()};n.filter=`blur(${.12*a}px)`;for(const b of i.paths)p(n,a,b,b.w+.7,"rgba(92,84,48,0.75)");for(const b of i.paths)p(n,a,b,b.w,"#b39a70");for(const b of i.paths)p(n,a,b,b.w*.45,"rgba(200,180,140,0.55)");n.filter="none";for(const b of i.paths)p(r,h,b,b.w-.1,"#fff");f(n,a,-20,-20,6.2,"#7f775f"),f(n,a,-20,-20,5.9,"#b9ad96"),f(r,h,-20,-20,5.9,"#fff"),n.strokeStyle="rgba(70,62,50,0.5)",n.lineWidth=.05*a;for(let b=1.2;b<5.9;b+=1.15)n.beginPath(),n.arc(l(-20),l(-20),b*a,0,7),n.stroke();for(let b=0;b<24;b++){const C=b/24*6.283;n.beginPath(),n.moveTo(l(-20+Math.cos(C)*1.2),l(-20+Math.sin(C)*1.2)),n.lineTo(l(-20+Math.cos(C)*5.9),l(-20+Math.sin(C)*5.9)),n.stroke()}for(const b of i.beds)n.fillStyle="#4a3828",n.beginPath(),n.ellipse(l(b.x),l(b.z),b.rx*a,b.rz*a,0,0,7),n.fill(),n.strokeStyle="#8a7f6a",n.lineWidth=.14*a,n.stroke();const v=["#d9541e","#e8892b","#f2b632","#c23b22","#9c2f1f","#b8a12e","#a86a2a"],m=(b,C)=>{Math.abs(b)>49||Math.abs(C)>49||(n.fillStyle=v[c()*v.length|0],n.globalAlpha=.55+c()*.4,n.beginPath(),n.ellipse(l(b),l(C),(.05+c()*.06)*a,(.03+c()*.04)*a,c()*3,0,7),n.fill())};for(const b of i.treeSpecs){if(b.type==="street")continue;const C=520*(b.scale||1);for(let L=0;L<C;L++){const R=c()*6.283,U=Math.pow(c(),.7)*8.5*(b.scale||1);m(b.x+Math.cos(R)*U,b.z+Math.sin(R)*U)}}for(let b=0;b<9e3;b++)m(c()*98-49,c()*98-49);n.globalAlpha=1;const g=Rn(e,{clamp:!0,aniso:8}),M=Rn(o,{clamp:!0,data:!0,aniso:2}),T=MM(g,M),E=98,A=new bn,w=[],_=[],S=[],x=[];for(let b=0;b<=E;b++)for(let C=0;C<=E;C++){const L=-49+C,R=-49+b,U=hn(L,R),I=.5,X=(hn(L+I,R)-hn(L-I,R))/(2*I),Y=(hn(L,R+I)-hn(L,R-I))/(2*I),st=1/Math.hypot(X,1,Y);w.push(L,U,R),_.push(-X*st,st,-Y*st),S.push(C/E,1-b/E)}for(let b=0;b<E;b++)for(let C=0;C<E;C++){const L=b*(E+1)+C,R=L+E+1;x.push(L,R,L+1,L+1,R,R+1)}A.setAttribute("position",new Ce(w,3)),A.setAttribute("normal",new Ce(_,3)),A.setAttribute("uv",new Ce(S,2)),A.setIndex(x);const y=new Mn(A,T);y.name="parkGround",y.receiveShadow=!0,y.matrixAutoUpdate=!1,i.group.add(y)}function TM(i){const t=i.b,e=i.mats,n=230;t.setChunk("base");const s=B(9276040),o=B(11116950),r=B(11051930),a=B(11577239);t.hq(e.asphalt,-420,-420,420,420,-.3,B(7300440,1.2),9);for(let l=0;l<4;l++){t.push(0,0,0,xs[l]),t.hq(e.asphalt,-53,-63,Xe.R1,-53,Xe.ROAD_Y,s),t.hq(e.asphalt,Xe.R1,-63,n,-53,Xe.ROAD_Y,s),t.hq(e.asphalt,Xe.R0,-n,Xe.R1,-63,Xe.ROAD_Y,s),t.hq(e.paving,-49,-53,Xe.R0,-49,0,a),t.hq(e.paving,-53,-67,Xe.R0,-63,0,o),t.hq(e.paving,Xe.PARK,-n,Xe.R0,-67,0,o),t.hq(e.paving,-53,-n,-49,-67,0,o),t.hq(e.paving,Xe.R1,-n,Xe.B0,-63,0,o),t.hq(e.paving,Xe.B0,-67,n,-63,0,o),t.hq(e.paving,-49,-n,Xe.PARK,-67,-.03,B(9406332)),t.hq(e.paving,Xe.B0,-n,n,-67,0,B(10721934,1.1));const h=(f,d,u,p)=>{t.quad(e.plain,p>0?[d,0,u]:[f,0,u],p>0?[f,0,u]:[d,0,u],p>0?[f,Xe.ROAD_Y,u+.1]:[d,Xe.ROAD_Y,u-.1],p>0?[d,Xe.ROAD_Y,u+.1]:[f,Xe.ROAD_Y,u-.1],null,r,1,.62),t.hq(e.plain,f,p>0?u-.16:u,d,p>0?u:u+.16,.004,r)},c=(f,d,u,p)=>{t.quad(e.plain,p>0?[u,0,f]:[u,0,d],p>0?[u,0,d]:[u,0,f],p>0?[u+.1,Xe.ROAD_Y,d]:[u-.1,Xe.ROAD_Y,f],p>0?[u+.1,Xe.ROAD_Y,f]:[u-.1,Xe.ROAD_Y,d],null,r,1,.62),t.hq(e.plain,p>0?u-.16:u,f,p>0?u:u+.16,d,.004,r)};h(-53,Xe.R0,-53,-1),h(-53,Xe.R0,-63,1),h(Xe.R1,n,-53,-1),h(Xe.R1,n,-63,1),c(-n,-63,Xe.R0,1),c(-n,-63,Xe.R1,-1),t.pop()}}const As=(i,t,e)=>new k(i,t,e),EM=[[0,0,"oak",1.5,"home"],[-12,-7,"maple",1.05],[11,-9,"maple",1.1],[-10.5,8.5,"maple",1],[-23,-6,"oak",1.1],[-22,6,"maple",1],[-34,-5,"maple",1.05],[-42.5,-14,"oak",1],[-7,-20,"oak",1.05],[7,-21,"pine",1.05],[-6,-33,"maple",1.1],[-13,-42.5,"birch",1],[21.5,-6.5,"oak",1.15],[23,5.5,"maple",1.05],[33.5,8,"maple",1.1],[42.5,14.5,"maple",1.05],[-6,21,"oak",1.1],[7,22,"maple",1.05],[7,35,"birch",1],[14,43,"pine",1.1],[-24,45.8,"maple",1,"link"],[24,45.8,"oak",1,"link"],[45.8,24,"maple",1,"link"],[45.8,-24,"oak",1,"link"],[24,-45.8,"maple",1,"link"],[-24,-45.8,"oak",1,"link"],[-45.8,-24,"maple",1,"link"],[-45.8,24,"oak",1,"link"],[-44,-35,"pine",1.15],[-35,-44,"oak",1.05],[35,44,"oak",1.1],[44,35,"pine",1.2],[-30.5,13.5,"birch",1.05],[30.5,27.5,"birch",1],[-28,-29,"birch",1]];function AM(i){const t=on(911);EM.forEach((e,n)=>{const s=e[4]?0:.7,o=e[0]+(t()-.5)*2*s,r=e[1]+(t()-.5)*2*s;i.treeSpecs.push({x:o,z:r,y:hn(o,r),type:e[2],seed:1e3+n*37,scale:e[3]*(e[4]?1:.94+t()*.14),role:e[4]||"park"})}),i.beds=[{x:-27.6,z:-14.5,rx:2.2,rz:1.3},{x:-25.6,z:-26.8,rx:1.4,rz:2.2},{x:-13.6,z:-25.6,rx:2.2,rz:1.3},{x:-5.2,z:-45.6,rx:2,rz:1.2},{x:5.2,z:-45.6,rx:2,rz:1.2},{x:-5.2,z:45.6,rx:2,rz:1.2},{x:5.2,z:45.6,rx:2,rz:1.2},{x:45.6,z:5.2,rx:1.2,rz:2},{x:45.6,z:-5.2,rx:1.2,rz:2},{x:-45.6,z:5.2,rx:1.2,rz:2},{x:-45.6,z:-5.2,rx:1.2,rz:2}]}function Hc(i,t,e,n){const s=i.b,o=i.mats,r=hn(t,e),a=B(10119740),l=B(2763822);s.push(t,r,e,n),s.sbox(o.wood,0,.45,0,1.8,.07,.5,"prop",{c:a,tile:1.1}),s.sbox(o.wood,0,.78,-.27,1.8,.5,.06,"prop",{c:a,rot:[-.22,0,0],tile:1.1});for(const h of[-.78,.78])s.box(o.plain,h,.22,0,.07,.44,.46,{c:l,ao:[.6,1]}),s.box(o.plain,h,.64,.2,.07,.05,.1,{c:l}),s.box(o.plain,h,.55,.22,.06,.2,.05,{c:l});i.run("special",[s.toWorld(0,.74,.02)],"bench"),s.pop()}function Xu(i,t,e){const n=i.b,s=i.mats,o=hn(t,e);n.push(t,o,e,0),n.cyl(s.plain,[0,0,0],[0,.92,0],.27,.3,10,B(3099194),2,.55,1),n.cyl(s.plain,[0,.92,0],[0,1,0],.32,.26,10,B(2373676),2),n.cyl(s.metal,[0,.62,0],[0,.7,0],.305,.31,10,B(13214282),0),n.cbox(0,.5,0,.56,1,.56,"prop"),n.pop()}function cl(i,t,e,n={}){const s=i.b,o=i.mats,r=hn(t,e),a=B(2500651),l=n.h||4.1;s.push(t,r,e,0),s.cyl(o.plain,[0,0,0],[0,.5,0],.14,.1,8,a,0,.55,1),s.cyl(o.plain,[0,.5,0],[0,l,0],.07,.05,8,a,0),s.ccap([0,0,0],[0,l,0],.08,.055,"pole"),s.cyl(o.plain,[0,l-.08,0],[0,l,0],.05,.16,8,a,0),s.box(o.glow,0,l+.22,0,.26,.4,.26,{c:[1,.86,.6]});for(const[c,f]of[[1,1],[1,-1],[-1,1],[-1,-1]])s.box(o.plain,c*.14,l+.22,f*.14,.03,.44,.03,{c:a});s.cyl(o.plain,[0,l+.44,0],[0,l+.68,0],.26,.03,8,a,1),s.cyl(o.plain,[0,l+.68,0],[0,l+.8,0],.025,.025,6,a,2),s.cbox(0,l+.3,0,.36,.62,.36,"prop");const h=s.toWorld(0,l+.8,0);return s.pop(),i.lamps.push(h),h}function pu(i,t,e,n,s,o=.3){const r=i.b,a=hn(t,e),l=zs(B(9078140),i.rng,.12);r.blob(i.mats.plain,t,a+n*(.55-o),e,n*1.15,n*.75,n,l,{seg:7,rings:5,noise:.16,seed:s,top:Le(l,1.15),bottomAo:.5}),i.b.ccap([t-n*.25,a+n*(.5-o),e],[t+n*.25,a+n*(.5-o),e],n*.78,n*.78,"rock")}function ih(i,t,e,n,s,o){const r=i.b,a=hn(t,e);for(let l=0;l<16;l++){const h=l*2.4+o,c=.25+l*5%7*.17,f=n*.95*Math.cos(c),d=1+l%4*.12;i.tufts.push([t+Math.cos(h)*f,a+n*.62*Math.sin(c)*1.2,e+Math.sin(h)*f,1+l%3*.35,Math.min(1,s[0]*2.6*d),Math.min(1,s[1]*2.6*d),Math.min(1,s[2]*2.6*d)])}for(let l=0;l<4;l++){const h=o*1.7+l*1.9,c=l?n*.55:0,f=n*(l?.55:.72);r.blob(i.mats.plain,t+Math.cos(h)*c,a+f*.62,e+Math.sin(h)*c,f,f*.82,f,Le(s,.85+l%3*.12),{seg:8,rings:5,noise:.12,seed:o+l,top:Le(s,1.4),bottomAo:.4})}}function Ya(i,t,e,n,s,o){const r=i.b,a=i.mats,l=hn(t,e),h=B(Ji.bark,1.15),c=B(13215864);r.push(t,l+o*.86,e,n),r.cyl(a.wood,[-s/2,0,0],[s/2,0,0],o,o*.86,10,h,0),r.cyl(a.plain,[-s/2+.001,0,0],[-s/2,0,0],o*.98,o*.98,10,c,1),r.cyl(a.plain,[s/2-.001,0,0],[s/2,0,0],o*.84,o*.84,10,c,2),r.cyl(a.plain,[-s/2-.004,0,0],[-s/2-.005,0,0],o*.5,o*.5,8,Le(c,.8),1),r.ccap([-s/2+o,0,0],[s/2-o,0,0],o,o*.86,"log"),r.cyl(a.wood,[s*.15,o*.5,0],[s*.22,o*1.9,o*.5],o*.3,o*.2,6,h,2);const f=r.toWorld(-s*.3,o+.25,0),d=r.toWorld(0,o+.25,0),u=r.toWorld(s*.3,o+.25,0);r.pop(),i.run("ground",[f,d,u],"log")}function CM(i){const t=i.b,e=i.mats,n=B(11773068,1.2),s=B(13221806);for(let o=0;o<4;o++){t.push(0,0,0,xs[o]);for(const r of[-1,1]){const h=r*53.07/2,c=49.22-3.85;t.sbox(e.stone,h,.45,-49,c,.9,.45,"wall",{c:n,ao:[.6,1]}),t.box(e.plain,h,.94,-49,c,.09,.56,{c:s}),t.cbox(h,.94,-49,c,.09,.56,"wall"),t.sbox(e.stone,r*3.5,.85,-49,.72,1.7,.72,"wall",{c:n,ao:[.6,1]}),t.sbox(e.plain,r*3.5,1.76,-49,.9,.12,.9,"wall",{c:s}),t.blob(e.plain,r*3.5,2.08,-49,.27,.27,.27,s,{seg:10,rings:7,bottomAo:.7}),t.ccap([r*3.5,2.07,-49],[r*3.5,2.09,-49],.27,.27,"prop");const f=r*(12+o*5);i.run("ground",[0,1,2,3].map(d=>t.toWorld(f+r*d*1.6,.99+.25,-49)),"wall")}t.pop()}}function RM(i){const t=i.b,e=i.mats,n=on(77),s=t.batch(e.water),o=s.n,r=40;s.pos.push(Fe.x,Fe.level,Fe.z),s.nor.push(0,1,0),s.uv.push(.5,.5),s.col.push(.75,.9,.9,1),s.n++;for(let f=0;f<=r;f++){const d=f/r*Math.PI*2,u=ho(d)*1;s.pos.push(Fe.x+Math.cos(d)*u,Fe.level,Fe.z+Math.sin(d)*u),s.nor.push(0,1,0),s.uv.push(0,0),s.col.push(1,1,1,1),s.n++}for(let f=0;f<r;f++)s.idx.push(o,o+2+f,o+1+f);for(let f=0;f<13;f++){const d=f*.483+n()*.2,u=ho(d)*(.93+n()*.1),p=.3+n()*.45;pu(i,Fe.x+Math.cos(d)*u,Fe.z+Math.sin(d)*u,p,f+3)}pu(i,Fe.island.x+.5,Fe.island.z-.3,.42,99,.2);for(let f=0;f<16;f++){const d=n()*6.283,u=ho(d)*(.25+n()*.5),p=Fe.x+Math.cos(d)*u,v=Fe.z+Math.sin(d)*u,m=.22+n()*.2;Math.hypot(p-Fe.island.x,v-Fe.island.z)<1.6||(t.cyl(e.plain,[p,Fe.level+.012,v],[p,Fe.level+.02,v],m,m,7,zs(B(6261308),n,.2),2),n()<.3&&t.blob(e.plain,p,Fe.level+.07,v,.08,.06,.08,B(15980256),{seg:6,rings:3}))}const a=-.55,l=ho(a),h=Fe.x+Math.cos(a)*(l-.6),c=Fe.z+Math.sin(a)*(l-.6);t.push(h,.12,c,Math.PI/2-a),t.sbox(e.wood,0,0,-.2,1.5,.09,4.4,"prop",{c:B(11111010),tile:1.4});for(const f of[-.68,.68])for(const d of[-2.2,-.6,1.4])t.cyl(e.wood,[f,-.9,d],[f,.32,d],.07,.07,6,B(8019004),2);i.run("ground",[0,1,2].map(f=>t.toWorld(0,.3,-2+f*1.3)),"jetty"),t.pop();for(let f=0;f<60*i.q+20;f++){const d=Math.floor(n()*7)*.9+n()*.45,u=ho(d)*(.86+n()*.12),p=Fe.x+Math.cos(d)*u,v=Fe.z+Math.sin(d)*u;Math.abs(d-(a+6.283))<.3||Math.abs(d-a)<.3||i.tufts.push([p,Math.max(hn(p,v),Fe.level-.05),v,1.2+n()*1.1,.5,.72,.3])}i.landmarks.pond=As(Fe.x,Fe.level,Fe.z),i.golden.push({pos:As(Fe.island.x-.25,hn(Fe.island.x-.25,Fe.island.z+.2)+.3,Fe.island.z+.2),where:"special",name:"Island in the pond"})}function PM(i){const t=i.b,e=i.mats,n=hn(22,21),s=B(13124911),o=B(15249456),r=B(3829663),a=B(10133668),l=B(5214042);t.push(18.5,n,25,.25);for(const m of[-1.7,1.7])for(const g of[-1,1])t.scyl(e.gloss,[m*1.08,0,g],[m,2.4,0],.05,.05,6,s,"pole",0);t.scyl(e.gloss,[-1.8,2.4,0],[1.8,2.4,0],.055,.055,6,s,"pole",3);for(const m of[-.75,.75]){for(const g of[-.2,.2])t.cyl(e.plain,[m+g,2.4,0],[m+g,.52,.18],.012,.012,4,B(5593694),0);t.sbox(e.plain,m,.5,.18,.5,.045,.2,"prop",{c:B(2763822)})}i.run("special",[-1.1,0,1.1].map(m=>t.toWorld(m,2.4+.31,0)),"swing"),t.pop(),t.push(26.2,n,23.2,-.6);for(const m of[-.5,.5])for(const g of[-.5,.5])t.scyl(e.gloss,[m,0,g],[m,2.5,g],.04,.04,6,r,"pole",2);t.sbox(e.plain,0,1.7,0,1.1,.07,1.1,"prop",{c:o});for(const m of[-.5,.5])t.scyl(e.gloss,[m,2.5,-.5],[m,2.5,.5],.035,.035,6,r,"rail",0);const h=3.05,c=1.48,f=Math.hypot(h,c),d=Math.atan2(c,h);t.sbox(e.gloss,0,1.7-c/2-.02,.55+h/2,.62,.05,f,"prop",{c:B(14211804),rot:[d,0,0]});for(const m of[-.33,.33])t.box(e.gloss,m,1.7-c/2+.07,.55+h/2,.05,.2,f,{c:s,rot:[d,0,0]});for(const m of[-.3,.3])t.scyl(e.gloss,[m,0,-1.35],[m,1.72,-.55],.03,.03,6,r,"rail",0);for(let m=1;m<6;m++)t.cyl(e.plain,[-.3,m*.287,-1.35+m*.133],[.3,m*.287,-1.35+m*.133],.02,.02,5,a,0);i.run("special",[t.toWorld(0,1.99,0),t.toWorld(0,1.25,1.6),t.toWorld(0,.62,2.9)],"slide"),t.pop(),t.push(20.2,n,16.6,.4);const u=.8,p=3,v=.035;for(let m=0;m<=p;m++)for(let g=0;g<=p;g++){const M=(m-p/2)*u,T=(g-p/2)*u,E=(m===1||m===2)&&(g===1||g===2)?3.2:2.4;t.scyl(e.gloss,[M,0,T],[M,E,T],v,v,6,(m+g)%2?o:l,"pole",2)}for(let m=1;m<=3;m++)for(let g=0;g<=p;g++){const M=(g-p/2)*u,T=p/2*u,E=m*u;t.scyl(e.gloss,[-T,E,M],[T,E,M],v,v,6,m%2?s:r,"rail",0),t.scyl(e.gloss,[M,E,-T],[M,E,T],v,v,6,m%2?r:s,"rail",0)}for(const m of[-.4,.4])t.scyl(e.gloss,[-.4,3.2,m],[.4,3.2,m],v,v,6,s,"rail",0),t.scyl(e.gloss,[m,3.2,-.4],[m,3.2,.4],v,v,6,s,"rail",0);i.golden.push({pos:t.toWorld(0,3.2+.3,-.4),where:"special",name:"Top of the climbing frame"}),i.run("special",[t.toWorld(-1.2,2.4+.29,-1.2),t.toWorld(0,2.4+.29,-1.2),t.toWorld(1.2,2.4+.29,-1.2)],"frame"),t.pop(),t.push(26,n,17,1.1),t.cyl(e.plain,[0,0,-.2],[0,.5,0],.05,.05,6,a,0),t.cyl(e.plain,[0,0,.2],[0,.5,0],.05,.05,6,a,0),t.sbox(e.wood,0,.55,0,3.2,.06,.26,"prop",{c:o,rot:[0,0,.2],tile:1.2}),t.pop(),t.push(16.8,n,20.5,.15);for(const[m,g,M,T]of[[0,-1.3,2.8,.2],[0,1.3,2.8,.2],[-1.3,0,.2,2.4],[1.3,0,.2,2.4]])t.sbox(e.wood,m,.13,g,M,.26,T,"prop",{c:B(11569750),tile:1.3,ao:[.6,1]});t.hq(e.plain,-1.2,-1.2,1.2,1.2,.1,B(13217914)),t.blob(e.plain,.5,.2,.3,.16,.14,.16,s,{seg:7,rings:4}),t.pop(),Hc(i,28.6,26.5,-2.3),Hc(i,15.2,26.6,2.5),Xu(i,29.4,24.4),i.landmarks.playground=As(22,n,21)}function LM(i){const t=i.b,e=i.mats,n=hn(-20,-20),s=B(15854558),o=B(6265476,1.25),r=B(10517072),a=B(14208958);t.push(-20,n,-20,Math.PI/4);const l=.45,h=3.1,c=2.8;t.sbox(e.stone,0,l/2-.1,0,6.2,l+.2,6.2,"prop",{c:B(11773068,1.2),ao:[.6,1]}),t.box(e.wood,0,l+.02,0,6.3,.05,6.3,{c:r,tile:1.6}),t.cbox(0,l+.02,0,6.3,.05,6.3,"prop"),t.sbox(e.stone,0,.11,3.45,2.4,.22,.7,"prop",{c:B(11773068,1.25)}),t.sbox(e.stone,0,.28,3.25,2.4,.16,.3,"prop",{c:B(11773068,1.25)});const f=[[-c,-c],[c,-c],[-c,c],[c,c],[0,-c],[-c,0],[c,0],[-1.15,c],[1.15,c]];for(const[A,w]of f)t.scyl(e.plain,[A,l,w],[A,h,w],.085,.07,8,s,"pole",0),t.box(e.plain,A,l+.1,w,.24,.2,.24,{c:s}),t.box(e.plain,A,h-.06,w,.22,.12,.22,{c:s}),t.box(e.plain,A,h-.3,w,.05,.05,.5,{c:s,rot:[.7,A===0||Math.abs(w)<c?Math.PI/2:0,0]});const d=(A,w,_,S)=>{t.scyl(e.plain,[A,l+.9,w],[_,l+.9,S],.035,.035,6,s,"rail",0),t.cyl(e.plain,[A,l+.18,w],[_,l+.18,S],.025,.025,5,s,0);const x=Math.round(Math.hypot(_-A,S-w)/.26);for(let y=1;y<x;y++){const b=y/x,C=A+(_-A)*b,L=w+(S-w)*b;t.box(e.plain,C,l+.54,L,.035,.7,.035,{c:s,skip:Math.abs(_-A)>.1?"py ny px nx":"py ny pz nz"})}};d(-c,-c,c,-c),d(-c,-c,-c,c),d(c,-c,c,c),d(-c,c,-1.15,c),d(1.15,c,c,c);for(const[A,w,_,S]of[[0,-c,5.9,.16],[0,c,5.9,.16],[-c,0,.16,5.9],[c,0,.16,5.9]])t.box(e.plain,A,h+.08,w,_,.2,S,{c:s});t.scyl(e.wood,[-c,h+.1,0],[c,h+.1,0],.07,.07,6,r,"rail",0),t.scyl(e.wood,[0,h+.1,-c],[0,h+.1,c],.07,.07,6,r,"rail",0),i.golden.push({pos:t.toWorld(0,h+.1+.07+.28,0),where:"special",name:"Inside the bandstand roof"});const u=3.45,p=.56,v=u*Math.tan(p),m=u/Math.cos(p),g=.1,M=h+.18,T=(A,w)=>{const _=M+v/2,S=w*u/2,x={c:o,rot:[w*p,A,0],tile:1.5},y=Math.sin(A)*S,b=Math.cos(A)*S;t.box(e.tiles,y,_,b,6.9,g,m,x),t.cbox(y,_,b,6.9,g,m,"roof",x)};T(0,1),T(0,-1),T(Math.PI/2,1),T(Math.PI/2,-1),t.box(e.plain,0,M+v+.05,0,6.95,.1,.16,{c:a}),t.box(e.plain,0,M+v+.05,0,.16,.1,6.95,{c:a}),t.cyl(e.metal,[0,M+v,0],[0,M+v+.9,0],.07,.02,6,B(13214282),2),t.blob(e.metal,0,M+v+.35,0,.16,.16,.16,B(13214282),{seg:8,rings:5});for(let A=0;A<4;A++)for(const w of[-1,1]){const _=A*Math.PI/2,S=3.47,x=w*u/2,y=Math.cos(_)*x+Math.sin(_)*S,b=-Math.sin(_)*x+Math.cos(_)*S;t.box(e.plain,y,M+v/2-.04,b,m,.18,.05,{c:s,rot:[0,_,w*-p]})}i.run("roof",[-2.4,-1.2,1.2,2.4].map(A=>t.toWorld(A,M+v+.1+.25,0)),"gazebo"),i.landmarks.gazebo=t.toWorld(0,l,0);const E=[[u,u],[-u,u],[u,-u],[-u,-u]].map(([A,w])=>t.toWorld(A*.98,M+.05,w*.98));t.pop(),E.forEach((A,w)=>{const _=A.x+20,S=A.z+20,x=Math.hypot(_,S),y=-20+_/x*9.6,b=-20+S/x*9.6,C=cl(i,y,b,{h:3.9});i.wire(As(C.x,C.y-.75,C.z),A,{sag:.35,pieces:4,r:.02,kind:"wire",tag:"lights",bulbs:7,col:B(2763822)})})}function sh(i,t,e,n){const s=i.b,o=i.mats,r=hn(t,e),a=B(11043418);s.push(t,r,e,n),s.sbox(o.wood,0,.74,0,1.9,.06,.8,"prop",{c:a,tile:1.2});for(const l of[-.68,.68])s.sbox(o.wood,0,.44,l,1.9,.05,.28,"prop",{c:a,tile:1.2});for(const l of[-.72,.72])s.box(o.wood,l,.37,0,.07,.74,.08,{c:Le(a,.8),rot:[.75,0,0]}),s.box(o.wood,l,.37,0,.07,.74,.08,{c:Le(a,.8),rot:[-.75,0,0]}),s.box(o.wood,l,.4,0,.06,.07,1.5,{c:Le(a,.8)});i.run("special",[s.toWorld(0,.77+.25,0)],"table"),s.pop()}function DM(i){const t=i.b,e=i.mats;sh(i,18.3,-20.3,.3),sh(i,23.2,-18.2,-.5),sh(i,21.6,-25.2,1.2);const n=25.6,s=-22.6,o=hn(n,s);t.push(n,o+.02,s,.5);for(let r=0;r<4;r++)for(let a=0;a<4;a++)t.hq(e.plain,-1+r*.5,-1+a*.5,-.5+r*.5,-.5+a*.5,.01+(r+a)%2*.001,(r+a)%2?B(13124911):B(15854558));t.sbox(e.wood,.45,.16,.3,.5,.3,.36,"prop",{c:B(12095566),tile:.5}),t.cyl(e.wood,[.2,.3,.3],[.45,.52,.3],.02,.02,4,B(9071162),0),t.cyl(e.wood,[.45,.52,.3],[.7,.3,.3],.02,.02,4,B(9071162),0),t.pop(),Xu(i,16.4,-23.6);for(let r=0;r<6;r++){const a=-1.5+r*.3,l=8.6,h=21+Math.cos(a)*l,c=-21+Math.sin(a)*l;t.push(h,hn(h,c),c,-a+Math.PI/2),t.sbox(e.stone,0,.3,0,2.7,.75,.5,"wall",{c:B(11049604,1.2),ao:[.6,1],tile:1.4}),r%2===0&&i.run("ground",[t.toWorld(-.7,.93,0),t.toWorld(.7,.93,0)],"drywall"),t.pop()}i.landmarks.picnic=As(21,hn(21,-21),-21)}function IM(i){const t=i.b,e=i.mats,n=on(555);t.setChunk("park"),CM(i),RM(i),PM(i),LM(i),DM(i);const s=i.paths[0].pts,o=i.paths.slice(1,5),r=(l,h,c)=>{const f=l.length,d=l[(h+f)%f],u=l[(h+1)%f],p=u[0]-d[0],v=u[1]-d[1],m=Math.hypot(p,v)||1;return{x:d[0]-v/m*c,z:d[1]+p/m*c,yaw:Math.atan2(p,v)}};for(let l=0;l<10;l++){const h=9+l*22,c=l%2?1:-1,f=r(s,h,c*2.1);if(!(du(o,f.x,f.z)<2.5)&&(Hc(i,f.x,f.z,f.yaw+(c>0?-Math.PI/2:Math.PI/2)),l%3===0)){const d=r(s,h+3,c*2);Xu(i,d.x,d.z)}}for(let l=0;l<9;l++){const h=20+l*24.4|0,c=r(s,h,(l%2?-1:1)*1.9);if(du(o,c.x,c.z)<2)continue;const f=cl(i,c.x,c.z);l%2===0&&i.run("special",[As(f.x,f.y+.25,f.z)],"lamp")}for(const l of o){const h=r(l.pts,20,1.8),c=cl(i,h.x,h.z);i.run("special",[As(c.x,c.y+.25,c.z)],"lamp");const f=r(l.pts,30,-2);Hc(i,f.x,f.z,f.yaw+Math.PI/2)}for(const l of[.8,2.4,3.9,5.5])cl(i,Math.cos(l)*9.2,Math.sin(l)*9.2);for(const[l,h]of[[0,30],[0,96],[0,150],[0,204],[1,10],[2,26],[3,14],[4,28],[9,12]]){const c=i.paths[l].pts,f=[];for(let d=0;d<5;d++){const u=c[(h+d*2)%c.length];f.push(As(u[0],hn(u[0],u[1])+.25,u[1]))}i.run("ground",f,"path")}Ya(i,-28.5,-13,.5,3.8,.36),Ya(i,13,29.5,2.1,3.2,.3),Ya(i,33.5,-13,-.4,4.2,.38),Ya(i,-3.5,-27,1.3,2.8,.28),Ya(i,-36,22,.9,3.4,.33);for(const[l,h]of[[-30,-11],[15.5,31],[31,-15.5],[-17,33]]){const c=hn(l,h);t.cyl(e.wood,[l,c-.1,h],[l,c+.42,h],.36,.3,10,B(Ji.bark,1.15),0),t.cyl(e.plain,[l,c+.42,h],[l,c+.421,h],.3,.3,10,B(13215864),2),t.ccap([l,c,h],[l,c+.14,h],.33,.3,"log"),i.run("ground",[As(l,c+.42+.25,h)],"stump");for(let f=0;f<3;f++){const d=f*2.2+l,u=l+Math.cos(d)*.55,p=h+Math.sin(d)*.55,v=hn(u,p);t.cyl(e.plain,[u,v,p],[u,v+.1,p],.025,.02,5,B(15854558),0),t.blob(e.plain,u,v+.1,p,.075,.05,.075,B(13120810),{seg:7,rings:4})}}for(const[l,h,c]of[[-38,16,.6],[-39,17.2,.4],[28,33,.7],[9,-38,.5],[-16,-34,.55],[38,-22,.6],[39,-20.8,.35],[-3,15,.4]])pu(i,l,h,c,l*3+h);const a=[B(5208628),B(6982198),B(11880490),B(13208108),B(4155962),B(9058858)];for(let l=0;l<4;l++){t.push(0,0,0,xs[l]);for(let h=0;h<9;h++){const c=-44+h*11+(n()-.5)*4;if(Math.abs(c)<7)continue;const f=t.toWorld(c,0,-47.6+n()*.6);ih(i,f.x,f.z,.6+n()*.35,a[n()*a.length|0],h*7+l*31)}for(const h of[-1,1]){const c=t.toWorld(h*5.2,0,-47.7);ih(i,c.x,c.z,.75,a[l%2?2:0],l*13+h)}t.pop()}for(const[l,h]of[[-25,-13],[-14,-27.5],[-27.5,-25],[12,14],[29,17],[-12,26.5],[16.5,-27.5],[27.5,-15.5]])ih(i,l,h,.65+n()*.3,a[n()*a.length|0],l*5+h);for(const[l,h]of[[3.5,-4.5],[-20,-9],[9,19],[26,-2.5],[-9,-36],[40,10],[-40,-15],[-3,38]]){const c=hn(l,h);t.blob(e.plain,l,c-.02,h,1.1,.16,.9,B(9067050),{seg:9,rings:3,noise:.15,seed:l+h,top:B(11565616),bottomAo:.7});for(let f=0;f<70;f++){const d=f*2.4,u=.08+f*7%13*.085;i.extraLeaves.push([l+Math.cos(d)*u,c+.15-u*u*.13,h+Math.sin(d)*u*.82])}}i.landmarks.home=As(i.treeSpecs[0].x,i.treeSpecs[0].y,i.treeSpecs[0].z)}function UM(i){const t=on(31337),e=i.q,n=(S,x)=>{const y=S-Fe.x,b=x-Fe.z;return Math.hypot(y,b)<ho(Math.atan2(b,y))*.97},s=(S,x)=>Math.abs(S)<48.2&&Math.abs(x)<48.2&&du(i.paths,S,x)>.25&&!n(S,x)&&Math.hypot(S-22,x-21)>8.9&&Math.hypot(S+20,x+20)>6.3,o=Math.round(2400+6e3*e),r=[[.62,.86,.34],[.7,.9,.36],[.8,.88,.4],[.55,.78,.33],[.9,.88,.45]];let a=0;const l=i.treeSpecs.filter(S=>S.type!=="street");for(;i.tufts.length<o&&a++<o*6;){let S,x;const y=t();if(y<.34){const L=i.paths[t()*i.paths.length|0],R=L.pts[t()*L.pts.length|0],U=t()*6.283,I=L.w/2+.3+t()*t()*2.6;S=R[0]+Math.cos(U)*I,x=R[1]+Math.sin(U)*I}else if(y<.56){const L=l[t()*l.length|0],R=t()*6.283,U=.6+t()*3.6;S=L.x+Math.cos(R)*U,x=L.z+Math.sin(R)*U}else if(y<.68){const L=t()*4|0,R=t()*96-48,U=47.9-t()*t()*2.5;[S,x]=L===0?[R,U]:L===1?[R,-U]:L===2?[U,R]:[-U,R]}else S=t()*96-48,x=t()*96-48;if(!s(S,x))continue;const b=r[t()*r.length|0],C=.85+t()*.4;i.tufts.push([S,hn(S,x),x,.45+t()*t()*.9,b[0]*C,b[1]*C,b[2]*C])}const h=(S,x,y,b=0)=>{const C=new bn,L=[],R=[],U=[],I=[];for(let X=0;X<y;X++){const Y=X/y*Math.PI,st=Math.cos(Y)*S/2,bt=Math.sin(Y)*S/2,St=X*4;L.push(-st,b,-bt,st,b,bt,st,b+x,bt,-st,b+x,-bt),R.push(0,0,1,0,1,1,0,1),U.push(0,1,0,0,1,0,0,1,0,0,1,0),I.push(St,St+1,St+2,St,St+2,St+3)}return C.setAttribute("position",new Ce(L,3)),C.setAttribute("uv",new Ce(R,2)),C.setAttribute("normal",new Ce(U,3)),C.setIndex(I),C},c=new Nn,f=new ge,d=(S,x,y,b,C)=>{const L=[[],[],[],[]];for(const R of b)L[(R[0]>=0?1:0)+(R[2]>=0?2:0)].push(R);L.forEach((R,U)=>{if(!R.length)return;const I=new sl(x,y,R.length);I.name=S+U,R.forEach((X,Y)=>{C(X,c,Y),c.updateMatrix(),I.setMatrixAt(Y,c.matrix),I.setColorAt(Y,f.setRGB(X[4],X[5],X[6]))}),I.instanceMatrix.needsUpdate=!0,I.instanceColor.needsUpdate=!0,I.castShadow=!1,I.receiveShadow=!0,I.computeBoundingSphere(),i.group.add(I)})},u=Uc("tufts",dM(),.07);i.animated.push(u.userData.uTime),d("tufts",h(.56,.36,2),u,i.tufts,(S,x,y)=>{x.position.set(S[0],S[1]-.02,S[2]),x.rotation.set(0,y*2.399,0),x.scale.set(S[3],S[3]*(.8+y%5*.1),S[3])});const p=[],v=[[1,.85,.3],[1,.45,.4],[.95,.95,.95],[.85,.5,.9],[1,.6,.2]];for(const S of i.beds){const x=Math.round((18+50*e)*S.rx*S.rz/2.6);for(let y=0;y<x;y++){const b=t()*6.283,C=Math.sqrt(t())*.92,L=S.x+Math.cos(b)*S.rx*C,R=S.z+Math.sin(b)*S.rz*C,U=v[t()*v.length|0];p.push([L,hn(L,R),R,.7+t()*.5,U[0],U[1],U[2]])}}for(const S of i.flowers)p.push(S);const m=Uc("flowers",mM(),.04);i.animated.push(m.userData.uTime),d("flowers",h(.26,.5,2),m,p,(S,x,y)=>{x.position.set(S[0],S[1]-.02*S[3],S[2]),x.rotation.set(0,y*1.7,0),x.scale.setScalar(S[3])});const g=[],M=Math.round(1500+5500*e),T=Ji.leaves.slice(0,6).map(S=>B(S)),E=i.treeSpecs;for(a=0;g.length<M&&a++<M*4;){let S,x;if(t()<.75){const C=E[t()*E.length|0],L=t()*6.283,R=Math.pow(t(),.6)*(C.type==="street"?4.5:8)*(C.scale||1);S=C.x+Math.cos(L)*R,x=C.z+Math.sin(L)*R}else{const C=i.paths[t()*i.paths.length|0],L=C.pts[t()*C.pts.length|0];S=L[0]+(t()-.5)*C.w,x=L[1]+(t()-.5)*C.w}if(Math.abs(S)<49&&Math.abs(x)<49&&n(S,x)||Math.max(Math.abs(S),Math.abs(x))>66.5)continue;const y=T[t()*T.length|0],b=.7+t()*.4;g.push([S,hn(S,x),x,.7+t()*.6,y[0]*b,y[1]*b,y[2]*b])}for(const S of i.extraLeaves){const x=T[t()*T.length|0];g.push([S[0],S[1],S[2],1,x[0],x[1],x[2],1])}const A=new _l(.16,.16);A.rotateX(-Math.PI/2);const w=A.getAttribute("normal");for(let S=0;S<w.count;S++)w.setXYZ(S,0,1,0);const _=Uc("leaves",pM(),0);d("leaves",A,_,g,(S,x,y)=>{x.position.set(S[0],S[1]+.012+y%7*.002,S[2]);const b=S[7]?.2:.03;x.rotation.set((y*7%11-5)*b,y*2.1,(y*3%9-4)*b),x.scale.setScalar(S[3])})}function zM(i,t){const e=i.b,n=i.mats;e.setChunk("park");const s=t.spec,o=s.y||0,r=o+t.height*.62;let a=null,l=1e9;for(const M of t.perches){const T=Math.hypot(M.x-s.x,M.z-s.z),E=(M.y-o)/t.height;if(E<.45||E>.8)continue;const A=Math.abs(M.y-r)*.6+T*1.6;A<l&&(l=A,a=M)}if(!a)for(const M of t.perches){const T=Math.abs(M.y-r)+Math.hypot(M.x-s.x,M.z-s.z)*2;T<l&&(l=T,a=M)}const h=a?a.clone():new k(s.x,r,s.z),c=.58,f=h.y+c*.72,d=B(8018488),u=B(4863524),p=B(11044954);e.blob(n.plain,h.x,f,h.z,c,c*.86,c,d,{seg:12,rings:8,noise:.1,seed:5,top:B(10123850),bottomAo:.4});const v=on(99);for(let M=0;M<70;M++){const T=v()*6.283,E=(v()-.4)*2,A=c*(.97+v()*.08),w=.22+v()*.34,_=Math.cos(T)*Math.cos(E),S=Math.sin(E),x=Math.sin(T)*Math.cos(E);let y=-Math.sin(T)+(v()-.5)*.9,b=Math.cos(T)+(v()-.5)*.9,C=(v()-.5)*1;const L=v()<.2?.5:.06;y+=_*L,C+=S*L,b+=x*L;const R=h.x+_*A,U=f+S*A*.86,I=h.z+x*A;e.cyl(n.plain,[R-y*w,U-C*w,I-b*w],[R+y*w,U+C*w,I+b*w],.02,.01,4,v()<.3?u:v()<.5?p:zs(d,v,.2),0)}const m=Ji.leaves.slice(0,5).map(M=>B(M,.85));for(let M=0;M<34;M++){const T=v()*6.283,E=v()*1.5-.3,A=c*1,w=m[v()*m.length|0],_=h.x+Math.cos(T)*Math.cos(E)*A,S=f+Math.sin(E)*A*.86,x=h.z+Math.sin(T)*Math.cos(E)*A;e.blob(n.plain,_,S,x,.11,.025,.08,w,{seg:5,rings:2})}const g=Math.atan2(5.6-h.z,5.6-h.x);return e.blob(n.plain,h.x+Math.cos(g)*c*.86,f+.04,h.z+Math.sin(g)*c*.86,.2,.2,.2,B(920071),{seg:8,rings:5,bottomAo:1}),e.world.addCapsule({x:h.x,y:f-.03,z:h.z},{x:h.x,y:f+.03,z:h.z},c*.9,c*.9,{kind:"nest"}),new k(h.x,f+c*.86+.05,h.z)}const Yu=[10242614,11887946,8208179,13214334,9067076,11031866,7369338,12159586],kM=[15260864,15787734,14266474,14260860,11122842,11059404,14067786,13208202,14865072,1211e4],Wd=[4157327,10108992,5209951,14725184,5917306,14252618,3103322,15259840,8036528,13134442],qd=[15920612,15920612,15260872,15920612,3355962,15260872],Xd=[11883834,5661294,9062966,10115648,6712178],Yd=[12072234,3104655,3107402,14723120,8007498,3816512],Qi=B(2434858),vm=3.3,ym=3.8,mu=2.95,NM=.45,_m=(i,t)=>(t?ym:vm)+(i-1)*mu+NM;function hl(i,t,e,n={}){const s=i.mats,o=n.style||(t==="terrace"?e()<.55?"brick":"painted":e()<.55?"brick":"stucco"),r=o==="brick"?Yu:o==="stucco"?kM:Wd,a=n.hex??r[e()*r.length|0],l=o==="brick"?Le(B(a),1.28):Le(B(a),1.1),h=qd[e()*qd.length|0];return{style:o,mat:o==="brick"?s.brick:s.stucco,tint:zs(l,e,.05),hex:a,trim:B(h),lintel:o==="brick"?B(14208958):Le(B(a),.82),stone:B(13616820),sills:e()<.75,band:e()<.6,shutters:o!=="brick"&&e()<.4,shutterC:B(Wd[e()*7|0],.8),roofC:Le(B(Xd[e()*Xd.length|0]),1.3),deck:zs(B(e()<.5?9077880:7303284,1.25),e,.08),door:e()*3|0,awn:B(Yd[e()*Yd.length|0]),ww:1.05+e()*.3,wh:1.55+e()*.25,flowers:e()<.3}}function ia(i,t=.17){const n=i()<t?Cn.winLit:Cn.winDark;return Cn.win[n[i()*n.length|0]]}function FM(i,t,e){const n=i.b,s=i.mats,o=t.depth??.1,r=t.trim||e.trim;n.fq(s.atlas,t.x0,t.y0,t.x1,t.y1,-o,t.col||[1,1,1],1,1,t.rect),n.quad(s.plain,[t.x0,t.y0,0],[t.x0,t.y0,-o],[t.x0,t.y1,-o],[t.x0,t.y1,0],null,r,.85,.7),n.quad(s.plain,[t.x1,t.y0,-o],[t.x1,t.y0,0],[t.x1,t.y1,0],[t.x1,t.y1,-o],null,r,.85,.7),n.quad(s.plain,[t.x0,t.y1,0],[t.x0,t.y1,-o],[t.x1,t.y1,-o],[t.x1,t.y1,0],null,r,.55,.55),t.kind==="win"&&e.sills&&!t.noSill||n.quad(s.plain,[t.x0,t.y0,0],[t.x1,t.y0,0],[t.x1,t.y0,-o],[t.x0,t.y0,-o],null,r,.95,.8);const a=(t.x0+t.x1)/2,l=t.x1-t.x0,h=t.y1-t.y0;if(t.kind==="win"){if(e.sills&&!t.noSill&&(n.box(s.plain,a,t.y0-.045,.1,l+.26,.09,.4,{c:e.stone,ao:[.75,1],skip:"nz"}),n.cbox(a,t.y0-.045,.14,l+.26,.09,.32,"ledge"),t.flowers)){n.box(s.plain,a,t.y0+.1,.2,l*.86,.2,.2,{c:B(6964784),ao:[.7,1],skip:"nz ny"}),n.blob(s.plain,a,t.y0+.24,.2,l*.42,.1,.12,B(5208628),{seg:6,rings:2,top:B(8034874)});const c=[[1,.45,.4],[1,.85,.3],[.95,.95,.95],[.9,.5,.9]][(a*7.3+t.y0)%4|0];for(let f=0;f<5;f++){const d=n.toWorld(a+(f-2)*l*.17,t.y0+.2,.2+f%2*.05);i.flowers.push([d.x,d.y,d.z,.55,c[0],c[1],c[2]])}}if(e.style==="brick")n.fq(s.plain,t.x0-.15,t.y1,t.x1+.15,t.y1+.22,.012,e.lintel,.9,1);else{n.box(s.plain,a,t.y1+.07,.03,l+.28,.14,.08,{c:e.trim,skip:"nz px nx"});for(const c of[t.x0-.06,t.x1+.06])n.fq(s.plain,c-.06,t.y0,c+.06,t.y1,.014,e.trim)}if(e.shutters&&!t.noShutter)for(const c of[-1,1])n.box(s.plain,a+c*(l/2+.36),t.y0+h/2,.035,.44,h,.05,{c:e.shutterC,ao:[.8,1],skip:"nz py ny"+(c>0?" nx":" px")})}}function oh(i,t,e,n,s){const o=i.b,r=s.mat,a=s.tint,l=h=>h<.9?.58+.42*(h/.9):h>e-.5?1-.22*((h-(e-.5))/.5):1;for(const h of n){const c=h.ops.slice().sort((d,u)=>d.x0-u.x0),f=[h.y0,h.y1];for(const d of c)d.y0>h.y0&&f.push(d.y0),d.y1<h.y1&&f.push(d.y1);h.y0<.9&&h.y1>.9&&f.push(.9),h.y0<e-.5&&h.y1>e-.5&&f.push(e-.5),f.sort((d,u)=>d-u);for(let d=0;d<f.length-1;d++){const u=f[d],p=f[d+1];if(p-u<1e-4)continue;const v=(u+p)/2;let m=0;for(const g of c)v>g.y0&&v<g.y1&&(g.x0>m+1e-4&&o.fq(r,m,u,g.x0,p,0,a,l(u),l(p)),m=g.x1);m<t-1e-4&&o.fq(r,m,u,t,p,0,a,l(u),l(p))}for(const d of c)FM(i,d,s)}}function mc(i){const t=i.shop?ym:vm,e=[{y0:0,y1:t,ops:[]}];for(let n=1;n<i.floors;n++)e.push({y0:t+(n-1)*mu,y1:n===i.floors-1?i.h:t+n*mu,ops:[]});return i.floors===1&&(e[0].y1=i.h),e}function OM(i,t,e,n,s,o){const r=i.b,a=i.mats,l=1;if(r.sbox(a.plain,t,e-.07,l/2,n,.14,l,"ledge",{c:s.stone,ao:[.7,1]}),o){const h=(c,f)=>{r.scyl(a.plain,[c[0],e+1,c[1]],[f[0],e+1,f[1]],.028,.028,5,Qi,"rail",0),r.cyl(a.plain,[c[0],e+.12,c[1]],[f[0],e+.12,f[1]],.018,.018,4,Qi,0);const d=Math.max(2,Math.round(Math.hypot(f[0]-c[0],f[1]-c[1])/.2)),u=Math.abs(f[0]-c[0])>.1?"py ny px nx":"py ny pz nz";for(let p=0;p<=d;p++){const v=p/d;r.box(a.plain,c[0]+(f[0]-c[0])*v,e+.56,c[1]+(f[1]-c[1])*v,.024,.9,.024,{c:Qi,skip:u})}};h([t-n/2+.03,l-.03],[t+n/2-.03,l-.03]),h([t-n/2+.03,0],[t-n/2+.03,l-.03]),h([t+n/2-.03,0],[t+n/2-.03,l-.03])}else{const h=Le(s.tint,s.style==="brick"?.7:.95);r.sbox(a.stucco,t,e+.45,l-.04,n,.9,.08,"rail",{c:h,ao:[.8,1]},{noCamera:!0});for(const c of[-1,1])r.sbox(a.stucco,t+c*(n/2-.04),e+.45,l/2-.04,.08,.9,l-.08,"rail",{c:h,ao:[.8,1]},{noCamera:!0});r.box(a.plain,t,e+.93,l-.04,n+.06,.06,.14,{c:s.trim})}i.rng()<.5&&(r.box(a.plain,t-n*.25,e+.17,l-.3,.34,.34,.34,{c:B(11031866),ao:[.7,1]}),r.blob(a.plain,t-n*.25,e+.55,l-.3,.26,.3,.26,B(5208628),{seg:7,rings:4,noise:.15,seed:t*7,top:B(9416778)})),i.rng()<.4&&i.run("special",[r.toWorld(t+n*.2,e+.25,l*.5)],"balcony")}function $d(i,t,e,n,s=!0){const o=i.b,r=i.mats,a=2.7,l=.95,h=Qi,c=[];e.forEach((p,v)=>{o.sbox(r.plain,t,p-.03,l/2+.02,a,.06,l,"prop",{c:h},{noCamera:!0,tag:"escape"}),o.scyl(r.plain,[t-a/2,p+1,l],[t+a/2,p+1,l],.027,.027,4,h,"rail",0),o.cyl(r.plain,[t-a/2,p+.5,l],[t+a/2,p+.5,l],.018,.018,3,h,0);for(const m of[-1,1])o.scyl(r.plain,[t+m*a/2,p+1,.04],[t+m*a/2,p+1,l],.027,.027,4,h,"rail",0),o.cyl(r.plain,[t+m*a/2,p+.5,.04],[t+m*a/2,p+.5,l],.018,.018,3,h,0);for(let m=0;m<=4;m++)o.box(r.plain,t-a/2+m*a/4,p+.5,l,.03,1,.03,{c:h,skip:"py ny px nx"});for(const m of[-1,1])o.box(r.plain,t+m*(a/2-.1),p-.3,l/2,.04,.04,l*1.1,{c:h,rot:[.55,0,0],skip:"pz nz"});if(c.push(o.toWorld(t+(v%2?.6:-.6),p+.25,l*.55)),v<e.length-1){const m=e[v+1],g=v%2?-1:1,M=t-g*.95,T=t+g*.95;for(const A of[.34,.8])o.scyl(r.plain,[M,p,A],[T,m,A],.03,.03,4,h,"rail",0,{tag:"escape"});const E=Math.round((m-p)/.26);for(let A=1;A<E;A++){const w=A/E;o.box(r.plain,M+(T-M)*w,p+(m-p)*w,.57,.24,.03,.46,{c:h,skip:"px nx pz nz"})}}});const f=e[0],d=Math.max(2.3,f-2.6);for(const p of[-.22,.22])o.scyl(r.plain,[t+.9+p,d,l-.1],[t+.9+p,f+1,l-.1],.022,.022,4,h,"rail",0,{tag:"escape"});for(let p=d+.15;p<f;p+=.3)o.box(r.plain,t+.9,p,l-.1,.44,.025,.025,{c:h,skip:"px nx py ny"});const u=e[e.length-1];for(const p of[-.22,.22])o.scyl(r.plain,[t-.9+p,u,.16],[t-.9+p,n+.9,.16],.022,.022,4,h,"rail",0,{tag:"escape"});for(let p=u+.3;p<n+.8;p+=.3)o.box(r.plain,t-.9,p,.16,.44,.025,.025,{c:h,skip:"px nx py ny"});s&&c.push(o.toWorld(t-.9,n+.25,-.15)),i.run("roof",c,"escape")}function jd(i,t,e){const n=i.b,s=i.mats,o=B(3816510);n.scyl(s.plain,[t,.05,.1],[t,e-.15,.1],.055,.055,6,o,"pipe",0);for(let r=1.2;r<e-.3;r+=2.4)n.box(s.plain,t,r,.07,.16,.05,.12,{c:Le(o,.8),skip:"nz py ny"});n.cyl(s.plain,[t,.05,.1],[t,0,.3],.055,.06,6,o,0)}function BM(i,t,e,n,s){const o=i.b,r=i.mats,{w:a,d:l}=t,h=2.5,c=Math.max(1,Math.floor((a-1.6)/h)),f=Math.max(1,Math.floor((l-1.6)/h)),d=new Set,u=()=>{for(let T=0;T<12;T++){const E=n()*c|0,A=n()*f|0,w=E*50+A;if(!d.has(w))return d.add(w),[(E+.5-c/2)*h,(A+.5-f/2)*h,E,A]}return null},p=B(12895938),v=[],m=Math.min(c*f,2+(n()*4|0)+(a*l>120?2:0));let g=!1,M=!1;for(let T=0;T<m;T++){const E=u();if(!E)break;const[A,w]=E,_=n();if(_<.2){const S=1.3+n()*1.1,x=.9+n()*.5;o.sbox(r.brick,A,s+S/2,w,x,S,.7,"building",{c:Le(B(Yu[n()*3|0]),1.3),ao:[.65,1]},{tag:"chimney"}),o.sbox(r.plain,A,s+S+.05,w,x+.14,.1,.84,"building",{c:e.stone});for(let y=0;y<2;y++)o.cyl(r.plain,[A-x/4+y*x/2,s+S+.1,w],[A-x/4+y*x/2,s+S+.45,w],.13,.1,8,B(11887946),2);v.push([A,s+S+.1+.25,w,"chimney"])}else if(_<.34&&!g&&a>8&&l>8){g=!0;const S=.95,x=1.3+n()*.5,y=1.8,b=B(10119748,1.15);for(const[C,L]of[[1,1],[1,-1],[-1,1],[-1,-1]])o.scyl(r.plain,[A+C*.72,s,w+L*.72],[A+C*.6,s+x,w+L*.6],.05,.05,5,Qi,"pole",0);for(const[C,L]of[[[1,1],[1,-1]],[[-1,1],[-1,-1]],[[1,1],[-1,1]],[[1,-1],[-1,-1]]])o.cyl(r.plain,[A+C[0]*.72,s+.1,w+C[1]*.72],[A+L[0]*.6,s+x-.05,w+L[1]*.6],.02,.02,4,Qi,0);o.sbox(r.plain,A,s+x+.05,w,1.75,.1,1.75,"prop",{c:Qi}),o.cyl(r.wood,[A,s+x+.1,w],[A,s+x+.1+y,w],S,S,14,b,0,.75,1);for(const C of[.25,.9,1.55])o.cyl(r.metal,[A,s+x+.1+C,w],[A,s+x+.16+C,w],S+.012,S+.012,14,B(5593180),0);o.cyl(r.metal,[A,s+x+.1+y,w],[A,s+x+.1+y+.55,w],S+.1,.05,14,B(8028036),1),o.ccyl(A,w,s+x+.1,s+x+.1+y,S,"prop",{tag:"tank"}),o.ccap([A,s+x+y+.12,w],[A,s+x+y+.6,w],S*.8,.06,"prop",{tag:"tank"}),v.push([A,s+x+.1+y+.55+.3,w,"tank"])}else if(_<.52){const S=(n()*4|0)*Math.PI/2;o.sbox(r.plain,A,s+.42,w,1.05,.7,.72,"prop",{c:p,ao:[.7,1],yaw:S}),o.box(r.plain,A,s+.04,w,.9,.08,.6,{c:Qi,yaw:S});const x=Math.sin(S)*.365,y=Math.cos(S)*.365,b=Math.cos(S)*.3,C=-Math.sin(S)*.3;o.quad(r.atlas,[A+x-b,s+.12,w+y-C],[A+x+b,s+.12,w+y+C],[A+x+b,s+.72,w+y+C],[A+x-b,s+.72,w+y-C],Cn.fan)}else if(_<.64&&!M&&t.floors>=3&&a>7.5)M=!0,o.sbox(e.mat,A,s+1.25,w,2.3,2.5,2.3,"building",{c:e.tint,ao:[.65,1]},{tag:"hut"}),o.sbox(r.plain,A,s+2.56,w,2.6,.12,2.6,"building",{c:e.stone}),o.quad(r.atlas,[A-.5,s+.02,w+1.155],[A+.5,s+.02,w+1.155],[A+.5,s+2.1,w+1.155],[A-.5,s+2.1,w+1.155],Cn.door[3]),v.push([A,s+2.62+.25,w,"hut"]);else if(_<.74)o.sbox(r.plain,A,s+.2,w,1.7,.4,1.2,"prop",{c:B(14209732),ao:[.7,1]}),o.hq(r.glow,A-.72,w-.47,A+.72,w+.47,s+.405,[.75,.6,.4]),o.box(r.plain,A,s+.41,w,.05,.03,1,{c:B(14209732)});else if(_<.88){o.hq(r.wood,A-1.1,w-1.1,A+1.1,w+1.1,s+.03,B(12096616),1.2);for(const[S,x,y,b]of[[-.95,0,.5,2.1],[.2,-.95,1.6,.5]]){o.sbox(r.wood,A+S,s+.27,w+x,y,.54,b,"prop",{c:B(9070660),ao:[.65,1],tile:1.1});const C=3;for(let L=0;L<C;L++){const R=(L+.5)/C-.5,U=[B(5208628),B(8034874),B(11880490)][n()*3|0];o.blob(r.plain,A+S+(y>b?R*y:0),s+.72,w+x+(y>b?0:R*b),.3,.3+n()*.2,.3,U,{seg:7,rings:4,noise:.18,seed:C*7+L,top:Le(U,1.4)})}}o.sbox(r.plain,A+.4,s+.42,w+.4,.6,.05,.6,"prop",{c:B(15262416)});for(const[S,x]of[[.16,.16],[.64,.16],[.16,.64],[.64,.64]])o.box(r.plain,A+S,s+.2,w+x,.03,.4,.03,{c:Qi,skip:"py ny"});v.push([A+.4,s+.445+.25,w+.4,"garden"])}else{const S=2.2+n()*1.4;o.scyl(r.plain,[A,s,w],[A,s+S,w],.03,.022,5,B(9080724),"pole",2);for(let x=0;x<4;x++)o.cyl(r.plain,[A-.45+x*.05,s+S-.25-x*.22,w],[A+.45-x*.05,s+S-.25-x*.22,w],.012,.012,4,B(9080724),0);o.cyl(r.plain,[A,s+S-.3,w],[A+.5,s+.02,w+.3],.008,.008,3,Qi,0)}}if(n()<.45){const T=(n()-.5)*(a-2),E=-l/2+.35;o.cyl(r.plain,[T,s+t.ph,E],[T,s+t.ph+.5,E],.025,.025,4,Qi,0),o.cyl(r.plain,[T,s+t.ph+.5,E+.02],[T,s+t.ph+.62,E+.2],.38,.12,12,B(14868698),1),o.cyl(r.plain,[T,s+t.ph+.5,E+.02],[T,s+t.ph+.62,E+.2],.38,.12,12,B(11579048),0)}return v}function VM(i,t,e,n){const s=i.b,o=i.mats,{w:r,d:a,h:l}=t,h=t.ph,c=.26;s.hq(o.roofing,-r/2,-a/2,r/2,a/2,l,e.deck);const f=Le(e.deck,.72);s.hq(o.roofing,-r/2+c,a/2-c-.5,r/2-c,a/2-c,l+.006,f),s.hq(o.roofing,-r/2+c,-a/2+c,r/2-c,-a/2+c+.5,l+.006,f);for(let g=0;g<2;g++){const M=(n()-.5)*(r-4),T=(n()-.5)*(a-4),E=1+n()*2,A=.8+n()*1.6;s.hq(o.roofing,M-E/2,T-A/2,M+E/2,T+A/2,l+.008,Le(e.deck,.8+n()*.35))}const d=Le(e.tint,.96),u=e.stone,p=(g,M,T,E)=>{s.sbox(e.mat,g,l+h/2,M,T,h,E,"building",{c:d,ao:[.8,1],skip:"ny"},{tag:"parapet"}),s.box(o.plain,g,l+h+.035,M,T+.08,.07,E+.08,{c:u,skip:"ny"})};p(0,a/2-c/2,r,c),p(0,-a/2+c/2,r,c),p(-r/2+c/2,0,c,a-2*c),p(r/2-c/2,0,c,a-2*c);for(const g of[1,-1])s.box(o.plain,0,l-.13,g*(a/2+.13),r+(t.expL?.2:0)+(t.expR?.2:0),.26,.3,{c:u,ao:[.7,1]}),s.box(o.plain,0,l-.33,g*(a/2+.07),r,.14,.16,{c:Le(u,.92),ao:[.7,1]}),s.cbox(0,l-.13,g*(a/2+.13),r,.26,.3,"ledge");const v=BM(i,t,e,n,l),m=Math.min(5,Math.max(3,Math.round(r/2.6)));i.run("roof",Array.from({length:m},(g,M)=>s.toWorld((M-(m-1)/2)*2,l+h+.07+.25,a/2-c/2)),"parapet");for(const g of v){const M=s.toWorld(g[0],g[1],g[2]);i.run("roof",[M],g[3]),i.roofTops.push({pos:M,kind:g[3],side:t.sideName,row:t.row})}}function HM(i,t,e,n){const s=i.b,o=i.mats,{w:r,d:a,h:l}=t,h=t.pitch,c=.22,f=Math.tan(h),d=Math.cos(h),u=Math.sin(h),p=a/2*f,v=l+p,m=(a/2+c)/d,g=a/2*u,M=t.expL?c:0,T=t.expR?c:0,E=(T-M)/2,A=r+M+T;for(const R of[1,-1]){const U=R*(a/2+c)/2,I=v-(a/2+c)/2*f,X=[R*h,0,0];s.box(o.tiles,E,I-.06*d,U-R*.06*u,A,.12,m,{c:e.roofC,rot:X,tile:2});const Y=d,st=R*u;s.cbox(E,I-Y*g/2,U-st*g/2,A,g,m,"roof",{rot:X},{side:t.sideName,row:t.row}),s.box(o.plain,E,l-c*f-.02,R*(a/2+c+.05),A,.1,.12,{c:B(3816510)})}s.box(o.plain,E,v+.06,0,A,.12,.26,{c:Le(e.roofC,.8)});const w=e.tint,_=e.mat.userData.tile||1;for(const R of[-1,1]){const U=R*r/2,I=R*a/2;s.tri(e.mat,[U,l,I],[U,l,-I],[U,v,0],[(I+a/2)/_,l/_],[(-I+a/2)/_,l/_],[a/2/_,v/_],w,1,1,.85)}const S=[],x=r/2-.5,y=-.6,b=v-.6*f-.3,C=v+1;s.sbox(o.brick,x,(b+C)/2,y,.8,C-b,1,"building",{c:Le(B(Yu[n()*3|0]),1.3),ao:[.8,1]},{tag:"chimney"}),s.sbox(o.plain,x,C+.05,y,.94,.1,1.14,"building",{c:e.stone});for(let R=0;R<2;R++)s.cyl(o.plain,[x,C+.1,y-.25+R*.5],[x,C+.45,y-.25+R*.5],.13,.1,8,B(11887946),2);if(S.push([x,C+.1+.25,y,"chimney"]),t.dormer){const U=a/2-1.5,I=l+(a/2-U)*f,X=1.1,Y=U+.85,st=l+(a/2-Y)*f,bt=(st+I+X)/2,St=I+X-st,Ft=t.dormerX||0;s.sbox(e.mat,Ft,bt,U+.05,1.5,St,1.7,"building",{c:e.tint,skip:"ny",ao:[.85,1]},{tag:"dormer"}),s.sbox(o.plain,Ft,I+X+.05,U+.1,1.5+.3,.1,2,"building",{c:Le(e.roofC,.75)}),s.fq(o.atlas,Ft-.5,st+.42,Ft+.5,I+X-.12,Y+.062,[1,1,1],1,1,ia(n,.5)),s.box(o.plain,Ft,st+.37,Y+.08,1.2,.08,.1,{c:e.trim}),S.push([Ft,I+X+.1+.25,U+.3,"dormer"])}const L=Math.min(6,Math.max(3,Math.round(r/1.7)));i.run("roof",Array.from({length:L},(R,U)=>s.toWorld(-r/2+.8+U*(r-2.4)/(L-1),v+.12+.25,0)),"ridge");for(const R of S){const U=s.toWorld(R[0],R[1],R[2]);R[3]==="chimney"&&i.roofTops.push({pos:U,kind:R[3],side:t.sideName,row:t.row}),n()<.5&&i.run("roof",[U],R[3])}t.ridge=v}function $u(i,t,e){const n=i.b,s=i.mats,o=t.st,r=t.kind==="shop";t.shop=r,t.h=t.h||_m(t.floors,r);const{w:a,d:l,h}=t;t.ph=t.roof==="flat"?t.ph||.55+e()*.45:0,t.pitch=t.pitch||.66,n.push(t.x,0,t.z,t.yaw||0),n.setChunk("q"+i.quadOf(n.wx(0,0),n.wz(0,0))),n.uvOx=e()*20|0,n.uvOy=0,n.cbox(0,h/2,0,a,h,l,"building",null,{side:t.sideName,row:t.row,flat:t.roof==="flat",tag:"body"}),mc(t)[0].y1;const f=Math.max(2,Math.round(a/3)),d=a/f,u=Math.min(o.ww,d-.9),p=o.wh,v=t.kind==="terrace"?t.mirror?f-1:0:r?f-1:f/2|0,m=mc(t),g=[];if(r){const _=(v+.5)*d;m[0].ops.push({x0:_-.55,x1:_+.55,y0:.12,y1:2.7,rect:Cn.door[3],kind:"door",depth:.22,trim:B(2762274)});const S=.45,x=v*d-.1,y=Math.max(1,Math.round((x-S)/2.5)),b=(x-S-(y-1)*.16)/y,C=e()*2|0;for(let L=0;L<y;L++)m[0].ops.push({x0:S+L*(b+.16),x1:S+L*(b+.16)+b,y0:.6,y1:2.78,rect:Cn.shop[C],kind:"shop",depth:.16,trim:B(2762274)})}else{const _=(v+.5)*d;m[0].ops.push({x0:_-.55,x1:_+.55,y0:.32,y1:2.72,rect:Cn.door[o.door],kind:"door",depth:.2});for(let S=0;S<f;S++)if(S!==v){const x=(S+.5)*d;m[0].ops.push({x0:x-u/2,x1:x+u/2,y0:1.05,y1:1.05+p,rect:ia(e),kind:"win",flowers:o.flowers&&e()<.5})}}const M=t.kind==="apt"&&e()<.6,T=e()<.5;for(let _=1;_<t.floors;_++)for(let S=0;S<f;S++){const x=(S+.5)*d,y=m[_].y0;M&&(f<3||S>0&&S<f-1||f===3&&S===1)&&(_+S)%2===(f%2?1:0)?(m[_].ops.push({x0:x-u/2,x1:x+u/2,y0:y+.12,y1:y+.95+p,rect:ia(e,.25),kind:"win",noSill:!0,noShutter:!0}),g.push([x,y+.12,Math.min(d-.4,u+1)])):m[_].ops.push({x0:x-u/2,x1:x+u/2,y0:y+.95,y1:y+.95+p,rect:ia(e),kind:"win",flowers:o.flowers&&e()<.35})}if(n.push(-a/2,0,l/2,0),oh(i,a,h,m,o),o.band||r)for(let _=1;_<t.floors;_++)n.box(s.plain,a/2,m[_].y0,.035,a,.14,.09,{c:o.stone,ao:[.8,1]});n.box(o.style==="brick"?s.stone:s.plain,a/2,.25,.03,a,.5,.08,{c:o.style==="brick"?B(10129796,1.2):Le(o.tint,.72),ao:[.6,.95]});for(const _ of g)OM(i,_[0],_[1],_[2],o,T);const E=(v+.5)*d;if(r){const S=a-.3;n.box(s.plain,(.45+v*d-.1)/2,.32,.03,v*d-.55,.56,.08,{c:Le(o.awn,.55),ao:[.6,1]}),n.box(s.plain,a/2,3.32,.07,S-.3,.62,.14,{c:Le(o.awn,.5),ao:[.85,1]});const x=t.sign??e()*8|0,y=Math.min(S-.3-.3,5.2);n.fq(s.atlas,a/2-y/2,3.06,a/2+y/2,3.06+y/8,.142,[1,1,1],1,1,Cn.sign[x]);for(const b of[.2,a-.2])n.box(s.plain,b,1.7,.05,.3,3.4,.1,{c:Le(o.awn,.5),ao:[.6,1]});if(t.awning!==!1){const b=v*d+.1,C=b-.2,L=1.55,R=.33,U=2.98,I={c:o.awn,rot:[R,0,0],tile:.56},X=U-Math.sin(R)*L/2,Y=.1+Math.cos(R)*L/2;n.box(s.cloth,.2+C/2,X,Y,C,.05,L,I),n.cbox(.2+C/2,X,Y,C,.05,L,"awning",I);const st=U-Math.sin(R)*L,bt=.1+Math.cos(R)*L;n.fq(s.cloth,.2,st-.24,.2+C,st,bt,o.awn,.9,1);for(const St of[.25,.15+C])n.cyl(s.plain,[St,U-.75,.05],[St,st+.03,bt-.05],.015,.015,4,Qi,0);i.run("special",[.25,.5,.75].map(St=>n.toWorld(.2+C*St,X+.3,Y)),"awning"),i.awnings.push(n.toWorld(.2+C/2,X+.3,Y))}}else{if(n.sbox(s.stone,E,.08,.42,1.7,.16,.84,"prop",{c:B(11773068,1.2),ao:[.7,1]}),n.sbox(s.stone,E,.24,.24,1.5,.16,.46,"prop",{c:B(11773068,1.2)}),o.style!=="brick"||e()<.5){n.sbox(s.plain,E,2.98,.3,1.7,.1,.62,"ledge",{c:o.trim});for(const _ of[-1,1])n.box(s.plain,E+_*.74,2.78,.1,.08,.3,.2,{c:o.trim,skip:"nz"}),n.box(s.plain,E+_*.74,2.86,.32,.08,.14,.26,{c:o.trim,skip:"nz"})}else n.box(s.plain,E,2.86,.04,1.5,.24,.08,{c:o.lintel});if(t.kind==="terrace"&&e()<.6){const _=E+(t.mirror?-1:1)*1.25;n.box(s.plain,_,.2,.42,.36,.4,.36,{c:B(11031866),ao:[.7,1]}),n.blob(s.plain,_,.62,.42,.26,.32,.26,B(5208628),{seg:7,rings:4,noise:.14,seed:_*3,top:B(9416778)})}}if(e()<.7&&jd(i,e()<.5?.14:a-.14,h),n.pop(),!t.noBack){const _=mc(t),S=Math.max(2,Math.round(a/3.4)),x=a/S,y=e()*S|0,b=t.fire&&t.floors>=3?e()*(S-1)|0:-9;for(let C=0;C<t.floors;C++)for(let L=0;L<S;L++){const R=(L+.5)*x,U=_[C].y0;C===0&&L===y?_[0].ops.push({x0:R-.5,x1:R+.5,y0:.1,y1:2.5,rect:Cn.door[e()*3|0],kind:"door",depth:.15}):e()<.86&&_[C].ops.push({x0:R-.5,x1:R+.5,y0:U+1,y1:U+2.45,rect:ia(e,.2),kind:"win",noShutter:!0})}n.push(a/2,0,-l/2,Math.PI),oh(i,a,h,_,{...o}),b>=0&&$d(i,(b+1)*x,_.slice(1).map(C=>C.y0+.8),h+t.ph,t.roof==="flat"),jd(i,e()<.5?.16:a-.16,h),n.pop()}const A=_=>{const S=_?t.expL:t.expR,x=_?t.hL:t.hR;if(n.push(_?-a/2:a/2,0,_?-l/2:l/2,_?-Math.PI/2:Math.PI/2),S){const y=mc(t),b=_?t.detL:t.detR,C=b?Math.max(2,Math.round(l/3.2)):2;for(let L=0;L<t.floors;L++)for(let R=0;R<C;R++){if(!b&&e()<.4)continue;const U=(R+.5)*l/C,I=y[L].y0;if(L===0&&r&&b){y[0].ops.push({x0:U-1,x1:U+1,y0:.6,y1:2.78,rect:Cn.shop[1],kind:"shop",depth:.16,trim:B(2762274)});continue}y[L].ops.push({x0:U-.5,x1:U+.5,y0:I+1,y1:I+2.5,rect:ia(e),kind:"win",noShutter:!b})}if(oh(i,l,h,y,o),t.fireSide===(_?"L":"R")&&t.floors>=3&&$d(i,l/2,y.slice(1).map(L=>L.y0+.8),h+t.ph,t.roof==="flat"),e()<.3){const L=l*(.3+e()*.4);n.fq(s.atlas,L-.5,1.2,L+.5,2.2,.012,[.9,.9,.9],1,1,Cn.poster)}}else if(h>x+.3){const y=Math.max(0,x-.3);n.fq(o.mat,0,y,l,h,0,Le(o.tint,.92),.8,1)}n.pop()};A(!0),A(!1),t.roof==="flat"?VM(i,t,o,e):HM(i,t,o,e),n.uvOx=0;const w={...t,wx:n.wx(0,0),wz:n.wz(0,0),top:t.roof==="flat"?h:t.ridge,wyaw:n.yaw};return w.toWorld=((_,S,x,y,b)=>(C,L,R)=>new k(_+C*y+R*b,L,S-C*b+R*y))(n.fx,n.fz,n.yaw,n.cs,n.sn),n.pop(),i.buildings.push(w),w}const GM=B(1579291);function Xn(i,t,e,n={}){const s=i.b,o=n.pieces||5,r=t.distanceTo(e),a=n.sag??.028*r,l=n.r||.03,h=[];for(let u=0;u<=o;u++){const p=u/o,v=new k().lerpVectors(t,e,p);v.y-=a*4*p*(1-p),h.push(v)}s.pushAbs();const c=n.col||GM;for(let u=0;u<o;u++){const p=h[u],v=h[u+1];s.cyl(i.mats.plain,[p.x,p.y,p.z],[v.x,v.y,v.z],l*1.15,l*1.15,3,c,0),i.world.addCapsule(p,v,l,l,{kind:n.kind||"wire",tag:n.tag||"wire"})}const f=u=>{const p=Math.min(o-1e-6,Math.max(0,u*o)),v=Math.floor(p);return new k().lerpVectors(h[v],h[v+1],p-v)};if(n.bulbs)for(let u=1;u<=n.bulbs;u++){const p=f(u/(n.bulbs+1));s.blob(i.mats.glow,p.x,p.y-.09,p.z,.055,.07,.055,[1,.85,.55],{seg:6,rings:4,bottomAo:1})}if(n.clothes){const u=on(n.clothes),p=[15854558,13124911,3829663,15249456,7314026,14256800,15854558,8018570,15262416],v=new k().subVectors(e,t).setY(0).normalize();let m=.14+u()*.05;for(;m<.86;){const g=.45+u()*.5,M=.5+u()*.7,T=f(m),E=f(Math.min(1,m+g/r)),A=B(p[u()*p.length|0]),w=(u()-.5)*.12,_=-v.z*w,S=v.x*w;if(s.quad(i.mats.cards,[T.x+_,T.y-M,T.z+S],[E.x+_,E.y-M,E.z+S],[E.x,E.y-.02,E.z],[T.x,T.y-.02,T.z],null,A,.8,1),M>.85&&g>.6)for(const[x,y]of[[T,-1],[E,1]])s.quad(i.mats.cards,[x.x+v.x*y*.26,x.y-.42,x.z+v.z*y*.26],[x.x,x.y-.5,x.z],[x.x,x.y-.04,x.z],[x.x+v.x*y*.22,x.y-.16,x.z+v.z*y*.22],null,A,.85,1);m+=g/r+.03+u()*.1}}s.pop();const d={a:t.clone(),b:e.clone(),pts:h,len:r,tag:n.tag||"wire",at:f,r:l};return i.wires.push(d),d}function zc(i,t,e,n,s={}){const o=i.b,r=i.mats,a=s.h||9.2,l=B(6965812,1.2),h=B(2895408),c=B(14209732);o.push(t,0,e,n),o.cyl(r.wood,[0,0,0],[0,a,0],.17,.115,9,l,2,.55,1),o.ccap([0,0,0],[0,a-.1,0],.17,.115,"pole",{tag:"utility"});const f=a-.65;o.sbox(r.wood,0,f,0,.12,.13,2.1,"pole",{c:Le(l,.9),tile:.9},{tag:"crossarm"});for(const u of[-1,1])o.box(r.plain,.02,f-.32,u*.42,.03,.05,.95,{c:h,rot:[u*.72,0,0]}),o.cyl(r.plain,[0,f+.06,u*.85],[0,f+.22,u*.85],.045,.035,6,c,2),o.cyl(r.plain,[0,f+.06,u*.42],[0,f+.2,u*.42],.04,.03,6,c,2);o.cyl(r.plain,[0,a,0],[0,a+.2,0],.045,.035,6,c,2);for(let u=0;u<10;u++){const p=2.6+u*.55,v=u%2?1:-1;o.cyl(r.plain,[v*.1,p,0],[v*.3,p+.02,0],.014,.014,3,h,0)}if(s.drum){o.cyl(r.plain,[.46,a-2.6,0],[.46,a-1.65,0],.3,.3,12,B(9080980),3,.7,1),o.cyl(r.plain,[.46,a-1.65,0],[.46,a-1.58,0],.31,.2,12,B(8028292),2),o.box(r.plain,.2,a-2.1,0,.3,.08,.1,{c:h});for(const u of[-.12,.12])o.cyl(r.plain,[.46,a-1.58,u],[.46,a-1.38,u],.04,.025,5,c,2);o.ccap([.46,a-2.3,0],[.46,a-1.9,0],.3,.3,"prop",{tag:"drum"})}s.lamp&&(o.cyl(r.plain,[0,a-2.2,-.1],[0,a-1.75,-1.7],.035,.03,6,h,0),o.ccap([0,a-2.2,-.1],[0,a-1.75,-1.7],.035,.03,"rail"),o.box(r.plain,0,a-1.74,-1.95,.22,.1,.6,{c:h}),o.box(r.glow,0,a-1.8,-1.95,.16,.04,.46,{c:[1,.88,.62]}),o.cbox(0,a-1.75,-1.95,.22,.12,.6,"prop"));const d={base:o.toWorld(0,0,0),top:o.toWorld(0,a+.2,0),h:a,out:o.toWorld(0,f+.24,-.85),in:o.toWorld(0,f+.24,.85),pin:o.toWorld(0,a+.22,0),comm:o.toWorld(0,a-2.5,.16),drop:o.toWorld(0,a-1.4,-.14),dropIn:o.toWorld(0,a-1.4,.14)};return o.pop(),i.poles.push(d),d}function WM(i,t,e,n,s,o,r){const a=i.b,l=i.mats,h=B(1581612),c=B(1513498),f=B(13225168);a.push(t,Xe.ROAD_Y,e,n);const d=o?1.95:1.76,u=d/2,p=o?[[-2.45,.4,u,0],[-2.45,1.98,u-.06,0],[-2.3,2.1,u-.1,0],[.95,2.1,u-.1,1],[1.6,1.32,u-.02,0],[2.3,1.2,u-.02,0],[2.46,.98,u-.05,0],[2.48,.4,u-.03,0]]:[[-2.14,.4,u-.03,0],[-2.16,.8,u-.03,0],[-2.04,.99,u-.04,0],[-1.42,1.03,u-.02,1],[-.92,1.43,u-.2,0],[.22,1.45,u-.2,1],[.86,1.03,u-.02,0],[1.72,.96,u-.03,0],[2.1,.82,u-.06,0],[2.15,.4,u-.04,0]],v=p.length,m=[];for(let _=0;_<v-1;_++){const S=p[_+1][0]-p[_][0],x=p[_+1][1]-p[_][1],y=Math.hypot(S,x);m.push([-x/y,S/y,0])}const g=(_,S)=>{const x=m[_],y=m[S];if(!y||x[0]*y[0]+x[1]*y[1]<.45)return x;const b=x[0]+y[0],C=x[1]+y[1],L=Math.hypot(b,C);return[b/L,C/L,0]};for(let _=0;_<v-1;_++){const S=p[_],x=p[_+1],y=S[3]?h:s,b=g(_,_-1),C=g(_,_+1);a.quad(l.gloss,[S[0],S[1],-S[2]],[S[0],S[1],S[2]],[x[0],x[1],x[2]],[x[0],x[1],-x[2]],null,y,1,1,[b,b,C,C])}const M=o?[0,1,2,3,4,5,6,7]:[0,1,2,3,6,7,8,9];for(const _ of[1,-1]){for(let y=0;y<M.length-1;y++){const b=p[M[y]],C=p[M[y+1]],L=[0,.4,_*u],R=[b[0],b[1],_*b[2]],U=[C[0],C[1],_*C[2]];_>0?a.tri(l.gloss,L,U,R,[0,0],[0,0],[0,0],s,.6,1,1,[0,.08,1]):a.tri(l.gloss,L,R,U,[0,0],[0,0],[0,0],s,.6,1,1,[0,.08,-1])}if(o){const b=_*(u-.02+.004),C=_*(u-.1+.004),L=[[.7,1.36,b],[1.5,1.36,b],[1,1.98,C],[.7,1.98,C]];_>0?a.quad(l.gloss,L[0],L[1],L[2],L[3],null,h):a.quad(l.gloss,L[1],L[0],L[3],L[2],null,h),a.box(l.gloss,1.52,1.4,_*(u+.08),.1,.16,.14,{c})}else{const y=p[3],b=p[4],C=p[5],L=p[6],R=.004,U=_>0?[[y[0]+.1,y[1]+.03,y[2]+R],[L[0]-.12,L[1]+.03,L[2]+R],[C[0]-.04,C[1]-.06,C[2]+R],[b[0]+.06,b[1]-.06,b[2]+R]]:[[L[0]-.12,L[1]+.03,-L[2]-R],[y[0]+.1,y[1]+.03,-y[2]-R],[b[0]+.06,b[1]-.06,-b[2]-R],[C[0]-.04,C[1]-.06,-C[2]-R]],I=_>0?[[y[0],y[1],y[2]],[L[0],L[1],L[2]],[C[0],C[1],C[2]],[b[0],b[1],b[2]]]:[[L[0],L[1],-L[2]],[y[0],y[1],-y[2]],[b[0],b[1],-b[2]],[C[0],C[1],-C[2]]];a.quad(l.gloss,I[0],I[1],I[2],I[3],null,s),a.quad(l.gloss,U[0],U[1],U[2],U[3],null,h),a.box(l.gloss,-.28,1.23,_*(u-.1),.07,.42,.03,{c:s,rot:[_*.33,0,0]}),a.box(l.gloss,.78,1.08,_*(u+.07),.1,.09,.16,{c:s})}a.box(l.plain,o?-.4:-.3,.72,_*(u+.002),.02,.56,.01,{c:Le(s,.45),skip:"py ny px nx"}),a.box(l.plain,0,.43,_*(u-.02),o?4.3:3.6,.1,.06,{c})}const T=o?[-1.5,1.5]:[-1.3,1.32];for(const _ of T)for(const S of[-1,1])a.cyl(l.plain,[_,.33,S*(u-.22)],[_,.33,S*(u+.02)],.33,.33,12,B(2237221),2),a.cyl(l.metal,[_,.33,S*(u+.022)],[_,.33,S*(u+.04)],.2,.17,10,f,2);a.box(l.plain,0,.36,0,o?4.6:4,.2,d-.3,{c,skip:"py"});const E=p[v-1][0],A=p[0][0];a.box(l.plain,E-.02,.5,0,.14,.16,d-.04,{c}),a.box(l.plain,A+.02,.5,0,.14,.16,d-.04,{c});const w=o?.86:.74;for(const _ of[-1,1])a.box(l.glow,E-(o?.015:.03),w,_*(u-.32),.04,.13,.32,{c:[1,.95,.8]}),a.box(l.plain,A-0,o?1.2:.74,_*(u-.26),.04,o?.4:.12,o?.12:.34,{c:B(11545122)});a.box(l.plain,E+.055,.5,0,.02,.11,.46,{c:B(15262408)}),a.box(l.plain,A-.055,.5,0,.02,.11,.46,{c:B(15255608)}),o||a.box(l.plain,E-.03,.72,0,.03,.1,.7,{c}),o?(a.cbox(-.67,1.05,0,3.56,2.1,d,"car"),a.cbox(1.78,.63,0,1.36,1.26,d,"car")):(a.cbox(0,.5,0,4.3,1,d,"car"),a.cbox(-.32,1.22,0,1.75,.45,d-.36,"car")),r()<.6&&i.run("special",[a.toWorld(o?-.6:-.35,(o?2.1:1.45)+.25,0)],"car"),a.pop()}function qM(i,t,e,n){const s=i.b,o=i.mats,r=B(2763823),a=6.4;s.push(t,0,e,n),s.cyl(o.plain,[0,0,0],[0,.9,0],.13,.09,8,r,0,.55,1),s.cyl(o.plain,[0,.9,0],[0,a,0],.075,.055,8,r,0),s.ccap([0,0,0],[0,a,0],.09,.055,"pole");const l=[[0,a,0],[0,a+.5,.35],[0,a+.68,1],[0,a+.6,1.7]];for(let h=0;h<3;h++)s.cyl(o.plain,l[h],l[h+1],.045,.04,6,r,0),s.ccap(l[h],l[h+1],.045,.04,"rail");s.cyl(o.plain,[0,a+.6,1.7],[0,a+.36,1.75],.05,.24,10,r,1),s.cyl(o.glow,[0,a+.36,1.75],[0,a+.2,1.75],.22,.12,10,[1,.88,.62],2),s.cbox(0,a+.36,1.75,.44,.34,.44,"prop"),i.run("special",[s.toWorld(0,a+.68+.3,1)],"lamp"),s.pop()}function XM(i){const t=i.b,e=i.mats,n=[.92,.92,.9],s=B(15253568),o=Xe.ROAD_Y+.012,r=(a,l,h,c,f=n)=>t.hq(e.paint,a,l,h,c,o,f);for(let a=0;a<4;a++){t.push(0,0,0,xs[a]);const l=[-47,0,47];for(let h=-51;h<51;h+=5)l.some(c=>Math.abs(h+1.25-c)<4.2)||r(h,-58.07,h+2.5,-57.93);r(-44,-61,44,-60.9);for(let h=-44;h<=44;h+=5.5)Math.abs(h)<4||r(h-.05,-62.9,h+.05,-61);r(-52.5,-53.45,52.5,-53.33,s);for(const h of l){for(let c=0;c<10;c++)r(h-1.6,-62.75+c,h+1.6,-62.25+c);r(h-3.2,-62.9,h-3,-57.9),r(h+3,-58.1,h+3.2,-53.1)}for(let h=66;h<116;h+=5)r(h,-58.07,h+2.5,-57.93);for(let h=-116;h<-66;h+=5)r(57.93,h,58.07,h+2.5);t.quad(e.atlas,[-20.6,o,-56.4],[-19.4,o,-56.4],[-19.4,o,-57.6],[-20.6,o,-57.6],Cn.manhole,[.8,.8,.8]),t.quad(e.atlas,[27.4,o,-59.4],[28.6,o,-59.4],[28.6,o,-60.6],[27.4,o,-60.6],Cn.manhole,[.8,.8,.8]),t.pop()}}function YM(i){const t=i.b,e=i.mats,n=on(8080);t.setChunk("base"),XM(i);const s=[12072234,3104655,15262422,3816512,6262634,14723120,9080724,8007482,3108714,14252602],o=[];for(let a=0;a<4;a++){t.push(0,0,0,xs[a]),t.setChunk("q"+i.quadOf(t.wx(0,-60),t.wz(0,-60)));for(let c=-8;c<8;c++){const f=c*5.5+2.75;if(Math.abs(f)<5||Math.abs(f)>42||n()<.42)continue;const d=n()<.16;t.setChunk("q"+i.quadOf(t.wx(f,-62),t.wz(f,-62))),WM(i,f+(n()-.5)*.5,-62+(d?.02:0),(n()<.5?0:Math.PI)+(n()-.5)*.04,zs(B(s[n()*s.length|0]),n,.06),d,n)}for(let c=0;c<8;c++){const f=-45.5+c*13+(n()-.5)*1.2,d=t.toWorld(f,0,-64.5);i.treeSpecs.push({x:d.x,z:d.z,y:0,type:"street",seed:5e3+a*100+c,scale:.85+n()*.2,role:"street"}),t.setChunk("q"+i.quadOf(d.x,d.z)),t.hq(e.plain,f-.7,-65.2,f+.7,-63.8,.012,B(4864040));for(const[u,p,v,m]of[[0,-.74,1.56,.09],[0,.74,1.56,.09],[-.74,0,.09,1.4],[.74,0,.09,1.4]])t.box(e.plain,f+u,.04,-64.5+p,v,.08,m,{c:B(10130828)})}for(const c of[-39,-13,13,39])t.setChunk("q"+i.quadOf(t.wx(c,-63.6),t.wz(c,-63.6))),qM(i,c,-63.6,0);for(const[c,f]of[[-27,"bin"],[24.5,"bin"],[-3.6,"bollard"],[3.6,"bollard"],[30,"hydrant"],[-34.5,"postbox"]]){if(t.setChunk("q"+i.quadOf(t.wx(c,-63.7),t.wz(c,-63.7))),f==="bin"&&(t.cyl(e.plain,[c,0,-63.9],[c,.9,-63.9],.26,.28,10,B(2500651),2,.55,1),t.cyl(e.metal,[c,.6,-63.9],[c,.68,-63.9],.285,.29,10,B(13214282),0),t.cbox(c,.45,-63.9,.52,.9,.52,"prop")),f==="bollard")for(const d of[-63.5,-52.5])t.cyl(e.plain,[c,0,d],[c,.85,d],.09,.075,8,B(2500651),0,.55,1),t.blob(e.plain,c,.88,d,.1,.08,.1,B(2500651),{seg:8,rings:4}),t.cyl(e.plain,[c,.6,d],[c,.68,d],.086,.084,8,B(15262416),0),t.ccap([c,0,d],[c,.85,d],.09,.09,"pole");f==="hydrant"&&(t.cyl(e.gloss,[c,0,-63.6],[c,.55,-63.6],.12,.1,8,B(13120810),0,.55,1),t.blob(e.gloss,c,.58,-63.6,.12,.1,.12,B(13120810),{seg:8,rings:4}),t.cyl(e.gloss,[c-.2,.36,-63.6],[c+.2,.36,-63.6],.05,.05,6,B(13120810),3),t.ccap([c,0,-63.6],[c,.55,-63.6],.13,.12,"prop")),f==="postbox"&&(t.cyl(e.gloss,[c,0,-64.2],[c,1.25,-64.2],.24,.24,12,B(12593194),0,.55,1),t.cyl(e.gloss,[c,1.25,-64.2],[c,1.42,-64.2],.27,.12,12,B(12593194),2),t.box(e.plain,c,1,-63.965,.22,.04,.02,{c:B(1710618)}),t.cbox(c,.7,-64.2,.46,1.4,.46,"prop"))}t.setChunk("base");const l=[];for(let c=0;c<5;c++)l.push(zc(i,-44+c*22,-51.6,0,{drum:c===1||c===3,lamp:c%2===0}));o.push(l);const h=[zc(i,51.6,-75,-Math.PI/2,{lamp:!0,h:8.8}),zc(i,51.6,-99,-Math.PI/2,{drum:!0,h:8.8})];i.extPoles[a]=h,t.pop()}const r=(a,l,h,c=!0,f=.03)=>{const d=a.out.distanceTo(l.out),u=Xn(i,a.out,l.out,{tag:h,sag:d*f});return Xn(i,a.in,l.in,{tag:h,sag:d*f}),i.spans.push(u),Xn(i,a.pin,l.pin,{tag:h,sag:d*f*.8,r:.025}),c&&Xn(i,a.comm,l.comm,{tag:h+"Comm",sag:d*f*1.25,r:.04}),u};for(let a=0;a<4;a++){const l=o[a],h=o[(a+1)%4];for(let d=0;d<4;d++)r(l[d],l[d+1],"ring");r(l[4],h[0],"ring");const c=i.extPoles[a],f=Xn(i,h[0].out,c[0].out,{tag:"cross",sag:1,pieces:6});Xn(i,h[0].in,c[0].in,{tag:"cross",sag:1,pieces:6}),i.crossWires.push(f),a===3&&(i.longWire=f),Xn(i,c[0].out,c[1].out,{tag:"side"}),Xn(i,c[0].in,c[1].in,{tag:"side"}),Xn(i,c[0].comm,c[1].comm,{tag:"sideComm",r:.04,sag:.9})}i.ringPoles=o}const ao=-97,Ln=-92.2;function Gc(i,t,e={}){const n=[];let s=0,o=0,r=0,a=0;for(;s<t-.01;){const h=t-s;let c=e.kinds?e.kinds[i()*e.kinds.length|0]:i()<.4?"terrace":i()<.55?"shop":"apt";if(e.force&&e.force[a]&&(c=e.force[a]),r++,a++,c==="terrace"){const f=6.2+i()*1.3;let d=2+(i()*3|0);if(d=Math.min(d,Math.floor(h/f)),d<1)c="apt";else{let u=2+(i()<.45?1:0);u===o&&(u=u===2?3:2);const p=10.2+i()*2,v=i()<.5,m=i();let g=f;h-d*f<6.5&&(g=h/d);for(let M=0;M<d;M++)n.push({u0:s+M*g,u1:s+(M+1)*g,kind:c,floors:u,d:p,gid:r,painted:v,hex:m,mirror:M%2===1,roof:"pitch"});s+=d*g,o=u}}if(c!=="terrace"){let f=(e.wMin||9)+i()*(e.wVar||5);e.forceW&&e.forceW[a-1]&&(f=e.forceW[a-1]),h-f<6.5&&(f=h);const d=e.minFloors||(c==="shop"?2:3),u=e.maxFloors||(c==="shop"?4:5);let p=d+(i()*(u-d+1)|0);p===o&&(p=p===u?d:p+1),n.push({u0:s,u1:s+f,kind:c,floors:p,d:(e.dMin||11)+i()*(e.dVar??2.5),gid:r,roof:"flat"}),s+=f,o=p}e.gaps!==!1&&t-s>16&&i()<(e.gapP||.5)&&(s+=2.4+i()*1.4,n[n.length-1].gapAfter=!0)}const l=n[n.length-1];return l.u1!==t&&(l.u1=t),n.forEach((h,c)=>{const f=n[c-1],d=n[c+1];h.expL=!f||f.gapAfter,h.expR=!d||!!h.gapAfter}),n}function Wc(i,t,e,n,s){const o=[],r=new Map;return e.forEach((a,l)=>{const h=a.kind==="shop";a.h=_m(a.floors,h);let c;a.kind==="terrace"?a.painted?c=hl(i,"terrace",t,{style:"painted"}):(r.has(a.gid)||r.set(a.gid,hl(i,"terrace",t,{style:"brick"})),c={...r.get(a.gid),door:t()*3|0,flowers:t()<.3}):c=hl(i,a.kind,t),a.st=c}),e.forEach((a,l)=>{const h=e[l-1],c=e[l+1],f=a.u1-a.u0,d=n((a.u0+a.u1)/2,a.d),u=$u(i,{x:d.x,z:d.z,yaw:d.yaw,w:f,d:a.d,floors:a.floors,kind:a.kind,roof:a.roof,st:a.st,mirror:a.mirror,expL:a.expL,expR:a.expR,hL:a.expL?0:h.h,hR:a.expR?0:c.h,detL:l===0&&s.detStart,detR:l===e.length-1&&s.detEnd,sideName:s.sideName,row:s.row,fire:t()<.55,fireSide:a.expR&&a.gapAfter&&t()<.35?"R":null,dormer:a.roof==="pitch"&&t()<.6,dormerX:(t()-.5)*1.5,sign:s.sign,noBack:s.noBack},t);u.lot=a,a.rec=u,o.push(u)}),o}function kc(i,t,e,n,s,o,r=1.8,a=!1){const l=i.b,h=i.mats,c=Math.hypot(n-t,s-e),f=Math.atan2(-(s-e),n-t);l.push((t+n)/2,0,(e+s)/2,f),l.sbox(h.wood,0,r/2,0,c,r,.07,"fence",{c:o,ao:[.6,1],tile:2},{noCamera:!0}),l.box(h.wood,0,r+.03,0,c+.04,.06,.13,{c:Le(o,.85),tile:2});const d=Math.max(1,Math.round(c/2.4));for(let u=0;u<=d;u++)l.box(h.wood,-c/2+u*c/d,r/2+.03,0,.11,r+.1,.13,{c:Le(o,.8),ao:[.6,1],tile:2});a&&c>6&&i.run("ground",[0,1,2,3].map(u=>l.toWorld(-2.4+u*1.6,r+.06+.25,0)),"fence"),l.pop()}function $M(i,t,e,n,s){const o=i.b,r=i.mats,a=zs(B([8018492,5925466,9062970,6975090][s()*4|0],1.2),s,.08);o.push(t,0,e,n),o.sbox(r.wood,0,1,0,2.4,2,1.9,"prop",{c:a,ao:[.6,1],tile:2},{tag:"shed"});const l={c:B(4869200,1.2),rot:[.16,0,0],tile:2};o.box(r.roofing,0,2.13,0,2.7,.09,2.3,l),o.cbox(0,2.13,0,2.7,.09,2.3,"roof",l,{tag:"shed"}),o.fq(r.wood,-.45,.05,.45,1.8,.955,Le(a,.7)),o.box(r.plain,.34,.95,.965,.05,.12,.03,{c:B(1842206)}),o.fq(r.atlas,-1,1.1,-.6,1.6,.955,[1,1,1],1,1,Cn.win[4]),i.run("ground",[o.toWorld(0,2.2+.28,0)],"shed"),o.pop()}function rh(i,t,e,n,s){const o=i.b,r=i.mats,a=B(s);o.push(t,0,e,n),o.sbox(r.plain,0,.5,0,.55,.95,.65,"prop",{c:a,ao:[.6,1]}),o.box(r.plain,0,1,.02,.6,.07,.72,{c:Le(a,.8),rot:[.08,0,0]}),o.pop()}function gc(i,t,e,n,s,o){const r=i.b,a=i.mats;r.push(t,e,n,o),r.sbox(a.wood,0,s/2,0,s,s,s,"prop",{c:B(12096608),ao:[.65,1],tile:.9}),r.pop()}function jM(i,t,e,n){const s=i.b,o=i.mats,r=B(11031866,1.1);s.push(t,0,e,n),s.sbox(o.wood,0,.45,0,1,.9,1.3,"prop",{c:r,ao:[.6,1],tile:1});for(const a of[-1,1]){const l={c:B(4869200,1.2),rot:[0,0,a*-.7],tile:2};s.box(o.roofing,a*.3,1.1,0,.85,.07,1.5,l),s.cbox(a*.3,1.1,0,.85,.07,1.5,"roof",l)}s.tri(o.wood,[-.5,.9,.65],[.5,.9,.65],[0,1.32,.65],[0,0],[1,0],[.5,.4],r),s.blob(o.plain,0,.36,.652,.24,.34,.02,B(789e3),{seg:8,rings:5,bottomAo:1}),s.box(o.plain,.9,.06,.9,.34,.12,.34,{c:B(13124911)}),s.pop()}function Kd(i,t,e,n,s){const o=i.b,r=i.mats;return o.scyl(r.metal,[t,e,n],[t,e+s,n],.035,.03,6,B(9080724),"pole",2,{tag:"mast"}),o.cyl(r.plain,[t,e+s-.16,n],[t,e+s-.02,n],.05,.045,6,B(14209732),2),o.toWorld(t,e+s-.1,n)}function qc(i,t,e,n,s){const o=i.b,r=i.mats;return o.box(r.plain,t,e,n+s*.06,.1,.16,.14,{c:B(2763822)}),o.cyl(r.plain,[t,e,n+s*.1],[t,e,n+s*.22],.045,.035,6,B(14209732),2),o.toWorld(t,e,n+s*.2)}function Zd(i,t,e,n){t.lot;const s=t.x-t.w/2,o=t.x+t.w/2,r=Math.max(s+.8,Math.min(o-.8,e)),a=t.z+n*t.d/2;return t.roof==="pitch"?{p:Kd(i,r,t.h+.7*Math.tan(t.pitch)-.1,a-n*.7,1.2),roof:!0}:t.h<=11.6?{p:Kd(i,r,t.h,a-n*.5,t.ph+1.2),roof:!0}:{p:qc(i,r,8.9,a,n),roof:!1}}function KM(i,t){const e=i.b,n=i.mats,s=on(100+t*17),o=bM[t],r=Gc(s,98,{force:{1:"apt"},forceW:{1:13.6}});for(const u of[-22,22]){const p=r.find(v=>v.u0-49<=u&&v.u1-49>=u);p&&p.kind!=="terrace"&&p.floors>3&&(p.floors=3)}const a=Wc(i,s,r,(u,p)=>({x:-49+u,z:-67-p/2,yaw:0}),{sideName:o,row:"front",detStart:!0,detEnd:!0}),l=Gc(s,98,{kinds:["apt"],minFloors:4,maxFloors:5,wMin:12,wVar:7,dMin:14,dVar:0,gapP:.35}),h=Wc(i,s,l,(u,p)=>({x:-49+u,z:ao-p/2,yaw:0}),{sideName:o,row:"back",detStart:!0,detEnd:!0});i.blocks[t]={front:a,back:h},e.setChunk("q"+i.quadOf(e.wx(-20,-95),e.wz(-20,-95))),e.hq(n.stone,-49,ao,0,Ln,0,B(10459018,1.2),1.3),e.setChunk("q"+i.quadOf(e.wx(20,-95),e.wz(20,-95))),e.hq(n.stone,0,ao,49,Ln,0,B(10459018,1.2),1.3),e.hq(n.paving,-49,-120,49,ao-14,0,B(11116950));const c=[9071176,6969928,8025192,6254426,10123858],f=r.reduce((u,p)=>p.kind!=="terrace"&&p.u1-p.u0>(u?u.u1-u.u0:0)?p:u,null);r.forEach((u,p)=>{const v=-49+u.u0,m=-49+u.u1,g=-67-u.d,M=(v+m)/2,T=m-v,E=r[p+1];e.setChunk("q"+i.quadOf(e.wx(M,-86),e.wz(M,-86)));const A=s()<.25,w=zs(B(c[s()*c.length|0],1.2),s,.08);A?e.hq(n.paving,v,Ln,m,g,0,B(10130056)):e.hq(n.grassTile,v,Ln,m,g,.012,zs(B(8231493,1.25),s,.1));const _=u===f;kc(i,v,Ln,m,Ln,w,1.8,s()<.35),e.box(n.wood,M+(s()-.5)*(T-3),.9,Ln,1,1.84,.1,{c:Le(w,.72),tile:2});const S=-67-(E&&!u.gapAfter?Math.min(u.d,E.d):u.d);if(kc(i,m-.035,Ln,m-.035,S,w,1.8,s()<.3),u.expL&&kc(i,v+.035,Ln,v+.035,g,w,1.8),_){jM(i,v+1.4,Ln+1.5,.4);for(const[x,y,b]of[[M-1,(Ln+g)/2+1,2.2],[v+2.6,Ln+3.2,1.5],[M+2.5,g-2.5,1.6]])e.cyl(n.plain,[x,.014,y],[x,.016,y],b,b*.96,12,B(9073488),2);for(let x=0;x<6;x++)e.box(n.stone,M+1.5+x%2*.25,.03,g-.9-x*1,.6,.06,.5,{c:B(11773068,1.2),tile:1,skip:"ny"});e.cyl(n.metal,[v+2.6,0,Ln+2.9],[v+2.6,.1,Ln+2.9],.16,.2,10,B(11580600),2),e.blob(n.gloss,M-1.2,.14,(Ln+g)/2+1.4,.14,.14,.14,B(14173487),{seg:8,rings:5});for(const[x,y]of[[m-1,g-1],[v+.9,g-1.2],[m-1.1,Ln+3.2]])for(let b=0;b<3;b++)e.blob(n.plain,x+Math.cos(b*2.1)*.4,.45,y+Math.sin(b*2.1)*.4,.5,.45,.5,b%2?B(5208628):B(6982198),{seg:8,rings:5,noise:.12,seed:b+x,top:B(9416778),bottomAo:.4});e.box(n.plain,m-.1,1.3,(Ln+g)/2,.03,.4,.62,{c:B(15255608)}),e.box(n.plain,m-.12,1.3,(Ln+g)/2,.03,.12,.46,{c:B(1842206)}),i.dogYards[t]={center:e.toWorld(M,0,(Ln+g)/2),radius:6,w:T,depth:g-Ln,corner:e.toWorld(m-1.2,.3,Ln+1.2)}}else{if(s()<.5&&$M(i,m-1.6,Ln+1.35,0,s),s()<.4&&T>6){const x=v+1.5,y=g-3.4;e.sbox(n.wood,x,.15,y,1.6,.3,3,"prop",{c:B(8018492),ao:[.6,1],tile:1.5}),e.hq(n.plain,x-.7,y-1.4,x+.7,y+1.4,.3,B(3811868));for(let b=0;b<5;b++)e.blob(n.plain,x+(b%2?.3:-.3),.42,y-1.1+b*.55,.22,.18,.22,b%3?B(5212732):B(9416778),{seg:6,rings:3,noise:.2,seed:b})}if(s()<.45){const x=g-2.2-s()*2,y=v+1,b=m-1;for(const C of[y,b])e.scyl(n.plain,[C,0,x],[C,2.1,x],.035,.035,5,B(9080724),"pole",2);Xn(i,e.toWorld(y,2.05,x),e.toWorld(b,2.05,x),{r:.02,sag:.12,pieces:3,tag:"washLow",clothes:11+p+t*10,col:B(14209732)})}}if(rh(i,v+.9+s()*2,g-.5,0,[3103290,3816512,3099242][s()*3|0]),u.gapAfter&&E){const x=m,y=-49+E.u0,b=(x+y)/2;e.hq(n.stone,x,Ln,y,-67,0,B(10721932,1.2),1.1),e.box(n.plain,x+.12,3.3,-72,.24,.1,.1,{c:B(2434858)}),e.box(n.glow,x+.3,3.2,-72,.2,.26,.2,{c:[1,.85,.6]}),e.box(n.plain,x+.3,3.36,-72,.3,.06,.3,{c:B(2434858)}),rh(i,x+.42,-70-s()*3,Math.PI/2,3816512),s()<.7&&(gc(i,y-.5,0,-73,.8,.2),gc(i,y-.48,.8,-67-6.05,.6,.5)),i.run("ground",[0,1,2,3].map(C=>e.toWorld(b,.25,-69-C*2.2)),"alley"),i.alleys.push({s:t,center:e.toWorld(b,0,-80),w:y-x})}});let d=0;r.forEach((u,p)=>{if((p+t)%2||d>=4)return;const v=-49+(u.u0+u.u1)/2+1.2,m=h.find(_=>_.x-_.w/2+1<v&&_.x+_.w/2-1>v);if(!m)return;const g=Math.min(u.h-.7,8.6),M=Math.min(m.h-.8,g+.5+s()*1.5),T=-67-u.d;e.setChunk("base");const E=qc(i,v,g,T,-1),A=qc(i,v,M,ao,1),w=Xn(i,E,A,{r:.022,sag:.45,pieces:5,tag:"wash",clothes:3+p*7+t*13,col:B(14209732)});i.washLines.push(w),d++});for(let u=0;u<5;u++){const p=-44+u*21+s()*6;e.setChunk("q"+i.quadOf(e.wx(p,-96),e.wz(p,-96))),h.some(v=>Math.abs(v.x-p)<v.w/2)&&(u%2?rh(i,p,ao+.45,0,3816512):(gc(i,p,0,ao+.5,.9,.1),gc(i,p+1,0,ao+.45,.7,-.2)))}}function ZM(i){const t=i.b;for(let e=0;e<4;e++)t.push(0,0,0,xs[e]),KM(i,e),t.pop()}function JM(i){const t=i.b;t.setChunk("base");for(let e=0;e<4;e++){t.push(0,0,0,xs[e]);const{front:n,back:s}=i.blocks[e],o=(a,l)=>a.find(h=>h.x-h.w/2<=l&&h.x+h.w/2>=l)||a.reduce((h,c)=>Math.abs(c.x-l)<Math.abs(h.x-l)?c:h);i.ringPoles[e].forEach((a,l)=>{const h=-44+l*22,c=o(n,h),f=Zd(i,c,h,1),d=Xn(i,a.drop,f.p,{tag:"drop",sag:.45,pieces:5});d.roof=f.roof,d.rec=c,a.dropWire=d,e===0&&f.roof&&(l===1||l===3&&!i.landmarks.firstPole)&&(i.landmarks.firstPole=a.top.clone(),i.landmarks.firstRoof=c.toWorld(Math.max(-c.w/2+1,Math.min(c.w/2-1,h-c.x)),c.top+.05,c.roof==="flat"?c.d/2-1.5:0),i.firstDrop=d)});const r=[-37,-12.5,12.5,37].map((a,l)=>zc(i,a,-93,0,{h:8.2,drum:l===2,lamp:l===1}));for(let a=0;a<3;a++)Xn(i,r[a].out,r[a+1].out,{tag:"lane"}),Xn(i,r[a].in,r[a+1].in,{tag:"lane"}),Xn(i,r[a].comm,r[a+1].comm,{tag:"laneComm",r:.04,sag:.9});r.forEach((a,l)=>{const h=[-37,-12.5,12.5,37][l],c=o(n,h),f=Zd(i,c,h+1.5,-1);Xn(i,a.dropIn,f.p,{tag:"laneDrop",sag:.35,pieces:4});const d=o(s,h);Math.abs(d.x-h)<d.w/2-.5&&Xn(i,a.drop,qc(i,h-.6,Math.min(d.h-1,9.6),ao,1),{tag:"laneDrop",sag:.1,pieces:3})}),i.lanePoles[e]=r,t.pop()}}const QM=(i,t,e)=>new k(i,t,e),Bo=B(2434858);function e0(i,t,e,n,s){i.b;const o=Gc(e,116-n,{gapP:.3,dMin:11,dVar:2}),r=Wc(i,e,o,(h,c)=>({x:n+h,z:-67-c/2,yaw:0}),{sideName:"corner",row:"corner",detStart:!0,detEnd:!0}),a=Gc(e,s+116,{gapP:.3,dMin:11,dVar:2}),l=Wc(i,e,a,(h,c)=>({x:Xe.B0+c/2,z:-116+h,yaw:-Math.PI/2}),{sideName:"corner",row:"corner",detStart:!0,detEnd:!0});i.corners[t]={ra:r,rb:l}}function tb(i,t,e,n,s){const o=i.b,r=i.mats;o.scyl(r.wood,[t,0,e],[t,2.55,e],.035,.03,6,B(12096616),"pole",0),o.cyl(r.cloth,[t,2.2,e],[t,2.6,e],1.45,.06,8,n,3),o.cbox(t,2.36,e,2.1,.1,2.1,"awning",null,{tag:"parasol"}),o.cbox(t,2.36,e,2.1,.1,2.1,"awning",{yaw:Math.PI/4},{tag:"parasol"}),o.cyl(r.plain,[t,0,e],[t,.08,e],.3,.26,8,Bo,2),s?i.golden.push({pos:o.toWorld(t,2.62+.3,e),where:"special",name:"On top of the cafe parasol"}):i.run("special",[o.toWorld(t,2.62+.28,e)],"parasol")}function eb(i,t,e,n){const s=i.b,o=i.mats;s.cyl(o.plain,[t,0,e],[t,.72,e],.04,.04,6,Bo,0),s.cyl(o.plain,[t,0,e],[t,.04,e],.24,.22,8,Bo,2),s.cyl(o.plain,[t,.72,e],[t,.76,e],.42,.42,12,B(15262422),3),s.cbox(t,.74,e,.72,.05,.72,"prop");const r=2+(n()*2|0),a=n()*6.28;for(let l=0;l<r;l++){const h=a+l*6.283/r,c=t+Math.cos(h)*.78,f=e+Math.sin(h)*.78,d=Math.atan2(t-c,e-f),u=B(3107402);s.push(c,0,f,d),s.sbox(o.plain,0,.45,0,.42,.04,.42,"prop",{c:u}),s.box(o.plain,0,.72,-.2,.42,.42,.03,{c:u});for(const[p,v]of[[-.18,-.18],[.18,-.18],[-.18,.18],[.18,.18]])s.box(o.plain,p,.22,v,.03,.45,.03,{c:Bo});s.pop()}n()<.5&&s.cyl(o.plain,[t+.1,.76,e],[t+.1,.86,e+.02],.04,.045,6,B(15854558),2)}function nb(i,t,e,n,s,o){const r=i.b,a=i.mats,l=B(11569750);r.push(t,0,e,n),r.sbox(a.wood,0,.5,0,2.8,1,1,"prop",{c:l,ao:[.6,1],tile:1.2});for(const f of[-1.4,1.4])r.scyl(a.wood,[f,0,-.55],[f,2.75,-.55],.04,.04,5,l,"pole",0),r.scyl(a.wood,[f,0,.75],[f,2.2,.75],.04,.04,5,l,"pole",0);const h={c:s,rot:[.4,0,0],tile:.56};r.box(a.cloth,0,2.5,.12,3.2,.05,1.7,h),r.cbox(0,2.5,.12,3.2,.05,1.7,"awning",h),r.fq(a.cloth,-1.6,1.95,1.6,2.17,.9,s,.9,1);const c=[B(14173487),B(15245360),B(7313978),B(13156416),B(9058906),B(14735552)];for(let f=0;f<4;f++){const d=-1.05+f*.7,u=c[o()*c.length|0];r.box(a.wood,d,1.08,.05,.6,.16,.8,{c:B(9071172),rot:[.18,0,0],tile:.8});for(let p=0;p<6;p++)r.blob(a.plain,d-.18+p%3*.18,1.2+(p/3|0)*.02,-.15+(p/3|0)*.3,.1,.09,.1,u,{seg:6,rings:3})}i.run("special",[r.toWorld(-.9,2.5+.3,.12),r.toWorld(0,2.5+.3,.12),r.toWorld(.9,2.5+.3,.12)],"stall"),r.pop()}function ib(i,t,e,n){const s=i.b,o=i.mats,r=8,a=5,l=2.3,h=B(15854558),c=[.8,.95,.92];s.push(t,0,e,n);for(const[d,u,p,v]of[[0,a/2-.1,r,.2],[0,-a/2+.1,r,.2],[-r/2+.1,0,.2,a-.4],[r/2-.1,0,.2,a-.4]])s.box(o.brick,d,.3,u,p,.6,v,{c:Le(B(10242614),1.35),ao:[.6,1]});s.cbox(0,l/2,0,r,l,a,"building",null,{tag:"greenhouse"});const f=(d,u,p,v,m,g,M=.06)=>s.cyl(o.plain,[d,u,p],[v,m,g],M/2,M/2,4,h,0);for(let d=0;d<=8;d++){const u=-r/2+d;for(const p of[-1,1])f(u,.6,p*a/2,u,l,p*a/2),f(u,l,p*a/2,u,l+1.25,0)}for(const d of[-1,1])f(-r/2,l,d*a/2,r/2,l,d*a/2,.08),f(-r/2,1.45,d*a/2,r/2,1.45,d*a/2,.04);f(-r/2,l+1.25,0,r/2,l+1.25,0,.1);for(const d of[-1,1])f(d*r/2,.6,0,d*r/2,l+1.25,0),f(d*r/2,.6,-a/4,d*r/2,l+.62,-a/4),f(d*r/2,.6,a/4,d*r/2,l+.62,a/4);for(const d of[-1,1]){s.quad(o.pane,d>0?[-r/2,.6,a/2]:[r/2,.6,-a/2],d>0?[r/2,.6,a/2]:[-r/2,.6,-a/2],d>0?[r/2,l,a/2]:[-r/2,l,-a/2],d>0?[-r/2,l,a/2]:[r/2,l,-a/2],null,c),s.quad(o.pane,d>0?[-r/2,l,a/2]:[r/2,l,-a/2],d>0?[r/2,l,a/2]:[-r/2,l,-a/2],d>0?[r/2,l+1.25,0]:[-r/2,l+1.25,0],d>0?[-r/2,l+1.25,0]:[r/2,l+1.25,0],null,c);const u=Math.atan2(1.25,a/2),p=Math.hypot(1.25,a/2),v=a/2*Math.sin(u);s.cbox(0,l+.625-Math.cos(u)*v/2,d*a/4-d*Math.sin(u)*v/2,r,v,p,"roof",{rot:[d*u,0,0]},{tag:"greenhouse"})}for(const d of[-1,1])s.quad(o.pane,d>0?[r/2,.6,a/2]:[-r/2,.6,-a/2],d>0?[r/2,.6,-a/2]:[-r/2,.6,a/2],d>0?[r/2,l,-a/2]:[-r/2,l,a/2],d>0?[r/2,l,a/2]:[-r/2,l,-a/2],null,c);for(let d=0;d<7;d++)for(const u of[-1.4,1.4]){const p=-3.3+d*1.1;s.box(o.plain,p,.75,u,.5,.3,.5,{c:B(11031866)}),s.blob(o.plain,p,1.2,u,.35,.45,.35,[B(5212732),B(8036416),B(4160074)][d%3],{seg:6,rings:4,noise:.2,seed:d})}s.hq(o.plain,-r/2+.2,-a/2+.2,r/2-.2,a/2-.2,.02,B(6969928)),i.run("roof",[-3,-1.5,0,1.5,3].map(d=>s.toWorld(d,l+1.25+.3,0)),"greenhouse"),i.landmarks.greenhouse=s.toWorld(0,l+1.25,0),s.pop()}function sb(i,t,e){const n=i.b,s=i.mats;e0(i,t,e,92,-96),n.setChunk("q"+i.quadOf(n.wx(75,-75),n.wz(75,-75)));const o=hl(i,"shop",e,{style:"stucco",hex:15260864});o.awn=B(12072234),o.band=!0;const r=$u(i,{x:75,z:-88.5,yaw:0,w:15,d:12,floors:3,kind:"shop",roof:"flat",st:o,expL:!0,expR:!0,detL:!0,detR:!0,sideName:"corner",row:"cafe",sign:2,fire:!0},e);n.hq(s.stone,67,-82.5,91,-67,.014,B(13219994,1.25),1);const a=[B(12072234),B(15262416),B(3107402)];[[70.5,-71],[74.5,-70.2],[78.8,-71.4],[71,-76],[75.6,-75.2],[79.6,-76.6],[72.6,-79.6],[78,-80]].forEach(([c,f],d)=>{eb(i,c,f,e),d%3===0&&tb(i,c+.9,f+.5,a[d%3===0?d/3%3|0:0],d===3)});for(const[c,f,d,u]of[[67.6,-72,.7,5],[67.6,-79.5,.7,4],[72,-67.6,5,.7],[79.5,-67.6,4,.7]]){n.sbox(s.wood,c,.3,f,d,.6,u,"prop",{c:B(8018492),ao:[.6,1],tile:1.2});const p=Math.round(Math.max(d,u)/.9);for(let v=0;v<p;v++){const m=(v+.5)/p-.5;n.blob(s.plain,c+(d>u?m*d:0),.82,f+(d>u?0:m*u),.5,.4,.44,v%3===1?B(11027498):B(5208628),{seg:9,rings:6,noise:.1,seed:v+c,top:v%3===1?B(14187051):B(9416778)})}}n.push(81.6,0,-81.2,-.4),n.box(s.plain,0,.5,0,.6,1,.05,{c:B(2500651),rot:[-.2,0,0]}),n.box(s.wood,0,.5,-.01,.68,1.08,.04,{c:B(11569750),rot:[-.2,0,0]}),n.pop();for(const c of[68.6,81.4]){const f=cl(i,c,-68.4,{h:3.6});Xn(i,QM(f.x,f.y-.7,f.z),r.toWorld(c-75,4,6.1),{sag:.6,pieces:5,r:.02,tag:"lights",bulbs:10})}const h=[B(3104655),B(14723120),B(3107402)];for(let c=0;c<3;c++)nb(i,87.6,-70.4-c*4.2,-Math.PI/2,h[c],e);n.hq(s.grassTile,84,-112,114,-84,.016,B(8231493,1.25)),ib(i,100,-99,0);for(let c=0;c<4;c++){const f=88+c*3.4;n.sbox(s.wood,f,.2,-90,2.4,.4,1.2,"prop",{c:B(8018492),ao:[.6,1],tile:1.2});for(let d=0;d<4;d++)n.blob(s.plain,f-.8+d*.55,.52,-90,.24,.22,.3,d%2?B(5212732):B(10137672),{seg:6,rings:3,noise:.2,seed:d+c})}i.landmarks.cafe=n.toWorld(75,0,-75),i.landmarks.market=n.toWorld(87.6,0,-74.6),i.zonesRaw.push({center:n.toWorld(75,0,-75),radius:7,kind:"terrier",name:"Cafe terrace"})}function ob(i,t,e){const n=i.b,s=i.mats,o=B(12760218,1.25),r=B(9077104,1.2),a=B(5200486,1.3);e0(i,t,e,94,-93),n.setChunk("q"+i.quadOf(n.wx(78,-78),n.wz(78,-78))),n.hq(s.grassTile,67,-92,93,-67,.016,B(7311424,1.25));const l=81.5,h=-79.5,c=19,f=10,d=8.5,u=.9;n.push(l,0,h,0),n.sbox(s.stone,0,d/2,0,c,d,f,"building",{c:o,ao:[.62,1],skip:"py ny"},{tag:"church"}),n.box(s.stone,0,.4,0,c+.3,.8,f+.3,{c:r,ao:[.6,1],skip:"py ny"});const p=f/2*Math.tan(u),v=d+p,m=.3,g=(f/2+m)/Math.cos(u),M=f/2*Math.sin(u);for(const b of[1,-1]){const C=b*(f/2+m)/2,L=v-(f/2+m)/2*Math.tan(u),R=[b*u,0,0];n.box(s.tiles,0,L-.06*Math.cos(u),C-b*.06*Math.sin(u),c+.5,.12,g,{c:a,rot:R}),n.cbox(0,L-Math.cos(u)*M/2,C-b*Math.sin(u)*M/2,c+.5,M,g,"roof",{rot:R},{tag:"church"});for(let U=0;U<5;U++){const I=-c/2+2.6+U*3.45;if(n.quad(s.atlas,b>0?[I-.7,2.6,f/2+.012]:[I+.7,2.6,-f/2-.012],b>0?[I+.7,2.6,f/2+.012]:[I-.7,2.6,-f/2-.012],b>0?[I+.7,6.4,f/2+.012]:[I-.7,6.4,-f/2-.012],b>0?[I-.7,6.4,f/2+.012]:[I+.7,6.4,-f/2-.012],Cn.stained),n.sbox(s.plain,I,2.5,b*(f/2+.16),1.7,.12,.34,"ledge",{c:r}),U<4){const X=I+1.72;n.sbox(s.stone,X,3,b*(f/2+.4),.6,6,.8,"building",{c:o,ao:[.6,1],tile:1.4});const Y={c:r,rot:[b*.9,0,0]};n.box(s.plain,X,6.15,b*(f/2+.33),.66,.1,1,Y)}}}n.box(s.plain,0,v+.06,0,c+.5,.14,.3,{c:Le(a,.7)});const T=2;for(const b of[-1,1]){const C=b*c/2,L=b*f/2;n.tri(s.stone,[C,d,L],[C,d,-L],[C,v,0],[(L+f/2)/T,d/T],[(-L+f/2)/T,d/T],[f/2/T,v/T],o,1,1,.9)}n.quad(s.atlas,[c/2+.012,5.6,1.1],[c/2+.012,5.6,-1.1],[c/2+.012,7.8,-1.1],[c/2+.012,7.8,1.1],Cn.round),n.box(s.plain,c/2,v+.6,0,.1,1,.1,{c:r}),n.box(s.plain,c/2,v+.75,0,.1,.1,.6,{c:r}),i.run("roof",[-7,-4.2,-1.4,1.4,4.2,7].map(b=>n.toWorld(b,v+.13+.25,0)),"ridge"),n.pop();const E=70.8,A=-71.2,w=5.4,_=19;n.push(E,0,A,0),n.sbox(s.stone,0,_/2,0,w,_,w,"building",{c:o,ao:[.62,1],skip:"ny"},{tag:"tower"}),n.box(s.stone,0,.5,0,w+.4,1,w+.4,{c:r,ao:[.6,1],skip:"ny"});for(const b of[7,13.2,_-.2])n.box(s.plain,0,b,0,w+.36,.24,w+.36,{c:r,ao:[.75,1]}),n.cbox(0,b,0,w+.36,.24,w+.36,"ledge");for(let b=0;b<4;b++){n.push(0,0,0,b*Math.PI/2),n.fq(s.atlas,-1.35,14,1.35,16.7,w/2+.014,[1,1,1],1,1,Cn.clock);for(const C of[-.8,.8]){n.fq(s.plain,C-.42,9,C+.42,11.8,w/2+.012,B(1711136));for(let L=9.2;L<11.8;L+=.36)n.box(s.plain,C,L,w/2+.05,.84,.06,.14,{c:r,rot:[.5,0,0]});n.box(s.plain,C,8.92,w/2+.1,1,.1,.22,{c:r})}if(b===0){n.fq(s.atlas,-1,.06,1,3.6,w/2+.2,[.9,.8,.7],1,1,Cn.door[0]),n.box(s.stone,0,3.85,w/2+.1,2.6,.4,.24,{c:r});for(const C of[-1.2,1.2])n.box(s.stone,C,1.9,w/2+.1,.36,3.8,.24,{c:r,ao:[.6,1]});n.sbox(s.stone,0,.1,w/2+.7,3,.2,1,"prop",{c:o})}else n.fq(s.atlas,-.55,2.4,.55,5.4,w/2+.012,[1,1,1],1,1,Cn.stained);for(const C of[-1.35,0,1.35])n.sbox(s.stone,C,_+.35,w/2-.2,.9,.7,.4,"building",{c:o,tile:1.4});n.sbox(s.stone,w/2-.3,_+.8,w/2-.3,.6,1.6,.6,"building",{c:o,tile:1.4}),n.cyl(s.plain,[w/2-.3,_+1.6,w/2-.3],[w/2-.3,_+2.7,w/2-.3],.36,.02,4,r,0),n.pop()}const S=_+.1,x=30,y=2.25;n.cyl(s.tiles,[0,S,0],[0,x,0],y,.07,8,a,0,.8,1),n.cyl(s.plain,[0,S-.1,0],[0,S+.25,0],y+.22,y+.05,8,r,3),n.ccap([0,S+.1,0],[0,x-.1,0],y*.95,.1,"roof",{tag:"spire"}),n.blob(s.metal,0,x+.12,0,.22,.22,.22,B(14201941),{seg:10,rings:6}),n.ccap([0,x+.1,0],[0,x+.14,0],.22,.22,"prop",{tag:"finial"}),n.cyl(s.metal,[0,x+.3,0],[0,x+1.3,0],.03,.02,5,B(14201941),2),n.box(s.metal,0,x+.95,0,.5,.05,.05,{c:B(14201941)}),i.golden.push({pos:n.toWorld(0,x+.36+.3,.28),where:"special",name:"Top of the steeple"}),i.landmarks.steeple=n.toWorld(0,x+.35,0),i.run("roof",[[-2,-2.3],[0,-2.5],[2,-2.3]].map(([b,C])=>n.toWorld(b,_+.25,C)),"tower"),n.pop();for(const[b,C,L,R]of[[74,-67.4,93,-67.4],[67.4,-75,67.4,-92]]){const U=Math.hypot(L-b,R-C);n.push((b+L)/2,0,(C+R)/2,Math.atan2(-(R-C),L-b)),n.sbox(s.stone,0,.4,0,U,.8,.4,"wall",{c:o,ao:[.6,1]}),n.box(s.plain,0,.84,0,U,.08,.5,{c:r}),n.pop()}for(let b=0;b<9;b++){const C=70+b%3*2+e()*.5,L=-80-(b/3|0)*2.6-e()*.6;n.push(C,0,L,(e()-.5)*.3),n.sbox(s.stone,0,.45,0,.6,.9,.14,"prop",{c:zs(r,e,.15),rot:[(e()-.5)*.12,0,(e()-.5)*.1],tile:1.2}),n.blob(s.stone,0,.92,0,.3,.2,.07,r,{seg:8,rings:4}),n.pop()}for(const[b,C]of[[76.5,-71],[90.5,-71.5],[89.5,-88]]){const L=n.toWorld(b,0,C);i.treeSpecs.push({x:L.x,z:L.z,y:0,type:"pine",seed:7e3+b,scale:.8,role:"yard"})}i.landmarks.church=n.toWorld(l,0,h)}function rb(i,t,e){const n=i.b,s=i.mats,o=B(11907238,1.1),r=B(14725168),a=B(4157343);e0(i,t,e,93,-93),n.setChunk("q"+i.quadOf(n.wx(79,-79),n.wz(79,-79))),n.hq(s.grassTile,67,-92,92,-67,.016,B(10127970,1.15));for(const[x,[y,b,C,L]]of[[67.3,-67.3,74,-67.3],[80,-67.3,91.6,-67.3],[91.6,-67.3,91.6,-91.6],[91.6,-91.6,67.3,-91.6],[67.3,-91.6,67.3,-67.3]].entries())kc(i,y,b,C,L,x%2?a:B(15262416),2.3);const l=79,h=-81,c=16,f=13,d=[.25,3.5,6.75,10];n.push(l,0,h,0),d.forEach((x,y)=>{n.sbox(s.stucco,0,x-.15,0,c,.3,f,"building",{c:o,ao:[.75,1]},{tag:"slab"})});for(let x=0;x<4;x++)for(let y=0;y<3;y++){const b=-c/2+.5+x*(c-1)/3,C=-f/2+.5+y*(f-1)/2;n.sbox(s.stucco,b,5,C,.5,10,.5,"building",{c:Le(o,.92),ao:[.6,1]});for(let L=0;L<4;L++)n.cyl(s.plain,[b-.15+L%2*.3,10,C-.15+(L/2|0)*.3],[b-.15+L%2*.3,10.9,C-.15+(L/2|0)*.3],.015,.015,3,B(9062954),0)}n.sbox(s.stucco,4.5,5.6,-3.5,3.2,11.2,3.2,"building",{c:Le(o,.85),ao:[.6,1]},{tag:"core"});const u=f/2+.35,p=f/2+1.45,v=[2.3,4.5,6.7,8.9];for(let x=0;x<=6;x++){const y=-c/2+x*c/6;for(const b of[u,p])n.scyl(s.metal,[y,0,b],[y,10.6,b],.03,.03,5,B(10133670),"pole",0,{tag:"scaffold"});for(const b of v)n.cyl(s.metal,[y,b-.08,u],[y,b-.08,p],.025,.025,4,B(10133670),0)}for(const x of v)n.sbox(s.wood,0,x,(u+p)/2,c,.05,1,"prop",{c:B(13215864),tile:1.5},{noCamera:!0,tag:"scaffold"}),n.scyl(s.metal,[-c/2,x+1,p],[c/2,x+1,p],.025,.025,4,B(10133670),"rail",0),n.cyl(s.metal,[-c/2,x+.5,p],[c/2,x+.5,p],.02,.02,4,B(10133670),0);for(let x=0;x<6;x+=2){const y=-c/2+x*c/6,b=y+c/6;for(let C=0;C<4;C++)n.cyl(s.metal,[C%2?b:y,C?v[C-1]:0,p+.03],[C%2?y:b,v[C],p+.03],.02,.02,4,B(10133670),0)}n.quad(s.pane,[-c/2,4.5,p+.06],[0,4.5,p+.06],[0,10.4,p+.06],[-c/2,10.4,p+.06],null,[.3,.75,.45]),v.forEach((x,y)=>{const b=c/2-1-y%2*2.2,C=y?v[y-1]:0;for(const L of[-.2,.2])n.scyl(s.metal,[b+L,C,p-.2],[b+L,x+1,u+.25],.022,.022,4,B(14209732),"rail",0)}),i.run("roof",v.map((x,y)=>n.toWorld(-c/2+2+y*3.2,x+.3,(u+p)/2)),"scaffold"),i.run("roof",[-6,-3,0,3].map(x=>n.toWorld(x,10+.25,3)),"slab"),i.landmarks.scaffold=n.toWorld(0,9,p),n.pop();const m=87.2,g=-71.6,M=23,T=3.86;n.push(m,0,g,0),n.sbox(s.stucco,0,.5,0,3.2,1,3.2,"prop",{c:o,ao:[.6,1]}),n.cbox(0,M/2+.5,0,1.4,M-1,1.4,"building",null,{tag:"crane"});for(const[x,y]of[[1,1],[1,-1],[-1,1],[-1,-1]])n.box(s.gloss,x*.65,M/2+.5,y*.65,.12,M-1,.12,{c:r});for(let x=1;x<M-.5;x+=1.4)for(let y=0;y<4;y++)n.push(0,0,0,y*Math.PI/2),n.box(s.gloss,0,x+.7,.65,1.9,.06,.06,{c:r,rot:[0,0,(Math.round(x/1.4)+y)%2?.82:-.82]}),n.box(s.gloss,0,x,.65,1.3,.06,.06,{c:r}),n.pop();n.push(0,M,0,T),n.sbox(s.gloss,0,.4,0,1.9,.8,1.9,"building",{c:Le(r,.8)},{tag:"crane"}),n.sbox(s.gloss,.2,1.5,1.2,1.5,1.5,1.3,"building",{c:B(15262416)},{tag:"crane"}),n.fq(s.gloss,-.45,1.05,.85,2.1,1.86,B(1844784));const E=23,A=7.5,w=1.6;n.cbox(E/2+.5,w+.45,0,E,1,.9,"building",null,{tag:"jib"}),n.cbox(-A/2-.5,w+.2,0,A,.5,1,"building",null,{tag:"jib"});for(const x of[-.42,.42])n.box(s.gloss,E/2+.5,w,x,E,.1,.1,{c:r}),n.box(s.gloss,-A/2-.5,w,x,A,.1,.1,{c:r});n.box(s.gloss,E/2+.5,w+.9,0,E,.1,.1,{c:r});for(let x=.5;x<E+.4;x+=1.15){const y=Math.round(x/1.15)%2;for(const b of[-.42,.42])n.cyl(s.gloss,[x,y?w:w+.9,y?b:0],[x+1.15,y?w+.9:w,y?0:b],.03,.03,4,r,0);n.cyl(s.gloss,[x,w,-.42],[x,w,.42],.025,.025,4,r,0)}for(let x=-.5;x>-A;x-=1.2)n.cyl(s.gloss,[x,w,-.42],[x-1.2,w,.42],.03,.03,4,r,0);for(let x=0;x<3;x++)n.sbox(s.stucco,-A+.4+x*.75,w-.5,0,.6,1.2,1.3,"building",{c:Le(o,.8)});n.scyl(s.gloss,[0,.8,0],[0,5.6,0],.09,.06,6,r,"pole",2);const _=(x,y)=>{n.cyl(s.plain,x,y,.03,.03,4,Bo,0),n.ccap(x,y,.03,.03,"wire",{tag:"tie"})};_([0,5.5,0],[E*.62,w+.95,0]),_([0,5.5,0],[-A,w+.25,0]);const S=15.5;n.box(s.plain,S,w-.15,0,1,.2,.9,{c:Bo}),n.scyl(s.plain,[S,w-.2,0],[S,w-9.5,0],.03,.03,4,Bo,"wire",0,{tag:"cable"}),n.sbox(s.gloss,S,w-9.8,0,.5,.6,.3,"prop",{c:r});for(const[x,y]of[[.7,.5],[.7,-.5],[-.7,.5],[-.7,-.5]])n.cyl(s.plain,[S,w-10.1,0],[S+x,w-11.3,y],.012,.012,3,Bo,0);n.sbox(s.brick,S,w-11.8,0,1.5,1,1.1,"prop",{c:Le(B(11887946),1.35)},{tag:"load"}),n.sbox(s.wood,S,w-12.36,0,1.6,.12,1.2,"prop",{c:B(13215864)}),i.golden.push({pos:n.toWorld(E+.2,w+.95+.33,0),where:"special",name:"Tip of the crane"}),i.run("special",[6,9,12,15,18].map(x=>n.toWorld(x,w+.95+.3,0)),"jib"),i.run("special",[n.toWorld(S,w-11.3+.28,0)],"load"),i.landmarks.crane=n.toWorld(E*.5,w+1,0),n.pop(),n.pop(),n.sbox(s.plain,99,1.35,-86.5,6.2,2.5,2.6,"prop",{c:B(14735560),ao:[.6,1]},{tag:"cabin"}),n.box(s.plain,99,2.64,-86.5,6.4,.08,2.8,{c:B(9080724)}),n.fq(s.atlas,96.6,.25,97.5,2.2,-85.19,[1,1,1],1,1,Cn.door[1]),n.fq(s.atlas,99,1.1,100.4,2.1,-85.19,[1,1,1],1,1,Cn.win[5]);for(let x=0;x<3;x++){const y=96+x%2*1.15+(x===2?.57:0),b=x===2?1.55:.56;n.cyl(s.stucco,[y,b,-104],[y,b,-99.5],.56,.56,12,o,3),n.cyl(s.plain,[y,b,-99.49],[y,b,-99.48],.46,.46,12,B(1710620),2),n.ccap([y,b,-103.5],[y,b,-100],.56,.56,"prop",{tag:"pipe"})}n.blob(s.plain,106,.2,-100,2.6,1.3,2.2,B(14205072),{seg:10,rings:5,noise:.08,seed:4,top:B(15258788),bottomAo:.7}),n.ccap([105.6,0,-100],[106.4,0,-100],1.25,1.25,"prop",{tag:"sand"});for(const[x,y]of[[104,-90],[106,-90.3],[104.4,-92.4]])n.sbox(s.wood,x,.07,y,1.3,.14,1.1,"prop",{c:B(13215864)}),n.sbox(s.brick,x,.55,y,1.2,.82,1,"prop",{c:Le(B(11887946),1.35),ao:[.7,1]});i.zonesRaw.push({center:n.toWorld(101,0,-96),radius:8,kind:"shepherd",name:"Building site yard"}),i.landmarks.site=n.toWorld(79,0,-81)}function ab(i,t,e){const n=i.b,s=i.mats;e0(i,t,e,93,-92),n.setChunk("q"+i.quadOf(n.wx(79,-78),n.wz(79,-78)));const o=hl(i,"apt",e,{style:"brick",hex:9062970});o.band=!0,o.sills=!0;const a=$u(i,{x:79.5,z:-78.5,yaw:0,w:23,d:19,floors:4,kind:"apt",roof:"flat",st:o,expL:!0,expR:!0,detL:!0,detR:!0,sideName:"corner",row:"warehouse",fire:!0,ph:.8},e).h;n.push(79.5-4.5,a,-78.5+1.5,.35);const l=6.2,h=2.35,c=3.5,f=B(3820114),d=B(11031866,1.1),u=[[1,1],[1,-1],[-1,1],[-1,-1]];for(const[m,g]of u)n.scyl(s.metal,[m*2.2,0,g*2.2],[m*1.55,l,g*1.55],.1,.09,6,f,"pole",0,{tag:"towerLeg"});for(let m=0;m<4;m++){const g=u[[0,1,3,2][m]],M=u[[1,3,2,0][m]];for(const[T,E]of[[2,.895],[4.1,.785]])n.scyl(s.metal,[g[0]*2.2*E,T,g[1]*2.2*E],[M[0]*2.2*E,T,M[1]*2.2*E],.05,.05,5,f,"rail",0,{tag:"towerBrace"});n.scyl(s.metal,[g[0]*2.2,.1,g[1]*2.2],[M[0]*2.2*.895,2,M[1]*2.2*.895],.03,.03,4,f,"rail",0),n.scyl(s.metal,[g[0]*2.2*.895,2,g[1]*2.2*.895],[M[0]*2.2*.785,4.1,M[1]*2.2*.785],.03,.03,4,f,"rail",0),n.scyl(s.metal,[g[0]*2.2*.785,4.1,g[1]*2.2*.785],[M[0]*1.55,l,M[1]*1.55],.03,.03,4,f,"rail",0)}n.cyl(s.metal,[0,l-.1,0],[0,l+.12,0],h+.25,h+.25,16,f,3),n.cyl(s.gloss,[0,l+.12,0],[0,l+.12+c,0],h,h,16,d,0,.7,1);for(const m of[.5,1.75,3])n.cyl(s.metal,[0,l+.12+m,0],[0,l+.24+m,0],h+.02,h+.02,16,f,0);n.cyl(s.gloss,[0,l+.12+c,0],[0,l+.27+c,0],h+.14,h+.1,16,Le(d,.8),3),n.cyl(s.gloss,[0,l+.27+c,0],[0,l+.5+c,0],.5,.45,10,Le(d,.7),2);const p=l+.27+c;n.ccyl(0,0,l-.1,p,h+.06,"prop",{tag:"waterTower"}),n.cbox(0,p+.12,0,.8,.24,.8,"prop",null,{tag:"waterTower"}),n.cyl(s.plain,[0,l+1.2,0],[0,l+2.3,0],h+.008,h+.008,16,B(15262416),0);for(const m of[-.2,.2])n.scyl(s.metal,[m,0,2.2+.25],[m,p+.8,h+.12],.025,.025,4,B(13225168),"rail",0,{tag:"ladder"});for(let m=.3;m<p+.6;m+=.32){const g=m/(p+.8),M=2.45+(h+.12-2.45)*g;n.cyl(s.metal,[-.2,m,M],[.2,m,M],.014,.014,4,B(13225168),0)}i.golden.push({pos:n.toWorld(.9,p+.3,-.6),where:"special",name:"Roof of the water tower"}),i.landmarks.waterTower=n.toWorld(0,p,0),i.run("special",[0,1,2,3].map(m=>n.toWorld(Math.cos(m*1.2)*1.9,p+.26,Math.sin(m*1.2)*1.9)),"tank"),n.pop();const v=[B(3107466),B(12076335),B(4880970)];[[100,-93,.05],[100.4,-96.2,-.03],[100.1,-94.5,.1]].forEach(([m,g,M],T)=>{n.push(m,T===2?2.6:0,g,M),n.sbox(s.gloss,0,1.3,0,6.1,2.6,2.44,"prop",{c:v[T],ao:[.65,1]},{tag:"container"});for(let E=-2.8;E<2.9;E+=.4)n.box(s.gloss,E,1.3,1.23,.06,2.5,.05,{c:Le(v[T],.8)}),n.box(s.gloss,E,1.3,-1.23,.06,2.5,.05,{c:Le(v[T],.8)});T===2&&i.run("special",[-2,0,2].map(E=>n.toWorld(E,2.6+.26,0)),"container"),n.pop()});for(const[m,g,M]of[[94,-100,1],[95.2,-100.3,.8],[94.3,-100.1,.7]])n.push(m,M===.7?1:0,g,m),n.sbox(s.wood,0,M/2,0,M,M,M,"prop",{c:B(12096608),ao:[.65,1],tile:.9}),n.pop();i.landmarks.warehouse=n.toWorld(79.5,a,-78.5)}function lb(i){const t=i.b,e=[sb,ob,rb,ab];for(let n=0;n<4;n++)t.push(0,0,0,xs[n]),e[n](i,n,on(700+n*31)),t.pop()}function cb(i){const t=i.b,e=i.mats,n=on(999);t.setChunk("base");const s=[11887946,13214334,14207928,11031866,14266474,12107956,14260860,10129288,12891292],o=B(15911332),r=[B(14242846),B(15239467),B(15906354),B(12729122),B(12099886),B(9083450)],a=(T,E)=>[T[0]+(o[0]-T[0])*E,T[1]+(o[1]-T[1])*E,T[2]+(o[2]-T[2])*E],l=[],h=(T,E,A)=>{const w=t.toWorld(T,0,E),_=r[n()*r.length|0],S=.85+n()*.3;l.push([w.x,w.z,A,_[0]*S,_[1]*S,_[2]*S])};for(let T=0;T<4;T++){t.push(0,0,0,xs[T]),t.hq(e.asphalt,-124,-123.6,142,-117.5,.004,B(9276040));for(let E=0;E<3;E++){if(i.q<.4&&E===2)continue;const A=E===0?-124:-128-E*30;let w=E===0?-124:-150-E*30+n()*6;const _=E===0?142:180+E*30;for(;w<_;){const S=13+n()*11,x=14+n()*6,y=(E===0?12.3:E===1?21:30)+(n()*(E===0?3:5+E*3)|0)*3,b=w+S/2;if(Math.abs(Math.abs(b)-58)>S/2+7.5){const C=a(Le(B(s[n()*s.length|0]),1.1),.12+E*.2);t.uvOx=(n()*4|0)*3-(b-S/2),t.box(e.far,b,y/2,A-x/2,S,y,x,{c:C,ao:[.72,1],skip:"ny py"}),t.uvOx=0;const L=a(B(5918792),.2+E*.2);if(n()<.45){const U=x/2+.3,I=U/Math.cos(.62);for(const X of[1,-1])t.box(e.plain,b,y+U*Math.tan(.62)/2-.1,A-x/2+X*U/2,S+.4,.2,I,{c:a(B(n()<.5?9062966:5661294),.15+E*.2),rot:[X*.62,0,0],skip:"ny"});for(const X of[-1,1])t.tri(e.plain,[b+X*S/2,y,A-x/2+X*x/2],[b+X*S/2,y,A-x/2-X*x/2],[b+X*S/2,y+x/2*Math.tan(.62),A-x/2],[0,0],[0,0],[0,0],Le(C,.95))}else if(t.box(e.plain,b,y+.35,A-x/2,S+.3,.7,x+.3,{c:Le(C,.9),skip:"ny"}),t.hq(e.plain,b-S/2+.3,A-x+.3,b+S/2-.3,A-.3,y+.705,L),t.box(e.plain,b+(n()-.5)*S*.5,y+1.9,A-x/2+(n()-.5)*x*.4,2.6,2.6,2.8,{c:Le(C,.85),skip:"ny"}),n()<.5){const R=b+(n()-.5)*S*.5,U=A-x/2+(n()-.5)*4;t.cyl(e.plain,[R,y+2.2,U],[R,y+4.4,U],1.1,1.1,8,a(B(9067066),.2+E*.2),0),t.cyl(e.plain,[R,y+4.4,U],[R,y+5.1,U],1.2,.1,8,L,0);for(const[I,X]of[[.8,.8],[-.8,.8],[.8,-.8],[-.8,-.8]])t.box(e.plain,R+I,y+1.45,U+X,.1,1.5,.1,{c:L,skip:"py ny"})}if(E===0){t.box(e.plain,b,1.6,A+.06,S,3.2,.12,{c:Le(C,.5),ao:[.6,1],skip:"ny py nz"});for(let R=0;R<Math.floor(S/4.5);R++)t.fq(e.atlas,b-S/2+.8+R*4.5,.5,b-S/2+3.8+R*4.5,2.7,A+.13,[.8,.8,.8],1,1,Cn.shop[n()*2|0])}}w+=S+(E===0?0:2+n()*7)}}for(let E=0;E<20;E++){const A=-118+E*13+n()*5;Math.abs(Math.abs(A)-58)<8||h(A,-119.2-n()*1.5,.85+n()*.35)}for(let E=0;E<6;E++)for(const A of[50.6,65.4])h(A,-122-E*13-n()*4,.9+n()*.3);for(let E=0;E<10;E++)h(-140+E*30+n()*14,-146-n()*6,1.1+n()*.5);t.pop()}const c=new bn,f=[],d=[],u=[],p=[];for(let T=0;T<3;T++){const E=T/3*Math.PI,A=Math.cos(E)*3.6,w=Math.sin(E)*3.6,_=T*4;f.push(-A,0,-w,A,0,w,A,8.6,w,-A,8.6,-w),d.push(0,0,1,0,1,1,0,1),u.push(0,1,0,0,1,0,0,1,0,0,1,0),p.push(_,_+1,_+2,_,_+2,_+3)}c.setAttribute("position",new Ce(f,3)),c.setAttribute("uv",new Ce(d,2)),c.setAttribute("normal",new Ce(u,3)),c.setIndex(p);const v=Uc("farTrees",yM(),0);v.alphaTest=.5;const m=new sl(c,v,l.length),g=new Nn,M=new ge;l.forEach((T,E)=>{g.position.set(T[0],0,T[1]),g.rotation.set(0,E*1.3,0),g.scale.set(T[2],T[2]*(.9+E%4*.07),T[2]),g.updateMatrix(),m.setMatrixAt(E,g.matrix),m.setColorAt(E,M.setRGB(T[3],T[4],T[5]))}),m.name="farTrees",m.castShadow=!1,m.receiveShadow=!1,m.frustumCulled=!1,i.group.add(m)}const ws=(i,t,e)=>new k(i,t,e);function hb(i,t,e){const n=on(2468),s=(v,m,g=.2,M=.8)=>Array.from({length:m},(T,E)=>{const A=v.at(g+(M-g)*E/(m-1));return A.y+=v.r+.25,A});i.spans.forEach((v,m)=>{m%3===1&&i.run("wire",s(v,5),"ring")}),i.ringPoles.forEach((v,m)=>v.forEach((g,M)=>{const T=g.dropWire;T&&T.roof&&(T===i.firstDrop||(M+m)%2===0)&&i.run("wire",s(T,4,.25,.85),"drop",T===i.firstDrop)})),i.crossWires.forEach((v,m)=>{v!==i.longWire&&m%2===0&&i.run("wire",s(v,5,.25,.75),"cross")}),i.wires.forEach((v,m)=>{v.tag==="lane"&&m%5===0&&i.run("wire",s(v,4),"lane")}),i.washLines.forEach((v,m)=>{m%3===0&&i.run("wire",s(v,3,.3,.7),"wash")}),i.poles.forEach((v,m)=>{m%4===0&&i.run("special",[ws(v.in.x,v.in.y+.3,v.in.z)],"pole")});const o={ground:46,wire:46,roof:64,special:36},r=[];for(const v of Object.keys(o)){const m=i.runs.filter(T=>T.where===v);for(let T=m.length-1;T>0;T--){const E=n()*(T+1)|0;[m[T],m[E]]=[m[E],m[T]]}m.sort((T,E)=>(E.must?1:0)-(T.must?1:0));let g=o[v];const M={};for(const T of m){if(g<=0)break;const E={path:5,wall:3,parapet:9,ridge:9,escape:5,fence:4,alley:3,car:6,lamp:8,bench:4,balcony:5,awning:4,chimney:5,tank:4,hut:3,garden:3,pole:7,shed:4}[T.tag]??99;if(M[T.tag]=(M[T.tag]||0)+1,!(M[T.tag]>E&&!T.must)&&!(T.pts.length>g)){for(const A of T.pts)r.push({pos:A.clone(),kind:"acorn",where:v});g-=T.pts.length}}}const a=i.golden.slice();let l=null;t.forEach((v,m)=>{m===0||v.spec.type==="street"||v.spec.role==="yard"||(!l||v.top.y>l.top.y)&&(l=v)}),l&&a.push({pos:ws(l.top.x,l.top.y+.3,l.top.z),where:"tree",name:"Top of the tallest park tree"});const h=i.dogYards[2];if(h&&a.push({pos:ws(h.corner.x,.3,h.corner.z),where:"special",name:"The bulldog's back yard"}),i.longWire){const v=i.longWire.at(.5);v.y+=.3,a.push({pos:v,where:"wire",name:"Middle of the long wire"})}const c=(v,m)=>{let g=null;for(const M of m){for(const T of i.roofTops)T.side===v&&T.kind===M&&(!g||T.pos.y>g.pos.y)&&(g=T);if(g)return g}return g},f=c("E",["garden","tank","hut","chimney"]);f&&a.push({pos:f.pos.clone().add(ws(0,.1,0)),where:"roof",name:f.kind==="garden"?"Roof garden on the east side":"High rooftop on the east side"});const d=c("S",["chimney","tank","hut"]);d&&a.push({pos:d.pos.clone().add(ws(0,.1,0)),where:"roof",name:d.kind==="chimney"?"Tallest chimney on the south side":"High rooftop on the south side"});for(const v of a){for(let m=r.length-1;m>=0;m--)r[m].pos.distanceTo(v.pos)<.8&&r.splice(m,1);r.push({pos:v.pos,kind:"golden",where:v.where,name:v.name})}const u=[{center:ws(21,hn(21,-21),-21),radius:8,kind:"terrier",name:"Picnic lawn"},{center:ws(-33,hn(-33,33),33),radius:10,kind:"shepherd",name:"Pond meadow"},{center:ws(34,hn(34,-34),-34),radius:9,kind:"terrier",name:"South-east lawn"}];i.dogYards[2]&&u.push({center:i.dogYards[2].center,radius:6,kind:"bulldog",name:"The bulldog's yard"}),i.dogYards[0]&&u.push({center:i.dogYards[0].center,radius:6,kind:"terrier",name:"Back yard, south side"}),i.dogYards[1]&&u.push({center:i.dogYards[1].center,radius:6,kind:"shepherd",name:"Back yard, east side"});{const v=Math.cos(xs[3]),m=Math.sin(xs[3]),g=8,M=-94.6;u.push({center:ws(g*v+M*m,0,-g*m+M*v),radius:6,kind:"shepherd",name:"Back lane, west side"})}for(const v of i.zonesRaw)u.push(v);const p=i.landmarks;return p.home=e.clone(),p.spawn=ws(5.6,hn(5.6,5.6),5.6),h&&(p.bulldogYard=h.center.clone()),{pickupSpots:r,dogZones:u,landmarks:p}}function ub(i,t={}){const e=Math.max(0,Math.min(1,t.quality??1)),n=new Oo;n.name="city",i.setGroundHeightFn(hn),i.bounds={minX:-116,maxX:Xe.EDGE,minZ:-116,maxZ:Xe.EDGE};const s={world:i,q:e,group:n,rng:on(t.seed??20261119),mats:_M(e),b:new Q_(i),treeSpecs:[],beds:[],paths:wM(),runs:[],golden:[],zonesRaw:[],landmarks:{},tufts:[],flowers:[],extraLeaves:[],lamps:[],poles:[],wires:[],spans:[],crossWires:[],washLines:[],buildings:[],roofTops:[],awnings:[],alleys:[],blocks:[],corners:[],dogYards:[],extPoles:[],lanePoles:[],animated:[],quadOf:(m,g)=>(m>=0?1:0)+(g>=0?2:0)};s.run=(m,g,M,T)=>s.runs.push({where:m,pts:g,tag:M,must:T}),s.wire=(m,g,M)=>Xn(s,m,g,M);const o={},r=()=>{let m=0;for(const[g,M]of s.b.batches)g.startsWith("plain|")&&(m+=M.idx.length/3);return m};let a=0;const l=(m,g)=>{g(s);const M=r();o[m]=M-a,a=M};AM(s),l("roads",TM),l("park",IM),l("blocks",ZM),l("landmarks",lb),l("streets",YM),l("drops",JM),l("backdrop",cb),SM(s),UM(s);const h=K_(i,s.treeSpecs,{quality:e});n.add(h.group);const c=zM(s,h.trees[0]),f=s.b.build(n);i.finalize();const d=hb(s,h.trees,c),u=h.trees.slice();u.trees=h.trees,u.group=h.group,u.update=h.update;const p={spawn:d.landmarks.spawn.clone(),home:c.clone(),trees:u,pickupSpots:d.pickupSpots,dogZones:d.dogZones,landmarks:d.landmarks};function v(m,g,M,T){for(let E=0;E<s.animated.length;E++)s.animated[E].value=g;h.update&&h.update(m,g,M,T)}return{group:n,update:v,layout:p,debug:{state:s,treeSys:h,triangles:f,stages:o}}}const Cs=Math.PI*2,ui=Math.PI,vn=(i,t,e)=>i<t?t:i>e?e:i,Rt=(i,t,e)=>i+(t-i)*e,nn=(i,t,e)=>{const n=vn((e-i)/(t-i),0,1);return n*n*(3-2*n)},nl=i=>i-Math.floor(i),zo=(i,t,e,n)=>i+(t-i)*(1-Math.exp(-n/e)),ds=0,Go=1,fo=2,Qn=3,fi=4,ps=5,Nc=6,il=7,Rs=8,Oi=9,ah=10,Li=11,Jd=12,ko=13,la=14,ca=15,No=16,ha=17,ua=18,Xc=19,Mm=20,bm=21,Yc=22,wm=23,Sm=24,pr=25,mr=26,ju=27,Ku=28,Zu=29,n0=30,ms=31,po=32,mo=33,xc=34,Ca=35,Ra=36,sa=37,lr=38,fb=.095,db=.1,lh=.058,pb=.072,mb=.078,ch=.02,er=.088,yi=12,vc=.0385,gu=2,Ri=yi*gu+1,Qd=6,gb=.066,xb=.034;function i0(i,t,e,n,s,o,r,a,l){i[ko]=t,i[la]=e,i[ca]=n,i[No]=-t,i[ha]=e,i[ua]=n,i[pr]=s,i[mr]=s,i[Xc]=o,i[Mm]=r,i[bm]=a,i[Yc]=-o,i[wm]=r,i[Sm]=a,i[ju]=l,i[Ku]=l}function vb(i){i.fill(0),i[ds]=.132,i[Go]=-.088,i[fo]=.36,i[Qn]=.108,i[fi]=.08,i[ps]=-.24,i[Rs]=.04,i[Oi]=.128,i[Li]=.06,i0(i,.036,0,.115,.05,.07,0,-.04,.25),i[ms]=.75,i[po]=-.03,i[mo]=-.16,i[Ca]=1,i[Ra]=1}function yb(i){i.fill(0),i[ds]=.082,i[Go]=-.072,i[fo]=1.02,i[Qn]=.228,i[fi]=-.01,i[ps]=1.25,i[Rs]=.1,i[Oi]=.098,i[Li]=.02,i0(i,.023,.172,.062,1.25,.078,0,.012,0),i[ms]=1,i[po]=.12,i[mo]=-.42,i[Ca]=1.25,i[Ra]=1.05,i[sa]=1}function _b(i,t,e){i.fill(0),i[ds]=.058,i[Go]=-.094,i[fo]=0,i[Qn]=.056+.03*e,i[fi]=.086,i[ps]=.1+.22*e,i[Rs]=.03+.03*e,i[Oi]=.124-.015*e,i[Li]=.25+.4*e,i0(i,.1,0,.165,.05,Rt(.115,.085,t),0,Rt(-.06,-.2,t),.12),i[Zu]=ui*t,i[n0]=1,i[ms]=.06,i[po]=0,i[mo]=.012,i[Ca]=1.1,i[Ra]=1}function Tm(i,t=0){const e=vn(i/12,0,1);return(.25+.65*Math.pow(e,.85))*(1-.15*t)}let Vo=0,gr=0,xr=0;function yc(i,t,e,n,s){if(i<t){const o=i/t;Vo=e*(.5-o),gr=0,xr=n?.3+.9*o*o:.05+.75*o*o*o}else{const o=(i-t)/(1-t),r=-1.3,a=o*o,l=a*o;Vo=e*(-.5*(2*l-3*a+1)+r*(l-2*a+o)+.5*(-2*l+3*a)+r*(l-a));const h=Math.sin(ui*o);if(n){const c=Math.sin(ui*Math.min(1,o*1.7)),f=c*c;gr=(.028+.03*s)*h+.05*s*f,Vo-=.085*s*f,xr=o<.35?Rt(1.2,2.3,o/.35):Rt(2.3,.3,nn(.35,1,o))}else{const c=Math.sin(ui*Math.pow(o,1.5)),f=c*c;gr=(.024+.025*s)*h+.045*s*f,Vo+=.07*s*f,xr=o<.3?Rt(.8,1.4,o/.3):o<.8?Rt(1.4,-.2,nn(.3,.8,o)):Rt(-.2,.05,(o-.8)/.2)}}}function Mb(i,t,e,n,s,o){i.fill(0);const r=vn(e/12,0,1),a=nn(1.6,4,e)*(1-n),l=Tm(e,n),h=Rt(.14,.215,a),c=Math.min(Rt(.5,.4,a),h/l),f=c*l,d=Math.max(0,-s)*n,u=Cs*t,p=.55+.45*r,v=.012+.02*r,m=Math.cos(u-Cs*.37),g=.128+v*1.1*Math.cos(u-Cs*.16),M=.116+v*Math.cos(u-Cs*.74),T=-.096+.034*m*p,E=.088-.024*m*p,A=.1+.42*m*p,w=-.03-.3*m*p,_=.113+.004*Math.cos(2*u),S=.103+.004*Math.cos(2*u+1.2);let x=Rt(_,g,a),y=Rt(S,M,a),b=Rt(-.098,T,a),C=Rt(.084,E,a),L=Rt(.1,A,a),R=Rt(-.04,w,a),U=Rt(.11,0,a)*Math.sin(u+.6),I=Rt(.03,.036-.55*(M-.116),a),X=Rt(.128,.132,a),Y=Rt(.1,.06+.07*m,a),st=Rt(.22,.26+.2*Math.cos(u-Cs*.22),a),bt=Rt(0,.012,a),St=.03;n>.001&&(x=Rt(x,.059+.003*Math.cos(2*u),n),y=Rt(y,.056,n),b=Rt(b,-.096,n),C=Rt(C,.086,n),L=Rt(L,.02,n),R=Rt(R,.1,n),U=Rt(U,.3*Math.sin(u+.6),n),I=Rt(I,.03,n),Y=Rt(Y,.3,n),st=Rt(st,.05,n),bt=Rt(bt,0,n),St=Rt(St,.01,n)),x-=.012*o,y-=.012*o,i[ds]=x,i[Go]=b,i[fo]=L,i[Qn]=y,i[fi]=C,i[ps]=R,i[Nc]=U,i[Rs]=I,i[Oi]=X,i[Li]=Y,i[il]=.05*o*Math.sin(u),i[ms]=st,i[po]=bt,i[mo]=St,i[Ca]=1,i[Ra]=1,i[n0]=n,i[Zu]=ui*d;const Ft=1-.86*o,ye=Rt(Rt(.037,.03,a),.098,n)*Ft,lt=Rt(Rt(.06,.07,a),.112,n)*Ft,vt=Rt(.105,.128,a)+.045*n,Pt=Rt(-.07,-.062,a)+.01*n-.13*d,wt=Rt(.5,.07,a),$t=Rt(.5,.4,a),xe=Rt(1,.47,a),Xt=1-.55*n,Ot=1-.7*n;yc(nl(t),c,f,!1,a),i[ko]=ye,i[la]=gr*Xt,i[ca]=vt+Vo,i[pr]=xr*Ot,yc(nl(t-wt+1),c,f,!1,a),i[No]=-ye,i[ha]=gr*Xt,i[ua]=vt+Vo,i[mr]=xr*Ot,yc(nl(t-$t+1),c,f,!0,a),i[Xc]=lt,i[Mm]=gr*Xt,i[bm]=Pt+Vo,i[ju]=xr*Ot,yc(nl(t-xe+2),c,f,!0,a),i[Yc]=-lt,i[wm]=gr*Xt,i[Sm]=Pt+Vo,i[Ku]=xr*Ot}function bb(i,t){i.fill(0),i[ds]=.116+.022*t,i[Go]=-.116+.03*t,i[fo]=-.08+.34*t,i[Qn]=.114-.016*t,i[fi]=.102-.008*t,i[ps]=.08-.3*t,i[Rs]=.032,i[Oi]=.134,i[Li]=.14-.34*t,i0(i,Rt(.03,.038,t),Rt(.118,.02,t),Rt(.285,.24,t),Rt(.1,-.35,t),Rt(.056,.068,t),Rt(.098,.03,t),Rt(-.36,-.06,t),Rt(3.3,.7,t)),i[ms]=Rt(.1,.6,t),i[po]=0,i[mo]=Rt(0,.03,t),i[Ca]=1.7,i[Ra]=1.2,i[n0]=.2}function _c(i,t,e,n){for(let s=0;s<lr;s++)i[s]=t[s]+(e[s]-t[s])*n}const wb=`
float sqH3(vec3 p){ p = fract(p*0.3183099+0.1); p *= 17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
float sqN3(vec3 x){ vec3 i=floor(x), f=fract(x); f=f*f*(3.0-2.0*f);
  return mix(mix(mix(sqH3(i),sqH3(i+vec3(1,0,0)),f.x), mix(sqH3(i+vec3(0,1,0)),sqH3(i+vec3(1,1,0)),f.x),f.y),
             mix(mix(sqH3(i+vec3(0,0,1)),sqH3(i+vec3(1,0,1)),f.x), mix(sqH3(i+vec3(0,1,1)),sqH3(i+vec3(1,1,1)),f.x),f.y), f.z); }
`,Sb={value:lo};function Ju(i){i.uniforms.uSunDir=Sb,i.vertexShader=i.vertexShader.replace("#include <common>",`#include <common>
uniform vec3 uSunDir;`).replace("#include <shadowmap_vertex>",`#include <shadowmap_vertex>
      #if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
        vDirectionalShadowCoord[ 0 ] = directionalShadowMatrix[ 0 ] * vec4((modelMatrix * vec4(0.0, 0.12, 0.0, 1.0)).xyz + uSunDir * 0.45, 1.0);
      #endif`)}function Tb(i){const t=new Gn({vertexColors:!0,roughness:.82,metalness:0});return t.onBeforeCompile=e=>{e.uniforms.uFlash=i,Ju(e),e.vertexShader=e.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aRest; attribute vec2 aMat; varying vec3 vRest; varying vec2 vMat;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vRest = aRest; vMat = aMat;`),e.fragmentShader=e.fragmentShader.replace("#include <common>",`#include <common>
uniform float uFlash; varying vec3 vRest; varying vec2 vMat;
`+wb).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        {
          float gloss = vMat.x, fuzz = vMat.y;
          vec3 fV = normalize(vViewPosition);
          // fine fur streaks, stretched along the hair direction, faded out with distance so they never shimmer
          vec3 fp = vRest * vec3(300.0, 300.0, 85.0);
          float fw = max(fwidth(fp.x), max(fwidth(fp.y), fwidth(fp.z)));
          float fade = 1.0 - smoothstep(0.35, 1.3, fw);
          float fn = sqN3(fp) * 0.6 + sqN3(fp * 2.7 + 9.1) * 0.4;
          float bn = sqN3(vRest * vec3(46.0, 46.0, 22.0));
          diffuseColor.rgb *= mix(1.0, (0.80 + 0.40 * fn), fuzz * fade) * mix(1.0, 0.9 + 0.2 * bn, fuzz);
          // soft fuzz rim
          float ndv = clamp(dot(normal, fV), 0.0, 1.0);
          float fr = pow(1.0 - ndv, 2.4);
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.45 + vec3(0.085, 0.07, 0.055), fr * fuzz * 0.85);
          #if NUM_DIR_LIGHTS > 0
            vec3 fL = directionalLights[0].direction;
            float back = clamp(dot(normal, fL) * 0.5 + 0.55, 0.0, 1.0);
            totalEmissiveRadiance += directionalLights[0].color * diffuseColor.rgb * (fr * back * 0.10 * fuzz);
            // slightly softer terminator than bare lambert: fur scatters light
            normal = normalize(normal + fL * (0.16 * fuzz));
          #endif
          roughnessFactor = mix(roughnessFactor, 0.07, clamp(gloss, 0.0, 1.0));
          totalEmissiveRadiance += step(1.5, gloss) * vec3(2.2);
          totalEmissiveRadiance += vec3(1.0, 0.42, 0.3) * uFlash * (1.0 - clamp(gloss, 0.0, 1.0));
        }`)},t.customProgramCacheKey=()=>"squirrelFur2",t}function Eb(i,t,e){const n=new Gn({roughness:.92,metalness:0,alphaTest:.5});return n.alphaToCoverage=!0,n.onBeforeCompile=s=>{s.uniforms.uFlash=i,s.uniforms.uFluff=t,Ju(s),s.uniforms.uRoot={value:e.root},s.uniforms.uMid={value:e.mid},s.uniforms.uTip={value:e.tip},s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
        attribute float aShell; attribute vec3 aTan; attribute float aLen; attribute vec2 aSuv; uniform float uFluff;
        varying float vH; varying vec2 vSuv; varying float vLen;`).replace("#include <begin_vertex>",`
        vec3 transformed = vec3(position);
        {
          float L = aLen * uFluff;
          transformed += normal * (aShell * L) + aTan * (aShell * aShell * L * 0.7);
          vH = aShell; vSuv = aSuv; vLen = aLen;
        }`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
        uniform float uFlash; uniform vec3 uRoot; uniform vec3 uMid; uniform vec3 uTip; varying float vH; varying vec2 vSuv; varying float vLen;
        float shH(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float shStrand(vec2 uv, vec2 cells, float h, out float tipness){
          vec2 g = uv * cells; vec2 id = floor(g); id.x = mod(id.x, cells.x); vec2 f = fract(g) - 0.5;
          float r1 = shH(id), r2 = shH(id + 17.3);
          f += (vec2(r1, r2) - 0.5) * 0.5;
          float mh = 0.5 + 0.5 * r2;
          float k = h / mh;
          tipness = k;
          return (1.0 - dot(f, f) * 3.4) - k;
        }`).replace("#include <color_fragment>",`#include <color_fragment>
        float shTip = 0.0;
        {
          float t1, t2;
          // soft clumping: slow variation of the fur depth gives a tufted outline without hard cones
          vec2 cg = vSuv * vec2(7.0, 9.0); vec2 ci = floor(cg), cf = fract(cg); cf = cf * cf * (3.0 - 2.0 * cf);
          float cl = mix(mix(shH(vec2(mod(ci.x, 7.0), ci.y)), shH(vec2(mod(ci.x + 1.0, 7.0), ci.y)), cf.x),
                         mix(shH(vec2(mod(ci.x, 7.0), ci.y + 1.0)), shH(vec2(mod(ci.x + 1.0, 7.0), ci.y + 1.0)), cf.x), cf.y);
          float hh = vH * (1.0 + 0.3 * cl);
          float a1 = shStrand(vSuv, vec2(40.0, 44.0), hh, t1);
          float a2 = shStrand(vSuv + 0.37, vec2(90.0, 96.0), hh * 1.04, t2);
          float fw = max(fwidth(vSuv.x) * 90.0, fwidth(vSuv.y) * 96.0);
          float far2 = smoothstep(0.35, 1.0, fw), far1 = smoothstep(0.8, 2.2, fw);
          float avg = 0.56 - hh;
          a1 = mix(a1, avg, far1); a2 = mix(a2, avg, far2);
          t1 = mix(t1, hh * 1.5, far1); t2 = mix(t2, hh * 1.5, far2);
          float a = a1; shTip = t1;
          if (a2 > a) { a = a2; shTip = t2; }
          diffuseColor.a = clamp(0.5 + a * 4.0, 0.0, 1.0);
          vec3 c = mix(uRoot, uMid, smoothstep(0.0, 0.55, vH));
          c *= 0.66 + 0.34 * smoothstep(0.0, 0.8, vH);   // roots sit in shadow
          diffuseColor.rgb = c;
        }`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        {
          vec3 fV = normalize(vViewPosition);
          float fr = pow(1.0 - clamp(abs(dot(normal, fV)), 0.0, 1.0), 1.6);
          // pale frosted tips, strongest around the silhouette
          float frost = smoothstep(0.4, 0.95, shTip) * (0.06 + 0.94 * fr) * smoothstep(0.25, 0.7, vH);
          diffuseColor.rgb = mix(diffuseColor.rgb, uTip, frost * 0.9);
          #if NUM_DIR_LIGHTS > 0
            vec3 fL = directionalLights[0].direction;
            totalEmissiveRadiance += directionalLights[0].color * diffuseColor.rgb * (fr * clamp(dot(normal, fL) * 0.5 + 0.6, 0.0, 1.0) * 0.14);
            normal = normalize(normal + fL * 0.28);
          #endif
          totalEmissiveRadiance += vec3(1.0, 0.42, 0.3) * uFlash;
        }`)},n.customProgramCacheKey=()=>"squirrelShell2",n}function Ab(i){const e=document.createElement("canvas");e.width=e.height=256;const n=e.getContext("2d");n.clearRect(0,0,256,256),n.fillStyle="#fff";const s=184,o=s/2;n.beginPath(),n.moveTo(o-30,256),n.quadraticCurveTo(o-40,256*.86,o-12,256*.72),n.lineTo(o+12,256*.72),n.quadraticCurveTo(o+40,256*.86,o+30,256),n.closePath(),n.fill();for(let c=0;c<90;c++){const f=o+i.range(-34,34),d=(f-o)/34,u=.55+.45*Math.sqrt(i()),p=vn(f+d*i.range(8,34)+i.range(-12,12),6,s-6),v=256*(1-u),m=(f+p)/2+i.range(-6,6),g=256*(1-u*.5),M=i.range(3,5.5);n.beginPath(),n.moveTo(f-M,256),n.quadraticCurveTo(m-M*.7,g,p,v),n.quadraticCurveTo(m+M*.7,g,f+M,256),n.closePath(),n.fill()}const r=256*.89;n.beginPath(),n.moveTo(r-3.2,256),n.lineTo(r-.9,0),n.lineTo(r+.9,0),n.lineTo(r+3.2,256),n.closePath(),n.fill();const a=n.getImageData(0,0,256,256).data,l=new Uint8Array(256*256*4);for(let c=0;c<256;c++){const f=c/255,d=255-c,u=.92+.08*nn(0,.3,f);for(let p=0;p<256;p++){const v=(c*256+p)*4,m=(d*256+p)*4,g=p<s?.9+.1*(p*7919%13/12):1,M=p<s?u*g:1;l[v]=l[v+1]=l[v+2]=Math.round(255*M),l[v+3]=a[m+3]}}const h=new Ml(l,256,256,bi);return h.colorSpace=ti,h.generateMipmaps=!0,h.minFilter=Ls,h.magFilter=Bi,h.anisotropy=4,h.wrapS=h.wrapT=Ps,h.needsUpdate=!0,h}function Cb(i,t,e){const n=new Gn({vertexColors:!0,roughness:.9,metalness:0,map:t,alphaTest:.36,side:ni});return n.alphaToCoverage=!0,n.onBeforeCompile=s=>{s.uniforms.uFlash=i,s.uniforms.uTip={value:e},Ju(s),s.vertexShader=s.vertexShader.replace("#include <common>",`#include <common>
attribute vec3 aDir; attribute float aSide; attribute vec3 aFx; varying vec3 vFx;`).replace("#include <begin_vertex>",`
        vec3 transformed = vec3(position);
        {
          vec3 camO = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
          vec3 sv = cross(aDir, camO - position);
          float sl = length(sv);
          sv = sl > 1e-6 ? sv / sl : vec3(1.0, 0.0, 0.0);
          transformed += sv * aSide;
          float fres = pow(1.0 - abs(dot(normalize(camO - position), normalize(normal))), 1.4);
          vFx = vec3(aFx.x * (0.1 + 0.9 * fres), aFx.y * (0.35 + 0.65 * fres), aFx.z * (1.0 - smoothstep(0.12, 0.42, fres)));
        }`),s.fragmentShader=s.fragmentShader.replace("#include <common>",`#include <common>
uniform float uFlash; uniform vec3 uTip; varying vec3 vFx;`).replace("#include <color_fragment>",`#include <color_fragment>
        {
          float hv = vMapUv.y;
          diffuseColor.rgb *= 1.0 - vFx.y * smoothstep(0.3, 0.56, hv) * (1.0 - smoothstep(0.66, 0.84, hv));
          diffuseColor.rgb = mix(diffuseColor.rgb, uTip, vFx.x * smoothstep(0.68, 0.93, hv));
          diffuseColor.a *= 1.0 - vFx.z;
        }`).replace("#include <normal_fragment_maps>",`#include <normal_fragment_maps>
        normal = normalize(vNormal);
        #if NUM_DIR_LIGHTS > 0
          normal = normalize(normal + directionalLights[0].direction * 0.3);
        #endif
        totalEmissiveRadiance += vec3(1.0, 0.42, 0.3) * uFlash;`)},n.customProgramCacheKey=()=>"squirrelHair2",n}function hh(i,t){const e=Math.cos(t),n=Math.sin(t);i[0]=1,i[1]=0,i[2]=0,i[3]=0,i[4]=e,i[5]=n,i[6]=0,i[7]=-n,i[8]=e}function uh(i,t){const e=Math.cos(t),n=Math.sin(t);i[0]=e,i[1]=0,i[2]=-n,i[3]=0,i[4]=1,i[5]=0,i[6]=n,i[7]=0,i[8]=e}function Mc(i,t){const e=Math.cos(t),n=Math.sin(t);i[0]=e,i[1]=n,i[2]=0,i[3]=-n,i[4]=e,i[5]=0,i[6]=0,i[7]=0,i[8]=1}function Ss(i,t,e){for(let n=0;n<3;n++){const s=e[n*3],o=e[n*3+1],r=e[n*3+2];bc[n*3]=t[0]*s+t[3]*o+t[6]*r,bc[n*3+1]=t[1]*s+t[4]*o+t[7]*r,bc[n*3+2]=t[2]*s+t[5]*o+t[8]*r}for(let n=0;n<9;n++)i[n]=bc[n]}const bc=new Float64Array(9);let xu=0,vu=0,yu=0,cr=0,hr=0,ur=0;function tp(i,t,e,n,s,o,r,a,l,h,c){let f=n-i,d=s-t,u=o-e,p=Math.sqrt(f*f+d*d+u*u);p<1e-6&&(f=0,d=-1,u=0,p=1e-6);const v=f/p,m=d/p,g=u/p,M=vn(p,Math.abs(r-a)+.004,r+a-.0015),T=(r*r-a*a+M*M)/(2*M),E=Math.sqrt(Math.max(0,r*r-T*T)),A=l*v+h*m+c*g;let w=l-v*A,_=h-m*A,S=c-g*A,x=Math.sqrt(w*w+_*_+S*S);x<1e-5&&(w=0,_=1,S=0,x=1),w/=x,_/=x,S/=x,xu=i+v*T+w*E,vu=t+m*T+_*E,yu=e+g*T+S*E,cr=i+v*M,hr=t+m*M,ur=e+g*M}function $a(i,t,e){if(e<=i[0])return t[0];for(let n=1;n<i.length;n++)if(e<=i[n]){const s=(e-i[n-1])/(i[n]-i[n-1]);return Rt(t[n-1],t[n],s*s*(3-2*s))}return t[t.length-1]}function Rb(i={}){const t=on((i.seed??1)*7919+13>>>0),e=new Oo;e.name="squirrel";const n=new Oo;e.add(n);const s={value:0},o=Z=>{const it=new ge(Z);return[it.r,it.g,it.b]},r={back:o(7559239),russet:o(10246712),cream:o(16049868),face:o(11433032),paw:o(11565648),toe:o(8016448),earIn:o(9329220),eye:o(460036),nose:o(2364431),white:o(16777215),ring:o(14466964),tailRoot:o(5911840),tailMid:o(10244648),tailTip:o(16445660),frost:o(14470582),whisk:o(2891800)},a=(Z,it,mt,It)=>(Z[0]=Rt(it[0],mt[0],It),Z[1]=Rt(it[1],mt[1],It),Z[2]=Rt(it[2],mt[2],It),Z),l=[],h=[],c=[],f=[];let d=0;const u={r:1,g:1,b:1,rx:0,ry:0,rz:0,gloss:0,fuzz:1};function p(Z,it,mt){const It=d,Et=new Float32Array(it),kt=new Float32Array(it);for(let Gt=0;Gt<it;Gt++){const qt=Gt/it*Cs;Et[Gt]=Math.cos(qt),kt[Gt]=Math.sin(qt)}for(let Gt=0;Gt<Z;Gt++)for(let qt=0;qt<it;qt++)u.gloss=0,u.fuzz=1,mt(Gt,qt,Et[qt],kt[qt],u),l.push(u.r,u.g,u.b),h.push(u.rx,u.ry,u.rz),c.push(u.gloss,u.fuzz);for(let Gt=0;Gt<Z-1;Gt++)for(let qt=0;qt<it;qt++){const fe=It+Gt*it+qt,te=It+Gt*it+(qt+1)%it,ee=It+(Gt+1)*it+qt,ae=It+(Gt+1)*it+(qt+1)%it;f.push(fe,te,ee,te,ae,ee)}return d+=Z*it,{v0:It,nr:Z,ns:it,cs:Et,sn:kt,cen:new Float32Array(Z*3),capA:!0,capB:!0}}let v=0;function m(Z){const it=d,mt=[],It=[];v+=.37;for(const Et of Z){const kt=Et.geo,Gt=kt.attributes.position,qt=kt.attributes.normal,fe=d;for(let ee=0;ee<Gt.count;ee++){const ae=Gt.getX(ee),be=Gt.getY(ee),Te=Gt.getZ(ee);mt.push(ae,be,Te),It.push(qt.getX(ee),qt.getY(ee),qt.getZ(ee));const Ge=Et.colorFn?Et.colorFn(ae,be,Te,qt.getX(ee),qt.getY(ee),qt.getZ(ee)):Et.color;l.push(Ge[0],Ge[1],Ge[2]),h.push(ae+v,be,Te*3),c.push(Et.gloss||0,Et.fuzz??1)}const te=kt.index;if(te)for(let ee=0;ee<te.count;ee++)f.push(fe+te.getX(ee));else for(let ee=0;ee<Gt.count;ee++)f.push(fe+ee);d+=Gt.count}return{v0:it,n:d-it,rp:new Float32Array(mt),rn:new Float32Array(It)}}const g=new qe,M=new Ei,T=new Ti,E=new k,A=new k;function w(Z,it,mt,It,Et,kt,Gt,qt,fe,te){return g.compose(E.set(qt,fe,te),T.setFromEuler(M.set(Et,kt,Gt)),A.set(it,mt,It)),Z.applyMatrix4(g),Z}const _=24,S=[],x=[],y=[],b=[],C=[],L=[],R=[],U=[],I=[],X=[.082,.076,.068];for(const Z of[0,.07,.18,.34,.54,.77]){const it=Z===0?0:Math.sqrt(1-(1-Z)*(1-Z));S.push(0),x.push(Z),y.push(X[0]*it),b.push(X[1]*it),C.push(X[2]*it),L.push(1),R.push(0),U.push(0),I.push(-er*(1-Z))}const Y=[0,.3,.65,1],st=[.082,.085,.074,.06],bt=[.076,.07,.061,.053],St=[.068,.077,.071,.06];for(let Z=0;Z<=12;Z++){const it=Z/12;S.push(1),x.push(it),y.push($a(Y,st,it)),b.push($a(Y,bt,it)),C.push($a(Y,St,it)),L.push(1),R.push(0),U.push(0),I.push(.185*it)}const Ft=[[-.055,-.004,.044,.041,.04,1],[-.04,.001,.051,.049,.042,1],[-.02,.003,.055,.053,.043,1.05],[0,.003,.055,.052,.043,1.12],[.018,0,.05,.046,.042,1.15],[.034,-.005,.041,.036,.038,1.1],[.047,-.011,.031,.025,.03,1],[.058,-.016,.022,.016,.022,1],[.066,-.019,.013,.01,.013,1],[.0705,-.02,0,0,0,1]];for(const Z of[1/6,2/6,3/6,4/6,5/6]){const it=Z*Z*(3-2*Z);S.push(2),x.push(Z),y.push(Rt(.06,Ft[0][2],it)),b.push(Rt(.053,Ft[0][3],it)),C.push(Rt(.06,Ft[0][4],it)),L.push(1),R.push(0),U.push(0),I.push(.185+.075*Z)}for(const Z of Ft)S.push(3),x.push(0),U.push(Z[0]),R.push(Z[1]),y.push(Z[2]),b.push(Z[3]),C.push(Z[4]),L.push(Z[5]),I.push(.26+.055+Z[0]);const ye=S.length,lt=[0,0,0],vt=[0,0,0],Pt=p(ye,_,(Z,it,mt,It,Et)=>{const kt=S[Z],Gt=x[Z],qt=nn(-.15,.6,It);let fe=nn(-.22,-.62,It);if(a(lt,r.russet,r.back,qt*.92),kt===0&&(fe*=nn(.2,.9,Gt)*.85),kt===2&&(fe=nn(-.12,-.55,It)),Et.fuzz=1,kt===3){const ee=U[Z],ae=nn(.026,.054,ee);fe=Math.max(nn(-.05,-.45,It),ae*nn(.8,.15,It)*.92),a(lt,a(vt,r.face,r.back,qt*.5),r.face,ae),Et.fuzz=1-.35*ae}a(lt,lt,r.cream,fe),Et.r=lt[0],Et.g=lt[1],Et.b=lt[2];const te=(It<0,y[Z]);Et.rx=mt*te,Et.ry=It*(It>=0?b[Z]:C[Z]),Et.rz=I[Z]}),wt=14,$t=[0,.07,.24,.5,.78,1,1.25,1.6,2],xe=[.004,.028,.041,.042,.035,.026,.019,.013,.011],Xt=[0,.08,.3,.65,1,1.35,1.7,2],Ot=[.004,.024,.032,.028,.021,.016,.0125,.0105],yt=[0,.035,.08,.15,.25,.37,.5,.64,.78,.9,1,1.12,1.28,1.5,1.75,2],Lt=yt.map(Z=>$a($t,xe,Z)),V=[0,.04,.09,.18,.3,.47,.65,.83,1,1.18,1.4,1.7,2],Nt=V.map(Z=>$a(Xt,Ot,Z));function ft(Z,it,mt,It){const Et=p(Z.length,wt,(kt,Gt,qt,fe,te)=>{const ee=nn(.15,.75,-qt*mt);a(lt,r.russet,r.back,It?.25*(1-Z[kt]/2):.1),It?a(lt,lt,r.cream,ee*.45*nn(.6,1.6,Z[kt])):a(lt,lt,r.cream,ee*.8*(1-nn(.7,1.3,Z[kt]))),a(lt,lt,r.paw,nn(1.3,2,Z[kt])*.7),te.r=lt[0],te.g=lt[1],te.b=lt[2],te.rx=qt*it[kt]+mt*.3+(It?.9:.5),te.ry=fe*it[kt],te.rz=Z[kt]*.08});return Et.capB=!1,Et.T=Z,Et.R=it,Et}const Yt=ft(yt,Lt,1,!0),Tt=ft(yt,Lt,-1,!0),at=ft(V,Nt,1,!1),At=ft(V,Nt,-1,!1),z=16,D=i.shells??16,Q=p(Ri,z,(Z,it,mt,It,Et)=>{a(lt,r.tailRoot,r.tailMid,.25),lt[0]*=.5,lt[1]*=.5,lt[2]*=.5,Et.r=lt[0],Et.g=lt[1],Et.b=lt[2],Et.rx=mt*.02+2,Et.ry=It*.02,Et.rz=Z*.02,Et.fuzz=.6}),dt=Z=>(.5+.5*nn(0,.3,Z))*(1-.12*nn(.82,1,Z)),_t=(Z,it)=>new ba(1,Z,it),xt=(Z,it)=>new Ou(Z,it,3,8).rotateX(ui/2);function jt(Z){const it=[];if(Z){it.push({geo:w(xt(.0095,.044),1.2,.85,1,0,0,0,0,-.001,.032),color:r.paw});for(const mt of[-.27,-.09,.09,.27])it.push({geo:w(xt(.0044,.012),1,.9,1,.1,mt,0,Math.sin(mt)*.06,-.0035,.059+Math.cos(mt)*.006),color:r.toe})}else{it.push({geo:w(_t(10,8),.0118,.0085,.0155,0,0,0,0,-.001,.012),color:r.paw});for(const mt of[-.42,-.14,.14,.42])it.push({geo:w(xt(.0038,.0065),1,.9,1,.2,mt,0,Math.sin(mt)*.022,-.0035,.0215+Math.cos(mt)*.005),color:r.toe})}return it}const Bt=m(jt(!1)),oe=m(jt(!1)),De=m(jt(!0)),Ut=m(jt(!0));function Vt(){const Z=[0,.16,.36,.56,.74,.88,.96,1],it=[.78,.96,1,.9,.68,.4,.2,0],mt=14,It=.044,Et=.0145,kt=.0095,Gt=[],qt=[];for(let te=0;te<Z.length;te++)for(let ee=0;ee<mt;ee++){const ae=ee/mt*Cs,be=it[te],Te=Math.sin(ae),Ge=Te>=0?kt*be*Te:-.5*kt*be*Te;Gt.push(Et*be*Math.cos(ae),It*Z[te],-Ge)}for(let te=0;te<Z.length-1;te++)for(let ee=0;ee<mt;ee++){const ae=te*mt+ee,be=te*mt+(ee+1)%mt,Te=(te+1)*mt+ee,Ge=(te+1)*mt+(ee+1)%mt;qt.push(ae,be,Te,be,Ge,Te)}const fe=new bn;return fe.setAttribute("position",new Ce(Gt,3)),fe.setIndex(qt),fe.computeVertexNormals(),fe}const pe=(Z,it,mt,It,Et,kt)=>{const Gt=nn(.1,.7,kt)*nn(.0145,.005,Math.abs(Z)+it*.1);return a([0,0,0],a(vt,r.russet,r.back,.25),r.earIn,Gt)},Se=m([{geo:Vt(),colorFn:pe,fuzz:.8}]),re=m([{geo:Vt(),colorFn:pe,fuzz:.8}]),Re=.0172;function we(Z){return[{geo:w(_t(16,12),Re*.74,Re,Re,0,0,0,0,0,0),color:r.eye,gloss:1,fuzz:0},{geo:w(_t(8,6),.0022,.0042,.0042,0,0,0,Re*.74*.82,.0068,.0052*Z),color:r.white,gloss:2,fuzz:0}]}const Je=m(we(1)),J=m(we(-1)),G=[.0425,.015,.011],K=[new Float64Array(9),new Float64Array(9)];for(let Z=0;Z<2;Z++){const it=Z===0?1:-1,mt=new k(it,.14,.3).normalize(),It=new k(0,1,0).addScaledVector(mt,-mt.y).normalize(),Et=new k().crossVectors(mt,It);K[Z].set([mt.x,mt.y,mt.z,It.x,It.y,It.z,Et.x,Et.y,Et.z])}function H(Z){const it=new Hu(Re*.985,.0019,6,22).rotateY(ui/2);it.translate(.0018,0,0);const mt=K[Z];return g.set(mt[0],mt[3],mt[6],G[0]*(Z===0?1:-1),mt[1],mt[4],mt[7],G[1],mt[2],mt[5],mt[8],G[2],0,0,0,1),it.applyMatrix4(g),it}const rt=m([{geo:H(0),color:r.ring,fuzz:.7},{geo:H(1),color:r.ring,fuzz:.7}]),ct=m([{geo:w(_t(10,8),.0078,.0056,.006,0,0,0,0,0,0),color:r.nose,gloss:.75,fuzz:0}]),Ct=[0,-.0135,.0685],Wt=[.035,.037,-.036],de=[new Float64Array(9),new Float64Array(9)];{const Z=new Float64Array(9),it=new Float64Array(9);for(let mt=0;mt<2;mt++){const It=mt===0?1:-1;Mc(Z,-.42*It),hh(it,-.3),Ss(Z,Z,it),uh(it,.55*It),Ss(de[mt],Z,it)}}const ve=d,ze=new bn,Kt=new Float32Array(ve*3),sn=new Float32Array(ve*3),ue=new cn(Kt,3);ue.setUsage(fs);const He=new cn(sn,3);He.setUsage(fs),ze.setAttribute("position",ue),ze.setAttribute("normal",He),ze.setAttribute("color",new Ce(l,3)),ze.setAttribute("aRest",new Ce(h,3)),ze.setAttribute("aMat",new Ce(c,2)),ze.setIndex(f),ze.boundingSphere=new bo(new k(0,.2,-.1),1),ze.boundingBox=new ks(new k(-1,-.8,-1.1),new k(1,1.2,.9));const Tn=Tb(s),Fn=new Mn(ze,Tn);Fn.castShadow=!0,Fn.receiveShadow=!0,n.add(Fn);const vs=[],Di=[],F=[],N=[],tt=[];let W=0;function nt(Z,it,mt,It,Et,kt=0,Gt=0,qt=0){const fe=W++;tt.push(kt,Gt,qt,kt,Gt,qt,kt,Gt,qt,kt,Gt,qt),vs.push(-Z,Z,-it,it);const te=t()<.5;let ee=Et?.84:.004,ae=Et?.94:.715;if(te){const Te=ee;ee=ae,ae=Te}Di.push(ee,.01,ae,.01,ee,.995,ae,.995),F.push(mt[0],mt[1],mt[2],mt[0],mt[1],mt[2],It[0],It[1],It[2],It[0],It[1],It[2]);const be=fe*4;return N.push(be,be+1,be+2,be+1,be+3,be+2),fe}const ot=[];if(i.furCards!==!1)for(let Z=1;Z<ye-3;Z++)for(let it=0;it<_;it++){const mt=S[Z],It=Pt.cs[it],Et=Pt.sn[it],kt=x[Z];let Gt=0,qt=.034,fe=.35,te=.006,ee=.011;if(mt===0&&kt>.1&&kt<.6&&(Gt=.6,qt=.028,fe=.3),mt===1&&kt<.3&&Et<.55&&(Gt=0),mt===1&&Et<-.45&&(Gt=0),mt===1&&kt>.7&&Et<-.8&&(Gt=.6,qt=.022,fe=.32),mt===2&&Et<-.4&&(Gt=.8,qt=.022,fe=.34),mt===3){const Ne=U[Z];Ne<.036&&Ne>-.045&&Et<-.3&&Et>-.9&&Math.abs(It)>.3&&(Gt=.85,qt=.026,fe=.5,te=.006,ee=.011)}if(Gt===0)continue;const ae=Pt.v0+Z*_+it,be=Pt.v0+Z*_+(it+1)%_,Te=ae*3,Ge=[l[Te],l[Te+1],l[Te+2]];for(let Ne=0;Ne<3;Ne++){if(t()>Gt)continue;const Qe=nt(te*.6,ee*t.range(.5,.8),Ge,Ge,!1,.1+.1*t(),.04),xn=fe*t.range(.6,1.4);ot.push(Qe,ae,ae+_,-1,Math.cos(xn),Math.sin(xn),qt*t.range(.7,1.2),be,t())}}const P=new Float32Array(ot),O=ot.length/9,q=[];for(let Z=0;Z<2;Z++)for(let it=0;it<7;it++){const mt=t.range(-.3,.3),It=t.range(-.45,0),Et=Math.hypot(mt,1,It),kt=a([0,0,0],r.russet,r.tailRoot,.3+.3*t()),Gt=nt(.0035,.0055,kt,kt,!1,.15,.1);q.push(Gt,1+Z,t.range(-.004,.004),.027+.002*it,-.003,mt/Et,1/Et,It/Et,t.range(.02,.034))}for(let Z=0;Z<2;Z++){const it=Z===0?1:-1;for(let mt=0;mt<6;mt++){const It=Rt(-.45,.35,mt/5)+t.range(-.06,.06),Et=t.range(.2,.45),kt=Math.hypot(1,It,Et),Gt=nt(.0022,.0012,r.whisk,a([0,0,0],r.whisk,r.cream,.6),!0);q.push(Gt,3+Z,it*0,t.range(-.003,.003),t.range(-.004,.004),it/kt,It/kt,Et/kt,t.range(.05,.075))}}const j=new Float32Array(q),$=q.length/9,Mt=[.017,-.018,.051],pt=W*4,gt=new Float32Array(pt*3),zt=new Float32Array(pt*3),Qt=new Float32Array(pt*3),ie=new bn,Zt=new cn(gt,3),Oe=new cn(zt,3),tn=new cn(Qt,3);Zt.setUsage(fs),Oe.setUsage(fs),tn.setUsage(fs),ie.setAttribute("position",Zt),ie.setAttribute("aDir",Oe),ie.setAttribute("normal",tn),ie.setAttribute("aSide",new Ce(vs,1)),ie.setAttribute("aFx",new Ce(tt,3)),ie.setAttribute("uv",new Ce(Di,2)),ie.setAttribute("color",new Ce(F,3)),ie.setIndex(N),ie.boundingSphere=ze.boundingSphere,ie.boundingBox=ze.boundingBox;const ln=Ab(on(4242)),Pn=Cb(s,ln,new ge(15917764)),en=new Mn(ie,Pn);en.castShadow=!1,en.receiveShadow=!0,n.add(en);const _e=Ri*(z+1),Ai=new Float32Array(_e*3),rn=new Float32Array(_e*3),ri=new Float32Array(_e*3),Fs={value:1},wn=new Gu,Os=new cn(Ai,3),fn=new cn(rn,3),Ci=new cn(ri,3);Os.setUsage(fs),fn.setUsage(fs),Ci.setUsage(fs);{const Z=[],it=[],mt=[],It=[];for(let Et=0;Et<Ri;Et++)for(let kt=0;kt<=z;kt++){const Gt=Et/(Ri-1);Z.push(kt/z,Gt*1),it.push(gb*dt(Gt)*(Et===0?.35:Et===1?.7:1))}for(let Et=0;Et<Ri-1;Et++)for(let kt=0;kt<z;kt++){const Gt=Et*(z+1)+kt,qt=Gt+1,fe=Gt+z+1,te=fe+1;mt.push(Gt,qt,fe,qt,te,fe)}for(let Et=0;Et<D;Et++)It.push((Et+1)/D);wn.setAttribute("position",Os),wn.setAttribute("normal",fn),wn.setAttribute("aTan",Ci),wn.setAttribute("aSuv",new Ce(Z,2)),wn.setAttribute("aLen",new Ce(it,1)),wn.setAttribute("aShell",new Ds(new Float32Array(It),1)),wn.setIndex(mt),wn.instanceCount=D,wn.boundingSphere=ze.boundingSphere,wn.boundingBox=ze.boundingBox}const qo=Eb(s,Fs,{root:new ge(4860442),mid:new ge(9851434),tip:new ge(16181972)}),ai=new Mn(wn,qo);ai.castShadow=!1,ai.receiveShadow=!0,n.add(ai);function ss(Z,it,mt,It,Et,kt,Gt,qt,fe,te,ee){const ae=Z*12,be=it+Et*qt,Te=mt+kt*qt,Ge=It+Gt*qt;gt[ae]=it,gt[ae+1]=mt,gt[ae+2]=It,gt[ae+3]=it,gt[ae+4]=mt,gt[ae+5]=It,gt[ae+6]=be,gt[ae+7]=Te,gt[ae+8]=Ge,gt[ae+9]=be,gt[ae+10]=Te,gt[ae+11]=Ge;for(let Ne=0;Ne<12;Ne+=3)zt[ae+Ne]=Et,zt[ae+Ne+1]=kt,zt[ae+Ne+2]=Gt,Qt[ae+Ne]=fe,Qt[ae+Ne+1]=te,Qt[ae+Ne+2]=ee}function Ii(Z,it,mt,It,Et,kt,Gt,qt,fe,te,ee,ae,be,Te,Ge){const Ne=Z.ns,Qe=Z.cs,xn=Z.sn;let zn=(Z.v0+it*Ne)*3;Z.cen[it*3]=mt,Z.cen[it*3+1]=It,Z.cen[it*3+2]=Et;for(let Bn=0;Bn<Ne;Bn++){const li=Qe[Bn],In=xn[Bn],En=li*(In<0?ae*(1+(Ge-1)*Math.min(1,-In*2.2)):ae),pn=In*(In>=0?be:Te);Kt[zn++]=mt+kt*En+fe*pn,Kt[zn++]=It+Gt*En+te*pn,Kt[zn++]=Et+qt*En+ee*pn}}function br(Z){const{v0:it,nr:mt,ns:It,cen:Et}=Z;for(let kt=0;kt<mt;kt++){const Gt=kt<mt-1?kt+1:kt,qt=kt>0?kt-1:kt,fe=kt===0&&Z.capA||kt===mt-1&&Z.capB;for(let te=0;te<It;te++){const ee=(it+kt*It+te)*3;let ae,be,Te;if(fe){const Ne=kt===0?1:mt-2,Qe=1;ae=(Et[kt*3]-Et[Ne*3])*Qe,be=(Et[kt*3+1]-Et[Ne*3+1])*Qe,Te=(Et[kt*3+2]-Et[Ne*3+2])*Qe}else{const Ne=(it+Gt*It+te)*3,Qe=(it+qt*It+te)*3,xn=(it+kt*It+(te+1)%It)*3,zn=(it+kt*It+(te+It-1)%It)*3,Bn=Kt[Ne]-Kt[Qe],li=Kt[Ne+1]-Kt[Qe+1],In=Kt[Ne+2]-Kt[Qe+2],En=Kt[xn]-Kt[zn],pn=Kt[xn+1]-Kt[zn+1],oi=Kt[xn+2]-Kt[zn+2];ae=pn*In-oi*li,be=oi*Bn-En*In,Te=En*li-pn*Bn}const Ge=Math.sqrt(ae*ae+be*be+Te*Te)||1;sn[ee]=ae/Ge,sn[ee+1]=be/Ge,sn[ee+2]=Te/Ge}}}function wr(Z,it,mt,It,Et,kt){const Gt=Z.rp,qt=Z.rn;let fe=Z.v0*3;for(let te=0,ee=0;te<Z.n;te++,ee+=3){const ae=Gt[ee],be=Gt[ee+1]*kt,Te=Gt[ee+2];Kt[fe]=mt+it[0]*ae+it[3]*be+it[6]*Te,Kt[fe+1]=It+it[1]*ae+it[4]*be+it[7]*Te,Kt[fe+2]=Et+it[2]*ae+it[5]*be+it[8]*Te;const Ge=qt[ee],Ne=qt[ee+1],Qe=qt[ee+2];sn[fe]=it[0]*Ge+it[3]*Ne+it[6]*Qe,sn[fe+1]=it[1]*Ge+it[4]*Ne+it[7]*Qe,sn[fe+2]=it[2]*Ge+it[5]*Ne+it[8]*Qe,fe+=3}}let wo=1,So=0,To=0,Bs=0,Vs=1,Hs=0;function Gs(Z,it,mt,It,Et,kt){const Gt=It*Z+Et*it+kt*mt;let qt=It-Z*Gt,fe=Et-it*Gt,te=kt-mt*Gt;const ee=Math.sqrt(qt*qt+fe*fe+te*te)||1;qt/=ee,fe/=ee,te/=ee,wo=qt,So=fe,To=te,Bs=it*te-mt*fe,Vs=mt*qt-Z*te,Hs=Z*fe-it*qt}let s0=0,o0=0,r0=0,wl=0,Sl=0,Tl=0;function tf(Z,it,mt,It,Et,kt,Gt,qt,fe,te,ee,ae,be){const Te=be*be,Ge=Te*be,Ne=2*Ge-3*Te+1,Qe=Ge-2*Te+be,xn=-2*Ge+3*Te,zn=Ge-Te;s0=Ne*Z+Qe*It+xn*Gt+zn*te,o0=Ne*it+Qe*Et+xn*qt+zn*ee,r0=Ne*mt+Qe*kt+xn*fe+zn*ae;const Bn=6*Te-6*be,li=3*Te-4*be+1,In=-6*Te+6*be,En=3*Te-2*be;let pn=Bn*Z+li*It+In*Gt+En*te,oi=Bn*it+li*Et+In*qt+En*ee,jn=Bn*mt+li*kt+In*fe+En*ae;const Ht=Math.sqrt(pn*pn+oi*oi+jn*jn)||1;wl=pn/Ht,Sl=oi/Ht,Tl=jn/Ht}function Ws(Z,it,mt,It,Et){return .5*(2*it+(-Z+mt)*Et+(2*Z-5*it+4*mt-It)*Et*Et+(-Z+3*it-3*mt+It)*Et*Et*Et)}function qs(Z,it,mt,It,Et){return .5*(-Z+mt+2*(2*Z-5*it+4*mt-It)*Et+3*(-Z+3*it-3*mt+It)*Et*Et)}function ef(Z,it,mt,It,Et,kt,Gt,qt,fe,te,ee,ae,be,Te){const Ge=Z.T,Ne=Z.R;for(let Qe=0;Qe<Ge.length;Qe++){const xn=Ge[Qe];let zn,Bn,li,In,En,pn;if(xn<=1){const ne=2*it-Et,Ee=2*mt-kt,Ve=2*It-Gt;zn=Ws(ne,it,Et,qt,xn),Bn=Ws(Ee,mt,kt,fe,xn),li=Ws(Ve,It,Gt,te,xn),In=qs(ne,it,Et,qt,xn),En=qs(Ee,mt,kt,fe,xn),pn=qs(Ve,It,Gt,te,xn)}else{const ne=xn-1,Ee=2*qt-Et,Ve=2*fe-kt,Wn=2*te-Gt;zn=Ws(it,Et,qt,Ee,ne),Bn=Ws(mt,kt,fe,Ve,ne),li=Ws(It,Gt,te,Wn,ne),In=qs(it,Et,qt,Ee,ne),En=qs(mt,kt,fe,Ve,ne),pn=qs(It,Gt,te,Wn,ne)}const oi=Math.sqrt(In*In+En*En+pn*pn)||1;Gs(In/oi,En/oi,pn/oi,ee,ae,be);const jn=Ne[Qe],Ht=Rt(Te,1,nn(.6,1.3,xn));Ii(Z,Qe,zn,Bn,li,wo,So,To,Bs,Vs,Hs,jn*Ht,jn,jn,1)}br(Z)}const ht=new Float32Array(lr),nf=new Float32Array(lr),sf=new Float32Array(lr),of=new Float32Array(lr),rf=new Float32Array(lr),af=new Float32Array(lr),ce=new Float64Array(9),Gi=new Float64Array(9),Sr=new Float64Array(9),Be=new Float64Array(9),Tr=new Float64Array(3),a0=new Float64Array(4),Me=new Float32Array((yi+1)*3),Er=new Float32Array((yi+1)*3),si=new Float32Array((yi+1)*3),ys=new Float32Array((yi+1)*3),l0=new Float32Array(Ri*3),Ar=new Float32Array(Ri*3),c0=new Float32Array(Ri*3),h0=new Float32Array(Ri*3);let lf=!1;const Xs=new Float64Array(3),Wi=new Float64Array(5*3),u0=[ce,new Float64Array(9),new Float64Array(9),new Float64Array(9),new Float64Array(9)],et={time:0,phase:.4,moveW:0,airW:0,steep:0,thin:0,climb:0,alert:0,turn:0,speedS:0,prevSpeed:0,wasMoving:!1,wasAir:!1,jumpT:-1,landT:-1,landK:0,launchT:-1,launchK:1,attackT:-1,throwT:-1,hurtT:-1,pickupT:-1,chatterT:-1,lookYaw:0,lookPit:0,lookRol:0,lookVY:0,lookVP:0,lookVR:0,tgtYaw:0,tgtPit:0,tgtRol:0,sacTimer:.3,earT:[-1,-1],earNext:[.8,1.7],earAng:[0,0],blinkT:-1,blinkNext:2.2,noseEnv:0,noseNext:.5,flickT:-1,flickNext:1.6,flickSide:1,fall:0,breath:0},On=on((i.seed??1)*104729+7>>>0);function Pm(Z,it){switch(Z){case"jump":et.jumpT=0;break;case"land":et.landT=0,et.landK=vn(it&&it.impact!=null?it.impact:.5,0,1),et.phase=.02;break;case"burst":et.launchT=0,et.launchK=1.8,f0(1.8);break;case"attack":et.attackT=0;break;case"throw":et.throwT=0;break;case"hurt":et.hurtT=0,f0(1.2),et.earT[0]=et.earT[1]=0;break;case"pickup":et.pickupT=0;break;case"chatter":et.chatterT=0;break}}function f0(Z){for(let it=1;it<=yi;it++){const mt=it/yi;si[it*3+1]+=1.6*Z*mt,si[it*3+2]-=1.2*Z*mt}}const _s=(Z,it,mt)=>Z<0||Z+it>mt?-1:Z+it;function cf(Z,it){Z=vn(Z||0,0,.1);const mt=Math.max(0,it.speed||0),It=it.mode==="air",Et=it.time!=null?it.time:et.time+Z;et.time=Et;const kt=!It&&mt>.08;kt&&!et.wasMoving&&!et.wasAir&&(et.phase=.42,(et.launchT<0||et.launchT>.1)&&(et.launchT=0,et.launchK=1,f0(.7+.5*vn(mt/8,0,1)))),et.wasMoving=kt,et.wasAir=It,et.moveW=zo(et.moveW,kt?1:0,kt?.028:.035,Z),et.airW=zo(et.airW,It?1:0,It?.05:.035,Z),et.steep=zo(et.steep,vn(it.steep||0,0,1),.08,Z),et.thin=zo(et.thin,vn(it.thin||0,0,1),.1,Z),et.climb=zo(et.climb,vn(it.climb||0,-1,1),.1,Z),et.alert=zo(et.alert,vn(it.alert||0,0,1),.06,Z),et.turn=zo(et.turn,it.turn||0,.07,Z),et.fall=zo(et.fall,nn(1.5,-3.5,it.airUp||0),.06,Z),It||(et.phase=nl(et.phase+mt*Z/Tm(mt,et.steep)));const Gt=vn(mt/12,0,1),qt=(1-et.moveW)*(1-et.airW),fe=et.alert*qt;if(et.jumpT=_s(et.jumpT,Z,.5),et.landT=_s(et.landT,Z,.5),et.launchT=_s(et.launchT,Z,.45),et.attackT=_s(et.attackT,Z,.25),et.throwT=_s(et.throwT,Z,.3),et.hurtT=_s(et.hurtT,Z,.5),et.pickupT=_s(et.pickupT,Z,.2),et.chatterT=_s(et.chatterT,Z,.95),et.flickT=_s(et.flickT,Z,.34),et.blinkT=_s(et.blinkT,Z,.13),vb(nf),yb(sf),_c(ht,nf,sf,nn(0,1,et.alert)),et.steep>.002&&(_b(of,Math.max(0,-et.climb),et.alert),_c(ht,ht,of,nn(0,1,et.steep))),et.thin>.002){const Ht=et.thin,ne=1-.84*Ht;ht[ko]*=Rt(1,ne,1-ht[sa]*0),ht[No]*=ne,ht[Xc]*=ne,ht[Yc]*=ne,ht[ds]-=.01*Ht,ht[Qn]-=.012*Ht*(1-et.alert),ht[ms]=Rt(ht[ms],.22,.8*Ht),ht[po]=Rt(ht[po],0,.8*Ht),ht[mo]=Rt(ht[mo],.02,.8*Ht)}if(et.moveW>.002&&(Mb(rf,et.phase,mt,et.steep,et.climb,et.thin),_c(ht,ht,rf,et.moveW)),et.airW>.002&&(bb(af,et.fall),_c(ht,ht,af,et.airW)),et.thin>.002){const Ht=Math.sin(Et*3.1)*.6+Math.sin(Et*5.3+1.3)*.4;ht[xc]+=.07*et.thin*Ht*(1-et.airW),ht[il]-=.07*et.thin*Ht*(1-et.airW)}const te=vn(et.turn,-8,8);ht[Nc]+=vn(te*.075,-.5,.5)*(1-.5*et.airW),ht[il]+=vn(-te*.03*(.3+Gt),-.3,.3)*et.moveW,ht[ah]+=vn(te*.06,-.5,.5),ht[xc]+=vn(te*.014,-.09,.09);const ee=Rt(2.4,5.2,et.alert);et.breath=Math.sin(Et*Cs*ee)*Rt(.022,.014,et.alert)*qt+Math.sin(Et*Cs*3.1)*.006*(1-qt);let ae=1,be=1,Te=0,Ge=.45*Gt*et.moveW+.6*et.airW;if(et.launchT>=0){const Ht=et.launchT,ne=et.launchK,Ee=Ht<.075?Math.sin(ui*Ht/.075):0,Ve=nn(.04,.09,Ht)*Math.exp(-Math.max(0,Ht-.09)/.09);ht[Qn]-=.026*ne*Ee,ht[ds]-=.02*ne*Ee,ht[fo]+=.2*ne*Ee,ht[ps]-=.1*ne*Ee,ht[Li]+=.12*ne*Ve,ht[fi]+=.012*ne*Ve,ht[Go]-=.01*ne*Ve,be*=1-.07*ne*Ee+.05*ne*Ve,ae*=1-.05*ne*Ee,Ge+=.5*Ve}if(et.jumpT>=0){const Ht=Math.exp(-et.jumpT/.11);be*=1+.13*Ht,ae*=1-.04*Ht}if(et.landT>=0){const Ht=et.landT,ne=et.landK,Ee=Math.exp(-Ht/.075)*Math.cos(Ht*24);ae*=1-.3*ne*Ee,be*=1+.06*ne*Ee;const Ve=Math.exp(-Ht/.07)*ne;ht[Qn]-=.03*Ve,ht[ds]-=.022*Ve,ht[Li]-=.15*Ve}if(et.attackT>=0){const Ht=et.attackT/.25,ne=Math.sin(ui*vn(Ht/.26,0,1)),Ee=nn(.16,.38,Ht)*(1-nn(.6,1,Ht)),Ve=nn(0,.1,Ht)*(1-nn(.72,1,Ht));ht[fi]+=-.02*ne+.075*Ee,ht[Qn]+=.03*ne+.012*Ee,ht[ps]+=.25*ne-.1*Ee,ht[Go]+=.03*Ee,ht[Oi]+=.028*Ee,ht[Rs]+=.012*ne-.012*Ee;const Wn=Math.sin(ui*vn((Ht-.3)/.3,0,1));ht[Li]+=.3*ne-.4*Wn,ht[ms]+=.5*Ee;const gi=nn(.16,.4,Ht),qi=Rt(ht[Qn]+.06,.05,gi),Xi=Rt(ht[fi]+.085,ht[fi]+.2,gi),Ys=Rt(-.9,.5,gi);ht[ko]=Rt(ht[ko],Rt(.042,.022,gi),Ve),ht[la]=Rt(ht[la],qi,Ve),ht[ca]=Rt(ht[ca],Xi,Ve),ht[pr]=Rt(ht[pr],Ys,Ve),ht[No]=Rt(ht[No],-Rt(.042,.022,gi),Ve),ht[ha]=Rt(ht[ha],qi+.012,Ve),ht[ua]=Rt(ht[ua],Xi-.012,Ve),ht[mr]=Rt(ht[mr],Ys,Ve),be*=1+.06*Ee,Ge+=.6*Ve}if(et.throwT>=0){const Ht=et.throwT/.3,ne=nn(0,.28,Ht)*(1-nn(.7,1,Ht)),Ee=nn(0,.12,Ht)*(1-nn(.75,1,Ht)),Ve=nn(.4,.58,Ht),Wn=ne*(1-ht[sa]);ht[Qn]+=.075*Wn,ht[fi]-=.035*Wn,ht[ps]+=.7*Wn,ht[fo]+=.35*Wn,ht[ds]-=.015*Wn,ht[Rs]+=.03*Wn-.01*Ve*ne,ht[Oi]-=.035*Wn,ht[fi]+=.03*Ve*ne,ht[Li]+=.2*ne*(1-Ve)-.15*Ve*ne;const gi=Rt(ht[Qn]+.085,ht[Qn]+.01,Ve),qi=Rt(ht[fi]+.03,ht[fi]+.17,Ve),Xi=Rt(1,-.3,Ve);ht[ko]=Rt(ht[ko],.026,Ee),ht[la]=Rt(ht[la],gi,Ee),ht[ca]=Rt(ht[ca],qi,Ee),ht[pr]=Rt(ht[pr],Xi,Ee),ht[No]=Rt(ht[No],-.026,Ee),ht[ha]=Rt(ht[ha],gi,Ee),ht[ua]=Rt(ht[ua],qi,Ee),ht[mr]=Rt(ht[mr],Xi,Ee),ht[ms]+=.35*Ve*ne}let Ne=0;if(et.hurtT>=0){const Ht=et.hurtT,ne=Math.exp(-Ht/.11);ae*=1-.24*ne*Math.cos(Ht*20),be*=1-.08*ne,ht[fi]-=.03*ne,ht[Oi]-=.02*ne,ht[Li]+=.45*ne,ht[Qn]+=.012*ne,ht[il]+=.22*ne*Math.sin(Ht*46),Ne=Math.exp(-Ht/.09),Ht<.26&&(Te=1),Ge=1}if(s.value=Ne,et.pickupT>=0){const Ht=Math.sin(ui*et.pickupT/.2),ne=Ht*Ht;ht[Li]-=.55*ne,ht[Rs]-=.03*ne,ht[Oi]+=.012*ne,ht[Qn]-=.008*ne}let Qe=0;if(et.chatterT>=0){const Ht=et.chatterT,ne=nn(0,.06,Ht)*(1-nn(.7,.95,Ht)),Ee=Math.sin(Cs*7.5*Ht);Qe+=Math.max(0,Ee)*Math.max(0,Ee)*ne*1.1,ht[Qn]+=.012*Ee*ne,ht[ds]+=.004*Ee*ne,ht[Oi]+=.012*Math.max(0,Ee)*ne,ht[Li]+=.1*Ee*ne}if(qt>.5&&et.alert>.15&&(et.flickNext-=Z,et.flickNext<=0&&(et.flickT=0,et.flickNext=On.range(1.4,4.2),et.flickSide=On.sign())),et.flickT>=0){const Ht=et.flickT,ne=Ht<.09?Math.sin(ui*Ht/.09):0,Ee=Ht>.15&&Ht<.24?Math.sin(ui*(Ht-.15)/.09):0;Qe+=(ne*ne+Ee*Ee)*qt,ht[xc]+=.05*et.flickSide*(ne-Ee)*qt}if(Qe>0&&(ht[ms]-=.55*Qe,ht[mo]+=.2*Qe,ht[po]+=.04*Qe),et.sacTimer-=Z,et.sacTimer<=0){et.sacTimer=On.range(.3,1.2);const Ht=it.lookLocal;if(Ht&&On()<.68){const ne=Ht.x,Ee=Ht.y-(ht[Qn]+ht[Rs]),Ve=Ht.z-(ht[fi]+ht[Oi]);et.tgtYaw=vn(Math.atan2(ne,Ve),-1.9,1.9)+On.range(-.08,.08),et.tgtPit=vn(Math.atan2(Ee,Math.hypot(ne,Ve)),-.7,.9)+On.range(-.05,.05),et.tgtRol=On.range(-.12,.12)}else et.tgtYaw=On.range(.25,1.25)*On.sign(),On()<.25&&(et.tgtYaw=On.range(-.2,.2)),et.tgtPit=On.range(-.15,.32),et.tgtRol=On()<.3?On.range(-.3,.3):On.range(-.06,.06);fe>.3&&On()<.5&&(et.earT[On()<.5?0:1]=0)}for(let Ht=0;Ht<2;Ht++)et.earNext[Ht]-=Z*(.4+fe),et.earNext[Ht]<=0&&(et.earT[Ht]=0,et.earNext[Ht]=On.range(.5,2.6)),et.earT[Ht]>=0&&(et.earT[Ht]+=Z,et.earT[Ht]>.16&&(et.earT[Ht]=-1)),et.earAng[Ht]=et.earT[Ht]>=0?Math.sin(ui*et.earT[Ht]/.16):0;et.blinkNext-=Z,et.blinkNext<=0&&(et.blinkT=0,et.blinkNext=On.range(1.8,5.5)),et.blinkT>=0&&(Te=Math.max(Te,Math.sin(ui*et.blinkT/.13))),et.noseNext-=Z,et.noseNext<=0&&(et.noseEnv=1,et.noseNext=On.range(.5,1.8)),et.noseEnv=Math.max(0,et.noseEnv-Z/.45);const xn=Math.sin(Et*58)*et.noseEnv*(.4+.6*qt),zn=fe+0,Bn=et.tgtYaw*zn,li=et.tgtPit*zn,In=et.tgtRol*zn,En=Z>1e-6?Math.min(8,Math.ceil(Z/(1/120))):0,pn=En?Z/En:0;for(let Ht=0;Ht<En;Ht++)et.lookVY+=((Bn-et.lookYaw)*62*62-et.lookVY*89.28)*pn,et.lookYaw+=et.lookVY*pn,et.lookVP+=((li-et.lookPit)*62*62-et.lookVP*89.28)*pn,et.lookPit+=et.lookVP*pn,et.lookVR+=((In-et.lookRol)*62*62-et.lookVR*89.28)*pn,et.lookRol+=et.lookVR*pn;const oi=et.lookYaw,jn=et.lookPit;ht[ah]+=oi*.78,ht[Nc]+=oi*.22*(1-et.steep*.6),ht[Li]+=jn,ht[Jd]+=et.lookRol,ht[ps]+=.05*jn*ht[sa],ae=vn(ae,.55,1.4),be=vn(be,.7,1.4),n.scale.set(1/Math.sqrt(ae*be),ae,be),Lm(Z,En,pn,mt,xn,Te,Ge),et.prevSpeed=mt}function Lm(Z,it,mt,It,Et,kt,Gt){const qt=ht[Nc],fe=-.35*qt,te=.65*qt,ee=ht[il],ae=0,be=ht[ds],Te=ht[Go],Ge=0,Ne=ht[Qn],Qe=ht[fi],xn=Math.cos(ht[fo]),zn=Math.sin(ht[fo]),Bn=Math.cos(ht[ps]),li=Math.sin(ht[ps]),In=Math.sin(fe),En=Math.cos(fe),pn=Math.sin(te),oi=Math.cos(te),jn=In*xn,Ht=zn,ne=En*xn,Ee=pn*Bn,Ve=li,Wn=oi*Bn,gi=Math.cos(ee),qi=Math.sin(ee);Gs(jn,Ht,ne,En,0,-In);const Xi=wo*gi+Bs*qi,Ys=So*gi+Vs*qi,Cr=To*gi+Hs*qi;Gs(jn,Ht,ne,Xi,Ys,Cr);const El=Bs,Al=Vs,Cl=Hs;Gs(Ee,Ve,Wn,oi,0,-pn);const La=wo*gi+Bs*qi,Da=So*gi+Vs*qi,Ia=To*gi+Hs*qi;Gs(Ee,Ve,Wn,La,Da,Ia);const Im=Bs,Um=Vs,zm=Hs;uh(ce,te+ht[ah]),hh(Gi,-ht[Li]),Ss(ce,ce,Gi),Mc(Gi,ht[Jd]+ee*.3),Ss(ce,ce,Gi);const $s=Ge+pn*ht[Oi],js=Ne+ht[Rs],Ks=Qe+oi*ht[Oi];Tr[0]=$s,Tr[1]=js,Tr[2]=Ks;const hf=$s+ce[6]*Ft[0][0]+ce[3]*Ft[0][1],uf=js+ce[7]*Ft[0][0]+ce[4]*Ft[0][1],ff=Ks+ce[8]*Ft[0][0]+ce[5]*Ft[0][1],Xo=Math.hypot(Ge-ae,Ne-be,Qe-Te),Rr=Math.hypot(hf-Ge,uf-Ne,ff-Qe)*1.05,Rl=ht[sa],df=et.breath,d0=vn(Math.sqrt(.185/Math.max(.08,Xo)),.9,1.12);for(let he=0;he<ye;he++){const Jt=S[he],Ye=x[he];let Ae=y[he],Pe=b[he],Ie=C[he];if(Jt===3){const me=U[he],Ue=R[he];Ii(Pt,he,$s+ce[6]*me+ce[3]*Ue,js+ce[7]*me+ce[4]*Ue,Ks+ce[8]*me+ce[5]*Ue,ce[0],ce[1],ce[2],ce[3],ce[4],ce[5],Ae,Pe,Ie,L[he]);continue}if(Jt===0){const me=1-Ye;s0=ae-jn*me*er-El*.016*me*me,o0=be-Ht*me*er-Al*.016*me*me,r0=Te-ne*me*er-Cl*.016*me*me;let Ue=jn*er+El*.032*me,se=Ht*er+Al*.032*me,$e=ne*er+Cl*.032*me;const We=Math.sqrt(Ue*Ue+se*se+$e*$e);wl=Ue/We,Sl=se/We,Tl=$e/We,Gs(wl,Sl,Tl,Xi,Ys,Cr),Ae*=1+.16*Rl,Ie*=1+.1*Rl}else if(Jt===1){tf(ae,be,Te,jn*Xo,Ht*Xo,ne*Xo,Ge,Ne,Qe,Ee*Xo,Ve*Xo,Wn*Xo,Ye),Gs(wl,Sl,Tl,Rt(Xi,La,Ye),Rt(Ys,Da,Ye),Rt(Cr,Ia,Ye));const me=Math.sin(ui*vn(Ye*.9+.1,0,1));Ae*=(1+df*me+.16*Rl*(1-Ye))*Rt(1,d0,me),Ie*=(1+df*1.2*me+.12*Rl*(1-Ye))*Rt(1,d0,me),Pe*=Rt(1,d0,me)}else{tf(Ge,Ne,Qe,Ee*Rr*.75,Ve*Rr*.75,Wn*Rr*.75,hf,uf,ff,ce[6]*Rr*.6,ce[7]*Rr*.6,ce[8]*Rr*.6,Ye);const me=Ye*Ye*(3-2*Ye);let Ue=Rt(Ee,ce[6],me),se=Rt(Ve,ce[7],me),$e=Rt(Wn,ce[8],me);const We=Math.sqrt(Ue*Ue+se*se+$e*$e)||1;Ue/=We,se/=We,$e/=We,Gs(Ue,se,$e,Rt(La,ce[0],me),Rt(Da,ce[1],me),Rt(Ia,ce[2],me))}Ii(Pt,he,s0,o0,r0,wo,So,To,Bs,Vs,Hs,Ae,Pe,Ie,1)}br(Pt);const Zs=ht[n0];for(let he=0;he<2;he++){const Jt=he===0?1:-1;{const Ye=ae+Xi*Jt*.05-El*.018+jn*.008,Ae=be+Ys*Jt*.05-Al*.018+Ht*.008,Pe=Te+Cr*Jt*.05-Cl*.018+ne*.008,Ie=he===0?Xc:Yc,me=ht[he===0?ju:Ku],Ue=fe*.5+Jt*ht[Zu],se=Math.sin(Ue),$e=Math.cos(Ue),We=Math.cos(me),mn=Math.sin(me),Kn=ht[Ie],Ui=ht[Ie+1],An=ht[Ie+2],Yi=Kn-se*We*lh,zi=Ui+mn*lh+.0105,za=An-$e*We*lh;tp(Ye,Ae,Pe,Yi,zi,za,fb,db,Jt*(.75+1.5*Zs),-.3+.32*Zs,1-.5*Zs),a0[2+he]=Math.hypot(cr-Yi,hr-zi,ur-za),ef(he===0?Yt:Tt,Ye,Ae,Pe,xu,vu,yu,cr,hr,ur,Xi,Ys,Cr,.68+.28*Zs),Be[6]=se*We,Be[7]=-mn,Be[8]=$e*We,Be[0]=$e,Be[1]=0,Be[2]=-se,Be[3]=Be[7]*Be[2]-Be[8]*Be[1],Be[4]=Be[8]*Be[0]-Be[6]*Be[2],Be[5]=Be[6]*Be[1]-Be[7]*Be[0],wr(he===0?De:Ut,Be,cr,hr,ur,1)}{const Ye=Ge+La*Jt*.034-Im*.03+Ee*.02,Ae=Ne+Da*Jt*.034-Um*.03+Ve*.02,Pe=Qe+Ia*Jt*.034-zm*.03+Wn*.02,Ie=he===0?ko:No,me=ht[he===0?pr:mr],Ue=te*.6-Jt*.12*(1-Zs)*0+Jt*.25*Zs,se=Math.sin(Ue),$e=Math.cos(Ue),We=Math.cos(me),mn=Math.sin(me),Kn=ht[Ie],Ui=ht[Ie+1],An=ht[Ie+2],Yi=Kn-se*We*ch,zi=Ui+mn*ch+.0085,za=An-$e*We*ch;tp(Ye,Ae,Pe,Yi,zi,za,pb,mb,Jt*(.28+1.9*Zs),.45-1*ht[sa]-.42*Zs,-1+.5*Zs),a0[he]=Math.hypot(cr-Yi,hr-zi,ur-za),ef(he===0?at:At,Ye,Ae,Pe,xu,vu,yu,cr,hr,ur,La,Da,Ia,.85),Be[6]=se*We,Be[7]=-mn,Be[8]=$e*We,Be[0]=$e,Be[1]=0,Be[2]=-se,Be[3]=Be[7]*Be[2]-Be[8]*Be[1],Be[4]=Be[8]*Be[0]-Be[6]*Be[2],Be[5]=Be[6]*Be[1]-Be[7]*Be[0],wr(he===0?Bt:oe,Be,cr,hr,ur,1)}}for(let he=0;he<2;he++){const Jt=he===0?1:-1,Ye=et.earAng[he];hh(Gi,-.75*Gt-.35*Ye),Mc(Sr,Jt*(-.25*Ye-.25*Gt)),Ss(Gi,Gi,Sr);const Ae=u0[1+he];Ss(Ae,ce,de[he]),Ss(Ae,Ae,Gi);const Pe=$s+ce[0]*Wt[0]*Jt+ce[3]*Wt[1]+ce[6]*Wt[2],Ie=js+ce[1]*Wt[0]*Jt+ce[4]*Wt[1]+ce[7]*Wt[2],me=Ks+ce[2]*Wt[0]*Jt+ce[5]*Wt[1]+ce[8]*Wt[2];wr(he===0?Se:re,Ae,Pe,Ie,me,1),Wi[(1+he)*3]=Pe,Wi[(1+he)*3+1]=Ie,Wi[(1+he)*3+2]=me,Ss(Sr,ce,K[he]);const Ue=$s+ce[0]*G[0]*Jt+ce[3]*G[1]+ce[6]*G[2],se=js+ce[1]*G[0]*Jt+ce[4]*G[1]+ce[7]*G[2],$e=Ks+ce[2]*G[0]*Jt+ce[5]*G[1]+ce[8]*G[2];wr(he===0?Je:J,Sr,Ue,se,$e,1-.9*kt);const We=u0[3+he];uh(Gi,Jt*.16*Et),Mc(Sr,Jt*.08*Et),Ss(Gi,Gi,Sr),Ss(We,ce,Gi),Wi[(3+he)*3]=$s+ce[0]*Mt[0]*Jt+ce[3]*Mt[1]+ce[6]*Mt[2],Wi[(3+he)*3+1]=js+ce[1]*Mt[0]*Jt+ce[4]*Mt[1]+ce[7]*Mt[2],Wi[(3+he)*3+2]=Ks+ce[2]*Mt[0]*Jt+ce[5]*Mt[1]+ce[8]*Mt[2]}Wi[0]=$s,Wi[1]=js,Wi[2]=Ks,wr(rt,ce,$s,js,Ks,1);{const he=Ct[1]+.0012*Et,Jt=Ct[2];wr(ct,ce,$s+ce[3]*he+ce[6]*Jt,js+ce[4]*he+ce[7]*Jt,Ks+ce[5]*he+ce[8]*Jt,1+.12*Et)}const Yo=ae-jn*.074+El*.026,Ua=be-Ht*.074+Al*.026,$o=Te-ne*.074+Cl*.026;{let he=Yo,Jt=Ua,Ye=$o;ys[0]=he,ys[1]=Jt,ys[2]=Ye;for(let Ae=1;Ae<=yi;Ae++){const Pe=ht[ms]+ht[po]*Math.min(Ae-1,Qd)+ht[mo]*Math.max(0,Ae-1-Qd),Ie=fe-ht[xc]*Ae,me=Math.cos(Pe),Ue=Math.sin(Pe);he+=-Math.sin(Ie)*me*vc,Jt+=Ue*vc,Ye+=-Math.cos(Ie)*me*vc,ys[Ae*3]=he,ys[Ae*3+1]=Math.max(Jt,.03),ys[Ae*3+2]=Ye}}if(lf||(lf=!0,Me.set(ys),si.fill(0),Xs[0]=Yo,Xs[1]=Ua,Xs[2]=$o),it>0){const he=vn(It-et.prevSpeed,-6,6),Jt=-et.turn*Z*.85,Ye=Math.cos(Jt),Ae=Math.sin(Jt);for(let Ie=1;Ie<=yi;Ie++){const me=Ie/yi,Ue=Ie*3;si[Ue+2]-=he*.5*me,si[Ue+1]+=Math.abs(he)*.16*me;const se=Me[Ue]-Yo,$e=Me[Ue+2]-$o;Me[Ue]=Yo+se*Ye+$e*Ae,Me[Ue+2]=$o-se*Ae+$e*Ye}const Pe=ht[Ca];for(let Ie=0;Ie<it;Ie++){const me=(Ie+1)/it;Me[0]=Rt(Xs[0],Yo,me),Me[1]=Rt(Xs[1],Ua,me),Me[2]=Rt(Xs[2],$o,me);for(let Ue=1;Ue<=yi;Ue++){const se=Ue*3,$e=Ue/yi,We=Rt(1500,190,Math.pow($e,.7))*Pe*Pe,mn=2*.42*Math.sqrt(We);si[se]+=((ys[se]-Me[se])*We-si[se]*mn)*mt,si[se+1]+=((ys[se+1]-Me[se+1])*We-si[se+1]*mn)*mt,si[se+2]+=((ys[se+2]-Me[se+2])*We-si[se+2]*mn)*mt,Er[se]=Me[se],Er[se+1]=Me[se+1],Er[se+2]=Me[se+2],Me[se]+=si[se]*mt,Me[se+1]+=si[se+1]*mt,Me[se+2]+=si[se+2]*mt}for(let Ue=1;Ue<=yi;Ue++){const se=Ue*3,$e=se-3;let We=Me[se]-Me[$e],mn=Me[se+1]-Me[$e+1],Kn=Me[se+2]-Me[$e+2];const Ui=Math.sqrt(We*We+mn*mn+Kn*Kn)||1e-6,An=vc/Ui;Me[se]=Me[$e]+We*An,Me[se+1]=Me[$e+1]+mn*An,Me[se+2]=Me[$e+2]+Kn*An,Me[se+1]<.028&&(Me[se+1]=.028),si[se]=(Me[se]-Er[se])/mt,si[se+1]=(Me[se+1]-Er[se+1])/mt,si[se+2]=(Me[se+2]-Er[se+2])/mt}}}Me[0]=Yo,Me[1]=Ua,Me[2]=$o,Xs[0]=Yo,Xs[1]=Ua,Xs[2]=$o;let pf=Xi,mf=Ys,gf=Cr;const km=ht[Ra];for(let he=0;he<Ri;he++){const Jt=Math.min(yi-1,he/gu|0),Ye=he/gu-Jt,Ae=Math.max(0,Jt-1)*3,Pe=Jt*3,Ie=(Jt+1)*3,me=Math.min(yi,Jt+2)*3,Ue=Ws(Me[Ae],Me[Pe],Me[Ie],Me[me],Ye),se=Ws(Me[Ae+1],Me[Pe+1],Me[Ie+1],Me[me+1],Ye),$e=Ws(Me[Ae+2],Me[Pe+2],Me[Ie+2],Me[me+2],Ye);let We=qs(Me[Ae],Me[Pe],Me[Ie],Me[me],Ye),mn=qs(Me[Ae+1],Me[Pe+1],Me[Ie+1],Me[me+1],Ye),Kn=qs(Me[Ae+2],Me[Pe+2],Me[Ie+2],Me[me+2],Ye);const Ui=Math.sqrt(We*We+mn*mn+Kn*Kn)||1;We/=Ui,mn/=Ui,Kn/=Ui,Gs(We,mn,Kn,pf,mf,gf),pf=wo,mf=So,gf=To;const An=he*3;l0[An]=Ue,l0[An+1]=se,l0[An+2]=$e,Ar[An]=We,Ar[An+1]=mn,Ar[An+2]=Kn,c0[An]=wo,c0[An+1]=So,c0[An+2]=To,h0[An]=Bs,h0[An+1]=Vs,h0[An+2]=Hs;const Yi=he/(Ri-1),zi=he===Ri-1?0:xb*dt(Yi)*(1-.55*nn(.84,1,Yi));Ii(Q,he,Ue,se,$e,wo,So,To,Bs,Vs,Hs,zi,zi*.82,zi*.82,1)}br(Q);for(let he=0,Jt=0;he<Ri;he++){const Ye=(Q.v0+he*z)*3,Ae=he*3;for(let Pe=0;Pe<=z;Pe++,Jt+=3){const Ie=Ye+Pe%z*3;Ai[Jt]=Kt[Ie],Ai[Jt+1]=Kt[Ie+1],Ai[Jt+2]=Kt[Ie+2],rn[Jt]=sn[Ie],rn[Jt+1]=sn[Ie+1],rn[Jt+2]=sn[Ie+2],ri[Jt]=Ar[Ae],ri[Jt+1]=Ar[Ae+1],ri[Jt+2]=Ar[Ae+2]}}Os.needsUpdate=!0,fn.needsUpdate=!0,Ci.needsUpdate=!0,Fs.value=km;for(let he=0,Jt=0;he<O;he++,Jt+=9){const Ye=P[Jt],Ae=P[Jt+1]*3,Pe=P[Jt+2]*3,Ie=P[Jt+3],me=P[Jt+4],Ue=P[Jt+5],se=P[Jt+7]*3,$e=P[Jt+8];let We=(Kt[Pe]-Kt[Ae])*Ie,mn=(Kt[Pe+1]-Kt[Ae+1])*Ie,Kn=(Kt[Pe+2]-Kt[Ae+2])*Ie;const Ui=Math.sqrt(We*We+mn*mn+Kn*Kn)||1;We/=Ui,mn/=Ui,Kn/=Ui;const An=sn[Ae],Yi=sn[Ae+1],zi=sn[Ae+2];ss(Ye,Kt[Ae]+(Kt[se]-Kt[Ae])*$e-An*.005,Kt[Ae+1]+(Kt[se+1]-Kt[Ae+1])*$e-Yi*.005,Kt[Ae+2]+(Kt[se+2]-Kt[Ae+2])*$e-zi*.005,We*me+An*Ue,mn*me+Yi*Ue,Kn*me+zi*Ue,P[Jt+6],An,Yi,zi)}for(let he=0,Jt=0;he<$;he++,Jt+=9){const Ye=j[Jt],Ae=j[Jt+1],Pe=u0[Ae],Ie=Ae*3,me=j[Jt+2],Ue=j[Jt+3],se=j[Jt+4],$e=j[Jt+5],We=j[Jt+6],mn=j[Jt+7];ss(Ye,Wi[Ie]+Pe[0]*me+Pe[3]*Ue+Pe[6]*se,Wi[Ie+1]+Pe[1]*me+Pe[4]*Ue+Pe[7]*se,Wi[Ie+2]+Pe[2]*me+Pe[5]*Ue+Pe[8]*se,Pe[0]*$e+Pe[3]*We+Pe[6]*mn,Pe[1]*$e+Pe[4]*We+Pe[7]*mn,Pe[2]*$e+Pe[5]*We+Pe[8]*mn,j[Jt+8],ce[3],ce[4],ce[5])}ue.needsUpdate=!0,He.needsUpdate=!0,Zt.needsUpdate=!0,Oe.needsUpdate=!0,tn.needsUpdate=!0}function Dm(Z){return e.updateWorldMatrix(!0,!1),n.updateMatrix(),n.matrixWorld.multiplyMatrices(e.matrixWorld,n.matrix),Z.set(Tr[0],Tr[1],Tr[2]).applyMatrix4(n.matrixWorld)}return cf(0,{mode:"surface",speed:0,steep:0,climb:0,thin:0,turn:0,airUp:0,alert:0,lookLocal:null,time:0}),{group:e,update:cf,trigger:Pm,getHeadWorldPosition:Dm,info:{triangles:f.length/3+N.length/3+(Ri-1)*z*2*D,vertices:ve+pt+_e,cards:W,drawCalls:3},_state:et,_pose:ht,_reach:a0}}const nr=new k(0,1,0),kn=(i,t,e)=>i<t?t:i>e?e:i,Un={runSpeed:8.2,climbSpeed:6,wireSpeed:7,burstMul:1.55,burstTime:1.7,accel:70,turnRate:17,gravity:27,jumpUp:8.2,maxLeap:7.6,maxLeapUp:3.4,maxLaunch:15.5,chargeTime:.85,step:.06},Pi=new k,ep=new k,np=new k,ip=new k,wc=new k,ir=new k,sp=new qe,fh=new Ti,Sc=new k,ta=new k,sr=new k,ja=new k;function us(i,t){return i.addScaledVector(t,-i.dot(t))}class Pb{constructor(t){this.world=t,this.pos=new k,this.normal=new k(0,1,0),this.heading=new k(0,0,1),this.vel=new k,this.mode="air",this.prim=null,this.primT=0,this.speed=0,this.steepW=0,this.thin=0,this.turn=0,this.airTime=0,this.surfaceTime=0,this.stillTime=0,this.alert=0,this.charge=0,this.burstLeft=0,this.jumpBuffer=0,this.atTip=!1,this.edge=!1,this.invuln=0,this.stun=0,this.launchPrim=null,this.assist=null,this.target={valid:!1,point:new k,normal:new k(0,1,0),prim:null,extra:null},this.extraTargets=null,this.events=[],this.rightSign=1,this.latchValid=!1,this.latchDir=new k,this.latchStick=0,this.stickTravel=0,this.forkCooldown=0,this.wishMag=0,this.wishT=new k,this.wishWorld=new k,this.heightAboveGround=0,this.visPos=new k,this.visQuat=new Ti,this._targetQuat=new Ti,this._hit=J0(),this._hit2=J0(),this._hit3=J0(),this._lastHeading=new k(0,0,1)}get hidden(){return this.alert>.75&&this.heightAboveGround>1.5}get bursting(){return this.burstLeft>0}teleport(t,e){this.pos.copy(t),this.vel.set(0,0,0),this.mode="air",this.prim=null,this.speed=0,this.assist=null,this.normal.set(0,1,0),e&&this.heading.copy(e).setY(0).normalize(),this.visPos.copy(t),this.airTime=0,this.stillTime=0,this.alert=0,this.charge=0,this.burstLeft=0}knock(t,e=7){this.mode="air",this.assist=null,this.launchPrim=null,this.prim=null,this.vel.copy(t).setY(0),this.vel.lengthSq()<1e-4&&this.vel.copy(this.heading).multiplyScalar(-1).setY(0),this.vel.normalize().multiplyScalar(e),this.vel.y=6.5,this.pos.addScaledVector(this.normal,.12),this.airTime=0,this.invuln=1.6,this.burstLeft=0}bounce(t=9,e=.6){this.mode="air",this.assist=null,this.launchPrim=null,this.prim=null,this.vel.x*=e,this.vel.z*=e,this.vel.y=t,this.airTime=0}_computeWish(t,e){const n=this.normal,s=t.moveX,o=t.moveY,r=Math.min(1,Math.hypot(s,o));this.wishMag=r<.08?0:r;const a=-Math.sin(e),l=-Math.cos(e),h=-l,c=a;this._fx=a,this._fz=l,this._rx=h,this._rz=c,this._sx=r>1e-6?s/r:0,this._sy=r>1e-6?o/r:0,this.wishWorld.set(h*s+a*o,0,c*s+l*o);let f;if(n.y>=0?f=kn((.78-n.y)/.3,0,1):f=kn((n.y+.75)/.3,0,1),this.steepW=f,this.wishMag===0){this.wishT.set(0,0,0),this.latchValid=!1;return}const d=Pi.copy(this.wishWorld);if(us(d,n),d.lengthSq()>1e-6?d.normalize():d.set(0,0,0),f>0){const m=ep.copy(nr);us(m,n),m.lengthSq()<1e-6&&m.copy(this.heading),m.normalize();const g=np.crossVectors(m,n).normalize(),M=g.x*h+g.z*c;Math.abs(M)>.25&&(this.rightSign=M>0?1:-1);const T=ip.copy(m).multiplyScalar(o).addScaledVector(g,s*this.rightSign);T.lengthSq()>1e-6&&T.normalize(),d.lerp(T,f),d.lengthSq()>1e-6&&d.normalize()}const u=Math.atan2(o,s),p=this.latchDir;let v=!1;if(this.latchValid&&this.mode==="surface"&&this.prim&&this.prim.type==="box"&&n.y<.9&&d.lengthSq()>1e-6){let m=u-this.latchStick;m>Math.PI?m-=2*Math.PI:m<-Math.PI&&(m+=2*Math.PI),this.stickTravel+=Math.abs(m),us(p,n),p.lengthSq()>1e-6&&(p.normalize(),v=this.stickTravel<.6&&p.dot(d)<.2&&!t.lookActive&&n.x*a+n.z*l>-.3)}v||(p.copy(d),this.latchValid=d.lengthSq()>1e-6),this.latchStick=u,this.wishT.copy(p)}_score(t){const e=t.x*this._rx+t.z*this._rz,n=t.y+t.x*this._fx+t.z*this._fz,s=Math.hypot(e,n),o=t.dot(this.wishT);if(s<.15)return o;const r=(e*this._sx+n*this._sy)/s,a=kn((s-.15)/.25,0,1);return o+(r-o)*a}_transport(t,e){t.dot(e)>.9995||(fh.setFromUnitVectors(t,e),this.heading.applyQuaternion(fh),this.latchValid&&(this.latchDir.applyQuaternion(fh),t.dot(e)<.8&&(this.stickTravel=0)))}update(t,e,n){this.events.length=0,t=Math.min(t,.05),this.invuln>0&&(this.invuln-=t),this.forkCooldown>0&&(this.forkCooldown-=t),e.jumpPressed?this.jumpBuffer=.16:this.jumpBuffer>0&&(this.jumpBuffer-=t),this.stun>0&&(this.stun-=t,e=Lb),this._computeWish(e,n),this._lastHeading.copy(this.heading),this.mode==="surface"?this._updateSurface(t,e):this._updateAir(t,e);const s=this.world.bounds;if(this.pos.x=kn(this.pos.x,s.minX,s.maxX),this.pos.z=kn(this.pos.z,s.minZ,s.maxZ),this.heightAboveGround=this.pos.y-this.world.groundHeight(this.pos.x,this.pos.z),this.mode==="surface"&&this.speed<.05&&this.wishMag===0){this.stillTime+=t,this.alert=kn((this.stillTime-.12)/.4,0,1);const a=this.charge;this.charge=kn(this.stillTime/Un.chargeTime,0,1),a<1&&this.charge>=1&&this.events.push({type:"charged"})}else this.stillTime>0&&this.mode==="surface"&&this.wishMag>0&&(this.charge>=1?(this.burstLeft=Un.burstTime,this.events.push({type:"burst"})):this.events.push({type:"start"})),this.stillTime=0,this.charge=0,this.alert=Math.max(0,this.alert-t*9);this.burstLeft>0&&(this.burstLeft-=t),Pi.crossVectors(this._lastHeading,this.heading);const r=kn(Pi.dot(this.normal),-1,1)/Math.max(t,1e-4);this.turn+=(kn(r,-12,12)-this.turn)*Math.min(1,t*12),this._updateVisual(t)}_updateSurface(t,e){const n=this.world,s=this._hit;this.surfaceTime+=t,this.atTip=!1,this.edge=!1;const o=this.prim,r=o&&o.type==="capsule";r&&Math.abs(o.dy)<.82;const a=r?o.ra+(o.rb-o.ra)*kn(this.primT,0,1):1;this.thin+=((r&&a<.09?1:r&&a<.16?.5:0)-this.thin)*Math.min(1,t*10);let l=this.wishMag;const h=ta.copy(this.wishT);let c=!1;r&&l>0&&this.forkCooldown<=0&&this._tryFork();const f=this.prim;if(f&&f.type==="capsule"&&Math.abs(f.dy)<.82&&l>0){const M=sr.set(f.dx,f.dy,f.dz),T=this._score(M);Math.abs(T)>.3?h.copy(M).multiplyScalar(T>0?1:-1):c=!0}let d=Un.runSpeed+(Un.climbSpeed-Un.runSpeed)*this.steepW;this.thin>.5&&(d=Math.min(d,Un.wireSpeed)),this.burstLeft>0&&(d*=1+(Un.burstMul-1)*kn(this.burstLeft/.45,0,1));const u=c?0:l*d;if(u>this.speed?this.speed=Math.min(u,this.speed+Un.accel*t):l===0||c?this.speed=this.speed<3?0:Math.max(0,this.speed-140*t):this.speed=Math.max(u,this.speed-40*t),l>0){const M=this.heading;M.dot(h)<-.6||this.speed<1.5?M.copy(h):(M.lerp(h,Math.min(1,Un.turnRate*t)),us(M,this.normal),M.lengthSq()<1e-6&&M.copy(h),M.normalize())}let p=this.jumpBuffer>0;if(!p&&e.jumpHeld&&this.surfaceTime>.11&&l>0&&this.target.valid&&(p=!0),this._findTarget(),(c||this.wasTip)&&l>.5&&this.target.valid&&(this._sy<.3||this.target.point.y>this.pos.y-1.5)?(this.pushTime=(this.pushTime||0)+t,this.pushTime>.24&&(p=!0)):this.pushTime=0,p&&this.surfaceTime>.03){this._jump();return}let v=this.speed*t;const m=Math.max(1,Math.ceil(v/Un.step)),g=v/m;for(let M=0;M<m&&v>0;M++){if(wc.copy(this.pos).addScaledVector(this.heading,g),!n.nearest(wc,.6,s)||s.dist>.4){this.mode="air",this.vel.copy(this.heading).multiplyScalar(this.speed),this.airTime=0,this.assist=null,this.launchPrim=this.prim,this.events.push({type:"fall"});return}const T=this.prim;if(s.prim!==T&&T&&T.type==="capsule"){const w=this._hit3;n.primDistance(T,wc,w),w.t>-.02&&w.t<1.02&&w.dist<s.dist+.18&&w.dist<.35&&(s.prim=T,s.t=w.t,s.dist=w.dist,s.point.copy(w.point),s.normal.copy(w.normal))}let E=s.prim;if(E.type==="capsule"&&(s.t<0||s.t>1)){const w=s.t<0?-1:1,_=(s.normal.x*E.dx+s.normal.y*E.dy+s.normal.z*E.dz)*w,S=(this.heading.x*E.dx+this.heading.y*E.dy+this.heading.z*E.dz)*w;if(_>.55||S>.5){const x=this._hit3,y=E;if(n.nearest(wc,.4,x,b=>b!==y,!0)&&x.dist<.22)s.prim=x.prim,s.t=x.t,s.dist=x.dist,s.point.copy(x.point),s.normal.copy(x.normal),E=x.prim;else{this.atTip=!0,this.speed=0;break}}}if(E.type==="box"&&s.normal.y<-.45){if(this._vault())continue;this.speed=0;break}const A=s.normal.dot(this.heading);if(A>.45&&E.type!=="capsule"&&(this.edge=!0,e.jumpHeld&&l>0)){this._findTarget(),this._jump();return}Sc.copy(this.normal),this._attach(s,t/m),this._transport(Sc,this.normal),us(this.heading,this.normal),this.heading.lengthSq()<1e-6&&(this.heading.copy(nr),us(this.heading,this.normal)),this.heading.normalize(),A>.45&&E.type==="box"&&this.pos.addScaledVector(this.heading,.03)}if((this.speed===0||v===0)&&n.nearest(this.pos,.5,s)&&(Sc.copy(this.normal),this._attach(s,t),this._transport(Sc,this.normal)),this.wasTip=this.atTip,this.atTip&&e.jumpHeld&&l>0&&(this._findTarget(),this.target.valid)){this._jump();return}this.vel.copy(this.heading).multiplyScalar(this.speed)}_attach(t,e){const n=t.prim;if(this.prim=n,this.primT=t.t,n.type==="capsule"&&Math.abs(n.dy)<.82){const s=kn(t.t,0,1),o=n.ra+(n.rb-n.ra)*s,r=n.ax+n.dx*n.len*s,a=n.ay+n.dy*n.len*s,l=n.az+n.dz*n.len*s,h=ir.set(-n.dy*n.dx,1-n.dy*n.dy,-n.dy*n.dz).normalize(),c=this.normal.copy(t.normal),f=o<.13?1:Math.min(1,10*e);c.dot(h)<-.95&&c.addScaledVector(np.crossVectors(h,ip.set(n.dx,n.dy,n.dz)),.2),c.lerp(h,f).normalize(),this.pos.set(r+c.x*o,a+c.y*o,l+c.z*o)}else this.pos.copy(t.point),this.normal.copy(t.normal)}_vault(){const t=this.world,e=this._hit2,n=this.normal;for(let s=.2;s<=.95;s+=.15)for(let o=.25;o<=.75;o+=.25)if(ir.copy(this.pos).addScaledVector(n,s).addScaledVector(nr,o),t.nearest(ir,.45,e)&&e.normal.y>-.2&&e.point.y>this.pos.y+.05&&e.dist>-.05)return this.pos.copy(e.point),this.normal.copy(e.normal),this.prim=e.prim,this.primT=e.t,us(this.heading,this.normal),this.heading.lengthSq()<1e-6&&this.heading.copy(nr),this.heading.normalize(),this.events.push({type:"vault"}),!0;return!1}_tryFork(){const t=this.prim,e=this.world,n=this._hit2,s=this.primT,o=Math.abs(t.dy)>=.82;let r;if(o)r=s>.97?0:Math.max(.4,this._score(sr.set(t.dx,t.dy,t.dz)));else{const u=this._score(sr.set(t.dx,t.dy,t.dz));r=0,u>0&&s<.97?r=u:u<0&&s>.03&&(r=-u)}let a=null,l=Math.max(r>0?.35:.2,r+.12),h=0;const c=this,f=this.normal,d=ja;e.queryPrims(this.pos.x,this.pos.z,.9,u=>{if(u===t||u.type!=="capsule"||c.pos.y<u.minY-.6||c.pos.y>u.maxY+.6||(e.primDistance(u,c.pos,n),n.dist>.8)||o&&(n.point.x-c.pos.x)*f.x+(n.point.y-c.pos.y)*f.y+(n.point.z-c.pos.z)*f.z<-.2)return;const p=c._score(d.set(u.dx,u.dy,u.dz));let v=0;p>0&&n.t<.92?v=p:p<0&&n.t>.08&&(v=-p),v>l&&(l=v,a=u,h=n.t)}),a&&(e.primDistance(a,this.pos,n),n.prim=a,n.t=h,this._attach(n,1),this.forkCooldown=.18,us(this.heading,this.normal),this.heading.lengthSq()>1e-6&&this.heading.normalize())}_findTarget(){const t=this.target;t.valid=!1,t.extra=null;const e=this.world,n=this.pos,s=this.normal,o=Pi;if(this.steepW>.5?o.copy(this.wishT).multiplyScalar(this.wishMag>0?1:0).addScaledVector(s,.9):this.wishMag>0?o.copy(this.wishWorld):o.copy(this.heading),o.y=0,o.lengthSq()<1e-5)return;o.normalize();const r=this.steepW>.5?this.wishT.y*this.wishMag:0,a=this.prim;let l=1/0;const h=this._hit3,c=(u,p,v,m,g,M,T,E,A)=>{const w=u-n.x,_=v-n.z,S=p-n.y,x=Math.hypot(w,_);if(x<.9||x>Un.maxLeap||S>Un.maxLeapUp||S<-9)return;const y=(w*o.x+_*o.z)/x;if(y<.8)return;let b=(1-y)*9+Math.abs(x-3.4)*.13+(S>0?S*.1:-S*.06)+E;r!==0&&(b-=kn(S,-3,3)*r*.25),b<l&&(l=b,t.valid=!0,t.point.set(u,p,v),t.normal.set(g,M,T),t.prim=m,t.extra=A||null)},f=n.x+o.x*3.6,d=n.z+o.z*3.6;e.queryPrims(f,d,5.2,u=>{if(!(u===a||u.noJumpTarget)&&!(u.maxY<n.y-9||u.minY>n.y+Un.maxLeapUp+.3)){if(u.type==="capsule")if(Math.abs(u.dy)<.82){const p=u.dx*u.len,v=u.dz*u.len,m=u.ax-n.x,g=u.az-n.z,M=p*o.z-v*o.x;let T;Math.abs(M)>1e-4?T=(o.x*g-o.z*m)/M:T=.5;for(let E=0;E<2;E++){let A=E===0?T:((f-o.x*.2-u.ax)*p+(d-o.z*.2-u.az)*v)/(p*p+v*v+1e-6);A=kn(A,.04,.96);const w=u.ra+(u.rb-u.ra)*A,_=-u.dy*u.dx,S=1-u.dy*u.dy,x=-u.dy*u.dz,y=1/Math.hypot(_,S,x);c(u.ax+u.dx*u.len*A+_*y*w,u.ay+u.dy*u.len*A+S*y*w,u.az+u.dz*u.len*A+x*y*w,u,_*y,S*y,x*y,w<.05?.12:0)}}else{let p=kn(n.y+1.6+r*1.2,u.minY+.3,u.maxY-.15);const v=kn((p-u.ay)/(u.dy*u.len),.02,.98),m=u.ax+u.dx*u.len*v,g=u.ay+u.dy*u.len*v,M=u.az+u.dz*u.len*v;let T=n.x-m,E=n.z-M;const A=Math.hypot(T,E)||1;T/=A,E/=A;const w=u.ra+(u.rb-u.ra)*v;c(m+T*w,g,M+E*w,u,T,0,E,.35)}else if(u.type==="box"){if(u.yy<.55)return;for(let p=0;p<4;p++){const v=1.6+p*1.7,m=n.x+o.x*v-u.cx,g=n.z+o.z*v-u.cz;let M=m*u.xx+g*u.xz,T=m*u.zx+g*u.zz;const E=Math.max(0,u.hx-.12),A=Math.max(0,u.hz-.12);M=kn(M,-E,E),T=kn(T,-A,A);const w=u.cx+M*u.xx+u.hy*u.yx+T*u.zx,_=u.cy+M*u.xy+u.hy*u.yy+T*u.zy,S=u.cz+M*u.xz+u.hy*u.yz+T*u.zz;ir.set(w,_+.1,S),!(e.nearest(ir,.3,h)&&h.dist<.04)&&c(w,_,S,u,u.yx,u.yy,u.yz,.15)}}}}),this.extraTargets&&this.extraTargets((u,p)=>c(u.x,u.y,u.z,null,0,1,0,-.6,p))}_jump(){const t=this.target;this.jumpBuffer=0;const e=this.normal,n=this.vel;let s=.5;if(this.assist=null,t.valid){const o=t.point.x-this.pos.x,r=t.point.y-this.pos.y,a=t.point.z-this.pos.z,l=Math.hypot(o,a);let h=.3+l*.072+Math.max(0,r)*.1;n.set(o/h,r/h+.5*Un.gravity*h,a/h),n.length()<=Un.maxLaunch&&(this.assist={point:t.point.clone(),T:h,prim:t.prim,extra:t.extra},s=kn(l/7,.3,1))}if(!this.assist)if(this.steepW<.5){const o=this.wishMag>0?Math.max(this.speed,5):this.speed*.5+1.2;n.copy(this.heading).multiplyScalar(o),n.y=Math.max(n.y,0)*.3+Un.jumpUp}else n.copy(e).multiplyScalar(4.6).addScaledVector(this.wishT,this.wishMag*3.2),n.y+=6.8;this.pos.addScaledVector(e,.06),this.mode="air",this.airTime=0,this.launchPrim=this.prim,this.surfaceTime=0,this.events.push({type:"jump",power:s,assisted:!!this.assist})}_updateAir(t,e){const n=this.world,s=this._hit,o=this.vel;if(this.airTime+=t,this.surfaceTime=0,this.thin+=(0-this.thin)*Math.min(1,t*10),o.y-=Un.gravity*t,o.y<-32&&(o.y=-32),this.assist){const d=this.assist.T-this.airTime;if(this.assist.extra&&this.assist.extra.position){const u=this.assist.extra.position;this.assist.point.set(u.x,u.y+(this.assist.extra.height||.5),u.z)}if(d>.06){const u=this.assist.point;Pi.set((u.x-this.pos.x)/d,(u.y-this.pos.y)/d+.5*Un.gravity*d,(u.z-this.pos.z)/d),o.lerp(Pi,Math.min(1,t*10))}else d<-.25&&(this.assist=null);this.wishMag>.6&&this.wishWorld.x*o.x+this.wishWorld.z*o.z<-2&&(this.assist=null)}else if(this.wishMag>0){const d=16*t,u=o.x+this.wishWorld.x*d,p=o.z+this.wishWorld.z*d,v=Math.max(8.5,Math.hypot(o.x,o.z)),m=Math.hypot(u,p),g=m>v?v/m:1;o.x=u*g,o.z=p*g}const r=o.length()*t,a=Math.max(1,Math.ceil(r/.07)),l=t/a,h=this.launchPrim,c=this.airTime<.16,f=c&&h?d=>d!==h:null;for(let d=0;d<a;d++){if(this.pos.addScaledVector(o,l),!n.nearest(this.pos,.5,s,f,c&&h===n.groundPrim))continue;const u=s.prim,p=o.dot(s.normal);let v=.03;if(u.type==="capsule"&&(v=this.assist&&this.assist.prim===u?.3:o.y<2?.17:.1),s.dist<v&&(p<.5||s.dist<-.02)){if(u.type==="box"&&s.normal.y<-.45){o.addScaledVector(s.normal,-1.5*p),this.pos.copy(s.point).addScaledVector(s.normal,.05),this.assist=null;continue}if(u.type==="capsule"&&(s.t<0||s.t>1)&&s.dist>-.02){const m=kn(s.t,.03,.97);ir.set(u.ax+u.dx*u.len*m,u.ay+u.dy*u.len*m,u.az+u.dz*u.len*m).addScaledVector(s.normal,.01),n.primDistance(u,ir.addScaledVector(nr,.02),s),s.prim=u}this._land(s,p);return}}o.lengthSq()>.5&&(Pi.copy(o),Pi.y*=.35,Pi.normalize(),this.heading.lerp(Pi,Math.min(1,t*12)).normalize(),this.normal.lerp(ep.copy(nr).addScaledVector(this.heading,-this.heading.y).normalize(),Math.min(1,t*8)).normalize())}_land(t,e){const n=this.vel,s=kn(-e/16,0,1);this.mode="surface",this.surfaceTime=0;const o=!!this.assist;this.assist=null,this.normal.copy(t.normal),this._attach(t,1),Pi.copy(n),us(Pi,this.normal);const r=Pi.length();r>.8?this.heading.copy(Pi).multiplyScalar(1/r):(us(this.heading,this.normal),this.heading.lengthSq()<1e-5&&(this.heading.copy(nr),us(this.heading,this.normal)),this.heading.normalize());const a=this.prim;if(a.type==="capsule"&&Math.abs(a.dy)<.82){const l=this.heading.x*a.dx+this.heading.y*a.dy+this.heading.z*a.dz;Math.abs(l)>.3&&this.heading.set(a.dx,a.dy,a.dz).multiplyScalar(l>0?1:-1),this.speed=this.wishMag>0?Math.min(r*Math.abs(l),Un.runSpeed):0}else this.speed=this.wishMag>0?Math.min(r,Un.runSpeed*1.2):0;this.events.push({type:"land",impact:s,prim:a,assisted:o,from:this.launchPrim}),this.launchPrim=null}_updateVisual(t){const e=this.mode==="air"?1:Math.min(1,t*28);this.visPos.lerp(this.pos,e),this.visPos.distanceToSquared(this.pos)>4&&this.visPos.copy(this.pos),ja.copy(this.heading),sr.copy(this.normal),ta.crossVectors(sr,ja),!(ta.lengthSq()<1e-6)&&(ta.normalize(),ja.crossVectors(ta,sr).normalize(),sp.makeBasis(ta,sr,ja),this._targetQuat.setFromRotationMatrix(sp),this.visQuat.slerp(this._targetQuat,Math.min(1,t*(this.mode==="air"?12:16))))}}const Lb={moveX:0,moveY:0,jumpPressed:!1,jumpHeld:!1},Ka=(i,t,e)=>i<t?t:i>e?e:i,Za=new k,dh=new k,so=new k;function op(i,t){let e=i-t;for(;e>Math.PI;)e-=2*Math.PI;for(;e<-Math.PI;)e+=2*Math.PI;return e}class Db{constructor(t,e){this.camera=t,this.world=e,this.yaw=0,this.pitch=.24,this.dist=2.8,this.curDist=2.8,this.target=new k,this.manualTime=9,this.sensitivity=1,this.invertY=!1,this.shake=0,this.fovKick=0,this.baseFov=60,this.time=0,this.lookActive=!1}snap(t){this.target.copy(t.visPos),this.yaw=Math.atan2(-t.heading.x,-t.heading.z),this.curDist=this.dist}addShake(t){this.shake=Math.min(1,this.shake+t)}update(t,e,n,s){this.time+=t;const o=.0052*this.sensitivity;this.lookActive=!1,n&&(n.dx!==0||n.dy!==0)?(this.yaw-=n.dx*o,this.pitch+=n.dy*o*(this.invertY?-1:1),this.manualTime=0,this.lookActive=!0):this.manualTime+=t,this.pitch=Ka(this.pitch,-1.15,1.35);const r=e.normal,a=e.heading,l=e.mode==="surface"?Ka(1-Math.abs(r.y)*1.15,0,1):0;if(this.manualTime>1.1&&e.mode==="surface"){const T=e.speed>.5;let E=null,A=0;const w=Math.hypot(a.x,a.z);if(l>.5){let _=-r.x,S=-r.z;w>.3&&(_+=a.x*.6,S+=a.z*.6),E=Math.atan2(-_,-S),A=T?2.2:.8}else T&&w>.4&&(E=Math.atan2(-a.x,-a.z),A=1.5+e.speed*.12);if(E!==null){const _=op(E,this.yaw);(l>.5||Math.abs(_)<2.4)&&(this.yaw+=_*Math.min(1,A*t))}if(T){let _=.24;l>.5?_=a.y>.3?-.18:a.y<-.3?.75:.22:e.thin>.5&&(_=.42),this.pitch+=(_-this.pitch)*Math.min(1,t*1.3)}}if(e.mode==="air"&&this.manualTime>1.1){const T=e.vel;if(Math.hypot(T.x,T.z)>3){const A=op(Math.atan2(-T.x,-T.z),this.yaw);Math.abs(A)<2.2&&(this.yaw+=A*Math.min(1,2.2*t))}}Za.copy(e.visPos).addScaledVector(r,.22),Za.y+=.16;const h=Math.min(1,t*(e.mode==="air"?14:18));this.target.lerp(Za,h),this.target.distanceToSquared(Za)>9&&this.target.copy(Za);const c=s<1;let f=this.dist*(c?.92:1)*(1-.14*e.alert)+Ka(e.speed-8,0,5)*.12+l*.7;const d=Math.cos(this.pitch),u=Math.sin(this.pitch);dh.set(Math.sin(this.yaw)*d,u,Math.cos(this.yaw)*d);const p=this.world.raycast(this.target,dh,f+.3,.25,.12);let v=f;p<f+.3&&(v=Math.max(.95,p-.3)),v<this.curDist?this.curDist+=(v-this.curDist)*Math.min(1,t*22):this.curDist+=(v-this.curDist)*Math.min(1,t*3.5),so.copy(this.target).addScaledVector(dh,this.curDist);const m=this.world.groundHeight(so.x,so.z)+.18;if(so.y<m&&(so.y=m),this.shake>.001){const T=this.shake*this.shake*.12,E=this.time*47;so.x+=Math.sin(E*1.3)*T,so.y+=Math.sin(E*1.7+1)*T,so.z+=Math.sin(E*1.1+2)*T,this.shake=Math.max(0,this.shake-t*2.6)}this.camera.position.copy(so),this.camera.up.set(0,1,0),this.camera.lookAt(this.target);const g=e.bursting?1:Ka((e.speed-7)/6,0,.5);this.fovKick+=(g-this.fovKick)*Math.min(1,t*5);let M=this.baseFov+this.fovKick*12;c&&(M=Ka(2*Math.atan(Math.tan(M*Math.PI/180/2)/Math.max(s,.45)*.5)*180/Math.PI,M,88)),(Math.abs(this.camera.fov-M)>.01||this.camera.aspect!==s)&&(this.camera.fov=M,this.camera.aspect=s,this.camera.updateProjectionMatrix())}}function Ib(){const i=[],t=[];for(let d=0;d<=10;d++){const u=d/10,p=-.11+u*.15,v=.062*Math.pow(Math.sin(Math.min(1,u*1.08+.02)*Math.PI*.5),.75);i.push(new Dt(d===0?.004:v,p))}for(let d=0;d<=6;d++){const u=d/6;t.push(new Dt(.07*Math.cos(u*Math.PI*.5)+.002,.035+.05*Math.sin(u*Math.PI*.5)))}t.unshift(new Dt(.062,.03));const e=[[new ml(i,14),new ge(14715445)],[new ml(t,14),new ge(7029796)],[new Jc(.008,.012,.05,5).translate(0,.105,0),new ge(4861724)]];let n=0,s=0;for(const[d]of e)n+=d.attributes.position.count,s+=d.index.count;const o=new Float32Array(n*3),r=new Float32Array(n*3),a=new Float32Array(n*3),l=new Uint16Array(s);let h=0,c=0;for(const[d,u]of e){d.computeVertexNormals(),o.set(d.attributes.position.array,h*3),r.set(d.attributes.normal.array,h*3);for(let p=0;p<d.attributes.position.count;p++)a[(h+p)*3]=u.r,a[(h+p)*3+1]=u.g,a[(h+p)*3+2]=u.b;for(let p=0;p<d.index.count;p++)l[c+p]=d.index.array[p]+h;h+=d.attributes.position.count,c+=d.index.count}const f=new bn;return f.setAttribute("position",new cn(o,3)),f.setAttribute("normal",new cn(r,3)),f.setAttribute("color",new cn(a,3)),f.setIndex(new cn(l,1)),f}function Ub(i,t,e){const n=Ib(),s=t.map((_,S)=>({id:S,base:_.pos.clone(),pos:_.pos.clone(),kind:_.kind,name:_.name||"",where:_.where||"",taken:!!(e&&e[S]),pull:0,ping:0,phase:S*1.618%6.283,slot:-1})),o=s.filter(_=>_.kind!=="golden"),r=s.filter(_=>_.kind==="golden"),a=new Gn({vertexColors:!0,roughness:.42,metalness:0,emissive:9059333,emissiveIntensity:.9}),l=new sl(n,a,Math.max(1,o.length));l.castShadow=!0,l.frustumCulled=!1;const h=new Gn({color:16763194,roughness:.22,metalness:.85,emissive:16753152,emissiveIntensity:1.5}),c=new sl(n,h,Math.max(1,r.length));c.frustumCulled=!1,c.castShadow=!0,i.add(l,c);const f=new Jc(.16,.5,9,10,1,!0).translate(0,4.5,0),d=new ii({transparent:!0,depthWrite:!1,blending:ul,side:ni,fog:!1,toneMapped:!1,uniforms:{uTime:{value:0}},vertexShader:"varying float vY; varying vec3 vN; varying vec3 vV; void main(){ vY = position.y / 9.0; vec4 wp = modelMatrix * instanceMatrix * vec4(position,1.0); vN = normalize(mat3(modelMatrix * instanceMatrix) * normal); vV = normalize(cameraPosition - wp.xyz); gl_Position = projectionMatrix * viewMatrix * wp; }",fragmentShader:"uniform float uTime; varying float vY; varying vec3 vN; varying vec3 vV; void main(){ float f = abs(dot(normalize(vN), normalize(vV))); float a = pow(clamp(1.0 - vY, 0.0, 1.0), 1.6) * f * f * (0.2 + 0.05 * sin(uTime * 2.0 + vY * 9.0)); gl_FragColor = vec4(vec3(1.0, 0.82, 0.38) * a, a); }"}),u=new sl(f,d,Math.max(1,r.length));u.frustumCulled=!1,u.renderOrder=10,i.add(u);const p=new qe,v=new Ti,m=new Ei,g=new k,M=new k,T=new qe().makeScale(0,0,0);function E(_,S,x,y,b,C){for(let L=0;L<_.length;L++){const R=_[L];if(R.taken){R.slot!==-2&&(S.setMatrixAt(L,T),R.slot=-2,S.instanceMatrix.needsUpdate=!0);continue}if(!b&&R.slot===L){const I=R.base.x-C.x,X=R.base.z-C.z;if(I*I+X*X>55*55)continue}R.slot=L;const U=x*(1+R.ping*.7);m.set(.25,y*1.6+R.phase,.12),v.setFromEuler(m),M.copy(R.pos),M.y+=.06+Math.sin(y*2.4+R.phase)*.045,p.compose(M,v,g.set(U,U,U)),S.setMatrixAt(L,p),S.instanceMatrix.needsUpdate=!0}}for(let _=0;_<r.length;_++)p.makeTranslation(r[_].base.x,r[_].base.y,r[_].base.z),u.setMatrixAt(_,r[_].taken?T:p);E(o,l,2.3,0,!0,null),E(r,c,3.2,0,!0,null);const A={items:s,total:o.length,goldenTotal:r.length,count(){let _=0,S=0;for(const x of s)x.taken&&(x.kind==="golden"?S++:_++);return{acorns:_,golden:S}},update(_,S,x,y=1.9){w.length=0,d.uniforms.uTime.value=S;for(let b=0;b<s.length;b++){const C=s[b];if(C.taken)continue;C.ping>0&&(C.ping=Math.max(0,C.ping-_*.9));const L=x.x-C.pos.x,R=x.y+.15-C.pos.y,U=x.z-C.pos.z,I=L*L+R*R+U*U,X=C.kind==="golden"?y*1.2:y;if(I<X*X||C.pull>0){C.pull+=_*5;const Y=Math.sqrt(I),st=Math.min(1,(6+C.pull*14)*_/Math.max(Y,.01));C.pos.x+=L*st,C.pos.y+=R*st,C.pos.z+=U*st,Y<.45&&(C.taken=!0,w.push(C),C.kind==="golden"&&(u.setMatrixAt(r.indexOf(C),T),u.instanceMatrix.needsUpdate=!0))}}return E(o,l,2.3,S,!1,x),E(r,c,3.2,S,!0,x),w},ping(_,S,x){let y=0;for(const b of s){if(b.taken)continue;b.base.distanceTo(_)<S&&(b.ping=1,y++,x&&y<=14&&x(b))}return y},nearest(_,S){let x=null,y=1/0;for(const b of s){if(b.taken||S&&b.kind!==S)continue;const C=b.base.distanceToSquared(_);C<y&&(y=C,x=b)}return x},takenMap(){const _={};for(const S of s)S.taken&&(_[S.id]=1);return _},reset(){for(const _ of s)_.taken=!1,_.pos.copy(_.base),_.pull=0,_.slot=-1;for(let _=0;_<r.length;_++)p.makeTranslation(r[_].base.x,r[_].base.y,r[_].base.z),u.setMatrixAt(_,p);u.instanceMatrix.needsUpdate=!0}},w=[];return A}const oo=520,ea=new k;function zb(){const i=document.createElement("canvas");i.width=i.height=256;const t=i.getContext("2d");let e=t.createRadialGradient(64,64,0,64,64,60);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.4,"rgba(255,255,255,0.55)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),t.save(),t.translate(192,64),t.rotate(.5),t.fillStyle="#fff",t.beginPath(),t.moveTo(0,-50),t.bezierCurveTo(38,-30,34,26,0,50),t.bezierCurveTo(-34,26,-38,-30,0,-50),t.fill(),t.strokeStyle="rgba(0,0,0,0.25)",t.lineWidth=3,t.beginPath(),t.moveTo(0,-44),t.lineTo(0,46),t.stroke(),t.restore(),t.save(),t.translate(64,192),t.fillStyle="#fff",t.beginPath();for(let s=0;s<8;s++){const o=s*Math.PI/4,r=s%2?12:54;t.lineTo(Math.cos(o)*r,Math.sin(o)*r)}t.closePath(),t.fill(),t.restore(),e=t.createRadialGradient(64,192,0,64,192,40),e.addColorStop(0,"rgba(255,255,255,0.9)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,128,128,128),e=t.createLinearGradient(128,0,256,0),e.addColorStop(0,"rgba(255,255,255,0)"),e.addColorStop(.5,"rgba(255,255,255,0.9)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(132,186,120,12);const n=new em(i);return n.colorSpace=ti,n}function kb(i){const t=new Gu;t.setAttribute("position",new Ce([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0],3)),t.setAttribute("uv",new Ce([0,0,1,0,1,1,0,1],2)),t.setIndex([0,1,2,0,2,3]);const e=new Ds(new Float32Array(oo*4),4),n=new Ds(new Float32Array(oo*4),4),s=new Ds(new Float32Array(oo*4),4);e.setUsage(fs),n.setUsage(fs),s.setUsage(fs),t.setAttribute("aPos",e),t.setAttribute("aCol",n),t.setAttribute("aMisc",s),t.instanceCount=0;const o=new ii({uniforms:{map:{value:zb()}},vertexShader:`
      attribute vec4 aPos; attribute vec4 aCol; attribute vec4 aMisc;
      varying vec2 vUv; varying vec4 vCol; varying float vAdd;
      void main(){
        float c = cos(aMisc.x), s = sin(aMisc.x);
        vec2 p = position.xy; p.x *= aMisc.z;
        p = vec2(c*p.x - s*p.y, s*p.x + c*p.y) * aPos.w;
        vec4 mv = viewMatrix * vec4(aPos.xyz, 1.0);
        mv.xy += p;
        gl_Position = projectionMatrix * mv;
        float tx = mod(aMisc.y, 2.0), ty = floor(aMisc.y / 2.0);
        vUv = (uv + vec2(tx, 1.0 - ty)) * 0.5;
        vCol = aCol; vAdd = aMisc.w;
      }`,fragmentShader:`
      uniform sampler2D map; varying vec2 vUv; varying vec4 vCol; varying float vAdd;
      void main(){
        vec4 t = texture2D(map, vUv);
        float a = t.a * vCol.a;
        if (a < 0.01) discard;
        gl_FragColor = vec4(vCol.rgb * t.rgb * a * (1.0 + vAdd), a * (1.0 - vAdd));
      }`,transparent:!0,depthWrite:!1,blending:xp,blendSrc:vp,blendDst:Fc,toneMapped:!1}),r=new Mn(t,o);r.frustumCulled=!1,r.renderOrder=20,i.add(r);const a=[];for(let w=0;w<oo;w++)a.push({live:!1,x:0,y:0,z:0,vx:0,vy:0,vz:0,life:0,max:1,size:1,size2:1,r:1,g:1,b:1,a:1,rot:0,spin:0,tex:0,grav:0,drag:0,stretch:1,add:0,sway:0,seed:0});let l=0;function h(w){let _=null;for(let S=0;S<oo;S++){const x=a[(l+S)%oo];if(!x.live){_=x,l=(l+S+1)%oo;break}}return _||(_=a[l],l=(l+1)%oo),_.live=!0,_.x=w.x,_.y=w.y,_.z=w.z,_.vx=w.vx||0,_.vy=w.vy||0,_.vz=w.vz||0,_.life=0,_.max=w.life||1,_.size=w.size||.2,_.size2=w.size2===void 0?_.size:w.size2,_.r=w.r===void 0?1:w.r,_.g=w.g===void 0?1:w.g,_.b=w.b===void 0?1:w.b,_.a=w.a===void 0?1:w.a,_.rot=w.rot||0,_.spin=w.spin||0,_.tex=w.tex||0,_.grav=w.grav||0,_.drag=w.drag||0,_.stretch=w.stretch||1,_.add=w.add||0,_.sway=w.sway||0,_.seed=Math.random()*10,_}const c=(w,_)=>w+Math.random()*(_-w),f=[[.85,.33,.12],[.91,.54,.17],[.95,.71,.2],[.76,.23,.13],[.72,.63,.18]],d={leafPuff(w,_=8,S=1){for(let x=0;x<_;x++){const y=f[Math.random()*f.length|0];h({x:w.x+c(-.2,.2),y:w.y+c(0,.3),z:w.z+c(-.2,.2),vx:c(-2,2)*S,vy:c(.5,3)*S,vz:c(-2,2)*S,life:c(1.2,2.4),size:c(.1,.2),r:y[0],g:y[1],b:y[2],rot:c(0,6),spin:c(-6,6),tex:1,grav:2.2,drag:1.6,sway:1.5})}},dust(w,_=6,S=1){for(let x=0;x<_;x++)h({x:w.x,y:w.y+.05,z:w.z,vx:c(-1.6,1.6)*S,vy:c(.2,1)*S,vz:c(-1.6,1.6)*S,life:c(.4,.8),size:.12,size2:c(.4,.7),r:.85,g:.78,b:.66,a:.35,drag:3})},sparkle(w,_=8,S=!1){for(let x=0;x<_;x++)h({x:w.x,y:w.y,z:w.z,vx:c(-2,2),vy:c(.5,3.5),vz:c(-2,2),life:c(.35,.8),size:c(.1,.22)*(S?1.6:1),size2:0,r:1,g:S?.85:.8,b:S?.3:.45,rot:c(0,6),spin:c(-4,4),tex:2,grav:3,drag:2,add:1})},ping(w){h({x:w.x,y:w.y+.15,z:w.z,life:.9,size:.2,size2:1.1,r:1,g:.85,b:.4,a:.8,tex:0,add:1}),h({x:w.x,y:w.y+.15,z:w.z,vy:.6,life:1.1,size:.3,size2:0,r:1,g:.9,b:.5,tex:2,add:1,spin:2})},streak(w,_){h({x:w.x+c(-.5,.5),y:w.y+c(.05,.6),z:w.z+c(-.5,.5),vx:-_.x*.3,vy:-_.y*.3,vz:-_.z*.3,life:.22,size:.28,size2:.12,a:.3,tex:3,stretch:3,add:1,rot:c(-.2,.2)})},hit(w){for(let _=0;_<7;_++)h({x:w.x,y:w.y,z:w.z,vx:c(-3.5,3.5),vy:c(1,4.5),vz:c(-3.5,3.5),life:.5,size:.3,size2:0,r:1,g:.95,b:.6,tex:2,grav:5,rot:c(0,6),spin:c(-8,8),add:1});h({x:w.x,y:w.y,z:w.z,life:.22,size:.4,size2:1.8,a:.9,tex:0,add:1})},ambientLeaf(w){const _=f[Math.random()*f.length|0],S=c(0,6.28),x=c(2,16);h({x:w.x+Math.cos(S)*x,y:w.y+c(3,9),z:w.z+Math.sin(S)*x,vx:c(-.6,-.1),vy:-c(.5,1),vz:c(.1,.5),life:c(6,10),size:c(.1,.17),r:_[0],g:_[1],b:_[2],rot:c(0,6),spin:c(-2.5,2.5),tex:1,sway:2.2})}},u=new Kc({color:16771496,transparent:!0,opacity:.9,depthTest:!1,blending:ul,side:ni,toneMapped:!1,fog:!1}),p=new Mn(new Vu(.2,.27,28),u),v=new Mn(new Bu(.06,12),u);p.add(v),p.renderOrder=30,p.visible=!1,i.add(p);let m=0;const g=new Ti,M=new k(0,0,1);d.setRing=(w,_,S,x,y)=>{if(m+=((w?1:0)-m)*.3,p.visible=m>.03,!!p.visible){if(w){p.position.copy(_).addScaledVector(S,.05),ea.copy(y.position).sub(_).normalize().multiplyScalar(.55).add(S).normalize(),p.quaternion.slerp(g.setFromUnitVectors(M,ea),.5);const b=y.position.distanceTo(_);p.scale.setScalar((.9+.12*Math.sin(x*9))*Math.max(1,b*.16))}u.opacity=.85*m}};const T=new ba(.06,8,6),E=new Gn({color:10115618,roughness:.6}),A=[];for(let w=0;w<6;w++){const _=new Mn(T,E);_.visible=!1,_.castShadow=!0,i.add(_),A.push({m:_,live:!1,t:0,vel:new k,target:null,onHit:null})}return d.throwNut=(w,_,S)=>{const x=A.find(y=>!y.live)||A[0];x.live=!0,x.t=0,x.m.visible=!0,x.m.position.copy(w),x.target=_,x.onHit=S},d.update=(w,_,S,x)=>{for(d._acc=(d._acc||0)+w*x;d._acc>1;)d._acc-=1,d.ambientLeaf(S);let y=0;const b=e.array,C=n.array,L=s.array;for(let R=0;R<oo;R++){const U=a[R];if(!U.live)continue;if(U.life+=w,U.life>=U.max){U.live=!1;continue}const I=U.life/U.max;if(U.vy-=U.grav*w,U.drag){const St=Math.max(0,1-U.drag*w);U.vx*=St,U.vy=U.vy>0?U.vy*St:Math.max(U.vy,-1.6),U.vz*=St}let X=0,Y=0;U.sway&&(X=Math.sin(_*2.1+U.seed)*U.sway*.4,Y=Math.cos(_*1.7+U.seed*1.3)*U.sway*.4),U.x+=(U.vx+X)*w,U.y+=U.vy*w,U.z+=(U.vz+Y)*w,U.rot+=U.spin*w;const st=y*4;b[st]=U.x,b[st+1]=U.y,b[st+2]=U.z,b[st+3]=U.size+(U.size2-U.size)*I;const bt=I<.1?I/.1:I>.7?(1-I)/.3:1;C[st]=U.r,C[st+1]=U.g,C[st+2]=U.b,C[st+3]=U.a*bt,L[st]=U.rot,L[st+1]=U.tex,L[st+2]=U.stretch,L[st+3]=U.add,y++}t.instanceCount=y,e.needsUpdate=!0,n.needsUpdate=!0,s.needsUpdate=!0;for(const R of A){if(!R.live)continue;R.t+=w;const U=R.target.mouthPosition||R.target.position;ea.set(U.x,U.y+(R.target.mouthPosition?0:(R.target.height||.6)*.7),U.z).sub(R.m.position);const I=ea.length(),X=26*w;I<=X+.25||R.t>1.2?(R.live=!1,R.m.visible=!1,I<=X+.6&&R.onHit&&R.onHit(R.m.position,ea.normalize())):(R.m.position.addScaledVector(ea,X/I),R.m.position.y+=Math.sin(Math.min(1,R.t*3)*Math.PI)*.02,R.m.rotation.x+=w*20)}},d}const Em={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Pa{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Nb=new Uu(-1,1,1,-1,0,1);class Fb extends bn{constructor(){super(),this.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Ce([0,2,0,0,2,0],2))}}const Ob=new Fb;class Qu{constructor(t){this._mesh=new Mn(Ob,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Nb)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Am extends Pa{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ii?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=pl.clone(t.uniforms),this.material=new ii({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Qu(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class rp extends Pa{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const s=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,a;this.inverse?(r=0,a=1):(r=1,a=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),o.buffers.stencil.setFunc(s.ALWAYS,r,4294967295),o.buffers.stencil.setClear(a),o.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(s.EQUAL,1,4294967295),o.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),o.buffers.stencil.setLocked(!0)}}class Bb extends Pa{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Vb{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new Dt);this._width=n.width,this._height=n.height,e=new ns(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Is}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Am(Em),this.copyPass.material.blending=go,this.clock=new M_}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let s=0,o=this.passes.length;s<o;s++){const r=this.passes[s];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),r.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}rp!==void 0&&(r instanceof rp?n=!0:r instanceof Bb&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new Dt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(n,s),this.renderTarget2.setSize(n,s);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(n,s)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Hb extends Pa{constructor(t,e,n=null,s=null,o=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=s,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new ge}render(t,e,n){const s=t.autoClear;t.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=s}}const Gb={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new ge(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Sa extends Pa{constructor(t,e,n,s){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=s,this.resolution=t!==void 0?new Dt(t.x,t.y):new Dt(256,256),this.clearColor=new ge(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new ns(o,r,{type:Is}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let f=0;f<this.nMips;f++){const d=new ns(o,r,{type:Is});d.texture.name="UnrealBloomPass.h"+f,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const u=new ns(o,r,{type:Is});u.texture.name="UnrealBloomPass.v"+f,u.texture.generateMipmaps=!1,this.renderTargetsVertical.push(u),o=Math.round(o/2),r=Math.round(r/2)}const a=Gb;this.highPassUniforms=pl.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=s,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ii({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let f=0;f<this.nMips;f++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[f])),this.separableBlurMaterials[f].uniforms.invSize.value=new Dt(1/o,1/r),o=Math.round(o/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const h=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=h,this.bloomTintColors=[new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1),new k(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const c=Em;this.copyUniforms=pl.clone(c.uniforms),this.blendMaterial=new ii({uniforms:this.copyUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader,blending:ul,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new ge,this.oldClearAlpha=1,this.basic=new Kc,this.fsQuad=new Qu(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),s=Math.round(e/2);this.renderTargetBright.setSize(n,s);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(n,s),this.renderTargetsVertical[o].setSize(n,s),this.separableBlurMaterials[o].uniforms.invSize.value=new Dt(1/n,1/s),n=Math.round(n/2),s=Math.round(s/2)}render(t,e,n,s,o){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),o&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=Sa.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Sa.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=r}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new ii({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new Dt(.5,.5)},direction:{value:new Dt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new ii({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Sa.BlurDirectionX=new Dt(1,0);Sa.BlurDirectionY=new Dt(0,1);const Wb={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class qb extends Pa{constructor(){super();const t=Wb;this.uniforms=pl.clone(t.uniforms),this.material=new p_({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Qu(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},an.getTransfer(this._outputColorSpace)===dn&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===yp?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===_p?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Mp?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===bu?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===bp?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===wp&&(this.material.defines.NEUTRAL_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}const Xb={uniforms:{tDiffuse:{value:null},uVignette:{value:.32},uSat:{value:1.12},uDanger:{value:0},uSpeed:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
    uniform sampler2D tDiffuse; uniform float uVignette, uSat, uDanger, uSpeed; varying vec2 vUv;
    void main(){
      vec2 d = vUv - 0.5;
      float r2 = dot(d, d);
      // slight radial smear at the edges when sprinting
      vec2 uv = vUv - d * r2 * 0.03 * uSpeed;
      vec3 c = texture2D(tDiffuse, uv).rgb;
      if (uSpeed > 0.01) { c = mix(c, (c + texture2D(tDiffuse, vUv - d * r2 * 0.07 * uSpeed).rgb + texture2D(tDiffuse, vUv - d * r2 * 0.11 * uSpeed).rgb) / 3.0, min(1.0, r2 * 4.0)); }
      float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
      c = mix(vec3(l), c, uSat);
      // warm highlights, cool shadows
      c *= mix(vec3(0.96, 0.98, 1.05), vec3(1.05, 1.0, 0.94), smoothstep(0.0, 0.7, l));
      c = c * (1.0 + 0.06 * (1.0 - l));
      float v = smoothstep(0.2, 0.85, r2 * 2.0);
      c *= 1.0 - v * uVignette;
      c = mix(c, c * vec3(1.15, 0.72, 0.68), v * uDanger);
      gl_FragColor = vec4(c, 1.0);
    }`};function Yb(i,t,e,n={}){const s=i.getDrawingBufferSize(new Dt),o=new ns(s.x,s.y,{type:Is,samples:n.msaa??4}),r=new Vb(i,o);r.addPass(new Hb(t,e));let a=null;n.bloom!==!1&&(a=new Sa(new Dt(s.x/2,s.y/2),.32,.7,.92),r.addPass(a));const l=new Am(Xb);return r.addPass(l),r.addPass(new qb),{composer:r,grade:l,bloom:a,setSize(h,c,f){r.setPixelRatio(f),r.setSize(h,c)},render(h){r.render(h)}}}const $b=new k;function jb(i){const t=i.layout.landmarks||{},e=(h,c)=>h&&i.player.pos.distanceTo(h)<c,n=()=>{const h=i.pickups.nearest(i.player.pos,"acorn");return h?h.base:null},s=()=>{const h=i.pickups.nearest(i.player.pos,"golden");return h?h.base:null},o=h=>{const c=(i.layout.dogZones||[]).filter(u=>!h||u.kind===h);let f=null,d=1e9;for(const u of c){const p=u.center.distanceTo(i.player.pos);p<d&&(d=p,f=u)}return f?$b.copy(f.center).setY(f.center.y+1.2):null},r=i.stats,a=[{title:"Breakfast",text:i.touch?"Run with your left thumb and grab 5 acorns":"Run with W A S D and grab 5 acorns",total:5,start(){this.base=r.acorns},progress(){return r.acorns-this.base},target:n,label:"Acorn"},{title:"Stop and look",text:"Stand still until the ring fills, then go: you burst into a sprint",start(){this.base=r.bursts},done(){return r.bursts>this.base},target:()=>null},{title:"Home tree",text:"Run straight at the big oak and keep going up to your nest",done(){return e(i.layout.home,3.2)},target:()=>i.layout.home,label:"Nest"},{title:"Branch to branch",text:"Aim at a glowing ring and press Jump. Hold Jump to keep leaping. Chain 3 leaps",total:3,progress(){return Math.min(3,r.bestComboNow)},start(){r.bestComboNow=0},target:()=>null},{title:"The high wire",text:"Leap from the trees to a pole and run along the power line",total:12,start(){this.base=r.wireDist},progress(){return Math.floor(r.wireDist-this.base)},target:()=>t.firstPole||null,label:"Pole"},{title:"Rooftops",text:"Follow the wire across the street onto a roof",done(){return r.onRoof},target:()=>t.firstRoof||null,label:"Roof"},{title:"Guard dog",text:i.touch?"Chase a dog off: throw nuts with Attack, or drop on it from above":"Chase a dog off: throw nuts with F, or drop on it from above",start(){this.base=r.dogs},done(){return r.dogs>this.base},target:()=>o(),label:"Dog",skipIf:()=>!i.hasDogs()},{title:"Something shiny",text:"Golden acorns hide in hard places. Find one",start(){this.base=r.golden},done(){return r.golden>this.base},target:s,label:"Golden acorn"},{title:"Top of the town",text:"Climb the church steeple, the highest point in town",done(){return t.steeple&&i.player.pos.y>t.steeple.y-3.5&&Math.hypot(i.player.pos.x-t.steeple.x,i.player.pos.z-t.steeple.z)<5},target:()=>t.steeple||null,label:"Steeple"},{title:"The bulldog",text:"The bulldog guards a golden acorn in his yard. Send him packing",done(){return r.bulldog},target:()=>t.bulldogYard||o("bulldog"),label:"Bulldog",skipIf:()=>!i.hasDogs()},{title:"Winter store",text:"Gather 120 acorns and 8 golden acorns before the frost",total:120,progress(){return Math.min(120,r.acorns)},done(){return r.acorns>=120&&r.golden>=8},target:()=>r.golden<8?s():n(),label:"",final:!0}];return{index:0,current:null,finished:!1,justCompleted:null,justStarted:!1,setIndex(h){for(this.index=h,this.current=a[h]||null,this.finished=!this.current;this.current&&this.current.skipIf&&this.current.skipIf();)this.index++,this.current=a[this.index]||null,this.finished=!this.current;this.current&&this.current.start&&this.current.start(),this.justStarted=!0},update(){this.justCompleted=null;const h=this.current;if(!h)return;const c=h.progress?h.progress():0;(h.done?h.done():h.total?c>=h.total:!1)&&(this.justCompleted=h,this.setIndex(this.index+1))},view(){const h=this.current;return h?{title:h.title,text:h.text,progress:h.progress?h.progress():void 0,total:h.total}:{title:"Free roaming",text:"The whole town is yours. Find every golden acorn",progress:i.stats.golden,total:i.pickups.goldenTotal}},target(){const h=this.current;return h?h.target?h.target():null:s()},label(){return this.current?this.current.label||"":"Golden acorn"},count:a.length}}const or=56,Kb=1.35,Zb=.14,ap=1.35,Jb=.45,lp=.18,cp=1e3,Qb=6,t3='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 27 24 15l12 12" fill="none" stroke="currentColor" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 37l9-9 9 9" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/></svg>',e3='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M11.5 21.5c0 11 6 19 12.5 21 6.500-2 12.500-10 12.500-21z" fill="currentColor" opacity=".9"/><path d="M8.500 21.500c0-8 6.800-12.500 15.500-12.500s15.500 4.500 15.500 12.500c0 1.500-1 2.500-2.300 2.500H10.800c-1.300 0-2.300-1-2.300-2.500z" fill="currentColor"/><path d="M24 9.500c0-2.800 1.200-4.600 3.600-5.500" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>',n3=new Set(["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space","KeyF","KeyJ","Escape","KeyP"]);function ph(i,t,e,n,s){const o=Math.hypot(i,t);if(o<=e)return s.x=0,s.y=0,s;const r=Math.pow(Math.min(1,(o-e)/(1-e)),n)/o;return s.x=i*r,s.y=t*r,s}function i3(i){const t=i.ownerDocument||document,e=t.defaultView||window,n=e.navigator;i.classList.add("sq-input-root");const s=t.createElement("div");s.className="sq-touch",s.innerHTML='<div class="sq-stick is-idle"><div class="sq-stick-ring"></div><div class="sq-stick-knob"></div></div><div class="sq-btn sq-btn-attack" data-btn="attack" role="button" aria-label="Attack">'+e3+'<span class="sq-btn-hint"></span></div><div class="sq-btn sq-btn-jump" data-btn="jump" role="button" aria-label="Jump">'+t3+'<span class="sq-btn-hint"></span></div>',i.appendChild(s);const o=s.querySelector(".sq-stick"),r=s.querySelector(".sq-stick-knob"),a={jump:s.querySelector(".sq-btn-jump"),attack:s.querySelector(".sq-btn-attack")};let l=!0,h=!1;const c=new Set,f={id:-1,ox:0,oy:0,x:0,y:0},d={id:-1,x:0,y:0},u={jump:{id:-1},attack:{id:-1}},p={id:-1,x:0,y:0,travel:0,button:0,attack:!1},v={x:0,y:0,jump:!1,attack:!1,start:!1,seen:0,last:0},m={dx:0,dy:0},g={dx:0,dy:0},M={x:0,y:0},T={move:{x:0,y:0},jumpPressed:!1,jumpHeld:!1,attackPressed:!1,attackHeld:!1,pausePressed:!1,anyPressed:!1,isTouch:!1,pointerLocked:!1,enabled:!0,vibrationEnabled:!0,consumeLook:Lt,endFrame:V,setEnabled:Nt,setButtonHint:ft,vibrate:Yt,destroy:Tt,element:i,touchLayer:s};Object.defineProperty(T,"lookActive",{enumerable:!0,get(){return l&&(d.id!==-1||p.id!==-1)}});function E(){s.classList.toggle("is-on",T.isTouch&&l)}function A(){T.isTouch||(T.isTouch=!0,i.classList.add("sq-is-touch"),E())}try{e.matchMedia&&e.matchMedia("(hover: none) and (pointer: coarse)").matches&&A()}catch{}function w(at){l&&(T[at+"Pressed"]=!0,T.anyPressed=!0)}function _(){if(!l){T.move.x=0,T.move.y=0,T.jumpHeld=!1,T.attackHeld=!1;return}let at=(c.has("KeyD")||c.has("ArrowRight")?1:0)-(c.has("KeyA")||c.has("ArrowLeft")?1:0),At=(c.has("KeyW")||c.has("ArrowUp")?1:0)-(c.has("KeyS")||c.has("ArrowDown")?1:0);at&&At&&(at*=Math.SQRT1_2,At*=Math.SQRT1_2);let z=at+f.x+v.x,D=At+f.y+v.y;const Q=Math.hypot(z,D);Q>1&&(z/=Q,D/=Q),T.move.x=z,T.move.y=D,T.jumpHeld=u.jump.id!==-1||c.has("Space")||v.jump,T.attackHeld=u.attack.id!==-1||c.has("KeyF")||c.has("KeyJ")||p.attack||v.attack}function S(at){return!at||!at.closest||at===i?!1:!!at.closest("[data-no-input], button, a, input, select, textarea, label")}function x(){o.style.transform="translate3d("+(f.ox-or)+"px,"+(f.oy-or)+"px,0)"}function y(at,At){f.id=at.pointerId,f.ox=at.clientX-At.left,f.oy=at.clientY-At.top,f.x=0,f.y=0,o.classList.remove("is-idle"),o.classList.add("is-active"),x(),r.style.transform="translate3d(0px,0px,0)"}function b(at){const At=i.getBoundingClientRect(),z=at.clientX-At.left,D=at.clientY-At.top;let Q=z-f.ox,dt=D-f.oy,_t=Math.hypot(Q,dt);const xt=or*Kb;if(_t>xt){const Bt=(_t-xt)/_t;f.ox+=Q*Bt,f.oy+=dt*Bt,Q=z-f.ox,dt=D-f.oy,_t=xt,x()}const jt=_t>or?or/_t:1;r.style.transform="translate3d("+Q*jt+"px,"+dt*jt+"px,0)",ph(Q*jt/or,-dt*jt/or,Zb,ap,M),f.x=M.x,f.y=M.y}function C(){f.id=-1,f.x=0,f.y=0,o.classList.remove("is-active"),o.classList.add("is-idle"),o.style.transform="",r.style.transform=""}function L(at){try{at.isTrusted&&at.target.setPointerCapture&&at.target.setPointerCapture(at.pointerId)}catch{}}function R(at){const At=at.pointerType==="touch"||at.pointerType==="pen";if(At&&A(),!l)return;const z=at.target,D=z&&z.closest?z.closest(".sq-btn"):null;if(D&&s.contains(D)){const dt=D.dataset.btn,_t=u[dt];_t.id===-1&&(_t.id=at.pointerId,D.classList.add("is-down"),w(dt),Yt(8),_()),L(at),at.preventDefault();return}if(S(z))return;if(!At){if(T.pointerLocked){at.button===0&&(p.attack=!0,w("attack"),_());return}p.id=at.pointerId,p.x=at.clientX,p.y=at.clientY,p.travel=0,p.button=at.button,T.anyPressed=!0,at.preventDefault();return}T.anyPressed=!0;const Q=i.getBoundingClientRect();f.id===-1&&at.clientX-Q.left<Q.width*Jb?(y(at,Q),_()):d.id===-1&&(d.id=at.pointerId,d.x=at.clientX,d.y=at.clientY),at.preventDefault()}function U(at){const At=at.pointerId;if(At===f.id){b(at),_();return}if(At===d.id){m.dx+=at.clientX-d.x,m.dy+=at.clientY-d.y,d.x=at.clientX,d.y=at.clientY;return}if(!(at.pointerType!=="mouse"||!l)){if(T.pointerLocked)m.dx+=at.movementX||0,m.dy+=at.movementY||0;else if(At===p.id){const z=at.clientX-p.x,D=at.clientY-p.y;p.x=at.clientX,p.y=at.clientY,p.travel+=Math.abs(z)+Math.abs(D),m.dx+=z,m.dy+=D}}}function I(at){u[at].id=-1,a[at].classList.remove("is-down")}function X(at){const At=at.pointerId;if(At===f.id&&(C(),_()),At===d.id&&(d.id=-1),At===u.jump.id&&(I("jump"),_()),At===u.attack.id&&(I("attack"),_()),at.pointerType==="mouse"&&(at.button===0&&p.attack&&(p.attack=!1,_()),At===p.id)){const z=at.type==="pointerup"&&p.button===0&&p.travel<Qb;p.id=-1,z&&l&&!T.pointerLocked&&Y()}}function Y(){if(i.requestPointerLock)try{const at=i.requestPointerLock();at&&at.catch&&at.catch(()=>{})}catch{}}function st(){if(t.pointerLockElement===i&&t.exitPointerLock){h=!0;try{t.exitPointerLock()}catch{}}}function bt(){const at=t.pointerLockElement===i,At=T.pointerLocked;T.pointerLocked=at,At&&!at&&(p.attack=!1,h||w("pause"),h=!1,_())}function St(at){const At=at.target,z=At&&At.tagName;return z==="INPUT"||z==="TEXTAREA"||z==="SELECT"||At&&At.isContentEditable}function Ft(at){if(!l||at.metaKey||at.ctrlKey||at.altKey||St(at))return;const At=at.code;if(!n3.has(At)){at.repeat||(T.anyPressed=!0);return}at.preventDefault(),!at.repeat&&(c.add(At),T.anyPressed=!0,At==="Space"?w("jump"):At==="KeyF"||At==="KeyJ"?w("attack"):(At==="Escape"||At==="KeyP")&&w("pause"),_())}function ye(at){c.delete(at.code)&&_()}function lt(){v.seen++}function vt(){v.seen=Math.max(0,v.seen-1),v.x=v.y=0,v.jump=v.attack=v.start=!1,_()}function Pt(){const at=e.performance.now(),At=v.last?Math.min(.05,(at-v.last)/1e3):0;if(v.last=at,!v.seen||!n.getGamepads)return;const z=n.getGamepads();let D=null;for(let Bt=0;Bt<z.length;Bt++)if(z[Bt]&&z[Bt].connected){D=z[Bt];break}if(!D)return;const Q=D.axes,dt=D.buttons;ph(Q[0]||0,-(Q[1]||0),lp,ap,M),v.x=M.x,v.y=M.y,ph(Q[2]||0,Q[3]||0,lp,1.8,M),l&&(m.dx+=M.x*cp*At,m.dy+=M.y*cp*At);const _t=!!(dt[0]&&dt[0].pressed),xt=!!(dt[2]&&dt[2].pressed),jt=!!(dt[9]&&dt[9].pressed);_t&&!v.jump&&w("jump"),xt&&!v.attack&&w("attack"),jt&&!v.start&&w("pause"),v.jump=_t,v.attack=xt,v.start=jt,_()}function wt(){c.clear(),f.id!==-1&&C(),d.id=-1,I("jump"),I("attack"),p.id=-1,p.attack=!1,m.dx=0,m.dy=0,_()}function $t(){wt()}function xe(){t.hidden&&wt()}function Xt(at){S(at.target)||at.preventDefault()}function Ot(at){at.preventDefault()}const yt={passive:!1};i.addEventListener("pointerdown",R,yt),e.addEventListener("pointermove",U),e.addEventListener("pointerup",X),e.addEventListener("pointercancel",X),e.addEventListener("keydown",Ft),e.addEventListener("keyup",ye),e.addEventListener("blur",$t),t.addEventListener("visibilitychange",xe),t.addEventListener("pointerlockchange",bt),e.addEventListener("gamepadconnected",lt),e.addEventListener("gamepaddisconnected",vt),i.addEventListener("touchstart",Xt,yt),i.addEventListener("touchmove",Xt,yt),i.addEventListener("contextmenu",Ot),i.addEventListener("dblclick",Xt),i.addEventListener("selectstart",Xt),i.addEventListener("dragstart",Ot),i.addEventListener("gesturestart",Ot),i.addEventListener("gesturechange",Ot);function Lt(){return g.dx=l?m.dx:0,g.dy=l?m.dy:0,m.dx=0,m.dy=0,g}function V(){T.jumpPressed=!1,T.attackPressed=!1,T.pausePressed=!1,T.anyPressed=!1,Pt()}function Nt(at){at=!!at,at!==l&&(l=at,T.enabled=at,at||(wt(),st(),T.jumpPressed=T.attackPressed=T.pausePressed=T.anyPressed=!1),E(),_())}function ft(at,At){const z=a[at];if(!z)return;const D=z.querySelector(".sq-btn-hint");D.textContent=At||"",z.classList.toggle("has-hint",!!At)}function Yt(at){if(!(!T.vibrationEnabled||!n.vibrate)&&!(n.userActivation&&!n.userActivation.hasBeenActive))try{n.vibrate(at)}catch{}}function Tt(){i.removeEventListener("pointerdown",R,yt),e.removeEventListener("pointermove",U),e.removeEventListener("pointerup",X),e.removeEventListener("pointercancel",X),e.removeEventListener("keydown",Ft),e.removeEventListener("keyup",ye),e.removeEventListener("blur",$t),t.removeEventListener("visibilitychange",xe),t.removeEventListener("pointerlockchange",bt),e.removeEventListener("gamepadconnected",lt),e.removeEventListener("gamepaddisconnected",vt),i.removeEventListener("touchstart",Xt,yt),i.removeEventListener("touchmove",Xt,yt),i.removeEventListener("contextmenu",Ot),i.removeEventListener("dblclick",Xt),i.removeEventListener("selectstart",Xt),i.removeEventListener("dragstart",Ot),i.removeEventListener("gesturestart",Ot),i.removeEventListener("gesturechange",Ot),st(),s.remove()}return E(),T}const Cm="squirrel.settings.v1",hp="squirrel.tip.sideways.v1",mh={volume:.8,music:!0,sensitivity:1,invertY:!1,quality:"auto",vibration:!0},Rm=[["auto","Auto"],["low","Low"],["medium","Medium"],["high","High"]],up=(i,t,e,n,s="")=>`<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.4 4.600c0-1.500.7-2.500 2-3" fill="none" stroke="${n}" stroke-width="1.700" stroke-linecap="round"/>
    <path d="M5.300 10.800c0 6 3.300 10.200 6.700 11.400 3.400-1.200 6.700-5.400 6.700-11.400z" fill="${i}"/>
    <path d="M12 22.200c3.400-1.200 6.700-5.400 6.700-11.400h-3.200c0 5-1.300 9-3.500 11.400z" fill="${t}" opacity=".55"/>
    <ellipse cx="9" cy="14.500" rx="1.300" ry="2.600" fill="#fff" opacity=".42" transform="rotate(12 9 14.500)"/>
    <path d="M3.600 10.600c0-4.200 3.700-6.600 8.400-6.600s8.400 2.400 8.400 6.600c0 .9-.6 1.600-1.500 1.600H5.100c-.9 0-1.500-.7-1.500-1.600z" fill="${e}"/>
    <path d="M6.500 7.300l2.200 2.300M10 5.800l2.300 2.600M14 5.600l2.300 2.600M8.200 10.300l1 1M12.600 9.900l1.200 1.300" fill="none" stroke="${n}" stroke-width="1" stroke-linecap="round" opacity=".7"/>
    ${s}
  </svg>`,qn={acorn:up("#e8842c","#b65a12","#7a4a26","#4a2f1c"),golden:up("#ffd24a","#e09a12","#c98a1a","#8a5a0c",'<path d="M19.500 1.500l.7 1.800 1.800.7-1.800.7-.7 1.800-.7-1.800-1.800-.7 1.800-.7z" fill="#fff6c8"/>'),heart:`<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path class="sq-heart-shape" d="M12 20.800S3.200 14.900 3.200 8.900c0-3 2.300-5.200 5-5.200 1.600 0 3 .8 3.800 2.100.8-1.300 2.200-2.100 3.800-2.100 2.700 0 5 2.200 5 5.200 0 6-8.800 11.900-8.800 11.900z"/>
    <path class="sq-heart-shine" d="M7.900 6.200c-1.300.2-2.200 1.300-2.200 2.700" fill="none" stroke="#fff" stroke-width="1.500" stroke-linecap="round" opacity=".6"/>
  </svg>`,paw:`<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M12 11.600c-3 0-5.600 2.700-5.600 5.300 0 1.900 1.500 2.900 3.200 2.900 1 0 1.600-.4 2.400-.4s1.400.4 2.400.4c1.700 0 3.200-1 3.200-2.900 0-2.600-2.600-5.300-5.600-5.300z"/>
    <ellipse cx="5.300" cy="10.300" rx="1.700" ry="2.300" transform="rotate(-22 5.300 10.300)"/>
    <ellipse cx="9.400" cy="6.600" rx="1.800" ry="2.500" transform="rotate(-8 9.400 6.600)"/>
    <ellipse cx="14.600" cy="6.600" rx="1.800" ry="2.500" transform="rotate(8 14.600 6.600)"/>
    <ellipse cx="18.700" cy="10.300" rx="1.700" ry="2.300" transform="rotate(22 18.700 10.300)"/>
  </svg>`,pause:`<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <rect x="6" y="5" width="4.400" height="14" rx="2"/><rect x="13.600" y="5" width="4.400" height="14" rx="2"/></svg>`,dog:`<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5.200 5.200C3.300 6 2.300 8.600 2.700 11.800c.2 1.500 1.300 2.300 2.300 1.900l1.600-.7z" fill="currentColor"/>
    <path d="M18.800 5.200c1.900.8 2.900 3.400 2.500 6.600-.2 1.500-1.300 2.300-2.300 1.900l-1.600-.7z" fill="currentColor"/>
    <path d="M12 3.600c-4 0-6.800 2.600-6.800 6.600 0 2.300.6 3.900 1.300 5.600.9 2.400 2.800 4.600 5.500 4.600s4.600-2.200 5.500-4.600c.7-1.700 1.300-3.300 1.300-5.600 0-4-2.800-6.600-6.800-6.600z" fill="currentColor"/>
    <ellipse cx="12" cy="15.600" rx="3.300" ry="2.900" fill="#fff6e4" opacity=".92"/>
    <path d="M10.600 14.300h2.800c.4 0 .6.400.3.800l-1.200 1.200c-.3.300-.7.300-1 0l-1.200-1.200c-.3-.4-.1-.8.300-.8z" fill="#2e1c10"/>
    <circle cx="9" cy="10" r="1.150" fill="#fff6e4"/><circle cx="15" cy="10" r="1.150" fill="#fff6e4"/>
  </svg>`,eye:`<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M1.800 12S5.600 5.400 12 5.400 22.200 12 22.200 12 18.400 18.600 12 18.600 1.800 12 1.800 12z" fill="#fff6e4" stroke="currentColor" stroke-width="1.800" stroke-linejoin="round"/>
    <circle cx="12" cy="12" r="3.700" fill="currentColor"/><circle cx="13.300" cy="10.700" r="1.100" fill="#fff6e4"/>
  </svg>`,clock:`<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.200" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12.500" r="8"/><path d="M12 8v4.800l3 1.900M9.500 2.200h5"/></svg>`,close:'<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.800" stroke-linecap="round"><path d="M7 7l10 10M17 7L7 17"/></svg>',turn:`<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.900" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="11.500" width="15" height="8.500" rx="2"/><path d="M8 8V5.500a2 2 0 0 1 2-2h1" opacity=".55"/><path d="M15 3.500c3 .3 5 2.300 5.300 5.200M20.300 8.700l-2.200-1M20.300 8.700l1.200-2.100"/></svg>`,arrow:'<svg class="sq-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.600c-.9-.5-1.900.4-1.500 1.400L5.900 12l-2.400 6c-.4 1 .6 1.900 1.500 1.400l14.600-6.500c.9-.4.9-1.400 0-1.800z" fill="currentColor" stroke="#2e1c10" stroke-width="1.300" stroke-linejoin="round"/></svg>',pin:'<svg class="sq-ico" viewBox="0 0 24 30" aria-hidden="true"><path d="M12 28.500S3 18.400 3 11.600C3 6.300 7 2.500 12 2.500s9 3.800 9 9.100c0 6.800-9 16.900-9 16.900z" fill="currentColor" stroke="#2e1c10" stroke-width="1.500" stroke-linejoin="round"/><circle cx="12" cy="11.500" r="3.600" fill="#fff6e4"/></svg>',reticle:`<svg viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3.400" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 16v-5a5 5 0 0 1 5-5h5M32 6h5a5 5 0 0 1 5 5v5M42 32v5a5 5 0 0 1-5 5h-5M16 42h-5a5 5 0 0 1-5-5v-5"/></svg>`},ke={bark:"#4a2f1c",deep:"#2e1c10",orange:"#e8842c",gold:"#f6c445",cream:"#fff6e4",fur:"#c96f2a"},gh=(i,t,e=1,n=!1)=>`
  <g transform="translate(${i} ${t}) scale(${n?-e:e} ${e})">
    <path d="M-9 0c-9 1-15-6-12-14 2-6 9-7 12-3 2 3 0 7-3 6" fill="none" stroke="${ke.fur}" stroke-width="6.500" stroke-linecap="round"/>
    <ellipse cx="0" cy="-5" rx="9.500" ry="6.500" fill="${ke.fur}"/>
    <circle cx="9" cy="-10.500" r="5.200" fill="${ke.fur}"/>
    <path d="M6.500-14.500l.6-4.600 3.300 3z" fill="${ke.fur}"/>
    <circle cx="10.800" cy="-11.200" r="1.150" fill="${ke.deep}"/>
    <ellipse cx="2" cy="-3" rx="5" ry="3" fill="${ke.cream}" opacity=".75"/>
  </g>`,xh=(i,t,e,n)=>`<path d="M${i} ${t}L${e} ${n}" stroke="${ke.bark}" stroke-width="6" stroke-linecap="round"/>`,Tc=(i,t,e,n=20)=>`<rect x="${i}" y="${t}" width="${n}" height="20" rx="5" fill="${ke.cream}" stroke="${ke.bark}" stroke-width="2"/><text x="${i+n/2}" y="${t+14.5}" text-anchor="middle" font-size="11" font-weight="700" fill="${ke.bark}">${e}</text>`,Ja=i=>`<svg class="sq-diagram" viewBox="0 0 160 100" aria-hidden="true">${i}</svg>`,s3={moveTouch:Ja(`
    <rect x="8" y="14" width="144" height="72" rx="13" fill="${ke.cream}" stroke="${ke.bark}" stroke-width="3"/>
    <circle cx="44" cy="56" r="19" fill="none" stroke="${ke.bark}" stroke-width="2.500" opacity=".45"/>
    <circle cx="50" cy="48" r="9.500" fill="${ke.orange}" stroke="${ke.bark}" stroke-width="2"/>
    <path d="M57 39l7-9M64 30l-6.500 1.200M64 30l-.8 6.500" fill="none" stroke="${ke.bark}" stroke-width="2.400" stroke-linecap="round"/>
    <path d="M84 60c10-18 34-18 46-4" fill="none" stroke="${ke.orange}" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 7"/>
    <path d="M130 56l-1.500-8M130 56l-8 1" fill="none" stroke="${ke.orange}" stroke-width="3" stroke-linecap="round"/>
    <circle cx="84" cy="60" r="7" fill="${ke.gold}" stroke="${ke.bark}" stroke-width="2"/>`),moveKeys:Ja(`
    ${Tc(34,26,"W")}${Tc(10,50,"A")}${Tc(34,50,"S")}${Tc(58,50,"D")}
    <rect x="104" y="20" width="36" height="58" rx="18" fill="${ke.cream}" stroke="${ke.bark}" stroke-width="3"/>
    <path d="M122 20v22M104 42h36" stroke="${ke.bark}" stroke-width="2.500"/>
    <path d="M90 88c14 7 44 7 62 0" fill="none" stroke="${ke.orange}" stroke-width="3" stroke-linecap="round" stroke-dasharray="1 7"/>
    <path d="M152 88l-7.500-2.500M152 88l-5 6" fill="none" stroke="${ke.orange}" stroke-width="3" stroke-linecap="round"/>`),leap:Ja(`
    ${xh(4,74,50,68)}${xh(112,60,158,52)}
    <path d="M40 54C60 18 96 14 124 44" fill="none" stroke="${ke.bark}" stroke-width="2.600" stroke-linecap="round" stroke-dasharray="1 7"/>
    <ellipse cx="132" cy="54" rx="15" ry="6" fill="none" stroke="${ke.gold}" stroke-width="7" opacity=".35"/>
    <ellipse cx="132" cy="54" rx="15" ry="6" fill="none" stroke="${ke.gold}" stroke-width="3.200"/>
    <ellipse cx="132" cy="54" rx="15" ry="6" fill="none" stroke="#fff" stroke-width="1" opacity=".8"/>
    ${gh(30,66,1)}`),still:Ja(`
    ${xh(6,80,84,80)}
    ${gh(40,78,1.15)}
    <path d="M62 52l9-5M64 62h11M60 43l6-8" stroke="${ke.bark}" stroke-width="2.400" stroke-linecap="round" opacity=".6"/>
    <circle cx="120" cy="50" r="24" fill="${ke.cream}" stroke="${ke.bark}" stroke-width="2" opacity=".95"/>
    <circle cx="120" cy="50" r="17" fill="none" stroke="${ke.bark}" stroke-width="5.500" opacity=".18"/>
    <path d="M120 33a17 17 0 1 1-17 17" fill="none" stroke="${ke.gold}" stroke-width="5.500" stroke-linecap="round"/>
    <g transform="translate(109 39) scale(.92)" color="${ke.bark}" fill="${ke.bark}">
      <path d="M12 11.600c-3 0-5.600 2.700-5.600 5.300 0 1.900 1.500 2.900 3.200 2.900 1 0 1.600-.4 2.400-.4s1.400.4 2.400.4c1.700 0 3.200-1 3.200-2.900 0-2.600-2.600-5.300-5.600-5.300z"/>
      <ellipse cx="5.300" cy="10.300" rx="1.700" ry="2.300"/><ellipse cx="9.400" cy="6.600" rx="1.800" ry="2.500"/>
      <ellipse cx="14.600" cy="6.600" rx="1.800" ry="2.500"/><ellipse cx="18.700" cy="10.300" rx="1.700" ry="2.300"/>
    </g>`),dogs:Ja(`
    <path d="M4 88h152" stroke="${ke.bark}" stroke-width="3" stroke-linecap="round" opacity=".35"/>
    <g transform="translate(96 40) scale(2)" color="${ke.bark}">
      <path d="M5.200 5.200C3.300 6 2.300 8.600 2.700 11.800c.2 1.500 1.300 2.300 2.300 1.900l1.600-.7z" fill="${ke.bark}"/>
      <path d="M18.800 5.200c1.900.8 2.900 3.400 2.500 6.600-.2 1.500-1.300 2.300-2.300 1.900l-1.600-.7z" fill="${ke.bark}"/>
      <path d="M12 3.600c-4 0-6.800 2.600-6.800 6.600 0 2.300.6 3.900 1.300 5.600.9 2.400 2.800 4.600 5.500 4.600s4.600-2.200 5.500-4.600c.7-1.700 1.300-3.300 1.300-5.600 0-4-2.800-6.600-6.800-6.600z" fill="#9a6a44"/>
      <ellipse cx="12" cy="15.600" rx="3.300" ry="2.900" fill="${ke.cream}"/>
      <path d="M10.600 14.300h2.800c.4 0 .6.400.3.800l-1.200 1.200c-.3.300-.7.300-1 0l-1.200-1.200c-.3-.4-.1-.8.300-.8z" fill="${ke.deep}"/>
      <circle cx="9" cy="10" r="1.100" fill="${ke.deep}"/><circle cx="15" cy="10" r="1.100" fill="${ke.deep}"/>
    </g>
    <path d="M36 66h30" stroke="${ke.bark}" stroke-width="2.600" stroke-linecap="round" stroke-dasharray="1 7"/>
    <g transform="translate(70 55) scale(.92) rotate(70 12 12)">
      <path d="M5.300 10.800c0 6 3.300 10.200 6.700 11.400 3.400-1.200 6.700-5.400 6.700-11.400z" fill="${ke.orange}"/>
      <path d="M3.600 10.600c0-4.200 3.700-6.600 8.400-6.600s8.400 2.400 8.400 6.600c0 .9-.6 1.600-1.500 1.600H5.100c-.9 0-1.500-.7-1.500-1.600z" fill="${ke.bark}"/>
    </g>
    ${gh(22,86,.95)}
    <path d="M120 8v22M120 30l-6.500-6.500M120 30l6.500-6.500" fill="none" stroke="${ke.orange}" stroke-width="3.400" stroke-linecap="round" stroke-linejoin="round"/>`)},fp={touch:[["moveTouch","Move and look","Your left thumb moves you. Drag anywhere else to look around."],["leap","Leap","Tap Jump to leap to the glowing ring. Keep holding Jump to keep leaping."],["still","Stop still","Stand still to look around and fill the ring. When it glows, run for a burst of speed."],["dogs","Dogs","Tap Attack to throw a nut, or scratch up close. Best of all, land on a dog from above."]],keys:[["moveKeys","Move and look","W, A, S, D or the arrow keys move you. Click, then move the mouse to look around."],["leap","Leap","Press Space to leap to the glowing ring. Keep holding Space to keep leaping."],["still","Stop still","Stand still to look around and fill the ring. When it glows, run for a burst of speed."],["dogs","Dogs","Press F or click to throw a nut, or scratch up close. Best of all, land on a dog from above."]]};function Jn(i,t,e){const n=document.createElement(i);return t&&(n.className=t),e!=null&&(n.innerHTML=e),n}function Ki(i,t){i.classList.remove(t),i.offsetWidth,i.classList.add(t)}function o3(i){i=Math.max(0,Math.round(i||0));const t=Math.floor(i/60),e=i%60;return t+":"+(e<10?"0":"")+e}function r3(){const i={...mh};try{const t=JSON.parse(localStorage.getItem(Cm)||"null");if(t&&typeof t=="object")for(const e of Object.keys(mh))typeof t[e]==typeof mh[e]&&(i[e]=t[e])}catch{}return Rm.some(t=>t[0]===i.quality)||(i.quality="auto"),i.volume=Math.min(1,Math.max(0,i.volume)),i.sensitivity=Math.min(2,Math.max(.3,i.sensitivity)),i}function a3(i,t){const e=r3(),n=[];t&&(t.vibrationEnabled=e.vibration);const s=Jn("div","sq-hud");s.innerHTML=`
    <div class="sq-safe-probe"></div>
    <div class="sq-vignette"></div>
    <div class="sq-play">
      <div class="sq-topleft">
        <div class="sq-hearts"></div>
        <div class="sq-counters">
          <div class="sq-pill sq-acorns">${qn.acorn}<span class="sq-num">0</span></div>
          <div class="sq-pill sq-golden">${qn.golden}<span class="sq-num">0</span><span class="sq-of"></span></div>
        </div>
      </div>
      <div class="sq-topcentre">
        <div class="sq-quest"><div class="sq-quest-in">
          <div class="sq-quest-title"></div>
          <div class="sq-quest-text"></div>
          <div class="sq-quest-prog"><div class="sq-quest-bar"><span></span></div><div class="sq-quest-count"></div></div>
        </div></div>
        <div class="sq-toasts"></div>
      </div>
      <div class="sq-topright">
        <div class="sq-alert"><span class="sq-alert-eye">${qn.eye}</span><span class="sq-alert-dog">${qn.dog}</span></div>
        <button class="sq-pausebtn" type="button" aria-label="Pause">${qn.pause}</button>
      </div>
      <div class="sq-bottom">
        <div class="sq-burst">
          <svg viewBox="0 0 48 48" aria-hidden="true">
            <circle class="sq-burst-bg" cx="24" cy="24" r="21"/>
            <circle class="sq-burst-track" cx="24" cy="24" r="19"/>
            <circle class="sq-burst-fill" cx="24" cy="24" r="19" pathLength="100"/>
          </svg>
          ${qn.paw}
        </div>
        <div class="sq-combo">
          <div class="sq-combo-row"><span class="sq-combo-l">Flow</span><span class="sq-combo-n">2</span></div>
          <div class="sq-combo-bar"><span></span></div>
        </div>
      </div>
      <div class="sq-reticle">${qn.reticle}</div>
      <div class="sq-waypoint">
        <div class="sq-wp-pin">${qn.pin}</div>
        <div class="sq-wp-arrow">${qn.arrow}</div>
        <div class="sq-wp-text"><span class="sq-wp-label"></span><span class="sq-wp-dist"></span></div>
      </div>
      <div class="sq-banner"><div class="sq-banner-in">
        <div class="sq-banner-rays"></div>
        <div class="sq-banner-small">${qn.golden}<span>Done</span></div>
        <div class="sq-banner-title"></div>
      </div></div>
    </div>
    <div class="sq-tip" data-no-input>${qn.turn}<span>Turn your phone sideways for a wider view</span><button type="button" aria-label="Close">${qn.close}</button></div>
    <div class="sq-fade"></div>`,i.appendChild(s);const o=G=>s.querySelector(G),r=o(".sq-play"),a=o(".sq-hearts"),l=o(".sq-acorns"),h=o(".sq-acorns .sq-num"),c=o(".sq-golden"),f=o(".sq-golden .sq-num"),d=o(".sq-golden .sq-of"),u=o(".sq-quest"),p=o(".sq-quest-in"),v=o(".sq-toasts"),m=o(".sq-alert"),g=o(".sq-burst"),M=o(".sq-burst-fill"),T=o(".sq-combo"),E=o(".sq-combo-n"),A=o(".sq-combo-bar span"),w=o(".sq-reticle"),_=o(".sq-waypoint"),S=o(".sq-wp-arrow"),x=o(".sq-wp-label"),y=o(".sq-wp-dist"),b=o(".sq-banner"),C=o(".sq-vignette"),L=o(".sq-fade"),R=o(".sq-tip"),U=o(".sq-safe-probe"),I={acorns:0,golden:-1,goldenTotal:-1,health:-1,healthMax:-1,burst:-1,burstFull:!1,combo:0,comboBar:-1,questKey:null,questProg:null,alert:-1,alertMode:"",wpMode:"",wpDist:-1,wpLabel:null,reticle:!1,reticleKind:"",visible:!0,time:0,tipTimer:0,tipShown:!1},X={t:0,r:0,b:0,l:0,w:0,h:0},Y=new Set;let st=null;function bt(){const G=getComputedStyle(U);X.t=parseFloat(G.paddingTop)||0,X.r=parseFloat(G.paddingRight)||0,X.b=parseFloat(G.paddingBottom)||0,X.l=parseFloat(G.paddingLeft)||0,X.w=s.clientWidth,X.h=s.clientHeight,Re()}window.addEventListener("resize",bt),window.addEventListener("orientationchange",bt),o(".sq-pausebtn").addEventListener("click",G=>{G.currentTarget.blur(),t&&(t.pausePressed=!0,t.anyPressed=!0),st&&st()});function St(){const G=Y.size>0;J.modalOpen=G,s.classList.toggle("sq-has-modal",G),document.documentElement.classList.toggle("sq-modal-open",G)}function Ft(G){s.appendChild(G),s.appendChild(L),Y.add(G),G.offsetWidth,G.classList.add("is-open"),St()}function ye(G){!G||!Y.has(G)||(Y.delete(G),G.classList.remove("is-open"),G.classList.add("is-closing"),setTimeout(()=>G.remove(),260),St())}function lt(){let G=null;for(const K of Y)G=K;return G}window.addEventListener("keydown",G=>{if(!Y.size||G.code!=="Escape"&&!(G.code==="KeyP"&&lt()===Nt))return;const K=lt();K&&K._escape&&(G.stopImmediatePropagation(),G.preventDefault(),K._escape())},!0);function vt(G,K,H){const rt=Jn("button",G,K);return rt.type="button",rt.addEventListener("click",ct=>{t&&t.vibrate(6),H(ct)}),rt}let Pt=null;function wt(G={}){$t(!0);const{onStart:K,hasSave:H}=G;Pt=Jn("div","sq-overlay sq-title"),Pt.setAttribute("data-no-input",""),Pt.innerHTML=`
      <div class="sq-title-top">
        <h1 class="sq-wordmark" aria-label="Squirrel">
          <span class="sq-wm-text" aria-hidden="true">Squ<span class="sq-wm-i">i${qn.acorn}</span>rrel</span>
          <svg class="sq-wm-line" viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden="true"><path d="M3 5C50 21 140 24 200 16" vector-effect="non-scaling-stroke"/></svg>
          <svg class="sq-wm-tail" viewBox="0 0 64 92" aria-hidden="true"><path d="M0 83C30 80 54 64 54 38 54 18 38 8 26 14 14 20 16 38 28 40c8 1 12-6 9-11"/></svg>
        </h1>
        <p class="sq-tagline">Climb high. Leap far. Fill the nest before winter.</p>
      </div>
      <div class="sq-title-bottom">
        <div class="sq-title-links"></div>
      </div>`;const rt=Pt.querySelector(".sq-title-bottom"),ct=vt("sq-bigbtn",`<span>${H?"Continue":"Play"}</span>`,()=>{K&&K()});rt.insertBefore(ct,rt.firstChild);const Ct=Pt.querySelector(".sq-title-links");Ct.appendChild(vt("sq-smallbtn","Settings",()=>V())),Ct.appendChild(vt("sq-smallbtn","How to play",()=>Ot())),Ft(Pt),s.classList.add("sq-on-title");try{ct.focus({preventScroll:!0})}catch{}Re()}function $t(G){if(!Pt)return;const K=Pt;Pt=null,G===!0?(Y.delete(K),K.remove(),St()):ye(K),s.classList.remove("sq-on-title"),Re()}function xe(G,K){const H=Jn("div","sq-overlay sq-dim "+G);H.setAttribute("data-no-input","");const rt=Jn("div","sq-panel");return K&&rt.appendChild(Jn("h2","sq-panel-title",K)),H.appendChild(rt),{ov:H,p:rt}}let Xt=null;function Ot(){if(Xt)return;const{ov:G,p:K}=xe("sq-howto","How to play"),H=Jn("div","sq-cards"),rt=t&&t.isTouch?fp.touch:fp.keys;for(const[Ct,Wt,de]of rt)H.appendChild(Jn("div","sq-card",`${s3[Ct]}<h3>${Wt}</h3><p>${de}</p>`));K.appendChild(H);const ct=()=>{ye(G),Xt=null};K.appendChild(vt("sq-bigbtn sq-bigbtn--small","<span>Got it</span>",ct)),G._escape=ct,Xt=G,Ft(G)}let yt=null;function Lt(G){try{localStorage.setItem(Cm,JSON.stringify(e))}catch{}t&&(t.vibrationEnabled=e.vibration);for(const K of n)try{K(e,G)}catch(H){console.error(H)}}function V(){if(yt)return;const{ov:G,p:K}=xe("sq-settings","Settings"),H=Jn("div","sq-rows"),rt=(Wt,de,ve,ze,Kt,sn)=>{const ue=Jn("label","sq-row",`<span class="sq-row-label">${Wt}</span><span class="sq-row-ctl"><input type="range" min="${ve}" max="${ze}" step="${Kt}"><span class="sq-row-val"></span></span>`),He=ue.querySelector("input"),Tn=ue.querySelector(".sq-row-val"),Fn=()=>{He.style.setProperty("--fill",(e[de]-ve)/(ze-ve)*100+"%"),Tn.textContent=sn(e[de])};He.value=e[de],He.addEventListener("input",()=>{e[de]=parseFloat(He.value),Fn(),Lt(de)}),Fn(),H.appendChild(ue)},ct=(Wt,de,ve="On",ze="Off")=>{const Kt=Jn("div","sq-row",`<span class="sq-row-label">${Wt}</span><span class="sq-row-ctl"><button type="button" class="sq-switch" role="switch" aria-label="${Wt}"><span class="sq-switch-knob"></span></button><span class="sq-row-val"></span></span>`),sn=Kt.querySelector("button"),ue=Kt.querySelector(".sq-row-val"),He=()=>{sn.setAttribute("aria-checked",e[de]?"true":"false"),ue.textContent=e[de]?ve:ze},Tn=()=>{e[de]=!e[de],He(),Lt(de),de==="vibration"&&e.vibration&&t&&t.vibrate(30)};Kt.addEventListener("click",Tn),He(),H.appendChild(Kt)};rt("Sound volume","volume",0,1,.05,Wt=>Math.round(Wt*100)+"%"),ct("Music","music"),rt("Camera speed","sensitivity",.3,2,.05,Wt=>Math.round(Wt*100)+"%"),ct("Flip up and down look","invertY");{const Wt=Jn("div","sq-row sq-row--stack",'<span class="sq-row-label">Picture quality</span><span class="sq-seg" role="radiogroup" aria-label="Picture quality"></span>'),de=Wt.querySelector(".sq-seg"),ve=()=>{for(const ze of de.children)ze.setAttribute("aria-checked",ze.dataset.q===e.quality?"true":"false")};for(const[ze,Kt]of Rm){const sn=Jn("button","sq-seg-btn",Kt);sn.type="button",sn.dataset.q=ze,sn.setAttribute("role","radio"),sn.addEventListener("click",()=>{e.quality=ze,ve(),Lt("quality")}),de.appendChild(sn)}ve(),H.appendChild(Wt)}ct("Vibration","vibration"),K.appendChild(H);const Ct=()=>{ye(G),yt=null};K.appendChild(vt("sq-bigbtn sq-bigbtn--small","<span>Done</span>",Ct)),G._escape=Ct,yt=G,Ft(G)}let Nt=null;function ft(G={}){if(Nt)return;const{onResume:K,onRestart:H}=G,{ov:rt,p:ct}=xe("sq-pause","Paused");ct.classList.add("sq-panel--narrow");const Ct=()=>{Yt(),K&&K()},Wt=Jn("div","sq-col");Wt.appendChild(vt("sq-bigbtn sq-bigbtn--small","<span>Keep playing</span>",Ct)),Wt.appendChild(vt("sq-smallbtn sq-smallbtn--solid","Start again",()=>{Yt(),H&&H()}));const de=Jn("div","sq-pair");de.appendChild(vt("sq-smallbtn sq-smallbtn--solid","Settings",()=>V())),de.appendChild(vt("sq-smallbtn sq-smallbtn--solid","How to play",()=>Ot())),Wt.appendChild(de),ct.appendChild(Wt),rt._escape=Ct,Nt=rt,Ft(rt)}function Yt(){Nt&&(ye(Nt),Nt=null)}let Tt=null;function at(G={},K){Tt&&(Y.delete(Tt),Tt.remove(),Tt=null);const{ov:H,p:rt}=xe("sq-ending",null);rt.classList.add("sq-panel--end");const ct=G.goldenTotal!=null?`${G.golden||0} of ${G.goldenTotal}`:`${G.golden||0}`;rt.innerHTML=`
      <div class="sq-end-glow"></div>
      <div class="sq-end-acorn">${qn.golden}</div>
      <h2 class="sq-panel-title">Snug for the winter</h2>
      <p class="sq-end-text">The nest is full and the park is yours.</p>
      <div class="sq-stats">
        <div class="sq-stat">${qn.acorn}<b>${G.acorns||0}</b><span>Acorns gathered</span></div>
        <div class="sq-stat">${qn.golden}<b>${ct}</b><span>Golden acorns</span></div>
        <div class="sq-stat sq-stat--ink">${qn.clock}<b>${o3(G.time)}</b><span>Time</span></div>
        <div class="sq-stat sq-stat--ink">${qn.dog}<b>${G.dogs||0}</b><span>Dogs chased off</span></div>
      </div>`;const Ct=()=>{ye(H),Tt=null,K&&K()};rt.appendChild(vt("sq-bigbtn sq-bigbtn--small","<span>Keep exploring</span>",Ct)),Tt=H,Ft(H)}function At(G){if(G=Math.max(0,G|0),G===I.acorns)return;const K=G-I.acorns;if(I.acorns=G,h.textContent=G,K>0){Ki(l,"is-bump");const H=Jn("span","sq-fly","+"+K);l.appendChild(H),setTimeout(()=>H.remove(),900)}}function z(G,K){if(G=Math.max(0,G|0),G===I.golden&&K===I.goldenTotal)return;const H=I.golden>=0&&G>I.golden;I.golden=G,I.goldenTotal=K,f.textContent=G,d.textContent=K!=null?"/"+K:"",H&&Ki(c,"is-bump")}function D(G,K){if(G=Math.max(0,Math.round(G)),K=Math.max(1,Math.round(K??(I.healthMax>0?I.healthMax:G))),K!==I.healthMax){a.innerHTML="";for(let ct=0;ct<K;ct++)a.appendChild(Jn("span","sq-heart",qn.heart));I.healthMax=K,I.health=-1}if(G===I.health)return;const H=I.health>=0&&G<I.health,rt=I.health>=0&&G>I.health;for(let ct=0;ct<K;ct++){const Ct=a.children[ct],Wt=ct<G;H&&!Wt&&ct<I.health&&Ki(Ct,"is-pop"),rt&&Wt&&ct>=I.health&&Ki(Ct,"is-gain"),Ct.classList.toggle("is-empty",!Wt)}a.classList.toggle("is-low",G<=1&&K>1),H&&Ki(a,"is-shake"),I.health=G}function Q(){Ki(C,"is-flash"),t&&t.vibrate(40)}function dt(G){G=Math.min(1,Math.max(0,G||0));const K=Math.round(G*100);if(K===I.burst)return;I.burst=K,M.style.strokeDashoffset=String(100-K),g.classList.toggle("is-on",K>2);const H=K>=100;H!==I.burstFull&&(I.burstFull=H,g.classList.toggle("is-full",H),H&&Ki(g,"is-ping"))}function _t(G,K){G=G|0;const H=Math.min(1,Math.max(0,K??1)),rt=G>=2&&H>0;if(rt){G!==I.combo&&(E.textContent=G,T.classList.toggle("is-hot",G>=5),G>I.combo&&Ki(T,"is-bump"));const ct=Math.round(H*50);ct!==I.comboBar&&(I.comboBar=ct,A.style.transform="scaleX("+ct/50+")")}T.classList.toggle("is-on",rt),I.combo=rt?G:0}function xt(G){if(!G){I.questKey!==null&&(u.classList.remove("is-on"),I.questKey=null,I.questProg=null);return}const K=(G.title||"")+`
`+(G.text||""),H=G.total!=null&&G.total>0,rt=H?Math.min(G.total,Math.max(0,G.progress||0))+"/"+G.total:"";if(K!==I.questKey&&(o(".sq-quest-title").textContent=G.title||"",o(".sq-quest-text").textContent=G.text||"",o(".sq-quest-text").style.display=G.text?"":"none",u.classList.add("is-on"),I.questKey!==null?Ki(p,"is-swap"):Ki(p,"is-in"),I.questKey=K,I.questProg=null),rt!==I.questProg){const ct=o(".sq-quest-prog");if(ct.style.display=H?"":"none",H){const Ct=Math.min(G.total,Math.max(0,G.progress||0));o(".sq-quest-bar span").style.transform="scaleX("+Ct/G.total+")",o(".sq-quest-count").textContent=Ct+" of "+G.total,I.questProg!==null&&Ki(ct,"is-bump")}I.questProg=rt}}let jt=0;function Bt(G){o(".sq-banner-title").textContent=G||"",Ki(b,"is-on"),r.classList.add("has-banner"),clearTimeout(jt),jt=setTimeout(()=>{b.classList.remove("is-on"),r.classList.remove("has-banner")},2600),t&&t.vibrate(25)}function oe(G,K=2600){for(;v.children.length>=2;)v.firstChild.remove();const H=Jn("div","sq-toast");H.textContent=G,v.appendChild(H),H.offsetWidth,H.classList.add("is-on"),setTimeout(()=>{H.classList.remove("is-on"),setTimeout(()=>H.remove(),320)},K)}function De(G){if(!G||!G.visible){I.wpMode!==""&&(_.className="sq-waypoint",I.wpMode="");return}X.w||bt();let K=G.x,H=G.y;const rt=G.onScreen?"on":"off";if(rt==="off"){const Wt=G.angle||0,de=Math.cos(Wt),ve=Math.sin(Wt),ze=X.l+36,Kt=X.w-X.r-36,sn=X.t+76,ue=X.h-X.b-(t&&t.isTouch?84:44),He=(ze+Kt)/2,Tn=(sn+ue)/2,Fn=Math.min(Math.abs(de)>1e-4?(Kt-ze)/2/Math.abs(de):1e9,Math.abs(ve)>1e-4?(ue-sn)/2/Math.abs(ve):1e9);K=He+de*Fn,H=Tn+ve*Fn,S.style.transform="rotate("+Wt+"rad)"}if(rt!==I.wpMode&&(_.className="sq-waypoint is-on is-"+rt,I.wpMode=rt),rt==="off"){const Wt=Math.cos(G.angle||0),de=Math.sin(G.angle||0),ve=Math.abs(Wt)>.5;_.classList.toggle("is-right",ve&&Wt>0),_.classList.toggle("is-left",ve&&Wt<0),_.classList.toggle("is-above",!ve&&de>0)}_.style.transform="translate3d("+K.toFixed(1)+"px,"+H.toFixed(1)+"px,0)";const ct=G.distance==null?-1:Math.round(G.distance);ct!==I.wpDist&&(I.wpDist=ct,y.textContent=ct<0?"":ct+" m");const Ct=G.label||"";Ct!==I.wpLabel&&(I.wpLabel=Ct,x.textContent=Ct,x.style.display=Ct?"":"none")}function Ut(G){const K=!!(G&&G.visible);if(K!==I.reticle&&(w.classList.toggle("is-on",K),I.reticle=K),!K)return;const H=G.kind||"dog";H!==I.reticleKind&&(I.reticleKind&&w.classList.remove("is-"+I.reticleKind),w.classList.add("is-"+H),I.reticleKind=H),w.style.transform="translate3d("+G.x.toFixed(1)+"px,"+G.y.toFixed(1)+"px,0)"}function Vt(G){G=Math.min(1,Math.max(0,G||0));const K=Math.round(G*20);if(K===I.alert)return;I.alert=K;const H=K===0?"":G<.6?"eye":"dog";H!==I.alertMode&&(m.className="sq-alert"+(H?" is-on is-"+H:""),I.alertMode=H),m.style.setProperty("--pulse",(1.3-G*.85).toFixed(2)+"s")}function pe(G){return new Promise(K=>{L.classList.add("is-on"),setTimeout(()=>{try{G&&G()}finally{K(),setTimeout(()=>L.classList.remove("is-on"),160)}},380)})}function Se(){try{return localStorage.getItem(hp)==="1"}catch{return I.tipShown&&!R.classList.contains("is-on")}}function re(){R.classList.remove("is-on"),I.tipTimer=0;try{localStorage.setItem(hp,"1")}catch{}}function Re(){const G=s.clientHeight>s.clientWidth*1.15,K=!!(t&&t.isTouch);if(R.classList.contains("is-on")){G||re();return}I.tipShown||!G||!K||Se()||(I.tipShown=!0,R.classList.add("is-on"),I.tipTimer=12)}R.querySelector("button").addEventListener("click",re);function we(G){G=!!G,G!==I.visible&&(I.visible=G,r.classList.toggle("is-hidden",!G))}function Je(G){I.time+=G,I.tipTimer>0&&!Pt&&(I.tipTimer-=G,I.tipTimer<=0&&re()),!I.tipShown&&t&&t.isTouch&&Re()}const J={el:s,settings:e,modalOpen:!1,showTitle:wt,hideTitle:$t,showHowTo:Ot,showSettings:V,showPause:ft,hidePause:Yt,showEnding:at,showRespawn:pe,setAcorns:At,setGolden:z,setHealth:D,flashDamage:Q,setBurst:dt,setCombo:_t,setQuest:xt,questComplete:Bt,toast:oe,setWaypoint:De,setTargetReticle:Ut,setDogAlert:Vt,setVisible:we,update:Je,onSettingsChange(G){return n.push(G),()=>{const K=n.indexOf(G);K>=0&&n.splice(K,1)}},onPause(G){st=G}};return D(3,3),z(0,null),dt(0),bt(),J}const _n=(i,t,e)=>i<t?t:i>e?e:i,Zi=(i,t,e)=>i+(t-i)*e,Hn=i=>440*Math.pow(2,(i-69)/12);function l3(i){return function(){i|=0,i=i+1831565813|0;let t=Math.imul(i^i>>>15,1|i);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}const c3=["jump","land","step","pickup","golden","burst","charge","throw","nutHit","scratch","pounce","hurt","chatter","bark","growl","notice","lunge","yelp","questDone","questNew","uiTap","respawn","leaves","wire"],h3={jump:{dur:.4,send:.05},land:{dur:.45,send:.06},step:{dur:.15,send:0},pickup:{dur:1,send:.3,prio:!0},golden:{dur:3,send:.4,prio:!0},burst:{dur:.8,send:.1},charge:{dur:.25,send:.15},throw:{dur:.3,send:.05},nutHit:{dur:.35,send:.12},scratch:{dur:.35,send:.05},pounce:{dur:.7,send:.1,prio:!0},hurt:{dur:.5,send:.1,prio:!0},chatter:{dur:1.3,send:.12},bark:{dur:.9,send:.22},growl:{dur:1.6,send:.12},notice:{dur:.8,send:.25,prio:!0},lunge:{dur:.35,send:.1},yelp:{dur:1.5,send:.25},questDone:{dur:2.2,send:.35,prio:!0},questNew:{dur:1.2,send:.3,prio:!0},uiTap:{dur:.15,send:0,prio:!0},respawn:{dur:1.8,send:.35,prio:!0},leaves:{dur:.7,send:.08},wire:{dur:1.2,send:.15}},dp=26,vh=Object.freeze({});function u3(i,t={}){const e=!!t.offline,n=Object.assign({steps:!0,wind:!0,ambience:!0,music:!0},t.layers),s=l3(t.seed!=null?t.seed:Date.now()^24301|0),o=(F,N)=>F+(N-F)*s(),r=i.sampleRate;let a=0;const l=()=>e?a:i.currentTime;function h(F,N){const tt=Math.floor(r*F),W=Math.floor(r*.05),nt=new Float32Array(tt+W);let ot=0,ut=0,P=0,O=0,q=0;for(let pt=0;pt<nt.length;pt++){const gt=s()*2-1;let zt=gt;N==="pink"?(ot=.99765*ot+gt*.099046,ut=.963*ut+gt*.2965164,P=.57*P+gt*1.0526913,zt=ot+ut+P+gt*.1848):N==="brown"&&(O=(O+.02*gt)/1.02,zt=O),nt[pt]=zt;const Qt=Math.abs(zt);Qt>q&&(q=Qt)}const j=i.createBuffer(1,tt,r),$=j.getChannelData(0),Mt=.95/q;for(let pt=0;pt<tt;pt++)$[pt]=nt[pt]*Mt;for(let pt=0;pt<W;pt++){const gt=pt/W;$[pt]=(nt[pt]*gt+nt[tt+pt]*(1-gt))*Mt}return j}const c=h(2,"white"),f=h(2.5,"pink"),d=h(3,"brown");function u(F){const N=Math.floor(r*F),tt=i.createBuffer(2,N,r),W=Math.floor(r*.012);for(let nt=0;nt<2;nt++){const ot=tt.getChannelData(nt);let ut=0;for(let P=W;P<N;P++){const O=(P-W)/r,q=.12+.75*Math.exp(-O*3.2);ut+=q*(s()*2-1-ut),ot[P]=ut*Math.exp(-O*4.4)*(O<.004?O/.004:1)}for(let P=0;P<5;P++){const O=W+Math.floor(r*o(.004,.06));ot[O]+=o(-.5,.5)}}return tt}const p=(F=1)=>{const N=i.createGain();return N.gain.value=F,N},v=(F,N,tt=.7)=>{const W=i.createBiquadFilter();return W.type=F,W.frequency.value=Math.min(N,r*.45),W.Q.value=tt,W},m=(...F)=>{for(let N=0;N<F.length-1;N++)F[N].connect(F[N+1]);return F[F.length-1]},g=p(.56),M=i.createDynamicsCompressor();M.threshold.value=-12,M.knee.value=9,M.ratio.value=4,M.attack.value=.004,M.release.value=.18;const T=i.createWaveShaper();{const N=new Float32Array(2049);for(let tt=0;tt<2049;tt++){const W=tt/2048*2-1,nt=Math.abs(W);N[tt]=Math.sign(W)*(nt<.6?nt:.6+.3*Math.tanh((nt-.6)/.3))}T.curve=N}const E=p(1);m(g,M,T,E,i.destination);const A=p(1),w=p(.8),_=p(.7),S=p(.5),x=p(0),y=p(1),b=v("lowpass",5500,.5);A.connect(g),w.connect(g),_.connect(g),x.connect(g),m(y,b,S,g);const C=p(1),L=i.createConvolver(),R=p(.9);L.buffer=u(1.5),m(C,L,R,g);const U=p(.28),I=p(.35);x.connect(U),U.connect(C),b.connect(I),I.connect(C);const X=p(1),Y=p(0),st=v("lowpass",1500,.4);X.connect(st),Y.connect(st),st.connect(x);let bt=1,St=!1,Ft=!0;const ye=.46;function lt(){const F=St?0:bt;E.gain.setTargetAtTime(F,l(),.03)}function vt(F,N,tt,W,nt){W=Math.max(W,1e-4),F.setValueAtTime(0,N),F.linearRampToValueAtTime(W,N+tt),F.exponentialRampToValueAtTime(W*.002,N+tt+nt),F.linearRampToValueAtTime(0,N+tt+nt+.012)}function Pt(F,N,tt,W,nt,ot){F.setValueAtTime(0,N),F.linearRampToValueAtTime(W,N+tt),F.setValueAtTime(W,N+tt+nt),F.linearRampToValueAtTime(0,N+tt+nt+ot)}function wt(F,N,tt,...W){F.setValueAtTime(Math.max(tt,1),N);for(const[nt,ot]of W)F.exponentialRampToValueAtTime(Math.max(ot,1),N+nt)}const $t=[],xe=typeof i.createStereoPanner=="function";function Xt(F,N,tt,W){const nt=l();let ot=0;for(let gt=0;gt<$t.length;gt++)$t[gt]>nt&&($t[ot++]=$t[gt]);if($t.length=ot,ot>=dp&&!tt.prio||ot>=dp+8)return null;$t.push(F+tt.dur);const ut=Math.max(0,+N.distance||0),P=_n(N.volume==null?1:+N.volume,0,2)/(1+Math.pow(ut/10,1.3)),O=p(P),q=[O];let j=O;if(ut>.5){const gt=v("lowpass",16e3/(1+ut/15),.5);j.connect(gt),j=gt,q.push(gt)}const $=_n(+N.pan||0,-1,1);if($!==0&&xe){const gt=i.createStereoPanner();gt.pan.value=$,j.connect(gt),j=gt,q.push(gt)}j.connect(W||A);const Mt=(N.send!=null?N.send:tt.send)*(1+Math.min(ut,60)*.04);if(Mt>0){const gt=p(Math.min(Mt,1.2));j.connect(gt),gt.connect(C),q.push(gt)}const pt={in:O,pitch:_n(N.pitch==null?1:+N.pitch||1,.25,4),pending:0,nodes:q};return pt.done=()=>{if(--pt.pending<=0)for(const gt of pt.nodes)try{gt.disconnect()}catch{}},pt}function Ot(F,N,tt,W,nt){const ot=i.createOscillator();return ot.type=N,ot.frequency.value=tt,ot.start(W),ot.stop(nt),F.pending++,ot.onended=F.done,ot}function yt(F,N,tt,W,nt=1){const ot=i.createBufferSource();return ot.buffer=N,ot.loop=!0,ot.playbackRate.value=nt,ot.start(tt,s()*(N.duration-.1)),ot.stop(tt+W),F.pending++,ot.onended=F.done,ot}function Lt(F,N,tt){return tt.map(([W,nt,ot])=>{const ut=v("bandpass",W,nt);return m(F,ut,p(ot),N),ut})}function V(F,N,tt,W,nt,ot=1,ut=3.5){tt=Math.min(tt,9e3);const P=Ot(F,"sine",tt,N,N+nt+.03),O=Ot(F,"sine",tt*ut,N,N+nt+.03),q=p(0),j=p(0);q.gain.setValueAtTime(tt*1.6*ot,N),q.gain.exponentialRampToValueAtTime(Math.max(tt*.02,1),N+Math.min(.14,nt)),O.connect(q),q.connect(P.frequency),vt(j.gain,N,.003,W,nt),m(P,j,F.in)}function Nt(F,N,tt,W,nt,ot){const ut=Ot(F,"sine",tt,N,N+ot+.04),P=p(0);wt(ut.frequency,N,tt,[ot,W]),vt(P.gain,N,.004,nt,ot),m(ut,P,F.in)}function ft(F,N,tt,W,nt,ot,ut,P,O,q){const j=yt(F,tt,N,O+q+.03),$=v(W,nt,ut),Mt=p(0);return ot!==nt&&wt($.frequency,N,nt,[O+q,ot]),vt(Mt.gain,N,O,P,q),m(j,$,Mt,F.in),$}function Yt(F,N,tt,W,nt=1){const ot=o(.9,1.12)*nt*F.pitch;switch(tt){case"wood":ft(F,N,c,"bandpass",2700*ot,1700*ot,2.2,W*1.9,.001,.02),ft(F,N,c,"highpass",5e3,5e3,.7,W*.22,.001,.007),Nt(F,N,950*ot,620*ot,W*.2,.024);break;case"wire":{const ut=4100*ot,P=Ot(F,"sine",ut,N,N+.1),O=Ot(F,"sine",ut*2.76,N,N+.06),q=p(0),j=p(0);vt(q.gain,N,.001,W*.3,.07),vt(j.gain,N,.001,W*.14,.035),m(P,q,F.in),m(O,j,F.in),ft(F,N,c,"highpass",7e3,7e3,.7,W*.2,.001,.006);break}case"roof":Nt(F,N,330*ot,230*ot,W*.5,.05),ft(F,N,c,"bandpass",620*ot,520*ot,5,W*1.2,.001,.035),ft(F,N,c,"bandpass",3800,3800,1.5,W*.3,.001,.007);break;case"wall":ft(F,N,c,"bandpass",1900*ot,1300*ot,1.4,W*1.6,.002,.028),ft(F,N,f,"highpass",4500,4500,.7,W*.5,.001,.012);break;default:Nt(F,N,170*ot,85*ot,W*.55,.045),ft(F,N,f,"lowpass",1300*ot,600*ot,.6,W*.9,.002,.03),ft(F,N,c,"bandpass",4200,4200,1,W*.1,.001,.012)}}function Tt(F,N,tt,W=1,nt=1,ot=0){tt=_n(tt,0,1);const ut=520*Math.pow(95/520,tt)*o(.93,1.07)*F.pitch,P=Zi(.1,.24,tt)*o(.88,1.14)*nt,O=N+P+.05,q=Ot(F,"sawtooth",ut,N,O),j=Ot(F,"square",ut,N,O),$=Ot(F,"sawtooth",ut*.5,N,O),Mt=1.35+.25*ot+o(-.06,.06);for(const[Pn,en]of[[q,1],[j,1.004],[$,.5]])Pn.frequency.setValueAtTime(ut*1.1*en,N),Pn.frequency.linearRampToValueAtTime(ut*Mt*en,N+P*.16),Pn.frequency.exponentialRampToValueAtTime(ut*o(.58,.68)*en,N+P);const pt=p(0);m(q,p(.6),pt),m(j,p(.3),pt),m($,p(.2+.5*tt),pt),pt.gain.setValueAtTime(0,N),pt.gain.linearRampToValueAtTime(1,N+.008),pt.gain.setValueAtTime(.85,N+P*.45),pt.gain.linearRampToValueAtTime(0,N+P+.03);const gt=p(W*Zi(2.1,1.8,tt));gt.connect(F.in);const zt=Zi(1050,470,tt)*o(.94,1.06),Qt=Zi(2400,1150,tt)*o(.94,1.06),ie=Zi(3900,2500,tt),Zt=Lt(pt,gt,[[zt,5,1],[Qt,6,.7],[ie,7,.32]]);wt(Zt[0].frequency,N,zt*.8,[P*.2,zt*1.12],[P,zt*.78]),wt(Zt[1].frequency,N,Qt*.92,[P*.2,Qt*1.05],[P,Qt*.88]),m(pt,v("lowpass",ut*2.6,.7),p(.25+.5*tt),gt);const Oe=yt(F,c,N,P+.05),tn=v("bandpass",Qt*.9,1.1),ln=p(0);return vt(ln.gain,N,.004,.55,P*.7),m(Oe,tn,ln,gt),P}const at={jump(F,N,tt){const W=_n(tt.power==null?.6:tt.power,0,1),nt=F.pitch;ft(F,N,f,"bandpass",500*nt,(1800+1400*W)*nt,1.1,.8+.7*W,.035,.16+.06*W),Yt(F,N,tt.surface||"wood",.5+.3*W,1.1),Yt(F,N+.014,tt.surface||"wood",.4+.3*W,1.25),Nt(F,N,190*nt,80*nt,.2+.3*W,.06)},land(F,N,tt){const W=_n(tt.impact==null?.5:tt.impact,0,1),nt=tt.surface||"ground",ot=F.pitch,ut=nt==="wire"?.35:nt==="ground"?1:.7;Nt(F,N,(150-40*W)*ot,(62-14*W)*ot,(.3+.6*W)*ut,.08+.1*W),ft(F,N,f,"lowpass",900+900*W,300,.6,(.25+.55*W)*ut,.003,.05+.05*W),Yt(F,N,nt,.7+.7*W,.92),Yt(F,N+.022+.01*W,nt,.55+.6*W,.82)},step(F,N,tt){Yt(F,N,tt.surface||"ground",1)},pickup(F,N,tt){const W=_n(Math.round(tt.streak||0),0,12),nt=[0,2,4,7,9],ot=659.26*Math.pow(2,(12*Math.floor(W/5)+nt[W%5])/12)*F.pitch;V(F,N,ot,.5,.3,1.1),V(F,N+.07,ot*1.5,.42,.5,.9);const ut=Ot(F,"sine",Math.min(ot*4,11e3),N+.07,N+.5),P=p(0),O=Ot(F,"sine",23,N+.07,N+.5),q=p(.03);vt(P.gain,N+.07,.004,.06,.35),m(O,q),q.connect(P.gain),m(ut,P,F.in),ft(F,N,c,"highpass",7500,7500,.7,.12,.001,.03)},golden(F,N,tt){const W=F.pitch;for(const j of[60,64,67,74]){const $=Ot(F,"triangle",Hn(j)*W,N,N+2.3),Mt=Ot(F,"sine",Hn(j)*W*1.004,N,N+2.3),pt=p(0);pt.gain.setValueAtTime(0,N),pt.gain.linearRampToValueAtTime(.09,N+.08),pt.gain.exponentialRampToValueAtTime(.02,N+1.6),pt.gain.linearRampToValueAtTime(0,N+2.25),m($,pt),m(Mt,pt),m(pt,v("lowpass",2200,.5),F.in)}[72,76,79,84,86,88,91,96].forEach((j,$)=>V(F,N+.04+$*.07,Hn(j)*W,.3-$*.012,.6+$*.06,1.2)),V(F,N+.04+8*.07+.05,Hn(96)*W,.26,1.2,.8);const ot=yt(F,c,N,1.7),ut=v("bandpass",8e3,3),P=p(0),O=Ot(F,"sine",17,N,N+1.7),q=p(.035);Pt(P.gain,N,.25,.07,.3,1.1),m(O,q),q.connect(P.gain),m(ot,ut,P,F.in)},burst(F,N,tt){const W=F.pitch,nt=yt(F,f,N,.62),ot=v("bandpass",280,1.4),ut=p(0);wt(ot.frequency,N,280*W,[.42,3400*W],[.6,2200*W]),ut.gain.setValueAtTime(0,N),ut.gain.linearRampToValueAtTime(.25,N+.08),ut.gain.exponentialRampToValueAtTime(1.3,N+.4),ut.gain.linearRampToValueAtTime(0,N+.6),m(nt,ot,ut,F.in);const P=Ot(F,"triangle",160,N,N+.5),O=p(0);wt(P.frequency,N,160*W,[.42,760*W]),Pt(O.gain,N,.05,.16,.3,.12),m(P,O,F.in),ft(F,N+.4,c,"highpass",5e3,5e3,.7,.2,.01,.12)},charge(F,N,tt){const W=F.pitch;V(F,N,1760*W,.22,.09,.6,2),V(F,N+.045,2637*W,.2,.12,.6,2),ft(F,N,c,"highpass",6e3,6e3,.7,.12,.001,.01)},throw(F,N,tt){const W=F.pitch,nt=yt(F,c,N,.2),ot=v("bandpass",1200,1.6),ut=p(0);wt(ot.frequency,N,1200*W,[.06,4500*W],[.17,1500*W]),vt(ut.gain,N,.03,.8,.13),m(nt,ot,ut,F.in),Nt(F,N,260*W,120*W,.2,.05)},nutHit(F,N,tt){const W=F.pitch*o(.95,1.06);Nt(F,N,620*W,470*W,.6,.07),Nt(F,N,1480*W,1250*W,.22,.035),ft(F,N,c,"bandpass",900*W,800*W,8,1.6,.001,.05),ft(F,N,c,"bandpass",2600*W,2600*W,4,.5,.001,.015),Nt(F,N,180*W,90*W,.25,.05)},scratch(F,N,tt){const W=F.pitch;for(let nt=0;nt<3;nt++){const ot=N+nt*o(.05,.062),ut=o(4200,5600)*W;ft(F,ot,c,"bandpass",ut,ut*.55,1.3,.75-nt*.12,.004,.04),ft(F,ot,c,"highpass",7e3,7e3,.7,.2,.002,.02)}},pounce(F,N,tt){const W=F.pitch;Nt(F,N,170*W,42*W,1,.24),ft(F,N,f,"lowpass",1800,250,.7,.9,.003,.11),ft(F,N,c,"bandpass",2500,1500,1,.3,.001,.03);const nt=N+.05,ot=Ot(F,"triangle",300,nt,nt+.42),ut=p(0),P=Ot(F,"sine",19,nt,nt+.42),O=p(0);ot.frequency.setValueAtTime(330*W,nt),ot.frequency.exponentialRampToValueAtTime(560*W,nt+.05),ot.frequency.exponentialRampToValueAtTime(290*W,nt+.36),O.gain.setValueAtTime(70,nt),O.gain.exponentialRampToValueAtTime(4,nt+.36),m(P,O),O.connect(ot.frequency),vt(ut.gain,nt,.004,.42,.34),m(ot,ut,F.in),V(F,nt,660*W,.2,.12,1.4,1.41)},hurt(F,N,tt){const W=F.pitch,nt=Ot(F,"triangle",2300,N,N+.24),ot=Ot(F,"sawtooth",2300,N,N+.24),ut=p(0),P=p(1);for(const j of[nt,ot])j.frequency.setValueAtTime(2300*W,N),j.frequency.exponentialRampToValueAtTime(3700*W,N+.035),j.frequency.exponentialRampToValueAtTime(1700*W,N+.2);const O=Ot(F,"sine",38,N,N+.24),q=p(140);m(O,q),q.connect(nt.frequency),q.connect(ot.frequency),m(nt,p(.7),P),m(ot,p(.18),P),vt(ut.gain,N,.006,.4,.19),m(P,v("bandpass",3e3*W,1.2),ut,F.in),Nt(F,N+.01,140*W,52*W,.75,.14),ft(F,N+.01,f,"lowpass",1200,300,.7,.5,.003,.07)},chatter(F,N,tt){const W=F.pitch*o(.95,1.06),nt=tt.count||3+Math.floor(s()*3);let ot=N;const ut=(P,O,q,j,$,Mt,pt,gt)=>{const zt=Ot(F,"sawtooth",q,P,P+O+.04),Qt=yt(F,c,P,O+.04),ie=p(0),Zt=p(1),Oe=p(pt);if(wt(zt.frequency,P,q,[O,j]),m(zt,p(.55),ie),m(Qt,p(.5),ie),gt){const ln=Ot(F,"sawtooth",gt,P,P+O+.04),Pn=p(.45);wt(ln.frequency,P,gt,[O,gt*.7]),Zt.gain.value=.55,m(ln,Pn),Pn.connect(Zt.gain),Pt(ie.gain,P,.02,1,O*.45,O*.55)}else vt(ie.gain,P,.004,1,O);ie.connect(Zt),Oe.connect(F.in);const tn=Lt(Zt,Oe,[[$,4,1],[$*2.05,5,.6],[5400*W,4,.22]]);wt(tn[0].frequency,P,$,[O,Mt]),wt(tn[1].frequency,P,$*2.05,[O,Mt*1.9])};for(let P=0;P<nt;P++)ut(ot,.05,820*W*o(.95,1.05),520*W,1750*W,1450*W,2.3*(.8+.2*s()),0),ot+=o(.095,.125);ut(ot+.03,o(.32,.42),930*W,610*W,1350*W,2e3*W,2,64)},bark(F,N,tt){const W=tt.size==null?.5:tt.size,nt=Math.max(1,Math.round(tt.count||1));let ot=N;for(let ut=0;ut<nt;ut++)ot+=Tt(F,ot,W,ut?.85:1)+o(.09,.16)},growl(F,N,tt){const W=_n(tt.size==null?.6:tt.size,0,1),nt=_n(tt.duration||1,.3,1.5),ot=F.pitch,ut=Zi(150,68,W)*o(.94,1.06)*ot,P=N+nt+.05,O=Ot(F,"sawtooth",ut,N,P),q=Ot(F,"sawtooth",ut*1.013,N,P),j=p(0),$=p(.55);for(const Zt of[O,q])Zt.frequency.setValueAtTime(ut*.9,N),Zt.frequency.linearRampToValueAtTime(ut*1.12,N+nt*.6),Zt.frequency.linearRampToValueAtTime(ut*.85,N+nt);const Mt=Ot(F,"sawtooth",o(24,32),N,P),pt=p(.45);m(Mt,pt),pt.connect($.gain);const gt=yt(F,f,N,nt+.05);m(O,p(.5),j),m(q,p(.5),j),m(gt,p(.35),j),j.gain.setValueAtTime(0,N),j.gain.linearRampToValueAtTime(.6,N+.12),j.gain.linearRampToValueAtTime(1,N+nt*.65),j.gain.linearRampToValueAtTime(0,N+nt),j.connect($);const zt=p(1.6);zt.connect(F.in);const Qt=Zi(620,380,W),ie=Lt($,zt,[[Qt,3,1],[Qt*2.7,4,.5],[Qt*5.5,5,.18]]);ie[0].frequency.setValueAtTime(Qt*.85,N),ie[0].frequency.linearRampToValueAtTime(Qt*1.2,N+nt*.7),m($,v("lowpass",ut*3,.7),p(.5),zt)},notice(F,N,tt){const W=F.pitch;Tt(F,N,tt.size==null?.5:tt.size,1.15,.8,1);const nt=N+.05,ot=Ot(F,"triangle",700,nt,nt+.3),ut=p(0);wt(ot.frequency,nt,660*W,[.11,1320*W]),vt(ut.gain,nt,.01,.16,.2),m(ot,ut,F.in),V(F,nt+.1,1568*W,.2,.3,1.3,2.4),V(F,nt+.1,1568*1.06*W,.07,.25,1,2.4)},lunge(F,N,tt){const W=F.pitch;ft(F,N,f,"bandpass",420*W,1700*W,1.5,.9,.06,.04);const nt=N+.085;ft(F,nt,c,"bandpass",1700*W,1300*W,3.5,1.7,.001,.028),ft(F,nt,c,"highpass",4500,4500,.7,.5,8e-4,.008),Nt(F,nt,900*W,500*W,.3,.02),Nt(F,nt,210*W,85*W,.5,.06)},yelp(F,N,tt){const W=_n(tt.size==null?.4:tt.size,0,1),nt=F.pitch,ot=tt.count||3+Math.floor(s()*2),ut=Zi(1900,900,W)*nt;let P=N,O=1;for(let q=0;q<ot;q++){const j=o(.12,.17)+q*.015,$=ut*o(.94,1.06)*(1-q*.05),Mt=P+j+.04,pt=Ot(F,"sawtooth",$,P,Mt),gt=Ot(F,"triangle",$,P,Mt),zt=p(0),Qt=p(1.2*O);for(const ie of[pt,gt])ie.frequency.setValueAtTime($*.85,P),ie.frequency.exponentialRampToValueAtTime($*1.12,P+j*.15),ie.frequency.exponentialRampToValueAtTime($*.55,P+j);m(pt,p(.4),zt),m(gt,p(.7),zt),Pt(zt.gain,P,.008,1,j*.4,j*.6),Qt.connect(F.in),Lt(zt,Qt,[[Zi(1500,1e3,W)*nt,3,1],[Zi(3200,2300,W)*nt,4,.6]]),P+=j+o(.07,.11)+q*.03,O*=.62}},questDone(F,N,tt){const W=F.pitch,nt=[[72,0],[76,.11],[79,.22],[84,.36]],ot=(P,O,q,j)=>{const $=Hn(O)*W,Mt=Ot(F,"triangle",$,P,P+j+.05),pt=Ot(F,"square",$,P,P+j+.05),gt=v("lowpass",800,.7),zt=p(0);wt(gt.frequency,P,900,[.04,3800],[j,1300]),Pt(zt.gain,P,.012,q,j*.5,j*.5),m(Mt,p(.8),gt),m(pt,p(.16),gt),m(gt,zt,F.in)};for(const[P,O]of nt)ot(N+O,P,.2,P===84?.2:.1),V(F,N+O,Hn(P+12)*W,.12,.3,1);const ut=N+.56;for(const P of[67,72,76,79,84])ot(ut,P,.12,.85);V(F,ut,Hn(96)*W,.16,.9,1),V(F,ut+.09,Hn(103)*W,.1,.8,.8)},questNew(F,N,tt){const W=F.pitch;V(F,N,Hn(79)*W,.26,.5,.7,2),V(F,N+.17,Hn(84)*W,.24,.8,.7,2),V(F,N+.17,Hn(72)*W,.1,.7,.4,1)},uiTap(F,N,tt){const W=F.pitch;Nt(F,N,980*W,700*W,.3,.035),ft(F,N,c,"bandpass",3200,3200,2,.25,.001,.012)},respawn(F,N,tt){const W=F.pitch,nt=yt(F,f,N,.55),ot=v("bandpass",400,1.2),ut=p(0);wt(ot.frequency,N,350,[.45,2600]),Pt(ut.gain,N,.38,.4,.02,.12),m(nt,ot,ut,F.in),[[67,.4],[72,.52],[76,.64],[79,.76]].forEach(([P,O],q)=>V(F,N+O,Hn(P)*W,.26,.6+q*.12,.8,3));for(const P of[60,67]){const O=Ot(F,"triangle",Hn(P)*W,N+.4,N+1.7),q=p(0);Pt(q.gain,N+.4,.15,.07,.4,.7),m(O,q,F.in)}},leaves(F,N,tt){const W=_n(tt.amount==null?.6:tt.amount,0,1),nt=F.pitch,ot=5+Math.floor(W*6),ut=.2+.25*W;for(let P=0;P<ot;P++){const O=N+Math.pow(s(),1.4)*ut,q=o(2400,6800)*nt;ft(F,O,s()<.5?c:f,"bandpass",q,q*o(.6,1.3),.9,(.35+.5*W)*o(.5,1),o(.008,.03),o(.03,.09))}ft(F,N,f,"bandpass",1500*nt,900*nt,.7,.3*W,.02,.2)},wire(F,N,tt){const W=_n(tt.impact==null?.6:tt.impact,0,1),nt=F.pitch*o(.96,1.05),ot=196*nt,ut=.6+.4*W,P=Ot(F,"sine",o(8,10),N,N+ut+.05),O=[[1,.5,1],[2.01,.34,.8],[3.04,.22,.6],[4.12,.16,.45],[5.4,.1,.3],[8.3,.07,.2]];for(const[q,j,$]of O){const Mt=Ot(F,q<3?"triangle":"sine",ot*q,N,N+ut*$+.05),pt=p(0),gt=p(0);Mt.frequency.setValueAtTime(ot*q*(1+.06*W),N),Mt.frequency.exponentialRampToValueAtTime(ot*q,N+.09),gt.gain.setValueAtTime(ot*q*.035*(.4+W),N),gt.gain.exponentialRampToValueAtTime(.5,N+ut*$),m(P,gt),gt.connect(Mt.frequency),vt(pt.gain,N,.002,j*(.5+.6*W),ut*$),m(Mt,pt,F.in)}V(F,N,2480*nt,.12+.1*W,.2,1.5,2.76),ft(F,N,c,"highpass",5e3,5e3,.7,.2*W,.001,.012)}};function At(F,N,tt){const W=at[F];if(!W)return!1;const nt=N||vh,ot=(tt??l())+.006,ut=Xt(ot,nt,h3[F]);return ut?(W(ut,ot,nt),!0):!1}const z={speed:0,surface:"ground",airborne:!1,height:0,alert:0,danger:0,inTree:0,flow:0,paused:!1},D={air:0,move:0,flow:0,danger:0,alert:0,speed:0,height:0,inTree:0};let Q=null,dt=-1,_t=0,xt=0;const jt=[s()*6,s()*6,s()*6,s()*6],Bt=(F,N=1)=>_n(.5+.3*Math.sin(F*.37*N+jt[0])+.22*Math.sin(F*.83*N+jt[1])+.14*Math.sin(F*1.93*N+jt[2])+.08*Math.sin(F*4.1*N+jt[3]),0,1),oe={dur:.12,send:0};function De(F,N){const tt=i.createBufferSource();return tt.buffer=F,tt.loop=!0,tt.playbackRate.value=N,tt.start(0,s()*(F.duration-.1)),tt}function Ut(){const F={};return n.wind&&(F.windLP=v("lowpass",400,.6),F.windG=p(0),m(De(f,.9),F.windLP,F.windG,_),F.rushBP=v("bandpass",1500,.6),F.rushG=p(0),m(De(c,1),F.rushBP,F.rushG,_)),n.ambience&&(F.leafBP=v("bandpass",4200,.5),F.leafG=p(0),m(De(c,.83),F.leafBP,v("highpass",1600,.5),F.leafG,y),F.detailG=p(0),m(De(f,1.31),v("bandpass",7200,1.2),F.detailG,y),F.humG=p(0),m(De(d,1),v("lowpass",210,.5),F.humG,y),F.hum2G=p(0),m(De(f,.6),v("bandpass",420,.5),F.hum2G,y)),F}const Vt=(F,N,tt=.12)=>F.setTargetAtTime(N,l(),tt);function pe(F){const N=_n(D.speed/12,0,1),tt=_n(D.height/15,0,1),W=D.air,nt=D.alert,ot=Bt(F),ut=Bt(F+40,2.3),P=z.paused?0:1;if(n.wind&&(Vt(Q.windG.gain,P*(.035+.4*N*N+.22*tt*(.45+.55*ot)+.05*ot+.12*W)*(1-.3*nt)),Vt(Q.windLP.frequency,320+1500*N+700*tt+600*W+200*ot),Vt(Q.rushG.gain,P*W*(.07+.13*N),.07),Vt(Q.rushBP.frequency,1300+2e3*N)),n.ambience){const O=D.inTree;Vt(Q.leafG.gain,(.035+.11*O)*(.25+.75*ot)*(1+.5*nt),.25),Vt(Q.leafBP.frequency,3400+1800*ot+800*O,.3),Vt(Q.detailG.gain,(.012+.05*O+.05*nt)*(.2+.8*ut),.2),Vt(Q.humG.gain,.14*(1+.25*nt),.4),Vt(Q.hum2G.gain,.03*(1+.5*nt)*(.7+.3*ut),.4),Vt(S.gain,.5*(z.paused?.4:1)*(1+.7*nt)*(1-.3*D.danger),.2),Vt(b.frequency,5200+9e3*nt,.25)}n.music&&(Vt(x.gain,Ft?ye*(1-.62*nt)*(z.paused?.5:1):0,.25),Vt(X.gain,1-D.danger,.3),Vt(Y.gain,D.danger,.3),Vt(st.frequency,1500-500*D.danger-500*nt,.3))}function Se(F,N){const tt=z.speed;if(z.paused||z.airborne||tt<.35||!n.steps){_t=0,xt=0;return}const W=_n(2.2+tt*.55,2.5,8.5),nt=_t;let ot=nt+W*F,ut=0;for(;ut++<6;){const P=xt===0?0:xt===1?.36:1;if(ot<P)break;if(xt===2){ot-=1,xt=0,ot>.3&&(ot=.3);continue}const O=N+.02+_n((P-nt)/W,0,F),q=xt===1,j=Xt(O,vh,oe,w);if(j){const $=(.5+.5*Math.min(tt/8,1))*(q?1:.8)*o(.8,1.05),Mt=q?.9:1.08;Yt(j,O,z.surface,$,Mt),W<6.6&&Yt(j,O+o(.012,.02),z.surface,$*.7,Mt*o(1.02,1.1))}xt++}_t=ot}const re={dur:2.5,send:.7};let Re=-1,we=-1,Je=-1;function J(F,N,tt,W,nt,ot,ut="sine"){const P=Ot(F,ut,tt,N,N+nt+.03),O=p(0);wt(P.frequency,N,tt,[nt,W]),Pt(O.gain,N,Math.min(.012,nt*.3),ot,nt*.3,nt*.55),m(P,O,F.in)}function G(F,N,tt){const W=Xt(F,{pan:o(-.9,.9),distance:o(6,34)/(1+tt),volume:.5*(1+.5*tt)},re,y);if(!W)return;const nt=o(.88,1.14);let ot=F;if(N===0){const ut=2+Math.floor(s()*4);for(let P=0;P<ut;P++)J(W,ot,5300*nt,3500*nt,.055,.5),ot+=o(.1,.13)}else if(N===1){const ut=9+Math.floor(s()*9),P=o(3300,4300);for(let O=0;O<ut;O++)J(W,ot,P,P*1.22,.028,.45*Math.sin((O+1)/(ut+1)*Math.PI)),ot+=.046}else if(N===2){const ut=2+Math.floor(s()*3);for(let P=0;P<ut;P++)J(W,ot,4400*nt,4250*nt,.09,.45),J(W,ot+.12,3350*nt,3200*nt,.11,.4),ot+=o(.27,.3)}else if(N===3)for(const[ut,P]of[[.34,.12],[.16,.1],[.44,0]]){const O=470*nt;J(W,ot,O*.94,O,ut*.5,.7,"triangle"),J(W,ot+ut*.45,O,O*.9,ut*.55,.7,"triangle"),ot+=ut+P}else{const ut=4+Math.floor(s()*5);for(let P=0;P<ut;P++){const O=o(.05,.14),q=o(2500,5600);J(W,ot,q,q*o(.72,1.35),O,o(.25,.5)),ot+=O+o(.02,.08)}}}function K(F){const N=Xt(F,{pan:o(-.7,.7),distance:o(45,70),volume:1.6,send:.5},re,y);if(!N)return;const tt=o(.45,.9),W=2+Math.floor(s()*3);let nt=F;for(let ot=0;ot<W;ot++)nt+=Tt(N,nt,tt,1)+o(.16,.4)}function H(F){const N=Xt(F,{pan:o(-.5,.5),distance:55,volume:2.2,send:.6},{dur:6,send:.6},y);if(!N)return;const tt=311,W=1+Math.floor(s()*3);for(let nt=0;nt<W;nt++){const ot=F+nt*1.5;for(const[ut,P,O]of[[.5,.5,3.2],[1,.6,2.6],[1.19,.4,2],[1.5,.25,1.5],[2,.3,1.2],[2.51,.14,.8],[3.01,.1,.6]]){const q=Ot(N,"sine",tt*ut,ot,ot+O+.03),j=p(0);vt(j.gain,ot,.004,P*.3,O),m(q,j,N.in)}}}function rt(F){if(!n.ambience||(Re<0&&(Re=F+o(.6,2),we=F+o(14,30),Je=F+o(30,60)),z.paused))return;const N=D.alert;F>=Re&&(G(F+.03,Math.floor(s()*5),N),Re=F+o(1.6,5.5)*Zi(1,.4,N)),F>=we&&(K(F+.05),we=F+o(25,60)),F>=Je&&(H(F+.05),Je=F+o(70,140))}const ct=100,Ct=60/ct/4,Wt=.3,de=[57,60,62,64,67,69,72,74,76,79,81,84],ve=[{pad:[60,64,67,74],root:48},{pad:[57,60,64,67],root:45},{pad:[57,60,65,72],root:53},{pad:[55,60,62,67],root:43}],ze=[{pad:[57,60,64],root:45},{pad:[57,60,64,65],root:45},{pad:[53,57,60],root:41},{pad:[52,55,59],root:40}],Kt={started:!1,next:0,step:0,mel:5,lastTense:-9};function sn(F){return()=>{try{F.disconnect()}catch{}}}function ue(F,N,tt,W,nt,ot,ut){if(W<.004)return;const P=i.createOscillator(),O=i.createOscillator(),q=p(0),j=p(0);P.frequency.value=tt,O.frequency.value=tt*ot,q.gain.setValueAtTime(tt*ut,N),q.gain.exponentialRampToValueAtTime(Math.max(tt*.01,.5),N+Math.min(.1,nt)),O.connect(q),q.connect(P.frequency),vt(j.gain,N,.004,W,nt),m(P,j,F),P.start(N),O.start(N),P.stop(N+nt+.04),O.stop(N+nt+.04),P.onended=sn(j)}function He(F,N,tt,W,nt,ot){const ut=p(0);ut.gain.setValueAtTime(0,N),ut.gain.linearRampToValueAtTime(nt,N+Math.min(.9,W*.35)),ut.gain.setValueAtTime(nt,N+W-.2),ut.gain.linearRampToValueAtTime(0,N+W+1.3),ut.connect(F),tt.forEach((P,O)=>{const q=i.createOscillator();q.type=O%2?"sine":"triangle",q.frequency.value=Hn(P)*(1+(O%2?ot:-ot)),q.connect(ut),q.start(N),q.stop(N+W+1.35),O===0&&(q.onended=sn(ut))})}function Tn(F,N,tt,W,nt,ot,ut){if(ot<.004)return;const P=i.createBufferSource(),O=v(tt,W,nt),q=p(0);P.buffer=c,P.loop=!0,P.start(N,s()*1.8),P.stop(N+ut+.03),vt(q.gain,N,.002,ot,ut),m(P,O,q,F),P.onended=sn(q)}function Fn(F,N){const tt=F%16,W=Math.floor(F/16),nt=D.move,ot=D.flow,ut=D.danger,P=1-.85*D.alert,O=1-ut,q=ve[Math.floor(W/2)%4],j=ze[W%4];if(tt===0&&W%2===0&&ut<.97&&He(X,N,q.pad,Ct*32,.07,.003),tt%8===0&&ut>.04&&W*2+tt/8-Kt.lastTense>=2){const pt=(16-tt)*Ct;He(Y,N,j.pad,pt-.3,.12,.006),Kt.lastTense=W*2+tt/8+(tt?-1:0)}const $=tt%4===0;let Mt=(tt%2===0?Zi(.2,.4,nt):.05*nt)*P*(1-.45*ut);if(tt===0&&(Mt+=.25*P),s()<Mt){Kt.mel=_n(Kt.mel+[-2,-1,-1,1,1,2,0,-3,3][Math.floor(s()*9)],ut>.5?0:2,ut>.5?7:de.length-1);let pt=de[Kt.mel];if($){const zt=ut>.5?j.pad:q.pad;let Qt=pt,ie=99;for(const Zt of zt)for(const Oe of[0,12]){const tn=Math.abs(Zt+Oe-pt);tn<ie&&(ie=tn,Qt=Zt+Oe)}ie<=2&&(pt=Qt)}const gt=o(.55,1)*($?1:.75);ue(x,N,Hn(pt),.2*gt,.55,3,1.1),s()<.22*P&&ue(x,N+Ct*2,Hn(pt+(s()<.5?12:7)),.07*gt,.4,3,.8)}if(nt>.05&&(tt%4===0||tt===14)){const pt=q.root+(tt===8||tt===14?7:tt===4||tt===12?12:0);ue(x,N,Hn(pt),.46*nt*P*O*(tt===0?1:.75),.3,4,.5)}if(ot>.08){if(s()>.12){const pt=[0,1,2,3,2,1,2,3],gt=q.pad[pt[tt%8]]+12+(tt>=8&&tt%4===3?12:0);ue(x,N,Hn(gt),.085*ot*P*O*(tt%4===0?1.2:.85),.22,2,.9)}Tn(x,N,"highpass",6500,.7,.06*ot*P*(tt%4===2?1:tt%2?.4:.6),tt%4===2?.05:.025)}if(ut>.05){if(tt%2===0){const pt=Hn(j.root),gt=i.createOscillator(),zt=i.createOscillator(),Qt=v("lowpass",300,1.5),ie=p(0);gt.type="sawtooth",zt.type="square",gt.frequency.value=pt,zt.frequency.value=pt*2.005,wt(Qt.frequency,N,900,[.12,260]),vt(ie.gain,N,.005,.6*ut*(tt%4===0?1:.7),.2);const Zt=p(.35);gt.connect(Qt),zt.connect(Zt),Zt.connect(Qt),m(Qt,ie,x),gt.start(N),zt.start(N),gt.stop(N+.26),zt.stop(N+.26),gt.onended=sn(ie)}Tn(x,N,"bandpass",tt%4===0?2100:2900,9,1.5*ut*(tt%4===0?1:.5),.03),(tt===6||tt===14)&&ue(x,N,Hn(j.pad[0]+12+(tt===14?1:0)),.09*ut,.25,1.41,1.5)}}function vs(F){if(!n.music||!Ft){Kt.started=!1;return}for((!Kt.started||Kt.next<F-.4)&&(Kt.next=F+.08,Kt.started=!0,Kt.step=Math.ceil(Kt.step/16)*16,Kt.lastTense=-9);Kt.next<F+Wt;)Fn(Kt.step,Kt.next),Kt.step++,Kt.next+=Ct}function Di(F,N){const tt=N||vh,W=l();F=_n(+F||0,0,.1),z.speed=Math.max(0,+tt.speed||0),z.surface=tt.surface||"ground",z.airborne=!!tt.airborne,z.height=Math.max(0,+tt.height||0),z.alert=_n(+tt.alert||0,0,1),z.danger=_n(+tt.danger||0,0,1),z.inTree=_n(+tt.inTree||0,0,1),z.flow=_n(+tt.flow||0,0,1),z.paused=!!tt.paused;const nt=1-Math.exp(-F*5),ot=1-Math.exp(-F*14),ut=1-Math.exp(-F*2.2);D.air+=((z.airborne?1:0)-D.air)*ot,D.speed+=(z.speed-D.speed)*ot,D.height+=(z.height-D.height)*nt,D.inTree+=(z.inTree-D.inTree)*nt,D.alert+=(z.alert-D.alert)*nt,D.move+=((z.paused?0:_n((z.speed-.5)/5,0,1))-D.move)*ut,D.flow+=(z.flow-D.flow)*ut,D.danger+=(z.danger-D.danger)*ut,Q||(Q=Ut()),Se(F,W),(W-dt>=.05||W<dt)&&(pe(W),dt=W),rt(W),vs(W)}return{ctx:i,play:At,update:Di,now:l,setTime(F){a=F},setVolume(F){bt=_n(+F||0,0,1),lt()},setMuted(F){St=!!F,lt()},setMusicEnabled(F){Ft=!!F,Ft?Q&&x.gain.setTargetAtTime(ye,l(),.3):x.gain.setTargetAtTime(0,l(),.15)},pumpMusic(){Q&&vs(l())},activeVoices(){const F=l();let N=0;for(const tt of $t)tt>F&&N++;return N}}}function f3(){let i=null,t=null,e=1,n=!1,s=!0,o=!1,r=0,a=0;const l={},h=(g,M)=>{try{return M()}catch(T){l[g]||(l[g]=1,console.warn("[audio] "+g+": "+(T&&T.message)))}},c=()=>typeof document<"u"&&document.visibilityState==="hidden";function f(){if(!(!i||c())&&i.state!=="running"){const g=i.resume();g&&g.catch&&g.catch(()=>{})}}function d(){const g=i.createBuffer(1,1,22050),M=i.createBufferSource();M.buffer=g,M.connect(i.destination),M.start(0),M.onended=()=>{try{M.disconnect()}catch{}}}function u(){h("visibility",()=>{if(i)if(c()){const g=i.suspend();g&&g.catch&&g.catch(()=>{})}else f()})}function p(){h("gesture",()=>{i&&i.state!=="running"&&!c()&&(d(),f())})}function v(){if(!(o||typeof document>"u")){o=!0,document.addEventListener("visibilitychange",u),window.addEventListener("pageshow",u);for(const g of["touchend","pointerup","keydown","click"])window.addEventListener(g,p,{passive:!0,capture:!0});i.onstatechange=()=>{(i.state==="interrupted"||i.state==="suspended"&&!c())&&f()},a=setInterval(()=>h("timer",()=>{t&&i.state==="running"&&r&&performance.now()-r<2e3&&t.pumpMusic()}),120)}}return{get unlocked(){return!!i&&i.state==="running"},get context(){return i},unlock(){return!!h("unlock",()=>{if(!i){const g=typeof window<"u"&&(window.AudioContext||window.webkitAudioContext);if(!g)return!1;i=new g({latencyHint:"interactive"}),t=u3(i),t.setVolume(e),t.setMuted(n),t.setMusicEnabled(s),v()}return d(),f(),!0})},setVolume(g){e=_n(+g||0,0,1),t&&h("setVolume",()=>t.setVolume(e))},setMuted(g){n=!!g,t&&h("setMuted",()=>t.setMuted(n))},setMusicEnabled(g){s=!!g,t&&h("setMusicEnabled",()=>t.setMusicEnabled(s))},play(g,M){t&&i.state==="running"&&h("play "+g,()=>t.play(g,M))},update(g,M){!t||i.state!=="running"||(r=performance.now(),h("update",()=>t.update(g,M)))},names:c3,dispose(){h("dispose",()=>{if(clearInterval(a),o){document.removeEventListener("visibilitychange",u),window.removeEventListener("pageshow",u);for(const g of["touchend","pointerup","keydown","click"])window.removeEventListener(g,p,{capture:!0})}i&&i.close(),i=null,t=null,o=!1})}}}const d3=Object.assign({"./entities/dogs.js":()=>Om(()=>import("./dogs-CX83w_Vs.js"),[],import.meta.url)}),yh="squirrel.save.v2",na=(i,t,e)=>i<t?t:i>e?e:i,Ec=new URLSearchParams(location.search),pp={low:{q:.45,pr:1,shadow:1024,msaa:0,bloom:!1,range:34,leaves:2},medium:{q:.65,pr:1.5,shadow:1536,msaa:2,bloom:!0,range:38,leaves:4},high:{q:1,pr:2,shadow:2048,msaa:4,bloom:!0,range:44,leaves:6}};async function p3(){const i=document.getElementById("game"),t=document.getElementById("loading"),e=i3(i),n=a3(i,e),s=f3(),o=matchMedia("(pointer: coarse)").matches||/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);let r=Ec.get("q")||n.settings.quality||"auto";pp[r]||(r=o?"medium":"high");const a=pp[r],l=new Ry({antialias:!1,powerPreference:"high-performance",stencil:!1});let h=Math.min(window.devicePixelRatio||1,a.pr),c=h;l.setPixelRatio(c),l.setSize(i.clientWidth,i.clientHeight),l.domElement.className="game-canvas",i.prepend(l.domElement),l.info.autoReset=!1;const f=new Jp,d=new ts(60,i.clientWidth/i.clientHeight,.08,900),u=E_(f,l,{shadowSize:a.shadow,shadowRange:a.range});await new Promise(H=>setTimeout(H,30));const p=new w_,v=ub(p,{quality:a.q});f.add(v.group);const m=v.layout,g=m.trees||[],M=Yb(l,f,d,{msaa:a.msaa,bloom:a.bloom}),T=on(7),E=m.pickupSpots.map(H=>({pos:H.pos.clone(),kind:H.kind,name:H.name,where:H.where}));for(const H of g){const rt=H.perches||[];if(!rt.length)continue;const ct=Math.min(rt.length,H.crownRadius>5?5:3),Ct=Math.floor(T()*rt.length);for(let Wt=0;Wt<ct;Wt++){const de=rt[(Ct+Wt*2)%rt.length];E.push({pos:new k(de.x,de.y+.22,de.z),kind:"acorn",where:"tree"})}}const A=Ut(),w=Ub(f,E,A.taken),_=kb(f),S=Rb({shells:a.q<.6?10:16});f.add(S.group),S.group.scale.setScalar(1.3);const x=new Pb(p),y=new Db(d,p);{const H=new k,rt={dist:0,point:new k,normal:new k,prim:null,t:0};t:for(let ct=0;ct<=8;ct+=1.5)for(let Ct=0;Ct<6.28;Ct+=.7)if(H.set(m.spawn.x+Math.cos(Ct)*ct,0,m.spawn.z+Math.sin(Ct)*ct),H.y=p.groundHeight(H.x,H.z)+.6,!p.nearest(H,3.2,rt,null,!0)){m.spawn.set(H.x,H.y-.6,H.z);break t}}const b=new k().copy(m.home).sub(m.spawn).setY(0).normalize();x.teleport(new k(m.spawn.x,m.spawn.y+.3,m.spawn.z),b),y.snap(x);let C=null;try{const H=d3["./entities/dogs.js"];H&&Ec.get("dogs")!=="0"&&(C=(await H()).createDogs(f,p,m.dogZones||[],{quality:a.q}))}catch(H){console.error("dogs failed to load",H),C=null}const L={acorns:A.acorns||0,golden:A.golden||0,dogs:A.dogs||0,bursts:0,wireDist:0,onRoof:!1,bulldog:!!A.bulldog,bestComboNow:0,time:A.time||0};{const H=w.count();L.golden=H.golden}const U=jb({layout:m,player:x,pickups:w,stats:L,touch:o,hasDogs:()=>!!C&&C.list.length>0});U.setIndex(A.quest||0);let I="title",X=4;const Y=4;let st=99,bt=0,St=0,Ft=0,ye=0,lt=0,vt=0,Pt=0,wt=0,$t=0,xe=!!A.ended,Xt=0,Ot=0,yt=0,Lt=0,V=!1;const Nt={moveX:0,moveY:0,jumpPressed:!1,jumpHeld:!1,lookActive:!1},ft={mode:"surface",speed:0,steep:0,climb:0,thin:0,turn:0,airForward:0,airUp:0,airTime:0,alert:0,lookLocal:null,time:0},Yt=new k,Tt=new k,at=new k,At=new k,z={time:0,camera:d,player:{position:x.pos,velocity:x.vel,heightAboveGround:0,hidden:!1,invulnerable:!1},onEvent:Bt};x.extraTargets=H=>{if(C)for(const rt of C.list)rt.alive&&(x.pos.y-rt.position.y<1||(at.set(rt.position.x,rt.position.y+(rt.height||.6),rt.position.z),H(at,rt)))},n.setAcorns(L.acorns),n.setGolden(L.golden,w.goldenTotal),n.setHealth(X,Y),n.setVisible(!1),e.setEnabled(!1),D(),n.onSettingsChange((H,rt)=>{if(rt==="quality"){Vt(),location.reload();return}D()}),n.onPause(()=>dt());function D(){const H=n.settings;s.setVolume(H.volume),s.setMusicEnabled(!!H.music),y.sensitivity=H.sensitivity||1,y.invertY=!!H.invertY}function Q(){if(s.unlock(),s.play("uiTap"),n.hideTitle(),n.setVisible(!0),e.setEnabled(!0),I="play",y.snap(x),y.manualTime=.4,n.setQuest(U.view()),s.play("questNew"),o&&document.documentElement.requestFullscreen&&Ec.get("fs")!=="0")try{document.documentElement.requestFullscreen({navigationUI:"hide"}).catch(()=>{})}catch{}}function dt(){I==="play"?(I="paused",e.setEnabled(!1),n.showPause({onResume:()=>{n.hidePause(),I="play",e.setEnabled(!0)},onRestart:()=>{try{localStorage.removeItem(yh)}catch{}location.reload()}})):I==="paused"&&(n.hidePause(),I="play",e.setEnabled(!0))}n.showTitle({onStart:Q,hasSave:(A.acorns||0)>0}),Ec.get("autostart")==="1"&&Q();function _t(){const H=x.prim;return!H||H.type==="ground"?"ground":H.type==="capsule"?H.kind==="trunk"||H.kind==="branch"||H.kind==="pole"?"wood":"wire":x.normal.y>.6?"roof":"wall"}function xt(H,rt){x.invuln>0||V||(X-=H,st=0,St=0,n.setHealth(Math.max(0,X),Y),n.flashDamage(),e.vibrate(80),S.trigger("hurt"),s.play("hurt"),y.addShake(.7),Pt=.08,x.knock(rt||Tt.set(0,0,0),7.5),_.hit(x.pos),X<=0&&jt())}function jt(){V=!0,e.setEnabled(!1);const H=Math.min(L.acorns,5);n.showRespawn(()=>{x.teleport(new k(m.spawn.x,m.spawn.y+.3,m.spawn.z),b),y.snap(x),X=Y,n.setHealth(X,Y),L.acorns-=H,n.setAcorns(L.acorns),s.play("respawn")}).then(()=>{V=!1,I==="play"&&e.setEnabled(!0),H&&n.toast("Back at the home tree. Dropped "+H+" acorns")})}function Bt(H,rt,ct){const Ct=rt.position.distanceTo(x.pos),Wt=rt.kind==="terrier"?.1:rt.kind==="bulldog"?1:.6,de=na(Tt.copy(rt.position).sub(d.position).dot(at.set(1,0,0).applyQuaternion(d.quaternion))/12,-1,1);H==="bark"?(s.play("bark",{size:Wt,distance:Ct,pan:de}),wt=Math.max(wt,2.5)):H==="growl"?s.play("growl",{size:Wt,distance:Ct,pan:de}):H==="notice"?(s.play("notice",{size:Wt,distance:Ct,pan:de}),wt=4,n.toast("A dog has seen you. Climb!",1800)):H==="lunge"?(s.play("lunge",{distance:Ct,pan:de}),wt=Math.max(wt,3)):H==="bite"?xt(ct&&ct.damage||1,ct&&ct.dir):H==="yelp"?s.play("yelp",{size:Wt,distance:Ct,pan:de}):H==="flee"&&(L.dogs++,rt.kind==="bulldog"&&(L.bulldog=!0),L.acorns+=3,n.setAcorns(L.acorns),n.toast(rt.kind==="bulldog"?"The bulldog runs for it!":"Dog chased off! +3 acorns"),_.sparkle(Tt.copy(rt.position).setY(rt.position.y+.8),14,!0))}function oe(H){if(!C)return null;let rt=null,ct=H;for(const Ct of C.list){if(!Ct.alive)continue;const Wt=Ct.position.distanceTo(x.pos);Wt<ct&&(ct=Wt,rt=Ct)}return rt}function De(){vt=.42;const H=oe(12);if(!H){S.trigger("chatter"),s.play("chatter"),vt=.9;return}const rt=H.position.distanceTo(x.pos);Tt.copy(H.position).sub(x.pos);const ct=Tt.clone().setY(0).normalize();x.mode==="surface"&&x.normal.y>.7&&x.heading.copy(ct),rt<2.3?(S.trigger("attack"),s.play("scratch"),H.hit(1,ct,"scratch"),_.hit(Tt.copy(H.mouthPosition||H.position).setY((H.mouthPosition||H.position).y+(H.mouthPosition?0:.5))),Pt=.07,y.addShake(.35),e.vibrate(30),x.bounce(6.5,0),x.vel.x=-ct.x*6,x.vel.z=-ct.z*6,x.invuln=Math.max(x.invuln,.35)):(vt=.75,S.trigger("throw"),s.play("throw"),S.getHeadWorldPosition(At),_.throwNut(At,H,(Ct,Wt)=>{H.alive&&(H.hit(1,Wt,"nut"),s.play("nutHit",{distance:Ct.distanceTo(x.pos)}),_.hit(Ct))}))}function Ut(){try{return JSON.parse(localStorage.getItem(yh))||{}}catch{return{}}}function Vt(){try{localStorage.setItem(yh,JSON.stringify({taken:w.takenMap(),acorns:L.acorns,golden:L.golden,dogs:L.dogs,bulldog:L.bulldog,quest:U.index,time:L.time,ended:xe}))}catch{}}let pe=0;function Se(){pe++,pe===1?M.bloom&&(M.bloom.enabled=!1):pe===2?f.traverse(H=>{H.isMesh&&H.customDepthMaterial&&(H.castShadow=!1)}):pe===3&&(l.shadowMap.autoUpdate=!1,re=!0)}let re=!1,Re=0;r==="low"&&(pe=1,Se());function we(){const H=i.clientWidth,rt=i.clientHeight;l.setPixelRatio(c),l.setSize(H,rt),M.setSize(H,rt,c)}window.addEventListener("resize",we),window.addEventListener("orientationchange",()=>setTimeout(we,200)),we();let Je=performance.now(),J=16,G=0;function K(H){let rt=Math.min(.05,(H-Je)/1e3);Je=H,rt<=0&&(rt=.001),J+=(rt*1e3-J)*.05;let ct=rt;Pt>0&&(Pt-=rt,ct*=.05);const Ct=I==="play";if(e.pausePressed&&(I==="play"||I==="paused")&&!n.modalOpen&&dt(),I==="paused"){s.update(rt,{paused:!0,speed:0}),n.update(rt),e.endFrame(),M.render(rt);return}Xt+=ct,Ct&&(L.time+=ct),Nt.moveX=Ct?e.move.x:0,Nt.moveY=Ct?e.move.y:0,Nt.jumpPressed=Ct&&e.jumpPressed,Nt.jumpHeld=Ct&&e.jumpHeld,Nt.lookActive=y.lookActive;const Wt=window.__fake;Wt&&Ct&&(Nt.moveX=Wt.x||0,Nt.moveY=Wt.y||0,Nt.jumpHeld=!!Wt.hold,Nt.jumpPressed=!!Wt.jump,Wt.jump=!1),x.update(ct,Nt,y.yaw);for(const ue of x.events)if(ue.type==="jump")S.trigger("jump"),s.play("jump",{power:ue.power,surface:_t()});else if(ue.type==="land"){S.trigger("land",{impact:ue.impact});const He=_t();s.play("land",{impact:ue.impact,surface:He});const Tn=ue.prim.kind;Tn==="branch"?(_.leafPuff(x.pos,3+Math.round(ue.impact*8),.6+ue.impact),s.play("leaves",{amount:.3+ue.impact*.7})):Tn==="wire"?s.play("wire",{impact:.3+ue.impact*.7}):ue.prim.type==="ground"&&_.dust(x.pos,4+Math.round(ue.impact*6),.6+ue.impact),ue.impact>.5&&y.addShake(ue.impact*.35),ue.prim.type!=="ground"&&ue.from&&ue.from!==ue.prim&&ue.from.type!=="ground"?(St++,Ft=1,L.bestComboNow=Math.max(L.bestComboNow,St),St>0&&St%4===0&&(x.burstLeft=Un.burstTime,S.trigger("burst"),s.play("burst"),n.toast("Flow! Free burst",1200))):ue.prim.type==="ground"&&(St=0)}else ue.type==="burst"?(L.bursts++,S.trigger("burst"),s.play("burst"),_.dust(x.pos,8,1.4),y.addShake(.2),e.vibrate(20)):ue.type==="charged"&&(s.play("charge"),w.ping(x.pos,26,Tn=>_.ping(Tn.base))===0&&Ct&&U.index>1);Ft>0&&x.mode==="surface"&&(Ft-=ct/3.4,Ft<=0&&(St=0)),x.prim&&x.prim.kind==="wire"&&x.mode==="surface"&&(L.wireDist+=x.speed*ct),L.onRoof=x.mode==="surface"&&x.prim&&x.prim.type==="box"&&x.normal.y>.5&&x.heightAboveGround>5;const de=S.group;de.position.copy(x.visPos),de.quaternion.copy(x.visQuat),de.visible=!(x.invuln>0&&Math.floor(Xt*18)%2===0),ft.mode=x.mode==="air"?"air":"surface",ft.speed=x.speed,ft.steep=na(1-x.normal.y,0,1),ft.climb=x.heading.y,ft.thin=x.thin,ft.turn=x.turn,ft.airTime=x.airTime,ft.alert=x.alert,ft.time=Xt,x.mode==="air"&&(ft.airForward=x.vel.dot(x.heading),ft.airUp=x.vel.dot(x.normal),ft.speed=Math.abs(ft.airForward));const ve=oe(16);ve&&x.alert>.3?(de.updateMatrixWorld(),ft.lookLocal=de.worldToLocal(Yt.copy(ve.position).setY(ve.position.y+.6))):ft.lookLocal=null,S.update(ct,ft);const ze=i.clientWidth/Math.max(1,i.clientHeight);if(I==="title"){const ue=Xt*.07+.9;Tt.copy(x.visPos),Tt.y+=.28,d.position.set(Tt.x+Math.sin(ue)*2.6,Tt.y+.55,Tt.z+Math.cos(ue)*2.6),d.lookAt(Tt.x,Tt.y+(ze<1?-.25:.25),Tt.z);const He=ze<1?62:42;(d.fov!==He||d.aspect!==ze)&&(d.fov=He,d.aspect=ze,d.updateProjectionMatrix())}else y.update(ct,x,e.consumeLook(),ze);const Kt=w.update(ct,Xt,x.visPos);lt>0&&(lt-=ct,lt<=0&&(ye=0));for(const ue of Kt)ue.kind==="golden"?(L.golden++,n.setGolden(L.golden,w.goldenTotal),s.play("golden"),_.sparkle(ue.pos,26,!0),n.toast("Golden acorn: "+(ue.name||"found")+"  ("+L.golden+" of "+w.goldenTotal+")",3200),e.vibrate(60),X=Y,n.setHealth(X,Y)):(L.acorns++,n.setAcorns(L.acorns),s.play("pickup",{streak:Math.min(12,ye)}),_.sparkle(ue.pos,6,!1),ye++,lt=1.6,e.vibrate(8)),S.trigger("pickup");if(vt>0&&(vt-=ct),Ct&&e.attackPressed&&vt<=0&&x.stun<=0&&De(),C){z.time=Xt,z.player.heightAboveGround=x.heightAboveGround,z.player.hidden=x.hidden,z.player.invulnerable=x.invuln>0||V||I!=="play";try{C.update(ct,z)}catch(ue){console.error("dogs update failed, turning dogs off",ue);for(const He of C.list)He.alive=!1;C.group&&(C.group.visible=!1),C=null}if(C&&x.mode==="air"&&x.vel.y<-1.5)for(const ue of C.list){if(!ue.alive||ue.stunned)continue;const He=ue.position.x-x.pos.x,Tn=ue.position.z-x.pos.z,Fn=ue.position.y+(ue.height||.6);if(He*He+Tn*Tn<(ue.radius+.35)*(ue.radius+.35)&&x.pos.y<Fn+.35&&x.pos.y>Fn-.6){ue.hit(2,Tt.set(x.vel.x,0,x.vel.z).normalize(),"pounce"),s.play("pounce"),_.hit(Tt.set(x.pos.x,Fn,x.pos.z)),y.addShake(.8),Pt=.11,e.vibrate(50),x.bounce(9.5,.5),x.invuln=Math.max(x.invuln,.5),S.trigger("jump");break}}}if(wt>0&&(wt-=ct),st+=ct,X<Y&&st>12&&wt<=0&&(bt+=ct,bt>6&&(bt=0,X++,n.setHealth(X,Y))),Ct){if(U.update(),U.justCompleted){const He=U.justCompleted;n.questComplete(He.title),s.play("questDone"),Vt(),He.final&&!xe&&(xe=!0,setTimeout(()=>{I==="play"&&(I="paused",e.setEnabled(!1),n.showEnding({acorns:L.acorns,golden:L.golden,goldenTotal:w.goldenTotal,time:L.time,dogs:L.dogs},()=>{I="play",e.setEnabled(!0)}))},2200)),setTimeout(()=>s.play("questNew"),1500)}n.setQuest(U.view());const ue=U.target();if(ue){Tt.copy(ue).project(d);const He=Tt.z>1,Tn=!He&&Math.abs(Tt.x)<.9&&Math.abs(Tt.y)<.82,Fn=i.clientWidth,vs=i.clientHeight;let Di=Tt.x,F=-Tt.y;He&&(Di=-Di,F=-F);const N=ue.distanceTo(x.pos);n.setWaypoint({visible:N>2.2,x:(Tt.x*.5+.5)*Fn,y:(-Tt.y*.5+.5)*vs,distance:N,onScreen:Tn,angle:Math.atan2(F,Di),label:U.label()})}else n.setWaypoint({visible:!1})}if(n.setBurst(x.bursting?1:x.charge),n.setCombo(St,Ft),n.setDogAlert(na(wt/2.5,0,1)),ve&&Ct){Tt.set(ve.position.x,ve.position.y+(ve.height||.6)*.8,ve.position.z).project(d);const ue=Tt.z<1&&Math.abs(Tt.x)<1&&Math.abs(Tt.y)<1,He=ve.position.distanceTo(x.pos);n.setTargetReticle({visible:ue,x:(Tt.x*.5+.5)*i.clientWidth,y:(-Tt.y*.5+.5)*i.clientHeight,kind:He<2.3?"scratch":"throw"})}else n.setTargetReticle({visible:!1});if(n.update(rt),_.setRing(Ct&&x.mode==="surface"&&x.target.valid&&(x.wishMag>0||x.steepW>.5),x.target.point,x.target.normal,Xt,d),x.bursting&&x.speed>9)for(Lt+=ct*40;Lt>1;)Lt-=1,_.streak(x.visPos,x.vel);_.update(ct,Xt,x.visPos,a.leaves);const sn=x.prim&&(x.prim.kind==="branch"||x.prim.kind==="trunk")&&x.heightAboveGround>2.5?1:0;Ot+=(sn-Ot)*Math.min(1,ct*2),yt+=(na(St/6,0,1)-yt)*Math.min(1,ct*2),u.update(x.visPos,Xt),v.update(ct,Xt,d,I==="title"?null:x.visPos),s.update(rt,{speed:x.mode==="surface"?x.speed:x.vel.length(),surface:_t(),airborne:x.mode==="air",height:x.heightAboveGround,alert:I==="title"?.3:x.alert,danger:na(wt/2.5,0,1),inTree:Ot,flow:yt,paused:!1}),M.grade.uniforms.uDanger.value+=(na(wt/3,0,.5)+(st<.5?.5:0)-M.grade.uniforms.uDanger.value)*.1,M.grade.uniforms.uSpeed.value+=((x.bursting?1:0)-M.grade.uniforms.uSpeed.value)*.1,re&&Re++%3===0&&(l.shadowMap.needsUpdate=!0),l.info.reset(),M.render(rt),e.endFrame(),$t+=rt,$t>6&&Ct&&($t=0,Vt()),G+=rt,G>1.5&&Xt>4&&(G=0,J>21&&c>.85?(c=Math.max(.85,c-.15),we()):J>24&&pe<3?Se():J<14.5&&c<h&&(c=Math.min(h,c+.1),we()))}l.setAnimationLoop(K),document.addEventListener("visibilitychange",()=>{document.hidden&&(Vt(),I==="play"&&dt()),Je=performance.now()}),window.addEventListener("pagehide",Vt);try{l.compile(f,d)}catch{}t.classList.add("done"),setTimeout(()=>t.remove(),700),window.game={player:x,world:p,rig:y,camera:d,scene:f,renderer:l,stats:L,quests:U,pickups:w,dogs:()=>C,layout:m,hud:n,input:e,audio:s,squirrel:S,TUNE:Un,start:Q,info:()=>({calls:l.info.render.calls,tris:l.info.render.triangles,frameAvg:J,curPR:c,mode:I,health:X,combo:St,degrade:pe}),step:(H,rt=1/60)=>{for(let ct=0;ct<H;ct++)K(Je+rt*1e3)}}}p3().catch(i=>{console.error(i);const t=document.getElementById("loading");t&&(t.querySelector(".loading-text").textContent="Could not start: "+(i&&i.message?i.message:i))});export{bn as B,em as C,Ei as E,Ce as F,Oo as G,qe as M,Ti as Q,bo as S,k as V,cn as a,ks as b,g3 as c,Iy as d,tm as e,uu as f,Gn as g,m3 as h,Ly as i,Mn as j,ti as k,$y as l,on as m,hm as n,J0 as o,A_ as v};
