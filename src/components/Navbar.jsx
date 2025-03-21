import React, { useContext } from "react";
import { AppContext } from "../store/AppContext";
import { Link } from "react-router-dom";
import { Dropdown, Button } from "react-bootstrap";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { store, removeFavorite } = useContext(AppContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link to="/" className="navbar-brand">Star Wars Blog</Link>
      <Dropdown>
        <Dropdown.Toggle variant="warning">Favorites ({store.favorites.length})</Dropdown.Toggle>
        <Dropdown.Menu>
          {store.favorites.length === 0 ? (
            <Dropdown.Item>No favorites yet</Dropdown.Item>
          ) : (
            store.favorites.map((fav) => (
              <Dropdown.Item key={fav.uid}>
                {fav.name}
                <Button variant="danger" size="sm" className="ms-2" onClick={() => removeFavorite(fav.uid)}>X</Button>
              </Dropdown.Item>
            ))
          )}
        </Dropdown.Menu>
      </Dropdown>
	  <SearchBar />
    </nav>
  );
};

export default Navbar;
