import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';

const colors = {
  white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  maroon: (opacity = 1) => `rgba(128, 0, 0, ${opacity})`,
  gold: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
};

const fontType = {
  'Pjs-Regular': 'System',
  'Pjs-ExtraBold': 'System',
};

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
    image:
      'https://tse4.mm.bing.net/th?id=OIP.Rehs00iutKiUIidagsKg9wHaKW&pid=Api',
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

// Animated TouchableOpacity for category item with fade
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CategoryList = ({ selectedCategory, onSelectCategory }) => {
  // Animations for categories fade
  const animations = useMemo(
    () =>
      categories.reduce((acc, cat) => {
        acc[cat] = new Animated.Value(cat === selectedCategory ? 1 : 0.5);
        return acc;
      }, {}),
    []
  );

  React.useEffect(() => {
    categories.forEach((cat) => {
      Animated.timing(animations[cat], {
        toValue: cat === selectedCategory ? 1 : 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [selectedCategory]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryListContainer}
      contentContainerStyle={{ paddingHorizontal: 16 }}
      decelerationRate="fast"
      snapToInterval={100}
      snapToAlignment="start"
      pagingEnabled={false}
    >
      {categories.map((cat) => (
        <AnimatedTouchable
          key={cat}
          style={[
            styles.categoryItem,
            {
              backgroundColor:
                selectedCategory === cat ? colors.maroon() : colors.white(),
              borderColor: colors.maroon(),
              opacity: animations[cat],
            },
          ]}
          onPress={() => onSelectCategory(cat)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategory === cat && styles.categoryTextSelected,
            ]}
          >
            {cat}
          </Text>
        </AnimatedTouchable>
      ))}
    </ScrollView>
  );
};

const PaintingCard = React.memo(({ painting }) => (
  <View style={styles.itemContainer}>
    <Image source={{ uri: painting.image }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.titleItem}>{painting.title}</Text>
      <Text style={styles.artist}>{painting.artist}</Text>
    </View>
  </View>
));

const SearchBar = ({ searchText, onChangeText }) => (
  <View style={styles.searchBarContainer}>
    <TextInput
      placeholder="Cari judul lukisan..."
      value={searchText}
      onChangeText={onChangeText}
      style={styles.searchInput}
      clearButtonMode="while-editing"
      placeholderTextColor={colors.maroon(0.5)}
    />
  </View>
);

export default function CategoryScreen({ route }) {
  const { categoryName } = route?.params || {};
  const [selectedCategory, setSelectedCategory] = useState(categoryName || categories[0]);
  const [searchText, setSearchText] = useState('');

  // Filter lukisan sesuai kategori dan pencarian
  const filteredPaintings = useMemo(
    () =>
      paintingData.filter(
        (p) =>
          p.category === selectedCategory &&
          p.title.toLowerCase().includes(searchText.toLowerCase())
      ),
    [selectedCategory, searchText]
  );

  const handleSelectCategory = useCallback(
    (cat) => {
      setSelectedCategory(cat);
      setSearchText(''); // reset search on category change (optional)
    },
    []
  );

  return (
    <View style={styles.container}>
      <CategoryList selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />
      <SearchBar searchText={searchText} onChangeText={setSearchText} />
      <Text style={styles.title}>Kategori: {selectedCategory}</Text>
      {filteredPaintings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Lukisan tidak ditemukan.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPaintings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PaintingCard painting={item} />}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

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
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: colors.maroon(),
    fontFamily: fontType['Pjs-Regular'],
  },
  categoryTextSelected: {
    color: colors.gold(),
    fontFamily: fontType['Pjs-ExtraBold'],
  },
  searchBarContainer: {
    marginHorizontal: 16,
    marginVertical: 12,
    borderRadius: 20,
    backgroundColor: colors.white(),
    elevation: 3,
    shadowColor: colors.maroon(),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: fontType['Pjs-Regular'],
    color: colors.maroon(),
  },
  title: {
    fontSize: 22,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.gold(),
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 14,
    backgroundColor: colors.white(),
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: colors.maroon(),
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 110,
    height: 90,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 14,
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
    marginTop: 6,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
    color: colors.maroon(0.6),
    fontFamily: fontType['Pjs-Regular'],
  },
});
