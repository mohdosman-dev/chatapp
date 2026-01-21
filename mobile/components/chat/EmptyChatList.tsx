import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../ui/Button";

type EmptyChatListProp = {
  title: string;
  subtitle?: string;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  iconSize?: number;
  buttonLabel?: string;
  onPressButton?: () => void;
};

const EmptyChatList = ({
  title,
  subtitle,
  iconName = "chatbubble-outline",
  iconColor = "#6B6B70",
  iconSize = 64,
  buttonLabel,
  onPressButton,
}: EmptyChatListProp) => {
  return (
    <View className="flex-1 items-center justify-center py-24">
      {iconName && (
        <Ionicons name={iconName} color={iconColor} size={iconSize} />
      )}

      <Text className="text-mute-foreground text-lg mt-4">{title}</Text>
      {subtitle && (
        <Text className="text-subtle-foreground text-sm mt-1">{subtitle}</Text>
      )}

      {buttonLabel && buttonLabel ? (
        <Button
          className="mt-6 rounded-full"
          onPress={onPressButton}
          title={buttonLabel}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({});

export default EmptyChatList;
