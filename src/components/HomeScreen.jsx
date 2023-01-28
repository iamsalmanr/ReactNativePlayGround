import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import firebase from '@react-native-firebase/app';

export default function HomeScreen ({navigation}) {

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => null
        });
      }, [navigation]);
    
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            // Check if user's email is an admin email
            if (user.email === 'admin@admin.com') {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
              // Navigate non-admin users back to the home screen
            }
          } else {
            // Navigate non-authenticated users back to the login screen
            navigation.navigate('Login');
          }
        });
        return () => unsubscribe();
      }, []);

      const handleLogout = () => {
        firebase.auth().signOut()
          .then(() => {
            navigation.navigate('Login');
          })
          .catch((error) => {
            console.log(error);
          });
      }


    return (
      <View>
        <Text>Welcome to the home screen</Text>

          { isAdmin ? (
            <Button title="Admin Protected" onPress={() => navigation.navigate('AdminOnly')} />
          ) : (
            <Button title="User Protected" onPress={() => navigation.navigate('AdminOnly')} />
          ) }
          
        
        

        <Button title="Logout" onPress={handleLogout} />

        
      </View>
    );
  };