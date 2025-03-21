import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const Details = () => {
  const { category, id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${category}/${id}`);
        const data = await res.json();
        setDetails(data.result.properties);
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };
    fetchDetails();
  }, [category, id]);

  if (!details) return <p>Loading...</p>;

  const imgUrl = `https://starwars-visualguide.com/assets/img/${category}/${id}.jpg`;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={imgUrl} onError={(e) => (e.target.src = "https://via.placeholder.com/600")} />
        <Card.Body>
          <Card.Title>{details.name}</Card.Title>
          <Card.Text>
            {Object.keys(details).map((key) => (
              <p key={key}><strong>{key.replace("_", " ")}:</strong> {details[key]}</p>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Details;
