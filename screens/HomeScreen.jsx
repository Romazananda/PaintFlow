import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Element3 } from 'iconsax-react-native';
import { colors, fontType } from '../src/theme';

import CategoryList from '../components/CategoryList';
import SearchBar from '../components/SearchBar';
import PaintingList from '../components/PaintingList';
import firestore from '@react-native-firebase/firestore'; // Tidak dihapus

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>PaintFlow</Text>
        <View style={styles.iconContainer}>
          <Element3 color={colors.white()} variant="Linear" size={24} />
        </View>
      </View>

      {/* Search Bar */}
      <SearchBar />

      {/* Kategori */}
      <CategoryList navigation={navigation} />

      {/* Daftar Lukisan */}
      <PaintingList />
    </View>
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
