import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, Linking, Dimensions } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

interface RequestInfoModalProps {
    visible: boolean;
    onClose: () => void;
    avatar: string;
    hospital: string;
    phoneNumber: string;
    bloodType: string;
    distance: string;
    patientName: string;
    requiredBy: Date;
}

const { width } = Dimensions.get('window');

const RequestInfoModal: React.FC<RequestInfoModalProps> = ({
    visible,
    onClose,
    avatar,
    hospital,
    phoneNumber,
    bloodType,
    distance,
    patientName,
    requiredBy
}) => {
    const handleCall = () => {
        Linking.openURL(`tel:${phoneNumber}`);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    {/* Close Button */}
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Feather name="x" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={styles.modalHeader}>
                        <Image source={{ uri: avatar }} style={styles.avatar} />
                        <View style={styles.headerText}>
                            <Text style={styles.patientName}>Patient Name: {patientName}</Text>
                            <Text style={styles.hospitalAddress}>Hospital: {hospital}</Text>
                            <Text style={styles.requiredBy}>
                                Required by: {new Date(requiredBy).toDateString()}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.infoTitle}>Blood Type: {bloodType}</Text>
                    <Text style={styles.infoText}>Distance: {distance}</Text>

                    {/* Call to Action */}
                    <TouchableOpacity onPress={handleCall} style={styles.callButton}>
                        <MaterialIcons name="call" size={20} color="white" />
                        <Text style={styles.callButtonText}>Call for Donation</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: width - 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
        backgroundColor: '#ef4444',
        borderRadius: 50,
    },
    modalHeader: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    headerText: {
        justifyContent: 'center',
    },
    hospitalName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    hospitalAddress: {
        fontSize: 14,
        color: '#6b7280',
    },
    patientName: {
        fontSize: 14,
        color: '#6b7280',
    },
    requiredBy: {
        fontSize: 14,
        color: '#6b7280',
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    infoText: {
        fontSize: 16,
        color: '#6b7280',
        marginBottom: 16,
    },
    callButton: {
        backgroundColor: '#10b981',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    callButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RequestInfoModal;
