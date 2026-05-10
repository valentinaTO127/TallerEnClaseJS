# TallerEnClaseJS

# Simulador de Nómina – Prestaciones Laborales Colombia 2026

## Descripción
Este proyecto es un **simulador de pago de prestaciones laborales** desarrollado en JavaScript/HTML/CSS.  
Permite calcular las obligaciones de ley en Colombia, incluyendo aportes a salud, pensión, ARL, fondo de solidaridad y retención en la fuente.  

El sistema valida la información del perfil del usuario (edad) y ajusta el cálculo según las condiciones establecidas en la normativa vigente.

---

## Funcionalidades principales
- **Ingreso de información básica:**
  - Nombre completo  
  - Edad  
  - Tipo y número de documento  

- **Validación de perfil:**
  - Menores de edad → no continúan  
  - Menores de 25 años → clasificados como “Usuario beneficiario por cotizante”  
  - Mayores de 60 años → solo cálculo de pensión  
  - Entre 25 y 59 años → cálculo completo de prestaciones  

- **Ingreso de información salarial:**
  - Salario  
  - Comisiones  
  - Horas extra  
  - Nivel de riesgo (I a V)  

- **Cálculo automático de obligaciones:**
  - Ingreso Base de Cotización (IBC)  
  - Auxilio de transporte (si aplica)  
  - Salud (4%)  
  - Pensión (4% + Fondo de Solidaridad si IBC ≥ 4 SMLV)  
  - ARL según nivel de riesgo

- **Resultados mostrados en pantalla:**
  - Salario (Ingresado por el usuario)  
  - IBC  
  - Comisiones (Ingresado por el usuario) 
  - Horas extra (Ingresado por el usuario)
  - Auxilio de transporte  
  - Total devengado
  - Deducciones (Salud, Pensión, Fondo de solidaridad, ARL)  
  - Total neto  

---

## Valores de referencia
- Salario mínimo legal vigente (SMLV): **$1,750,905**  
- Subsidio de transporte: **$249,095**  
- ARL según nivel de riesgo:  
  - Riesgo I (Mínimo): 0.522%  
  - Riesgo II (Bajo): 1.044%  
  - Riesgo III (Medio): 2.436%  
  - Riesgo IV (Alto): 4.350%  
  - Riesgo V (Máximo): 6.960%  

---

## Validaciones y mensajes de error
El sistema controla casos como:
- Texto en campos numéricos → “Solo se permiten números en este campo”  
- Campos vacíos → “Este campo es obligatorio”  
- Fuera de rango → “Campo debe estar entre X y Z años”  

---

## Tecnologías utilizadas
- **HTML5** para la estructura del formulario  
- **CSS** para estilos y animaciones  
- **JavaScript** para validaciones y cálculos  

---
