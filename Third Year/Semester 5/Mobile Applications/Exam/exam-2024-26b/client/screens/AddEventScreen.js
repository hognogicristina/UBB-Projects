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
import {Picker} from '@react-native-picker/picker';

const AddEventScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [details, setDetails] = useState('');
    const [status, setStatus] = useState('planning');
    const [participants, setParticipants] = useState('');
    const [type, setType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !team || !details || !participants || !type) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setIsLoading(true);
            await axios.post('http://172.30.118.163:2426/event', {
                name,
                team,
                details,
                status,
                participants,
                type,
            });
            setIsLoading(false);
            Alert.alert('Success', 'Event added successfully');
            appendLog('Event added successfully');
            navigation.navigate('Events');
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', 'Failed to add event');
            appendLog('Failed to add event');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName}/>

                <Text style={styles.label}>Team:</Text>
                <TextInput style={styles.input} value={team} onChangeText={setTeam}/>

                <Text style={styles.label}>Details:</Text>
                <TextInput style={styles.input} value={details} onChangeText={setDetails} multiline/>

                <Text style={styles.label}>Status:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={status}
                        onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Planning" value="planning" />
                        <Picker.Item label="In Progress" value="in progress" />
                        <Picker.Item label="On Hold" value="on hold" />
                        <Picker.Item label="Completed" value="completed" />
                    </Picker>
                </View>

                <Text style={styles.label}>Participants:</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={participants} onChangeText={setParticipants}/>

                <Text style={styles.label}>Type:</Text>
                <TextInput style={styles.input} value={type} onChangeText={setType}/>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Event</Text>
                </TouchableOpacity>

                {isLoading && <ActivityIndicator size="large" color="#0000ff"/>}
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
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
    },
    picker: {
        paddingHorizontal: 15,
        paddingVertical: 1,
    },
});

export default AddEventScreen;