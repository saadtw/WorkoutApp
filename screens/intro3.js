import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/colors";
import Fonts from "../constants/fonts";
import FontSizes from "../constants/FontSize";
import Spacing from "../constants/Spacing";
import DotIndicator from "../components/DotIndicator";

const { width, height } = Dimensions.get("window");

const intro3 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/3.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>Yoga</Text>
      <Text style={styles.description}>
        Embrace mindfulness and flexibility through yoga, connecting your mind
        and body for a balanced lifestyle.
      </Text>
      <DotIndicator currentIndex={2} />
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    padding: Spacing * 2,
  },
  image: {
    width: width * 0.9,
    height: height * 0.4,
    borderRadius: Spacing,
    marginTop: Spacing * 2,
  },
  title: {
    fontSize: FontSizes.xLarge,
    fontFamily: Fonts["poppins-bold"],
    color: Colors.primary,
    marginVertical: Spacing,
  },
  description: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts["poppins-regular"],
    color: Colors.darkText,
    textAlign: "center",
    marginVertical: Spacing,
    lineHeight: 24,
  },
  features: {
    width: "80%",
  },
  featureText: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts["poppins-semiBold"],
    color: Colors.darkText,
    marginVertical: Spacing / 2,
  },
  nextButton: {
    backgroundColor: Colors.primary,
    paddingVertical: Spacing,
    paddingHorizontal: Spacing * 2,
    borderRadius: Spacing,
    elevation: 3,
  },
  buttonText: {
    fontSize: FontSizes.medium,
    fontFamily: Fonts["poppins-bold"],
    color: Colors.onPrimary,
  },
});

export default intro3;
