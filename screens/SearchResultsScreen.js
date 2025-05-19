import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { colors, fontType } from '../src/theme'; // Make sure fontType is imported

// Dummy painting data
const paintingsData = [
  { id: '1', title: 'Mona Lisa', artist: 'Leonardo da Vinci', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg' },
  { id: '2', title: 'Starry Night', artist: 'Vincent van Gogh', image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80' },
  { id: '3', title: 'The Persistence of Memory', artist: 'Salvador Dalí', image: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg' },
  { id: '4', title: 'The Birth of Venus', artist: 'Sandro Botticelli', image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=800&q=60' },
  { id: '5', title: 'Portrait of a Man', artist: 'Jan van Eyck', image: 'https://tse4.mm.bing.net/th?id=OIP.Rehs00iutKiUIidagsKg9wHaKW&pid=Api' },
];


export default function SearchResultsScreen({ route }) {
  const { query } = route.params || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filtered = paintingsData.filter(painting =>
      painting.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
    setLoading(false);
  }, [query]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.gold()} />
      </View>
    );
  }

  if (!query) {
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
             <Image source={{ uri: item.image }} style={styles.paintingImage} />
            <Text style={styles.paintingTitle}>{item.title}</Text>
            <Text style={styles.artist}>by {item.artist}</Text>
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
    position: 'relative',
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
