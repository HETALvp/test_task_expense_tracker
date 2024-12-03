import {configureStore} from '@reduxjs/toolkit';
import expenseSliceReducer from './slice';

const store = configureStore({
  reducer: {
    expenseSlice: expenseSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
