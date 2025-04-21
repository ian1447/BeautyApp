import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuthStore } from "../../store/authStore";

export default function Profile() {
  const { logout} = useAuthStore();
  return (
    <View>
      <Text>Profile Screen</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
