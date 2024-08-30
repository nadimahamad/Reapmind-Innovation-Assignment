import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const UserSignupList = ({ users }) => {
  // Function to render each user item
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>
        {item.isFirebase ? `${item.name} (Signup)` : item.name}
      </Text>
      <Text style={styles.userEmail}>{item.email}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
});

export default UserSignupList;
