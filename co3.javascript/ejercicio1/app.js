const nombre = 'juan' ;
const edad = 20 ;
const materia = 'Ds' ;

console.log(`Me llamo ${nombre}, tengo ${edad} años y curso ${materia}`);

let contador = 0;
for (let i = 0; i < 3; i++) {
    contador = contador +1;
    console.log (`contador es ${contador}`);
}

console.log("El valor final del contador es:", contador);

function clasificacionNota ( nota ){
    if (nota < 4 ) {return "desaprobado";}
    else if (nota >= 4 && nota <= 7 ) { return "aprobado";}
    else if (nota >= 8 && nota <=10){return "promocionado";}
    else {return "nota invalida";}

}

console.log(clasificacionNota(11));
console.log(clasificacionNota(1));
console.log(clasificacionNota(5));
console.log(clasificacionNota(9));

function diaDeLaSemana (numero) {
    switch (numero){
        case 1:
            return "lunes";
        case 2:
            return "martes";
        case 3:
            return "miercoles";
        case 4:
            return "jueves";
        case 5:
            return "viernes";
        case 6:
            return "sabado (Fin de semana)";
        case 7:
            return "domingo (Fin de semana)";
        default:
            return "dia invalido";
    }
}

console.log(diaDeLaSemana (1));
console.log(diaDeLaSemana (6));
console.log(diaDeLaSemana (8));

function calcularPrecioFinal (monto, medioPago){
    if (monto <= 200){return `monto ${monto}| pago ${medioPago} | final ${monto}`;}
    else if (monto > 200 && monto < 400){
        if (medioPago == "E") {return `monto ${monto}| pago ${medioPago} | final ${monto * 0.7}`;}
        else if (medioPago == "D") {return `monto ${monto}| pago ${medioPago} | final ${monto * 0.8}`;}
        else if (medioPago == "C") {return `monto ${monto}| pago ${medioPago} | final ${monto * 0.9}`;}
    } else if (monto >= 400){return `monto ${monto}| pago ${medioPago} | final ${monto * 0.6}`; }
}


console.log(calcularPrecioFinal(200, "E"));
console.log(calcularPrecioFinal(300, "D"));
console.log(calcularPrecioFinal(300, "E"));
console.log(calcularPrecioFinal(300, "C"));
console.log(calcularPrecioFinal(500, "D"));