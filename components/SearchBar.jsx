import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { colors } from '../src/theme';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Tidak dihapus

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigation = useNavigation();

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (trimmedQuery.length > 0) {
      navigation.navigate('SearchResults', { query: trimmedQuery });
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search for paintings..."
        placeholderTextColor={colors.grey()}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <Pressable style={styles.button} onPress={handleSearch}>
        <SearchNormal size={20} color={colors.white()} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    backgroundColor: colors.white(),
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5,
    marginBottom: 10,
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.black(),
  },
  button: {
    backgroundColor: colors.gold(),
    borderRadius: 20,
    padding: 10,
  },
});
