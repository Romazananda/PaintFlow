import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore'; // Tidak dihapus

export default function PaintingCard({
  painting,
  isFavorite,
  onToggleFavorite,
  onDelete,
  onEdit,
}) {
  // DEBUG: Lihat isi objek painting
  console.log('Painting:', painting);

  // Ambil nilai string dengan fallback
  const namaLukisan =
    typeof painting.nama_lukisan === 'string'
      ? painting.nama_lukisan
      : JSON.stringify(painting.nama_lukisan);

  const namaPenulis =
    typeof painting.nama_penulis === 'string'
      ? painting.nama_penulis
      : JSON.stringify(painting.nama_penulis);

  // Ambil nama kategori jika objek, atau langsung string
  const kategori =
    typeof painting.kategori === 'object' && painting.kategori !== null
      ? painting.kategori.nama || 'Tidak diketahui'
      : typeof painting.kategori === 'string'
      ? painting.kategori
      : 'Tidak diketahui';

  return (
    <View style={styles.card}>
      <Image source={{ uri: painting.gambar }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{namaLukisan}</Text>
        <Text style={styles.author}>oleh {namaPenulis}</Text>
        <Text style={styles.category}>Kategori: {kategori}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            onPress={() => onEdit(painting)}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDelete(painting.id)}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#800000',
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#ffd700',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#c0392b',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
