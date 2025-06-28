import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Intro from '../screens/Intro';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import ProductDetails from '../screens/ProductDetails';
import Addresses from '../screens/Addresses';
import Contact from '../screens/Contact';
import Checkout from '../screens/Checkout';


const RootStack = createNativeStackNavigator();


const StackNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName="Intro">
      <RootStack.Screen
        name="Intro"
        component={Intro}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="Cart"
        component={Cart}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="Addresses"
        component={Addresses}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="Contact"
        component={Contact}
        options={{headerShown: false}}
      />

      <RootStack.Screen
        name="Checkout"
        component={Checkout}
        options={{headerShown: false}}
      />

    
    </RootStack.Navigator>
  );
}

export default StackNavigation