import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Profile = ({ user, onUpdate }) => {
  const [displayName, setDisplayName] = useState(user.displayName || '');

  const handleUpdate = () => {
    onUpdate({ displayName });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Display Name"
        value={displayName}
        onChangeText={setDisplayName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        editable={false}
      />
      <Button title="Update Profile" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#000',
  },
});

export default Profile;