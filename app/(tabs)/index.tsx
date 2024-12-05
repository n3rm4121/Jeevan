import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from '~/components/Loader';

import { useDonationRequests } from '~/hooks/useDonationRequests';
import { Link } from 'expo-router';
import DonationRequestsList from '~/components/DonationRequestList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/utils/firebaseConfig';

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
}

const Screen: React.FC = () => {
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
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
            required_by: data.required_by,
            location: {
              latitude: data.location.latitude,
              longitude: data.location.longitude,
            },
          };
        });
        setDonationRequests(requests);
      } catch (err) {
        console.error('Error fetching donation requests:', err);
        setError('Failed to fetch donation requests.');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const { sortedRequests, errorMsg } = useDonationRequests(donationRequests);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* Header Card */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Good Morning, Rajesh</Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Save a life</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="search" size={24} color="white" />
            <Text style={styles.buttonText}>Find donors</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Feather name="edit" size={24} color="white" />
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <MaterialIcons name="list" size={24} color="white" />
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>Donation Requests</Text>
          <Link href="/donate" style={styles.viewAllLink}>View all</Link>
        </View>

        {/* Donation Requests List */}
        {loading ? <Loader message="Fetching donation requests..." /> : 
          <DonationRequestsList sortedRequests={sortedRequests} errorMsg={errorMsg} />
        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  header: {
    padding: 16,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 8,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllLink: {
    color: '#ef4444',
  },
});

export default Screen;
