import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

const AddTransactionScreen = ({ route }) => {
    const navigation = useNavigation();
    const dateSelected = route.params.date;
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!category || !type || !amount || !description) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setIsLoading(true);
            await axios.post('http://192.168.0.150:2307/transaction', {
                date: dateSelected,
                type,
                amount: parseFloat(amount),
                category,
                description
            });
            setIsLoading(false);
            Alert.alert('Success', 'Transaction added successfully');
            setCategory('');
            setType('');
            setAmount('');
            setDescription('');
            navigation.navigate('TransactionsList', { date: dateSelected });
        } catch (error) {
            setIsLoading(false);
            console.error('Error adding transaction:', error);
            Alert.alert('Error', 'Failed to add transaction');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Date (YYYY-MM-DD):</Text>
                <TextInput style={styles.input} value={dateSelected} editable={false} />

                <Text style={styles.label}>Type:</Text>
                <TextInput style={styles.input} value={type} onChangeText={setType} />

                <Text style={styles.label}>Amount:</Text>
                <TextInput style={styles.input} keyboardType='numeric' value={amount} onChangeText={setAmount} />

                <Text style={styles.label}>Category:</Text>
                <TextInput style={styles.input} value={category} onChangeText={setCategory} />

                <Text style={styles.label}>Description:</Text>
                <TextInput style={styles.input} value={description} onChangeText={setDescription} />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Transaction</Text>
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
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddTransactionScreen;