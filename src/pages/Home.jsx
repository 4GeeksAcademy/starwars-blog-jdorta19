import React, { useContext } from "react";
import { AppContext } from "../store/AppContext";
import ItemCard from "../components/Card";
import { Container, Row, Col } from "react-bootstrap";

const Home = () => {
  const { store } = useContext(AppContext);

  return (
    <Container>
      <h2>Characters</h2>
      <Row>{store.characters.map((char) => (
        <Col key={char.uid}><ItemCard item={char} category="characters" /></Col>
      ))}</Row>

      <h2>Planets</h2>
      <Row>{store.planets.map((planet) => (
        <Col key={planet.uid}><ItemCard item={planet} category="planets" /></Col>
      ))}</Row>

      <h2>Vehicles</h2>
      <Row>{store.vehicles.map((vehicle) => (
        <Col key={vehicle.uid}><ItemCard item={vehicle} category="vehicles" /></Col>
      ))}</Row>
    </Container>
  );
};

export default Home;
