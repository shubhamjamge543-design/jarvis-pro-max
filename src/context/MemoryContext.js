import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useAuth } from './AuthContext';

const MemoryContext = createContext({});

export const MemoryProvider = ({ children }) => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userToken } = useAuth();

  const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};

  const fetchMemories = useCallback(async () => {
    if (!userToken) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/memory`, { headers });
      setMemories(response.data.memories || []);
    } catch (error) {
      console.error('Failed to fetch memories', error);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  const addMemory = useCallback(
    async (content, type = 'general', importance = 'medium') => {
      if (!userToken) return null;
      try {
        const response = await axios.post(
          `${API_BASE_URL}/memory`,
          { content, type, importance },
          { headers }
        );
        setMemories([...memories, response.data]);
        return response.data;
      } catch (error) {
        console.error('Failed to add memory', error);
        return null;
      }
    },
    [userToken, memories]
  );

  const deleteMemory = useCallback(
    async (memoryId) => {
      if (!userToken) return false;
      try {
        await axios.delete(`${API_BASE_URL}/memory/${memoryId}`, { headers });
        setMemories(memories.filter((m) => m.id !== memoryId));
        return true;
      } catch (error) {
        console.error('Failed to delete memory', error);
        return false;
      }
    },
    [userToken, memories]
  );

  const searchMemories = useCallback(
    async (query) => {
      if (!userToken) return [];
      try {
        const response = await axios.get(
          `${API_BASE_URL}/memory/search?q=${query}`,
          { headers }
        );
        return response.data.results || [];
      } catch (error) {
        console.error('Failed to search memories', error);
        return [];
      }
    },
    [userToken]
  );

  return (
    <MemoryContext.Provider
      value={{
        memories,
        loading,
        fetchMemories,
        addMemory,
        deleteMemory,
        searchMemories,
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};
