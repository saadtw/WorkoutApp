import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FitnessItems } from "../Context";
import { Ionicons } from "@expo/vector-icons";

const Perform = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const exercises = route.params?.exercises || [];
  const [index, setIndex] = useState(route.params?.index || 0);

  const {
    completed,
    setCompleted,
    minutes,
    setMinutes,
    calories,
    setCalories,
    setWorkout,
    isDarkMode,
  } = useContext(FitnessItems);

  const dynamicStyles = createDynamicStyles(isDarkMode);

  const handleComplete = () => {
    setCompleted((prev) => [...new Set([...prev, exercises[index].name])]);
    setWorkout((prev) => prev + 1);
    setMinutes((prev) => prev + 2.5);
    setCalories((prev) => prev + 6.3);

    if (index + 1 < exercises.length) {
      navigation.navigate("Rest", {
        onComplete: () => {
          setIndex((prevIndex) => prevIndex + 1);
        },
      });
    } else {
      navigation.goBack();
    }
  };

  if (!exercises.length) {
    return (
      <SafeAreaView style={dynamicStyles.container}>
        <Text style={dynamicStyles.noExercisesText}>No exercises available</Text>
      </SafeAreaView>
    );
  }

  const current = exercises[index];

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <Ionicons
        onPress={() => navigation.goBack()}
        style={dynamicStyles.backButton}
        name="arrow-back-outline"
        size={28}
        color={"#000"}
      />

      <View style={dynamicStyles.imageContainer}>
        <Image
          style={dynamicStyles.image}
          source={{ uri: current.image }}
          resizeMode="cover"
        />
      </View>

      <View style={dynamicStyles.detailsContainer}>
        <Text style={dynamicStyles.title}>{current.name}</Text>
        <Text style={dynamicStyles.sets}>x{current.sets}</Text>

        <Pressable onPress={handleComplete} style={dynamicStyles.button}>
          <Text style={dynamicStyles.buttonText}>DONE</Text>
        </Pressable>

        <View style={dynamicStyles.navigationButtons}>
          <Pressable
            disabled={index === 0}
            onPress={() => setIndex(index - 1)}
            style={[
              dynamicStyles.navButton,
              { backgroundColor: index === 0 ? "gray" : "green" },
            ]}
          >
            <Text style={dynamicStyles.navButtonText}>PREV</Text>
          </Pressable>

          <Pressable
            disabled={index + 1 >= exercises.length}
            onPress={() => setIndex(index + 1)}
            style={[
              dynamicStyles.navButton,
              { backgroundColor: index + 1 >= exercises.length ? "gray" : "green" },
            ]}
          >
            <Text style={dynamicStyles.navButtonText}>SKIP</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const createDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : "#fff",
    },
    noExercisesText: {
      textAlign: "center",
      fontSize: 18,
      color: isDarkMode ? "#fff" : "#000",
    },
    backButton: {
      position: "absolute",
      top: 20,
      left: 20,
      zIndex: 1,
    },
    imageContainer: {
      flex: 1,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    detailsContainer: {
      padding: 20,
    },
    title: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 30,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    sets: {
      textAlign: "center",
      marginTop: 10,
      fontSize: 38,
      fontWeight: "bold",
      color: isDarkMode ? "#fff" : "#000",
    },
    button: {
      backgroundColor: "blue",
      marginHorizontal: "auto",
      marginTop: 20,
      borderRadius: 20,
      padding: 15,
      width: 150,
      alignSelf: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center",
    },
    navigationButtons: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 20,
    },
    navButton: {
      padding: 10,
      borderRadius: 20,
      marginHorizontal: 10,
      width: 100,
    },
    navButtonText: {
      color: "#fff",
      fontWeight: "bold",
      textAlign: "center",
    },
  });

export default Perform;
