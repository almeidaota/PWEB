const janela = document.getElementById('janela');
const status = document.getElementById('status');

function janela_aberta() {
janela.src = 'janela_aberta.jpg'; 
status.textContent = 'Janela Aberta';
}


function janela_fechada() {
janela.src = "janela_fechada.jpg"; 
status.textContent = 'Janela Fechada';
}


function janela_quebrada() {
janela.src = 'janela_quebrada.jpeg'; 
status.textContent = 'Janela Quebrada';
}

janela.addEventListener('mouseover', janela_aberta);
janela.addEventListener('mouseout', janela_fechada);
janela.addEventListener('click', janela_quebrada);
