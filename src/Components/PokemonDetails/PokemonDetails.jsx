import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import UsePokemonDetails from "../../Hooks/UsePokemonDetails";

function PokemonDetails({pokemonName}) {
  const { id } = useParams();
  const [pokemon] = UsePokemonDetails(id,pokemonName);

  return (
    <>
      <div className="pokemon-details-wrapper">
        <img className="pokemon-details-image" src={pokemon.image} />
        <div className="card">
          <div className="pokemon-details-id">Id : {pokemon.id}</div>
          <div className="pokemon-details-name">
            <span>{pokemon.name}</span>
          </div>
          <div className="pokemon-details-height">
            Height : {pokemon.height}
          </div>
          <div className="pokemon-details-weight">
            Weight : {pokemon.weight}
          </div>
          <div className="pokemon-details-types">
            Type :{" "}
            {pokemon.types && pokemon.types.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default PokemonDetails;
