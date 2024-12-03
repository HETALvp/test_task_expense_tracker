import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {AppIconType} from '../types/component.type';
import {iconProvider} from '../util/enums';
import {colors} from '../constants/colors';
const AppIcon = ({
  size = 20,
  color = colors.black,
  providerName,
  name,
}: AppIconType) => {
  return (
    <>
      {providerName === iconProvider.Entypo_IP ? (
        <Entypo size={size} color={color} name={name} />
      ) : providerName === iconProvider.Feather_IP ? (
        <Feather size={size} color={color} name={name} />
      ) : providerName === iconProvider.Ionicons_IP ? (
        <Ionicons size={size} color={color} name={name} />
      ) : providerName === iconProvider.FontAwesome6_IP ? (
        <FontAwesome6 size={size} color={color} name={name} />
      ) : providerName === iconProvider.FontAwesome_IP ? (
        <FontAwesome size={size} color={color} name={name} />
      ) : providerName === iconProvider.MaterialCommunityIcons_IP ? (
        <MaterialCommunityIcons size={size} color={color} name={name} />
      ) : providerName === iconProvider.MaterialIcons_IP ? (
        <MaterialIcons size={size} color={color} name={name} />
      ) : providerName === iconProvider.FontAwesome5_IP ? (
        <FontAwesome5 size={size} color={color} name={name} />
      ) : (
        <Octicons size={size} color={color} name={name} />
      )}
    </>
  );
};

export default AppIcon;
