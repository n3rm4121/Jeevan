import React from 'react';
import { Text, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import HospitalCard from './ListCard';

interface DonationRequest {
    id: string;
    name: string;
    hospital: string;
    bloodGroup: string;
    pint: string;
    required_by: Date;
    location: {
        latitude: number;
        longitude: number;
    };
    isUrgent?: boolean;
    distance?: number;
}

interface DonationRequestsListProps {
    sortedRequests: DonationRequest[];
    errorMsg: string | null;
}

const DonationRequestsList: React.FC<DonationRequestsListProps> = ({ sortedRequests, errorMsg }) => {
    if (errorMsg) {
        return <Text style={styles.errorText}>{errorMsg}</Text>;
    }

    if (!sortedRequests.length) {
        return <Text style={styles.noRequestsText}>No donation requests available.</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={sortedRequests}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <HospitalCard
                        avatar="https://i.pravatar.cc/300"
                        name={item.name}
                        address={item.hospital}
                        phone={`Required by: ${item.required_by}`}
                        bloodType={item.bloodGroup}
                        distance={`${item.distance?.toFixed(2)} km`}
                        isUrgent={item?.isUrgent || false}
                    />
                )}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f4f6',
    },
    errorText: {
        color: '#ef4444',
        marginHorizontal: 16,
    },
    noRequestsText: {
        marginHorizontal: 16,
        marginTop: 16,
    },
});

export default DonationRequestsList;
