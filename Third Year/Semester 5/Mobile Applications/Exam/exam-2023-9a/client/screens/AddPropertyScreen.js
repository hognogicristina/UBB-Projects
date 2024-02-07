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

const AddPropertyScreen = () => {
    const navigation = useNavigation();
    const [address, setAddress] = useState('');
    const [type, setType] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [bathrooms, setBathrooms] = useState('');
    const [price, setPrice] = useState('');
    const [area, setArea] = useState('');
    const [notes, setNotes] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!address || !type || !bedrooms || !bathrooms || !price || !area) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setIsLoading(true);
            const today = new Date();
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            await axios.post('http://192.168.0.150:2309/property', {
                address,
                type,
                bedrooms,
                bathrooms,
                price,
                area,
                notes,
                date,
            });
            setIsLoading(false);
            Alert.alert('Success', 'Property added successfully');
            appendLog('Property added successfully');
            navigation.navigate('Properties');
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Error', 'Failed to add property');
            appendLog('Failed to add property');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Address:</Text>
                <TextInput style={styles.input} value={address} onChangeText={setAddress}/>

                <Text style={styles.label}>Type:</Text>
                <TextInput style={styles.input} value={type} onChangeText={setType}/>

                <Text style={styles.label}>Bedrooms:</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={bedrooms} onChangeText={setBedrooms}/>

                <Text style={styles.label}>Bathrooms:</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={bathrooms} onChangeText={setBathrooms}/>

                <Text style={styles.label}>Price:</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={price} onChangeText={setPrice}/>

                <Text style={styles.label}>Area (sqft):</Text>
                <TextInput style={styles.input} keyboardType="numeric" value={area} onChangeText={setArea}/>

                <Text style={styles.label}>Notes:</Text>
                <TextInput style={styles.input} value={notes} onChangeText={setNotes} multiline/>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Property</Text>
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
});

export default AddPropertyScreen;