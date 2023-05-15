import { useCallback, useEffect, useState } from 'react';
import { pokemonApi } from '../api/pokeminApi';
import {
  PokemonPaginatedResponse,
  SimplePokemon,
} from '../interfaces/pokemonInterface';
import { mapPokemonList } from '../utils/maps';

export const usePokemonSearch = () => {
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  const loadPokemons = useCallback(async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200',
    );

    const pokemons = mapPokemonList(resp.data.results);
    setSimplePokemonList(pokemons);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadPokemons();
  }, [loadPokemons]);

  return { isLoading, simplePokemonList, loadPokemons };
};
