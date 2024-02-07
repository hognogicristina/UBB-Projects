import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileScreen = () => {
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

    return (
        <View style={styles.container}>
            <Text style={styles.header}>User Profile</Text>
            <Text>Name: {name}</Text>
            <Text>Height: {height} cm</Text>
            <Text>Weight: {weight} kg</Text>
            <Text>Primary Workout Type: {workoutType}</Text>
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
});

export default UserProfileScreen;