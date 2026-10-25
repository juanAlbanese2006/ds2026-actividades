import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { apiFetch } from '../services/api';

// Schema de validación (podés importarlo de schemas si ya lo tenés)
const libroSchema = z.object({
  titulo: z.string().min(1, 'El título es obligatorio'),
  autor: z.string().min(1, 'El autor es obligatorio'),
  precio: z.number().positive('El precio debe ser mayor a 0'),
  imagen: z.string().url('Debe ser una URL válida'),
  disponible: z.boolean(),
});

type LibroForm = z.infer<typeof libroSchema>;

function LibroNuevo() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LibroForm>({
    resolver: zodResolver(libroSchema),
  });

  const onSubmit = async (data: LibroForm) => {
    setError(null);
    try {
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify({
          titulo: data.titulo,
          precio: data.precio,
          imagen: data.imagen,
          disponible: data.disponible,
          autorId: 1, // ⚠️ Por ahora hardcodeado, después lo cambiás
        }),
      });
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear el libro');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control {...register('titulo')} />
        {errors.titulo && <small className="text-danger">{errors.titulo.message}</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" {...register('precio', { valueAsNumber: true })} />
        {errors.precio && <small className="text-danger">{errors.precio.message}</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Imagen (URL)</Form.Label>
        <Form.Control {...register('imagen')} />
        {errors.imagen && <small className="text-danger">{errors.imagen.message}</small>}
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Disponible" {...register('disponible')} />
      </Form.Group>

      <Button type="submit" variant="primary">Crear libro</Button>
    </Form>
  );
}

export default LibroNuevo;