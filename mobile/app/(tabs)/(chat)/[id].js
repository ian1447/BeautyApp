import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function ChatPage() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat with ID: {id}</Text>
    </View>
  );
}