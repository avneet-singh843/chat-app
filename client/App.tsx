import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import JoinScreen from './screens/JoinScreen';
import ChatScreen from './screens/ChatScreen';
import { ScreenNames } from './constants/enums';

export type RootStackParamList = {
  [ScreenNames.JOIN]: undefined; // No parameters expected for Join screen
  [ScreenNames.CHAT]: { username: string }; // Chat screen expects a username string
};

export type JoinScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.JOIN
>;
export type ChatScreenProps = NativeStackScreenProps<
  RootStackParamList,
  ScreenNames.CHAT
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={ScreenNames.JOIN}>
        <Stack.Screen
          name={ScreenNames.JOIN}
          component={JoinScreen}
          options={{ title: 'Join Chat' }}
        />
        <Stack.Screen name={ScreenNames.CHAT} component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
