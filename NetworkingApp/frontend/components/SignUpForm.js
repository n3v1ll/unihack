// SignUpForm.js
import React from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'expo-router';

// Define the validation schema using Yup
const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  // You can add additional fields and validations here
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function SignUpForm() {
  const router = useRouter();
  // Function to handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Replace with your backend URL (make sure it's accessible)
      const response = await axios.post('http://127.0.0.1:5000/api/signup', values);
      console.log('Signup response:', response.data);
      Alert.alert('Success', 'Profile created successfully');
      router.push('../app/(tabs)/index.tsx');
    } catch (error) {
      console.error('Signup error:', error.response || error.message || error);
      Alert.alert('Error', 'Failed to create profile');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={SignUpSchema}
      onSubmit={handleSubmit}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={styles.container}>
          {/* Name Field */}
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#666"
            onChangeText={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
          />
          {errors.name && touched.name && (
            <Text style={styles.errorText}>{errors.name}</Text>
          )}

          {/* Email Field */}
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

          {/* Password Field */}
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

          <Button
            onPress={handleSubmit}
            title="Sign Up"
            disabled={isSubmitting}
            color="#007AFF"
          />
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