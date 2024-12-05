import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DonationRequestsList from '~/components/DonationRequestList';
import DonationRequest from '../types/DonationRequest';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/utils/firebaseConfig';
import Loader from '~/components/Loader';
import { useDonationRequests } from '~/hooks/useDonationRequests';

const Donate: React.FC = () => {
    const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortParameter, setSortParameter] = useState<string>('bloodGroup');
    const { finalRequestWithDistance, errorMsg } = useDonationRequests(donationRequests);

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
                console.log(requests);
            } catch (err) {
                console.error('Error fetching donation requests:', err);
                setError('Failed to fetch donation requests.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequests();
    }, []);

    const sortRequests = (requests: typeof finalRequestWithDistance, parameter: string) => {
        return [...requests].sort((a, b) => {
            if (parameter === 'bloodGroup') {
                return a.bloodGroup.localeCompare(b.bloodGroup);
            }
            if (parameter === 'requiredBy') {
                return new Date(a.requiredBy).getTime() - new Date(b.requiredBy).getTime();
            }
            if (parameter === 'distance') {

            }
            return 0;
        });
    };
    const sortedRequests = sortRequests(finalRequestWithDistance, sortParameter);

    return (
        <SafeAreaView style={styles.container}>
            <Picker
                selectedValue={sortParameter}
                onValueChange={(value) => setSortParameter(value)}
                style={styles.picker}
            >
                <Picker.Item label="Sort by Blood Group" value="bloodGroup" />
                <Picker.Item label="Sort by Required By" value="requiredBy" />
                <Picker.Item label="Sort by Distance" value="distance" />
            </Picker>

            {loading ? (
                <Loader message="Fetching donation requests..." />
            ) : (
                <DonationRequestsList
                    sortedRequests={sortedRequests}
                    errorMsg={errorMsg}
                />
            )}
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        marginTop: 50,
        backgroundColor: '#f8f9fa',
    },
    picker: {
        height: 50,
        marginHorizontal: 16,
        backgroundColor: '#e5e7eb',
        borderRadius: 8,
    },
});

export default Donate;
