// Catalogo.tsx
import { Container, Row, Col } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import type { BookCardProps } from '../Types/BookCard';

interface Props {
  libros: BookCardProps[];
}

const Catalogo = ({ libros }: Props) => (
  <Container className="my-5">
    <h1>📚 Catálogo de Libros</h1>
    <Row>
      {libros.map((libro, index) => (
        <Col md={4} key={index}>
          <BookCard title={libro.title} author={libro.author} precio={libro.precio} />
        </Col>
      ))}
    </Row>
  </Container>
);

export default Catalogo;
