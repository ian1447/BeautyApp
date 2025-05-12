import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import dayjs from "dayjs";

export const unstable_settings = {
  initialRouteName: "chat/[id]",
};

export default function ChatPage() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams(); // Get the chat ID from the route parameters
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "User",
      text: "asd!",
      datetime: "2025-05-09T09:15:00", // ISO format
    },
    {
      id: "2",
      sender: "Beautician",
      text: "Hi there! How can I assist you today?",
      datetime: "2025-05-09T09:16:00",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) => new Date(b.datetime) - new Date(a.datetime)
    );
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const newMessageObject = {
        id: (messages.length + 1).toString(),
        sender: "User",
        text: newMessage,
        datetime: now.toISOString(), // standardized ISO format
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.beauticianName}>asd</Text>
        <View style={{ width: 60 }} />
      </View>

      <FlatList
        data={sortedMessages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === "User"
                ? styles.userMessage
                : styles.receiverMessage,
            ]}
          >
            <Text style={styles.messageSender}>{item.sender}:</Text>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.timestamp}>
              {dayjs(item.datetime).format("MMM D, YYYY h:mm A")}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        inverted
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />

        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={28} color="#EC7FA9" margin />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "space-between",
    // paddingTop: 20,
    // paddingHorizontal: 10,
    backgroundColor: "#fef2fe",
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderColor: "#ccc",
    borderRadius: 18,
    margin: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FFB8E0",
  },
  receiverMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#FFB8E0",
  },
  messageSender: {
    fontWeight: "bold",
  },
  messageText: {
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    paddingBottom: 25,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    marginLeft: 5,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#EC7FA9",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  backButton: {
    fontSize: 16,
    color: "#FFEDFA",
  },
  beauticianName: {
    fontSize: 18,
    fontWeight: "600",
  },
  sendButton: {
    margin: 8,
  },
  timestamp: {
    fontSize: 10,
    color: "#888",
    marginTop: 5,
    alignSelf: "flex-end",
  },
});
