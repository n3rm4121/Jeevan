import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import DonationRequestsList from '~/components/DonationRequestList';
import { useDonationRequests } from '~/hooks/useDonationRequests';
import DonationRequest from '../types/DonationRequest';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/utils/firebaseConfig';

const Donate: React.FC = () => {
    const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const { sortedRequests, errorMsg } = useDonationRequests(donationRequests);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const fetchRequests = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(db, 'donationRequests'));
                const requests = querySnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        name: data.name,
                        hospital: data.hospital,
                        bloodGroup: data.bloodGroup,
                        pint: data.pint,
                        requiredBy: data.requiredBy,
                        location: {
                            latitude: data.location.latitude,
                            longitude: data.location.longitude,
                        },
                        phoneNumber: data.phoneNumber,
                        patientName: data.patientName,
                    };
                });
                setDonationRequests(requests);
                console.log('Donation requests:', requests);
            } catch (err) {
                console.error('Error fetching donation requests:', err);
                setError('Failed to fetch donation requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-gray-100">
            <DonationRequestsList sortedRequests={sortedRequests} errorMsg={errorMsg} />
        </SafeAreaView>
    );
};

export default Donate;
