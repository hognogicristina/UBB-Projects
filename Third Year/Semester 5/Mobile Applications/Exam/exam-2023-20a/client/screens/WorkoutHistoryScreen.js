import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Modal, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Calendar} from 'react-native-calendars';
import axios from 'axios';
import Toast from "react-native-toast-message";
import WebSocketClient from "../websocket/WebSocketClient";

const WorkoutHistoryScreen = () => {
    const navigation = useNavigation();
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [filteredWorkouts, setFilteredWorkouts] = useState([]);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
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

    useEffect(() => {
        const fetchWorkouts = async () => {
            setIsLoading(true);
            axios.get('http://192.168.0.150:2320/all')
                .then((response) => {
                    setWorkouts(response.data);
                    filterWorkouts();
                })
                .catch((error) => {
                    console.error('Error fetching workouts:', error);
                })
                .finally(() => {
                        setIsLoading(false);
                    }
                );
        };

        fetchWorkouts();
    }, []);

    const handleDateChange = (date, field) => {
        if (field === 'start') {
            setSelectedStartDate(date);
        } else if (field === 'end') {
            setSelectedEndDate(date);
        }
    };

    const filterWorkouts = () => {
        if (selectedStartDate && selectedEndDate) {
            const filtered = workouts.filter((workout) => {
                const workoutDate = new Date(workout.date);
                return workoutDate >= new Date(selectedStartDate) && workoutDate <= new Date(selectedEndDate);
            });
            setFilteredWorkouts(filtered);
        }
    };


    const toggleStartDatePicker = () => {
        setShowStartDatePicker(!showStartDatePicker);
    };

    const toggleEndDatePicker = () => {
        setShowEndDatePicker(!showEndDatePicker);
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>
                    <Text style={styles.header}>Workout History</Text>
                    <View style={styles.datePickerContainer}>
                        <TouchableOpacity style={styles.datePickerButton} onPress={toggleStartDatePicker}>
                            <Text style={styles.datePickerButtonText}>Start Date</Text>
                            <Text>{selectedStartDate ? selectedStartDate : 'Select Start Date'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.datePickerButton} onPress={toggleEndDatePicker}>
                            <Text style={styles.datePickerButtonText}>End Date</Text>
                            <Text>{selectedEndDate ? selectedEndDate : 'Select End Date'}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.filterButton} onPress={filterWorkouts}>
                        <Text style={styles.filterButtonText}>Filter</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showStartDatePicker}
                        onRequestClose={toggleStartDatePicker}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.calendar}>
                                <Calendar
                                    onDayPress={(day) => handleDateChange(day.dateString, 'start')}
                                    markedDates={selectedStartDate ? {[selectedStartDate]: {selected: true}} : {}}
                                />
                                <TouchableOpacity style={styles.filterButton} onPress={toggleStartDatePicker}>
                                    <Text style={styles.filterButtonText}>Select</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showEndDatePicker}
                        onRequestClose={toggleEndDatePicker}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.calendar}>
                                <Calendar
                                    onDayPress={(day) => handleDateChange(day.dateString, 'end')}
                                    markedDates={selectedEndDate ? {[selectedEndDate]: {selected: true}} : {}}
                                />
                                <TouchableOpacity style={styles.filterButton} onPress={toggleEndDatePicker}>
                                    <Text style={styles.filterButtonText}>Select</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View>
                        {filteredWorkouts.map((workout, index) => (
                            <View style={styles.workoutItem} key={index}>
                                <Text style={styles.workoutText}>Name: {workout.name}</Text>
                                <Text style={styles.workoutText}>Type: {workout.type}</Text>
                                <Text style={styles.workoutText}>Duration: {workout.duration}</Text>
                                <Text style={styles.workoutText}>Date: {workout.date}</Text>
                            </View>
                        ))}
                    </View>
                </>
            )}
            <Toast/>
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
        marginBottom: 10,
    },
    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    datePickerButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        alignItems: 'center',
    },
    datePickerButtonText: {
        fontWeight: 'bold',
    },
    filterButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    filterButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    workoutItem: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    workoutText: {
        fontSize: 16,
        color: '#333333',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    calendar: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
    },
});

export default WorkoutHistoryScreen;