import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoriesScreen from './screens/CategoriesScreen';
import TipsListScreen from './screens/TipsListScreen';
import AddTipScreen from "./screens/AddTipScreen";
import EasiestTipsScreen from "./screens/EasiestTipsScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Categories" component={CategoriesScreen}/>
                <Stack.Screen name="TipsList" component={TipsListScreen}/>
                <Stack.Screen name="AddTip" component={AddTipScreen}/>
                <Stack.Screen name="EasiestTips" component={EasiestTipsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
