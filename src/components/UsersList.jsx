import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .onSnapshot((querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push({ id: doc.id, ...doc.data() });
        });
        setUsers(users);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View>
            <Text>{item.username}</Text>
            <Text>{item.password}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UsersList;
