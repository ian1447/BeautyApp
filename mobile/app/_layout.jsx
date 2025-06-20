import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { StatusBar  } from "react-native";
import {useAuthStore} from "../store/authStore"; 
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const {checkAuth,user,token} = useAuthStore();

  useEffect(()=> {
    checkAuth();
  }, []);

  useEffect(()=>{ 
    const inAuthScreen = segments[0] ==="(auth)";
    const isSignedIn = user && token;
    // console.log("user",user);
    // console.log("token",token);
    //  console.log("isSignedIn",isSignedIn);
    

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)");
    else if (isSignedIn && inAuthScreen && user.role === "user") router.replace("/(tabs)")
    else if (isSignedIn && inAuthScreen && user.role !== "user") router.replace("/(admin)")
  },[user,token,segments])

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(admin)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
        <StatusBar barStyle={"dark-content"} />
      </SafeScreen>
    </SafeAreaProvider>
  );
}
