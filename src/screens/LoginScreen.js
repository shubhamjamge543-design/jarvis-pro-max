import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    const result = await signIn(email, password);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Login Failed', result.error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}
      >
        <MaterialCommunityIcons
          name="robot"
          size={80}
          color={theme.primary}
          style={{ marginBottom: 30 }}
        />
        <Text
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.primary,
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          JARVIS PRO MAX
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.textSecondary,
            marginBottom: 30,
            textAlign: 'center',
          }}
        >
          Your Personal AI Assistant
        </Text>

        <View
          style={{
            width: '100%',
            marginBottom: 15,
          }}
        >
          <Text style={{ color: theme.text, marginBottom: 8, fontSize: 12 }}>
            Email
          </Text>
          <TextInput
            style={{
              backgroundColor: theme.surface,
              color: theme.text,
              paddingHorizontal: 15,
              paddingVertical: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.border,
            }}
            placeholder="your@email.com"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View
          style={{
            width: '100%',
            marginBottom: 20,
          }}
        >
          <Text style={{ color: theme.text, marginBottom: 8, fontSize: 12 }}>
            Password
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.surface,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: theme.border,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                color: theme.text,
                paddingHorizontal: 15,
                paddingVertical: 12,
              }}
              placeholder="••••••••"
              placeholderTextColor={theme.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={{ paddingHorizontal: 15 }}
            >
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={20}
                color={theme.textSecondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            backgroundColor: theme.primary,
            paddingVertical: 14,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? (
            <ActivityIndicator color={theme.background} />
          ) : (
            <Text
              style={{
                color: theme.background,
                fontSize: 16,
                fontWeight: 'bold',
              }}
            >
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: theme.textSecondary, fontSize: 14 }}>
            Don't have an account?{' '}
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
              Sign Up
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
