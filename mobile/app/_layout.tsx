import { router, SplashScreen, Stack } from "expo-router";
import "@/global.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/use.auth";
import * as SecureStore from "expo-secure-store";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const { fetchUser } = useAuth();

  const bootstarp = async () => {
    try {
      await fetchUser();
      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      await SecureStore.deleteItemAsync("token");
      router.replace("/(auth)/login");
    } finally {
      await SplashScreen.hideAsync();
      setIsReady(true)
    }
  };

  useEffect(() => {
    if (isReady) return
    bootstarp();
  }, [isReady]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
