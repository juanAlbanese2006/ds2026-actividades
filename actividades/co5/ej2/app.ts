// definimos Usuario
interface Usuario {
    id: number;
    name: string;
    email: string;
    phone: string;
}


async function obtenerUsuarios(): Promise<Usuario[]> {
    try { const respuesta = await fetch ('https://jsonplaceholder.typicode.com/users') ; //obtenemos los usuarios del link con fetch y lo guardamos en una constante "respuesta"//
        if (!respuesta.ok) { 
            throw new Error(`HTTP ${respuesta.status}`); 
            } //informamos de rror//
        const usuario: Usuario[] = await respuesta.json(); //espera que termine de buscar los usuarios (con await) y los guarda en un arreglo (Usuarios[])//
        return usuario
    } catch (error){
        console.error('error al obtener usuario:', error);// informamos de error si no se cumplio con la promesa//
        return []; //retorna el arreglo 
    }
}

//luego de obtener el arreglo de usuarios llama a la funcion mostrar
obtenerUsuarios().then(usuarios => {
    mostrar(usuarios);
});


function mostrar ( usuarios: Usuario[]): void //pasa por parametro el arreglo de usuarios
{
    usuarios.forEach(usuario => //por cada usuario en usuarios (parametro)
        {
        const listado = document.getElementById("listado") as HTMLElement; //obtiene el elemento con id listado
        const li = document.createElement("li"); //crea un elemento li y lo guarda en una constante li
    li.textContent = `${usuario.name} - ${usuario.email}`; //carga los datos de el elemento li creado
    listado.appendChild(li); // conecta el listado con el ultimo elemento li 
    });
}

//para manejar los elementos con id "cargando" y "error" los guarda en una constante 
const cargando = document.getElementById("cargando") as HTMLElement ;
const error = document.getElementById("error") as HTMLElement ;

cargando.style.display = "line" //mostrar cargando

obtenerUsuarios()
    .then(usuarios =>{
        mostrar(usuarios);
        cargando.style.display = "none";
    })
    .catch(() => {
        cargando.style.display = "none" ;
        error.style.display="line"
    })