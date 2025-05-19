import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const colors = {
  white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  maroon: (opacity = 1) => `rgba(128, 0, 0, ${opacity})`,
  gold: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
};

const fontType = {
  'Pjs-Regular': 'System',
  'Pjs-ExtraBold': 'System',
};

// Dummy data
const categories = ['Impressionism', 'Renaissance', 'Surrealism', 'Baroque'];

const paintingData = [
  {
    id: 1,
    title: 'The Starry Night',
    artist: 'Vincent van Gogh',
    category: 'Impressionism',
    image:
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80',
  },
  {
    id: 2,
    title: 'Mona Lisa',
    artist: 'Leonardo da Vinci',
    category: 'Renaissance',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
  },
  {
    id: 3,
    title: 'The Persistence of Memory',
    artist: 'Salvador Dalí',
    category: 'Surrealism',
    image:
      'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg',
  },
  {
    id: 4,
    title: 'Girl with a Pearl Earring',
    artist: 'Johannes Vermeer',
    category: 'Baroque',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d7/Meisje_met_de_parel.jpg',
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
    image:
      'https://images.unsplash.com/photo-1555685812-4b943f1cb0eb?auto=format&fit=crop&w=800&q=60',
  },
];

// Komponen daftar kategori horizontal
const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryListContainer}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      decelerationRate="fast"
      snapToInterval={100} // sesuai minWidth + marginRight
      snapToAlignment="start"
      pagingEnabled={false}
    >
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat}
          style={[
            styles.categoryItem,
            selectedCategory === cat && styles.categoryItemSelected,
          ]}
          onPress={() => onSelectCategory(cat)}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === cat && styles.categoryTextSelected,
            ]}
          >
            {cat}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Komponen card lukisan
const PaintingCard = ({ painting }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: painting.image }} style={styles.image} resizeMode="cover" />
    <View style={styles.textContainer}>
      <Text style={styles.titleItem}>{painting.title}</Text>
      <Text style={styles.artist}>{painting.artist}</Text>
    </View>
  </View>
);

// Komponen SearchBar sederhana
const SearchBar = ({ searchText, onChangeText }) => (
  <View style={styles.searchBarContainer}>
    <TextInput
      placeholder="Cari judul lukisan..."
      value={searchText}
      onChangeText={onChangeText}
      style={styles.searchInput}
      clearButtonMode="while-editing"
    />
  </View>
);

const CategoryScreen = () => {
  const route = useRoute();
  const initialCategory = route.params?.selectedCategory || categories[0];

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchText, setSearchText] = useState('');

  // Filter data berdasarkan kategori dan pencarian judul
  const filteredPaintings = paintingData.filter(
    (p) =>
      p.category === selectedCategory &&
      p.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <CategoryList
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <SearchBar searchText={searchText} onChangeText={setSearchText} />
      <Text style={styles.title}>Kategori: {selectedCategory}</Text>
      <FlatList
        data={filteredPaintings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PaintingCard painting={item} />}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white(),
  },
  categoryListContainer: {
    backgroundColor: colors.maroon(0.1),
    paddingVertical: 6,
  },
  categoryItem: {
    paddingVertical: 4,       // sebelumnya 6, dikurangi jadi 4
  paddingHorizontal: 8,     // sebelumnya 12, dikurangi jadi 8
  marginRight: 8,           // dikurangi sedikit supaya rapih
  borderRadius: 12,         // bisa diperkecil agar lebih kecil kotaknya
    backgroundColor: colors.white(),
    borderWidth: 1,
    borderColor: colors.maroon(),
    minWidth: 80,
    alignItems: 'center',
  },
  categoryItemSelected: {
    backgroundColor: colors.maroon(),
  },
  categoryText: {
     fontSize: 10, 
    color: colors.maroon(),
    fontFamily: fontType['Pjs-Regular'],
  },
  categoryTextSelected: {
    color: colors.gold(),
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  searchBarContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white(),
    elevation: 3,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.maroon(),
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.gold(),
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    backgroundColor: colors.white(),
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 80,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  titleItem: {
    fontSize: 16,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.maroon(),
  },
  artist: {
    fontSize: 14,
    color: colors.maroon(0.7),
    marginTop: 4,
  },
});

export default CategoryScreen;
