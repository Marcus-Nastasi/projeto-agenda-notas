const btn = document.getElementById('btnTasks');
const btnClose = document.getElementById('btnClose');
const mainSection = document.getElementById('mainNewTask');
const preForm = document.getElementById('divPreForm');
const form = document.getElementById('formTask');
const inForm = document.getElementById('divInForm');
const linkCreate = document.getElementById('linkNewTast');
const labels = document.querySelectorAll('label');
const inputs = document.querySelectorAll('input');
btn.onclick = function() {
   if(mainSection.classList.contains('d-none')) return mainSection.classList.remove('d-none');
};
btnClose.onclick = function() {
   return mainSection.classList.add('d-none');  
}
mainSection.onclick = e => {
   var ev = e.target;
   if(ev!==preForm&&ev!==form&&ev!==inForm&&ev!=linkCreate) {
      mainSection.classList.add('d-none')
   };
   return;
};
preForm.onclick = e => {
   var ev = e.target;
   if(ev!==preForm&&ev!==form&&ev!==inForm&&ev!=linkCreate) {
      mainSection.classList.add('d-none')
   };
   return;   
};


