import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View,} from 'react-native';
import axios from 'axios';
import {appendLog} from "../log/Logger";

const WeeklyTotalScreen = () => {
    const [weeklyTotals, setWeeklyTotals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://192.168.0.150:2307/entries')
            .then(response => {
                const entries = response.data;
                const weeklyTotalMap = new Map();

                entries.forEach(entry => {
                    const entryDate = new Date(entry.date);
                    const weekNumber = getWeekNumber(entryDate);

                    if (weeklyTotalMap.has(weekNumber)) {
                        weeklyTotalMap.set(weekNumber, weeklyTotalMap.get(weekNumber) + entry.amount);
                    } else {
                        weeklyTotalMap.set(weekNumber, entry.amount);
                    }
                });

                const sortedWeeklyTotals = Array.from(weeklyTotalMap).map(([week, amount]) => ({
                    week: week,
                    amount: amount,
                }));

                sortedWeeklyTotals.sort((a, b) => b.amount - a.amount);

                setWeeklyTotals(sortedWeeklyTotals);
                setIsLoading(false);
            })
            .catch(error => {
                appendLog('Error fetching data:' + error.message);
                setIsLoading(false);
            });
    }, []);

    const getWeekNumber = (date) => {
        const startDate = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + 1) / 7);
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>
                    <Text style={styles.title}>Weekly Totals</Text>
                    <FlatList
                        data={weeklyTotals}
                        keyExtractor={(item) => item.week.toString()}
                        renderItem={({item}) => (
                            <View style={styles.item}>
                                <Text>Week {item.week}</Text>
                                <Text>Total Amount: ${item.amount.toFixed(2)}</Text>
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

export default WeeklyTotalScreen;