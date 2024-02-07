import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import axios from 'axios';
import Toast from "react-native-toast-message";
import WebSocketClient from "../websocket/WebSocketClient";
import {useNavigation} from "@react-navigation/native";

const CaloriesBurnedByTypeScreen = () => {

    const navigation = useNavigation();
    const [workouts, setWorkouts] = useState([]);
    const [caloriesByType, setCaloriesByType] = useState({});
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
        axios.get('http://192.168.0.150:2320/all')
            .then((response) => {
                setWorkouts(response.data);
                calculateCaloriesByType(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching workouts:', error);
                setIsLoading(false);
            });
    }, []);

    const calculateCaloriesByType = (workouts) => {
        const caloriesByTypeMap = {};

        workouts.forEach((workout) => {
            const type = workout.type;
            const calories = workout.calories;
            if (type && calories) {
                if (caloriesByTypeMap[type]) {
                    caloriesByTypeMap[type] += calories;
                } else {
                    caloriesByTypeMap[type] = calories;
                }
            }
        });

        setCaloriesByType(caloriesByTypeMap);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <>
                <Text style={styles.header}>Calories Burned by Workout Type</Text>
                <FlatList
                    data={Object.keys(caloriesByType)}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemText}>Type: {item}</Text>
                            <Text style={styles.itemText}>
                                Total Calories Burned: {caloriesByType[item]}
                            </Text>
                        </View>
                    )}
                />
                <Toast />
            </>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f7',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
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
    },
});

export default CaloriesBurnedByTypeScreen;
