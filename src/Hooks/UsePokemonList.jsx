import axios from "axios";
import { useEffect,useState } from "react";

function UsePokemonList(){
     const [pokemonListState,setPokemonListState] = useState({
    pokemonList : [],
    isloading :true,
    pokedexUrl : "https://pokeapi.co/api/v2/pokemon",
    nextUrl : '',
    prevUrl : ''
  })

  async function downloadPokemons() {
    setPokemonListState({...pokemonListState , isloading : true});
    const response = await axios.get(pokemonListState.pokedexUrl);
    const pokemonResults = response.data.results;
    console.log(response.data);
    setPokemonListState((state)=>({
      ...state,
      nextUrl: response.data.next,
      prevUrl: response.data.previous,
    }));
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);
    const pokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.front_shiny,
        types: pokemon.types,
      };
    });
    console.log(pokeListResult);
    setPokemonListState((state)=>({
      ...state,
      pokemonList: pokeListResult,
      isloading: false,
    }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState,setPokemonListState];
}

export default UsePokemonList;