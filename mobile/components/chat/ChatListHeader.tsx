import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

type ChatListHeaderProps = {
  title?: string;
  onPressNewChat?: () => void;
};

const ChatListHeader = ({
  title = "Chats",
  onPressNewChat: onPress,
}: ChatListHeaderProps) => {
  return (
    <View className="px-5 pt-2 pb-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-2xl font-bold text-foreground">{title}</Text>
        <Pressable
          className="size-10 bg-primary rounded-full items-center justify-center"
          onPress={onPress}
        >
          <Ionicons name="create-outline" size={20} />
        </Pressable>
      </View>
    </View>
  );
};

export default ChatListHeader;
