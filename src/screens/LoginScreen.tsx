import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loginSuccess } from '../app/slices/authSlice';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Geçerli bir email girin').required('Email gerekli'),
  password: Yup.string()
    .min(4, 'Şifre en az 4 karakter olmalı')
    .required('Şifre gerekli'),
});

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();
  const [showPwd, setShowPwd] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    try {
      const res = await axios.post('https://reqres.in/api/login', values);
      dispatch(loginSuccess(res.data.token));
      navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
    } catch (err) {
      console.log('Login error:', err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require('../assets/images/Group.png')}
          style={styles.icon}
        />

        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>
          Enter your email and password
        </Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={(values, actions) => {
            handleLogin(values);
            actions.setSubmitting(false);
          }}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#999"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                value={values.email}
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.error}>{errors.email}</Text>
              )}

              <Text style={[styles.label, { marginTop: 20 }]}>Password</Text>
              <View style={styles.pwdRow}>
                <TextInput
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                  placeholder="Password"
                  placeholderTextColor="#999"
                  secureTextEntry={!showPwd}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  onPress={() => setShowPwd(!showPwd)}
                  style={styles.eyeBtn}
                >
                  <Icon
                    name={showPwd ? 'eye' : 'eye-off'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                <Text style={styles.forgot}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.loginBtn}
                disabled={isSubmitting}
                onPress={handleSubmit as any}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.loginText}>Log In</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <TouchableOpacity
          onPress={() => navigation.replace('Register')}
          style={{ marginTop: 24 }}
        >
          <Text style={styles.signup}>
            Don’t have an account? <Text style={styles.signupLink}>Signup</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    flexGrow: 1,
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    marginBottom: 32,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1D',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#7C7C7C',
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    fontSize: 15,
    color: '#1D1D1D',
    marginBottom: 4,
  },
  pwdRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeBtn: {
    padding: 6,
  },
  forgot: {
    fontSize: 13,
    color: '#7C7C7C',
    marginTop: 8,
  },
  loginBtn: {
    backgroundColor: '#53B175',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 2,
  },
  signup: {
    fontSize: 13,
    color: '#7C7C7C',
    textAlign: 'center',
  },
  signupLink: {
    color: '#53B175',
    fontWeight: '600',
  },
});

export default LoginScreen;
