import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useAuthStore } from "../../store/authStore";

export const options = {
  headerShown: false,
};

export default function Home() {
  const { logout } = useAuthStore();

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text_header}>home tabs</Text>
        <TouchableOpacity onPress={logout}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    textAlign: "center"
  },
  text_header: {
    textAlign: "auto"
  }
});