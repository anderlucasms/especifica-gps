// Listas pré-cadastradas por setor
        const listasSetores = {
            MONTAGEM: [ //Siga essa configuração: { seq: "", setor: "MONTAGEM", yg: "YG", desc: "" }
                { seq: "1", setor: "MONTAGEM", yg: "Y0712361681", desc: "Suporte do Painel" },
                { seq: "2", setor: "MONTAGEM", yg: "Y0710402201", desc: "Conjunto Presilha" },
                { seq: "3", setor: "MONTAGEM", yg: "Y0769203921", desc: "Tinta Primer Cinza" },
                { seq: "4", setor: "MONTAGEM", yg: "Y0731760581", desc: "Verniz PU" }
            ],
            PINTURA: [
                { seq: "1", setor: "PINTURA", yg: "789123456003", desc: "Tinta Primer Cinza" },
                { seq: "2", setor: "PINTURA", yg: "789123456004", desc: "Verniz PU" }
            ],
            FUNILARIA: [
                { seq: "1", setor: "FUNILARIA", yg: "789123456005", desc: "Chapa Lateral Esquerda" },
                { seq: "2", setor: "FUNILARIA", yg: "789123456006", desc: "Reforço Estrutural" }
            ],
            PRENSAS: [
                { seq: "1", setor: "PRENSAS", yg: "789123456007", desc: "Matriz de Estampo A" },
                { seq: "2", setor: "PRENSAS", yg: "789123456008", desc: "Pino de Guia 10mm" }
            ]
        };

        function selecionarSetor(setor) {
            // Inicializa a quantidade zero para cada item da lista selecionada
            const listaSelecionada = listasSetores[setor].map(item => ({ ...item, qtd: 0 }));

            // Salva o setor ativo e os dados na memória do navegador (localStorage)
            localStorage.setItem('setorAtivo', setor);
            localStorage.setItem('dadosInventario', JSON.stringify(listaSelecionada));

            // Redireciona para a página do leitor
            window.location.href = 'leitor.html';
        }
