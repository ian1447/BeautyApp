import React, { useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const images = [
  {
    id: "1",
    uri: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww",
    description: "Modern beauty studio with premium tools and serene decor.",
  },
  {
    id: "2",
    uri: "https://plus.unsplash.com/premium_photo-1673765123739-3862ccaeb3d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FtcGxlfGVufDB8fDB8fHww",
    description: "Well-lit space ideal for facials, waxing, and skincare.",
  },
];

export default function BeauticianProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  const goToChat = (id: string) => {
    console.log(id);
    
    router.push(`/(chat)/${id}`);
  };

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.uri }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.imageDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.scrollcontainer}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/beautician")}
        >
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <FlatList
          data={images}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facility</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Air-conditioned rooms</Text>
            <Text style={styles.bulletItem}>
              • Sanitized professional equipment
            </Text>
            <Text style={styles.bulletItem}>• Comfortable massage tables</Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
            <Text style={styles.bulletItem}>
              • Soft lighting and relaxing music
            </Text>
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.divider} />
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <Text style={styles.sectionContent}>⭐ 4.8 (200 reviews)</Text>
        </View>

        {/* Price and Book Button */}
        <View style={styles.bookingSection}>
          <Text style={styles.price}>Price: $80</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => goToChat(id)} 
            >
              <Text style={styles.bookButtonText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bookButton}
              onPress={() => alert("Booked!")}
            >
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollcontainer: {
    backgroundColor: "#fef2fe",
    flex: 1,
  },
  container: {
    backgroundColor: "#fef2fe",
    paddingBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 10,
    left: 14,
    zIndex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 10,
    elevation: 5,
  },
  imageContainer: {
    width: width,
    height: height / 3,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    padding: 16,
    alignItems: "center",
  },
  imageDescription: {
    fontSize: 16,
    fontStyle: "italic",
    textAlign: "center",
    color: "#333",
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
  },
  sectionContent: {
    fontSize: 16,
    color: "#444",
  },
  bookingSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 10,
  },
  bookButton: {
    backgroundColor: "#ff69b4",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  secondaryButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginHorizontal: 16,
    marginTop: 20,
  },
  bulletList: {
    marginTop: 6,
  },
  bulletItem: {
    fontSize: 16,
    color: "#444",
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
});
