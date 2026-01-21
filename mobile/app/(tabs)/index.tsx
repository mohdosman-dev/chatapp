import React, { useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useChats } from "../hooks/use.chats";
import { ChatType } from "../@types/chat.type";
import ChatListHeader from "../../components/chat/ChatListHeader";
import ChatListItem from "../../components/chat/ChatListItem";
import EmptyChatList from "@/components/chat/EmptyChatList";

const ChatsTab = () => {
  const { chats, getChats, isLoadingChats: isLoading } = useChats();

  useEffect(() => {
    try {
      getChats();
    } catch (error: any) {
      alert(error.message);
    }
  }, [getChats]);

  const handleChatPress = (chat: ChatType): void => {
    console.log("Chat pressed: ", JSON.stringify(chat));
  };

  const handleNewConversation = () => {
    console.log("New conversation pressed");
  };

  if (isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-surface">
        <ActivityIndicator size="large" color="#F4A261" />
      </View>
    );

  return (
    <View className="flex-1 bg-surface">
      <FlatList
        data={chats}
        keyExtractor={(chat) => chat._id}
        renderItem={({ item: chat }) => (
          <ChatListItem chat={chat} onPress={() => handleChatPress(chat)} />
        )}
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        ListHeaderComponent={
          <ChatListHeader
            title="Chats"
            onPressNewChat={handleNewConversation}
          />
        }
        // ListFooterComponent={<ChatListFooter />}
        ListEmptyComponent={
          <EmptyChatList
            title="No chats found"
            buttonLabel="Start a new chat"
            onPressButton={handleNewConversation}
          />
        }
      />
    </View>
  );
};

export default ChatsTab;
