import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CategoriesScreen from './screens/CategoriesScreen';
import RecipesListScreen from './screens/RecipesListScreen';
import AddRecipeScreen from './screens/AddRecipeScreen';
import EasiestRecipesScreen from "./screens/EasiestRecipesScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Categories" component={CategoriesScreen}/>
                <Stack.Screen name="RecipesList" component={RecipesListScreen}/>
                <Stack.Screen name="AddRecipe" component={AddRecipeScreen}/>
                <Stack.Screen name="EasiestRecipes" component={EasiestRecipesScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
