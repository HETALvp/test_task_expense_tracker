import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import AppIcon from '../components/AppIcon';
import {categoryType, iconProvider} from '../util/enums';
import FullScreenContainer from '../components/FullScreenContainer';
import {HP, mobileWidth, WP} from '../helpers/utilHelper';
import Spacer from '../components/Spacer';
import {colors} from '../constants/colors';
import Chip from '../components/Chip';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {AppNavigationProps} from '../types/navigation.types';
import {images} from '../assets';
import {CategoryType, ExpenseType} from '../types/types';
import CategoryTile from '../components/CategoryTile';
import AppButton from '../components/AppButton';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {addExpense} from '../redux/slice';

enum DAY {
  TODAY = 'today',
  YESTERDAY = 'yesterday',
  PICK = 'pick',
}

const dayData = [
  {
    label: 'Today',
    color: colors.darkOrange,
    type: DAY.TODAY,
  },
  {
    label: 'Yestrday',
    color: colors.orange,
    type: DAY.YESTERDAY,
  },
  {
    label: 'Choose Date',
    color: colors.mutedOrange,
    type: DAY.PICK,
  },
];

const categories: CategoryType[] = [
  {
    label: 'Shopping',
    icon: images.shopping,
    type: categoryType.Shopping,
  },
  {label: 'Food', icon: images.restaurant, type: categoryType.Food},
  {
    label: 'Transportation',
    icon: images.plane,
    type: categoryType.Transportation,
  },
  {
    label: 'Entertainment',
    icon: images.subscription,
    type: categoryType.Entertainment,
  },
  {label: 'Health', icon: images.health, type: categoryType.Health},
  {label: 'Utility', icon: images.utilities, type: categoryType.Utility},
  {label: 'Grocery', icon: images.grocery, type: categoryType.Grocery},
];

