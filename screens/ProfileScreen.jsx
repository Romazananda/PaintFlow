import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { colors, fontType } from '../src/theme';
import { More } from 'iconsax-react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const posts = [
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

export default function ProfileScreen({ navigation }) {
  const [profileImage, setProfileImage] = useState(null);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.postCard}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postContent}>
        <TouchableOpacity onPress={() => navigation.navigate('Category', { categoryName: item.category })}>
          <Text style={styles.category}>{item.category}</Text>
        </TouchableOpacity>
        <Text style={styles.postTitle}>{item.title}</Text>
      </View>
      <More size={18} color="gray" style={styles.moreIcon} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : { uri: 'https://randomuser.me/api/portraits/men/32.jpg' }
          }
          style={styles.avatar}
        />
        <TouchableOpacity onPress={selectImage} style={styles.editPhotoButton}>
          <Text style={styles.editText}>Change Photo</Text>
        </TouchableOpacity>
        <Text style={styles.name}>Arthur Conan Doyle</Text>
        <Text style={styles.memberSince}>Member since 18 Mar, 2020</Text>
        <View style={styles.statsContainer}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>29</Text>
            <Text style={styles.statLabel}>Posted</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3K</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3K</Text>
            <Text style={styles.statLabel}>Follower</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        scrollEnabled={false}
        contentContainerStyle={styles.postsList}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileHeader: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 20,
    fontFamily: fontType.bold,
    marginTop: 8,
  },
  memberSince: {
    fontSize: 14,
    color: 'gray',
    fontFamily: fontType.regular,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  stat: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  statNumber: {
    fontSize: 16,
    fontFamily: fontType.bold,
  },
  statLabel: {
    fontSize: 13,
    color: 'gray',
    fontFamily: fontType.regular,
  },
  editPhotoButton: {
    marginTop: 8,
    backgroundColor: '#E6E6E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  editText: {
    fontFamily: fontType.medium,
    fontSize: 14,
  },
  postsList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  postCard: {
    flexDirection: 'row',
    backgroundColor: '#FAFAFA',
    padding: 10,
    marginBottom: 12,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
  },
  postImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  postContent: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    color: colors.blue(),
    fontFamily: fontType.medium,
  },
  postTitle: {
    fontSize: 14,
    fontFamily: fontType.bold,
    marginVertical: 2,
  },
  moreIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
});
