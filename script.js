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

const riesgo1 = 0.522;
const riesgo2 = 1.044;
const riesgo3 = 2.436;
const riesgo4 = 4.350;
const riesgo5 = 6.960;


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
    } else if (18 <= edad < 25) {
        esUsuarioBenerficiarioPorCotizante();
    } else if (edad <= 60) {
        pension();
    } else {
        salaraio();
    }
}