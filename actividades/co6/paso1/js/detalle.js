async function cargarDetalle() {
const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // ej: /works/OL12345W
if (!id) return;

try {
    const respuesta = await fetch(`https://openlibrary.org${id}.json`);
    const data = await respuesta.json();

    // Portada
    const cover = data.covers 
    ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
    : "descarga.png";

    document.getElementById("cover").src = cover;
    document.getElementById("title").textContent = data.title || "Título desconocido";

    // Autor
    if (data.authors && data.authors.length > 0) {
      // Necesitamos pedir el nombre del autor con otra consulta
    const autorResp = await fetch(`https://openlibrary.org${data.authors[0].author.key}.json`);
    const autorData = await autorResp.json();
    document.getElementById("author").textContent = "Autor: " + autorData.name;
    } else {
    document.getElementById("author").textContent = "Autor desconocido";
    }

    // Descripción
    if (data.description) {
    document.getElementById("description").textContent =
        typeof data.description === "string" ? data.description : data.description.value;
    } else {
    document.getElementById("description").textContent = "Sin descripción disponible.";
    }
} catch (error) {
    console.error("Error cargando detalle:", error);
}
}

cargarDetalle();
