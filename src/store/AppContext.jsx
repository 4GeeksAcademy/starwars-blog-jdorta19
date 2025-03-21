import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [store, setStore] = useState({
    characters: JSON.parse(localStorage.getItem("characters")) || [],
    planets: JSON.parse(localStorage.getItem("planets")) || [],
    vehicles: JSON.parse(localStorage.getItem("vehicles")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || []
  });

  useEffect(() => {
    if (store.characters.length === 0) fetchData("people", "characters");
    if (store.planets.length === 0) fetchData("planets", "planets");
    if (store.vehicles.length === 0) fetchData("vehicles", "vehicles");
  }, []);

  useEffect(() => {
    localStorage.setItem("characters", JSON.stringify(store.characters));
    localStorage.setItem("planets", JSON.stringify(store.planets));
    localStorage.setItem("vehicles", JSON.stringify(store.vehicles));
    localStorage.setItem("favorites", JSON.stringify(store.favorites));
  }, [store]);

  const fetchData = async (category, key) => {
    try {
      const res = await fetch(`https://www.swapi.tech/api/${category}`);
      const data = await res.json();
      setStore((prev) => {
        const updatedStore = { ...prev, [key]: data.results };
        localStorage.setItem(key, JSON.stringify(data.results)); // Guardar en localStorage
        return updatedStore;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addFavorite = (item) => {
    setStore((prev) => {
      if (!prev.favorites.some((fav) => fav.uid === item.uid)) {
        const updatedFavorites = [...prev.favorites, item];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Guardar en localStorage
        return { ...prev, favorites: updatedFavorites };
      }
      return prev;
    });
  };

  const removeFavorite = (uid) => {
    setStore((prev) => {
      const updatedFavorites = prev.favorites.filter((fav) => fav.uid !== uid);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Guardar en localStorage
      return { ...prev, favorites: updatedFavorites };
    });
  };

  return (
    <AppContext.Provider value={{ store, addFavorite, removeFavorite }}>
      {children}
    </AppContext.Provider>
  );
};
