//valores ingresados por elusuario
let nombre = "";
let edad = 0;
let tipoDocumento = "";
let numeroDocumento = "";

let salario = 0;
let comisiones = 0;
let totalHorasExtras = 0;
let nivelRiesgo = "";

//formularios
const formDatosGenerales = document.getElementById("datosGenerales");

//constante del taller (para calcular sobre el salario)
const salarioMinimo = 1750905;
const salarioMinimoIntegral = 22761765;
const auxilioTransporte = 249095;
const porcentajePension = 0.04;
const porcentajeSalud = 0.04;
const porcentajeFondoSolidaridad = 0.01;

const riesgo1 = 0.00522;
const riesgo2 = 0.01044;
const riesgo3 = 0.02436;
const riesgo4 = 0.04350;
const riesgo5 = 0.06960;

const riesgos = [riesgo1, riesgo2, riesgo3, riesgo4, riesgo5];

formDatosGenerales.addEventListener('submit', (e) => {
    e.preventDefault(); // Evita recargar
    nombre = document.getElementById("nombre").value;
    edad = parseInt(document.getElementById("edad").value);
    tipoDocumento = document.getElementById("tipoDocumento").value;
    numeroDocumento = document.getElementById("numeroDocumento").value;

    validar(edad);
});

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


