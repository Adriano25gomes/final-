// Configuração da API
const proxyURL = "https://simulador-final.onrender.com/api";
let apiKey = "";

// Salvar configurações do usuário
function salvarConfiguracoes() {
    apiKey = document.getElementById("api-key").value;
    localStorage.setItem("apiKey", apiKey);
    alert("Configurações salvas com sucesso!");
}

// Carregar chave da API se estiver salva
window.onload = () => {
    const savedKey = localStorage.getItem("apiKey");
    if (savedKey) {
        document.getElementById("api-key").value = savedKey;
        apiKey = savedKey;
    }
};

// Controle de abas
function openTab(evt, tabName) {
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
}

// Placeholder: você deve implementar cada função real depois.
function fazerPrevisao() {
    alert("Função fazerPrevisao ainda não implementada.");
}

function carregarTimesAPI() {
    alert("Função carregarTimesAPI ainda não implementada.");
}

function carregarUltimosJogos(tipo) {
    alert("Função carregarUltimosJogos ainda não implementada para: " + tipo);
}

function carregarConfrontosAPI() {
    alert("Função carregarConfrontosAPI ainda não implementada.");
}

function realizarAvaliacaoAutomatica() {
    alert("Função realizarAvaliacaoAutomatica ainda não implementada.");
}

function simularMultiplosHandicaps() {
    alert("Função simularMultiplosHandicaps ainda não implementada.");
}

function verificarEscalacoesAPI() {
    alert("Função verificarEscalacoesAPI ainda não implementada.");
}

function gerarSugestaoAposta() {
    alert("Função gerarSugestaoAposta ainda não implementada.");
}

function preverPlacarCorreto() {
    alert("Função preverPlacarCorreto ainda não implementada.");
}
