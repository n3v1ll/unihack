// LoginForm.js
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store'; // For secure token storage

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginForm({ onLoginSuccess }) {
  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/login', values);
      const { token } = response.data;
      // Save the token securely for persistent login
      await SecureStore.setItemAsync('userToken', token);
      Alert.alert('Success', 'Logged in successfully');
      onLoginSuccess && onLoginSuccess();
      resetForm();
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
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}
          <Button title="Log In" onPress={handleSubmit} disabled={isSubmitting} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  errorText: { color: 'red', marginBottom: 10 },
});
