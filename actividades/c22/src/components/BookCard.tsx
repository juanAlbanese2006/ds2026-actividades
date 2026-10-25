import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { LibroCardProps } from "../Types/BookCard.ts";


const BookCard = ({ titulo , autor , precio }: LibroCardProps) => {
  const [likes, setLikes] = useState<number>(0);

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <p className="autor">{autor.nombre}</p>
        <Card.Text>Price: {precio}</Card.Text>
        <Button variant="primary" onClick={handleLike}>
          👍 Me gusta ({likes})
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