const AddExpenseScreen = () => {
  const [amount, setAmount] = useState<string>();
  const [date, setDate] = useState<Date>();
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);
  const [category, setCategory] = useState<CategoryType>();
  const [openCategoryModal, setOpenCategoryModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>();
  const navigation = useNavigation<AppNavigationProps>();
  const [error, setError] = useState<{
    amount?: string;
    date?: string;
    category?: string;
  }>({});

  const totalExpenses = useAppSelector(state => state.expenseSlice.expenses);
  const dispatch = useAppDispatch();

  const renderHeader = () => (
    <View style={[styles.header, styles.spaceBetween]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AppIcon
            name="chevron-back"
            color="black"
            size={24}
            providerName={iconProvider.Ionicons_IP}
          />
        </TouchableOpacity>
        <Spacer width={WP(2)} />
        <Text style={styles.title}>Add Expense</Text>
      </View>
      <Text style={styles.resetStyle} onPress={onReset}>
        Reset
      </Text>
    </View>
  );
  const renderAmount = () => (
    <View>
      <Text style={styles.heading}>Amount</Text>
      <View style={styles.amtContainer}>
        <Text style={styles.rupee}>₹ </Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          placeholder="0.00"
          cursorColor={colors.blue}
          style={styles.amtTextInput}
          keyboardType="decimal-pad"
        />
      </View>
      {error.amount && <Text style={styles.errorText}>{error.amount}</Text>}
    </View>
  );
  const renderDateSelector = () => (
    <View>
      <Text style={styles.heading}>When did you spend this amount?</Text>
      <View style={styles.lightBackground}>
        {!date ? (
          dayData.map(item => (
            <TouchableOpacity
              key={item.label}
              onPress={() => {
                switch (item.type) {
                  case DAY.TODAY:
                    setDate(moment().toDate());
                    break;
                  case DAY.YESTERDAY:
                    setDate(moment().subtract(1, 'days').toDate());
                    break;
                  case DAY.PICK:
                    setOpenDatePicker(true);
                    break;
                }
              }}>
              <Chip label={item.label} backgroundColor={item.color} />
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.date}>
            <Text style={styles.dateStyle}>
              {moment(date).format('dddd, MMMM Do YYYY')}
            </Text>
            <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
              <AppIcon
                name="date-range"
                color={colors.darkOrange}
                size={24}
                providerName={iconProvider.MaterialIcons_IP}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {error.date && <Text style={styles.errorText}>{error.date}</Text>}
    </View>
  );

  const renderCategorySelector = () => (
    <View>
      <Text style={styles.heading}>Expenses made for</Text>
      <View style={[styles.lightBackground, styles.categoryContent]}>
        <Text style={styles.categoryText}>
          {category ? category.label : 'Select a category'}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: colors.manatee,
            padding: WP(1.5),
            borderRadius: WP(2),
          }}
          onPress={() => setOpenCategoryModal(true)}>
          <AppIcon
            name="chevron-down"
            color={colors.black}
            size={24}
            providerName={iconProvider.Entypo_IP}
          />
        </TouchableOpacity>
      </View>
      {error.category && <Text style={styles.errorText}>{error.category}</Text>}
    </View>
  );
  const renderCategoryModal = () => (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.categoryHeading}>
          <Text style={styles.categoryHeadingText}>Categories</Text>
          <TouchableOpacity onPress={() => setOpenCategoryModal(false)}>
            <AppIcon
              name="close"
              color={colors.black}
              size={30}
              providerName={iconProvider.Ionicons_IP}
            />
          </TouchableOpacity>
        </View>
        <Spacer height={HP(2)} />
        {categories.map(item => (
          <CategoryTile
            key={item.label}
            category={item}
            onPress={() => {
              setCategory(item);
              setOpenCategoryModal(false);
            }}
          />
        ))}
      </View>
    </View>
  );
  const renderDescription = () => (
    <View>
      <Text style={styles.heading}>Description</Text>
      <View style={styles.lightBackground}>
        <TextInput
          value={description}
          onChangeText={setDescription}
          multiline
          style={styles.descriptionTextInput}
        />
      </View>
    </View>
  );
  const onReset = () => {
    setDescription(undefined);
    setCategory(undefined);
    setDate(undefined);
    setAmount(undefined);
    setError({});
  };
  const onSubmit = () => {
    const newErrors: {amount?: string; date?: string; category?: string} = {};

    if (!amount) {
      newErrors.amount = 'Amount is required';
    }
    if (amount && Number(amount) <= 0) {
      newErrors.amount = 'Amount must be more than 0';
    }
    if (!date) {
      newErrors.date = 'Date is required';
    }
    if (!category) {
      newErrors.category = 'Category is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    } else {
      const newExpense: ExpenseType = {
        id: totalExpenses.length + 1,
        category: category!,
        date: date!.toISOString(),
        amount: Number(amount),
        description: description?.trim(),
      };

      dispatch(addExpense(newExpense));
      navigation.goBack();
    }
  };
  return (
    <FullScreenContainer>
      <View style={styles.container}>
        {renderHeader()}
        <Spacer height={HP(4)} />
        <ScrollView
          contentContainerStyle={{gap: HP(4)}}
          showsVerticalScrollIndicator={false}>
          {renderAmount()}
          {renderDateSelector()}
          {renderCategorySelector()}
          {renderDescription()}
        </ScrollView>
        <View style={styles.bottom}>
          <AppButton title="Add" onPress={onSubmit} />
        </View>
      </View>

      <DatePicker
        modal
        open={openDatePicker}
        date={date ?? new Date()}
        mode="date"
        maximumDate={moment().toDate()}
        onConfirm={newDate => {
          setOpenDatePicker(false);
          setDate(newDate);
        }}
        onCancel={() => {
          setOpenDatePicker(false);
        }}
      />

      <Modal
        visible={openCategoryModal}
        animationType="slide"
        transparent={true}>
        {renderCategoryModal()}
      </Modal>
    </FullScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: HP(2),
    marginVertical: HP(1),
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 18,
  },
  amtContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
  rupee: {fontSize: 40},
  heading: {
    color: colors.manatee,
    fontWeight: '700',
    marginBottom: HP(1),
  },
  amtTextInput: {
    height: 40,
    flex: 1,
    fontSize: 40,
  },
  lightBackground: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    paddingVertical: HP(2),
    borderRadius: WP(3),
    paddingHorizontal: WP(2),
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
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
  categoryContent: {justifyContent: 'space-between', alignItems: 'center'},
  categoryText: {fontWeight: 'bold', fontSize: 18},
  categoryHeading: {flexDirection: 'row', justifyContent: 'space-between'},
  categoryHeadingText: {fontSize: 20, fontWeight: '700'},
  descriptionTextInput: {
    minHeight: 24,
    flex: 1,
    fontSize: 18,
  },
  bottom: {
    paddingVertical: HP(2),
  },
  dateStyle: {fontWeight: 'bold', fontSize: 18},
  resetStyle: {
    fontSize: 14,
    color: colors.orange,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: HP(0.5),
  },
  spaceBetween: {justifyContent: 'space-between'},
});

export default AddExpenseScreen;
