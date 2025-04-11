import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export const CartScreen = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CartScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff'
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginBottom: 16 
  },
  subtitle: { 
    fontSize: 18, 
    marginBottom: 32 
  },
  button: { 
    backgroundColor: '#2196F3', 
    paddingVertical: 12, 
    paddingHorizontal: 20, 
    marginVertical: 8, 
    borderRadius: 4 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16 
  },
});
