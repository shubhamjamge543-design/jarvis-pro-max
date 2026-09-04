import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

import ChatScreen from '../screens/ChatScreen';
import DevelopmentScreen from '../screens/DevelopmentScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ChatMain" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function DevelopmentStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DevMain" component={DevelopmentScreen} />
    </Stack.Navigator>
  );
}

function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SettingsMain" component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function MainStack() {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          if (route.name === 'ChatStack') {
            iconName = focused ? 'chat' : 'chat-outline';
          } else if (route.name === 'DevelopmentStack') {
            iconName = focused ? 'code-braces' : 'code-braces';
          } else if (route.name === 'SettingsStack') {
            iconName = focused ? 'cog' : 'cog-outline';
          }
          return <MaterialCommunityIcons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
          paddingBottom: 5,
        },
        tabBarLabel: ({ focused, color }) => {
          const label =
            route.name === 'ChatStack'
              ? 'Chat'
              : route.name === 'DevelopmentStack'
              ? 'Development'
              : 'Settings';
          return (
            <Text
              style={{
                color,
                fontSize: 12,
                fontWeight: focused ? 'bold' : 'normal',
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name="ChatStack" component={ChatStack} />
      <Tab.Screen name="DevelopmentStack" component={DevelopmentStack} />
      <Tab.Screen name="SettingsStack" component={SettingsStack} />
    </Tab.Navigator>
  );
}
