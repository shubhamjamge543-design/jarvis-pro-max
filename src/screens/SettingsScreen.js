import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { signOut, user } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', onPress: () => {} },
      {
        text: 'Logout',
        onPress: () => signOut(),
        style: 'destructive',
      },
    ]);
  };

  const SettingItem = ({ icon, label, value, onToggle, isToggle = false }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.surfaceLight,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.border,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={theme.primary}
          style={{ marginRight: 12 }}
        />
        <Text style={{ color: theme.text, fontSize: 14, flex: 1 }}>{label}</Text>
      </View>
      {isToggle ? (
        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{ false: theme.border, true: theme.primaryDark }}
          thumbColor={value ? theme.primary : theme.textSecondary}
        />
      ) : (
        <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{value}</Text>
      )}
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: theme.primary,
          marginBottom: 16,
        }}
      >
        Settings
      </Text>

      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: theme.textSecondary,
          marginBottom: 12,
          textTransform: 'uppercase',
        }}
      >
        Account
      </Text>

      <SettingItem
        icon="account"
        label="Display Name"
        value={user?.displayName || 'User'}
      />
      <SettingItem icon="email" label="Email" value={user?.email || 'N/A'} />

      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: theme.textSecondary,
          marginBottom: 12,
          marginTop: 20,
          textTransform: 'uppercase',
        }}
      >
        Preferences
      </Text>

      <SettingItem
        icon="bell"
        label="Notifications"
        value={notificationsEnabled}
        onToggle={setNotificationsEnabled}
        isToggle
      />
      <SettingItem
        icon="microphone"
        label="Voice Commands"
        value={voiceEnabled}
        onToggle={setVoiceEnabled}
        isToggle
      />

      <Text
        style={{
          fontSize: 14,
          fontWeight: '600',
          color: theme.textSecondary,
          marginBottom: 12,
          marginTop: 20,
          textTransform: 'uppercase',
        }}
      >
        About
      </Text>

      <SettingItem icon="information" label="App Version" value="1.0.0" />
      <SettingItem icon="server" label="Backend" value="Connected" />

      <TouchableOpacity
        onPress={handleLogout}
        style={{
          backgroundColor: theme.error,
          paddingVertical: 14,
          borderRadius: 8,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
