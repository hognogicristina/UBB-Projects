import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const TopEventsByParticipantsScreen = () => {
    const [topEvents, setTopEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTopEventsByParticipants();
    }, []);

    const fetchTopEventsByParticipants = async () => {
        try {
            const response = await axios.get('http://172.30.118.163:2426/allEvents');

            const sortedEvents = response.data.sort((a, b) => {
                if (a.status === b.status) {
                    return b.participants - a.participants;
                } else {
                    return a.status.localeCompare(b.status);
                }
            });

            const top5Events = sortedEvents.slice(0, 5);

            setTopEvents(top5Events);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching top events by participants', error);
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : topEvents.length === 0 ? (
                <Text style={styles.noEventsText}>No top events by participants available.</Text>
            ) : (
                <FlatList
                    data={topEvents}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.eventItem}>
                            <Text style={styles.eventName}>{item.name}</Text>
                            <Text style={styles.eventStatus}>Status: {item.status}</Text>
                            <Text style={styles.eventParticipants}>Participants: {item.participants}</Text>
                        </View>
                    )}
                />
            )}
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
    noEventsText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default TopEventsByParticipantsScreen;