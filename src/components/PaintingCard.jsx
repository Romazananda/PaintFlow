import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, fontType } from '../src/theme';

export default function PaintingCard({ data }) {
  return (
    <View style={styles.cardItem}>
      <Image style={styles.cardImage} source={{ uri: data.image }} />
      <View style={styles.cardContent}>
        <Text style={styles.cardCategory}>{data.category}</Text>
        <Text style={styles.cardTitle}>{data.title}</Text>
        <Text style={styles.cardText}>{data.artist}</Text>
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
    alignItems: 'center',
  },
  cardCategory: {
    color: colors.gold(),
    fontSize: 12,
    fontFamily: fontType['Pjs-SemiBold'],
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: fontType['Pjs-Bold'],
    color: colors.black(),
    marginTop: 10,
  },
  cardText: {
    fontSize: 14,
    fontFamily: fontType['Pjs-Medium'],
    color: colors.grey(),
    marginTop: 5,
  },
});
