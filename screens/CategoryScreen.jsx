import React, { useState, useMemo, useCallback, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import firestore from '@react-native-firebase/firestore'; // Tidak dihapus

const colors = {
  white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  maroon: (opacity = 1) => `rgba(128, 0, 0, ${opacity})`,
  gold: (opacity = 1) => `rgba(255, 215, 0, ${opacity})`,
};

const fontType = {
  'Pjs-Regular': 'System',
  'Pjs-ExtraBold': 'System',
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CategoryList = ({ categories, selectedCategory, onSelectCategory }) => {
  const animations = useMemo(() => {
    return categories.reduce((acc, cat) => {
      acc[cat] = new Animated.Value(cat === selectedCategory ? 1 : 0.5);
      return acc;
    }, {});
  }, [categories]);

  useEffect(() => {
    categories.forEach((cat) => {
      Animated.timing(animations[cat], {
        toValue: cat === selectedCategory ? 1 : 0.5,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [selectedCategory, categories]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoryListContainer}
      contentContainerStyle={{ paddingHorizontal: 16 }}
    >
      {categories.map((cat) => (
        <AnimatedTouchable
          key={cat}
          style={[
            styles.categoryItem,
            {
              backgroundColor: selectedCategory === cat ? colors.maroon() : colors.white(),
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
    <Image source={{ uri: painting.gambar }} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.titleItem}>{painting.nama_lukisan}</Text>
      <Text style={styles.artist}>{painting.nama_penulis}</Text>
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
  const [paintingData, setPaintingData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get('https://6829d51aab2b5004cb34e747.mockapi.io/api/lukisan');
        const data = response.data;

        setPaintingData(data);

        const uniqueCategories = [...new Set(data.map(item => item.kategori))];
        setCategories(uniqueCategories);

        setSelectedCategory(categoryName || uniqueCategories[0]);
      } catch (error) {
        console.error('Gagal mengambil data lukisan:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaintings();
  }, [categoryName]);

  const filteredPaintings = useMemo(() =>
    paintingData.filter(p =>
      p.kategori === selectedCategory &&
      p.nama_lukisan.toLowerCase().includes(searchText.toLowerCase())
    ), [selectedCategory, searchText, paintingData]);

  const handleSelectCategory = useCallback(cat => {
    setSelectedCategory(cat);
    setSearchText('');
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.maroon()} style={{ marginTop: 20 }} />
      ) : (
        <>
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
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
        </>
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
