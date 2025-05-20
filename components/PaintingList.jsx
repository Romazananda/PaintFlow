import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import PaintingCard from './PaintingCard';

export default function PaintingList({ filterCategory }) {
  const initialPaintings = [
    {
      id: 1,
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
      category: 'Impressionism',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      category: 'Renaissance',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    },
    {
      id: 3,
      title: 'The Persistence of Memory',
      artist: 'Salvador Dalí',
      category: 'Surrealism',
      image: 'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
    },
    {
      id: 4,
      title: 'Girl with a Pearl Earring',
      artist: 'Johannes Vermeer',
      category: 'Baroque',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg',
    },
    {
      id: 5,
      title: 'Portrait of a Man',
      artist: 'Jan van Eyck',
      category: 'Renaissance',
      image: 'https://tse4.mm.bing.net/th?id=OIP.Rehs00iutKiUIidagsKg9wHaKW&pid=Api',
    },
    {
      id: 6,
      title: 'The Birth of Venus',
      artist: 'Sandro Botticelli',
      category: 'Renaissance',
      image: 'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=800&q=60',
    },
  ];

  // STATE: daftar lukisan dan status favorit
  const [paintings, setPaintings] = useState(initialPaintings);
  const [favorites, setFavorites] = useState({}); // { 1: true, 3: false, ... }

  // Handler toggle favorite
  const handleToggleFavorite = (id, isFav) => {
    setFavorites(prev => ({ ...prev, [id]: isFav }));
  };

  // FILTER berdasarkan kategori jika ada props filterCategory
  const filteredPaintings = filterCategory
    ? paintings.filter(p => p.category === filterCategory)
    : paintings;

  return (
    <ScrollView>
      <View style={styles.container}>
        {filteredPaintings.map(painting => (
          <PaintingCard
            key={painting.id}
            painting={painting}
            isFavorite={favorites[painting.id] || false}
            onToggleFavorite={handleToggleFavorite}
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
});
