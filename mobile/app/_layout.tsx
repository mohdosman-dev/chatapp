import { router, SplashScreen, Stack } from "expo-router";
import "@/global.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hooks/use.auth";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const { fetchUser } = useAuth();

  const bootstrap = async () => {
    try {
      await fetchUser();
      router.replace("/(tabs)");
    } catch (error) {
      console.log(error);
      router.replace("/(auth)/login");
    } finally {
      await SplashScreen.hideAsync();
      setIsReady(true);
    }
  };

  useEffect(() => {
    if (isReady) return;
    bootstrap();
  }, [isReady]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
