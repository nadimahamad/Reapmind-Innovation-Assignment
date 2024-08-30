import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import ContactFormScreen from '../screens/ContactFormScreen';
import ProfileScreen from '../screens/ProfileScreen';
import UserSignupListScreen from '../screens/UserSignupListScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = focused ? '🏠' : '🏡'; // Home icon
            break;
          case 'Dashboard':
            iconName = focused ? '📊' : '📈'; // Dashboard icon
            break;
          case 'Contact':
            iconName = focused ? '✉️' : '📬'; // Contact icon
            break;
          case 'Profile':
            iconName = focused ? '👤' : '👥'; // Profile icon
            break;
          case 'Users':
            iconName = focused ? '🧑‍🤝‍🧑' : '👥'; // Users icon
            break;
          default:
            iconName = '❓'; // Default icon
            break;
        }

        return <Text style={{ fontSize: 20 }}>{iconName}</Text>;
      },
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Contact" component={ContactFormScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Users" component={UserSignupListScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
