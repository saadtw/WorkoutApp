import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Searchbar } from "react-native-paper";
import { FitnessItems } from "../Context";
import Colors from "../constants/colors";
import Fonts from "../constants/fonts";
import FontSizes from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import colors from "../constants/colors";
import { exercisesAPI } from "../components/exercisesAPI";

const muscleGroupImages = {
  Chest: require("../assets/chest-icon.png"),
  Abs: require("../assets/abs-icon.png"),
  Back: require("../assets/back-icon.png"),
  Biceps: require("../assets/biceps-icon.png"),
  Cardio: require("../assets/cardio-icon.png"),
  Legs: require("../assets/legs-icon.png"),
  Forearms: require("../assets/forearms-icon.png"),
  Shoulders: require("../assets/shoulders-icon.png"),
  Triceps: require("../assets/triceps-icon.png"),
};

const Exercises = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Chest");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [showDifficultyDropdown, setShowDifficultyDropdown] = useState(false);

  const { selectedExerciseCategory, isDarkMode } = useContext(FitnessItems);

  const categories = [
    "Chest",
    "Abs",
    "Back",
    "Biceps",
    "Cardio",
    "Legs",
    "Forearms",
    "Shoulders",
    "Triceps",
  ];

  const difficulties = ["All", "Easy", "Medium", "Hard"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await exercisesAPI();
        setExercises(data); 
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    filterExercises(searchQuery, selectedCategory, selectedDifficulty);
  }, [exercises, selectedCategory, selectedDifficulty, searchQuery]);

  const filterExercises = (searchText = "", category = "Chest", difficulty = "All") => {
    let filtered = exercises;

    if (category) {
      filtered = filtered.filter((item) => item.Muscle === category);
    }
    if (difficulty !== "All") {
      filtered = filtered.filter((item) => item.Difficulty === difficulty);
    }
    if (searchText) {
      filtered = filtered.filter((item) =>
        item.Name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Details.toLowerCase().includes(searchText.toLowerCase()) ||
        item.Equipment.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setFilteredExercises(filtered);
  };
  

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterExercises(searchQuery, category, selectedDifficulty);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    filterExercises(searchQuery, selectedCategory, difficulty);
    setShowDifficultyDropdown(false);
  };

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    filterExercises(query, selectedCategory, selectedDifficulty);
  };

  const dynamicStyles = createDynamicStyles(isDarkMode);

  const renderExercise = ({ item }) => (
    <TouchableOpacity
      style={dynamicStyles.exerciseCard}
      onPress={() => navigation.navigate("ExerciseDetails", { exercise: item })}
    >
      <Image
        source={muscleGroupImages[item.Muscle] || require("../assets/logo.png")}
        style={dynamicStyles.exerciseImage}
      />
      <View style={dynamicStyles.exerciseInfo}>
        <Text style={dynamicStyles.exerciseName}>{item.Name}</Text>
        <Text style={dynamicStyles.exerciseDetails}>{item.Details}</Text>
        <Text style={dynamicStyles.exerciseEquipment}>
          <Text style={dynamicStyles.labelText}>Equipment: </Text>
          <Text style={dynamicStyles.valueText}>{item.Equipment}</Text>
        </Text>
        <View style={dynamicStyles.exerciseMeta}>
          <Text style={dynamicStyles.metaText}>
            <Text style={dynamicStyles.labelText}>Difficulty: </Text>
            <Text style={dynamicStyles.valueText}>{item.Difficulty}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.topBar}>
  <TouchableOpacity onPress={() => navigation.goBack()} style={dynamicStyles.topBarButton}>
    <MaterialIcons name="arrow-back" size={24} color={isDarkMode ? "#fff" : Colors.text} />
  </TouchableOpacity>
  <Text style={dynamicStyles.topBarTitle}>Exercises</Text>
  <TouchableOpacity
    onPress={() => setShowDifficultyDropdown((prev) => !prev)}
    style={dynamicStyles.topBarButton}
  >
    <MaterialIcons name="filter-list" size={24} color={isDarkMode ? "#fff" : Colors.text} />
  </TouchableOpacity>
