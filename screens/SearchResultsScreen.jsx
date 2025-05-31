import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { colors, fontType } from '../src/theme';

export default function SearchResultsScreen({ route }) {
  const { query } = route.params || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterPaintings = async () => {
      try {
        const response = await axios.get('https://6829d51aab2b5004cb34e747.mockapi.io/api/lukisan');
        // Filter berdasarkan nama_lukisan dan cek kategori sebagai objek
        const filtered = response.data.filter(painting =>
          painting.nama_lukisan.toLowerCase().includes(query.toLowerCase())
          // Kalau mau filter juga kategori bisa ditambah di sini
          // && painting.kategori?.nama?.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } catch (error) {
        console.error('Gagal mengambil data lukisan:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query && query.trim() !== '') {
      fetchAndFilterPaintings();
    } else {
      setResults([]);
      setLoading(false);
    }
  }, [query]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.gold()} />
      </View>
    );
  }

  if (!query || query.trim() === '') {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.infoText}>Masukkan kata pencarian.</Text>
      </View>
    );
  }

  if (results.length === 0) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.infoText}>Tidak ada lukisan yang cocok dengan "{query}".</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hasil pencarian untuk: "{query}"</Text>
      </View>
      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.gambar }} style={styles.paintingImage} />
            <View style={styles.textContainer}>
              <Text style={styles.paintingTitle}>{item.nama_lukisan}</Text>
              <Text style={styles.artist}>by {item.nama_penulis}</Text>
              {/* Tampilkan kategori sebagai objek */}
              {item.kategori && (
                <Text style={styles.category}>Kategori: {item.kategori.nama || item.kategori}</Text>
              )}
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 24, paddingTop: 10 }}
      />
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
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.gold(),
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey(0.3),
  },
  paintingImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  paintingTitle: {
    fontSize: 16,
    color: colors.black(),
    fontWeight: '600',
  },
  artist: {
    fontSize: 14,
    color: colors.grey(),
  },
  category: {
    fontSize: 13,
    color: colors.grey(),
    fontStyle: 'italic',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    color: colors.grey(),
  },
});
