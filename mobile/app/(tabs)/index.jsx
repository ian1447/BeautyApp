import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useAuthStore } from "../../store/authStore";
import { MaterialCommunityIcons, Entypo, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

export const options = {
  headerShown: false,
};

const services = [
  { id: "1", name: "Bridesmaid Makeup", icon: "face-woman", color: "#2ed7c4", lib: "MaterialCommunityIcons" },
  { id: "2", name: "Wedding Makeup", icon: "link", color: "#ff67b3", lib: "Entypo" },
  { id: "3", name: "Graduation Makeup", icon: "graduation-cap", color: "#ffc42a", lib: "FontAwesome5" },
];

const getIcon = (lib, icon, color) => {
  const size = 24;
  switch (lib) {
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={icon} size={size} color="#fff" />;
    case "Entypo":
      return <Entypo name={icon} size={size} color="#fff" />;
    case "FontAwesome5":
      return <FontAwesome5 name={icon} size={size} color="#fff" />;
    default:
      return null;
  }
};

export default function Home() {
  const { user } = useAuthStore();
  const router = useRouter();
  
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text_header}>Welcome {user?.username}!!</Text>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/beautician')}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Discover beautician</Text>
            <Text style={styles.subtitle}>Tell us your detail needs</Text>
          </View>

          <Image
            source={require("../../assets/images/beaut.jpg")} // Use your local image path
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.heading}>Our selected beauty service</Text>

          <FlatList
            data={services}
            horizontal
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 12 }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.serviceItem}>
                <View style={[styles.iconWrapper, { backgroundColor: item.color }]}>{getIcon(item.lib, item.icon, item.color)}</View>
                <Text style={styles.label}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    textAlign: "center",
  },
  text_header: {
    textAlign: "auto",
    fontSize: 30,
    paddingLeft: 15,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f7b2d9",
    flexDirection: "row",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: "#000",
    fontWeight: "700",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#000",
    opacity: 0.9,
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 10,
    borderRadius: 40, // Half of width/height
    overflow: "hidden",
  },
  serviceItem: {
    alignItems: "center",
    marginRight: 16,
    width: 90,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
});
