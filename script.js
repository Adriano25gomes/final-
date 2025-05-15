const proxyURL = "https://simulador-final.onrender.com/api";
let apiKey = "";

window.onload = () => {
  const savedKey = localStorage.getItem("apiKey");
  if (savedKey) {
    document.getElementById("api-key").value = savedKey;
    apiKey = savedKey;
  }
};

function salvarConfiguracoes() {
  apiKey = document.getElementById("api-key").value;
  localStorage.setItem("apiKey", apiKey);
  alert("Configurações salvas.");
}

function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

async function fazerPrevisao() {
  const casaId = document.getElementById("time-casa").value;
  const foraId = document.getElementById("time-fora").value;
  if (!casaId || !foraId) return alert("Preencha os dois times.");

  try {
    const jogosCasa = await buscarUltimosJogos(casaId);
    const jogosFora = await buscarUltimosJogos(foraId);
    const confrontos = await buscarConfrontosDiretos(casaId, foraId);

    const formaCasa = calcularForma(jogosCasa);
    const formaFora = calcularForma(jogosFora);
    const historico = calcularHistorico(confrontos, casaId);

    const totalCasa = formaCasa + historico * 0.5;
    const totalFora = formaFora + (1 - historico) * 0.5;

    let sugestao = totalCasa > totalFora ? "Vitória da Casa" : totalCasa < totalFora ? "Vitória do Visitante" : "Empate";

    document.getElementById("resultado-previsao").innerHTML = `
      <p>Forma da Casa: ${formaCasa.toFixed(2)}</p>
      <p>Forma do Visitante: ${formaFora.toFixed(2)}</p>
      <p>Histórico da Casa: ${historico.toFixed(2)}</p>
      <p><strong>Sugestão:</strong> ${sugestao}</p>
    `;
  } catch (err) {
    alert("Erro ao buscar dados.");
    console.error(err);
  }
}

function calcularForma(jogos) {
  let pontos = 0;
  jogos.forEach(j => {
    const h = j.score.fullTime.home;
    const a = j.score.fullTime.away;
    if (h != null && a != null) {
      const venceu = (j.homeTeam.id === j.team.id && h > a) || (j.awayTeam.id === j.team.id && a > h);
      const empate = h === a;
      pontos += venceu ? 3 : empate ? 1 : 0;
    }
  });
  return jogos.length ? pontos / (jogos.length * 3) : 0;
}

function calcularHistorico(jogos, timeId) {
  let vitorias = 0;
  jogos.forEach(j => {
    const h = j.score.fullTime.home;
    const a = j.score.fullTime.away;
    if (h != null && a != null) {
      const venceu = (j.homeTeam.id == timeId && h > a) || (j.awayTeam.id == timeId && a > h);
      if (venceu) vitorias++;
    }
  });
  return jogos.length ? vitorias / jogos.length : 0.5;
}

async function buscarUltimosJogos(teamId) {
  const url = `${proxyURL}/teams/${teamId}/matches?status=FINISHED&limit=5`;
  const res = await fetch(url, { headers: { "X-Auth-Token": apiKey } });
  const data = await res.json();
  return data.matches || [];
}

async function buscarConfrontosDiretos(id1, id2) {
  const url = `${proxyURL}/teams/${id1}/matches?status=FINISHED&limit=20&opponent=${id2}`;
  const res = await fetch(url, { headers: { "X-Auth-Token": apiKey } });
  const data = await res.json();
  return data.matches || [];
}

async function consultarAPI() {
  const endpoint = document.getElementById("api-endpoint").value;
  const url = `${proxyURL}/${endpoint}`;
  const res = await fetch(url, { headers: { "X-Auth-Token": apiKey } });
  const data = await res.json();
  document.getElementById("api-json").textContent = JSON.stringify(data, null, 2);
}
