import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { FontAwesome, Entypo, Feather } from '@expo/vector-icons';

const ProfilePage = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [availableToDonate, setAvailableToDonate] = useState(true);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <FontAwesome name="user-circle" size={80} color="#ffff" style={styles.avatar} />
                <Text style={styles.name}>Rajesh</Text>
                <Text style={styles.phone}>+977-9812345678</Text>
            </View>

            <View style={styles.donationStatusContainer}>
                <View style={styles.donationGroup}>
                    <View style={styles.donationItem}>
                        <FontAwesome name="heart" size={24} color="#ff5050" />
                        <Text style={styles.donationCount}>2 lives saved</Text>
                    </View>
                </View>

                <View style={styles.donationGroup}>
                    <View style={styles.donationItem}>
                        <FontAwesome name="eyedropper" size={24} color="#ff5050" />
                        <Text style={styles.donationCount}>AB+ Group</Text>
                    </View>
                </View>

                <View style={styles.donationGroup}>
                    <View style={styles.donationItem}>
                        <Feather name="calendar" size={24} color="#ff5050" />
                        <Text style={styles.donationCount}>Next Donation</Text>
                    </View>
                </View>
            </View>


            <View style={styles.settings}>
                <View style={styles.settingsRow}>
                    <Text style={styles.settingsLabel}>Available to donate</Text>
                    <Switch
                        value={availableToDonate}
                        onValueChange={setAvailableToDonate}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={availableToDonate ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>

                <View style={styles.settingsRow}>
                    <Text style={styles.settingsLabel}>Notification</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>
            </View>

            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 30,
        alignItems: 'center',
    },
    header: {
        width: '100%',
        backgroundColor: '#f44336',
        alignItems: 'center',
        paddingVertical: 20,
        marginBottom: 20,
    },
    avatar: {
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    phone: {
        fontSize: 16,
        color: '#fff',
    },
    donationStatusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 20,
        borderRadius: 10,         
        paddingVertical: 10,      
        backgroundColor: '#f9f9f9',
        
      },
      donationGroup: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
    donationStatus: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 20,
    },
    donationItem: {
        alignItems: 'center',
        marginHorizontal: 15,
    },
    donationCount: {
        fontSize: 16,
        marginTop: 5,
        textAlign: 'center',
    },
    settings: {
        width: '80%',
        marginBottom: 20,
    },
    settingsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    settingsLabel: {
        fontSize: 16,
    },
    logoutButton: {
        backgroundColor: '#ff5050',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProfilePage;
