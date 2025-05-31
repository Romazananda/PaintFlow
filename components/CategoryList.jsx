import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Tidak dihapus

const CategoryList = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ganti dengan endpoint GET lukisan kamu
  const API_URL = 'https://6829d51aab2b5004cb34e747.mockapi.io/api/lukisan';

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Ambil array string kategori unik saja
        const uniqueCategories = data.reduce((acc, current) => {
          if (!acc.includes(current.kategori)) {
            acc.push(current.kategori);
          }
          return acc;
        }, []);

        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
        setError('Gagal memuat kategori dari lukisan');
      } finally {
        setLoading(false);
      }
    };

    fetchPaintings();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate('Category', { selectedCategory: category });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
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
  container: { paddingVertical: 10 },
  scrollContainer: {
    paddingHorizontal: 16,
    alignItems: 'center',
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
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default CategoryList;
