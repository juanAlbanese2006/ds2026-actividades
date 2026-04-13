const nombre = 'juan' ;
const edad = 20 ;
const materia = 'Ds' ;

console.log(`Me llamo ${nombre}, tengo ${edad} años y curso ${materia}`);

let contador = 0;

// Usamos un bucle for para sumarle 1 tres veces
for (let i = 0; i < 3; i++) {
    contador = contador +1;
    console.log (`contador es ${contador}`);
}

// Mostramos el valor final
console.log("El valor final del contador es:", contador);