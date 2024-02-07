import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventsListScreen from './screens/EventsListScreen';
import EventDetailsScreen from './screens/EventDetailsScreen';
import AddEventScreen from './screens/AddEventScreen';
import InProgressEventsScreen from "./screens/InProgressEventsScreen";
import TopEventsByParticipantsScreen from "./screens/TopEventsByParticipantsScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Events" component={EventsListScreen}/>
                <Stack.Screen name="EventDetails" component={EventDetailsScreen}/>
                <Stack.Screen name="AddEvent" component={AddEventScreen}/>
                <Stack.Screen name="InProgressEvents" component={InProgressEventsScreen}/>
                <Stack.Screen name="TopEventsByParticipants" component={TopEventsByParticipantsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;