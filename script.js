ecto//valores ingresados por elusuario
let nombre = ""
let edad = 0
let tipoDocumento = ""
let numeroDocumento = ""

let salario = 0
let comisiones = 0
let totalHorasExtras = 0
let nivelRiesgo = 0

//constante del taller (para calcular sobre el salario)
const salarioMinimo = 1750905;
const salarioMinimoIntegral = 22761765;
const auxilioTransporte = 249095;
const porcentajePension = 0.04;
const porcentajeSalud = 0.04;
const porcentajeFondoSolidaridad = 0.01;

const riesgos = [0.00522, 0.01044, 0.02436, 0.04350, 0.06960];


function validarCampos (valor, tipoEntrada, tipoConversion) {
    let condition;
    do {
        condition = tipoEntrada == "texto"? !isNaN(valor) : isNaN(valor);
        valor = tipoConversion == "texto"? valor : parseInt(valor);
    } while (condition);
    return valor;
}

const formDatosGenerales = document.getElementById('datosGenerales');

formDatosGenerales.addEventListener('submit', (event) => {
    event.preventDefault();

    nombre = validarCampos(document.getElementById('nombre').value,"texto", "texto");
    edad = validarCampos(document.getElementById('edad').value,"number", "number");
    tipoDocumento = validarCampos(document.getElementById('tipoDocumento').value,"texto", "texto");
    numeroDocumento = validarCampos(document.getElementById('numeroDocumento').value, "number", "texto");


})

const formDatosSalariales = document.getElementById('datosSalariales');

formDatosSalariales.addEventListener('submit', (event) => {
    event.preventDefault();

    salario = validarCampos(document.getElementById('salario').value, "number", "number");
    comisiones = validarCampos(document.getElementById('comisiones').value, "number", "number");
    totalHorasExtras = validarCampos(document.getElementById('horasExtra').value, "number", "number");
    nivelRiesgo = validarCampos(document.getElementById('nivelRiesgo').value,"number", "number");

})

function validar(edad) {
    if (edad < 18) {
        stop();
    } else if (18 <= edad && edad< 25) {
        esUsuarioBenerficiarioPorCotizante();
    } else if (edad >= 60) {
        pension();
    } else {
        salaraioCalculo();
    }
}


let ibc = (salario + comisiones + totalHorasExtras) * 0.7
let calculoAuxilioTransporte = salario < 2 * salarioMinimo? auxilioTransporte : 0
let calculoSalud = ibc * porcentajeSalud
let calculoFondoSolidaridad = ibc * porcentajeFondoSolidaridad
let calculoPension = ibc >= 4 * salarioMinimo? ibc * porcentajePension + calculoFondoSolidaridad : ibc * porcentajePension
let calculoArl = ibc * riesgos[parseInt(nivelRiesgo) - 1];



function calcularPorcentaje(base, porcentaje) {
    let resultado = base * porcentaje;

    return resultado;
}
