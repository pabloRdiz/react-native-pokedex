import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export const LoadIndicartor = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={'grey'} />
      <Text>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
