import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { colors } from '../src/theme';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch && typeof onSearch === 'function') {
      onSearch(query.trim());
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
