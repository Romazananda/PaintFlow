import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const categories = ['Impressionism', 'Renaissance', 'Surrealism', 'Baroque'];

const CategoryList = ({ navigation }) => {
  const handleCategoryPress = (category) => {
    navigation.navigate('Category', { selectedCategory: category });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={styles.categoryItem}
            onPress={() => handleCategoryPress(category)}
          >
            <Text style={styles.text}>{category}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 }, // beri ruang vertikal jika perlu
  scrollContainer: {
    paddingHorizontal: 16, // padding kiri kanan di dalam scroll
    alignItems: 'center',  // agar item center secara vertikal
  },
  categoryItem: {
    padding: 10,
    backgroundColor: '#eee',
    marginRight: 8,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
  },
});

export default CategoryList;
