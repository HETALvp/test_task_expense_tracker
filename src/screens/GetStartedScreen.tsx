import React from 'react';
import {View, StyleSheet, Image, Text, SafeAreaView} from 'react-native';
import {images} from '../assets';
import {HP, WP} from '../helpers/utilHelper';
import {colors} from '../constants/colors';
import AppButton from '../components/AppButton';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../types/navigation.types';
import {setItem, storageKeys} from '../helpers/StorageHelper';

const GetStartedScreen = () => {
  const navigation = useNavigation<AppNavigationProps>();
  const handlePress = async () => {
    await setItem(storageKeys.getStarted, 'true');
    navigation.navigate('Bottom');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Image
          source={images.getStarted}
          resizeMode="cover"
          style={styles.imageStyle}
        />
        <Text style={styles.mainTextStyle}>
          TAKE
          <Text style={styles.orangeText}> CONTROL </Text>
          OF YOUR
          <Text style={styles.blueText}> FINANCES</Text>
        </Text>
      </View>
      <AppButton title="Get Started" onPress={handlePress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainTextStyle: {
    fontSize: 34,
    fontWeight: '600',
    textAlign: 'center',
    marginHorizontal: WP(3),
  },
  orangeText: {color: colors.orange},
  blueText: {color: colors.blue},
  imageStyle: {height: HP('50%'), width: HP('50%')},
  subContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default GetStartedScreen;
