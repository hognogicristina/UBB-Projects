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

const AddItemScreen = ({ route }) => {
    const navigation = useNavigation();
    const categorySelected = route.params.category;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [units, setUnits] = useState('');
    const [price, setPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !description || !image || !units || !price) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setIsLoading(true);
            await axios.post('http://192.168.0.150:2325/item', {
                name,
                description,
                image,
                category: categorySelected,
                units: parseInt(units, 10),
                price: parseFloat(price)
            });
            setIsLoading(false);
            Alert.alert('Success', 'Item added successfully');
            setName('');
            setDescription('');
            setImage('');
            setUnits('');
            setPrice('');
            navigation.navigate('ItemsList', { category: categorySelected });
        } catch (error) {
            setIsLoading(false);
            console.error('Error adding item:', error);
            Alert.alert('Error', 'Failed to add item');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />

                <Text style={styles.label}>Description:</Text>
                <TextInput style={styles.input} value={description} onChangeText={setDescription} />

                <Text style={styles.label}>Image Name:</Text>
                <TextInput style={styles.input} value={image} onChangeText={setImage} />

                <Text style={styles.label}>Category:</Text>
                <TextInput style={styles.input} value={categorySelected} editable={false} />

                <Text style={styles.label}>Units:</Text>
                <TextInput style={styles.input} keyboardType='numeric' value={units} onChangeText={setUnits} />

                <Text style={styles.label}>Price:</Text>
                <TextInput style={styles.input} keyboardType='numeric' value={price} onChangeText={setPrice} />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Item</Text>
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
    loadingIndicator: {
        marginTop: 10,
    },
});

export default AddItemScreen;
