import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import DaysScreen from './screens/DaysScreen';
import TransactionsListScreen from './screens/TransactionsListScreen';
import AddTransactionScreen from './screens/AddTransactionScreen';
import WeeklyTotalScreen from "./screens/WeeklyTotalScreen";
import TopCategoriesScreen from "./screens/TopCategoriesScreen";

import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Days">
                <Stack.Screen name="Days" component={DaysScreen}/>
                <Stack.Screen name="TransactionsList" component={TransactionsListScreen}/>
                <Stack.Screen name="AddTransaction" component={AddTransactionScreen}/>
                <Stack.Screen name="WeeklyTotal" component={WeeklyTotalScreen}/>
                <Stack.Screen name="TopCategories" component={TopCategoriesScreen}/>
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    );
};

export default App;
