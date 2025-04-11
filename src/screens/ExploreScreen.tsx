import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../app/slices/categorySlice';
import type { AppDispatch, RootState } from '../app/store';

export const ExploreScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list: categories, loading, error } = useSelector((state: any) => state.categories);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch]);

  const renderCategoryItem = ({ item }: any) => {
    return (
      <TouchableOpacity 
        style={styles.categoryCard}
        onPress={() => navigation.navigate('CategoryProducts', { category: item })}
      >
        <Image source={{ uri: item.image }} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

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
      <Text style={styles.headerText}>Find Products</Text>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fef7e7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  categoryImage: {
    width: 64,
    height: 64,
    marginBottom: 8,
    resizeMode: 'cover',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
