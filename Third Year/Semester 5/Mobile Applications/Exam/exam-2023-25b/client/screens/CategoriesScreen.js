import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import WebSocketClient from '../websocket/WebSocketClient';
import NetInfo from '@react-native-community/netinfo';
import {appendLog} from "../log/Logger";

const CategoriesScreen = () => {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleWebSocketMessage = (data) => {
        try {
            const recipe = JSON.parse(data);
            Toast.show({
                type: 'info',
                text1: 'New Recipe Added',
                text2: `Recipe: ${recipe.name}`,
                visibilityTime: 5000,
                onPress: () => navigation.navigate('RecipesList', {category: recipe.category})
            });
        } catch (error) {
            console.error('Error parsing WebSocket message', error);
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
        // showAllAsyncStorageData();

        loadCategories();

        return () => unsubscribe();
    }, []);

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            appendLog(`Stored ${key} in AsyncStorage`);
        } catch (e) {
            appendLog(`Error storing ${key}`, e);
            Toast.show({
                type: 'error',
                text1: 'Storage Error',
                text2: `Failed to store ${key} in local storage.`,
                visibilityTime: 5000,
            });
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@categories');
            appendLog('Retrieved categories from AsyncStorage');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            appendLog('Error retrieving data', e);
            Toast.show({
                type: 'error',
                text1: 'Retrieval Error',
                text2: 'Failed to retrieve categories from local storage.',
                visibilityTime: 5000,
            });
        }
    };

    const loadCategories = async () => {
        setIsLoading(true);
        const storedCategories = await getData('@categories');

        if (isOffline) {
            if (storedCategories) {
                setCategories(storedCategories);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://192.168.0.150:2325/categories');
            appendLog('Categories fetched successfully from server');
            setCategories(response.data);
            storeData('@categories', response.data);
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching categories from server:', error);
            if (storedCategories) {
                setCategories(storedCategories);
                appendLog('Loaded categories from local storage')
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch categories from server.',
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
            {isOffline && !categories.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <TouchableOpacity style={styles.retryButton} onPress={loadCategories}>
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <TouchableOpacity
                        style={[styles.easiestButton, isOffline && styles.disabledButton]}
                        onPress={() => navigation.navigate('EasiestRecipes')}
                        disabled={isOffline}
                    >
                        <Text style={[styles.easiestButtonText, isOffline && styles.disabledButtonText]}>
                            View Easiest Recipes
                        </Text>
                    </TouchableOpacity>

                    <FlatList
                        data={categories}
                        keyExtractor={(item) => item.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('RecipesList', {category: item})}
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
    easiestButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    easiestButtonText: {
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

export default CategoriesScreen;