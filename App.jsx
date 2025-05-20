import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home2,
  Category,
  AddSquare,
  ProfileCircle,
} from 'iconsax-react-native';

import { colors, fontType } from './src/theme';
import HomeScreen from './screens/HomeScreen';
import CategoryScreen from './screens/CategoryScreen';
import AddPaintingScreen from './screens/AddPaintingScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import ProfileScreen from './screens/ProfileScreen';

// Stack Navigator untuk halaman lain
const Stack = createNativeStackNavigator();

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

// Tab Navigasi Utama
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.maroon(),
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          height: 60,
          paddingBottom: 5,
        },
        tabBarIcon: ({ color }) => {
          if (route.name === 'Home') return <Home2 color={color} size={24} />;
          if (route.name === 'Category') return <Category color={color} size={24} />;
          if (route.name === 'Add') return <AddSquare color={color} size={24} />;
          if (route.name === 'Profile') return <ProfileCircle color={color} size={24} />;
        },
        tabBarLabelStyle: {
          fontFamily: fontType.regular,
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen name="Add" component={AddPaintingScreen} />
     <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Root Stack Navigasi
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Tab utama */}
        <Stack.Screen name="MainTabs" component={MainTabs} />

        {/* Halaman stack di luar tab */}
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        {/* Tambah stack lain di sini jika perlu */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styling
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 18,
    color: 'gray',
    fontFamily: fontType.medium,
  },
});
