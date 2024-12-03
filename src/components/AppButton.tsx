import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {HP, WP} from '../helpers/utilHelper';
import {colors} from '../constants/colors';
import {AppButtonType} from '../types/component.type';

const AppButton = ({
  title,
  onPress,
  backgroundColor = colors.black,
  textColor = colors.white,
}: AppButtonType) => {
  return (
    <TouchableOpacity
      style={[styles.container, {backgroundColor}]}
      onPress={onPress}>
      <Text style={[styles.textstyle, {color: textColor}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: HP(8),
    paddingVertical: HP(2),
    paddingHorizontal: WP(10),
    backgroundColor: colors.black,
  },
  textstyle: {
    color: colors.white,
    fontSize: 16,
    alignSelf: 'center',
    fontWeight: '800',
  },
});

export default AppButton;
