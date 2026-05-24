import { Navbar as BsNavbar, Container } from 'react-bootstrap';

const Navbar = () => (
  <BsNavbar bg="dark" variant="dark">
    <Container>
      <BsNavbar.Brand href="#">📚 Librería</BsNavbar.Brand>
    </Container>
  </BsNavbar>
);

export default Navbar;
