import { Spinner, Alert } from 'react-bootstrap';
import LibroCard from '../components/BookCard';
import useFetch from '../hooks/useFetch';
import type { LibroCardProps } from '../Types/BookCard';

function Catalogo() {
  const { data: libros, loading, error } = useFetch<LibroCardProps[]>('/libros');

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="grid-libros">
      {(libros ?? []).map((libro: LibroCardProps) => (
        <LibroCard key={libro.id} {...libro} />
      ))}
    </div>
  );
}

export default Catalogo;