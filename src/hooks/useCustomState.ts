import {useCallback, useEffect} from 'react';
import {getItem, storageKeys} from '../helpers/StorageHelper';
import {useAppDispatch} from '../redux/hooks';
import {setExpenseArray} from '../redux/slice';

const useCustomState = () => {
  const dispatch = useAppDispatch();

  const getExpense = useCallback(async () => {
    const expenses = await getItem(storageKeys.expenses);
    if (Array.isArray(expenses)) {
      dispatch(setExpenseArray(expenses));
    }
  }, [dispatch]);

  useEffect(() => {
    getExpense();
  }, [getExpense]);
};

export default useCustomState;
