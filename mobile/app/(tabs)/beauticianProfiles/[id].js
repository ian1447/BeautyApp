import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, Image, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window'); // Get screen width and height

const images = [
  { id: '1', uri: 'https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww' },
  { id: '2', uri: 'https://plus.unsplash.com/premium_photo-1673765123739-3862ccaeb3d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8c2FtcGxlfGVufDB8fDB8fHww' },
  // Add more images if needed
];

export default function BeauticianProfile() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  useEffect(() => {
    // In Expo/React Native, no need to manage back behavior manually,
    // Expo Router handles back behavior automatically for you.
    // So no need for popstate or window.addEventListener in this case.
    return () => {};
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <View style={styles.container}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fef2fe',
  },
  imageContainer: {
    width: width,
    height: height / 3,  // Adjust height as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%', // Ensures the image covers the entire container
  },
  textContainer: {
    padding: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
