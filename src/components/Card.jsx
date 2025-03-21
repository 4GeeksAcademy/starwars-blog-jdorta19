import React, { useContext } from "react";
import { AppContext } from "../store/AppContext";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const ItemCard = ({ item, category }) => {
  const { addFavorite } = useContext(AppContext);
  const imgUrl = `https://starwars-visualguide.com/assets/img/${category}/${item.uid}.jpg`;

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imgUrl} onError={(e) => (e.target.src = "https://via.placeholder.com/150")} />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Link to={`/${category}/${item.uid}`} className="btn btn-primary">More Info</Link>
        <Button variant="warning" className="ms-2" onClick={() => addFavorite(item)}>❤️</Button>
      </Card.Body>
    </Card>
  );
};

export default ItemCard;
