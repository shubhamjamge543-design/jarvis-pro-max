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
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function SignupScreen({ navigation }) {
  const { theme } = useTheme();
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    if (!displayName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    const result = await signUp(email, password, displayName);
    setLoading(false);

    if (!result.success) {
      Alert.alert('Signup Failed', result.error);
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
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <MaterialCommunityIcons
          name="robot"
          size={80}
          color={theme.primary}
          style={{ marginBottom: 30, textAlign: 'center' }}
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
          Create Account
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: theme.textSecondary,
            marginBottom: 30,
            textAlign: 'center',
          }}
        >
          Join JARVIS PRO MAX
        </Text>

        <View style={{ marginBottom: 15 }}>
          <Text style={{ color: theme.text, marginBottom: 8, fontSize: 12 }}>
            Display Name
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
            placeholder="Your Name"
            placeholderTextColor={theme.textSecondary}
            value={displayName}
            onChangeText={setDisplayName}
          />
        </View>

        <View style={{ marginBottom: 15 }}>
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

        <View style={{ marginBottom: 15 }}>
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

        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: theme.text, marginBottom: 8, fontSize: 12 }}>
            Confirm Password
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
            placeholder="••••••••"
            placeholderTextColor={theme.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={handleSignup}
          disabled={loading}
          style={{
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
              Create Account
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: theme.textSecondary, fontSize: 14, textAlign: 'center' }}>
            Already have an account?{' '}
            <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
              Sign In
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
