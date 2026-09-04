import React, { createContext, useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.payload,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.payload.token,
            user: action.payload.user,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignedIn: false,
            userToken: null,
            user: null,
          };
        case 'SIGN_UP':
          return {
            ...prevState,
            isSignedIn: true,
            userToken: action.payload.token,
            user: action.payload.user,
          };
        default:
          return prevState;
      }
    },
    {
      isLoading: true,
      isSignedIn: false,
      userToken: null,
      user: null,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const user = await SecureStore.getItemAsync('user');
        if (token && user) {
          dispatch({
            type: 'RESTORE_TOKEN',
            payload: token,
          });
        } else {
          dispatch({ type: 'RESTORE_TOKEN', payload: null });
        }
      } catch (e) {
        console.error('Failed to restore token', e);
        dispatch({ type: 'RESTORE_TOKEN', payload: null });
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (email, password) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/login`, {
            email,
            password,
          });
          const { token, user } = response.data;
          await SecureStore.setItemAsync('userToken', token);
          await SecureStore.setItemAsync('user', JSON.stringify(user));
          dispatch({
            type: 'SIGN_IN',
            payload: { token, user },
          });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || 'Login failed',
          };
        }
      },
      signUp: async (email, password, displayName) => {
        try {
          const response = await axios.post(`${API_BASE_URL}/auth/register`, {
            email,
            password,
            displayName,
          });
          const { token, user } = response.data;
          await SecureStore.setItemAsync('userToken', token);
          await SecureStore.setItemAsync('user', JSON.stringify(user));
          dispatch({
            type: 'SIGN_UP',
            payload: { token, user },
          });
          return { success: true };
        } catch (error) {
          return {
            success: false,
            error: error.response?.data?.message || 'Signup failed',
          };
        }
      },
      signOut: async () => {
        try {
          await SecureStore.deleteItemAsync('userToken');
          await SecureStore.deleteItemAsync('user');
          dispatch({ type: 'SIGN_OUT' });
        } catch (e) {
          console.error('Failed to sign out', e);
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ ...state, ...authContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
