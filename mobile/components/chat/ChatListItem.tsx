import { ChatType } from "@/app/@types/chat.type";
import React from "react";
import { Pressable, Text, View } from "react-native";

type ChatListItemProps = {
  chat: ChatType;
  onPress?: () => void;
}
const ChatListItem = ({ chat, onPress }: ChatListItemProps) => {
  return (
    <View>
      <Pressable onPress={onPress}>
        <Text>{chat.lastMessage?.content || "No message"}</Text>
      </Pressable>
    </View>
  );
};

export default ChatListItem;
