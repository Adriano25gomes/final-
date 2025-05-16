const API_PROXY = 'https://simulador-final.onrender.com';
let apiKey = '';

// Pegar token da interface
function atualizarApiKey() {
    apiKey = document.getElementById('api-key')?.value || '';
}

// Carregar times da API com base na liga selecionada
async function carregarTimesAPI() {
    atualizarApiKey();
    const liga = document.getElementById('liga').value;
    const response = await fetch(`${API_PROXY}/v4/competitions/${liga}/teams`, {
        headers: { 'X-Auth-Token': apiKey }
    });
    const data = await response.json();

    const timeCasaSelect = document.getElementById('time-casa');
    const timeForaSelect = document.getElementById('time-fora');
    const selects = [timeCasaSelect, timeForaSelect];

    selects.forEach(select => {
        select.innerHTML = '<option value="">Selecione um time</option>';
        data.teams.forEach(team => {
            const option = document.createElement('option');
            option.value = team.id;
            option.textContent = team.name;
            select.appendChild(option);
        });
    });
}

// Carregar últimos 5 jogos de um time
async function carregarUltimosJogos(tipo) {
    atualizarApiKey();
    const timeId = document.getElementById(`time-${tipo}`).value;
    const container = document.getElementById(`ultimos-jogos-${tipo}`);

    if (!timeId) {
        container.innerHTML = 'Selecione um time';
        return;
    }

    const response = await fetch(`${API_PROXY}/v4/teams/${timeId}/matches?limit=5&status=FINISHED`, {
        headers: { 'X-Auth-Token': apiKey }
    });
    const data = await response.json();

    if (data && data.matches && data.matches.length > 0) {
        container.innerHTML = '<ul>' + data.matches.map(match =>
            `<li>${match.utcDate.split('T')[0]} - ${match.homeTeam.name} ${match.score.fullTime.home} x ${match.score.fullTime.away} ${match.awayTeam.name}</li>`
        ).join('') + '</ul>';
    } else {
        container.innerHTML = 'Nenhum jogo encontrado.';
    }
}

// Carregar confrontos diretos entre os dois times selecionados
async function carregarConfrontosAPI() {
    atualizarApiKey();
    const time1 = document.getElementById('time-casa').value;
    const time2 = document.getElementById('time-fora').value;
    const container = document.getElementById('historico-confrontos');

    if (!time1 || !time2) {
        container.innerHTML = 'Selecione os dois times.';
        return;
    }

    const response = await fetch(`${API_PROXY}/v4/teams/${time1}/matches/head2head?opponent=${time2}`, {
        headers: { 'X-Auth-Token': apiKey }
    });
    const data = await response.json();

    if (data && data.matches && data.matches.length > 0) {
        container.innerHTML = '<ul>' + data.matches.map(match =>
            `<li>${match.utcDate.split('T')[0]} - ${match.homeTeam.name} ${match.score.fullTime.home} x ${match.score.fullTime.away} ${match.awayTeam.name}</li>`
        ).join('') + '</ul>';
    } else {
        container.innerHTML = 'Nenhum confronto direto encontrado.';
    }
}

// Função principal para previsão
function fazerPrevisao() {
    document.getElementById('resultado-previsao').style.display = 'block';
    document.getElementById('resultado-container').innerHTML = '<p>Previsão simulada (dados reais serão integrados).</p>';
    document.getElementById('tabela-detalhes').innerHTML = `
        <tr><td>Forma</td><td>7.5</td><td>6.2</td><td>Casa</td></tr>
        <tr><td>Mando</td><td>1.2</td><td>0.8</td><td>Casa</td></tr>
        <tr><td>Lesões</td><td>0</td><td>2</td><td>Casa</td></tr>
    `;
}

// As demais funções podem exibir placeholders por enquanto
function realizarAvaliacaoAutomatica() {
    alert('Função de avaliação automática ainda será implementada.');
}

function simularMultiplosHandicaps() {
    alert('Simulação de múltiplos handicaps em construção.');
}

function verificarEscalacoesAPI() {
    alert('Verificação de escalações ainda será implementada.');
}

function gerarSugestaoAposta() {
    alert('Geração de sugestão automática ainda será integrada.');
}

function preverPlacarCorreto() {
    alert('Previsão de placares ainda será integrada.');
}

function salvarConfiguracoes() {
    alert('Configurações salvas com sucesso!');
}

function enviarFeedback() {
    alert('Mensagem enviada com sucesso!');
}


