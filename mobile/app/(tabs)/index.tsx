import React, { useEffect } from "react";
import { View, ActivityIndicator, FlatList } from "react-native";
import { useChats } from "../hooks/use.chats";
import { ChatType } from "../@types/chat.type";
import ChatListHeader from "../../components/chat/ChatListHeader";
import ChatListItem from "../../components/chat/ChatListItem";
import EmptyChatList from "@/components/chat/EmptyChatList";
import { useAuth } from "../hooks/use.auth";
import { useRouter } from "expo-router";

const ChatsTab = () => {
  const router = useRouter();
  const { chats, getChats, isLoadingChats: isLoading } = useChats();
  const { user } = useAuth();

  const fetchChats = async () => {
    try {
      await getChats();
    } catch (error: any) {
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchChats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChatPress = (chat: ChatType): void => {
    router.push(`/chat/${chat._id}`);
  };

  const handleNewConversation = () => {};

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
        renderItem={({ item: chat }) => {
          const participant: { name?: string; avatar?: string } =
            chat.participants.find(
              (participant) => participant._id !== user?._id,
            ) || {};

          if (!participant.name) {
            participant.name = chat.groupName || "Group Chat";
          }

          return (
            <ChatListItem
              chat={chat}
              participant={participant}
              onPress={() => handleChatPress(chat)}
            />
          );
        }}
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
            iconName="chatbubbles-outline"
            onPressButton={handleNewConversation}
          />
        }
      />
    </View>
  );
};

export default ChatsTab;
