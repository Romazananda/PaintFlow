import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { fontType, colors } from '../src/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
 // Pastikan Anda sudah install `@expo/vector-icons` atau `react-native-vector-icons`

export default function PaintingCard({ painting, isFavorite: isFavoriteProp, onToggleFavorite }) {
  const [favorite, setFavorite] = useState(isFavoriteProp || false);

  const handleFavoritePress = () => {
    const newFavorite = !favorite;
    setFavorite(newFavorite);
    if (onToggleFavorite) {
      onToggleFavorite(painting.id, newFavorite);
    }
  };

  return (
    <View style={styles.cardItem}>
      <Image style={styles.cardImage} source={{ uri: painting.image }} />
      
      <TouchableOpacity style={styles.favoriteIcon} onPress={handleFavoritePress}>
        <Ionicons
          name={favorite ? 'heart' : 'heart-outline'}
          size={24}
         color={favorite ? colors.red() : colors.grey()}
        />
      </TouchableOpacity>

      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{painting.category}</Text>
        <Text style={styles.cardTitle}>{painting.title}</Text>
        <Text style={styles.cardText}>{painting.artist}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardItem: {
    width: '100%',
    backgroundColor: colors.white(),
    borderRadius: 15,
    elevation: 5,
    marginBottom: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: colors.white(0.7),
    borderRadius: 20,
    padding: 5,
  },
  cardContent: {
    padding: 15,
    alignItems: 'center',
  },
  cardCategory: {
    color: colors.gold(),
    fontSize: 12,
    fontFamily: fontType['Pjs-SemiBold'],
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginTop: 10,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(),
    marginTop: 5,
    textAlign: 'center',
  },
});
