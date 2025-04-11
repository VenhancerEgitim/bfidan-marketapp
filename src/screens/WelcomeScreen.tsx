import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const WelcomeScreen = () => {
  const navigation = useNavigation() as any;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Button title="Get Started" onPress={() => navigation.replace('Login')} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    marginBottom: 20
  }
});
