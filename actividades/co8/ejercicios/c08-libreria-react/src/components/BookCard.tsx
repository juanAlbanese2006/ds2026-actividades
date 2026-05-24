import { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

interface BookCardProps {
  title: string;
  author: string;
}

const BookCard = ({ title, author }: BookCardProps) => {
  const [likes, setLikes] = useState<number>(0);

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Autor: {author}</Card.Text>
        <Button variant="primary" onClick={handleLike}>
          👍 Me gusta ({likes})
        </Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;
