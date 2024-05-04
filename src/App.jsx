// src/App.js

import React from 'react';
import PokemonList from './components/PokemonList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Pokemon List</h1>
      <PokemonList />
    </div>
  );
}

export default App;
