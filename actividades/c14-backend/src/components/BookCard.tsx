import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import type { BookCardProps } from "../Types/BookCard.ts";


const BookCard = ({ title, author, precio }: BookCardProps) => {
  const [likes, setLikes] = useState<number>(0);

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Autor: {author} </Card.Text>
        <Card.Text>Price: {precio}</Card.Text>
        <Button variant="primary" onClick={handleLike}>
          👍 Me gusta ({likes})
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
