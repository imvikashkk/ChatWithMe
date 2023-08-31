import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ChatScreen from '../screens/ChatScreen';
import ChatMessage from '../screens/ChatMessage';
import Starter from "../screens/Starter"

const Stack = createNativeStackNavigator();
const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Starter" component={Starter} options={{headerShown:false}} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false}} />

        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{headerShown:false}} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        <Stack.Screen name="FriendsScreen" component={FriendsScreen} options={{headerTitle: "Friends"}} />

        <Stack.Screen name="ChatScreen" component={ChatScreen} options={{headerTitle: "Chats"}} />

        <Stack.Screen name="ChatMessage" component={ChatMessage}  />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation

const styles = StyleSheet.create({})