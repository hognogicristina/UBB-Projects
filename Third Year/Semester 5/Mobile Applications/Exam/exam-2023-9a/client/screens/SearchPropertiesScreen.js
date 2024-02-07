import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import axios from "axios";

const SearchPropertiesScreen = () => {
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('');
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://192.168.0.150:2309/search`);
            let filteredProperties = response.data;

            if (type) {
                filteredProperties = filteredProperties.filter(property => property.type === type);
            }
            if (price) {
                filteredProperties = filteredProperties.filter(property => property.price <= parseFloat(price));
            }
            if (bedrooms) {
                filteredProperties = filteredProperties.filter(property => property.bedrooms === parseInt(bedrooms, 10));
            }

            filteredProperties.sort((a, b) => {
                const dateDiff = new Date(b.date) - new Date(a.date);
                if (dateDiff !== 0) return dateDiff;
                return a.price - b.price;
            });

            setProperties(filteredProperties);
        } catch (error) {
            console.error('Error fetching properties:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginBottom: 10}}
                    onChangeText={setType}
                    value={type}
                    placeholder="Type"
                    placeholderTextColor="#888"
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginBottom: 10}}
                    onChangeText={setPrice}
                    value={price}
                    placeholder="Price"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                />

                <TextInput
                    style={{height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, marginBottom: 10}}
                    onChangeText={setBedrooms}
                    value={bedrooms}
                    placeholder="Bedrooms"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.button} onPress={handleSearch}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <FlatList
                        data={properties}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.propertyItem}>
                                <Text style={styles.propertyText}>{item.address}</Text>
                            </View>
                        )}
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
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    propertyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    propertyText: {
        fontSize: 16,
        color: '#333',
    }
});

export default SearchPropertiesScreen;