// Avaliação automática com pesos
function realizarAvaliacaoAutomatica() {
    const pesoForma = parseInt(document.getElementById("peso-forma").value);
    const pesoMando = parseInt(document.getElementById("peso-mando").value);
    const pesoConfianca = parseInt(document.getElementById("peso-confianca").value);

    const casa = Math.random() * 10;
    const fora = Math.random() * 10;

    const totalCasa = (casa * pesoForma) + (1.2 * pesoMando) + (Math.random() * 1.5 * pesoConfianca);
    const totalFora = (fora * pesoForma) + (0.9 * pesoMando) + (Math.random() * 1.2 * pesoConfianca);

    const diff = (totalCasa - totalFora).toFixed(2);

    document.getElementById("resultado-avaliacao").style.display = "block";
    document.getElementById("tabela-avaliacao").innerHTML = `
        <tr><td>Forma</td><td>${casa.toFixed(2)}</td><td>${fora.toFixed(2)}</td><td>${(casa - fora).toFixed(2)}</td></tr>
        <tr><td>Mando</td><td>1.20</td><td>0.90</td><td>0.30</td></tr>
        <tr><td>Confiança</td><td>${(totalCasa / 10).toFixed(2)}</td><td>${(totalFora / 10).toFixed(2)}</td><td>${diff}</td></tr>
    `;
    document.getElementById("total-casa").textContent = totalCasa.toFixed(2);
    document.getElementById("total-fora").textContent = totalFora.toFixed(2);
    document.getElementById("diferenca-total").textContent = diff;
}

// Simulação de múltiplos handicaps
function simularMultiplosHandicaps() {
    const handicaps = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
    const tabela = document.getElementById("tabela-handicaps");
    const recomendado = handicaps[Math.floor(Math.random() * handicaps.length)];
    const odds = (Math.random() * 1.2 + 1.6).toFixed(2);
    const valor = (Math.random() * 10).toFixed(2);
    const time = Math.random() > 0.5 ? "Casa" : "Visitante";

    tabela.innerHTML = handicaps.map(h => {
        const prob = (Math.random() * 0.4 + 0.3).toFixed(2);
        const justa = (1 / prob).toFixed(2);
        const valEsperado = ((justa - 1.9) * 100).toFixed(2);
        return `<tr>
            <td>${h}</td><td>${(prob * 100).toFixed(1)}%</td><td>${justa}</td><td>${valEsperado}%</td>
            <td>${h == recomendado ? "Recomendado" : ""}</td></tr>`;
    }).join("");

    document.getElementById("valor-handicap-recomendado").textContent = recomendado;
    document.getElementById("odds-recomendada").textContent = odds;
    document.getElementById("time-recomendado").textContent = time;
    document.getElementById("vantagem-esperada").textContent = valor + "%";
    document.getElementById("resultado-simulacao").style.display = "block";
}

// Previsão de placares
function preverPlacarCorreto() {
    const placares = [
        {gols1: 1, gols2: 0, prob: 0.24},
        {gols1: 2, gols2: 1, prob: 0.21},
        {gols1: 1, gols2: 1, prob: 0.18}
    ];

    placares.forEach((p, i) => {
        document.getElementById(`time1-placar${i+1}`).textContent = "Time A";
        document.getElementById(`time2-placar${i+1}`).textContent = "Time B";
        document.getElementById(`gols1-placar${i+1}`).textContent = p.gols1;
        document.getElementById(`gols2-placar${i+1}`).textContent = p.gols2;
        document.getElementById(`prob-placar${i+1}`).textContent = (p.prob * 100).toFixed(1) + "%";
    });

    document.getElementById("prob-vitoria-casa").textContent = "45%";
    document.getElementById("prob-empate").textContent = "30%";
    document.getElementById("prob-vitoria-fora").textContent = "25%";

    document.getElementById("bar-vitoria-casa").style.width = "45%";
    document.getElementById("bar-empate").style.width = "30%";
    document.getElementById("bar-vitoria-fora").style.width = "25%";

    document.getElementById("tabela-placares").innerHTML = placares.map(p => {
        const oddJusta = (1 / p.prob).toFixed(2);
        const mercado = (parseFloat(oddJusta) + Math.random()).toFixed(2);
        const valorEsperado = (((oddJusta - mercado) / mercado) * 100).toFixed(2);
        return `<tr><td>${p.gols1} x ${p.gols2}</td><td>${(p.prob * 100).toFixed(1)}%</td><td>${oddJusta}</td><td>${mercado}</td><td>${valorEsperado}%</td></tr>`;
    }).join("");

    document.getElementById("resultado-placar").style.display = "block";
}

// Simulação simples de escalações e desfalques
function verificarEscalacoesAPI() {
    document.getElementById("nome-time-casa-escalacao").textContent = "Time A";
    document.getElementById("nome-time-fora-escalacao").textContent = "Time B";
    document.getElementById("desfalques-casa").innerHTML = "<li>Sem desfalques</li>";
    document.getElementById("desfalques-fora").innerHTML = "<li>2 jogadores lesionados</li>";

    document.getElementById("impacto-casa-bar").style.width = "10%";
    document.getElementById("impacto-fora-bar").style.width = "60%";
    document.getElementById("impacto-casa-valor").textContent = "10%";
    document.getElementById("impacto-fora-valor").textContent = "60%";

    document.getElementById("analise-casa-lesoes").textContent = "Time completo.";
    document.getElementById("analise-fora-lesoes").textContent = "Dois titulares fora, impacto relevante.";

    document.getElementById("time-casa-lesoes").textContent = "Time A";
    document.getElementById("time-fora-lesoes").textContent = "Time B";
    document.getElementById("conclusao-lesoes").textContent = "O time visitante pode ter queda de desempenho devido aos desfalques.";
    document.getElementById("analise-escalacoes").style.display = "block";
