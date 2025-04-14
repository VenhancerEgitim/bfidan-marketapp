import React, { useEffect, useState, useCallback } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, StyleSheet, Modal, Pressable, 
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { fetchProductsByCategory } from '../app/slices/productSlice';
import type { AppDispatch, RootState } from '../app/store';
import Icon from 'react-native-vector-icons/Ionicons';
import filtersConfig from '../app/filtersConfig';

export const CategoryProductsScreen = ({ route }: any) => {
  const { category } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const [filterCategory, setFilterCategory] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const { list: products, loading, error } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (category) {
      setFilterCategory((category.slug || category.name).toLowerCase());
    }
  }, [category]);

  const debouncedSearch = useCallback(
    _.debounce((query: string, filter: string) => {
      dispatch(fetchProductsByCategory({ categoryId: category.id, filter: query + (filter ? ' ' + filter : '') }));
    }, 500),
    [dispatch, category]
  );

  useEffect(() => {
    debouncedSearch(searchText, selectedFilter);
  }, [searchText, selectedFilter, debouncedSearch]);

  const currentFilterOptions = filtersConfig[filterCategory] || [];

  const renderProductItem = ({ item }: any) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Filter for {filterCategory}</Text>
          {currentFilterOptions.map((option) => (
            <Pressable
              key={option}
              style={styles.filterOption}
              onPress={() => {
                setSelectedFilter(option);
                setFilterModalVisible(false);
              }}
            >
              <Text style={styles.filterOptionText}>{option}</Text>
            </Pressable>
          ))}
          <Pressable
            style={[styles.filterOption, { backgroundColor: '#ddd' }]}
            onPress={() => {
              setSelectedFilter('');
              setFilterModalVisible(false);
            }}
          >
            <Text style={styles.filterOptionText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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
      <View style={styles.searchHeader}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Products..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity onPress={() => setFilterModalVisible(true)}>
          <Icon name="filter" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      {renderFilterModal()}
      <FlatList
        data={products}
        renderItem={renderProductItem}
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
    padding: 16 
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  loaderContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  filterOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 8,
  },
  filterOptionText: {
    fontSize: 16,
  },
});

export default CategoryProductsScreen;
