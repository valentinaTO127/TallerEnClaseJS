//valores ingresados por elusuario
let nombre = validarCampos("Nombre:", "", "texto");
let edad = validarCampos("Edad:", 0, "number");
let tipoDocumento = validarCampos("Tipo de docmuento.\nUsa una de las siguientes opciones: \nCC\nTI\nRC\nCE\nPPT\nPasaporte", "", "texto");
let numeroDocumento = validarCampos("Numero de documento:", "", "texto");
let salario = validarCampos("Indica tu salario:", 0, "number");
let comisiones = validarCampos("Comisiones:", 0, "number");
let totalHorasExtras = validarCampos("Horas extra:", 0, "number");
let nivelRiesgo = validarCampos("Nivel de riesgo ARL\nUsa una de las siguientes opciones: \n1\n2\n3\n4\n5", "", "number");

//constante del taller (para calcular sobre el salario)
const salarioMinimo = 1750905;
const salarioMinimoIntegral = 22761765;
const auxilioTransporte = 249095;
const porcentajePension = 0.04;
const porcentajeSalud = 0.04;
const porcentajeFondoSolidaridad = 0.01;

const riesgos = [0.00522, 0.01044, 0.02436, 0.04350, 0.06960];


function validarCampos (text, defa, tipo) {
    let valor;
    let condition;
    do {
        valor = prompt(text, defa);
        condition = tipo == "texto"? !isNaN(valor) : isNaN(valor);
        valor = tipo == "texto"? valor : parseInt(valor);
    } while (condition);
    return valor;
}

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
