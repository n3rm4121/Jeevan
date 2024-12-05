import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

interface DonationRequest {
    id: string;
    name: string;
    hospital: string;
    bloodGroup: string;
    pint: string;
    required_by: string;
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

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <FlatList
                data={sortedRequests}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className="p-4 bg-white shadow my-2 mx-4 rounded-lg">
                        <Text className="font-bold">{item.name}</Text>
                        <Text>{item.hospital}</Text>
                        <Text>{item.bloodGroup}</Text>
                        <Text>{item.distance?.toFixed(2)} km away</Text>
                    </View>
                )}

            />
        </SafeAreaView>
    );
};

export default DonationRequestsList;
