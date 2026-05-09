"use strict";
// Catálogo inicial
const catalogo = [];
// Funciones
function buscarPorAutor(autor) {
    return catalogo.filter(libro => libro.autor.includes(autor));
}
function librosDisponibles() {
    return catalogo.filter(libro => libro.disponible);
}
function precioPromedio(libros) {
    if (libros.length === 0)
        return 0;
    const total = libros.reduce((acumulador, libro) => acumulador + libro.precio, 0);
    return total / libros.length;
}
function renderizar(libros) {
    const listado = document.getElementById("listado");
    const stats = document.getElementById("stats");
    listado.innerHTML = "";
    libros.forEach(libro => {
        const li = document.createElement("li");
        li.textContent = `${libro.titulo} - ${libro.autor} (${libro.precio} ARS) ${libro.disponible ? "✔️" : "❌"}`;
        listado.appendChild(li);
    });
    stats.textContent = `Cantidad: ${libros.length} | Precio promedio: ${precioPromedio(libros)} `;
}
// Enganchar botones
document.getElementById("filtrar")?.addEventListener("click", () => {
    const input = document.getElementById("filtroAutor").value;
    renderizar(buscarPorAutor(input));
});
document.getElementById("mostrarDisponibles")?.addEventListener("click", () => {
    renderizar(librosDisponibles());
});
document.getElementById("mostrarTodos")?.addEventListener("click", () => {
    renderizar(catalogo);
});
// Mostrar todos al cargar
renderizar(catalogo);
