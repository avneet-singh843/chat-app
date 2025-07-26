import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { ConnectionStatus } from '../types/types';

export const ConnectionStatusHeader = ({
  status,
}: {
  status: ConnectionStatus;
}) => {
  let backgroundColor = '#f0f0f0';
  let text = '';
  let showIndicator = false;

  switch (status) {
    case 'connected':
      return null;
    case 'connecting':
      backgroundColor = '#fde047';
      text = 'Connecting...';
      showIndicator = true;
      break;
    case 'disconnected':
      backgroundColor = '#fca5a5';
      text = 'Connection lost. Reconnecting...';
      showIndicator = true;
      break;
  }

  return (
    <View style={[styles.statusHeader, { backgroundColor }]}>
      {showIndicator && (
        <ActivityIndicator
          size="small"
          color="#333"
          style={{ marginRight: 10 }}
        />
      )}
      <Text style={styles.statusHeaderText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusHeader: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  statusHeaderText: {
    color: '#333',
    fontWeight: '500',
  },
});
