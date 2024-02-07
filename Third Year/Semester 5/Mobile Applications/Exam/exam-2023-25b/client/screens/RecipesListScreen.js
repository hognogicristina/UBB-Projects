import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import WebSocketClient from "../websocket/WebSocketClient";
import NetInfo from "@react-native-community/netinfo";
import {appendLog} from "../log/Logger";
import { Alert } from 'react-native';

const RecipesListScreen = ({route}) => {
    const navigation = useNavigation();
    const {category} = route.params;
    const [recipes, setRecipes] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        loadRecipes();

        return () => unsubscribe();
    }, [category]);

    const onWebSocketMessage = (message) => {
        try {
            const newRecipe = JSON.parse(message);
            setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
        } catch (error) {
            console.error('Error parsing WebSocket message:', error);
        }
    };

    WebSocketClient(onWebSocketMessage);

    const loadRecipes = async () => {
        setIsLoading(true);
        const storedRecipes = await getData(`@recipes_${category}`);
        if (isOffline) {
            if (storedRecipes) {
                appendLog('Loaded recipes from AsyncStorage');
                setRecipes(storedRecipes);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.150:2325/recipes/${category}`);
            setRecipes(response.data);
            await storeData(`@recipes_${category}`, response.data);
            appendLog('Recipes fetched successfully from server');
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching recipes: ' + error.message);
            if (storedRecipes) {
                setRecipes(storedRecipes);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch recipes.',
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

    const deleteRecipe = async (itemId) => {
        if (isOffline) {
            Alert.alert("Offline", "Cannot delete recipes while offline.");
            return;
        }

        try {
            Alert.alert(
                "Confirm Deletion",
                "Are you sure you want to delete this recipe?",
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Delete",
                        onPress: async () => {
                            try {
                                await axios.delete(`http://192.168.0.150:2325/recipe/${itemId}`);
                                appendLog('Recipe deleted successfully from server');
                                setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== itemId));
                                storeData(`@recipes_${category}`, recipes);
                                Alert.alert("Success", "Recipe deleted successfully");
                            } catch (error) {
                                appendLog('Error deleting recipe:', error);
                                Alert.alert("Error", "Failed to delete recipe.");
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
            ) : isOffline && !recipes.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <Button title="Retry" onPress={loadRecipes} color="#007AFF"/>
                </View>
            ) : (
                <>
                    <FlatList
                        data={recipes}
                        keyExtractor={(recipe) => recipe.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.recipeItem}>
                                <Text style={styles.recipeTitle}>{item.name}</Text>
                                <Text>Description: {item.description}</Text>
                                <Text>Ingredients: {item.ingredients}</Text>
                                <Text>Instructions: {item.instructions}</Text>
                                <Text>Category: {item.category}</Text>
                                <Text>Difficulty: {item.difficulty}</Text>
                                <TouchableOpacity
                                    style={[styles.deleteButton, isOffline && styles.disabledButton]}
                                    onPress={() => deleteRecipe(item.id)}
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
                        onPress={() => navigation.navigate('AddRecipe', {category})}
                        disabled={isOffline}
                    >
                        <Text style={[styles.addButtonText, isOffline && styles.disabledButtonText]}>Add New
                            Recipe</Text>
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
    recipeItem: {
        backgroundColor: '#e6e6e6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    recipeTitle: {
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

export default RecipesListScreen;