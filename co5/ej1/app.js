"use strict";
async function obtenerUsuarios() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const usuario = await response.json();
        return usuario;
    }
    catch (error) {
        console.error('error al obtener usuario:', error);
        return [];
    }
}
obtenerUsuarios().then(usuarios => {
    mostrar(usuarios);
});
function mostrar(usuarios) {
    usuarios.forEach(usuario => {
        const listado = document.getElementById("listado");
        const li = document.createElement("li");
        li.textContent = `${usuario.name} - ${usuario.email}`;
        listado.appendChild(li);
    });
}
