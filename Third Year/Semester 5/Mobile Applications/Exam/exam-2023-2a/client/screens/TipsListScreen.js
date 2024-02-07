import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import WebSocketClient from "../websocket/WebSocketClient";
import NetInfo from "@react-native-community/netinfo";
import {appendLog} from "../log/Logger";

const TipsListScreen = ({route}) => {
    const navigation = useNavigation();
    const {category} = route.params;
    const [tips, setTips] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        loadTips();

        return () => unsubscribe();
    }, [category]);

    const onWebSocketMessage = (message) => {
        try {
            const newTip = JSON.parse(message);
            setTips((prevTips) => [...prevTips, newTip]);
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    WebSocketClient(onWebSocketMessage);

    const loadTips = async () => {
        setIsLoading(true);
        const storedTips = await getData(`@tips_${category}`);
        if (isOffline) {
            if (storedTips) {
                appendLog('Loaded tips from AsyncStorage');
                setTips(storedTips);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.150:2302/tips/${category}`);
            setTips(response.data);
            await storeData(`@tips_${category}`, response.data);
            appendLog('Tips fetched successfully from server');
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching tips: ' + error.message);
            if (storedTips) {
                setTips(storedTips);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch tips.',
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
            appendLog('Storing data in AsyncStorage');
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            appendLog('Error storing data', e);
        }
    };

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            appendLog('Retrieved data from AsyncStorage');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            appendLog('Error retrieving data', e);
        }
    };

    const deleteTip = async (itemId) => {
        if (isOffline) {
            Toast.show({
                type: 'error',
                text1: 'Offline',
                text2: 'Cannot delete tips while offline.',
                visibilityTime: 5000,
            });
            return;
        }

        try {
            await axios.delete(`http://192.168.0.150:2302/tip/${itemId}`);
            appendLog('Tip deleted successfully from server');
            appendLog(`Deleted tip with ID ${itemId}`);

            setTips((prevTips) => prevTips.filter((tip) => tip.id !== itemId));
            storeData(`@tips_${category}`, tips);
        } catch (error) {
            appendLog('Error deleting tip:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete tip.',
                visibilityTime: 5000,
            });
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff"/>
            ) : isOffline && !tips.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <Button title="Retry" onPress={loadTips} color="#007AFF"/>
                </View>
            ) : (
                <>
                    <FlatList
                        data={tips}
                        keyExtractor={(tip) => tip.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.tipItem}>
                                <Text style={styles.tipTitle}>{item.name}</Text>
                                <Text>Description: {item.description}</Text>
                                <Text>Materials: {item.materials}</Text>
                                <Text>Steps: {item.steps}</Text>
                                <Text>Category: {item.category}</Text>
                                <Text>Difficulty: {item.difficulty}</Text>
                                <TouchableOpacity
                                    style={[styles.deleteButton, isOffline && styles.disabledButton]}
                                    onPress={() => deleteTip(item.id)}
                                    disabled={isOffline}
                                >
                                    <Text
                                        style={[styles.deleteButtonText, isOffline && styles.disabledButtonText]}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />

                    <TouchableOpacity
                        style={[styles.addButton, isOffline && styles.disabledButton]}
                        onPress={() => navigation.navigate('AddTip', {category})}
                        disabled={isOffline}
                    >
                        <Text style={[styles.addButtonText, isOffline && styles.disabledButtonText]}>Add New
                            Tip</Text>
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
        backgroundColor: '#fff',
        padding: 16,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offlineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    offlineText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    tipItem: {
        backgroundColor: '#e6e6e6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    tipTitle: {
        fontSize: 20,
        fontWeight: 'bold',
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
});

export default TipsListScreen;