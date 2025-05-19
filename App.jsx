import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Element3 } from 'iconsax-react-native';
import { colors, fontType } from './src/theme';

import CategoryList from './components/CategoryList';
import SearchBar from './components/SearchBar';
import PaintingList from './components/PaintingList';

import SearchResultsScreen from './screens/SearchResultsScreen';
import CategoryScreen from './screens/CategoryScreen';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PaintFlow</Text>
        <View style={styles.iconContainer}>
          <Element3 color={colors.white()} variant="Linear" size={24} />
        </View>
      </View>

      {/* Kategori */}
      <CategoryList navigation={navigation} /> {/* ✅ Kirim navigation */}

      {/* Search Bar */}
      <SearchBar />

      {/* Daftar Lukisan */}
      <PaintingList />
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} options={{ title: 'Kategori Lukisan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  header: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.maroon(),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.gold(),
  },
  iconContainer: {
    position: 'absolute',
    right: 24,
  },
});
