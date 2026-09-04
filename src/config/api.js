import Constants from 'expo-constants';

// Use your backend URL here
export const API_BASE_URL =
  Constants.expoConfig?.extra?.apiUrl || 'http://localhost:5000/api';

// AI Provider Configuration
export const AI_CONFIG = {
  providers: {
    openai: {
      name: 'OpenAI',
      baseURL: 'https://api.openai.com/v1',
      models: ['gpt-4', 'gpt-3.5-turbo'],
      requiresApiKey: true,
    },
    anthropic: {
      name: 'Anthropic',
      baseURL: 'https://api.anthropic.com',
      models: ['claude-3-opus', 'claude-3-sonnet'],
      requiresApiKey: true,
    },
  },
};

// Speech Configuration
export const SPEECH_CONFIG = {
  language: 'en-US',
  rate: 1.0,
  pitch: 1.0,
};

// Storage Configuration
export const STORAGE_CONFIG = {
  maxLocalSize: 50 * 1024 * 1024, // 50MB
  cloudStorageEnabled: true,
};
