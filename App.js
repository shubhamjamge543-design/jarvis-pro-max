import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SecureStore from 'expo-secure-store';

import AuthStack from './src/navigation/AuthStack';
import MainStack from './src/navigation/MainStack';
import SplashScreen from './src/screens/SplashScreen';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { MemoryProvider } from './src/context/MemoryContext';
import { ToolProvider } from './src/context/ToolContext';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { isSignedIn, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isSignedIn ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MemoryProvider>
          <ToolProvider>
            <RootNavigator />
          </ToolProvider>
        </MemoryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
