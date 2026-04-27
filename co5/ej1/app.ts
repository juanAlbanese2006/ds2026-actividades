interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}

async function obtenerUsuarios(): Promise<Usuario[]> {
    try { const respuesta = await fetch ('https://jsonplaceholder.typicode.com/users') ;
        if (!respuesta.ok) { 
     throw new Error(`HTTP ${respuesta.status}`); 
        } 
        const usuario: Usuario[] = await respuesta.json();
        return usuario
     } catch (error){
        console.error('error al obtener usuario:', error);
        return [];
     }
}

obtenerUsuarios().then(usuarios => {
  mostrar(usuarios);
});


function mostrar ( usuarios: Usuario[]): void {
    usuarios.forEach(usuario => {
        const listado = document.getElementById("listado") as HTMLElement;
        const li = document.createElement("li");
    li.textContent = `${usuario.name} - ${usuario.email}`;
    listado.appendChild(li);
    });
}