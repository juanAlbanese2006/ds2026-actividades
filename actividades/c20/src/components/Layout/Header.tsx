import { Navbar, Nav, Container, Button, NavbarText } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header() {
  const { usuario, logout, tieneRol } = useAuth();
  const navigate = useNavigate();

  const manejarSesion = () => {
    if (usuario) {
      logout();
      navigate('/');
    } else {
      navigate('/login');
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={NavLink} to="/">Librería</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">Catálogo</Nav.Link>
            {tieneRol('ADMIN') && (
              <Nav.Link as={NavLink} to="/libros/nuevo">Nuevo libro</Nav.Link>
            )}
          </Nav>
          <Nav>
            {usuario && (
              <NavbarText className="me-3">Hola, {usuario.nombre}</NavbarText>
            )}
            <Button variant="outline-light" onClick={manejarSesion}>
              {usuario ? 'Salir' : 'Ingresar'}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;