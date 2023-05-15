import { useCallback, useState } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SearchInput } from '../components/SearchInput';
import { usePokemonSearch } from '../hooks/usePokemonSearch';
import { LoadIndicartor } from '../components/LoadIndicator';
import { PokemonCard } from '../components/PokemonCard';
import { SimplePokemon } from '../interfaces/pokemonInterface';

export const SearchScreen = () => {
  const { top } = useSafeAreaInsets();
  const styles = createStyles(Platform.OS === 'ios' ? top : top + 10);
  const { isLoading, simplePokemonList } = usePokemonSearch();
  const [term, setTerm] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([]);

  const handleOnDebounce = useCallback(
    (value: string) => {
      if (value.length === 0) {
        setFilteredPokemons([]);
        setTerm('');
        return;
      }

      if (isNaN(Number(value))) {
        const results = simplePokemonList.filter(current =>
          current.name.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
        );

        setFilteredPokemons(results);
      } else {
        const result = simplePokemonList.find(current =>
          current.id.includes(value),
        );

        result ? setFilteredPokemons([result]) : setFilteredPokemons([]);
      }

      setTerm(value);
    },
    [simplePokemonList],
  );

  if (isLoading) {
    return <LoadIndicartor />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchInput onDebounce={handleOnDebounce} />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <FlatList
          data={filteredPokemons}
          keyExtractor={pokemon => pokemon.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={
            <Text
              style={{
                ...styles.header,
              }}>
              {term ? `Filter: ${term}` : 'Enter filter criteria'}
            </Text>
          }
          renderItem={({ item }) => <PokemonCard pokemon={item} />}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const createStyles = (top: number) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
    },
    searchContainer: {
      top: 50,
      right: 0,
      left: 0,
      position: 'absolute',
      zIndex: 10,
    },
    header: {
      marginTop: top + 60,
      marginVertical: 16,
      paddingBottom: 10,
      fontSize: 16,
      fontStyle: 'italic',
      color: 'grey',
    },
  });
