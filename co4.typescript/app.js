"use strict";
const inputProducto = document.getElementById("producto");
const btnAgregar = document.getElementById("btnAgregar");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
function actualizarContador() {
    const cantidad = lista.children.length;
    contador.textContent = `${cantidad} productos en la lista`;
}
function agregarProducto() {
    const nombre = inputProducto.value.trim();
    const li = document.createElement("li");
    li.textContent = nombre;
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.addEventListener("click", () => {
        lista.removeChild(li);
        actualizarContador();
    });
    li.appendChild(btnEliminar);
    lista.appendChild(li);
    actualizarContador();
    inputProducto.value = ""; // Limpia el input después de agregar
}
btnAgregar.addEventListener("click", agregarProducto);
