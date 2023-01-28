import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function RegisterScreen ({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  
  const handleSubmit = () => {
    if (email.length === 0 || password.length === 0) {
      setErrorMessage('Please fill out all fields.');
    } 
  else {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  }

  return (
    <View>
      <Text>Email</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={email}
        onChangeText={setEmail}
      />
      <Text>Password</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
}
