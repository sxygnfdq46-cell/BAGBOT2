'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  LoginCredentials,
  RegisterData,
  ForgotPasswordData,
  ResetPasswordData,
  AuthContextType,
  AuthError,
  AuthResponse,
  TokenResponse,
} from '@/types/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API URL - Use environment variable or default to Render backend
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://bagbot-web.onrender.com/api';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      const userData = localStorage.getItem('user');
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (err) {
          console.error('Failed to restore session:', err);
        }
      }
      setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('🔐 Login attempt for:', credentials.email);
      console.log('🌐 API URL:', API_URL);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data: AuthResponse = await response.json();
      
      console.log('✅ Login successful:', data.user.email);

      // Store tokens and user data
      localStorage.setItem('accessToken', data.tokens.accessToken);
      localStorage.setItem('refreshToken', data.tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      
      console.log('💾 User data stored, redirecting...');
      
      // Use window.location for reliable redirect
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error('🚨 Login error:', err);
      setError({
        message: err.message || 'Login failed',
        code: 'LOGIN_ERROR',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          name: data.name,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const authData: AuthResponse = await response.json();
      
      console.log('✅ New user registered:', authData.user.email);

      // Store tokens and user data
      localStorage.setItem('accessToken', authData.tokens.accessToken);
      localStorage.setItem('refreshToken', authData.tokens.refreshToken);
      localStorage.setItem('user', JSON.stringify(authData.user));
      
      setUser(authData.user);
      
      // Use window.location for reliable redirect
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (err: any) {
      setError({
        message: err.message || 'Registration failed',
        code: 'REGISTER_ERROR',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Clear tokens and user data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    setUser(null);
    
    // Use window.location for reliable redirect
    if (typeof window !== 'undefined') {
      window.location.href = '/landing';
    }
  };

  const forgotPassword = async (data: ForgotPasswordData) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to send reset email');
      }

      // Success - email sent
    } catch (err: any) {
      setError({
        message: err.message || 'Failed to send reset email',
        code: 'FORGOT_PASSWORD_ERROR',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (data: ResetPasswordData) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: data.token,
          password: data.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to reset password');
      }

      // Success - redirect to login
      router.push('/login?reset=success');
    } catch (err: any) {
      setError({
        message: err.message || 'Failed to reset password',
        code: 'RESET_PASSWORD_ERROR',
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');
      const userData = localStorage.getItem('user');
      
      if (!refreshTokenValue || !userData) {
        throw new Error('No refresh token');
      }

      // Mock token refresh - just extend the expiration
      const newToken = btoa(JSON.stringify({ 
        email: JSON.parse(userData).email, 
        exp: Date.now() + 3600000 
      }));
      
      localStorage.setItem('accessToken', newToken);
      localStorage.setItem('refreshToken', newToken);
      
      setUser(JSON.parse(userData));
    } catch (err) {
      // Refresh failed, logout user
      logout();
      throw err;
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    refreshToken,
    error,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
