import { View, Dimensions, Text, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/app/hooks/use.auth";

const { width, height } = Dimensions.get("window");
const LoginScreen = () => {
  const { login, isAuthenticating: isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  let hasError = false;

  const handleLogin = async () => {
    // Clear previous errors
    setEmailError("");
    setPasswordError("");

    try {
      if (!email) {
        setEmailError("Email is required");
        hasError = true;
      }
      if (!password) {
        setPasswordError("Password is required");
        hasError = true;
      }

      if (hasError) return;
      await login({ email, password });
      router.replace("/(tabs)");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-1 bg-surface-dark">
      {/* TODO: Animated orbs */}
      <View className="absolute inset-0 overflow-hidden"></View>

      <SafeAreaView className="flex-1">
        {/* TOP SECTION */}
        <View className="items-center pt-10">
          <Image
            source={require("@/assets/images/logo.png")}
            style={{ width: 100, height: 100, marginVertical: -20 }}
            contentFit="contain"
          />

          <Text className="text-4xl font-bold text-primary font-serif tracking-wider uppercase">
            ChatApp
          </Text>
        </View>

        {/* CENTER SECTION */}
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={require("@/assets/images/auth.png")}
            style={{
              width: width - 48,
              height: height * 0.3,
              marginBottom: 20,
            }}
            contentFit="contain"
          />
        </View>

        {/* AUTH FORM */}
        <View className="flex-col px-6 pb-10 gap-4">
          <Input
            label="Email Address"
            leadingIcon="mail-outline"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            onBlur={() => setEmailError("")}
            error={emailError}
          />

          <Input
            label="Password"
            leadingIcon="lock-closed-outline"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showPassword}
            error={passwordError}
            trailingIcon={showPassword ? "eye-off-outline" : "eye-outline"}
            onPressTrailing={() => setShowPassword(!showPassword)}
          />

          {/* Remember Me & Forgot Password */}
          <View className="flex-row items-center justify-between">
            <Pressable
              className="flex-row items-center"
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View
                className={`w-5 h-5 rounded border ${rememberMe ? "bg-primary border-primary" : "border-mute-foreground"} items-center justify-center`}
              >
                {rememberMe && (
                  <Ionicons name="checkmark" size={14} color="#FFF" />
                )}
              </View>
              <Text className="text-mute-foreground text-sm ml-2">
                Remember me
              </Text>
            </Pressable>

            <Pressable>
              <Text
                className="text-primary text-sm font-medium"
                onPress={() => console.log("Forgot Password")}
              >
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          <Button
            title="Log In"
            className="mt-2"
            isLoading={isLoading}
            onPress={handleLogin}
          />

          {/* Register Link */}
          <View className="flex-row justify-center mt-4">
            <Text className="text-mute-foreground">
              Don&apos;t have an account?{" "}
            </Text>
            <Link href="/(auth)/register" asChild>
              <Pressable>
                <Text className="text-primary font-bold">Sign Up</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default LoginScreen;
