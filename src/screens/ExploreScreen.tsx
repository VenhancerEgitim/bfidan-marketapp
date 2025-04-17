import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'; 
import { fetchCategories } from '../app/slices/categorySlice';
import { fetchProductsBySearch } from '../app/slices/productSlice';
import type { AppDispatch, RootState } from '../app/store';
import SearchBar from '../components/SearchBar';

export const ExploreScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchText, setSearchText] = useState('');
  const { list: categories, loading: catLoading, error: catError } = useSelector(
    (state: RootState) => state.categories
  );
  const { list: products, loading: prodLoading, error: prodError } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (searchText.trim() === '' && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, searchText, categories.length]);

  const debouncedSearch = useCallback(
    _.debounce((text: string) => {
      dispatch(fetchProductsBySearch(text));
    }, 500),
    [dispatch]
  );

  useEffect(() => {
    if (searchText.trim() !== '') {
      debouncedSearch(searchText);
    }
  }, [searchText, debouncedSearch]);

  const isSearching = searchText.trim() !== '';
  const loading = isSearching ? prodLoading : catLoading;
  const error = isSearching ? prodError : catError;

  const renderCategoryItem = ({ item }: any) => (
    <TouchableOpacity 
      style={styles.categoryCard}
      onPress={() => navigation.navigate('CategoryProducts', { category: item })}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

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
      <SearchBar searchText={searchText} onChangeText={setSearchText} />
      {isSearching ? (
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      ) : (
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingHorizontal: 16, 
    paddingTop: 16 
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  categoryCard: { 
    flex: 1, 
    margin: 8, 
    backgroundColor: '#fef7e7', 
    borderRadius: 8, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 16 
  },
  categoryImage: { 
    width: 64, 
    height: 64, 
    marginBottom: 8, 
    resizeMode: 'cover' 
  },
  categoryText: { 
    fontSize: 16, 
    fontWeight: '500' 
  },
  productCard: { 
    flex: 1,
    margin: 8,
    backgroundColor: '#f2f2f2', 
    borderRadius: 8, 
    padding: 12 
  },
  productImage: { 
    width: '100%', 
    height: 200, 
    borderRadius: 8, 
    resizeMode: 'cover' 
  },
  productName: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginTop: 8 
  },
  productPrice: { 
    fontSize: 14, 
    color: '#555', 
    marginTop: 4 
  },
});

export default ExploreScreen;
