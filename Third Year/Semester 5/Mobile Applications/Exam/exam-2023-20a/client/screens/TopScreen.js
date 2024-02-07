import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Toast from "react-native-toast-message";
import WebSocketClient from "../websocket/WebSocketClient";

const TopScreen = () => {
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

    return (
        <View style={styles.container}>
            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.discountedButton} onPress={() => navigation.navigate('TopWorkouts')}>
                    <Text style={styles.discountedButtonText}>
                        View Top Workouts
                    </Text>
                </TouchableOpacity>

                <Toast/>
            </View>

            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.discountedButton}
                                  onPress={() => navigation.navigate('CaloriesBurnedByType')}>
                    <Text style={styles.discountedButtonText}>
                        View Calories Burned By Type
                    </Text>
                </TouchableOpacity>

                <Toast/>
            </View>

            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.discountedButton} onPress={() => navigation.navigate('WorkoutHistory')}>
                    <Text style={styles.discountedButtonText}>
                        View Workout History
                    </Text>
                </TouchableOpacity>

                <Toast/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f7',
        justifyContent: 'center', // Center the buttons vertically
        alignItems: 'center', // Center the buttons horizontally
    },
    buttonWrapper: {
        marginBottom: 20, // Add margin between buttons
    },
    discountedButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    discountedButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TopScreen;