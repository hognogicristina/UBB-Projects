import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Alert} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import WebSocketClient from '../websocket/WebSocketClient';
import {appendLog} from "../log/Logger";

const WorkoutsScreen = () => {
    const navigation = useNavigation();
    const [workouts, setWorkouts] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleWebSocketMessage = (message) => {
        try {
            const newItem = JSON.parse(message);
            setWorkouts((prevWorkouts) => [...prevWorkouts, newItem]);
            Toast.show({
                type: 'info',
                text1: 'New Workout Added',
                text2: `Workout: ${newItem.name}, Type: ${newItem.type}, Duration: ${newItem.duration}`,
                visibilityTime: 5000,
                onPress: () => navigation.navigate('Workouts')
            });
        } catch (error) {
            console.error('Error parsing WebSocket message');
        }
    };

    WebSocketClient(handleWebSocketMessage);

    useEffect(() => {
        const unsubscribeFocusListener = navigation.addListener('focus', () => {
            loadWorkouts();
        });

        const syncOfflineWorkouts = async () => {
            const offlineWorkouts = await getData('@offlineWorkouts');
            if (offlineWorkouts && offlineWorkouts.length > 0) {
                offlineWorkouts.forEach(workout => {
                    axios.post('http://192.168.0.150:2320/workout', workout)
                        .then(() => {
                            const updatedOfflineWorkouts = offlineWorkouts.filter(w => w.id !== workout.id);
                            storeData('@offlineWorkouts', updatedOfflineWorkouts);
                            appendLog('Offline workout synced');
                            loadWorkouts();
                        })
                        .catch(() => {
                            appendLog('Error syncing offline workout');
                        });
                });
            }
        };

        NetInfo.fetch().then(state => {
            if (state.isConnected) {
                syncOfflineWorkouts();
            }
        });

        const clearAllData = async () => {
            try {
                await AsyncStorage.clear();
                appendLog('All data cleared');
            } catch (e) {
                appendLog('Error clearing all data');
            }
        };

        const showAllAsyncStorageData = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);

                appendLog('All keys and items in AsyncStorage');
                result.forEach(([key, value]) => {
                    appendLog(`${key}: ${value}`);
                });
            } catch (error) {
                appendLog('Error retrieving data from AsyncStorage');
            }
        };

        // clearAllData();
        showAllAsyncStorageData();

        loadWorkouts();

        return () => {
            unsubscribeFocusListener();
            // unsubscribeNetInfo();
        };
    }, []);

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            appendLog(`Stored ${key} in AsyncStorage`);
        } catch (e) {
            appendLog(`Error storing ${key} in AsyncStorage`);
            Toast.show({
                type: 'error',
                text1: 'Storage Error',
                text2: `Failed to store ${key} in local storage.`,
                visibilityTime: 5000,
            });
        }
    };

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            appendLog(`Retrieved ${key} from AsyncStorage`);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            appendLog(`Error retrieving ${key} from AsyncStorage`);
            Toast.show({
                type: 'error',
                text1: 'Retrieval Error',
                text2: `Failed to retrieve ${key} from local storage.`,
                visibilityTime: 5000,
            });
        }
    };

    const loadWorkouts = async () => {
        setIsLoading(true);
        try {
            const storedWorkouts = await getData('@all');
            const offlineWorkouts = await getData('@offlineWorkouts') || [];

            let combinedWorkouts = storedWorkouts || [];
            if (isOffline) {
                combinedWorkouts = [...combinedWorkouts, ...offlineWorkouts];
            } else {
                const response = await axios.get('http://192.168.0.150:2320/all');
                combinedWorkouts = response.data;
                await storeData('@all', combinedWorkouts);
            }

            setWorkouts(combinedWorkouts);
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching workouts');
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to load workouts.',
                visibilityTime: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };



    const handleDeleteWorkout = async (id) => {
        try {
            setIsLoading(true);
            await axios.delete(`http://192.168.0.150:2320/workout/${id}`);
            setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== id));

            if (workouts.length === 1) {
                await navigation.navigate('WorkoutTypes');
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error deleting workout:', error);
            Alert.alert('Error', 'Failed to delete the workout. Please try again later.');
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator size="large" color="#0000ff"/>}
            {isOffline && !workouts.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={loadWorkouts}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.styleButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('WorkoutTypes')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.styleButtonText, isOffline && styles.disabledButtonText]}>
                                View Workout Types
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.styleButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('Top')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.styleButtonText, isOffline && styles.disabledButtonText]}>
                                View Top
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.styleButton}
                            onPress={() => navigation.navigate('Profile')}
                        >
                            <Text style={styles.styleButtonText}>Profile</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={workouts}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemName}>Workout: {item.name}</Text>
                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => {
                                        Alert.alert(
                                            'Confirm Deletion',
                                            'Are you sure you want to delete this workout?',
                                            [
                                                {
                                                    text: 'Cancel',
                                                    style: 'cancel',
                                                },
                                                {
                                                    text: 'Delete',
                                                    onPress: () => handleDeleteWorkout(item.id),
                                                    style: 'destructive',
                                                },
                                            ]
                                        );
                                    }}
                                >
                                    <Text style={styles.deleteButtonText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddWorkout')}>
                        <Text style={styles.addButtonText}>Add New Workout</Text>
                    </TouchableOpacity>
                </>
            )}
            <Toast/>
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
    itemName: {
        fontSize: 24,
        color: 'blue',
        fontFamily: 'Arial',
        fontWeight: 'bold',
    },
    offlineContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    offlineText: {
        fontSize: 18,
        marginBottom: 10,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    styleButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    styleButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#999',
        opacity: 0.7,
    },
    disabledButtonText: {
        color: '#666',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 16,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});

export default WorkoutsScreen;