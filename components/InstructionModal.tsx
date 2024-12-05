import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

interface BloodDonationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const BloodDonationModal: React.FC<BloodDonationModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeText}>✖</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Blood Instructions</Text>
                    </View>

                    <ScrollView contentContainerStyle={styles.content}>
                        <Text style={styles.sectionTitle}>Before donating blood:</Text>
                        <Text style={styles.instructions}>1. Don’t take aspirin for 2 days before your appointment.</Text>
                        <Text style={styles.instructions}>2. Ask a friend to donate at the same time, you can support each other and do twice as much good.</Text>
                        <Text style={styles.instructions}>3. Download Rakta-dan app to receive reminders and appointments.</Text>

                        <Text style={styles.sectionTitle}>D-day of your donation:</Text>
                        <Text style={styles.instructions}>1. Drink an extra 16 oz or 0.5 litres of water before your appointment.</Text>
                        <Text style={styles.instructions}>2. Eat a healthy meal, avoiding fatty foods like hamburgers, fries, ice-cream, etc.</Text>

                        <Text style={styles.sectionTitle}>After your donation:</Text>
                        <Text style={styles.instructions}>1. Keep the strip bandage on for the next several hours, to avoid a skin rash, clean the area around the bandage.</Text>
                        <Text style={styles.instructions}>2. Don’t do any heavy lifting or vigorous exercise for the rest of the day.</Text>
                        <Text style={styles.instructions}>3. Keep eating iron-rich food.</Text>

                        <Text style={styles.sectionTitle}>Blood type matching:</Text>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>B.T</Text>
                                <Text style={styles.tableHeaderText}>You can give to</Text>
                                <Text style={styles.tableHeaderText}>You can receive from</Text>
                            </View>
                            <View style={styles.tableRow}>
                                <Text style={styles.tableCell}>O-</Text>
                                <Text style={styles.tableCell}>All blood types</Text>
                                <Text style={styles.tableCell}>O-</Text>
                            </View>
                            {/* Add more rows as needed */}
                        </View>
                    </ScrollView>
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
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        height: '80%',
        padding: 15,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    closeText: {
        fontSize: 24,
        color: 'red',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1E3A8A', // blue color
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
    },
    instructions: {
        fontSize: 16,
        marginBottom: 8,
    },
    tableContainer: {
        marginTop: 15,
        borderTopWidth: 1,
        borderColor: '#E5E5E5',
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderColor: '#E5E5E5',
        paddingBottom: 8,
    },
    tableHeaderText: {
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    tableCell: {
        textAlign: 'center',
        flex: 1,
    },
    content: {
        padding: 15,
    },

});

export default BloodDonationModal;
