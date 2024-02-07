import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PropertiesListScreen from './screens/PropertiesListScreen';
import PropertyDetailsScreen from './screens/PropertyDetailsScreen';
import AddPropertyScreen from './screens/AddPropertyScreen';
import SearchPropertiesScreen from "./screens/SearchPropertiesScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Properties" component={PropertiesListScreen}/>
                <Stack.Screen name="PropertyDetails" component={PropertyDetailsScreen}/>
                <Stack.Screen name="AddProperty" component={AddPropertyScreen}/>
                <Stack.Screen name="SearchProperties" component={SearchPropertiesScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;