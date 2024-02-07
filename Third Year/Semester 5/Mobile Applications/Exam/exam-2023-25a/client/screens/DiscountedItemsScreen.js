import React, {useEffect, useState} from 'react';
import {
    View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button
} from 'react-native';
import axios from 'axios';

const DiscountedItemsScreen = () => {
    const [discountedItems, setDiscountedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchDiscountedItems();
    }, []);

    const fetchDiscountedItems = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://192.168.0.150:2325/discounted');
            setDiscountedItems(response.data.sort((a, b) => a.price - b.price).slice(0, 10));
        } catch (error) {
            console.error('Error fetching discounted items:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updatePrice = async (id, currentPrice) => {
        try {
            await axios.post('http://192.168.0.150:2325/price', {
                id: id,
                price: currentPrice + 1
            });
            const updatedItems = discountedItems.map(item => {
                if (item.id === id) {
                    return {...item, price: currentPrice + 1};
                }
                return item;
            });
            setDiscountedItems(updatedItems);
        } catch (error) {
            console.error('Error updating price:', error);
        }
    };

    const renderItem = ({item}) => (
        <View style={styles.itemContainer}>
            <View style={styles.itemDetail}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>Category: {item.category}</Text>
                <Text style={styles.itemDescription}>Price: ${item.price}</Text>
                <Text style={styles.itemDescription}>Units: {item.units}</Text>
                <Button
                    title="Increment Price"
                    onPress={() => updatePrice(item.id, item.price)}
                />
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <FlatList
                    data={discountedItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDetail: {
        flex: 1,
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    incrementButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
    },
    incrementButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DiscountedItemsScreen;