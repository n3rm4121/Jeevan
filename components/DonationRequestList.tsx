import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';
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
        return <Text className="text-red-500 mx-4">{errorMsg}</Text>;
    }

    if (!sortedRequests.length) {
        return <Text className="mx-4 mt-4">No donation requests available.</Text>;
    }
    // console.log(sortedRequests)
    return (
        <SafeAreaView className="flex-1 bg-gray-100">
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

export default DonationRequestsList;
