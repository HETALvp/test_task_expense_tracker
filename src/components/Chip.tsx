import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ChipType} from '../types/component.type';
import {WP} from '../helpers/utilHelper';
import {colors} from '../constants/colors';

const Chip = ({label, backgroundColor, textColor = colors.white}: ChipType) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
        },
      ]}>
      <Text style={[styles.textStyle, {color: textColor}]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: WP(1),
    paddingHorizontal: WP(2.5),
    borderRadius: WP(5),
    marginRight: WP(2),
  },
  textStyle: {
    fontSize: 14,
  },
});

export default Chip;
