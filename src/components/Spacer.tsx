import {View} from 'react-native';
import React from 'react';
import {FC, memo} from 'react';
import {SpacerType} from '../types/component.type';

const Spacer: FC<SpacerType> = ({height, width, flex, backgroundColor}) => {
  return <View style={{width, height, flex, backgroundColor}} />;
};

export default memo(Spacer);
