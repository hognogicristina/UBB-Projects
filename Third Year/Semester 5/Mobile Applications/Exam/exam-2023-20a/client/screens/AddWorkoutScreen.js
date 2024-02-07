import React, {useState} from 'react';
import {
    Alert,
    Keyboard,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {appendLog} from "../log/Logger";
import Toast from "react-native-toast-message";
import WebSocketClient from "../websocket/WebSocketClient";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddWorkoutScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [duration, setDuration] = useState('');
    const [calories, setCalories] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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

    const handleSubmit = async () => {
        if (!name || !type || !duration || !calories || !notes) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        const workout = { name, type, duration: parseInt(duration), calories: parseInt(calories), date, notes };

        const isConnected = await NetInfo.fetch().then(state => state.isConnected);

        if (isConnected) {
            addWorkoutOnline(workout);
        } else {
            addWorkoutOffline(workout);
        }
    };

    const addWorkoutOnline = async (workout) => {
        setIsLoading(true);
        try {
            await axios.post('http://192.168.0.150:2320/workout', {
                name,
                type,
                duration: parseInt(duration),
                calories: parseInt(calories),
                date,
                notes,
            });
            setIsLoading(false);
            Alert.alert('Success', 'Workout added successfully');
            appendLog('Workout added successfully');
            navigation.navigate('Workouts');
        } catch (error) {
            setIsLoading(false);
            let errorMessage = 'Failed to add workout';
            if (error.response && error.response.data && error.response.data.text) {
                errorMessage = error.response.data.text;
            }
            Alert.alert('Error', errorMessage);
            appendLog(errorMessage);
        }
    };

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

    const addWorkoutOffline = async (workout) => {
        setIsLoading(true);
        try {
            const storedOfflineWorkouts = await getData('@offlineWorkouts') || [];
            const updatedOfflineWorkouts = [...storedOfflineWorkouts, workout];
            await storeData('@offlineWorkouts', updatedOfflineWorkouts);
            Alert.alert('Success', 'Workout added successfully');
            appendLog('Workout added successfully');
            navigation.navigate('Workouts');
        } catch (error) {
            Alert.alert('Error', 'Failed to add workout to offline storage');
        } finally {
            setIsLoading(false);
        }
    };



    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName}/>

                <Text style={styles.label}>Type:</Text>
                <TextInput style={styles.input} value={type} onChangeText={setType}/>

                <Text style={styles.label}>Duration (minutes):</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={duration} onChangeText={setDuration}/>

                <Text style={styles.label}>Calories Burned:</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={calories} onChangeText={setCalories}/>

                <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
                <TextInput style={styles.input} value={date} onChangeText={setDate} editable={false}/>

                <Text style={styles.label}>Notes:</Text>
                <TextInput style={styles.input} value={notes} onChangeText={setNotes} multiline/>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Workout</Text>
                </TouchableOpacity>

                {isLoading && <ActivityIndicator size="large" color="#0000ff"/>}
                <Toast/>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f7',
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        marginBottom: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddWorkoutScreen;