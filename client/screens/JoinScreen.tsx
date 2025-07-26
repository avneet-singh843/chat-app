import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Text,
  Pressable,
} from 'react-native';
import { JoinScreenProps } from '../App';
import { ScreenNames } from '../constants/enums';

const JoinScreen = ({ navigation }: JoinScreenProps) => {
  const [username, setUsername] = useState('');

  const handleJoin = () => {
    if (username.trim().length > 2) {
      navigation.navigate(ScreenNames.CHAT, { username: username.trim() });
    } else {
      Alert.alert(
        'Invalid Username',
        'Please enter a username with at least 3 characters.',
      );
    }
  };

  const isJoinDisabled = username.trim().length <= 2;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Group Chat</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        placeholderTextColor="#888"
      />
      <Pressable
        onPress={handleJoin}
        disabled={isJoinDisabled}
        style={({ pressed }) => [
          styles.joinButton,
          { backgroundColor: isJoinDisabled ? '#b0c4de' : '#007AFF' },
          { opacity: pressed ? 0.7 : 1 },
        ]}
      >
        <Text style={styles.joinButtonText}>Join Chat</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    fontSize: 16,
  },
  joinButton: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JoinScreen;
