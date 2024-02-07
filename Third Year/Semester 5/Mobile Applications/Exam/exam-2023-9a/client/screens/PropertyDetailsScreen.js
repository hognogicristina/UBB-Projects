import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {appendLog} from "../log/Logger";
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-toast-message";

const PropertyDetailsScreen = ({route}) => {
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);
    const propertyId = route.params.id;

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
            if (state.isConnected) {
                fetchPropertyDetails();
            }
        });

        fetchPropertyDetails();

        return () => unsubscribe();
    }, [propertyId]);

    const fetchPropertyDetails = async () => {
        setIsLoading(true);
        try {
            const storedDetails = await AsyncStorage.getItem(`property_${propertyId}`);
            if (storedDetails !== null) {
                setProperty(JSON.parse(storedDetails));
            } else if (!isOffline) {
                const response = await axios.get(`http://192.168.0.150:2309/property/${propertyId}`);
                setProperty(response.data);
                await AsyncStorage.setItem(`property_${propertyId}`, JSON.stringify(response.data));
            }
        } catch (error) {
            appendLog('Error fetching property details', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not fetch property details.',
                visibilityTime: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : isOffline && !property ? (
                    <View style={styles.offlineContainer}>
                        <Text style={styles.offlineText}>You are offline</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={fetchPropertyDetails}>
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : property && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailText}>Address: {property.address}</Text>
                        <Text style={styles.detailText}>Type: {property.type}</Text>
                        <Text style={styles.detailText}>Bedrooms: {property.bedrooms}</Text>
                        <Text style={styles.detailText}>Bathrooms: {property.bathrooms}</Text>
                        <Text style={styles.detailText}>Price: ${property.price}</Text>
                        <Text style={styles.detailText}>Area: {property.area} sqft</Text>
                        <Text style={styles.detailText}>Notes: {property.notes}</Text>
                    </View>
                )}
            </ScrollView>
            <Toast/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    offlineContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    offlineText: {
        fontSize: 18,
        marginBottom: 10,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    detailsContainer: {
        padding: 20,
    },
    detailText: {
        fontSize: 16,
        marginBottom: 10,
    },
});

export default PropertyDetailsScreen;