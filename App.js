import React, { Component, useEffect } from 'react'
import { Text, View } from 'react-native'


import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';


import UsersList from './src/components/UsersList';
import LoginForm from './src/components/LoginForm';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/components/HomeScreen';
import RegisterScreen from './src/components/RegisterScreen';
import AdminOnly from './src/components/AdminOnly';


const Stack = createStackNavigator();

function App () {

  
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginForm} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AdminOnly" component={AdminOnly} />

        </Stack.Navigator>
      </NavigationContainer>
    )
}

export default App
