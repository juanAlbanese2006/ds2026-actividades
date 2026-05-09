const inputProducto = document.getElementById("producto") as HTMLInputElement | null;
const btnAgregar = document.getElementById("btnAgregar") as HTMLButtonElement | null;
const lista = document.getElementById("lista") as HTMLUListElement | null;
const contador = document.getElementById("contador") as HTMLDivElement | null;

function actualizarContador(): void {
  if (!lista || !contador) return;
  const cantidad: number = lista.children.length;
  contador.textContent = `${cantidad} productos en la lista`;
}

function agregarProducto(): void {
  if (!inputProducto || !lista) return;

  const nombre: string = inputProducto.value.trim();
  if (!nombre) return; // Evita agregar vacíos

  const li: HTMLLIElement = document.createElement("li");
  li.textContent = nombre;

  const btnEliminar: HTMLButtonElement = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  btnEliminar.addEventListener("click", (): void => {
    lista.removeChild(li);
    actualizarContador();
  });

  li.appendChild(btnEliminar);
  lista.appendChild(li);
  actualizarContador();

  inputProducto.value = ""; // Limpia el input
}

btnAgregar?.addEventListener("click", agregarProducto);

