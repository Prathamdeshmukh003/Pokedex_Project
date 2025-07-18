import axios from "axios";
import { useEffect, useState } from "react";

function UsePokemonDetails(id, pokemonName) {
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    try {
      let response;
      if (pokemonName) {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }
      const pokemonOfSameType = await axios.get(
        `https://pokeapi.co/api/v2/type/${
          response.data.types ? response.data.types[0].type.name : ""
        }`
      );
      console.log(response.data);
      setPokemon({
        id: response.data.id,
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemons: pokemonOfSameType.data.pokemon,
      });
      console.log(response.data.types);
      setPokemonListState({
        ...pokemonListState,
        type: response.data.types ? response.data.types[0].type.name : "",
      });
    } catch (error) {
      console.log("Something Went Wrong!", error);
    }
  }
  const [pokemonListState, setPokemonListState] = useState({});

  useEffect(() => {
    downloadPokemon();
  }, []);

  return [pokemon];
}

export default UsePokemonDetails;
