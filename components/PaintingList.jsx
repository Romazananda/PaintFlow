import React, { useState, useEffect } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import PaintingCard from './PaintingCard';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'; // Tidak dihapus

export default function PaintingList({ filterCategory }) {
  const [paintings, setPaintings] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const API_URL = 'https://6829d51aab2b5004cb34e747.mockapi.io/api/lukisan';

  useEffect(() => {
    fetchPaintings();
  }, []);

  const fetchPaintings = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setPaintings(data);
    } catch (err) {
      setError('Gagal memuat data lukisan');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (id, isFav) => {
    setFavorites(prev => ({ ...prev, [id]: isFav }));
  };

  const handleDelete = async (id) => {
    Alert.alert('Konfirmasi', 'Apakah Anda yakin ingin menghapus lukisan ini?', [
      { text: 'Batal', style: 'cancel' },
      {
        text: 'Hapus',
        style: 'destructive',
        onPress: async () => {
          try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setPaintings(prev => prev.filter(item => item.id !== id));
          } catch (error) {
            Alert.alert('Gagal', 'Tidak dapat menghapus data.');
            console.error(error);
          }
        },
      },
    ]);
  };

  const handleEdit = (painting) => {
    navigation.navigate('EditPainting', { painting });
  };

  const filteredPaintings = filterCategory
    ? paintings.filter(p => p.kategori === filterCategory)
    : paintings;

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#800000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {filteredPaintings.map(painting => (
          <PaintingCard
            key={painting.id}
            painting={painting}
            isFavorite={favorites[painting.id] || false}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
});