</View>

      <View style={dynamicStyles.searchBarContainer}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={dynamicStyles.searchBar}
        />
      </View>

      {showDifficultyDropdown && (
        <View style={dynamicStyles.dropdown}>
          {difficulties.map((difficulty) => (
            <TouchableOpacity
              key={difficulty}
              style={dynamicStyles.dropdownItem}
              onPress={() => handleDifficultyChange(difficulty)}
            >
              <Text style={dynamicStyles.dropdownText}>{difficulty}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={dynamicStyles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              dynamicStyles.categoryButton,
              selectedCategory === category && dynamicStyles.categoryButtonActive,
            ]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text
              style={[
                dynamicStyles.categoryText,
                selectedCategory === category && dynamicStyles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={dynamicStyles.exerciseContainer}>
        <FlatList
          data={filteredExercises}
          keyExtractor={(item) => item.Id}
          renderItem={renderExercise}
          contentContainerStyle={dynamicStyles.exerciseList}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const createDynamicStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkMode ? "#000" : Colors.background,
      padding: Spacing,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: Spacing,
      paddingVertical: Spacing / 2,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? "#333" : Colors.lightGray,
    },
    topBarButton: {
      justifyContent: "center",
      alignItems: "center",
    },
    topBarTitle: {
      fontSize: FontSizes.large,
      fontFamily: Fonts["poppins-semiBold"],
      color: isDarkMode ? "#fff" : Colors.text,
      textAlign: "center",
    },
    searchBarContainer: {
      marginVertical: Spacing,
      marginHorizontal: Spacing,
    },
    searchBar: {
      backgroundColor: isDarkMode ? "#333" : "#fff",
      elevation: 3,
      borderRadius: 24,
      backgroundColor: colors.gray,
    },
    dropdown: {
      position: "absolute",
      top: 70,
      right: 20,
      backgroundColor: isDarkMode ? "#333" : Colors.background,
      borderRadius: 8,
      elevation: 3,
      zIndex: 10,
      padding: Spacing,
    },
    dropdownItem: {
      paddingVertical: Spacing / 2,
    },
    dropdownText: {
      fontSize: FontSizes.medium,
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#fff" : Colors.text,
    },
    categoriesContainer: {
      marginBottom: Spacing,
      maxHeight: 50,
      zIndex: 1,
    },
    categoryButton: {
      width: 70,
      paddingVertical: Spacing / 2,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 8,
      backgroundColor: isDarkMode ? "#333" : Colors.gray,
      marginHorizontal: Spacing / 2,
    },
    categoryButtonActive: {
      backgroundColor: Colors.primary,
    },
    categoryText: {
      fontSize: FontSizes.small,
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#fff" : Colors.text,
    },
    categoryTextActive: {
      color: "#fff",
    },
    exerciseContainer: {
      flex: 1,
      marginTop: Spacing,
    },
    exerciseList: {
      paddingBottom: Spacing * 2,
    },
    exerciseCard: {
      flexDirection: "row",
      backgroundColor: isDarkMode ? "#333" : Colors.gray,
      borderRadius: 10,
      padding: Spacing,
      marginBottom: Spacing,
      alignItems: "center",
    },
    exerciseImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
      marginRight: Spacing,
      resizeMode: "contain",
    },
    exerciseInfo: {
      flex: 1,
    },
    exerciseName: {
      fontSize: FontSizes.medium,
      fontFamily: Fonts["poppins-semiBold"],
      color: isDarkMode ? "#fff" : Colors.text,
    },
    exerciseDetails: {
      fontSize: FontSizes.small,
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#ccc" : Colors.text,
      marginVertical: Spacing / 2,
    },
    exerciseEquipment: {
      fontSize: FontSizes.small,
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#ccc" : Colors.text,
    },
    exerciseMeta: {
      marginTop: Spacing / 2,
    },
    labelText: {
      fontFamily: Fonts["poppins-bold"],
      color: isDarkMode ? "#fff" : Colors.text,
    },
    valueText: {
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#ccc" : Colors.text,
    },
  });


export default Exercises;
