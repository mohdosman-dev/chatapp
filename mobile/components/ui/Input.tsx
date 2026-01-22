import { View, Text, TextInput, TextInputProps, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  leadingIcon?: keyof typeof Ionicons.glyphMap;
  trailingIcon?: keyof typeof Ionicons.glyphMap;
  onPressTrailing?: () => void;
}

export const Input = ({
  label,
  leadingIcon: iconName,
  trailingIcon: trailingIconName,
  onPressTrailing,
  error,
  ...props
}: InputProps) => {
  return (
    <View className="gap-2">
      <Text className="text-foreground text-sm font-medium">{label}</Text>
      <View
        className={`w-full h-12 bg-surface-light rounded-xl border flex-row items-center px-4 focus:border-primary ${
          error ? "border-red-500" : "border-surface-soft"
        }`}
      >
        {iconName && <Ionicons name={iconName} size={20} color="#A0A0A5" />}
        <TextInput
          className="flex-1 ml-3 text-foreground"
          placeholderTextColor="#6B6B70"
          {...props}
        />
        {trailingIconName && (
          <Pressable onPress={onPressTrailing}>
            <Ionicons name={trailingIconName} size={20} color="#A0A0A5" />
          </Pressable>
        )}
      </View>
      {error && <Text className="text-red-500 text-xs">{error}</Text>}
    </View>
  );
};
