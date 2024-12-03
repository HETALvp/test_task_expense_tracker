import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {ExpenseType} from '../types/types';
import {FlatList} from 'react-native';
import {colors} from '../constants/colors';
import {
  formatAmount,
  formatDate,
  getCategoryDetails,
  HP,
  WP,
} from '../helpers/utilHelper';
import FullScreenContainer from '../components/FullScreenContainer';
import AppIcon from '../components/AppIcon';
import {iconProvider} from '../util/enums';
import Spacer from '../components/Spacer';
import {removeExpense} from '../redux/slice';

const ExpenseScreen = () => {
  const allExpenses = useAppSelector(state => state.expenseSlice.expenses);
  const dispatch = useAppDispatch();

  const onRemoveExpense = (expense: ExpenseType) => {
    dispatch(removeExpense(expense));
  };

  const renderExpense = ({item}: {item: ExpenseType}) => {
    return (
      <View style={styles.expenseContainer}>
        <View style={styles.iconContainer}>
          <Image
            source={getCategoryDetails(item.category.type)?.icon}
            resizeMode="cover"
            style={styles.iconImage}
          />
        </View>
        <Spacer width={WP(2)} />
        <View>
          <Text style={styles.amountText}>₹{formatAmount(item.amount)}</Text>
          <Text style={styles.dateText}>{formatDate(item.date)}</Text>
          {item.description && (
            <Text style={styles.descriptionText}>{item.description}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => onRemoveExpense(item)}
          style={styles.deleteButton}>
          <AppIcon
            name="delete"
            color="gray"
            size={24}
            providerName={iconProvider.MaterialCommunityIcons_IP}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FullScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>All Expenses</Text>
        <View>
          <ScrollView>
            {allExpenses.length && (
              <FlatList
                contentContainerStyle={styles.flatListContent}
                data={allExpenses}
                keyExtractor={item => item.id.toString()}
                renderItem={renderExpense}
              />
            )}
          </ScrollView>
        </View>
      </View>
    </FullScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HP(2),
    marginVertical: HP(1),
    flex: 1,
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  expenseContainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    paddingVertical: HP(1),
    borderRadius: WP(3),
    paddingHorizontal: WP(2),
    flex: 1,
    marginVertical: WP(1.5),
  },
  iconContainer: {
    backgroundColor: colors.orange,
    borderRadius: WP(2),
    paddingHorizontal: WP(2),
    justifyContent: 'center',
    height: HP(5),
    width: HP(5),
  },
  iconImage: {
    tintColor: colors.white,
    height: HP(3),
    width: HP(3),
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    color: 'gray',
  },
  descriptionText: {
    color: 'gray',
    maxWidth: WP('65%'),
  },
  deleteButton: {
    position: 'absolute',
    right: WP(4),
    top: WP(4),
    alignSelf: 'flex-start',
  },
  flatListContent: {
    marginVertical: WP(1.5),
  },
});

export default ExpenseScreen;
