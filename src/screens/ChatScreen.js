import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export default function ChatScreen() {
  const { theme } = useTheme();
  const { userToken } = useAuth();
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const sendMessage = async () => {
    if (!inputText.trim() || !userToken) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/chat`,
        { message: inputText },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      const aiMessage = {
        id: Date.now() + 1,
        text: response.data.response,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Failed to send message', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Failed to get response. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        {
          alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
          marginVertical: 8,
          marginHorizontal: 12,
          maxWidth: '80%',
          padding: 12,
          borderRadius: 12,
          backgroundColor:
            item.sender === 'user' ? theme.primary : theme.surfaceLight,
        },
      ]}
    >
      <Text
        style={{
          color: item.sender === 'user' ? theme.background : theme.text,
          fontSize: 14,
        }}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: theme.background }}
    >
      <View style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingTop: 10 }}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />
        {loading && (
          <View style={{ padding: 16 }}>
            <ActivityIndicator size="small" color={theme.primary} />
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 12,
          backgroundColor: theme.surface,
          borderTopWidth: 1,
          borderTopColor: theme.border,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: theme.surfaceLight,
            color: theme.text,
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 20,
            marginRight: 8,
          }}
          placeholder="Type your message..."
          placeholderTextColor={theme.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
        />
        <TouchableOpacity
          onPress={sendMessage}
          disabled={loading || !inputText.trim()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: theme.primary,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: loading || !inputText.trim() ? 0.5 : 1,
          }}
        >
          <MaterialCommunityIcons
            name="send"
            size={20}
            color={theme.background}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
