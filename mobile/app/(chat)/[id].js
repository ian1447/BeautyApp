import { View, Text, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export const unstable_settings = {
  initialRouteName: 'chat/[id]',
};

export default function ChatPage() {
  const { id } = useLocalSearchParams();  // Get the chat ID from the route parameters
  const [messages, setMessages] = useState([
    { id: '1', sender: 'User', text: 'asd!' },
    { id: '2', sender: 'ChatBot', text: 'Hi there! How can I assist you today?' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMessageObject = {
        id: (messages.length + 1).toString(),
        sender: 'User',
        text: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, newMessageObject]);
      setNewMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chatTitle}>Chat with ID: {id}</Text>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'User' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageSender}>{item.sender}:</Text>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        inverted  // Display latest messages at the bottom
        style={styles.messageList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  chatTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    borderWidth: 1,  // Add border to the message boxes
    borderColor: '#ccc',  // Light gray border color
    borderRadius: 15,  // Apply curved corners (border radius)
  },
  userMessage: {
    alignSelf: 'flex-end',  
    backgroundColor: '#DCF8C6', 
  },
  botMessage: {
    alignSelf: 'flex-start',  
    backgroundColor: '#E5E5E5',  
  },
  messageSender: {
    fontWeight: 'bold',
  },
  messageText: {
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
});
