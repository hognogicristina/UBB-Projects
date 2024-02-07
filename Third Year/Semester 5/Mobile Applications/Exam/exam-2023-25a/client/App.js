import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoriesScreen from './screens/CategoriesScreen';
import ItemsListScreen from './screens/ItemsListScreen';
import AddItemScreen from './screens/AddItemScreen';
import DiscountedItemsScreen from './screens/DiscountedItemsScreen';

import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Categories">
                <Stack.Screen name="Categories" component={CategoriesScreen}/>
                <Stack.Screen name="ItemsList" component={ItemsListScreen}/>
                <Stack.Screen name="AddItem" component={AddItemScreen}/>
                <Stack.Screen name="DiscountedItems" component={DiscountedItemsScreen}/>
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    );
};

export default App;
