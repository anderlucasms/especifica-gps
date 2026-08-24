// --- COLE SUA LISTA AQUI ---
// Siga exatamente este formato: { seq: "1", setor: "MONTAGEM", yg: "CÓDIGO", desc: "NOME" }
const LISTA_MATERIAIS = [
{ seq: "1", setor: "MONTAGEM", yg: "YG731760581", desc: "Parafuso M6", real: 0 },
{ seq: "2", setor: "MONTAGEM", yg: "YG712361681", desc: "Porca M6", real: 0 },
{ seq: "1", setor: "PINTURA", yg: "2001", desc: "Tinta Azul", real: 0 },
{ seq: "2", setor: "PINTURA", yg: "2002", desc: "Tinta Branca", real: 0 },
{ seq: "1", setor: "FUNILARIA", yg: "3001", desc: "Martelo", real: 0 },
{ seq: "1", setor: "PRENSAS", yg: "4001", desc: "Óleo", real: 0 }
 ];

let setorAtual = "";
let historicoBipagem = [];

// Carregar botões ao iniciar
window.onload = () => {
const setores = [...new Set(LISTA_MATERIAIS.map(i => i.setor))];
const div = document.getElementById('botoesSetor');
setores.forEach(s => {
const btn = document.createElement('button');
btn.className = 'btn-setor';
btn.style.backgroundColor = '#2c3e50';
btn.innerText = s;
btn.onclick = () => entrarSetor(s);
div.appendChild(btn);
});
};

function entrarSetor(setor) {
setorAtual = setor;
document.getElementById('screen-home').style.display = 'none';
document.getElementById('screen-bipagem').style.display = 'block';
document.getElementById('tituloSetor').innerText = setor;

const scanner = new Html5Qrcode("reader");
scanner.start({ facingMode: "environment" }, { fps: 10, qrbox: 250 }, (decodedText) => {
processarBip(decodedText.trim());
});
}

function processarBip(codigo) {
const item = LISTA_MATERIAIS.find(i => i.yg === codigo && i.setor === setorAtual);
if(item) {
item.real += 1;
historicoBipagem.push(item);
document.getElementById('infoMaterial').innerHTML = &lt;p&gt;&lt;strong&gt;YG:&lt;/strong&gt; ${item.yg}</p>
<p><strong>DESC:</strong> ${item.desc}&lt;/p&gt; &lt;p&gt;&lt;strong&gt;QTD ATUAL:&lt;/strong&gt; ${item.real}</p>;
} else {
alert("YG " + codigo + " não encontrado no setor " + setorAtual);
}
}

function excluirUltimo() {
if(historicoBipagem.length > 0) {
const lastItem = historicoBipagem.pop();
lastItem.real -= 1;
alert("Removido 1 unidade de: " + lastItem.desc);
}
}

function abrirFinalizacao() {
document.getElementById('screen-bipagem').style.display = 'none';
document.getElementById('screen-final').style.display = 'block';
}

function salvarExcel() {
const wb = XLSX.utils.book_new();
const wsData = [["Sequência", "YG", "Descrição", "Real"]];

LISTA_MATERIAIS.filter(i => i.setor === setorAtual).forEach(i => {
wsData.push([i.seq, i.yg, i.desc, i.real]);
});

wsData.push([], ["Resp. GPS:", document.getElementById('respGps').value]);
wsData.push(["Resp. Manutenção:", document.getElementById('respManutencao').value]);

const ws = XLSX.utils.aoa_to_sheet(wsData);
XLSX.utils.book_append_sheet(wb, ws, setorAtual);

const data = new Date().toISOString().split('T')[0];
XLSX.writeFile(wb, Inventario_${setorAtual}_${data}.xlsx`);
}