// In your App.js or an AuthProvider component
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import LoginForm from './components/LoginForm';
import HomeScreen from './screens/HomeScreen';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkToken() {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        // Optionally, validate token expiration here.
        setIsLoggedIn(true);
      }
      setLoading(false);
    }
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return isLoggedIn ? <HomeScreen /> : <LoginForm onLoginSuccess={() => setIsLoggedIn(true)} />;
}
