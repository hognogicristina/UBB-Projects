import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import WorkoutsScreen from './screens/WorkoutsScreen';
import AddWorkoutScreen from './screens/AddWorkoutScreen';
import WorkoutTypesScreen from './screens/WorkoutTypesScreen';
import WorkoutsByTypeScreen from "./screens/WorkoutsByTypeScreen";
import TopScreen from "./screens/TopScreen";
import TopWorkoutsScreen from "./screens/TopWorkoutsScreen";
import CaloriesBurnedByTypeScreen from "./screens/CaloriesBurnedByTypeScreen";
import WorkoutHistoryScreen from "./screens/WorkoutHistoryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserProfileScreen from "./screens/UserProfileScreen";

import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Workouts">
                <Stack.Screen name="Workouts" component={WorkoutsScreen}/>
                <Stack.Screen name="AddWorkout" component={AddWorkoutScreen}/>
                <Stack.Screen name="WorkoutTypes" component={WorkoutTypesScreen}/>
                <Stack.Screen name="WorkoutsByType" component={WorkoutsByTypeScreen}/>
                <Stack.Screen name="Top" component={TopScreen}/>
                <Stack.Screen name="TopWorkouts" component={TopWorkoutsScreen}/>
                <Stack.Screen name="CaloriesBurnedByType" component={CaloriesBurnedByTypeScreen}/>
                <Stack.Screen name="WorkoutHistory" component={WorkoutHistoryScreen}/>
                <Stack.Screen name="Profile" component={ProfileScreen}/>
                <Stack.Screen name="UserProfile" component={UserProfileScreen}/>
            </Stack.Navigator>
            <Toast/>
        </NavigationContainer>
    );
};

export default App;
