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
const ibcDOM = document.getElementById('ibc');
const auxilioTransporteDOM = document.getElementById('auxTransporte');
const saludDOM = document.getElementById('salud');
const fondoSolidaridadDOM = document.getElementById('fondoSolidaridad');
const pensionDOM = document.getElementById('pension');
const arlDOM = document.getElementById('arl');
const salarioDOM = document.getElementById('salarioRes');
const comisionesDOM = document.getElementById('comisionesRes');
const horasExtraDOM = document.getElementById('horasExtraRes');
const totalDedDOM = document.getElementById('totalDed');
const netoDOM = document.getElementById('neto');
const totalDevDom = document.getElementById('totalDev');


function validarCampos (valor, tipo, inputNombre) {
    if (tipo == "texto") {

        if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor.trim())) {
            return valor;
        }

        mensajes.push("No se permiten numeros en el campo de " + inputNombre);
        return null;
    }

    if (tipo == "number") {

        if (!isNaN(valor.trim()) && valor !== "") {
            return Number(valor.trim());
        }

        mensajes.push("Solo se permiten numeros en el campo de " + inputNombre);
        return null;
    }
}


formDatosGenerales.addEventListener('submit', (event) => {
    event.preventDefault();

    nombre = validarCampos(document.getElementById('nombre').value,"texto","nombre");
    edad = parseInt(validarCampos(document.getElementById('edad').value,"number", "edad"));
    tipoDocumento = validarCampos(document.getElementById('tipoDocumento').value,"texto", "tipo de documento");
    numeroDocumento = validarCampos(document.getElementById('numeroDocumento').value, "number", "numero de documento");
    
    erroresDOM.innerHTML = "";
    
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
    
    if (edad >= 60) {
        console.log('d')
        salario = validarCampos(document.getElementById('salario').value, "number", "salario");
    } else {
        salario = validarCampos(document.getElementById('salario').value, "number", "salario");
        comisiones = validarCampos(document.getElementById('comisiones').value, "number", "comisiones");
        totalHorasExtras = validarCampos(document.getElementById('horasExtra').value, "number", "horas extra");
        nivelRiesgo = validarCampos(document.getElementById('nivelRiesgo').value,"number", "nivel de riesgo");

        if (salario < 100000 || 99999999 < salario) {
            mensajes.push("Salario" + mensajesDeError[2] + "100000 a 99999999")
        } 
        if (comisiones < 1000 || 99999999 < comisiones) {
                mensajes.push("Comisiones" + mensajesDeError[2] + "1000 a 99999999")
        } 
        if (totalHorasExtras < 1000 || 50000000 < totalHorasExtras) {
                mensajes.push("Horas extra" + mensajesDeError[2] + "1000 a 50000000")
        } 
    }

    erroresDOM.innerHTML = "";
    

     if(mensajes.length > 0){
            erroresDOM.style.display = 'block';
            mensajes.forEach(m => {
                let newLi = document.createElement("li");
                newLi.innerHTML = m
                erroresDOM.appendChild(newLi);
            });
        } else  {
            if (edad >= 60) {
                
        console.log('e')
                calcularPension(salario)
            } else {
                calcular(salario, comisiones, totalHorasExtras, nivelRiesgo)
            }
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
        formDatosSalariales.style.display = 'flex';
        formDatosSalariales.innerHTML = `<label for="salario">Salario</label>
                <input type="text" id="salario" name="salario" placeholder="4000000" minlength="6" maxlength="8" required>
                <button type="submit">Enviar</button>`
        resultadosDOM.style.display = 'block'
    } else {
        formDatosGenerales.style.display = 'none';
        formDatosSalariales.style.display = 'flex';
    }
        
}


function calcular(salarioCalculo, comision, horasExtras, riesgo) {
    salarioCalculo = Number(salarioCalculo);
    comision = Number(comision);
    horasExtras = Number(horasExtras);

    let ibc =  calcularPorcentaje(salarioCalculo + comision + horasExtras, 0.7)
    let calculoAuxilioTransporte = salarioCalculo < 2 * salarioMinimo? auxilioTransporte : 0
    let calculoSalud = calcularPorcentaje(ibc, porcentajeSalud)
    let calculoFondoSolidaridad = ibc >= 4 * salarioMinimo? calcularPorcentaje(ibc, porcentajeFondoSolidaridad) : 0
    let calculoPension = calcularPorcentaje(ibc, porcentajePension) + calculoFondoSolidaridad
    let calculoArl = calcularPorcentaje(ibc, riesgos[parseInt(riesgo)]);

    salarioDOM.innerHTML = `<strong>Salario:</strong> $${salarioCalculo}`
    comisionesDOM.innerHTML = `<strong>Comisiones:</strong> $${comision}`
    horasExtraDOM.innerHTML = `<strong>Horas Extra:</strong> $${horasExtras}`
    
    ibcDOM.innerHTML = `<strong>IBC:</strong> $${Math.floor(ibc)}`
    auxilioTransporteDOM.innerHTML = `<strong>Auxilio de transporte:</strong> $${calculoAuxilioTransporte}`
    saludDOM.innerHTML = `<strong>Salud:</strong> $${Math.floor(calculoSalud)}`
    fondoSolidaridadDOM.innerHTML = `<strong>Fondo solidaridad:</strong> $${Math.floor(calculoFondoSolidaridad)}`
    pensionDOM.innerHTML = `<strong>Pensión:</strong> $${Math.floor(calculoPension)}`
    arlDOM.innerHTML = `<strong>ARL:</strong> $${Math.floor(calculoArl)}`

    totalDevDom.innerHTML = `<strong>Total devengado (Salario + Comisiones + Horas extra):</strong> $${salarioCalculo + comision + horasExtras}` 
    totalDedDOM.innerHTML = `<strong>Total deducciones:</strong> $${Math.floor(calculoSalud + calculoPension + calculoArl)}`
    netoDOM.innerHTML = `<strong>Ingreso neto (Total devengado + auxilio de transporte - deducibles):</strong> $${salarioCalculo + comision + horasExtras - Math.floor(calculoSalud + calculoPension + calculoArl)}`

    resultadosDOM.style.display = 'flex'

}

function calcularPension(salarioCalculo) {
    salarioCalculo = Number(salarioCalculo);

    let ibc =  calcularPorcentaje(salarioCalculo, 0.7)
    let calculoSalud = calcularPorcentaje(ibc, porcentajeSalud)
    let calculoFondoSolidaridad = ibc >= 4 * salarioMinimo? calcularPorcentaje(ibc, porcentajeFondoSolidaridad) : 0

    salarioDOM.innerHTML = `<strong>Salario:</strong> $${salarioCalculo}`
    
    ibcDOM.innerHTML = `<strong>IBC:</strong> $${Math.floor(ibc)}`
    saludDOM.innerHTML = `<strong>Salud:</strong> $${Math.floor(calculoSalud)}`
    fondoSolidaridadDOM.innerHTML = `<strong>Fondo solidaridad:</strong> $${Math.floor(calculoFondoSolidaridad)}`

    totalDevDom.innerHTML = `<strong>Total devengado (Salario + Comisiones + Horas extra):</strong> $${salarioCalculo}` 
    totalDedDOM.innerHTML = `<strong>Total deducciones:</strong> $${Math.floor(calculoSalud)}`
    netoDOM.innerHTML = `<strong>Ingreso neto (Total devengado + auxilio de transporte - deducibles):</strong> $${salarioCalculo - Math.floor(calculoSalud)}`

    resultadosDOM.style.display = 'flex'

}


function calcularPorcentaje(base, porcentaje) {
    let resultado = base * porcentaje;

    return resultado;
}
