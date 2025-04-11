import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ExploreScreen} from '../screens/ExploreScreen';
import {CartScreen} from '../screens/CartScreen';
import {FavouriteScreen} from '../screens/FavouriteScreen';
import {AccountScreen} from '../screens/AccountScreen';
import ExploreStack from './ExploreStack';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
    >
      <Tab.Screen 
      name="Explore" 
      component={ExploreStack}
      options={{
        headerTitle: 'Find Products',
        headerTitleAlign: 'center', 
      }}
      />
      <Tab.Screen name="Cart" 
      component={CartScreen}
      options={{
        headerTitle: 'My Cart', 
        headerTitleAlign: 'center', 
      }} 
      />
      <Tab.Screen 
      name="Favourite" 
      component={FavouriteScreen} 
      options={{
        headerTitleAlign: 'center', 
      }}
      />
      <Tab.Screen 
      name="Account" 
      component={AccountScreen}
      options={{
        headerTitleAlign: 'center', 
      }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
