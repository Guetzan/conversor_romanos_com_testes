import ConversorRomanos from "./conversor.js";

const input = document.querySelector('#valorInput');
const areaResultado =  document.querySelector('#result');
const botoesOpcao = document.querySelectorAll('.options button');

const conversor = new ConversorRomanos(input, areaResultado, botoesOpcao);
conversor.capturarTrocaOpcao();
conversor.capturarTeclado();




