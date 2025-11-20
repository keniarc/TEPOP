const AV_KEY='avisosTepo',HR_KEY='horariosTepo';
const board=document.getElementById('board');
const sched=document.getElementById('sched-board');
const overlay=document.getElementById('overlay');
const overlayBody=document.getElementById('overlay-body');

/* Avisos */
function nAviso({texto,img64,fecha}){
  const art=document.createElement('article');
  art.className='post';
  art.innerHTML=`<p>${texto}</p>${img64?`<img src=\"${img64}\">`:''}
    <span class=\"time\">${new Date(fecha).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</span>`;
  return art;
}
function loadAvisos(){
  const avisos=JSON.parse(localStorage.getItem(AV_KEY)||'[]');
  board.innerHTML='';overlayBody.innerHTML='';
  if(!avisos.length){board.innerHTML='<p class=\"empty\">No hay avisos por el momento</p>';return;}
  avisos.forEach(a=>{board.append(nAviso(a));overlayBody.append(nAviso(a));});
}
board.onclick=()=>overlay.classList.remove('hidden');
document.getElementById('close-overlay').onclick=()=>overlay.classList.add('hidden');

/* Horarios */
function nHorario({parada,hora}){
  const div=document.createElement('div');
  div.className='row';div.innerHTML=`<span>${parada}</span><span>${hora}</span>`;
  return div;
}
function loadHorarios(){
  const h=JSON.parse(localStorage.getItem(HR_KEY)||'[]');
  sched.innerHTML='';
  if(!h.length){sched.innerHTML='<p class=\"empty\">No hay horarios publicados</p>';return;}
  h.forEach(r=>sched.append(nHorario(r)));
}

/* init */
loadAvisos();loadHorarios();
