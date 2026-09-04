import React, { createContext, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useAuth } from './AuthContext';

const ToolContext = createContext({});

export const ToolProvider = ({ children }) => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userToken } = useAuth();

  const headers = userToken ? { Authorization: `Bearer ${userToken}` } : {};

  const fetchTools = useCallback(async () => {
    if (!userToken) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/tools`, { headers });
      setTools(response.data.tools || []);
    } catch (error) {
      console.error('Failed to fetch tools', error);
    } finally {
      setLoading(false);
    }
  }, [userToken]);

  const executeTool = useCallback(
    async (toolName, params) => {
      if (!userToken) return null;
      try {
        const response = await axios.post(
          `${API_BASE_URL}/tools/execute`,
          { toolName, params },
          { headers }
        );
        return response.data;
      } catch (error) {
        console.error('Failed to execute tool', error);
        return {
          success: false,
          error: error.response?.data?.message || 'Tool execution failed',
        };
      }
    },
    [userToken]
  );

  return (
    <ToolContext.Provider
      value={{
        tools,
        loading,
        fetchTools,
        executeTool,
      }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export const useTool = () => {
  const context = useContext(ToolContext);
  if (!context) {
    throw new Error('useTool must be used within a ToolProvider');
  }
  return context;
};
