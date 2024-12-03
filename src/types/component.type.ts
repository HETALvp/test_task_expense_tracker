import {ReactNode} from 'react';
import {DimensionValue, StyleProp, ViewStyle} from 'react-native';
import {Edges} from 'react-native-safe-area-context';
import {iconProvider} from '../util/enums';
import {CategoryType} from './types';

export type FullScreenContainerType = {
  children: ReactNode;
  edges?: Edges;
  style?: StyleProp<ViewStyle>;
};

export type AppIconType = {
  size?: number;
  color?: string;
  providerName: iconProvider;
  name: string;
};

export type RenderTabIcon = {
  focused: boolean;
};

export type AppButtonType = {
  title: string;
  onPress?: () => void;
  backgroundColor?: string;
  textColor?: string;
};

export type SpacerType = {
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  flex?: number | undefined;
  backgroundColor?: string;
};

export type ChipType = {
  label: string;
  backgroundColor: string;
  textColor?: string;
};

export type CategoryTileType = {
  category: CategoryType;
  onPress: () => void;
};
