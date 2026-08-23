import { Container, Row, Col } from 'react-bootstrap';
import BookCard from '../components/BookCard';

const Catalogo = () => (
  <Container className="my-5">
    <h1>📚 Catalogo de Libros</h1>
        <Row>
          <Col md={4}>
            <BookCard title="Harry Potter" author="J.K. Rowling" precio={1000} />
          </Col>
          <Col md={4}>
            <BookCard title="El Señor de los Anillos" author="J.R.R. Tolkien" precio={1000} />
          </Col>
          <Col md={4}>
            <BookCard title="Cien Años de Soledad" author="Gabriel García Márquez" precio={1000} />
          </Col>
        </Row>
  </Container>
);

export default Catalogo;

