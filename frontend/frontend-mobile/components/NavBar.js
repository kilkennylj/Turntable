import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import LandingPage from '../pages/LandingPage';
import AboutPage from '../pages/AboutPage';
import AlbumListPage from '../pages/AlbumListPage';

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const NavBar = ({ navigation, route }) => {
 const { jwt } = route.params;
  
  const navigateToPage = (pageName) => {
    navigation.navigate(pageName, { jwt });
  };

  // useEffect(() => {
  //   navigation.navigate('LandingPage', { jwt });
  // }, []);

  return (

    <Tab.Navigator
      tabBarOptions={{
        // Your tabBarOptions here
      }}
    >
      <Tab.Screen
        name="Home"
        component={LandingPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false
        }}
        listeners={{
          tabPress: () => navigateToPage('LandingPage')
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="about" size={size} color={color} />
          ),
          headerShown: false
        }}
        listeners={{
          tabPress: () => navigateToPage('AboutPage')
        }}
      />
      <Tab.Screen
        name="Album List"
        component={AlbumListPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
          headerShown: false
        }}
        listeners={{
          tabPress: () => navigateToPage('AlbumListPage')
        }}
      />
    </Tab.Navigator>
  );
};

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

export default NavBar;
