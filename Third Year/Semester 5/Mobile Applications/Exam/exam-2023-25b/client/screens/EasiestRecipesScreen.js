import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Modal,
    Button,
    SafeAreaView,
    Platform,
    StatusBar
} from 'react-native';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import {appendLog} from '../log/Logger';

const EasiestRecipesScreen = () => {
    const [easiestRecipes, setEasiestRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [newDifficulty, setNewDifficulty] = useState('easy');

    useEffect(() => {
        loadEasiestRecipes();
    }, []);

    const loadEasiestRecipes = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://192.168.0.150:2325/easiest');
            const difficultyOrder = {'easy': 1, 'medium': 2, 'hard': 3};
            const sortedRecipes = response.data
                .sort((a, b) => {
                    if (difficultyOrder[a.difficulty] === difficultyOrder[b.difficulty]) {
                        return a.category.localeCompare(b.category);
                    }
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
                })
                .slice(0, 10);

            setEasiestRecipes(sortedRecipes);
            appendLog('Easiest recipes fetched and sorted successfully');
        } catch (error) {
            appendLog('Error fetching easiest recipes: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const changeDifficulty = async () => {
        if (selectedRecipe) {
            try {
                await axios.post('http://192.168.0.150:2325/difficulty', {
                    id: selectedRecipe.id,
                    difficulty: newDifficulty,
                });
                appendLog(`Difficulty of recipe ${selectedRecipe.id} changed to ${newDifficulty}`);
                setModalVisible(false);
                loadEasiestRecipes();
            } catch (error) {
                appendLog('Error changing difficulty: ' + error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <FlatList
                    data={easiestRecipes}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.recipeItem}
                            onPress={() => {
                                setSelectedRecipe(item);
                                setNewDifficulty(item.difficulty);
                                setModalVisible(true);
                            }}
                        >
                            <Text style={styles.title}>{item.name}</Text>
                            <Text>Category: {item.category}</Text>
                            <Text>Difficulty: {item.difficulty}</Text>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            )}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView style={styles.safeArea}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Change Difficulty</Text>
                        <Text style={styles.modalRecipeName}>{selectedRecipe?.name}</Text>
                        <Picker
                            selectedValue={newDifficulty}
                            style={styles.picker}
                            onValueChange={(itemValue) => setNewDifficulty(itemValue)}
                        >
                            <Picker.Item label="Easy" value="easy"/>
                            <Picker.Item label="Medium" value="medium"/>
                            <Picker.Item label="Hard" value="hard"/>
                        </Picker>
                        <Button
                            title="Change Difficulty"
                            onPress={changeDifficulty}
                            color="#007AFF"
                        />
                    </View>
                </SafeAreaView>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    recipeItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f2f2f2',
    },
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    modalRecipeName: {
        fontSize: 18,
        marginBottom: 20,
    },
    picker: {
        width: 200,
        height: 150,
    },
});

export default EasiestRecipesScreen;