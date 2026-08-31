// Pages/LibroNuevo.tsx
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import type { BookCardProps } from "../Types/BookCard";
import { libroSchema } from "../schemas/LibroSchemas";
import type { LibroValidado } from "../schemas/LibroSchemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";




const LibroNuevo = () => {
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
  const onSubmit = (data: LibroValidado) => {
  // Por ahora no guardamos en el JSON (eso se hará con backend)
  console.log("Libro nuevo:", data);

  // Redirigir al catálogo
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
    <Form.Control.Feedback type="invalid">
      {errors.title?.message}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Autor</Form.Label>
    <Form.Control
      {...register("author")}
      isInvalid={!!errors.author}
    />
    <Form.Control.Feedback type="invalid">
      {errors.author?.message}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-3">
    <Form.Label>Precio</Form.Label>
    <Form.Control
      type="number"
      {...register("precio")}
      isInvalid={!!errors.precio}
    />
    <Form.Control.Feedback type="invalid">
      {errors.precio?.message}
    </Form.Control.Feedback>
  </Form.Group>

  <Form.Check
    type="checkbox"
    label="Disponible"
    {...register("disponible")}
  />

  <Button type="submit">Agregar libro</Button>
</Form>

  );
};

export default LibroNuevo;
