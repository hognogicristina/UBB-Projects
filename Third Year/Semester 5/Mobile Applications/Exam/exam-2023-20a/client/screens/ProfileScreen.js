import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {appendLog} from "../log/Logger";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [workoutType, setWorkoutType] = useState('');

    useEffect(() => {
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        try {
            const storedProfile = await AsyncStorage.getItem('@user_profile');
            if (storedProfile) {
                const userProfile = JSON.parse(storedProfile);
                setName(userProfile.name);
                setHeight(userProfile.height.toString());
                setWeight(userProfile.weight.toString());
                setWorkoutType(userProfile.workoutType);
            }
        } catch (error) {
            console.error('Error loading user profile:', error);
        }
    };

    const saveProfile = async () => {
        try {
            const heightValue = parseFloat(height);
            const weightValue = parseFloat(weight);

            if (isNaN(heightValue) || isNaN(weightValue)) {
                alert('Please enter valid numeric values for height and weight.');
                return;
            }

            const userProfile = {
                name: name,
                height: heightValue,
                weight: weightValue,
                workoutType: workoutType,
            };
            await AsyncStorage.setItem('@user_profile', JSON.stringify(userProfile));
            alert('Profile saved successfully!');
        } catch (error) {
            appendLog('Error saving user profile:' + error.message);
            alert('Failed to save profile. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Profile Section</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
                style={styles.input}
            />
            <TextInput
                placeholder="Height"
                value={height}
                onChangeText={(text) => setHeight(text)}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Weight"
                value={weight}
                onChangeText={(text) => setWeight(text)}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Primary Workout Type"
                value={workoutType}
                onChangeText={(text) => setWorkoutType(text)}
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={saveProfile}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserProfile')}>
                <Text style={styles.buttonText}>Open Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f7',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;