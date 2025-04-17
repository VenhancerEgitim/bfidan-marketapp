// src/navigation/MainNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ExploreStack from './ExploreStack';
import CartStack from './CartStack';
import { FavouriteScreen } from '../screens/FavouriteScreen';
import { AccountScreen } from '../screens/AccountScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: '#32CD32',
        tabBarInactiveTintColor: '#999',
        headerTitleAlign: 'center', 
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          headerShown: true,
          title: 'My Cart',
          tabBarIcon: ({ color, size }) => (
            <Icon name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          headerShown: true,
          title: 'Favourites',
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart" size={size} color={color} solid />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerShown: true,
          title: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" size={size} color={color} solid />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
