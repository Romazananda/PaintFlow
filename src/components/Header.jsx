import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Element3 } from 'iconsax-react-native';
import { colors, fontType } from './theme';


export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>PaintFlow</Text>
      <View style={styles.iconContainer}>
        <Element3 color={colors.white()} variant="Linear" size={24} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    backgroundColor: colors.maroon(),
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 10,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontFamily: fontType['Pjs-ExtraBold'],
    color: colors.gold(),
  },
  iconContainer: {
    position: 'absolute',
    right: 24,
  },
});
