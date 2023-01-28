import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/native';
import UsersList from './UsersList';

export default function AdminOnly ()  {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // Check if user's email is an admin email
        if (user.email === 'admin@admin.com') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          // Navigate non-admin users back to the home screen
          navigation.navigate('Home');
        }
      } else {
        // Navigate non-authenticated users back to the login screen
        navigation.navigate('Login');
      }
    });
    return () => unsubscribe();
  }, []);

  if (!isAdmin) {
    return null;
  }

  return (
    <View>
      <Text>Welcome Admin</Text>
      <Text>Users List Below</Text>
      <UsersList/>

    </View>
  );
};
