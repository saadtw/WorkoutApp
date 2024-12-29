import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { FitnessItems } from "../Context";

const RestScreen = ({ route }) => {
  const navigation = useNavigation();
  const onComplete = route.params?.onComplete || (() => {});

  const [timeLeft, setTimeLeft] = useState(3);

  const { isDarkMode } = useContext(FitnessItems);
  const dynamicStyles = createDynamicStyles(isDarkMode);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timer on component unmount
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete(); // Call the callback only after the timer ends
      navigation.goBack(); // Navigate back to Perform
    }
  }, [timeLeft, onComplete, navigation]);

  return (
    <SafeAreaView style={dynamicStyles.safeArea}>
      <View style={dynamicStyles.container}>
        <Image source={isDarkMode ? require("../assets/rest-dark.png") : require("../assets/rest.png" )} style={dynamicStyles.image} />
        <Text style={dynamicStyles.breakText}>TAKE A BREAK!</Text>
        <Text style={dynamicStyles.timerText}>{timeLeft}</Text>
      </View>
    </SafeAreaView>
  );
};

const createDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : "#f5f5f5",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: "contain",
      marginBottom: 20,
    },
    breakText: {
      fontSize: 30,
      fontWeight: "900",
      marginBottom: 10,
      textAlign: "center",
      color: isDarkMode ? "#fff" : "#000",
    },
    timerText: {
      fontSize: 40,
      fontWeight: "800",
      textAlign: "center",
      color: isDarkMode ? "#fff" : "#000",
    },
  });

export default RestScreen;
