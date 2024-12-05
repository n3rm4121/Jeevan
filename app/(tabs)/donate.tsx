import React from 'react';
import { SafeAreaView } from 'react-native';
import DonationRequestsList from '~/components/DonationRequestList';
import { useDonationRequests } from '~/hooks/useDonationRequests';

const donationRequests = [
    { id: '1', name: 'Real Rana', hospital: 'Bhaktapur Hospital', bloodGroup: 'A+', pint: '1', required_by: 'date', location: { latitude: 27.671, longitude: 85.429 } },
    { id: '2', name: 'Bhu Rana', hospital: 'Bhaktapur Hospital', bloodGroup: 'A+', pint: '2', required_by: 'date', location: { latitude: 28.671, longitude: 86.429 } },
    { id: '3', name: 'Lha Rana', hospital: 'Bhaktapur Hospital', bloodGroup: 'A+', pint: '1', required_by: 'date', location: { latitude: 29.671, longitude: 87.429 } },
    { id: '4', name: 'Lasutohsh Rana', hospital: 'Bhaktapur Hospital', bloodGroup: 'A+', pint: '2', required_by: 'date', location: { latitude: 30.671, longitude: 88.429 } },
];

const Donate: React.FC = () => {
    const { sortedRequests, errorMsg } = useDonationRequests(donationRequests);

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <DonationRequestsList sortedRequests={sortedRequests} errorMsg={errorMsg} />
        </SafeAreaView>
    );
};

export default Donate;
