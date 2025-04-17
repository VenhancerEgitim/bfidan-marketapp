import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const SplashScreen = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')} 
        style={styles.logo}
      />
      <Text style={styles.subText}>online groceriet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,     
    height: 60,    
    resizeMode: 'contain', 
    marginBottom: 16,
  },
  subText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SplashScreen;
