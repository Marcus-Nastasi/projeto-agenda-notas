const btn = document.getElementById('btnTasks');
const btnClose = document.getElementById('btnClose');
const mainSection = document.getElementById('mainNewTask');
btn.onclick = function() { 
   return mainSection.classList.remove('d-none'); 
};
btnClose.onclick = function() {
   return mainSection.classList.add('d-none');  
}
   
