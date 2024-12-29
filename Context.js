import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FitnessItems = createContext();

const FitnessContext = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [calories, setCalories] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [selectedExerciseCategory, setSelectedExerciseCategory] = useState("Chest");
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load fitness data
  const loadFitnessData = async () => {
    const storedData = await AsyncStorage.getItem("fitnessData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const lastUpdated = new Date(parsedData.lastUpdated);
      const currentDate = new Date();

      // Check if data is from the current day
      if (lastUpdated.toDateString() === currentDate.toDateString()) {
        setCompleted(parsedData.completed || []);
        setWorkout(parsedData.workout || 0);
        setCalories(parsedData.calories || 0);
        setMinutes(parsedData.minutes || 0);
      } else {
        await resetDailyData();
      }
    }
  };

  // Save fitness data
  const saveFitnessData = async () => {
    await AsyncStorage.setItem(
      "fitnessData",
      JSON.stringify({
        completed,
        workout,
        calories,
        minutes,
        lastUpdated: new Date().toISOString(),
      })
    );
  };

  // Reset fitness data
  const resetDailyData = async () => {
    setCompleted([]);
    setWorkout(0);
    setCalories(0);
    setMinutes(0);

    // Save reset data to AsyncStorage
    await AsyncStorage.setItem(
      "fitnessData",
      JSON.stringify({
        completed: [],
        workout: 0,
        calories: 0,
        minutes: 0,
        lastUpdated: new Date().toISOString(),
      })
    );
  };

  // Load dark mode state
  const loadDarkMode = async () => {
    const storedDarkMode = await AsyncStorage.getItem("isDarkMode");
    if (storedDarkMode !== null) {
      setIsDarkMode(JSON.parse(storedDarkMode));
    }
  };

  // Save dark mode state
  const saveDarkMode = async () => {
    await AsyncStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Effects for loading and saving data
  useEffect(() => {
    loadFitnessData();
    loadDarkMode();
  }, []);

  useEffect(() => {
    saveFitnessData();
  }, [completed, workout, calories, minutes]);

  useEffect(() => {
    saveDarkMode();
  }, [isDarkMode]);

  return (
    <FitnessItems.Provider
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        calories,
        setCalories,
        minutes,
        setMinutes,
        selectedExerciseCategory,
        setSelectedExerciseCategory,
        isDarkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };
