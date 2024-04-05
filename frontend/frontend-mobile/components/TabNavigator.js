import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import LandingPage from '../pages/LandingPage'; // Importing Screen1 component
import AboutPage from '../pages/AboutPage'; // Importing Screen1 component
import AlbumListPage from '../pages/AlbumListPage'; // Importing Screen1 component
import { createStackNavigator } from '@react-navigation/stack'; // Import createStackNavigator
import { View, Text, StyleSheet } from 'react-native';

// Create bottom tab navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create stack navigator

// Custom header component
const CustomHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

// Define stack navigator for LandingPage with custom header
const LandingPageStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: () => <CustomHeader title="Landing Page" />,
    }}
  >
    <Stack.Screen name="LandingPage" component={LandingPage} />
  </Stack.Navigator>
);

const AboutPageStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: () => <CustomHeader title="About Page" />,
    }}
  >
    <Stack.Screen name="AboutPage" component={AboutPage} />
  </Stack.Navigator>
);

const AlbumListPageStack = () => (
  <Stack.Navigator
    screenOptions={{
      header: () => <CustomHeader title="Album List Page" />,
    }}
  >
    <Stack.Screen name="AlbumListPage" component={AlbumListPage} />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      // Your tabBarOptions here
    }}
  >
    <Tab.Screen
      name="Home"
      component={LandingPageStack} // Render LandingPage within the stack navigator
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" size={size} color={color} />
        ),
        headerShown: false
      }}
    />
    <Tab.Screen
      name="About"
      component={AboutPageStack} // Render AboutPage within the stack navigator
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="about" size={size} color={color} />
        ),
        headerShown: false
      }}
    />
    <Tab.Screen
      name="Album List"
      component={AlbumListPageStack} // Render AlbumListPage within the stack navigator
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="list" size={size} color={color} />
        ),
        headerShown: false
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3B3B3B',
    padding: 30,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,

  },
});

export default TabNavigator;
