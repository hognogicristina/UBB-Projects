import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import GenresScreen from './screens/GenresScreen';
import MoviesListScreen from './screens/MoviesListScreen';
import AddMovieScreen from './screens/AddMovieScreen';
import ReleaseYearScreen from "./screens/ReleaseYearScreen";

import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Genres">
                <Stack.Screen name="Genres" component={GenresScreen}/>
                <Stack.Screen name="MoviesList" component={MoviesListScreen}/>
                <Stack.Screen name="AddMovie" component={AddMovieScreen}/>
                <Stack.Screen name="ReleaseYear" component={ReleaseYearScreen}/>
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    );
};

export default App;
