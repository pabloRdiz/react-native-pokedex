import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageColors from 'react-native-image-colors';
import { SimplePokemon } from '../interfaces/pokemonInterface';
import { FadeInImage } from './FadeInImage';
import { useEffect, useRef, useState } from 'react';
import { NavigatorScreens } from '../navigator/navigator.types';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

const FALLBACK_COLOR = 'grey';

export const PokemonCard = (props: Props) => {
  const { pokemon } = props;
  const navigation = useNavigation();
  const [bgColor, setBGColor] = useState(FALLBACK_COLOR);
  const isMounted = useRef(true);

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {
      fallback: FALLBACK_COLOR,
    }).then(result => {
      if (!isMounted.current) {
        return;
      }

      result.platform === 'android' &&
        setBGColor(result.dominant || FALLBACK_COLOR);
      result.platform === 'ios' &&
        setBGColor(result.background || FALLBACK_COLOR);
    });

    return () => {
      isMounted.current = false;
    };
  }, [pokemon.picture]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate(NavigatorScreens.POKEMON_SCREEN, {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.container,
          backgroundColor: bgColor,
          width: windowWidth * 0.4,
        }}>
        <View>
          <Text style={styles.pokemonName}>{pokemon.name} </Text>
          <Text style={styles.pokemonId}>{`#${pokemon.id}`} </Text>
        </View>
        <View style={styles.pokeballContainer}>
          <Image
            style={styles.pokeball}
            source={require('../assets/pokebola-blanca.png')}
          />
        </View>
        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 120,
    marginBottom: 24,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pokemonName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10,
    textTransform: 'capitalize',
  },
  pokemonId: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    top: 10,
    left: 10,
  },
  pokeballContainer: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
  },
  pokeball: {
    height: 100,
    width: 100,
    position: 'absolute',
    bottom: -25,
    right: -25,
    opacity: 0.5,
  },
  pokemonImage: {
    height: 100,
    width: 100,
    position: 'absolute',
    right: -6,
    bottom: -5,
  },
});
