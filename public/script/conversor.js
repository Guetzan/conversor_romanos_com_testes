export default class ConversorRomanos {
	constructor(input, areaResultado, botoesOpcao) {
		this.input = input//document.querySelector('#valorInput');
		this.areaResultado = areaResultado //document.querySelector('#result');
		this.modoAtual = 'arabicoRomano';
		this.botoesOpcao = botoesOpcao//document.querySelectorAll('.options button');
		this.algarismosRomanos   = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
		this.valoresIndoArabicos = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
	}
	
	capturarTeclado() {
		this.input.addEventListener('keyup', () => {
			const valorInput = this.input.value;
			let valorResultado = 0;
			
			if(this.modoAtual === 'arabicoRomano') {
				valorResultado = this.conversorArabicoRomano(valorInput);
			}
			
			if(this.modoAtual === 'romanoArabico') {
				valorResultado = this.conversorRomanoArabico(valorInput);
			}
			this.atualizarResultado(valorResultado);
		});
	}
	
	capturarTrocaOpcao() {
		this.botoesOpcao.forEach((botao) => {
			botao.addEventListener('click', () => {
				const botaoAtivo = document.querySelector('button.active');
				
				if(!botao.classList.contains('active')) {
					this.areaResultado.innerHTML = '-';
					this.areaResultado.style.visibility = 'hidden';
					this.input.value = '';
				}
				
				botaoAtivo.classList.remove('active');
				botao.classList.add('active');
				
				if(botao.id === 'arabico-romano') {
					this.input.placeholder = 'Digite um valor indo-arábico (ex: 1, 50, 23)';
					this.modoAtual = 'arabicoRomano'
				} 
				if(botao.id === 'romano-arabico') {
					this.input.placeholder = 'Digite um valor em algarismos romanos (ex: II, IV, CM)';
					this.modoAtual = 'romanoArabico';
				}
			});
		});
	}
	
	conversorArabicoRomano(valor) {
		valor = Number(valor);
		if (valor > 3999 || valor < 0 || isNaN(valor)) return;
		
		let resultado = '';
		
		for(let index = 0; index < this.valoresIndoArabicos.length; index++) {
			while(valor >= this.valoresIndoArabicos[index]) {
				valor -= this.valoresIndoArabicos[index];
				resultado += this.algarismosRomanos[index];
			}
		}
		
		return resultado;
	}
	
	excedeLimite(valor) {
		let ultimoCaractere = ''
		let contadorCaractere = 0;
		
		for(let caractere = 0; caractere < valor.length; caractere++) {
			if(valor[caractere] !== ultimoCaractere) {
				ultimoCaractere = valor[caractere];
				contadorCaractere = 0;
				contadorCaractere++;
				continue;
			}
			
			if(valor[caractere] === ultimoCaractere) contadorCaractere++;
		}
			
		if(contadorCaractere > 3) return true;
		return false;
	}

	conversorRomanoArabico(valor) {
		let soma = 0;
		valor = valor.toUpperCase().split('');
		
		for(let caractere of valor) {
			if(!this.algarismosRomanos.includes(caractere)) return;
		}
		
		if(this.excedeLimite(valor)) return;
		if(this.subtracaoInvalida(valor)) return;
		
		for(let caractere = 0; caractere < valor.length; caractere++) {	
			for(let i = 0; i < this.algarismosRomanos.length; i++) {
				const indexProximoCaractere = caractere + 1;
				const caracteresAdjacentes = valor[caractere] + valor[indexProximoCaractere];
				
				if(caracteresAdjacentes === this.algarismosRomanos[i]) {
					soma += this.valoresIndoArabicos[i];
					delete valor[caractere]; delete valor[indexProximoCaractere];
				}
				
				if((valor[caractere]) === this.algarismosRomanos[i]) {
					soma += this.valoresIndoArabicos[i];
					delete valor[caractere];
				}
			}
		}
		
		return soma;
	}

	menorQueVizinho(caractereAtual, valorVizinho) {
		const enderecoCaractere = this.algarismosRomanos.indexOf(caractereAtual);
		let enderecoCaractereVizinho;
		
		if(valorVizinho.length === 2) {
			if(caractereAtual.length === 2 && caractereAtual === valorVizinho) {
				return true;
			}

			if(this.algarismosRomanos.includes(valorVizinho)) {
				enderecoCaractereVizinho = this.algarismosRomanos.indexOf(valorVizinho);
	
				if(this.valoresIndoArabicos[enderecoCaractere] < this.valoresIndoArabicos[enderecoCaractereVizinho]) {
					return true;
				}
			}
		}

		enderecoCaractereVizinho = this.algarismosRomanos.indexOf(valorVizinho[0]);
	
		if(this.valoresIndoArabicos[enderecoCaractere] < this.valoresIndoArabicos[enderecoCaractereVizinho]) {
			return true;
		}
	}
	
	subtracaoInvalida(valor) {
		let operacaoInvalida = false;

		for(let index = 0; index < valor.length; index++) {
			let valorVizinho = '';

			//se não existir um valor vizinho, o loop é interrompido
			if(!valor[index+1]) break;

			const valorAdjacente = valor[index] + valor[index + 1];

			if(valor[index+1] && this.algarismosRomanos.includes(valorAdjacente) && !valor[index+2]) {
				break;
			}
			
			if(this.algarismosRomanos.includes(valorAdjacente)) {
				if(valor[index+2]) valorVizinho = valor[index+2];
				if(valor[index+3]) valorVizinho += valor[index+3];
				
				if(valorVizinho === 'C') return true;

				operacaoInvalida = this.menorQueVizinho(valorAdjacente, valorVizinho);
			} 

			if(!this.algarismosRomanos.includes(valorAdjacente)) {
				const caractereAtual = valor[index];
				valorVizinho = valor[index+1];
				
				if(valor[index+2] && (this.algarismosRomanos.includes(valor[index+1] + valor[index+2]))) {
					valorVizinho += valor[index+2];
				} 
				
				operacaoInvalida = this.menorQueVizinho(caractereAtual, valorVizinho);
			}

			if(operacaoInvalida) return operacaoInvalida;
		}		
	}

	atualizarResultado(resultadoAtual) {
		const valorAtual = resultadoAtual;
		
		if(typeof valorAtual === 'undefined') {
			this.areaResultado.innerHTML = 'Valor inválido.';
			this.areaResultado.style.visibility = 'visible';
			return;
		}
		
		this.areaResultado.innerHTML = valorAtual;

		if(this.modoAtual === 'arabicoRomano') {
			this.areaResultado.style.fontFamily = "'Cormorant Garamond', serif";
		} 

		this.areaResultado.style.visibility = 'visible';

		if(this.areaResultado.innerHTML === '') {
			this.areaResultado.innerHTML = '-';
			this.areaResultado.style.visibility = 'hidden';
		}
	}
}
