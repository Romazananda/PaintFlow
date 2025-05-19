import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fontType } from '../src/theme';

export default function CategoryList({ selectedCategory: selectedProp, onSelectCategory }) {
  const categories = ['Renaissance', 'Baroque', 'Impressionism', 'Modern Art', 'Abstract', 'Contemporary'];

  // Jika tidak ada selectedCategory dari props, gunakan state lokal
  const [selectedCategory, setSelectedCategory] = useState(selectedProp || 'Renaissance');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category); // update state lokal
    if (onSelectCategory) {
      onSelectCategory(category); // panggil callback jika ada
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCategoryPress(category)}
            style={[
              styles.item,
              index === 0 ? { marginLeft: 24 } : index === categories.length - 1 ? { marginRight: 24 } : {},
              selectedCategory === category && { backgroundColor: colors.gold(0.1) }
            ]}
          >
            <Text
              style={[
                styles.title,
                selectedCategory === category ? { color: colors.gold() } : {}
              ]}
            >
              {category}
            </Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: colors.white(),
    elevation: 3,
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    color: colors.black(),
  },
});
