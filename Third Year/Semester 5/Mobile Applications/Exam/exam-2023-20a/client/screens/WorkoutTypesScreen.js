import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Toast from "react-native-toast-message";
import WebSocketClient from "../websocket/WebSocketClient";

const WorkoutTypesScreen = () => {
    const [workoutTypes, setWorkoutTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigation = useNavigation();

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

    const handleTypePress = (selectedType) => {
        navigation.navigate('WorkoutsByType', { selectedType });
    };

    useEffect(() => {
        const fetchWorkoutTypes = async () => {
            try {
                const response = await axios.get('http://192.168.0.150:2320/types');
                setWorkoutTypes(response.data);
            } catch (error) {
                console.error('Error fetching workout types:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWorkoutTypes();
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>

                    <FlatList
                        data={workoutTypes}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleTypePress(item)}>
                                <View style={styles.itemContainer}>
                                    <Text style={styles.itemText}>{item}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    <Toast />
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

export default WorkoutTypesScreen;
