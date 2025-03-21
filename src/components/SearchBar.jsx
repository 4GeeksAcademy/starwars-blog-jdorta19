import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../store/AppContext";
import { Form, FormControl, ListGroup } from "react-bootstrap";

const SearchBar = () => {
  const { store } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term.length > 1) {
      const allItems = [
        ...store.characters.map((item) => ({ ...item, category: "people" })),
        ...store.planets.map((item) => ({ ...item, category: "planets" })),
        ...store.vehicles.map((item) => ({ ...item, category: "vehicles" })),
      ];

      const filteredResults = allItems.filter((item) =>
        item.name.toLowerCase().includes(term)
      );

      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (item) => {
    navigate(`/${item.category}/${item.uid}`);
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className="position-relative">
      <Form>
        <FormControl
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form>
      {results.length > 0 && (
        <ListGroup className="position-absolute w-100">
          {results.map((item) => (
            <ListGroup.Item
              key={item.uid}
              action
              onClick={() => handleSelect(item)}
            >
              {item.name} ({item.category})
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBar;
