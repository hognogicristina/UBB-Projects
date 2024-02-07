import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PropertiesListScreen from './screens/PropertiesListScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import AddPropertyScreen from './screens/AddPropertyScreen';

import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="PropertiesList">
                <Stack.Screen name="PropertiesList" component={PropertiesListScreen}/>
                <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen}/>
                <Stack.Screen name="AddProperty" component={AddPropertyScreen}/>
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    );
};

export default App;
