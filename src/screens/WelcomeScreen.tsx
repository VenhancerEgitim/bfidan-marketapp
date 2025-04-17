import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export const WelcomeScreen = () => {
  const nav = useNavigation<any>();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/images/guy.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <View style={styles.box}>
          <Image
            source={require('../assets/images/iconwelcome.png')}
            style={styles.icon}
          />

          <Text style={styles.title}>Welcome{'\n'}to our store</Text>
          <Text style={styles.sub}>
            Get your groceries in as fast as one hour
          </Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => nav.replace('Login')}
          >
            <Text style={styles.btnTxt}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end' },
  box: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 36,
  },
  sub: {
    fontSize: 14,
    color: '#E0E0E0',
    marginTop: 10,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#53B175',
    borderRadius: 12,
    paddingVertical: 16,
    width: width * 0.8,
    alignItems: 'center',
    marginTop: 28,
  },
  btnTxt: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default WelcomeScreen;
