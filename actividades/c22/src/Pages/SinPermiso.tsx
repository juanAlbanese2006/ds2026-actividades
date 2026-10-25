import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SinPermiso() {
  return (
    <div className="container py-5" style={{ maxWidth: 600 }}>
      <Alert variant="warning">
        <h4>No tenés permiso</h4>
        <p>No podés acceder a esta página con tu rol actual.</p>
        <Link to="/" className="btn btn-primary">Volver al catálogo</Link>
      </Alert>
    </div>
  );
}

export default SinPermiso;