import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Splash from './src/screens/splash';
import Welcome from './src/screens/welcome';
import Qr from './src/screens/qr';
import Profile from './src/screens/profile';
import Tokens from './src/screens/tokens';
import Dashboard from './src/screens/dashboard';
import Wallet from './src/screens/wallet';
import Gigs from './src/screens/gigs';
import Messages from './src/screens/messages';
import Chat from './src/screens/chat';

const Stack = createStackNavigator();


function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
    >
      <Stack.Screen 
        name="Splash" 
        component={Splash} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Welcome" 
        component={Welcome} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Qr" 
        component={Qr} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Tokens" 
        component={Tokens} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Wallet" 
        component={Wallet} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Gigs" 
        component={Gigs} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Messages" 
        component={Messages} 
        options={{ headerShown: false}} 
      />
      <Stack.Screen 
        name="Chat" 
        component={Chat} 
        options={{ headerShown: false}} 
      />
      
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}