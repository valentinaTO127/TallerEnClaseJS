//valores ingresados por elusuario
let nombre = ""
let edad = 0
let tipoDocumento = ""
let numeroDocumento = ""

//valores ingresados por elusuario sobre el salario
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

const mensajesDeError =  [
    "No se permiten numeros en este campo", 
    "Solo se permiten numeros en este campo",
    " debe estar entre un rango de "
]

let mensajes = []

// DOM
const formDatosSalariales = document.getElementById('datosSalariales');
const formDatosGenerales = document.getElementById('datosGenerales');
const erroresDOM = document.getElementById('errores');
const resultadosDOM = document.getElementById('resultados');
const resultadosParrafoDOM = document.getElementById('resultadosP');



function validarCampos (valor, tipo) {
    let condition = tipo == "texto"? isNaN(valor) : !isNaN(valor);
        if (condition) {
            return valor
            
        } else {
            if (tipo == "texto") {
                mensajes.push(mensajesDeError[0])
            } else{
                mensajes.push(mensajesDeError[1])
            }
     
        }
}


formDatosGenerales.addEventListener('submit', (event) => {
    event.preventDefault();

    nombre = validarCampos(document.getElementById('nombre').value,"texto");
    edad = parseInt(validarCampos(document.getElementById('edad').value,"number"));
    tipoDocumento = validarCampos(document.getElementById('tipoDocumento').value,"texto");
    numeroDocumento = validarCampos(document.getElementById('numeroDocumento').value, "number");
    
    let borrarLis = document.querySelectorAll("li")
    borrarLis.forEach(li => {
        li.remove()
    })
    
        if (edad < 1 || 130 < edad) {
            mensajes.push("Edad" + mensajesDeError[2] + "1 a 130")
        } 
    
        if(mensajes.length > 0){
            erroresDOM.style.display = 'block';
            mensajes.forEach(m => {
                let newLi = document.createElement("li");
                newLi.innerHTML = m
                erroresDOM.appendChild(newLi);
            });
        } else  {
            show()
        }

        console.log(nombre, edad, numeroDocumento)
        
     mensajes = []
})



formDatosSalariales.addEventListener('submit', (event) => {
    event.preventDefault();

    salario = validarCampos(document.getElementById('salario').value, "number");
    comisiones = validarCampos(document.getElementById('comisiones').value, "number");
    totalHorasExtras = validarCampos(document.getElementById('horasExtra').value, "number");
    nivelRiesgo = validarCampos(document.getElementById('nivelRiesgo').value,"number");

     if(mensajes.length > 0){
            erroresDOM.style.display = 'block';
            mensajes.forEach(m => {
                let newLi = document.createElement("li");
                newLi.innerHTML = m
                erroresDOM.appendChild(newLi);
            });
        } else  {
            calculos(salario, comisiones, totalHorasExtras, nivelRiesgo)
        }

        
     mensajes = []

})


function show() {
    if (edad < 18) {
        resultadosDOM.style.display = 'block'
        resultadosDOM.innerHTML = "Usted es menor de edad, por lo tanto no puede seguir con el siguiente paso"
    } else if (18 <= edad && edad< 25) {
        resultadosDOM.style.display = 'block'
        resultadosDOM.innerHTML = "Usted clasifica como usuario beneeficiario por cotizante, por lo tanto no puede seguir con el siguiente paso"
    } else if (edad >= 60) {
        formDatosGenerales.style.display = 'none';
        formDatosSalariales.style.display = 'block';
        document.getElementById('comisiones').style.display = 'none';
        document.getElementById('horasExtra').style.display = 'none';
        document.getElementById('nivelRiesgo').style.display = 'none';
        resultadosDOM.style.display = 'block'
        resultadosDOM.innerHTML = "Usted es mayor de 60 años y por lo tanto se le hara unicamente el calculo de pension"
    } else {
        formDatosGenerales.style.display = 'none';
        formDatosSalariales.style.display = 'block';
    }
        
}

function validar(edad) {
    
}


function calculos(salarioCalculo, comision, horasExtras, riesgo) {
    let ibc =  calcularPorcentaje((salarioCalculo + comision + horasExtras), 0.7)
    let calculoAuxilioTransporte = salarioCalculo < 2 * salarioMinimo? auxilioTransporte : 0
    let calculoSalud = calcularPorcentaje(ibc, porcentajeSalud)
    let calculoFondoSolidaridad = calcularPorcentaje(ibc, porcentajeFondoSolidaridad)
    let calculoPension = ibc >= 4 * salarioMinimo? calcularPorcentaje(ibc, porcentajePension + calculoFondoSolidaridad) : calcularPorcentaje(ibc, porcentajePension)
    let calculoArl = calcularPorcentaje(ibc, riesgos[parseInt(riesgo)]);

    resultadosParrafoDOM.innerHTML = `IBC: ${ibc}\nAuxilio de transporte: ${calculoAuxilioTransporte}\nSalud: ${calculoSalud}\nFondo solidaridad: ${calculoFondoSolidaridad} \nPension: ${calculoPension}\nNivel de riesgo: ${calculoArl}`
    resultadosDOM.style.display = 'block'
}


function calcularPorcentaje(base, porcentaje) {
    let resultado = base * porcentaje;

    return resultado;
}
