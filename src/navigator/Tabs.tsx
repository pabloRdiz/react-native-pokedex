import { Platform, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabList } from './TabList';
import { TabSearch } from './TabSearch';

const Tab = createBottomTabNavigator();

export const Tabs = () => {
  const styles = createStyles(Platform.OS);

  const textIcon = (icon: string) => <Text style={styles.icon}>{icon}</Text>;

  return (
    <Tab.Navigator
      sceneContainerStyle={styles.container}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D6',
        tabBarLabelStyle: { ...styles.label },
        tabBarStyle: { ...styles.tabBar },
      }}>
      <Tab.Screen
        name="Home-Screen"
        options={{
          tabBarLabel: 'List',
          tabBarIcon: () => textIcon('☁️'),
        }}
        component={TabList}
      />
      <Tab.Screen
        name="SearchTabs"
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: () => textIcon('👀'),
        }}
        component={TabSearch}
      />
    </Tab.Navigator>
  );
};

const createStyles = (platformOS: string) =>
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    tabBar: {
      borderWidth: 0,
      elevation: 0,
      position: 'absolute',
      backgroundColor: 'rgba(255,255,255,0.8)',
    },
    label: {
      marginBottom: platformOS === 'ios' ? 0 : 10,
      fontWeight: 'bold',
      fontSize: 12,
    },
    icon: {
      fontSize: 36,
    },
  });
