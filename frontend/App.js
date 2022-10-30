import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SettingsScreen from "./src/screens/settings/SettingsScreen";

export default function App() {
  return <SettingsScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
