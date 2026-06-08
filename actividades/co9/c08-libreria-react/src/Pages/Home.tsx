import { Container, Row, Col } from 'react-bootstrap';
import BookCard from '../components/BookCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <Navbar />
      <Container className="my-5">
        <h1>📚 Librería</h1>
        <Row>
          <Col md={4}>
            <BookCard title="Harry Potter" author="J.K. Rowling" />
          </Col>
          <Col md={4}>
            <BookCard title="El Señor de los Anillos" author="J.R.R. Tolkien" />
          </Col>
          <Col md={4}>
            <BookCard title="Cien Años de Soledad" author="Gabriel García Márquez" />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
