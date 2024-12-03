import AsyncStorage from '@react-native-async-storage/async-storage';
import {ExpenseType} from '../types/types';

const storageKeys = {
  getStarted: 'getStarted',
  expenses: 'expenses',
  monthlyBudget: 'monthlyBudget',
};

const setItem = async (key: string, value: string | ExpenseType[]) => {
  const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
  await AsyncStorage.setItem(key, stringValue);
};

const getItem = async (
  key: string,
): Promise<string | undefined | ExpenseType[]> => {
  const value = await AsyncStorage.getItem(key);

  if (value) {
    try {
      // Try to parse it as JSON (for ExpenseType[])
      const parsedValue = JSON.parse(value);
      if (Array.isArray(parsedValue)) {
        return parsedValue as ExpenseType[];
      }
    } catch (e) {
      // If parsing fails, it might just be a string
    }

    return value;
  }
};

const removeItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

const removeMultiItem = async (key: string[]) => {
  await AsyncStorage.multiRemove(key);
};

export {storageKeys, setItem, getItem, removeItem, removeMultiItem};
