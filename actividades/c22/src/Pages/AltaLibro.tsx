import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const AltaLibro = () => {
  // 1. Creamos un único estado (objeto) para guardar los datos del libro.
  // Empezamos con los campos vacíos.
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    precio: ''
  });

  // 2. Función mágica e intuitiva para capturar lo que el usuario escribe.
  // Cada vez que alguien escribe en un input, esta función se ejecuta.
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Actualizamos el estado de forma inmutable (copiamos lo anterior y cambiamos solo el campo actual)
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 3. Qué pasa cuando el usuario hace clic en "Guardar"
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue por defecto

    // Validación súper simple (Nivel 1): que no haya campos vacíos
    if (!formData.title || !formData.author || !formData.precio) {
      alert('⚠️ Por favor, completá todos los campos.');
      return;
    }

    // Si todo está bien, mostramos los datos por consola (en el Nivel 2 o en el TP acá se mandaría al estado global o API)
    console.log('¡Libro creado con éxito!', formData);
    alert(`🎉 Libro agregado: ${formData.title}`);
    
    // Limpiamos el formulario
    setFormData({ title: '', author: '', precio: '' });
  };

  return (
    <Container className="my-5" style={{ maxWidth: '500px' }}>
      <h2>➕ Alta de Nuevo Libro</h2>
      <hr />
      
      <Form onSubmit={handleSubmit}>
        {/* Campo Título */}
        <Form.Group className="mb-3" controlId="formTitulo">
          <Form.Label>Título del Libro</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: El Aleph"
            name="title"            // IMPORTANTE: Tiene que coincidir con la clave del useState
            value={formData.title}  // El input muestra lo que dice el estado (Controlado)
            onChange={handleChange} // Cuando cambia, actualiza el estado
          />
        </Form.Group>

        {/* Campo Autor */}
        <Form.Group className="mb-3" controlId="formAutor">
          <Form.Label>Autor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Jorge Luis Borges"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Campo Precio */}
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio ($)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 4500"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">
          Guardar Libro
        </Button>
      </Form>
    </Container>
  );
};

export default AltaLibro;