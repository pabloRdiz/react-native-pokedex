import { useCallback, useEffect, useRef, useState } from 'react';
import { pokemonApi } from '../api/pokeminApi';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
} from '../interfaces/pokemonInterface';
import { mapPokemonList } from '../utils/maps';

export const usePokemonPaginated = () => {
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const nextPage = useRef('https://pokeapi.co/api/v2/pokemon?limit=40');

  const loadPokemons = useCallback(async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPage.current,
    );

    nextPage.current = resp.data.next;
    const pokemons = mapPokemonList(resp.data.results);
    setSimplePokemonList(prev => [...prev, ...pokemons]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return { isLoading, simplePokemonList, loadPokemons };
};
