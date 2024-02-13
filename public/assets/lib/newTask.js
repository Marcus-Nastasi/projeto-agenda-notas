const btn = document.getElementById('btnTasks');
const btnClose = document.getElementById('btnClose');
const mainSection = document.getElementById('mainNewTask');
const preForm = document.getElementById('divPreForm');
btn.onclick = () => (mainSection.classList.contains('d-none'))?mainSection.classList.remove('d-none'):0;
btnClose.onclick = () => mainSection.classList.add('d-none'); 
document.onclick = e => (e.target==preForm||e.target==mainSection)?mainSection.classList.add('d-none'):0;

