import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginSuccess } from '../store/slices/authSlice';
import { StackNavigationProp } from '@react-navigation/stack';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Geçerli bir email girin').required('Email gerekli'),
  password: Yup.string().min(4, 'Şifre en az 4 karakter olmalı').required('Şifre gerekli'),
});

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<any>>();
  
  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post('https://reqres.in/api/login', values);
      dispatch(loginSuccess(response.data.token));
      navigation.reset({
        index: 0,
        routes: [{ name: 'Homepage' }],
      });
    } catch (error) {
      console.error('Login hatası:', error);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          handleLogin(values);
          actions.setSubmitting(false);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onChangeText={handleChange('email')}
              value={values.email}
            />
            {errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
            
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={handleChange('password')}
              value={values.password}
            />
            {errors.password && touched.password && <Text style={styles.error}>{errors.password}</Text>}

            <Button onPress={handleSubmit as any} title="Login" disabled={isSubmitting} />
            {isSubmitting && <ActivityIndicator style={styles.loader} />}
          </View>
        )}
      </Formik>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>Don't have an account? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 30, textAlign: 'center', marginBottom: 24 },
  label: { fontSize: 16, marginBottom: 4 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginBottom: 12, borderRadius: 4 },
  error: { color: 'red', marginBottom: 8 },
  loader: { marginTop: 16 },
  registerText: { marginTop: 16, textAlign: 'center', color: 'blue',  },
});
