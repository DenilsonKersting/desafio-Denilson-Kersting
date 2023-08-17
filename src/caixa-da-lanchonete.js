class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe: { descricao: 'Café', primario: true, valor: 3.00 },
            chantily: { descricao: 'Chantily (extra do Café)', primario: false, valor: 1.50 },
            suco: { descricao: 'Suco Natural', primario: true, valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche', primario: true, valor: 6.50 },
            queijo: { descricao: 'Queijo (extra do Sanduíche)', primario: false, valor: 2.00 },
            salgado: { descricao: 'Salgado', primario: true, valor: 7.25 },
            combo1: { descricao: '1 Suco e 1 Sanduíche', primario: false, valor: 9.50 },
            combo2: { descricao: '1 Café e 1 Sanduíche', primario: false, valor: 7.50 },
        };
        this.formasDePagamento = ['dinheiro', 'debito', 'credito'];
        this.descontoDinheiro = 0.05;
        this.acrescimoCredito = 0.03;
    }

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (!this.formasDePagamento.includes(metodoDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        let valorTotal = 0;
        let mensagemErro = null;
        let principalCafe, principalSanduiche, extraChantily, extraQueijo = false;

        for (const itemInfo of itens) {
            const [codigo, quantidade] = itemInfo.split(',');

            if (!this.cardapio.hasOwnProperty(codigo)) {
                mensagemErro = 'Item inválido!';
                break;
            }

            if (quantidade <= 0) {
                mensagemErro = 'Quantidade inválida!';
                break;
            }

            if (codigo==='cafe') {
                principalCafe=true;
            }

            if (codigo==='sanduiche') {
              principalSanduiche=true;
            }

            if (codigo==='chantily') {
              extraChantily=true;
            }

            if (codigo==='queijo') {
              extraQueijo=true;
            }

            valorTotal += this.cardapio[codigo].valor * quantidade;
        }

        if (extraChantily&&!principalCafe) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (extraQueijo&&!principalSanduiche) {
          return "Item extra não pode ser pedido sem o principal";
        }

        if (mensagemErro) {
            return mensagemErro;
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal *= (1 - this.descontoDinheiro);
        } else if (metodoDePagamento === 'credito') {
            valorTotal *= (1 + this.acrescimoCredito);
        }

        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
    
    
} 

export { CaixaDaLanchonete };