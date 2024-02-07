import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import {appendLog} from "../log/Logger";

const EventDetailsScreen = ({ route }) => {
    const [event, setEvent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const eventId = route.params.id;

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsOffline(!state.isConnected);
        });

        fetchEventDetails();

        return () => unsubscribe();
    }, [eventId]);

    const fetchEventDetails = async () => {
        setIsLoading(true);
        try {
            const storedDetails = await AsyncStorage.getItem(`event_${eventId}`);
            if (storedDetails !== null) {
                setEvent(JSON.parse(storedDetails));
            } else if (!isOffline) {
                const response = await axios.get(`http://172.30.118.163:2426/event/${eventId}`);
                setEvent(response.data);
                await AsyncStorage.setItem(`event_${eventId}`, JSON.stringify(response.data));
            }
        } catch (error) {
            appendLog('Error fetching event details');
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not fetch event details.',
                visibilityTime: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : isOffline && !event ? (
                    <View style={styles.offlineContainer}>
                        <Text style={styles.offlineText}>You are offline</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={fetchEventDetails}>
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : event && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.titleText}>Event Details</Text>
                        <Text style={styles.detailText}>Id: {event.id}</Text>
                        <Text style={styles.detailText}>Name: {event.name}</Text>
                        <Text style={styles.detailText}>Team: {event.team}</Text>
                        <Text style={styles.detailText}>Details: {event.details}</Text>
                        <Text style={styles.detailText}>Status: {event.status}</Text>
                        <Text style={styles.detailText}>Participants: {event.participants}</Text>
                        <Text style={styles.detailText}>Type: {event.type}</Text>
                    </View>
                )}
            </ScrollView>
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
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
        color: '#ff5722',
        fontWeight: 'bold',
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
        fontWeight: 'bold',
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333333',
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
        color: '#555555',
    },
});

export default EventDetailsScreen;