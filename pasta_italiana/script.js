class Item {
    constructor(id, limite, nome) {
        this.el = document.getElementById(id);
        this.limite = limite;
        this.nome = nome;
    }

    atualizar(valor, unidade) {
        this.el.innerText = `${this.nome}: ${valor}${unidade}`;

        this.el.classList.remove('critico', 'medio');

        if (valor > this.limite) {
            this.el.classList.add('critico');
        } else if (valor > this.limite * 0.7) {
            this.el.classList.add('medio');
        }
    }
}

const cpu = new Item('cpu', 90, 'CPU');
const ram = new Item('ram', 14, 'RAM');
const temp = new Item('temp', 80, 'Temperatura');

async function atualizar() {
    try {
        const res = await fetch('/dados');
        const dados = await res.json();

        cpu.atualizar(dados.cpu, '%');
        ram.atualizar(dados.ram, 'GB');
        temp.atualizar(dados.temp, '°C');
    } catch (erro) {
        console.log('Erro ao buscar dados:', erro);
    }
}

setInterval(atualizar, 1000);