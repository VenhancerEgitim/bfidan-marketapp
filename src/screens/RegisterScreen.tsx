import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import IonIcon from 'react-native-vector-icons/Ionicons';

const validation = Yup.object().shape({
  email: Yup.string().email('Geçerli e‑mail girin').required('E‑mail gerekli'),
  password: Yup.string().min(4, 'En az 4 karakter').required('Şifre gerekli'),
});

export const RegisterScreen = () => {
  const nav = useNavigation<any>();
  const [showPwd, setShowPwd] = useState(false);

  const submit = async (vals: { email: string; password: string }) => {
    try {
      await axios.post('https://reqres.in/api/register', vals);
      nav.replace('Login');
    } catch (e) {
      console.log('Register error', e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.wrap}
      >
        <Image
          source={require('../assets/images/Group.png')}
          style={styles.logo}
        />

        <Text style={styles.h1}>Sign Up</Text>
        <Text style={styles.h2}>Enter your credentials to continue</Text>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validation}
          onSubmit={(v, a) => {
            submit(v);
            a.setSubmitting(false);
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
              <View style={styles.inputRow}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={values.email}
                  onChangeText={handleChange('email')}
                />
                {touched.email && !errors.email && values.email !== '' && (
                  <IonIcon
                    name="checkmark-circle"
                    size={20}
                    color="#53B175"
                    style={{ marginLeft: 8 }}
                  />
                )}
              </View>
              {touched.email && errors.email && (
                <Text style={styles.err}>{errors.email}</Text>
              )}

              <View style={[styles.inputRow, { marginTop: 30 }]}>
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="Password"
                  secureTextEntry={!showPwd}
                  autoCapitalize="none"
                  value={values.password}
                  onChangeText={handleChange('password')}
                />
                <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
                  <IonIcon
                    name={showPwd ? 'eye' : 'eye-off'}
                    size={20}
                    color="#666"
                  />
                </TouchableOpacity>

              </View>
              {touched.password && errors.password && (
                <Text style={styles.err}>{errors.password}</Text>
              )}
              <Text style={styles.terms}>
                By continuing you agree to our{' '}
                <Text style={styles.link}>Terms of Service</Text> and{' '}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
              
              <TouchableOpacity
                style={styles.btn}
                onPress={handleSubmit as any}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.btnTxt}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </>
          )}
        </Formik>
        <TouchableOpacity
          onPress={() => nav.replace('Login')}
          style={{ marginTop: 24 }}
        >
          <Text style={styles.bottomTxt}>
            Already have an account? <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: { width: 40, height: 40, alignSelf: 'center', marginBottom: 32 },
  h1: { fontSize: 28, fontWeight: '700', color: '#1D1D1D' },
  h2: { fontSize: 14, color: '#7C7C7C', marginTop: 4, marginBottom: 32 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingVertical: 10,
    fontSize: 15,
    color: '#1D1D1D',
  },
  err: { color: 'red', fontSize: 12, marginTop: 4 },
  terms: { fontSize: 12, color: '#7C7C7C', marginTop: 24, lineHeight: 18 },
  link: { color: '#53B175', fontWeight: '600' },
  btn: {
    backgroundColor: '#53B175',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  btnTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  bottomTxt: { fontSize: 13, color: '#7C7C7C', textAlign: 'center' },
});

export default RegisterScreen;
