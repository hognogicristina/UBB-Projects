import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {appendLog} from "../log/Logger";

const TopCategoriesScreen = () => {
    const [topCategories, setTopCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://192.168.0.150:2307/entries')
            .then(response => {
                const entries = response.data;

                const categoryMap = new Map();

                entries.forEach(entry => {
                    const category = entry.category;

                    if (categoryMap.has(category)) {
                        categoryMap.set(category, categoryMap.get(category) + 1);
                    } else {
                        categoryMap.set(category, 1);
                    }
                });

                const sortedCategories = Array.from(categoryMap).map(([category, count]) => ({
                    category: category,
                    count: count,
                }));

                sortedCategories.sort((a, b) => b.count - a.count);

                const top3Categories = sortedCategories.slice(0, 3);

                setTopCategories(top3Categories);
                setIsLoading(false);
            })
            .catch(error => {
                appendLog('Error fetching data:' + error.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>
                    <Text style={styles.title}>Top Categories</Text>
                    <FlatList
                        data={topCategories}
                        keyExtractor={(item) => item.category}
                        renderItem={({item}) => (
                            <View style={styles.item}>
                                <Text>Category: {item.category}</Text>
                                <Text>Number of Transactions: {item.count}</Text>
                            </View>
                        )}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 4,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});

export default TopCategoriesScreen;