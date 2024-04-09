import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import searchpage from "./pages/searchpage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ headerShown: false }} // Hide header for LoginPage
        />
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={{ headerShown: false }} // Hide header for LandingPage
        />

        <Stack.Screen name="searchpage" component={searchpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
