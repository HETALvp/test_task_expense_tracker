import React from 'react';
import {Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {colors} from '../constants/colors';
import {WP, HP} from '../helpers/utilHelper';
import Spacer from './Spacer';
import {CategoryTileType} from '../types/component.type';

const CategoryTile = ({category, onPress}: CategoryTileType) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={category.icon}
        resizeMode="cover"
        style={{
          height: HP(2.5),
          width: HP(2.5),
          tintColor: colors.white,
        }}
      />
      <Spacer width={WP(4)} />
      <Text style={styles.textStyle}>{category.label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginVertical: WP(1),
    paddingHorizontal: WP(3),
    paddingVertical: HP(2),
    alignItems: 'center',
    backgroundColor: colors.mutedOrange,
    borderRadius: WP(2),
  },
  textStyle: {fontSize: 16, color: colors.white},
});

export default CategoryTile;
