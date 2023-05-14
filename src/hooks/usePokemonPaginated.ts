import { useCallback, useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokeminApi';
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterface';

export const usePokemonPaginated = () => {
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const nextPage = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const mapPokemonList = useCallback(
    (pokemonList: Result[]) => {
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

      setSimplePokemonList([...simplePokemonList, ...pokemons]);
    },
    [simplePokemonList],
  );

  const loadPokemons = useCallback(async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPage.current,
    );

    nextPage.current = resp.data.next;
    mapPokemonList(resp.data.results);
    setIsLoading(false);
  }, [mapPokemonList]);

  useEffect(() => {
    loadPokemons();
  }, []);

  return { isLoading, simplePokemonList, loadPokemons };
};
