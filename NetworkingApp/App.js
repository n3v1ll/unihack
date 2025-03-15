// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import SignUpForm from './SignUpForm';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <SignUpForm />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
