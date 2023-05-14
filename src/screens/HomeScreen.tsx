import React from 'react';
import {
  Image,
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginated } from '../hooks/usePokemonPaginated';
import { appStyles } from '../theme/appTheme';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {
  const { top } = useSafeAreaInsets();
  const { simplePokemonList, loadPokemons } = usePokemonPaginated();
  const styles = createStyles(top);
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={appStyles.pokeBallBG}
      />

      <View style={styles.listContainer}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...appStyles.title,
                ...appStyles.globalMargin,
                ...styles.header,
              }}>
              Pokedex{' '}
            </Text>
          }
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator
              style={styles.indicator}
              size={20}
              color="grey"
            />
          }
        />
      </View>
    </>
  );
};

const createStyles = (top: number) =>
  StyleSheet.create({
    listContainer: { alignItems: 'center' },
    header: {
      top: top + 20,
      marginBottom: top + 20,
      paddingBottom: 10,
    },
    indicator: {
      height: 100,
    },
  });
