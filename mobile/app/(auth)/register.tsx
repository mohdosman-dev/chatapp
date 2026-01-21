import { View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/app/hooks/use.auth";

const RegisterScreen = () => {
  const router = useRouter();

  const { signup, isSigningUp: isLoading } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Please enable camera roll permissions to pick an image.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setAvatar(
        `data:${result.assets[0].mimeType};base64,${result.assets[0].base64}`,
      );
    }
  };

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await signup({
        email,
        password,
        name: username,
        avatar,
      });
      Alert.alert("Success", "Account created successfully!");
      router.replace("/(auth)/login");
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Registration failed",
      );
    } finally {
    }
  };

  return (
    <View className="flex-1 bg-surface-dark">
      {/* TODO: Animated orbs */}
      <View className="absolute inset-0 overflow-hidden"></View>

      <SafeAreaView className="flex-1">
        {/* TOP SECTION */}
        <View className="items-center pt-6">
          <Text className="text-3xl font-bold text-primary font-serif tracking-wider uppercase mb-6">
            Create Account
          </Text>

          {/* Avatar Picker */}
          <Pressable
            onPress={pickImage}
            className="w-24 h-24 rounded-full bg-surface-light border-2 border-surface-soft items-center justify-center overflow-hidden mb-4"
          >
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                style={{ width: "100%", height: "100%" }}
                contentFit="cover"
              />
            ) : (
              <View className="items-center justify-center">
                <Ionicons name="camera-outline" size={32} color="#A0A0A5" />
                <Text className="text-xs text-mute-foreground mt-1">
                  Add Photo
                </Text>
              </View>
            )}
          </Pressable>
        </View>

        {/* AUTH FORM */}
        <View className="flex-col px-6 pb-10 gap-4 mt-4">
          <Input
            label="Username"
            iconName="person-outline"
            placeholder="Choose a username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Input
            label="Email Address"
            iconName="mail-outline"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            iconName="lock-closed-outline"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title="Sign Up"
            className="mt-4"
            onPress={handleRegister}
            isLoading={isLoading}
          />

          {/* Login Link */}
          <View className="flex-row justify-center mt-4">
            <Text className="text-mute-foreground">
              Already have an account?{" "}
            </Text>
            <Link href="/(auth)/login" asChild>
              <Pressable>
                <Text className="text-primary font-bold">Log In</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default RegisterScreen;
