import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';

const chatList = [
  { id: '123', name: 'Alice', lastMessage: 'See you tomorrow!', time: '2:30 PM' },
  { id: '456', name: 'Bob', lastMessage: 'Got it, thanks!', time: '1:15 PM' },
  { id: '789', name: 'Charlie', lastMessage: 'Let’s catch up soon.', time: 'Yesterday' },
  { id: '101', name: 'David', lastMessage: 'Nice work!', time: 'Mon' },
  { id: '102', name: 'Eva', lastMessage: 'How’s it going?', time: 'Sun' },
  { id: '103', name: 'Fiona', lastMessage: 'Yes, I’ll be there.', time: 'Sat' },
  { id: '104', name: 'George', lastMessage: 'Meeting at 10.', time: 'Fri' },
  { id: '105', name: 'Helen', lastMessage: 'On my way.', time: 'Thu' },
  { id: '4', name: 'Charlie', lastMessage: 'Let’s catch up soon.', time: 'Yesterday' },
  { id: '2', name: 'David', lastMessage: 'Nice work!', time: 'Mon' },
  { id: '3', name: 'Eva', lastMessage: 'How’s it going?', time: 'Sun' },
];

export default function Chat() {
  const router = useRouter();

  const goToChat = (id: string) => {
    console.log(id);
    
    router.push(`/(chat)/${id}`);
  };

  return (
    <View style={styles.fullScreenContainer}>
      <FlatList
        data={chatList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => goToChat(item.id)} 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f9f9f9',
              padding: 12,
              marginBottom: 12,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            {/* Avatar */}
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                backgroundColor: '#dcdcdc',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {item.name.charAt(0)}
              </Text>
            </View>

            {/* Text Section */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ color: '#666', marginTop: 4 }}>{item.lastMessage}</Text>
            </View>

            {/* Time */}
            <Text style={{ color: '#999', fontSize: 12, marginLeft: 8 }}>
              {item.time}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#fef2fe",
    padding: 16,
  },
})