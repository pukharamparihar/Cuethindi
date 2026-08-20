const nav=document.getElementById("navLinks"), menu=document.getElementById("menuBtn");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
document.querySelectorAll("#navLinks a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

let toastTimer;
function showToast(message){
  const t=document.getElementById("toast");
  t.textContent=message;t.classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove("show"),2600);
}
function startMock(n){
  showToast(`Mock Test ${n} selected — अब अपना questions page यहाँ connect करें`);
}
