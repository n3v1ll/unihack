// LoginForm.js
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // For secure token storage
import { useRouter } from 'expo-router';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', values);
      const { token } = response.data;
      // Save the token securely for persistent login
      await SecureStore.setItemAsync('userToken', token);

      Alert.alert('Success', 'Logged in successfully');
      resetForm();
      // Navigate to the "explore" tab (make sure you have app/(tabs)/explore.tsx)
      router.push('/(tabs)/explore');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#666"
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#666"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && touched.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <Button title="Log In" onPress={handleSubmit} disabled={isSubmitting} color="#007AFF" />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F9F9', // light background
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    margin: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 4,
    fontSize: 16,
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});