async function buscarLibros(input) {
    try {
        const respuesta = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(input)}`);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }
        const data = await respuesta.json();
        return data.docs;
    }
    catch (error) {
        console.error("Error al buscar libros:", error);
        throw error;
    }
}

function mostrarLibros(libros) {
    const resultados = document.getElementById("results");
    resultados.innerHTML = ""; 
    libros.slice(0, 6).forEach(libro => {
        // Si no hay portada, usamos un placeholder
        const cover = libro.cover_i 
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
            : "descarga.png";

        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${cover}" class="card-img-top" alt="Portada">
                    <div class="card-body">
                        <h5 class="card-title">${libro.title}</h5>
                        <p class="card-text">${libro.author_name ? libro.author_name[0] : "Autor desconocido"}</p>
                        <a href="libro.html" class="btn btn-primary">Ver más</a>
                    </div>
                </div>
            </div>
        `;
        resultados.innerHTML += card; // CORREGIDO
    });
}

// --- Eventos ---
const boton = document.getElementById("searchBtn");
const input = document.getElementById("searchInput");
const errorMensaje = document.getElementById("error");

boton.addEventListener("click", () => {
    const texto = input.value.trim();
    if (!texto) {
        errorMensaje.style.display = "block";
        errorMensaje.textContent = "El campo de búsqueda no puede estar vacío.";
        return;
    }
    errorMensaje.style.display = "none";
    buscarLibros(texto)
        .then(libros => mostrarLibros(libros))
        .catch(() => {
            errorMensaje.style.display = "block";
            errorMensaje.textContent = "Error al cargar resultados.";
        });
});





