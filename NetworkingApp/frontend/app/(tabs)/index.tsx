import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import LoginForm from '../../components/LoginForm';
import SignUpForm from '../../components/SignUpForm';

export default function AuthScreen() {
  // Use state to determine whether to show the Login or SignUp form.
  const [showLogin, setShowLogin] = useState(true);

  return (
    <View style={styles.container}>
      {showLogin ? (
        <>
          <Text style={styles.title}>Log In</Text>
          <LoginForm onLoginSuccess={() => setShowLogin(true)} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Sign Up</Text>
          <SignUpForm />
        </>
      )}
      <Button
        title={
          showLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Log In"
        }
        onPress={() => setShowLogin(!showLogin)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
