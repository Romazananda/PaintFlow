import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import { Element3, Receipt21, Clock, Message, SearchNormal } from 'iconsax-react-native';
import { fontType, colors } from './src/theme';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Header dengan teks di tengah */}
      <View style={styles.header}>
        <Text style={styles.title}>PaintFlow</Text>
        <View style={styles.iconContainer}>
          <Element3 color={colors.white()} variant="Linear" size={24} />
        </View>
      </View>

      {/* Kategori */}
      <View style={styles.listCategory}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{ ...category.item, marginLeft: 24 }}>
            <Text style={{ ...category.title, color: colors.gold() }}>
              Renaissance
            </Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Baroque</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Impressionism</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Modern Art</Text>
          </View>
          <View style={category.item}>
            <Text style={category.title}>Abstract</Text>
          </View>
          <View style={{ ...category.item, marginRight: 24 }}>
            <Text style={category.title}>Contemporary</Text>
          </View>
        </ScrollView>
      </View>

      {/* Search Bar */}
      <View style={searchBar.container}>
        <TextInput
          style={searchBar.input}
          placeholder="Search for paintings..."
          placeholderTextColor={colors.grey()}
        />
        <Pressable style={searchBar.button}>
          <SearchNormal size={20} color={colors.white()} />
        </Pressable>
      </View>

      {/* List Blog */}
      <ListBlog />
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
    justifyContent: 'center', // Pusatkan teks
    alignItems: 'center', // Pusatkan secara vertikal
    height: 80,
    backgroundColor: colors.maroon(),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    position: 'relative', // Untuk posisi ikon
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.gold(),
  },
  iconContainer: {
    position: 'absolute', // Posisikan ikon di sebelah kanan
    right: 24, // Jarak dari kanan
  },
  listCategory: {
    paddingVertical: 10,
  },
  listBlog: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
});

const category = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: colors.white(),
    elevation: 3,
  },
  title: {
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
    color: colors.black(),
  },
});

const searchBar = StyleSheet.create({
  container: {
    marginHorizontal: 24,
    backgroundColor: colors.white(),
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: colors.black(),
  },
  button: {
    backgroundColor: colors.gold(),
    borderRadius: 20,
    padding: 10,
  },
});

const ListBlog = () => {
  // Data lukisan langsung di dalam komponen
  const paintings = [
    {
      id: 1,
      title: 'The Starry Night',
      artist: 'Vincent van Gogh',
      category: 'Impressionism',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    },
    {
      id: 2,
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
      category: 'Renaissance',
      image:  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
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
      category: 'Northern Renaissance',
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

  return (
    <ScrollView>
      <View style={styles.listBlog}>
        {paintings.map((painting) => (
          <View key={painting.id} style={itemVertical.cardItem}>
            <Image
              style={itemVertical.cardImage}
              source={{ uri: painting.image }}
            />
            <View style={itemVertical.cardContent}>
              <Text style={itemVertical.cardCategory}>{painting.category}</Text>
              <Text style={itemVertical.cardTitle}>{painting.title}</Text>
              <Text style={itemVertical.cardText}>{painting.artist}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const itemVertical = StyleSheet.create({
  cardItem: {
    width: '100%',
    backgroundColor: colors.white(),
    borderRadius: 15,
    elevation: 5,
    marginBottom: 15,
  },
  cardImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 15,
    alignItems: 'center', // Pusatkan konten secara horizontal
  },
  cardCategory: {
    color: colors.gold(),
    fontSize: 12,
    fontFamily: fontType['Pjs-SemiBold'],
    textAlign: 'center', // Pusatkan teks
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginTop: 10,
    textAlign: 'center', // Pusatkan teks
  },
  cardText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(),
    marginTop: 5,
    textAlign: 'center', // Pusatkan teks
  },
}); 