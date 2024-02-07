import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import WebSocketClient from "../websocket/WebSocketClient";
import {useNavigation} from '@react-navigation/native';
import Toast from "react-native-toast-message";

const WorkoutsByTypeScreen = ({route}) => {
    const navigation = useNavigation();
    const {selectedType} = route.params;
    const [workouts, setWorkouts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleWebSocketMessage = (data) => {
        try {
            const workout = JSON.parse(data);
            Toast.show({
                type: 'info',
                text1: 'New Workout Added',
                text2: `Workout: ${workout.name}, Type: ${workout.type}, Duration: ${workout.duration}`,
                visibilityTime: 5000,
                onPress: () => navigation.navigate('Workouts')
            });
        } catch (error) {
            console.error('Error parsing WebSocket message');
        }
    };

    WebSocketClient(handleWebSocketMessage);

    useEffect(() => {
        const fetchWorkoutsByType = async () => {
            try {
                const response = await axios.get(`http://192.168.0.150:2320/workouts/${selectedType}`);
                setWorkouts(response.data);
            } catch (error) {
                console.error('Error fetching workouts by type:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkoutsByType();
    }, [selectedType]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>
                    <FlatList
                        data={workouts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemText}>Name: {item.name}</Text>
                                <Text style={styles.itemText}>Duration (minutes): {item.duration}</Text>
                                <Text style={styles.itemText}>Calories Burned: {item.calories}</Text>
                                <Text style={styles.itemText}>Date: {item.date}</Text>
                                <Text style={styles.itemText}>Notes: {item.notes}</Text>
                            </View>
                        )}
                    />
                    <Toast/>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    itemText: {
        fontSize: 18,
        color: '#333333',
        fontFamily: 'Helvetica',
    },
});

export default WorkoutsByTypeScreen;