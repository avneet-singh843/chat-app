import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Pressable,
} from 'react-native';
import { io, Socket } from 'socket.io-client';
import { ChatScreenProps } from '../App';
import { ConnectionStatus, Message } from '../types/types';
import { ConnectionStatusHeader } from '../components/ConnectionStatusHeader';
import { MessageBubble } from '../components/MessageBubble';

const SERVER_URL = 'http://XXX.XXX.X.XX:3001';

const ChatScreen = ({ route, navigation }: ChatScreenProps) => {
  const { username } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>('connecting');

  const socketRef = useRef<Socket | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    navigation.setOptions({ title: `Group Chat` });

    socketRef.current = io(SERVER_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    const socket = socketRef.current;

    // Connection Event Listeners
    socket.on('connect', () => setConnectionStatus('connected'));
    socket.on('disconnect', () => setConnectionStatus('disconnected'));

    // Message Event Listeners
    socket.on('message_history', (history: Message[]) => setMessages(history));
    socket.on('receive_message', (newMessage: Message) => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [navigation]);

  // scrolls to the bottom when new messages are added & when the component mounts
  useEffect(() => {
    if (messages.length > 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [messages]);

  const handleSend = () => {
    if (
      message.trim().length > 0 &&
      socketRef.current &&
      connectionStatus === 'connected'
    ) {
      const messageData = {
        username: username,
        text: message.trim(),
      };
      socketRef.current.emit('send_message', messageData);
      setMessage('');
    }
  };

  const isSendDisabled = !message.trim() || connectionStatus !== 'connected';

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ConnectionStatusHeader status={connectionStatus} />
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <MessageBubble message={item} currentUser={username} />
          )}
          keyExtractor={item => item.id}
          style={styles.messageList}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder={
              connectionStatus === 'connected'
                ? 'Type a message...'
                : 'Waiting to connect...'
            }
            placeholderTextColor="#999"
            editable={connectionStatus === 'connected'}
          />
          <Pressable
            onPress={handleSend}
            disabled={isSendDisabled}
            style={({ pressed }) => [
              styles.sendButton,
              { backgroundColor: isSendDisabled ? '#b0c4de' : '#007AFF' },
              { opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
  },
  messageList: {
    flex: 1,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    backgroundColor: 'white',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatScreen;
