var w=Object.defineProperty;var g=(s,e,t)=>e in s?w(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var h=(s,e,t)=>(g(s,typeof e!="symbol"?e+"":e,t),t);const x=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerpolicy&&(r.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?r.credentials="include":i.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=t(i);fetch(i.href,r)}};x();let y=new Audio("./../media/pop.mp3");y.volume=.1;class v{constructor(e,t,n,i){h(this,"video");h(this,"rowIndex");h(this,"columnIndex");h(this,"width");h(this,"height");h(this,"x");h(this,"y");h(this,"rows");h(this,"columns");h(this,"xCorrect");h(this,"yCorrect");h(this,"correct");this.video=i,this.rowIndex=e,this.columnIndex=t,this.width=n.width/n.columns,this.height=n.height/n.rows,this.rows=n.rows,this.columns=n.columns,this.x=n.x+this.columnIndex*this.width,this.y=n.y+this.rowIndex*this.height,this.xCorrect=this.x,this.yCorrect=this.y,this.correct=!0}draw(e){e.beginPath(),e.drawImage(this.video,this.columnIndex*this.video.videoWidth/this.columns,this.rowIndex*this.video.videoHeight/this.rows,this.video.videoWidth/this.columns,this.video.videoHeight/this.rows,this.x,this.y,this.width,this.height),e.rect(this.x,this.y,this.width,this.height),e.stroke()}isClose(){return E({x:this.x,y:this.y},{x:this.xCorrect,y:this.yCorrect})<this.width/3}snap(){this.x=this.xCorrect,this.y=this.yCorrect,this.correct=!0,y.play()}}function E(s,e){let t=s.x-e.x,n=s.y-e.y;return Math.sqrt(t*t+n*n)}function a(s,e){let t=[];for(let n=0;n<s.rows;n++)for(let i=0;i<s.columns;i++)t.push(new v(n,i,s,e));return t}function p(s,e){for(let t=0;t<s.length;t++){let n={x:Math.random()*(e.width-s[t].width),y:Math.random()*(e.height-s[t].height)};s[t].x=n.x,s[t].y=n.y,s[t].correct=!1}}function I(s,e){let t=document.getElementById("time"),n=new Date().getTime();s!=null&&(e!=null?t.innerHTML=u(e-s):t.innerHTML=u(n-s))}function u(s){let e=Math.floor(s/1e3),t=Math.floor(e%60),n=Math.floor(e%(60*60)/60),i=Math.floor(e%(60*60*24)/(60*60)),r=i.toString().padStart(2,"0");return r+=":",r+=n.toString().padStart(2,"0"),r+=":",r+=t.toString().padStart(2,"0"),console.log(i,n,t),r}let d={DO:261.6,RE:293.7,MI:329.6};function T(){c(d.MI,300),setTimeout(function(){c(d.DO,300)},300),setTimeout(function(){c(d.RE,150)},450),setTimeout(function(){c(d.MI,600)},600)}function c(s,e){let t=new AudioContext,n=t.createOscillator();n.frequency.value=s,n.start(t.currentTime),n.stop(t.currentTime+e/1e3);let i=t.createGain();n.connect(i),n.type="triangle",i.connect(t.destination),i.gain.setValueAtTime(0,t.currentTime),i.gain.linearRampToValueAtTime(.5,t.currentTime+.1),i.gain.linearRampToValueAtTime(0,t.currentTime+e/1e3),setTimeout(function(){n.disconnect()},e)}function M(){let e=document.getElementById("difficulty").value,t=0,n=0;switch(e){case"easy":t=3,n=3;break;case"normal":t=5,n=5;break;case"hard":t=10,n=10;break;case"insane":t=40,n=25;break}let i={rowNumber:t,columnNumber:n};return console.log(i),i}let o=null;function L(s){let e=s.canvas,t=s.PIECES,n=s.END_TIME;e.addEventListener("mousedown",i=>{if(o=m(i,t),o!=null){const r=t.indexOf(o);r>-1&&(t.splice(r,1),t.push(o)),o.offset={x:i.x-o.x,y:i.y-o.y},o.correct=!1}}),e.addEventListener("touchstart",i=>{let r={x:i.touches[0].clientX,y:i.touches[0].clientY};if(o=m(r,t),o!=null){const l=t.indexOf(o);l>-1&&(t.splice(l,1),t.push(o)),o.offset={x:r.x-o.x,y:r.y-o.y},o.correct=!1}}),e.addEventListener("mousemove",i=>{console.log(o),o!=null&&(console.log(o),o.x=i.x-o.offset.x,o.y=i.y-o.offset.y)}),e.addEventListener("touchmove",i=>{let r={x:i.touches[0].clientX,y:i.touches[0].clientY};o!=null&&(o.x=r.x-o.offset.x,o.y=r.y-o.offset.y)}),e.addEventListener("mouseup",()=>{o.isClose()&&(o.snap(),f(t)&&n==null&&s.end()),o=null}),e.addEventListener("touchend",()=>{o.isClose()&&(o.snap(),f(t)&&n==null&&s.end()),o=null})}function m(s,e){for(let t=e.length-1;t>=0;t--)if(s.x>e[t].x&&s.x<e[t].x+e[t].width&&s.y>e[t].y&&s.y<e[t].y+e[t].height)return e[t];return null}function f(s){for(let e=0;e<s.length;e++)if(s[e].correct==!1)return!1;return!0}class C{constructor(){h(this,"canvas");h(this,"context");h(this,"startButton");h(this,"menuItemsElement");h(this,"videoHasLoaded");h(this,"video");h(this,"SIZE");h(this,"SCALAR");h(this,"PIECES");h(this,"START_TIME");h(this,"END_TIME");this.canvas=document.getElementById("myCanvas"),this.context=this.canvas.getContext("2d"),this.video=document.createElement("video"),this.startButton=document.getElementById("start"),this.menuItemsElement=document.getElementById("menuItems"),this.SIZE={x:0,y:0,width:0,height:0,rows:3,columns:3},this.videoHasLoaded=!1,this.SCALAR=.8,this.PIECES=[],this.START_TIME=null,this.END_TIME=null}start(){navigator.mediaDevices.getUserMedia({video:!0}).then(t=>{this.video.srcObject=t,this.video.play(),this.video.onloadeddata=()=>{this.handleResize(),window.addEventListener("resize",()=>{this.handleResize()}),this.PIECES=a(this.SIZE,this.video),this.startButton.addEventListener("click",()=>{console.log(this.SIZE);let n=M();this.SIZE.rows=n.rowNumber,this.SIZE.columns=n.columnNumber,this.PIECES=a(this.SIZE,this.video),this.START_TIME=new Date().getTime(),this.END_TIME=null,p(this.PIECES,this.canvas),L(this),this.menuItemsElement.style.display="none"}),this.update()}}).catch(t=>{console.log("Camera Error"+t)})}update(){this.context.clearRect(0,0,this.canvas.width,this.canvas.height),this.context.globalAlpha=.5,this.context.drawImage(this.video,this.SIZE.x,this.SIZE.y,this.SIZE.width,this.SIZE.height),this.context.globalAlpha=1;for(let e=0;e<this.PIECES.length;e++)this.PIECES[e].draw(this.context);I(this.START_TIME,this.END_TIME),window.requestAnimationFrame(()=>{this.update()})}end(){let e=new Date().getTime();this.END_TIME=e,setTimeout(T,500),setTimeout(this.menuItemsElement.style.display="block",1e3)}handleResize(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight;let e=this.SCALAR*Math.min(window.innerWidth/this.video.videoWidth,window.innerHeight/this.video.videoHeight);this.SIZE.width=e*this.video.videoWidth,this.SIZE.height=e*this.video.videoHeight,this.SIZE.x=window.innerWidth/2-this.SIZE.width/2,this.SIZE.y=window.innerHeight/2-this.SIZE.height/2}}const S=new C;S.start();
