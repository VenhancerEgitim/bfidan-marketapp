import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExploreScreen } from '../screens/ExploreScreen';
import { CategoryProductsScreen } from '../screens/CategoryProductsScreen';

const Stack = createStackNavigator();

const ExploreStack = () => {
  return (
    <Stack.Navigator 
      initialRouteName="ExploreMain" 
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="ExploreMain" component={ExploreScreen} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
