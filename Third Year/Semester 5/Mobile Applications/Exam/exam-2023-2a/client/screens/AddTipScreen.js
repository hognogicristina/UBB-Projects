import React, {useState} from 'react';
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
import {useNavigation} from "@react-navigation/native";
import {Picker} from '@react-native-picker/picker';

const AddTipScreen = ({route}) => {
    const navigation = useNavigation();
    const categorySelected = route.params.category;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [materials, setMaterials] = useState('');
    const [steps, setSteps] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !description || !materials || !steps || !difficulty) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setIsLoading(true);
            await axios.post('http://192.168.0.150:2302/tip', {
                name,
                description,
                materials,
                steps,
                category: categorySelected,
                difficulty,
            });
            setIsLoading(false);
            Alert.alert('Success', 'Tip added successfully');
            setName('');
            setDescription('');
            setMaterials('');
            setSteps('');
            setDifficulty('');
            navigation.navigate('TipsList', {category: categorySelected});
        } catch (error) {
            setIsLoading(false);
            console.error('Error adding tip:', error);
            Alert.alert('Error', 'Failed to add tip');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />

                <Text style={styles.label}>Description:</Text>
                <TextInput style={styles.input} value={description} onChangeText={setDescription} />

                <Text style={styles.label}>Materials:</Text>
                <TextInput style={styles.input} value={materials} onChangeText={setMaterials} />

                <Text style={styles.label}>Steps:</Text>
                <TextInput style={styles.input} value={steps} onChangeText={setSteps} />

                <Text style={styles.label}>Category:</Text>
                <TextInput style={styles.input} value={categorySelected} editable={false}/>

                <Text style={styles.label}>Difficulty:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={difficulty}
                        onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Easy" value="easy" />
                        <Picker.Item label="Medium" value="medium" />
                        <Picker.Item label="Hard" value="hard" />
                    </Picker>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Tip</Text>
                </TouchableOpacity>

                {isLoading && (
                    <ActivityIndicator
                        style={styles.loadingIndicator}
                        size="large"
                        color="#0000ff"
                    />
                )}
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

export default AddTipScreen;