import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Navigation } from './Navigation'; 
import {SplashScreen} from '../screens/SplashScreen';
import {WelcomeScreen} from '../screens/WelcomeScreen';
import {LoginScreen} from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import MainNavigator from './MainNavigator';
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Navigation>
      <Stack.Navigator >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Main" component={MainNavigator} options={{headerShown:false}}/>
      </Stack.Navigator>
    </Navigation>
  );
};

export default AppNavigator;
