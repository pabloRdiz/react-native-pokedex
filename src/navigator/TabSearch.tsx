import { createStackNavigator } from '@react-navigation/stack';
import { NavigatorScreens, RouteStackParams } from './navigator.types';
import { SearchScreen } from '../screens/SearchScreen';
import { PokemonScreen } from '../screens/PokemonScreen';

const Stack = createStackNavigator<RouteStackParams>();

export const TabSearch = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}>
      <Stack.Screen
        name={NavigatorScreens.SEARCH_SCREEN}
        component={SearchScreen}
      />
      <Stack.Screen
        name={NavigatorScreens.POKEMON_SCREEN}
        component={PokemonScreen}
      />
    </Stack.Navigator>
  );
};
