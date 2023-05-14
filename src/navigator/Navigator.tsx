import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { PokemonScreen } from '../screens/PokemonScreen';
import { NavigatorScreens, RouteStackParams } from './navigator.types';

const Stack = createStackNavigator<RouteStackParams>();

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'white' },
        }}>
        <Stack.Screen
          name={NavigatorScreens.HOME_SCREEN}
          component={HomeScreen}
        />
        <Stack.Screen
          name={NavigatorScreens.POKEMON_SCREEN}
          component={PokemonScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
