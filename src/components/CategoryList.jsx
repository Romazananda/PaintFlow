import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, fontType } from '../src/theme';

const categories = ['All', 'Renaissance', 'Baroque', 'Impressionism', 'Modern Art', 'Abstract', 'Contemporary'];

export default function CategoryList({ selected, onSelect }) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} onPress={() => onSelect(cat)}>
            <View style={{ ...styles.item, marginLeft: index === 0 ? 24 : 5, marginRight: index === categories.length - 1 ? 24 : 5 }}>
              <Text style={{ ...styles.title, color: selected === cat ? colors.gold() : colors.black() }}>
                {cat}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: colors.white(),
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
  },
});
