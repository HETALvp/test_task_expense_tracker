import moment from 'moment';
import {Dimensions, Platform} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import {categoryType} from '../util/enums';
import {images} from '../assets';

const WP = (widthPercent: string | number) => widthPercentageToDP(widthPercent);
const HP = (heightPercent: string | number) =>
  heightPercentageToDP(heightPercent);

const {width: mobileWidth, height: mobileHeight} = Dimensions.get('window');
const {width: mobileScreenWidth, height: mobileScreenHeight} =
  Dimensions.get('screen');

const isIos = Platform.OS === 'ios';

const formatDate = (dateString: string) => {
  const givenDate = moment(dateString);
  const today = moment();

  if (today.isSame(givenDate, 'day')) {
    return 'Today';
  } else if (today.diff(givenDate, 'days') === 1) {
    return 'Yesterday';
  } else if (today.diff(givenDate, 'days') === 2) {
    return '2 days ago';
  } else {
    return givenDate.format('ddd, DD MMM YYYY');
  }
};

const formatAmount = (amount: number) => {
  if (amount == null) {
    return '';
  }
  const [integer, decimal] = amount.toString().split('.');
  const formattedInteger = integer.replace(
    /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
    ',',
  );

  return decimal ? `${formattedInteger}.${decimal}` : formattedInteger;
};

const getCategoryDetails = (category: number) => {
  switch (category) {
    case categoryType.Shopping:
      return {icon: images.shopping, label: 'Shopping'}; // Example color
    case categoryType.Food:
      return {icon: images.restaurant, label: 'Food'}; // Example color
    case categoryType.Transportation:
      return {icon: images.plane, label: 'Transportation'}; // Example color
    case categoryType.Entertainment:
      return {
        icon: images.subscription,
        label: 'Entertainment',
      };
    case categoryType.Health:
      return {icon: images.health, label: 'Health'}; // Example color
    case categoryType.Utility:
      return {icon: images.utilities, label: 'Utility'}; // Example color
    case categoryType.Grocery:
      return {icon: images.grocery, label: 'Grocery'}; // Example color
  }
};

export {
  WP,
  HP,
  mobileHeight,
  mobileWidth,
  mobileScreenWidth,
  mobileScreenHeight,
  isIos,
  formatDate,
  formatAmount,
  getCategoryDetails,
};
