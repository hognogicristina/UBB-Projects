import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import WebSocketClient from '../websocket/WebSocketClient';
import {appendLog} from "../log/Logger";

const DaysScreen = () => {
    const navigation = useNavigation();
    const [days, setDays] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleWebSocketMessage = (data) => {
        try {
            const transaction = JSON.parse(data);
            Toast.show({
                type: 'info',
                text1: 'New Transaction Added',
                text2: `Transaction: ${transaction.name}`,
                visibilityTime: 5000,
                onPress: () => navigation.navigate('TransactionsList', {day: transaction.day})
            });
        } catch (error) {
            console.error('Error parsing WebSocket message');
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

                appendLog('All keys and items in AsyncStorage');
                result.forEach(([key, value]) => {
                    appendLog(`${key}: ${value}`);
                });
            } catch (error) {
                appendLog('Error retrieving data from AsyncStorage');
            }
        };

        // clearAllData();
        // showAllAsyncStorageData();

        loadDays();

        return () => unsubscribe();
    }, []);

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            appendLog(`Stored ${key} in AsyncStorage`);
        } catch (e) {
            appendLog(`Error storing ${key}`);
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
            appendLog(`Error retrieving ${key}`);
            Toast.show({
                type: 'error',
                text1: 'Retrieval Error',
                text2: `Failed to retrieve ${key} from local storage.`,
                visibilityTime: 5000,
            });
        }
    };

    const loadDays = async () => {
        setIsLoading(true);
        const storedDays = await getData('@dates');

        if (isOffline) {
            if (storedDays) {
                setDays(storedDays);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://192.168.0.150:2307/days');
            appendLog('Days fetched successfully from server');
            setDays(response.data);
            storeData('@dates', response.data);
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching days from server');
            if (storedDays) {
                setDays(storedDays);
                appendLog('Loaded days from local storage')
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch days from server.',
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
            {isOffline && !days.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={loadDays}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.discountedButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('WeeklyTotal')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.discountedButtonText, isOffline && styles.disabledButtonText]}>
                                View Weekly Total Amount
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.discountedButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('TopCategories')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.discountedButtonText, isOffline && styles.disabledButtonText]}>
                                View Top Categories
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={days}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('TransactionsList', {date: item})}
                            >
                                <Text style={styles.itemText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />

                </>
            )}
            <Toast/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
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
    itemContainer: {
        backgroundColor: '#007AFF',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    disabledButton: {
        backgroundColor: '#999',
        opacity: 0.7,
    },
    disabledButtonText: {
        color: '#666',
    },
});

export default DaysScreen;