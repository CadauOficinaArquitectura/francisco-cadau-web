const sections=[...document.querySelectorAll(".view-section")];
const viewLinks=[...document.querySelectorAll("[data-view]")];
function showView(name,updateHash=true){sections.forEach(sec=>sec.classList.toggle("active",sec.id===name)); if(updateHash) history.replaceState(null,"",`#${name}`); window.scrollTo(0,0);}
viewLinks.forEach(link=>link.addEventListener("click",e=>{e.preventDefault();showView(link.dataset.view);}));
const initialView=location.hash.slice(1);
showView(["coa","oficina","obras"].includes(initialView)?initialView:"coa",false);

const $=s=>document.querySelector(s);const lightbox=$("#lightbox"),img=$("#lbImg"),count=$("#lbCount"),title=$("#lbTitle");let gallery=[],i=0;
function render(){img.src=gallery[i];count.textContent=`${i+1} / ${gallery.length}`;}
function openGallery(c){gallery=c.dataset.gallery.split(",");i=0;title.textContent=`${c.dataset.title} · ${c.dataset.year}`;render();lightbox.classList.add("open");document.body.style.overflow="hidden";}
function closeGallery(){lightbox.classList.remove("open");document.body.style.overflow="";img.src="";}
function next(){if(gallery.length){i=(i+1)%gallery.length;render();}}
function prev(){if(gallery.length){i=(i-1+gallery.length)%gallery.length;render();}}
document.querySelectorAll(".work").forEach(c=>c.addEventListener("click",()=>openGallery(c)));
$("#lbNext").onclick=e=>{e.stopPropagation();next()};$("#lbPrev").onclick=e=>{e.stopPropagation();prev()};$("#lbClose").onclick=closeGallery;
lightbox.onclick=e=>{if(e.target===lightbox)closeGallery()};
document.addEventListener("keydown",e=>{if(!lightbox.classList.contains("open"))return;if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev();if(e.key==="Escape")closeGallery()});
let sx=0;lightbox.addEventListener("touchstart",e=>sx=e.changedTouches[0].clientX,{passive:true});lightbox.addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>45){dx<0?next():prev()}},{passive:true});
$("#openSearch").onclick=()=>$("#search").classList.add("open");$("#closeSearch").onclick=()=>$("#search").classList.remove("open");
const q=$("#q"),results=$("#results");q.oninput=()=>{let v=q.value.toLowerCase().trim();results.innerHTML=v?[...document.querySelectorAll(".work")].filter(c=>(c.dataset.title+" "+c.dataset.year).toLowerCase().includes(v)).map(c=>`<div class="result">${c.dataset.title}<br><small>${c.dataset.year}</small></div>`).join(""):"";};