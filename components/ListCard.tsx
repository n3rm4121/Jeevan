import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

interface ListCardProps {
    avatar: string;
    name: string;
    address: string;
    phone: string;
    bloodType: string;
    distance: string;
    isUrgent?: boolean;
    phoneNumber: string;
}

const HospitalCard: React.FC<ListCardProps> = ({
    avatar,
    name,
    address,
    phone,
    bloodType,
    distance,
    isUrgent,
    phoneNumber
}) => {
    return (
        <View style={styles.cardContainer}>
            {/* Left Section: Avatar and Info */}
            <View style={styles.leftSection}>
                {/* Avatar */}
                <View style={styles.avatarContainer}>
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                    {isUrgent && (
                        <Text style={styles.urgentBadge}>Urgent</Text>
                    )}
                </View>

                {/* Hospital Info */}
                <View>
                    <Text style={styles.hospitalName}>{name}</Text>
                    <View style={styles.infoRow}>
                        <MaterialIcons name="location-on" size={16} color="gray" />
                        <Text style={styles.infoText}>{address}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <FontAwesome name="phone" size={16} color="gray" />
                        <Text style={[styles.infoText, styles.phoneText]}>{phoneNumber}</Text>
                    </View>
                </View>
            </View>

            {/* Right Section: Blood Type and Distance */}
            <View style={styles.rightSection}>
                <TouchableOpacity style={[styles.badge, styles.bloodBadge]}>
                    <Text style={styles.badgeText}>{bloodType}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.badge, styles.distanceBadge]}>
                    <Text style={styles.badgeText}>{distance}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: '#e5e7eb',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 16,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginRight: 16,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    urgentBadge: {
        backgroundColor: '#ef4444',
        color: '#fff',
        fontSize: 12,
        borderRadius: 16,
        paddingHorizontal: 8,
        marginTop: 4,
        alignSelf: 'center',
    },
    hospitalName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    infoText: {
        color: '#6b7280',
        fontSize: 14,
        marginLeft: 4,
    },
    phoneText: {
        marginLeft: 8,
    },
    rightSection: {
        alignItems: 'flex-end',
    },
    badge: {
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 4,
        marginBottom: 8,
    },
    bloodBadge: {
        backgroundColor: '#ef4444',
    },
    distanceBadge: {
        backgroundColor: '#10b981',
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HospitalCard;
