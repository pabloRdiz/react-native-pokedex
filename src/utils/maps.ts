import { Result, SimplePokemon } from '../interfaces/pokemonInterface';

export const mapPokemonList = (pokemonList: Result[]) => {
  const pokemons: SimplePokemon[] = pokemonList.map(current => {
    const urlParts = current.url.split('/');
    const id = urlParts[urlParts.length - 2];
    const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return {
      id: id,
      picture: picture,
      name: current.name,
    };
  });
  return pokemons;
};
