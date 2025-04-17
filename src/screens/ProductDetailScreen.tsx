import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { addItem } from '../app/slices/cartSlice';
import { StackScreenProps } from '@react-navigation/stack';
import { ExploreStackParamList } from '../navigation/ExploreStack';
import { useSelector } from 'react-redux';
import { toggleFavorite } from '../app/slices/favoriteSlice';
import type { RootState } from '../app/store';

type ProductDetailScreenProps = StackScreenProps<ExploreStackParamList, 'ProductDetail'>;

const ProductDetailScreen = ({ route }: ProductDetailScreenProps) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || '',
      quantity: quantity,
    }));
  };
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const isFavorited = favorites.some(item => item.id === product.id);
  const productImage = product.images?.[0] || product.image;

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: productImage }}
        style={styles.productImage}
      />
      <View style={styles.headerRow}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <TouchableOpacity onPress={() => dispatch(toggleFavorite({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.images?.[0],
          quantity: 1, 
        }))}>
          <Icon name={isFavorited ? "heart" : "heart-outline"} size={24} color={isFavorited ? "red" : "#000"} />
        </TouchableOpacity>
      </View>

      <View style={styles.quantityPriceRow}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={handleDecrease} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={handleIncrease} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.priceText}>${(product.price * quantity).toFixed(2)}</Text>
      </View>

      <Text style={styles.sectionTitle}>Product Detail</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  productImage: { width: '100%', height: 300, resizeMode: 'cover', borderRadius: 8, marginBottom: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  productTitle: { fontSize: 20, fontWeight: 'bold', flex: 1, marginRight: 8 },
  quantityPriceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityButton: { width: 28, height: 28, backgroundColor: '#ccc', borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginHorizontal: 4 },
  quantityButtonText: { fontSize: 16, fontWeight: 'bold' },
  quantityText: { fontSize: 16, marginHorizontal: 4 },
  priceText: { fontSize: 18, fontWeight: 'bold' },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8 },
  productDescription: { fontSize: 14, marginBottom: 24, lineHeight: 20 },
  addButton: { backgroundColor: '#4CAF50', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
