import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../constants/colors";

const DotIndicator = ({ currentIndex }) => {
  return (
    <View style={styles.dotsContainer}>
      {[0, 1, 2].map((index) => (
        <View
          key={index}
          style={[
            styles.dot,
            currentIndex === index && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.darkGray,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.primary,
  },
});

export default DotIndicator;
