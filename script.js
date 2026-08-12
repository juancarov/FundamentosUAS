const data=[
 {brand:"DJI",model:"Mini 4 Pro",price:759,flight:34,range:20,speed:57.6,weight:"<249 g",camera:'1/1.3" CMOS · 48 MP',source:"DJI",scores:[9,8,10,8,9,10,9,10]},
 {brand:"Potensic",model:"ATOM 2",price:329.99,flight:32,range:10,speed:57.6,weight:"<249 g",camera:'1/2" CMOS · 48 MP · 8K',source:"Potensic",scores:[10,8,7,8,8,8,8,10]},
 {brand:"FIMI",model:"Mini 3",price:299,flight:32,range:9,speed:64.8,weight:"<250 g",camera:'1/2" CMOS · 48 MP · 4K/60',source:"FIMI",scores:[10,8,7,9,8,7,8,10]},
 {brand:"Autel Robotics",model:"EVO Lite+",price:1149,flight:40,range:12,speed:68,weight:"835 g",camera:'1" CMOS · 20 MP · f/2.8–f/11',source:"Autel",scores:[5,10,8,10,10,9,9,6]},
 {brand:"HOVERAir",model:"X1 Pro",price:499,flight:16,range:1,speed:60,weight:"191.5 g",camera:'1/2" CMOS · 4K/60',source:"HOVERAir",scores:[8,4,5,8,8,8,10,10]}
];
const W=[.25,.15,.10,.10,.15,.10,.10,.05];
const money=x=>"US$ "+x.toLocaleString(undefined,{minimumFractionDigits:x<1000?2:0,maximumFractionDigits:2});
document.querySelector("#table").innerHTML=data.map(d=>`<tr>
<td class="model">${d.brand} ${d.model}<span class="sub">${d.source}</span></td>
<td>${money(d.price)}</td><td>${d.flight} min</td><td>${d.range} km*</td><td>${d.speed} km/h</td>
<td>${d.weight}</td><td>${d.camera}</td></tr>`).join("");
document.querySelector("#cards").innerHTML=data.map(d=>`<article class="card">
<h3>${d.brand}<br>${d.model}</h3><small>Precio</small><div class="big">${money(d.price)}</div>
<div class="mini"><b>${d.flight} min</b> autonomía</div><div class="mini"><b>${d.range} km</b> alcance</div><div class="mini"><b>${d.speed} km/h</b> velocidad</div></article>`).join("");
const score=d=>d.scores.reduce((a,v,i)=>a+v*W[i],0);
const ranked=data.map(d=>({...d,total:score(d)})).sort((a,b)=>b.total-a.total);
document.querySelector("#ranking").innerHTML=ranked.map((d,i)=>`<article class="rank">
<span class="place">${i+1}º LUGAR</span><h3>${d.brand} ${d.model}</h3><div class="score">${d.total.toFixed(1)}<small>/10</small></div>
<div class="bar"><i style="width:${d.total*10}%"></i></div>
<p>Resultado ponderado según la matriz definida arriba.</p></article>`).join("");
const winner=ranked[0];
document.querySelector("#winner").textContent=`${winner.brand} ${winner.model}`;
document.querySelector("#winnerText").textContent=`Con esta ponderación, el ${winner.brand} ${winner.model} obtiene la mayor puntuación general. El resultado favorece especialmente el equilibrio entre precio, portabilidad y prestaciones. No significa que sea el mejor para todas las misiones: la elección final depende del uso concreto.`;
function chart(){
 const c=document.querySelector("#chart"),r=c.getBoundingClientRect(),dpr=devicePixelRatio||1,w=r.width,h=360;
 c.width=w*dpr;c.height=h*dpr;const x=c.getContext("2d");x.scale(dpr,dpr);
 const pad={l:58,r:28,t:25,b:50},maxP=1200,maxF=45;
 x.font="12px Arial";x.fillStyle="#66737c";x.strokeStyle="#dfe3e7";
 for(let i=0;i<6;i++){const y=pad.t+(h-pad.t-pad.b)*i/5;x.beginPath();x.moveTo(pad.l,y);x.lineTo(w-pad.r,y);x.stroke();x.fillText(Math.round(maxF*(1-i/5))+" min",10,y+4)}
 data.forEach(d=>{const px=pad.l+(d.price/maxP)*(w-pad.l-pad.r),py=pad.t+(1-d.flight/maxF)*(h-pad.t-pad.b);
 x.beginPath();x.arc(px,py,7,0,Math.PI*2);x.fillStyle="#58788d";x.fill();x.fillStyle="#172c3c";x.fillText(d.brand+" "+d.model,px+10,py+4)});
 x.fillStyle="#66737c";x.fillText("Precio (USD) →",w/2-45,h-15);
}
chart();addEventListener("resize",chart);
