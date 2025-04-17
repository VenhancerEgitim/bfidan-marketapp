import React, { useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Modal, Pressable
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { removeItem, addItem, decreaseQuantity, clearCart } from '../app/slices/cartSlice';

export const CartScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  const renderCartItem = ({ item }: any) => {
    const handleIncrease = () => {
      dispatch(addItem({ id: item.id, title: item.title, price: item.price, image: item.image, quantity: 1 }));
    };
    const handleDecrease = () => {
      if (item.quantity > 1) {
        dispatch(decreaseQuantity(item.id));
      } else {
        dispatch(removeItem(item.id));
      }
    };

    return (
      <View style={styles.cartItem}>
        <Image source={{ uri: item.image }} style={styles.cartItemImage} />
        <View style={styles.cartItemDetails}>
          <Text style={styles.itemName}>{item.title}</Text>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={() => dispatch(removeItem(item.id))}
        >
          <Text style={styles.removeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const totalPrice = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const handlePlaceOrder = () => {
    setCheckoutVisible(false);
    navigation.navigate('OrderConfirmation'); 
  };

  return (
    <View style={styles.container}>
      {cart.items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart.items}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
            style={{ marginBottom: 80 }}
          />
          <View style={styles.checkoutBar}>
            <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.checkoutButton} 
              onPress={() => setCheckoutVisible(true)}
            >
              <Text style={styles.checkoutButtonText}>Go to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      <Modal
        visible={checkoutVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCheckoutVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setCheckoutVisible(false)}>
          <View style={styles.bottomModalContainer}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Checkout</Text>
            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Delivery</Text>
              <Text style={styles.rowValue}>Select Method</Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Payment</Text>
              <Text style={styles.rowValue}>Pick Method</Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Promo Code</Text>
              <Text style={styles.rowValue}>Pick discount</Text>
            </View>
            <View style={styles.rowItem}>
              <Text style={styles.rowLabel}>Total Cost</Text>
              <Text style={styles.rowValue}>${totalPrice.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#999' },
  cartItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fefefe', 
    marginBottom: 8, 
    padding: 12, 
    borderRadius: 8, 
    elevation: 1 
  },
  cartItemImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  cartItemDetails: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  itemPrice: { fontSize: 14, color: '#555', marginBottom: 4 },
  quantityRow: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: {
    width: 28, height: 28, borderRadius: 14, backgroundColor: '#ddd',
    alignItems: 'center', justifyContent: 'center', marginHorizontal: 4
  },
  quantityButtonText: { fontSize: 16, fontWeight: 'bold' },
  quantityText: { fontSize: 16, marginHorizontal: 4 },
  removeButton: { marginLeft: 8, backgroundColor: '#eee', borderRadius: 4, padding: 8 },
  removeButtonText: { fontSize: 14, fontWeight: 'bold', color: '#d00' },
  checkoutBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  checkoutButtonText: { color: '#fff', fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomModalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
  modalHandle: {
    alignSelf: 'center',
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    marginBottom: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  rowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabel: { fontSize: 16, color: '#555' },
  rowValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  placeOrderButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    marginTop: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderButtonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});

export default CartScreen;
