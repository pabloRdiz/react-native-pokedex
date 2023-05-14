import { useState, useEffect, useCallback } from 'react';
import { PokemonFull } from '../interfaces/pokemonInterface';
import { pokemonApi } from '../api/pokeminApi';

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonFull>({} as PokemonFull);

  const loadPokemon = useCallback(async () => {
    const resp = await pokemonApi.get<PokemonFull>(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
    );

    setPokemon(resp.data);
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  return {
    isLoading,
    pokemon,
  };
};
