import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const LibroDetalle = () => {
  const { id } = useParams();

  return (
    <Container className="my-5">
      <h2>Detalles del Libro</h2>
      <p>Mostrando información del libro con ID: {id}</p>
    </Container>
  );
};

export default LibroDetalle;
