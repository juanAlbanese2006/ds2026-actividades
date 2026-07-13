importar  express  de  "express" ;

const  app  =  express ( ) ;
const  PUERTO  =  3000 ;

aplicación.obtener ( "/ " , ( _req , res ) = > {    
  res . json ( {  mensaje : "API de la Librería — ¡hola desde un contenedor! 🐳"  } ) ;
} ) ;

aplicación.listen ( PUERTO , ( ) = > {​   
  consola . log ( `Servidor escuchando en http://localhost: ${ PORT } ` ) ;
} ) ;