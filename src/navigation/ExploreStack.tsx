import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreScreen } from '../screens/ExploreScreen';
import { CategoryProductsScreen } from '../screens/CategoryProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';

export type ExploreStackParamList = {
  ExploreMain: undefined;
  CategoryProducts: { category: any };
  ProductDetail: { product: any };
};

const Stack = createStackNavigator<ExploreStackParamList>();

const ExploreStack = () => {
  return (
    <Stack.Navigator initialRouteName="ExploreMain">
      <Stack.Screen 
        name="ExploreMain" 
        component={ExploreScreen}
        options={{
          title: 'Find Products', 
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen 
        name="CategoryProducts" 
        component={CategoryProductsScreen}
        options={({ route }) => ({
          title: route.params.category.name + ' Products', 
          headerTitleAlign: 'center',
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          title: 'Product Details', 
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export default ExploreStack;
