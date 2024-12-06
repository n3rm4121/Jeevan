import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import RequestInfoModal from './RequestInfoModal';  // Import the modal

interface ListCardProps {
    avatar: string;
    name: string;
    hospital: string;
    phone: string;
    bloodType: string;
    distance: string;
    isUrgent?: boolean;
    phoneNumber: string;
    patientName: string;
    requiredBy: Date;
}

const HospitalCard: React.FC<ListCardProps> = ({
    avatar,
    name,
    hospital,
    phone,
    bloodType,
    distance,
    isUrgent,
    phoneNumber,
    patientName,
    requiredBy,
}) => {
    const [isModalVisible, setModalVisible] = useState(false);

    const handleCardPress = () => {
        setModalVisible(true);  // Open the modal when the card is pressed
    };

    const handleCloseModal = () => {
        setModalVisible(false);  // Close the modal
    };

    return (
        <View>
            <TouchableOpacity onPress={handleCardPress}>
                <View style={styles.cardContainer}>
                    {/* Left Section: Avatar and Info */}
                    <View style={styles.leftSection}>
                        {/* Avatar */}
                        <View style={styles.avatarContainer}>
                            <Image source={{ uri: avatar }} style={styles.avatar} />
                            {isUrgent && <Text style={styles.urgentBadge}>Urgent</Text>}
                        </View>

                        {/* Hospital Info */}
                        <View>
                            <Text style={styles.hospitalName}>{patientName}</Text>
                            <View style={styles.infoRow}>
                                <MaterialIcons name="location-on" size={16} color="gray" />
                                <Text style={styles.infoText}>{hospital}</Text>
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
            </TouchableOpacity>

            {/* Request Info Modal */}
            <RequestInfoModal
                visible={isModalVisible}
                onClose={handleCloseModal}
                avatar={avatar}
                hospital={hospital}
                phoneNumber={phoneNumber}
                bloodType={bloodType}
                distance={distance}
                patientName={patientName}
                requiredBy={requiredBy}
            />
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
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#f87171',
        padding: 4,
        borderRadius: 4,
        fontSize: 10,
        color: '#fff',
    },
    hospitalName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 14,
        color: '#6b7280',
        marginLeft: 4,
    },
    phoneText: {
        fontWeight: 'bold',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    badge: {
        padding: 8,
        borderRadius: 12,
        marginLeft: 8,
    },
    bloodBadge: {
        backgroundColor: '#10b981',
    },
    distanceBadge: {
        backgroundColor: '#fbbf24',
    },
    badgeText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default HospitalCard;
