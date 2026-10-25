// Navbar.tsx
import { Navbar as BsNavbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <BsNavbar bg="dark" variant="dark">
    <Container>
      <BsNavbar.Brand as={Link} to="/">📚 Librería</BsNavbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
        <Nav.Link as={Link} to="/libros/nuevo">Nuevo Libro</Nav.Link>
      </Nav>
    </Container>
  </BsNavbar>
);

export default Navbar;

