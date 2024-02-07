import React, {useEffect, useState} from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import WebSocketClient from "../websocket/WebSocketClient";
import { Alert } from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import {appendLog} from "../log/Logger";

const MoviesListScreen = ({route}) => {
    const navigation = useNavigation();
    const {genre} = route.params;
    const [movies, setMovies] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        loadMovies();

        return () => unsubscribe();
    }, [genre]);

    const onWebSocketMessage = (message) => {
        try {
            const newItem = JSON.parse(message);
            setMovies((prevMovies) => [...prevMovies, newItem]);
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    WebSocketClient(onWebSocketMessage);

    const loadMovies = async () => {
        setIsLoading(true);
        const storedMovies = await getData(`@movies_${genre}`);

        if (isOffline) {
            if (storedMovies) {
                appendLog('Loaded movies from AsyncStorage');
                setMovies(storedMovies);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.150:2305/movies/${genre}`);
            setMovies(response.data);
            await storeData(`@movies_${genre}`, response.data);
            appendLog('Movies fetched successfully from server');
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching movies: ' + error.message);
            if (storedMovies) {
                setMovies(storedMovies);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch movies.',
                    visibilityTime: 5000,
                });
                setIsOffline(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            console.error('Error storing data', e);
        }
    };

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error('Error retrieving data', e);
        }
    };

    const deleteItem = async (itemId) => {
        if (isOffline) {
            Alert.alert("Offline", "Cannot delete movies while offline.");
            return;
        }

        try {
            Alert.alert(
                "Confirm Deletion",
                "Are you sure you want to delete this item?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            try {
                                await axios.delete(`http://192.168.0.150:2305/movie/${itemId}`);
                                appendLog('Item deleted successfully from server');
                                setMovies((prevMovies) => prevMovies.filter((item) => item.id !== itemId));
                                storeData(`@movies_${genre}`, movies);
                                Alert.alert("Success", "Item deleted successfully");
                            } catch (error) {
                                appendLog('Error deleting item:', error);
                                Alert.alert("Error", "Failed to delete item.");
                            }
                        },
                    },
                ],
                { cancelable: false }
            );
        } catch (error) {
            Alert.alert("Error", "Failed to fetch network state.");
            appendLog('Failed to fetch network state');
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff"/>
            ) : isOffline && !movies.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <Button title="Retry" onPress={loadMovies} color="#007AFF"/>
                </View>
            ) : (
                <>
                    <FlatList
                        data={movies}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.itemContainer}>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemDescription}>{item.description}</Text>
                                    <Text style={styles.itemDetail}>Genre: {item.genre}</Text>
                                    <Text style={styles.itemDetail}>Director: {item.director}</Text>
                                    <Text style={styles.itemDetail}>Year: {item.year}</Text>
                                    <TouchableOpacity
                                        style={[styles.deleteButton, isOffline && styles.disabledButton]}
                                        onPress={() => deleteItem(item.id)}
                                        disabled={isOffline}
                                    >
                                        <Text style={[styles.deleteButtonText, isOffline && styles.disabledButtonText]}>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                    <TouchableOpacity
                        style={[styles.addButton, isOffline && styles.disabledButton]}
                        onPress={() => navigation.navigate('AddMovie', {genre})}
                        disabled={isOffline}
                    >
                        <Text style={[styles.addButtonText, isOffline && styles.disabledButtonText]}>Add New Item</Text>
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
        backgroundColor: '#f0f0f0',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignMovies: 'center',
    },
    offlineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignMovies: 'center',
        paddingHorizontal: 20,
    },
    offlineText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
    },
    itemDetail: {
        fontSize: 14,
        marginBottom: 2,
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 16,
        borderRadius: 5,
        alignMovies: 'center',
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
});

export default MoviesListScreen;