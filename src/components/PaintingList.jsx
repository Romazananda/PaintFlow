import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PaintingCard from './PaintingCard';
import { colors } from '../src/theme';

const paintings = [
  // ... your painting data here
];

export default function PaintingList({ category, keyword }) {
  const filtered = paintings.filter(p => {
    const matchCategory = category === 'All' || p.category === category;
    const matchKeyword = p.title.toLowerCase().includes(keyword.toLowerCase());
    return matchCategory && matchKeyword;
  });

  return (
    <ScrollView>
      <View style={styles.listBlog}>
        {filtered.map(p => (
          <PaintingCard key={p.id} data={p} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  listBlog: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 15,
  },
});
