import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ExpenseType} from '../types/types';
import {setItem, storageKeys} from '../helpers/StorageHelper';

type ExpenseSliceType = {
  expenses: ExpenseType[];
};

const initialState: ExpenseSliceType = {
  expenses: [], // Define your initial state
};

const expenseSlice = createSlice({
  name: 'expenseSlice',
  initialState,
  reducers: {
    setExpenseArray: (state, actions: PayloadAction<ExpenseType[]>) => {
      state.expenses = actions.payload;
    },
    addExpense: (state, actions: PayloadAction<ExpenseType>) => {
      state.expenses.push(actions.payload);
      setItem(storageKeys.expenses, state.expenses);
    },
    removeExpense: (state, actions: PayloadAction<ExpenseType>) => {
      const removedExpense = state.expenses.filter(
        expense => expense.id !== actions.payload.id,
      );
      state.expenses = [...removedExpense];
      setItem(storageKeys.expenses, [...removedExpense]);
    },
  },
});

export const {addExpense, removeExpense, setExpenseArray} =
  expenseSlice.actions;
export default expenseSlice.reducer;
