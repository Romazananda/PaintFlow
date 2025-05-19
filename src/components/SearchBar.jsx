import React from 'react';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import { SearchNormal } from 'iconsax-react-native';
import { colors } from '../src/theme';

export default function SearchBar({ keyword, onChange }) {
  return (
    <View style={styles.container}>
      <TextInput
        value={keyword}
        onChangeText={onChange}
        placeholder="Search for paintings..."
        placeholderTextColor={colors.grey()}
        style={styles.input}
      />
      <Pressable style={styles.button}>
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
