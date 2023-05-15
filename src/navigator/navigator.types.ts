import { SimplePokemon } from '../interfaces/pokemonInterface';

export enum NavigatorScreens {
  HOME_SCREEN = 'HomeScreen',
  POKEMON_SCREEN = 'PokemonScreen',
  SEARCH_SCREEN = 'SearchScreen',
}

export type RouteStackParams = {
  [NavigatorScreens.HOME_SCREEN]: undefined;
  [NavigatorScreens.POKEMON_SCREEN]: {
    simplePokemon: SimplePokemon;
    color: string;
  };
  [NavigatorScreens.SEARCH_SCREEN]: undefined;
};
