interface LibroOL {
    title: string;
    author_name?: string[];
    first_publish_year?: number;
}

async function buscarLibros(imput: string): Promise<LibroOL[]> {
    try {
        const respuesta = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(imput)}`);
        if (!respuesta.ok) {
            throw new Error(`HTTP ${respuesta.status}`);
        }
        const data = await respuesta.json();
        return data.docs as LibroOL[];
    } catch (error) {
        console.error("Error al buscar libros:", error);
        throw error;
    }
}

function mostrarLibros(libros: LibroOL[]): void {
    const resultados = document.getElementById("resultados") as HTMLElement;

    libros.slice(0, 10).forEach(libro => {
        const card = document.createElement("div");
        card.className = "card";

        const titulo = document.createElement("h3");
        titulo.textContent = libro.title;

        const autor = document.createElement("p");
        autor.textContent = libro.author_name ? `Autor: ${libro.author_name.join(", ")}` : "Autor desconocido";

        const anio = document.createElement("p");
        anio.textContent = libro.first_publish_year ? `Año: ${libro.first_publish_year}` : "Año no disponible";

        card.appendChild(titulo);
        card.appendChild(autor);
        card.appendChild(anio);

        resultados.appendChild(card);
    });
}

// --- Eventos ---
const boton = document.getElementById("buscar") as HTMLElement;
const input = document.getElementById("imput") as HTMLElement;
const errorMensaje = document.getElementById("error") as HTMLElement;

boton.addEventListener("click", () => {
const texto = (input as HTMLInputElement).value.trim();
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
