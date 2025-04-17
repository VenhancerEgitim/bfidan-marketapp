import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { clearCart } from '../app/slices/cartSlice';
import { CommonActions } from '@react-navigation/native';

export const OrderConfirmationScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();

  const handleBackToHome = () => {
    dispatch(clearCart());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Main', params: { screen: 'Explore' } }],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your order has been accepted</Text>
      <Text style={styles.subtitle}>
        Your items have been placed and are on their way.
      </Text>
      <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 22, fontWeight: 'bold', marginBottom: 12, textAlign: 'center' 
  },
  subtitle: { 
    fontSize: 16, color: '#555', marginBottom: 24, textAlign: 'center' 
  },
  backButton: { 
    backgroundColor: '#4CAF50', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8 
  },
  backButtonText: { 
    color: '#fff', fontSize: 16 
  },
});

export default OrderConfirmationScreen;
