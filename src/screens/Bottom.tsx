import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {HP, WP} from '../helpers/utilHelper';
import {RenderTabIcon} from '../types/component.type';
import {size, activeColor, inactiveColor} from '../constants/Constants';
import HomeScreen from './HomeScreen';
import ExpenseScreen from './ExpenseScreen';
import {iconProvider} from '../util/enums';
import AppIcon from '../components/AppIcon';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../types/navigation.types';
import useCustomState from '../hooks/useCustomState';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const navigation = useNavigation<AppNavigationProps>();
  useCustomState();
  const renderHomeIcon = ({focused}: RenderTabIcon) => {
    return (
      <AppIcon
        name="home"
        size={size}
        color={focused ? activeColor : inactiveColor}
        providerName={iconProvider.Feather_IP}
      />
    );
  };

  const renderExpenseIcon = ({focused}: RenderTabIcon) => {
    return (
      <AppIcon
        name="book-open"
        size={size}
        color={focused ? activeColor : inactiveColor}
        providerName={iconProvider.Feather_IP}
      />
    );
  };

  return (
    <View style={{justifyContent: 'flex-end', flex: 1}}>
      <Tab.Navigator
        screenOptions={{headerShown: false, tabBarStyle: styles.container}}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: renderHomeIcon,
          }}
        />
        <Tab.Screen
          name="Expense"
          component={ExpenseScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: renderExpenseIcon,
          }}
        />
      </Tab.Navigator>
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => navigation.navigate('AddExpense')}>
        <AppIcon
          name="plus"
          size={size}
          color={colors.white}
          providerName={iconProvider.Entypo_IP}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0,
    paddingHorizontal: WP(12),
    paddingTop: HP(2),
    rowGap: WP(4),
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
    height: 84,
    zIndex: 0,
  },
  floatingBtn: {
    position: 'absolute',
    zIndex: 2,
    borderRadius: WP(8),
    padding: HP(2),
    backgroundColor: colors.orange,
    bottom: HP(6),
    alignSelf: 'center',
  },
});
export default BottomTab;
