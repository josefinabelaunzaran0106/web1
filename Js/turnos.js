"use strict";
//Funcionalidad Captcha

//funcion Random
function random_captcha() {
    return Math.floor(Math.random() * 9);
}

//Captcha elegido por Random
let captcha_elegido = random_captcha();
let imagenes_captcha = ["2A2X", "2A5R", "2A98", "2AEF", "2APC", "2AQ7", "2BK3", "2BLG", "2BN9", "2BTX"];

//Recarga la pagina y llama a la función elige captcha
addEventListener("load", elige_captcha);

//Escucha boton y llama a funcion elige captcha
document.querySelector("#cambia-captcha").addEventListener("click", elige_captcha)

//Escucha boton y llama funcion verificar captcha
document.querySelector("#boton-verificar").addEventListener("click", verificar_captcha)

//Funcion verificar captcha
function verificar_captcha() {
    let codigo_ingresado = document.querySelector("#codigo-ingresado").value;
    if (codigo_ingresado === imagenes_captcha[captcha_elegido]) {
        document.querySelector("#mensaje-captcha").innerHTML = "Codigo correcto, presione enviar";
        /*Verifico coincidencia y habilito "enviar", sacandole estilo "none"*/
        document.querySelector("#boton-oculto").classList.remove("boton-oculto");
    }
    else {
        document.querySelector("#mensaje-captcha").innerHTML = "Codigo incorrecto, intente nuevamente";
        document.querySelector("#boton-oculto").classList.add("boton-oculto");
    }
}

//Funcion elige captcha
function elige_captcha() {
    document.querySelector("#boton-oculto").classList.add("boton-oculto");
    document.querySelector("#mensaje-captcha").innerHTML = " ";
    captcha_elegido = random_captcha();
    document.querySelector("#img-captcha").src = "images/captcha/" + captcha_elegido + ".jpg";
}

//Tabla y formulario

//Para mostrar los datos, una vez registrado en el form
let datosPaciente = document.querySelector("#datos-paciente");
//Tabla dinámida para ver y modificar los turnos
let tablaTurnos = document.querySelector("#tabla-turnos");
//Para mostrar horario de atencion de cada medico
let opcionHorarios = document.querySelector("#opcionHorario");
//Arreglos de objetos json horarios segun medico
let doctores = [{
    "medico": "Dr. Julio Garcia",
    "horario": "Lunes de 10 a 13 hs; Miercoles de 14 a 18 hs; y Viernes de 10 a 13 hs"
},
{
    "medico": "Dra. Sofia Rodriguez",
    "horario": "Lunes de 14 a 17 hs; Miercoles de 10 a 14 hs; y Viernes de 10 a 14 hs"
},
{
    "medico": "Dr. Juan Martinez",
    "horario": "Lunes de 10 a 14 hs; Miercoles de 10 a 14 hs; y Viernes de 10 a 14 hs"
},
{
    "medico": "Dr. Pablo Gomez",
    "horario": "Martes de 10 a 14 hs y Jueves de 10 a 14 hs"
},
{
    "medico": "Dra. Julia Gonzalez",
    "horario": "Martes 14.3 a 18 hs y Jueves de 14.3 a 18 hs"
},
{
    "medico": "Dr. Manuel Garcia",
    "horario": "Lunes de 15 a 18 hs; Miercoles de 15 a 18 hs; y Viernes de 15 a 18 hs"
}
]
//Escuchamos el evento submit del form
let form = document.querySelector('#form');
form.addEventListener("submit", agregar);
function agregar(e) {
    e.preventDefault();
    let formData = new FormData(form);
    let nombreApellido = formData.get("nombreApellido");
    let dni = formData.get("dni");
    let nombreObraSocial = formData.get("nombreObraSocial");
    let telefono = formData.get("telefono");
    //muestro por consola el contenido de los inputs
    console.log(nombreApellido, dni, nombreObraSocial, telefono);
    //Oculto formulario
    document.querySelector("#solicitud-turnos").classList.remove("solicitud-turnos");
    document.querySelector("#solicitud-turnos").classList.add("tabla-oculta");
    //Muestro tabla dinamica
    document.querySelector("#tabla-oculta").classList.remove("tabla-oculta");
    document.querySelector("#tabla-oculta").classList.add("mostrar-tabla");
    //bienvenida al paciente previo a sacar el turno
    let bienvenida = document.querySelector(".bienvenido");
    bienvenida.innerHTML = "Bienvenido/a, " + nombreApellido;
}
//creamos arreglo vacio
let reserva = [];
//escucho los clikcs y llamo funcion anomima para ejecutar funciones
document.querySelector("#btn-unTurno").addEventListener("click", function (e) {
    agregarTurnos(1)
});
document.querySelector("#btn-dosTurnos").addEventListener("click", function (e) {
    agregarTurnos(2)
});
document.querySelector("#btn-tresTurnos").addEventListener("click", function (e) {
    agregarTurnos(3)
});
document.querySelector("#btn-borrarUltimo").addEventListener("click", borrarUltimo);
document.querySelector("#btn-borrarTodos").addEventListener("click", borrarTodos);
document.querySelector("#btn-mostrarHorario").addEventListener("click", mostrarHorarios);
//muestra los horarios de cada medico segun el arreglo "doctores" cargado mas arriba
function mostrarHorarios() {
    opcionHorarios.innerHTML = doctores[document.querySelector("#doctor").value].horario;
}
//funciones tabla dinamica:
//agrega turnos con parametro cantidad segun boton
function agregarTurnos(cant) {
    let doctor = doctores[document.querySelector("#doctor").value].medico;
    let horario = document.querySelector("#dia").value;
    if (horario === "") {
        document.querySelector("#mensajeDia").innerHTML = "Ingrese un dia y horario";
    }
    else {
        let reservaNueva = {
            "medico": doctor,
            "horario": horario,
            "cantidad": cant,
        }
        reserva.push(reservaNueva);
        mostrarTurnos();
    }
}
//borra última fila de la tabla
function borrarUltimo() {
    reserva.pop();
    mostrarTurnos();
}
//borra toda la tabla
function borrarTodos() {
    reserva = [];
    mostrarTurnos();
}
//elimina fila seleccionada obtiene el parametro (indice del arreglo) luego de recorrer "escuchar todos los botones"
function eliminarTurnos(i) {
    reserva.splice(i, 1)
    mostrarTurnos();
}
//muestra las reservas creando una lista 
function mostrarTurnos() {
    //imprime tabla de objetos
    console.table(reserva);
    //limpio lo cargado anteriormente
    tablaTurnos.innerHTML = " ";
    //recorro el arreglo reserva con un indice "turnos"
    for (let turnos of reserva) {
        tablaTurnos.innerHTML += `
                                        <tr>
                                            <td>
                                                ${turnos.medico}
                                            </td>
                                            <td>
                                                ${turnos.horario} hs
                                            </td>
                                            <td>
                                                ${turnos.cantidad}
                                            </td>
                                            <td>
                                                <button type="button" class="btn-eliminar">Eliminar</button>
                                            </td>
                                        </tr>`;
    }
    //escucha todos los botones de las filas para eliminar una fila
    let btns = document.querySelectorAll(".btn-eliminar");
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) {
            eliminarTurnos(i);
        });
    }
}