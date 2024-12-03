import {StackNavigationProp} from '@react-navigation/stack';

export type AppStackParams = {
  GetStarted: undefined;
  Bottom: undefined;
  AddExpense: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParams>;
