// App.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Catalogo from './Pages/Catalogo';
import LibroDetalle from './Pages/LibroDetalle';
import LibroNuevo from './Pages/LibroNuevo'; // 👈 nuevo import
import { useState } from 'react';
import type { BookCardProps } from './Types/BookCard';

function App() {
  // Estado inicial con 3 libros
  const [libros, setLibros] = useState<BookCardProps[]>([
    { title: "Harry Potter", author: "J.K. Rowling", precio: 1000 },
    { title: "El Señor de los Anillos", author: "J.R.R. Tolkien", precio: 1000 },
    { title: "Cien Años de Soledad", author: "Gabriel García Márquez", precio: 1000 },
  ]);

  // Función para agregar un libro
  const agregarLibro = (nuevo: BookCardProps) => {
    setLibros([...libros, nuevo]); // inmutabilidad: copia + nuevo
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo libros={libros} />} />
        <Route path="/libros/:id" element={<LibroDetalle />} />
        <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} />
      </Routes>
    </Layout>
  );
}

export default App;
