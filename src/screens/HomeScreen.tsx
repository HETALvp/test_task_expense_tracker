import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import FullScreenContainer from '../components/FullScreenContainer';
import {
  formatAmount,
  getCategoryDetails,
  HP,
  mobileWidth,
  WP,
} from '../helpers/utilHelper';
import Spacer from '../components/Spacer';
import {colors} from '../constants/colors';
import {useAppSelector} from '../redux/hooks';
import {categoryType, iconProvider} from '../util/enums';
import AppIcon from '../components/AppIcon';
import moment from 'moment';
import {getItem, setItem, storageKeys} from '../helpers/StorageHelper';

const HomeScreen = () => {
  const allExpenses = useAppSelector(state => state.expenseSlice.expenses);
  const [monthlyBudget, setMonthlyBudget] = useState<string>('0.00');
  const [editBudget, setEditBudget] = useState<boolean>(false);

  const getMonthlyBudget = useCallback(async () => {
    const budget = await getItem(storageKeys.monthlyBudget);
    if (budget && !Array.isArray(budget)) {
      setMonthlyBudget(budget);
    }
  }, []);

  useEffect(() => {
    getMonthlyBudget();
  }, [getMonthlyBudget]);

  const totalAmount = useMemo(() => {
    return allExpenses.reduce((sum, expense) => {
      const expenseDate = moment(expense.date, 'YYYY-MM-DD');
      const isCurrentMonth = expenseDate.isSame(moment(), 'month');
      return isCurrentMonth ? sum + expense.amount : sum;
    }, 0);
  }, [allExpenses]);

  const categorySums = useMemo(() => {
    return allExpenses.reduce((acc, expense) => {
      const expenseMonth = moment(expense.date, 'YYYY-MM-DD').month();
      const currentMonth = moment().month();
      const expenseYear = moment(expense.date, 'YYYY-MM-DD').year();
      const currentYear = moment().year();

      // Only include expenses from the current month and year
      if (expenseMonth === currentMonth && expenseYear === currentYear) {
        const category = expense.category.type;
        if (!acc[category]) {
          acc[category] = 0;
        }
        acc[category] += expense.amount;
      }
      return acc;
    }, {} as Record<categoryType, number>);
  }, [allExpenses]);

  const expendPercentage = useMemo(() => {
    return (totalAmount / Number(monthlyBudget)) * 100;
  }, [totalAmount, monthlyBudget]);

  const onSaveMonthlyBudget = async () => {
    setMonthlyBudget(monthlyBudget);
    await setItem(storageKeys.monthlyBudget, monthlyBudget);
  };

  const getTotalPercentageExpend = (totalAmount / Number(monthlyBudget)) * 100;
  return (
    <FullScreenContainer>
      <View style={styles.container}>
        <Text style={styles.title}>Analytics</Text>
        <Spacer height={HP(2)} />
        <View style={styles.budgetContainer}>
          <Text style={styles.budgetText}>
            {Number(monthlyBudget) <= 0
              ? 'Add monthly budget to see analytics'
              : 'Your monthly budget'}
          </Text>
          <Spacer height={HP(1)} />
          <View style={styles.row}>
            <Text style={styles.budgetAmount}>₹</Text>
            <TextInput
              editable={editBudget}
              value={
                editBudget ? monthlyBudget : formatAmount(Number(monthlyBudget))
              }
              onChangeText={setMonthlyBudget}
              style={styles.budgetAmount}
              cursorColor={colors.white}
              placeholderTextColor={colors.manatee}
              placeholder="0.00"
              keyboardType="decimal-pad"
            />
          </View>

          <Spacer height={HP(1)} />
          {Number(monthlyBudget) > 0 && getTotalPercentageExpend > 75 && (
            <>
              <Text style={styles.budgetLimitText}>
                You have spent {getTotalPercentageExpend}% of you budget
              </Text>
              <Spacer height={HP(1)} />
            </>
          )}
          {Number(monthlyBudget) > 0 && expendPercentage <= 100 && (
            <View style={styles.progressBarContainer}>
              <View
                style={{
                  ...styles.progressBar,

                  width: `${expendPercentage}%`,
                }}
              />
            </View>
          )}
          <TouchableOpacity
            onPress={() =>
              setEditBudget(prev => {
                if (prev) {
                  onSaveMonthlyBudget();
                }
                return !prev;
              })
            }
            style={styles.editIcon}>
            {editBudget ? (
              <Text style={styles.save}>Save</Text>
            ) : (
              <AppIcon
                name="edit"
                color={colors.white}
                size={24}
                providerName={iconProvider.Feather_IP}
              />
            )}
          </TouchableOpacity>
        </View>

        {Number(monthlyBudget) > 0 && (
          <FlatList
            data={Object.entries(categorySums)}
            keyExtractor={([category]) => category}
            renderItem={({item}) => {
              const [category, sum] = item;
              const categoryDetail = getCategoryDetails(Number(category));
              return (
                <View style={styles.item}>
                  <View style={styles.iconContainer}>
                    <Image
                      source={categoryDetail?.icon}
                      resizeMode="cover"
                      style={styles.iconImage}
                    />
                  </View>
                  <Spacer width={WP(3)} />
                  <View>
                    <Text style={styles.categoryText}>
                      {categoryDetail?.label}
                    </Text>
                    <Text style={styles.sumText}>
                      {`${((sum / Number(monthlyBudget)) * 100).toFixed(
                        2,
                      )} of total budget`}
                    </Text>
                  </View>
                  <Text style={styles.amt}>₹{sum}</Text>
                </View>
              );
            }}
          />
        )}
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
  budgetContainer: {
    backgroundColor: colors.lightOrane,
    padding: WP(4),
    borderRadius: 10,
    alignItems: 'center',
  },
  budgetText: {
    fontSize: 12,
    color: colors.white,
  },
  budgetLimitText: {
    fontSize: 12,
    color: 'red',
  },
  budgetAmount: {
    fontSize: 34,
    fontWeight: 'bold',
    color: colors.white,
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  progressBar: {
    height: 20,
    backgroundColor: colors.mutedOrange,
    borderRadius: 10,
  },
  item: {
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
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sumText: {
    fontSize: 14,
    color: 'gray',
  },
  iconImage: {
    tintColor: colors.white,
    height: HP(3),
    width: HP(3),
  },
  amt: {
    position: 'absolute',
    right: WP(4),
    top: WP(4),
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalView: {
    width: mobileWidth,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingHorizontal: WP(3),
    paddingVertical: HP(2),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryHeadingText: {fontSize: 20, fontWeight: '700'},
  editIcon: {
    position: 'absolute',
    top: HP(1),
    right: WP(2),
  },
  save: {fontSize: 12, color: colors.white, fontWeight: 'bold'},
  row: {flexDirection: 'row'},
});
export default HomeScreen;
