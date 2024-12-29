import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FitnessCards from "../components/FitnessCards";
import { FitnessItems } from "../Context";

import Colors from "../constants/colors";
import FontSizes from "../constants/FontSize";
import Fonts from "../constants/fonts";
import Spacing from "../constants/Spacing";

const Workouts = ({ navigation }) => {
  const { minutes, calories, workout, isDarkMode } = useContext(FitnessItems);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const dynamicStyles = createDynamicStyles(isDarkMode);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setFilterVisible(false);
  };

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      {/* Filter Modal */}
      <Modal
        visible={filterVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={dynamicStyles.modalOverlay}>
          <View style={dynamicStyles.modalContainer}>
            <Text style={dynamicStyles.modalTitle}>Filter Workouts</Text>
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <Pressable
                key={level}
                style={[
                  dynamicStyles.filterOption,
                  selectedFilter === level && dynamicStyles.selectedFilter,
                ]}
                onPress={() => handleFilterSelect(level)}
              >
                <Text
                  style={[
                    dynamicStyles.filterText,
                    selectedFilter === level && dynamicStyles.selectedText,
                  ]}
                >
                  {level}
                </Text>
              </Pressable>
            ))}
            <Pressable
              style={dynamicStyles.closeButton}
              onPress={() => setFilterVisible(false)}
            >
              <Text style={dynamicStyles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Main Content */}
      <ScrollView style={dynamicStyles.container}>
        {/* Top Bar */}
        <View style={dynamicStyles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={dynamicStyles.topBarButton}
          >
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={isDarkMode ? "#fff" : Colors.text}
            />
          </TouchableOpacity>
          <Text style={dynamicStyles.topBarTitle}>Workouts</Text>
          <TouchableOpacity
            onPress={() => setFilterVisible(true)}
            style={dynamicStyles.topBarButton}
          >
            <MaterialIcons
              name="filter-list"
              size={24}
              color={isDarkMode ? "#fff" : Colors.text}
            />
          </TouchableOpacity>
        </View>

        {/* Workout Stats */}
        <View style={dynamicStyles.statsContainer}>
          <View style={dynamicStyles.statsBox}>
            <Text style={dynamicStyles.statsValue}>{workout}</Text>
            <Text style={dynamicStyles.statsLabel}>Workouts</Text>
          </View>
          <View style={dynamicStyles.statsBox}>
            <Text style={dynamicStyles.statsValue}>{Math.round(calories * 100) / 100}</Text>
            <Text style={dynamicStyles.statsLabel}>Kcal</Text>
          </View>
          <View style={dynamicStyles.statsBox}>
            <Text style={dynamicStyles.statsValue}>{minutes}</Text>
            <Text style={dynamicStyles.statsLabel}>Minutes</Text>
          </View>
        </View>

        {/* Fitness Cards */}
        <FitnessCards filter={selectedFilter} />
      </ScrollView>
    </>
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
      backgroundColor: isDarkMode ? "#000" : Colors.background,
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
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: Spacing * 2,
    },
    statsBox: {
      alignItems: "center",
    },
    statsValue: {
      fontFamily: Fonts["poppins-bold"],
      color: isDarkMode ? "#81b0ff" : Colors.primary,
      fontSize: FontSizes.extraLarge,
    },
    statsLabel: {
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#ccc" : Colors.text,
      fontSize: FontSizes.medium,
      marginTop: Spacing / 2,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContainer: {
      backgroundColor: isDarkMode ? "#333" : Colors.background,
      padding: Spacing * 2,
      borderRadius: Spacing,
      width: "80%",
      alignItems: "center",
    },
    modalTitle: {
      fontFamily: Fonts["poppins-bold"],
      fontSize: FontSizes.large,
      marginBottom: Spacing,
      color: isDarkMode ? "#fff" : Colors.text,
    },
    filterOption: {
      paddingVertical: Spacing,
      paddingHorizontal: Spacing * 2,
      borderColor: isDarkMode ? "#81b0ff" : Colors.primary,
      borderWidth: 1,
      borderRadius: Spacing / 2,
      marginBottom: Spacing,
      width: "100%",
      alignItems: "center",
    },
    selectedFilter: {
      backgroundColor: isDarkMode ? "#81b0ff" : Colors.primary,
    },
    filterText: {
      fontFamily: Fonts["poppins-regular"],
      color: isDarkMode ? "#81b0ff" : Colors.primary,
      fontSize: FontSizes.medium,
    },
    selectedText: {
      color: isDarkMode ? "#000" : Colors.onPrimary,
    },
    closeButton: {
      marginTop: Spacing,
      backgroundColor: isDarkMode ? "#81b0ff" : Colors.primary,
      padding: Spacing,
      borderRadius: Spacing / 2,
      width: "100%",
      alignItems: "center",
    },
    closeButtonText: {
      color: isDarkMode ? "#000" : Colors.onPrimary,
      fontFamily: Fonts["poppins-bold"],
    },
  });

export default Workouts;
