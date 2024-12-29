import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth"; 
import { auth } from "./Firebase"; 
import SplashScreen from "./screens/SplashScreen";
import intro1 from "./screens/intro1";
import intro2 from "./screens/intro2";
import intro3 from "./screens/intro3";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Home from "./screens/Home";
import Exercises from "./screens/Exercises";
import Workouts from "./screens/Workouts";
import WorkoutDetail from "./screens/WorkoutDetail";
import Perform from "./screens/Perform";
import RestScreen from "./screens/RestScreen";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const launched = await AsyncStorage.getItem("hasLaunched");
      if (launched === null) {
        setIsFirstLaunch(true);
        await AsyncStorage.setItem("hasLaunched", "true");
      } else {
        setIsFirstLaunch(false);
      }
    };

    const checkAuthState = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      });
    };

    checkFirstLaunch();
    checkAuthState();
  }, []);

  if (isFirstLaunch === null || isLoggedIn === null) {
    return null; // Show a loading state if necessary
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Show Splash Screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />

        {/* Main App Navigation */}
        <Stack.Screen
          name="MainApp"
          component={() => (
            <Stack.Navigator
              initialRouteName={
                isLoggedIn
                  ? "Home" // Redirect logged-in users to Home
                  : isFirstLaunch
                  ? "intro1"
                  : "Login" // Redirect first-time users or not logged-in users
              }
            >
              {/* Intro Screens */}
              {isFirstLaunch && (
                <>
                  <Stack.Screen
                    name="intro1"
                    component={intro1}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="intro2"
                    component={intro2}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="intro3"
                    component={intro3}
                    options={{ headerShown: false }}
                  />
                </>
              )}
              
              {/* Authentication Screens */}
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ headerShown: false }}
              />

              {/* Main App Screens */}
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Exercises"
                component={Exercises}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Workouts"
                component={Workouts}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WorkoutDetail"
                component={WorkoutDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Perform"
                component={Perform}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Rest"
                component={RestScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
