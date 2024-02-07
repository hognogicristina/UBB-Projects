import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {appendLog} from "../log/Logger";
import WebSocketClient from "../websocket/WebSocketClient";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";

const EventsListScreen = () => {
    const navigation = useNavigation();
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOffline, setIsOffline] = useState(false);

    const handleWebSocketMessage = (data) => {
        try {
            const event = JSON.parse(data);
            Toast.show({
                type: 'info',
                text1: 'New Event Added',
                text2: `Event: ${event.name}`,
                visibilityTime: 5000,
                onPress: () => navigation.navigate('EventDetails', {id: event.id})
            });
            setEvents((prevEvents) => [...prevEvents, event]);
        } catch (error) {
            appendLog('Error parsing WebSocket message');
        }
    };

    WebSocketClient(handleWebSocketMessage);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
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

                appendLog('All keys and items in AsyncStorage:');
                result.forEach(([key, value]) => {
                    appendLog(`${key}: ${value}`);
                });
            } catch (error) {
                appendLog('Error retrieving data from AsyncStorage');
            }
        };

        // clearAllData();
        // showAllAsyncStorageData();

        loadEvents();

        return () => unsubscribe();
    }, []);

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@events', jsonValue);
            appendLog('Stored events in AsyncStorage');
        } catch (e) {
            appendLog('Error storing data');
            Toast.show({
                type: 'error',
                text1: 'Storage Error',
                text2: 'Failed to store events in local storage.',
                visibilityTime: 5000,
            });
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@events');
            appendLog('Retrieved events from AsyncStorage');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            appendLog('Error retrieving data');
            Toast.show({
                type: 'error',
                text1: 'Retrieval Error',
                text2: 'Failed to retrieve events from local storage.',
                visibilityTime: 5000,
            });
        }
    };

    const loadEvents = async () => {
        setIsLoading(true);
        const storedEvents = await getData();

        if (isOffline) {
            if (storedEvents) {
                setEvents(storedEvents);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://172.30.118.163:2426/events');
            appendLog('Events fetched successfully from server');
            setEvents(response.data);
            storeData(response.data);
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching events');
            if (storedEvents) {
                setEvents(storedEvents);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Server Error',
                    text2: 'Failed to fetch events from server.',
                    visibilityTime: 5000,
                });
                setIsOffline(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator size="large" color="#0000ff"/>}
            {isOffline && !events.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={loadEvents}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.viewButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('InProgressEvents')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.viewButtonText, isOffline && styles.disabledButtonText]}>View
                                In Progress Events</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.viewButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('TopEventsByParticipants')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.viewButtonText, isOffline && styles.disabledButtonText]}>
                                View Top Categories
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={events}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('EventDetails', {id: item.id})}
                            >
                                <Text style={styles.addressText}>ID: {item.id}</Text>
                                <Text style={styles.addressText}>Name: {item.name}</Text>
                                <Text style={styles.addressText}>Team: {item.team}</Text>
                                <Text style={styles.addressText}>Type: {item.type}</Text>
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEvent')}>
                        <Text style={styles.addButtonText}>Add New Event</Text>
                    </TouchableOpacity>
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
    addressText: {
        fontSize: 18,
        color: '#333333',
        fontFamily: 'Helvetica',
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
    listContainer: {
        paddingBottom: 20,
    },
    footer: {
        borderTopWidth: 1,
        borderTopColor: '#e2e2e2',
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: 'white',
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
    disabledButton: {
        backgroundColor: '#999',
        opacity: 0.7,
    },
    disabledButtonText: {
        color: '#666',
    },
    viewButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    viewButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default EventsListScreen;