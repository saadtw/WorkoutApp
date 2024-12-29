import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { FitnessItems } from "../Context";
import { AntDesign } from "@expo/vector-icons";

const WorkoutDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { completed, isDarkMode } = useContext(FitnessItems);

  const dynamicStyles = createDynamicStyles(isDarkMode);

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={dynamicStyles.image}
          source={{ uri: route.params.image }}
        />

        <Ionicons
          onPress={() => navigation.goBack()}
          style={dynamicStyles.backIcon}
          name="arrow-back-outline"
          size={28}
          color="white"
        />

        {route.params.exercises.map((item, index) => (
          <Pressable
            style={dynamicStyles.exerciseContainer}
            key={index}
          >
            <Image
              style={dynamicStyles.exerciseImage}
              source={{ uri: item.image }}
            />

            <View style={dynamicStyles.exerciseDetails}>
              <Text style={dynamicStyles.exerciseName}>
                {item.name}
              </Text>

              <Text style={dynamicStyles.exerciseSets}>
                x{item.sets}
              </Text>
            </View>

            {completed.includes(item.name) && (
              <AntDesign
                style={dynamicStyles.completedIcon}
                name="checkcircle"
                size={24}
                color="green"
              />
            )}
          </Pressable>
        ))}
      </ScrollView>

      <Pressable
        onPress={() =>
          navigation.navigate("Perform", {
            exercises: route.params.exercises,
          })
        }
        style={dynamicStyles.startButton}
      >
        <Text style={dynamicStyles.startButtonText}>START</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const createDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : "#fff",
    },
    image: {
      width: "100%",
      height: 170,
    },
    backIcon: {
      position: "absolute",
      top: 20,
      left: 20,
    },
    exerciseContainer: {
      margin: 10,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: isDarkMode ? "#333" : "#f9f9f9",
      borderRadius: 8,
      padding: 10,
    },
    exerciseImage: {
      width: 90,
      height: 90,
      borderRadius: 8,
    },
    exerciseDetails: {
      marginLeft: 10,
    },
    exerciseName: {
      fontSize: 17,
      fontWeight: "bold",
      width: 170,
      color: isDarkMode ? "#fff" : "#000",
    },
    exerciseSets: {
      marginTop: 4,
      fontSize: 18,
      color: isDarkMode ? "#ccc" : "gray",
    },
    completedIcon: {
      marginLeft: 40,
    },
    startButton: {
      backgroundColor: isDarkMode ? "#81b0ff" : "blue",
      padding: 10,
      marginLeft: "auto",
      marginRight: "auto",
      marginVertical: 20,
      width: 120,
      borderRadius: 6,
    },
    startButtonText: {
      textAlign: "center",
      color: "#fff",
      fontSize: 15,
      fontWeight: "600",
    },
  });

export default WorkoutDetail;
