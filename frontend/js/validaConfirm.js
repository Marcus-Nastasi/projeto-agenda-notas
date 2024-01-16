const inputs = [ document.getElementById('confirm-senha'), document.getElementById('cadastro-senha') ];

function validaConfirmadorSenha() {
   if(inputs[0].value !== inputs[1].value) {
      inputs[0].style.backgroundColor = 'rgba(255, 166, 0, 0.7)';
      inputs[0].placeholder = '!';
   } else {
      inputs[0].style.backgroundColor = 'white'; 
      inputs[0].placeholder = ''; 
   }
}
inputs.forEach(input => input.onkeyup = () => validaConfirmadorSenha());
