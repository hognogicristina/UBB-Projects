import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {appendLog} from "../log/Logger";
import WebSocketClient from "../websocket/WebSocketClient";
import Toast from "react-native-toast-message";
import {useNavigation} from "@react-navigation/native";

const PropertiesListScreen = () => {
    const navigation = useNavigation();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOffline, setIsOffline] = useState(false);

    const handleWebSocketMessage = (data) => {
        try {
            const property = JSON.parse(data);
            Toast.show({
                type: 'info',
                text1: 'New Property Added',
                text2: `Property: ${property.address}`,
                visibilityTime: 5000,
                onPress: () => navigation.navigate('PropertyDetails', {id: property.id})
            });
            setProperties((prevProperties) => [...prevProperties, property]);
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
                appendLog('Error clearing all data', e);
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
                appendLog('Error retrieving data from AsyncStorage:', error);
            }
        };

        // clearAllData();
        //
        // showAllAsyncStorageData();

        loadProperties();

        return () => unsubscribe();
    }, []);

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@properties', jsonValue);
            appendLog('Stored properties in AsyncStorage');
        } catch (e) {
            appendLog('Error storing data');
            Toast.show({
                type: 'error',
                text1: 'Storage Error',
                text2: 'Failed to store properties in local storage.',
                visibilityTime: 5000,
            });
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@properties');
            appendLog('Retrieved properties from AsyncStorage');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            appendLog('Error retrieving data', e);
            Toast.show({
                type: 'error',
                text1: 'Retrieval Error',
                text2: 'Failed to retrieve properties from local storage.',
                visibilityTime: 5000,
            });
        }
    };

    const loadProperties = async () => {
        setIsLoading(true);
        const storedProperties = await getData();

        if (isOffline) {
            if (storedProperties) {
                setProperties(storedProperties);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://192.168.0.150:2309/properties');
            appendLog('Properties fetched successfully from server');
            setProperties(response.data);
            storeData(response.data);
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching properties');
            if (storedProperties) {
                setProperties(storedProperties);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Server Error',
                    text2: 'Failed to fetch properties from server.',
                    visibilityTime: 5000,
                });
                setIsOffline(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProperty = async (id) => {
        if (isOffline) {
            Toast.show({
                type: 'error',
                text1: 'Offline',
                text2: 'Cannot delete properties while offline.',
                visibilityTime: 5000,
            });
            return;
        }

        try {
            await axios.delete(`http://192.168.0.150:2309/property/${id}`);
            appendLog('Property deleted successfully from server');
            setProperties((prevProperties) => prevProperties.filter((property) => property.id !== id));
            storeData(`@properties`, properties);
        } catch (error) {
            appendLog('Error deleting property');
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete property.',
                visibilityTime: 5000,
            });
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && <ActivityIndicator size="large" color="#0000ff"/>}
            {isOffline && !properties.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={loadProperties}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <TouchableOpacity
                        style={[styles.searchButton, isOffline && styles.disabledButton]}
                        onPress={() => navigation.navigate('SearchProperties')}
                        disabled={isOffline}
                    >
                        <Text style={[styles.searchButtonText, isOffline && styles.disabledButtonText]}>Search
                            Properties</Text>
                    </TouchableOpacity>

                    <FlatList
                        data={properties}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('PropertyDetails', {id: item.id})}
                            >
                                <Text style={styles.addressText}>{item.address}</Text>
                                <TouchableOpacity
                                    style={[styles.deleteButton, isOffline && styles.disabledButton]}
                                    onPress={() => deleteProperty(item.id)}
                                    disabled={isOffline}
                                >
                                    <Text
                                        style={[styles.deleteButtonText, isOffline && styles.disabledButtonText]}>Delete</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />

                    <TouchableOpacity
                        style={[styles.addButton, isOffline && styles.disabledButton]}
                        onPress={() => navigation.navigate('AddProperty')}
                        disabled={isOffline}
                    >
                        <Text style={[styles.addButtonText, isOffline && styles.disabledButtonText]}>Add New
                            Property</Text>
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
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
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
    searchButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    searchButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default PropertiesListScreen;