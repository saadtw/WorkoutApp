import { StyleSheet, Text, View } from "react-native";
import { FitnessContext } from "./Context";

import StackNavigator from "./StackNavigator";

export default function App() {
  return (
    <FitnessContext>
      <StackNavigator />
    </FitnessContext>
  ) ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
