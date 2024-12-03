import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import GetStartedScreen from './src/screens/GetStartedScreen';
import {AppStackParams} from './src/types/navigation.types';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomTab from './src/screens/Bottom';
import AddExpenseScreen from './src/screens/AddExpenseScreen';
import {getItem, storageKeys} from './src/helpers/StorageHelper';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const Stack = createNativeStackNavigator<AppStackParams>();

const MyComponent = () => {
  const [hasStarted, setHasStarted] = useState<string>();

  const getStarted = async () => {
    const hasStartedStorage = await getItem(storageKeys.getStarted);
    if (!Array.isArray(hasStartedStorage)) {
      setHasStarted(hasStartedStorage);
    }
  };

  useEffect(() => {
    getStarted();
  }, []);
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {!hasStarted && (
              <Stack.Screen name="GetStarted" component={GetStartedScreen} />
            )}
            <Stack.Screen name="Bottom" component={BottomTab} />
            <Stack.Screen
              name="AddExpense"
              component={AddExpenseScreen}
              options={{
                animation: 'slide_from_bottom',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default MyComponent;
