import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Message } from '../types/types';

export const MessageBubble = ({
  message,
  currentUser,
}: {
  message: Message;
  currentUser: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMyMessage = message.username === currentUser;
  const CHARACTER_LIMIT = 100;
  const isLongMessage = message.text.length > CHARACTER_LIMIT;

  const formattedTime = new Date(message.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const displayedText =
    isLongMessage && !isExpanded
      ? `${message.text.substring(0, CHARACTER_LIMIT)}...`
      : message.text;

  return (
    <View
      style={[
        styles.messageBubble,
        isMyMessage ? styles.myMessage : styles.otherMessage,
      ]}
    >
      {!isMyMessage && (
        <Text style={styles.usernameText}>{message.username}</Text>
      )}
      <Text
        style={[styles.messageText, { color: isMyMessage ? 'white' : 'black' }]}
      >
        {displayedText}
      </Text>
      {isLongMessage && (
        <Pressable onPress={() => setIsExpanded(!isExpanded)}>
          <Text
            style={[
              styles.readMoreText,
              { color: isMyMessage ? '#d1eaff' : '#007AFF' },
            ]}
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </Text>
        </Pressable>
      )}
      <Text
        style={[
          styles.timestampText,
          { color: isMyMessage ? '#e0e0e0' : '#666' },
        ]}
      >
        {formattedTime}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  messageBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    marginVertical: 4,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 1,
    shadowOffset: { width: 0, height: 1 },
  },
  usernameText: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#007AFF',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 16,
  },
  timestampText: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  readMoreText: {
    fontWeight: 'bold',
    marginTop: 5,
  },
});
