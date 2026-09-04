import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function SplashScreen() {
  const { theme } = useTheme();

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: theme.background,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <Text style={{ color: theme.primary, fontSize: 28, fontWeight: 'bold' }}>
        JARVIS PRO MAX
      </Text>
      <ActivityIndicator size="large" color={theme.primary} style={{ marginTop: 20 }} />
    </View>
  );
}
