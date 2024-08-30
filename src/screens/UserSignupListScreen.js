import React, { useState, useCallback } from 'react';
import { View, Text, SectionList, ActivityIndicator, StyleSheet, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getUsers } from '../services/localDatabase';

const UserSignupListScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Fetch users and handle errors
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const fetchedUsers = await getUsers();
      // Ensure fetchedUsers is an array
      if (Array.isArray(fetchedUsers)) {
        const groupedUsers = groupUsersBySignupStatus(fetchedUsers);
        setUsers(groupedUsers);
      } else {
        setError('Fetched data is not in expected format');
      }
    } catch (error) {
      setError('Failed to fetch users');
      Alert.alert('Error', 'Failed to fetch users');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Group users by signup status
  const groupUsersBySignupStatus = (users) => {
    return [
      {
        title: 'Registred Users',
        data: users.filter(user => user.isSignup === 1),
      },
      {
        title: 'Contacted Users',
        data: users.filter(user => user.isSignup !== 1),
      }
    ];
  };

  // Fetch users when the screen gains focus
  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [])
  );

  // Handle pull-to-refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchUsers();
  };

  // Render Section Header
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  // Render Section Item
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={item.isSignup? styles.singupEmail : styles.email}>{item.email}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <SectionList
          sections={users}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal:5
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 20,
  },
  sectionHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  singupEmail: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    //marginTop:'-3%',
    //alignSelf:'center',
    //verticalAlign:'center'
  },
  email: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  errorText: {
    color: '#ff0000',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default UserSignupListScreen;
