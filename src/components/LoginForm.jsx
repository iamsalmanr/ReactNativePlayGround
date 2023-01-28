import React, { useState, useEffect } from 'react';

import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LoginForm = ({ navigation }) => {

    // useEffect(() => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //       if (user) {
    //         navigation.navigate('Home');
    //       }
    //     });
    //   }, []);
    
      useEffect(() => {
        navigation.setOptions({
            headerRight: () => null
        });
      }, [navigation]);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = () => {
    if (email.length === 0 || password.length === 0) {
        setErrorMessage('Please fill out all fields.');
      } 
    else {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User logged in successfully');
        setErrorMessage(null);
        navigation.navigate('Home');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
    }
  };

  return (
    <View>
      <Text>Email:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => setEmail(text)}
        value={email} 
      />

      <Text>Password:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />

      {errorMessage && <Text>{errorMessage}</Text>}


      <Button 
        title="Login"
        onPress={handleLogin}
      />
     
      <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />

    </View>
  );
};

export default LoginForm;
