import {ImageSourcePropType} from 'react-native';
import {categoryType} from '../util/enums';

export type CategoryType = {
  label: string;
  icon: ImageSourcePropType;
  color?: string;
  type: categoryType;
};

export type ExpenseType = {
  id: number;
  amount: number;
  date: string;
  category: CategoryType;
  description?: string;
};

export type ExpenseFormValues = {
  amount: string;
  date?: Date;
  category?: CategoryType;
  description: string;
};
