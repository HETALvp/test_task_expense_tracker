import React from 'react';
import {KeyboardAvoidingView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FullScreenContainerType} from '../types/component.type';
import {isIos} from '../helpers/utilHelper';
import {colors} from '../constants/colors';

const FullScreenContainer = ({
  children,
  edges = ['top'],
  style,
}: FullScreenContainerType) => {
  return (
    <SafeAreaView style={styles.safeView} edges={edges}>
      <KeyboardAvoidingView
        behavior={isIos ? 'padding' : undefined}
        style={[styles.flex, style]}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FullScreenContainer;

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
});
