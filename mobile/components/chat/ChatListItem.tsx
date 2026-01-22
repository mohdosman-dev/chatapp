import { ChatType } from "@/app/@types/chat.type";
import { Image } from "expo-image";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { formatDistanceToNow } from "date-fns";

type ChatListItemProps = {
  chat: ChatType;
  participant: { name?: string; avatar?: string };
  onPress?: () => void;
};
const ChatListItem = ({ chat, participant, onPress }: ChatListItemProps) => {
  const isOnline = true;
  const hasUnreadMessages = true;
  const isTyping = false;

  return (
    <View>
      <Pressable
        className="flex-row items-center py-3 active:opacity-70"
        onPress={onPress}
      >
        {/* AVATAR + ONLINE INDICATOR */}
        <View className="relative">
          <Image
            source={participant.avatar}
            placeholder={require("../../assets/images/logo.png")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: "#1A1A1D",
            }}
          />
          {isOnline && (
            <View className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-[3px] border-surface" />
          )}
        </View>

        {/* CHAT INFO */}
        <View className="flex-1 ml-3">
          <View
            className="flx-row justify-between items-center"
            style={{ flexDirection: "row" }}
          >
            {/* NAME */}
            <Text
              className={`text-base font-medium ${hasUnreadMessages ? "text-primary" : "text-foreground"}`}
            >
              {participant.name}
            </Text>

            {/* UNREAD MESSAGES + TIME */}
            <View className="flex-row items-center gap-2">
              {hasUnreadMessages && (
                <View className="size-2.5 bg-primary rounded-full" />
              )}
              <Text className="text-xs text-subtle-foreground">
                {chat.lastMessage?.createdAt
                  ? formatDistanceToNow(chat.lastMessage.createdAt, {
                      addSuffix: false,
                    })
                  : ""}
              </Text>
            </View>
          </View>
          {isTyping ? (
            <Text className="text-sm text-primary">Typing...</Text>
          ) : (
            <Text
              className={`text-sm ${hasUnreadMessages ? "text-foreground font-medium" : "text-subtle-foreground"}`}
            >
              {chat.lastMessage?.content ||
                `Send message to ${participant.name}`}
            </Text>
          )}
        </View>
      </Pressable>
    </View>
  );
};

export default ChatListItem;
