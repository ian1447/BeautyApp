import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // For the back icon

const { width, height } = Dimensions.get("window"); // Get screen width and height

const images = [
  {
    id: "1",
    uri: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww",
  },
  {
    id: "2",
    uri: "https://plus.unsplash.com/premium_photo-1673765123739-3862ccaeb3d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FtcGxlfGVufDB8fDB8fHww",
  },
];

export default function BeauticianProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  useEffect(() => {
    return () => {};
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <ScrollView style={styles.scrollcontainer}>
      <View style={styles.container}>
        <TouchableOpacity style={[styles.backButton, { width: 50, height: 50 }]} onPress={() => router.push("/beautician")}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        {/* FlatList for swipeable images */}
        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />

        {/* Text placed below the carousel */}
        <View style={styles.textContainer}>
          <Text style={styles.text}>Swipe through the images! {id}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollcontainer: {
    backgroundColor: "#fef2fe",
    flex: 1
  },
  container: {
    backgroundColor: "#fef2fe",
  },
  backButton: {
    position: "absolute",
    top: 10, // Adjust this value to move the button vertically
    left: 14, // Adjust this value to move the button horizontally
    zIndex: 1, // Ensure the back button is above the images
  },
  imageContainer: {
    width: width,
    height: height / 3, // Adjust height as needed
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%", // Ensures the image covers the entire container
  },
  textContainer: {
    padding: 16,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
