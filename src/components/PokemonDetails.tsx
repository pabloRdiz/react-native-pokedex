import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PokemonFull } from '../interfaces/pokemonInterface';
import { FadeInImage } from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

export const PokemonDetails = ({ pokemon }: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Types</Text>
          <View style={styles.row}>
            {pokemon.types.map(({ type }) => (
              <Text style={styles.regularText} key={type.name}>
                {type.name}
              </Text>
            ))}
          </View>

          <Text style={styles.title}>Peso</Text>
          <Text style={styles.regularText}>{pokemon.weight}kg</Text>
        </View>

        <View>
          <Text style={styles.title}>Sprites</Text>
        </View>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <FadeInImage
            uri={pokemon.sprites.front_default}
            style={styles.basicSprite}
          />

          <FadeInImage
            uri={pokemon.sprites.back_default}
            style={styles.basicSprite}
          />

          <FadeInImage
            uri={pokemon.sprites.front_shiny}
            style={styles.basicSprite}
          />

          <FadeInImage
            uri={pokemon.sprites.back_shiny}
            style={styles.basicSprite}
          />
        </ScrollView>

        <View>
          <Text style={styles.title}>Habilidades base</Text>
          <View style={styles.row}>
            {pokemon.abilities.map(({ ability }) => (
              <Text
                style={{
                  ...styles.regularText,
                  ...styles.movementsText,
                }}
                key={ability.name}>
                {ability.name}
              </Text>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.title}>Movimientos</Text>
          <View style={styles.movementsContainer}>
            {pokemon.moves.map(({ move }) => (
              <Text
                style={{
                  ...styles.regularText,
                  ...styles.movementsText,
                }}
                key={move.name}>
                {move.name}
              </Text>
            ))}
          </View>
        </View>

        <View>
          <Text style={styles.title}>Stats</Text>
          <View>
            {pokemon.stats.map((stat, i) => (
              <View key={stat.stat.name + i} style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    ...styles.regularText,
                    marginRight: 10,
                    width: 150,
                  }}
                  key={stat.stat.name}>
                  {stat.stat.name}
                </Text>

                <Text
                  style={{
                    ...styles.regularText,
                    fontWeight: 'bold',
                  }}>
                  {stat.base_stat}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.sritesContainer}>
            <FadeInImage
              uri={pokemon.sprites.front_default}
              style={styles.basicSprite}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 370,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
  row: {
    flexDirection: 'row',
  },
  movementsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  movementsText: {
    marginRight: 10,
  },
  sritesContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
});
