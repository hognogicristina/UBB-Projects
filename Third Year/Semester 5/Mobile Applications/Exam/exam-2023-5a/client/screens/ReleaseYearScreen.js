import React, { useState, useEffect } from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import axios from 'axios';
import {appendLog} from "../log/Logger";

const ReleaseYearScreen = () => {
    const [yearData, setYearData] = useState([]);
    const [popularGenres, setPopularGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('http://192.168.0.150:2305/all')
            .then((response) => {
                const movies = response.data;

                const releaseYears = movies.reduce((acc, movie) => {
                    const year = movie.year;
                    if (year) {
                        acc[year] = (acc[year] || 0) + 1; // { 1999: 2 }
                    }
                    return acc;
                }, {});

                const yearDataArray = Object.keys(releaseYears).map((year) => ({
                    year: parseInt(year, 10),
                    movieCount: releaseYears[year],
                }));

                yearDataArray.sort((a, b) => b.movieCount - a.movieCount);

                setYearData(yearDataArray);

                const genreCounts = movies.reduce((acc, movie) => {
                    const genre = movie.genre;
                    if (genre) {
                        acc[genre] = (acc[genre] || 0) + 1;
                    }
                    return acc;
                }, {});

                const genreDataArray = Object.keys(genreCounts).map((genre) => ({
                    genre,
                    movieCount: genreCounts[genre],
                }));

                genreDataArray.sort((a, b) => b.movieCount - a.movieCount);

                setPopularGenres(genreDataArray.slice(0, 3));
                setIsLoading(false);
            })
            .catch((error) => {
                appendLog('Error fetching movie data: ' + error.message);
                setIsLoading(false);
            });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Most popular release years</Text>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={yearData}
                    keyExtractor={(item) => item.year.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.yearItem}>
                            <Text style={styles.yearText}>{item.year}</Text>
                            <Text style={styles.movieCountText}>{item.movieCount}</Text>
                        </View>
                    )}
                />
            )}
            <Text style={styles.heading}>Most popular genres</Text>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={popularGenres}
                    keyExtractor={(item) => item.genre}
                    renderItem={({ item }) => (
                        <View style={styles.genreItem}>
                            <Text style={styles.genreText}>{item.genre}</Text>
                            <Text style={styles.movieCountText}>{item.movieCount}</Text>
                        </View>
                    )}
                />
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
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    yearItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    genreItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    yearText: {
        fontSize: 16,
    },
    genreText: {
        fontSize: 16,
    },
    movieCountText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ReleaseYearScreen;