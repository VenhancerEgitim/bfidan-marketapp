import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Geçerli bir email girin').required('Email gerekli'),
  password: Yup.string().min(4, 'Şifre en az 4 karakter olmalı').required('Şifre gerekli'),
});

export const RegisterScreen = () => {
  const navigation = useNavigation<any>();

  const handleRegister = async (values: { email: string; password: string }) => {
    try {
      const response = await axios.post('https://reqres.in/api/register', values);
      console.log('Kayıt başarılı:', response.data);
      navigation.replace('Login');
    } catch (error) {
      console.error('Register hatası:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          handleRegister(values);
          actions.setSubmitting(false);
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
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

            <Button onPress={handleSubmit as any} title="Kayıt Ol" disabled={isSubmitting} />
            {isSubmitting && <ActivityIndicator style={styles.loader} />}
          </View>
        )}
      </Formik>
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
});
