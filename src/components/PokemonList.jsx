// src/components/PokemonList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    axios.get('https://pokeapi.deno.dev/pokemon?limit=50')
      .then(response => {
        setPokemonList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input className='search'
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-list">
        {filteredPokemon.map(pokemon => (
          <div key={pokemon.id} className="pokemon-card">
            <img src={pokemon.imageUrl} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
            <p className="desc">{pokemon.description}</p>
          </div>
        ))}
      </div>
      {selectedPokemon && (
        <div className="pokemon-details">
          <h2>{selectedPokemon.name}</h2>
          <img src={`https://pokeapi.deno.dev/images/${selectedPokemon.name}.png`} alt={selectedPokemon.name} />
          <p>Type: {selectedPokemon.types.map(type => type.type.name).join(", ")}</p>
          <p>Description: {selectedPokemon.species.flavor_text_entries[0].flavor_text}</p>
        </div>
      )}
    </div>
  );
};

export default PokemonList;
