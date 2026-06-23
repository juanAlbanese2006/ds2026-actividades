// Pages/LibroNuevo.tsx
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import type { BookCardProps } from "../Types/BookCard";
import { libroSchema } from "../schemas/LibroSchemas";
import type { LibroValidado } from "../schemas/LibroSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

interface Props {
  onAgregar: (libro: BookCardProps) => void;
}

const LibroNuevo = ({ onAgregar }: Props) => {
  const navigate = useNavigate();

  // Configuración de React Hook Form con Zod
  type LibroValidado = z.infer<typeof libroSchema>;

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<LibroValidado>({
  resolver: zodResolver(libroSchema),
});


  // Función al enviar
  const onSubmit: Parameters<typeof handleSubmit>[0] = (data) => {
  onAgregar({
    title: data.title,
    author: data.author,
    precio: data.precio,
  });
  navigate("/catalogo");
};



  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="container py-4" style={{ maxWidth: 480 }}>
      <h2>Nuevo libro</h2>

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          {...register("title")}
          isInvalid={!!errors.title}
        />
        <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Autor</Form.Label>
        <Form.Control
          {...register("author")}
          isInvalid={!!errors.author}
        />
        <Form.Control.Feedback type="invalid">{errors.author?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Precio</Form.Label>
        <Form.Control
          type="number"
          {...register("precio")}
          isInvalid={!!errors.precio}
        />
        <Form.Control.Feedback type="invalid">{errors.precio?.message}</Form.Control.Feedback>
      </Form.Group>

      <Form.Check
        className="mb-3"
        label="Disponible"
        {...register("disponible")}
      />

      <Button type="submit">Agregar libro</Button>
    </Form>
  );
};

export default LibroNuevo;
