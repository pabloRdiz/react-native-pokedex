import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDebounce } from '../hooks/useDebounce';

interface Props {
  onDebounce: (value: string) => void;
}

export const SearchInput = (props: Props) => {
  const { onDebounce } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');

  const { debaunceValue } = useDebounce(value);

  useEffect(() => {
    onDebounce(debaunceValue || '');
  }, [debaunceValue, onDebounce]);

  return (
    <View style={styles.container}>
      <View
        style={[styles.textContainer, isFocus && styles.textContainerFocus]}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onBlur={() => setIsFocus(false)}
          onChangeText={setValue}
          onFocus={() => setIsFocus(true)}
          placeholder="search pokemon"
          placeholderTextColor={'#8C8C8C'}
          style={styles.textInput}
          value={value}
        />
        <Text style={styles.icon}>{'🔍'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(243,241,243, 0.8)',
    borderRadius: 10,

    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textContainerFocus: {
    shadowColor: '#000',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
  },
  icon: {
    fontSize: 20,
  },
});
