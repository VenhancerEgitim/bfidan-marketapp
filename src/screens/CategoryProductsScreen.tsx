import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByCategory } from '../app/slices/productSlice';
import type { AppDispatch } from '../app/store'; 

export const CategoryProductsScreen = ({ route }: any) => {
  const { category } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const { list: products, loading, error } = useSelector((state: any) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(category.id));
  }, [dispatch, category]);

  const renderProductItem = ({ item }: any) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loaderContainer}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{category.name} Products</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerText: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  productCard: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productName: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  productPrice: { fontSize: 14, color: '#555', marginTop: 4 },
});
