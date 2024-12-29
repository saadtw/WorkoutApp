import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Switch,
} from "react-native";
import { FitnessItems } from "../Context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from "../constants/colors";
import Fonts from "../constants/fonts";
import FontSizes from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { trendingPlans, trendingWorkouts } from "../data/trending";

const workouts = trendingWorkouts;
const plans = trendingPlans;

const Home = ({ navigation }) => {
  const { isDarkMode, toggleDarkMode, setSelectedExerciseCategory } = useContext(FitnessItems);

  const dynamicStyles = createDynamicStyles(isDarkMode);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("isLoggedIn");
      navigation.navigate("Login"); // Correct navigation usage
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  

  return (
    <ScrollView style={dynamicStyles.container}>
      {/* Header Section */}
      <View style={dynamicStyles.header}>
        <View style={dynamicStyles.logo}>
          <Image
            source={require("../assets/logo.png")}
            style={dynamicStyles.logoImage}
          />
        </View>

        {/* Dark Mode and Logout Icons */}
        <View style={dynamicStyles.iconContainer}>
          {/* Dark Mode */}
          <View style={dynamicStyles.darkModeContainer}>
            <Text style={dynamicStyles.darkModeText}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleDarkMode}
              thumbColor={isDarkMode ? "#fff" : "#f4f3f4"}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>

          {/* Logout */}
          <TouchableOpacity onPress={handleLogout} style={dynamicStyles.iconButton}>
            <MaterialIcons name="logout" size={24} color={isDarkMode ? "#fff" : "#333"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Welcome Card */}
      <View style={dynamicStyles.card}>
        <ImageBackground
          source={require("../assets/bg-banner.jpg")}
          style={dynamicStyles.backgroundImage}
        >
          <Text style={dynamicStyles.cardTitle}>Let's get you healthier</Text>
          <Text style={dynamicStyles.cardSubtitle}>
            Together, we can improve your health.
          </Text>
          <TouchableOpacity style={dynamicStyles.getStartedButton} onPress={() => navigation.navigate("Workouts")}>
            <Text style={dynamicStyles.getStartedText}>Let's Get Started</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </ImageBackground>
      </View>

      {/* Featured Exercises */}
      <View style={dynamicStyles.sectionHeader}>
        <Text style={dynamicStyles.sectionTitle}>Featured Exercises</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Exercises")}>
          <Text style={dynamicStyles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={workouts}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={dynamicStyles.flatListContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedExerciseCategory(item.category); // Save the selected category globally
              navigation.navigate("Exercises");
            }}
            style={dynamicStyles.workoutCardContainer}
          >
            <View style={dynamicStyles.workoutCard}>
              <Image source={item.imageSource} style={dynamicStyles.workoutImage} />
              <Text style={dynamicStyles.workoutTitle}>{item.title}</Text>
              <Text style={dynamicStyles.workoutRating}>{item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Trending Workouts */}
      <View style={dynamicStyles.sectionHeader}>
        <Text style={dynamicStyles.sectionTitle}>Trending Workouts</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Workouts")}>
          <Text style={dynamicStyles.seeAll}>See all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={plans}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Workouts", { item })}
            style={dynamicStyles.trendingCard}
          >
            <Image source={item.imageSource} style={dynamicStyles.cardImage} />
            <View style={dynamicStyles.cardContent}>
              <Text style={dynamicStyles.cardTitle}>{item.title}</Text>
              <Text style={dynamicStyles.cardRating}>{item.rating}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </ScrollView>
  );
};

const createDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : Colors.background,
    },
    header: {
      padding: Spacing,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      flexDirection: "row",
      alignItems: "center",
    },
    logoImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 8,
    },
    iconContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    darkModeContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 16,
    },
    darkModeText: {
      marginRight: 8,
      fontSize: FontSizes.small,
      color: isDarkMode ? "#fff" : Colors.text,
    },
    iconButton: {
      padding: 8,
    },
    card: {
      borderRadius: 12,
      width: "93%",
      overflow: "hidden",
      marginVertical: Spacing,
      alignSelf: "center",
      justifyContent: "center",
    },
    backgroundImage: {
      width: "100%",
      height: 120,
      justifyContent: "center",
      alignItems: "center",
    },
    cardTitle: {
      fontSize: FontSizes.large,
      fontFamily: Fonts["poppins-bold"],
      color: isDarkMode ? "#fff" : Colors.text,
      marginBottom: 8,
    },
    getStartedButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.darkPrimary,
      paddingVertical: Spacing,
      paddingHorizontal: Spacing * 2,
      borderRadius: 8,
    },
    getStartedText: {
      fontSize: FontSizes.medium,
      color: "#fff",
      marginRight: 8,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: Spacing,
      marginVertical: Spacing,
    },
    sectionTitle: {
      fontSize: FontSizes.large,
      fontFamily: Fonts["poppins-bold"],
      color: isDarkMode ? "#fff" : Colors.text,
    },
    seeAll: {
      fontSize: FontSizes.medium,
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#81b0ff" : Colors.primary,
    },
    workoutCardContainer: {
      paddingHorizontal: Spacing,
    },
    workoutCard: {
      backgroundColor: isDarkMode ? "#333" : Colors.gray,
      borderRadius: 8,
      overflow: "hidden",
      width: 200,
    },
    workoutImage: {
      width: "100%",
      height: 150,
      resizeMode: "contain",
    },
    workoutTitle: {
      fontSize: FontSizes.medium,
      fontFamily: Fonts["poppins-semiBold"],
      color: isDarkMode ? "#fff" : Colors.text,
      paddingHorizontal: Spacing,
      marginTop: Spacing,
    },
    workoutRating: {
      fontSize: FontSizes.small,
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#fff" : Colors.text,
      paddingHorizontal: Spacing,
      marginBottom: Spacing,
    },
    trendingCard: {
      flexDirection: "row",
      backgroundColor: isDarkMode ? "#333" : Colors.gray,
      borderRadius: 10,
      padding: Spacing,
      marginHorizontal: Spacing,
      marginBottom: Spacing,
      alignItems: "center",
    },
    cardImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: Spacing,
      resizeMode: "contain",
    },
    cardContent: {
      flex: 1,
    },
    cardRating: {
      fontSize: FontSizes.small,
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#81b0ff" : Colors.primary,
    },
  });

export default Home;
