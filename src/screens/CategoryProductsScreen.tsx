import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import _ from 'lodash';
import { fetchProductsByCategory } from '../app/slices/productSlice';
import type { AppDispatch, RootState } from '../app/store';
import { addItem } from '../app/slices/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import filtersConfig from '../app/filtersConfig';
import { ExploreStackParamList } from '../navigation/ExploreStack';

type CategoryProductsScreenNavigationProp = StackNavigationProp<
  ExploreStackParamList,
  'CategoryProducts'
>;

export const CategoryProductsScreen = ({ route }: any) => {
  const { category } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<CategoryProductsScreenNavigationProp>();

  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const { list: products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const filterCategory = (category.slug || category.name).toLowerCase();
  const currentFilterOptions = filtersConfig[filterCategory] || [];

  useEffect(() => {
    dispatch(
      fetchProductsByCategory({
        categoryId: category.id,
        filter:
          searchText.trim() + (selectedFilter ? ' ' + selectedFilter.trim() : ''),
      })
    );
  }, [dispatch, category, searchText, selectedFilter]);

  const debouncedFetch = useCallback(
    _.debounce((text: string, filter: string) => {
      dispatch(
        fetchProductsByCategory({
          categoryId: category.id,
          filter: text.trim() + (filter ? ' ' + filter.trim() : ''),
        })
      );
    }, ),
    [dispatch, category]
  );

  useEffect(() => {
    debouncedFetch(searchText, selectedFilter);
  }, [searchText, selectedFilter, debouncedFetch]);

  const renderProductItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.plusButton}
        onPress={(event) => {
          event.stopPropagation();
          dispatch(
            addItem({
              id: item.id,
              title: item.title,
              price: item.price,
              image: item.images[0],
              quantity: 1,
            })
          );
        }}
      >
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderFilterModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isFilterModalVisible}
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Filter for {filterCategory}</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterList}>
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
              style={[styles.filterOptionx, { backgroundColor: '#ddd' }]}
              onPress={() => {
                setSelectedFilter('');
                setFilterModalVisible(false);
              }}
            >
              <Text style={styles.filterOptionText}>Clear Filter</Text>
            </Pressable>
          </ScrollView>
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
      <View style={styles.headerRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
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

export default CategoryProductsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
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
    alignItems: 'center',
  },

  productCard: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
    margin: 8,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productName: { fontSize: 16, fontWeight: 'bold', marginTop: 8 },
  productPrice: { fontSize: 14, color: '#555', marginTop: 4 },
  plusButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusButtonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  modalBox: {
    width: '85%',
    maxHeight: '80%', 
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold' },
  filterList: { marginTop: 12 }, 
  filterOption: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
  },
  filterOptionx:{
    justifyContent: 'center', 
    alignItems: 'center',
  },
  filterOptionText: { fontSize: 16},
});
