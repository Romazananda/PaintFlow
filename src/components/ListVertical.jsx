import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { PaintingList } from '../data';
import { colors, fontType } from '../theme'; // sesuaikan dengan path kamu

export const ListVertical = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {PaintingList.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.content}>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.artist}>{item.artist}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: colors.white(),
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  category: {
    color: colors.gold(),
    fontFamily: fontType['Pjs-SemiBold'],
    fontSize: 14,
  },
  title: {
    color: colors.black(),
    fontFamily: fontType['Pjs-Bold'],
    fontSize: 16,
    marginTop: 4,
  },
  artist: {
    color: colors.grey(),
    fontFamily: fontType['Pjs-Regular'],
    fontSize: 14,
    marginTop: 2,
  },
});
