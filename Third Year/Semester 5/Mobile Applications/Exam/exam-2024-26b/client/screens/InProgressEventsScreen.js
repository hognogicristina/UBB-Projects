import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import {appendLog} from "../log/Logger";

const InProgressEventsScreen = () => {
    const [inProgressEvents, setInProgressEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchInProgressEvents();
    }, []);

    const fetchInProgressEvents = async () => {
        try {
            const response = await axios.get('http://172.30.118.163:2426/inProgress');
            setInProgressEvents(response.data);
            setIsLoading(false);
        } catch (error) {
            appendLog('Error fetching in-progress events: ' + error.message);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not fetch in-progress events.',
                visibilityTime: 5000,
            });
            setIsLoading(false);
        }
    };

    const enrollInEvent = async (eventId) => {
        try {
            setIsLoading(true);
            await axios.put(`http://172.30.118.163:2426/enroll/${eventId}`);
            setInProgressEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === eventId
                        ? { ...event, status: 'Enrolled', participants: event.participants + 1 }
                        : event
                )
            );
            Toast.show({
                type: 'success',
                text1: 'Enrollment Successful',
                text2: 'You have successfully enrolled in the event.',
                visibilityTime: 5000,
            });
        } catch (error) {
            appendLog('Error enrolling in the event: ' + error.message);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not enroll in the event.',
                visibilityTime: 5000,
            });
            setIsLoading(false)
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={inProgressEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <Text style={styles.eventName}>{item.name}</Text>
                            <Text style={styles.eventStatus}>Status: {item.status}</Text>
                            <Text style={styles.eventParticipants}>
                                Participants: {item.participants}
                            </Text>
                            {item.status !== 'Enrolled' && (
                                <TouchableOpacity
                                    style={styles.enrollButton}
                                    onPress={() => enrollInEvent(item.id)}
                                >
                                    <Text style={styles.enrollButtonText}>Enroll</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                />
            )}
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    eventItem: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
    },
    eventStatus: {
        fontSize: 16,
        color: '#555555',
    },
    eventParticipants: {
        fontSize: 16,
        color: '#555555',
    },
    enrollButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    enrollButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default InProgressEventsScreen;