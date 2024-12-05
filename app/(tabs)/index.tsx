import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Modal, Image, Dimensions } from 'react-native';
import { MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from '~/components/Loader';
import { useDonationRequests } from '~/hooks/useDonationRequests';
import { Link } from 'expo-router';
import DonationRequestsList from '~/components/DonationRequestList';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/utils/firebaseConfig';
import DonationRequest from '~/app/types/DonationRequest';
import BloodDonationModal from '~/components/InstructionModal';
import NeedFormModal from '~/components/NeedFormModal';
import Carousel from 'react-native-reanimated-carousel';
import { Campaigns } from './campaigns';

const Screen: React.FC = () => {
  const [donationRequests, setDonationRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalInstruction, setModalInstruction] = useState(false);


  // Carousel data for campaigns
  const test = [
    {
      id: 1,
      title: "Save Lives with Your Blood",
      description: "Join our blood donation campaign to help save lives.",
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtiQZu_Z4sqPZRDv2cbmE_OZSkyKhN6hz-CQ&s'
    },
    {
      id: 2,
      title: "Donate Blood, Save a Family",
      description: "Your blood can be the difference for a family in need.",
      image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
    },
    {
      id: 3,
      title: "Be a Hero, Donate Today",
      description: "Every drop counts. Become a hero in your community.",
      image: 'https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/1015f/MainBefore.jpg'
    },
  ];

  const campaigns = [...Campaigns, ...test];

  const { width } = Dimensions.get('window'); // Get window width for carousel

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'donationRequests'));
        const requests = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(data);
          return {
            id: doc.id,
            patientName: data.patientName,
            hospital: data.hospital,
            bloodGroup: data.bloodGroup,
            pint: data.pint,
            requiredBy: data.requiredBy,
            location: {
              latitude: data.location.latitude,
              longitude: data.location.longitude,
            },
            phoneNumber: data.phoneNumber,
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

  const { finalRequestWithDistance, errorMsg } = useDonationRequests(donationRequests);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        {/* Carousel for Campaigns */}
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={width} // Set carousel width
            height={600} // Set carousel height
            autoPlay={true} // Auto play carousel
            scrollAnimationDuration={500} // Animation speed
            data={campaigns}
            renderItem={({ item }) => (
              <View style={styles.carouselItem}>
                <Image source={{ uri: item.image }} style={styles.carouselImage} />
                <Text style={styles.carouselTitle}>{item.title}</Text>
                <Text style={styles.carouselDescription}>{item.description}</Text>
              </View>
            )}
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setModalVisible(true)} // Open modal on button click
          >
            <Feather name="edit" size={24} color="white" />
            <Text style={styles.buttonText}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalInstruction(true)} style={styles.button}>
            <MaterialIcons name="list" size={24} color="white" />
            <Text style={styles.buttonText}>Instructions</Text>
          </TouchableOpacity>
          <BloodDonationModal isOpen={modalInstruction} onClose={() => setModalInstruction(false)} />
          <NeedFormModal isOpen={isModalVisible} onClose={() => setModalVisible(false)} />
        </View>

        {/* Section Title */}
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitle}>NearBy Requests</Text>
          <Link href="/donate" style={styles.viewAllLink}>View all
            <FontAwesome name="arrow-right" size={16} color="#ef4444" />
          </Link>
        </View>

        {/* Donation Requests List */}
        {loading ? (
          <Loader message="Fetching donation requests..." />
        ) : (
          <DonationRequestsList sortedRequests={finalRequestWithDistance} errorMsg={errorMsg} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    backgroundColor: '#f3f4f6',
  },
  carouselContainer: {
    paddingTop: 16, // Space above carousel
    marginBottom: '70%', // Space between carousel and other content
  },
  carouselItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  carouselTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  carouselDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 0, // Adding space below the buttons
  },
  button: {
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Ensures the buttons stretch evenly
    marginHorizontal: 8, // Adds spacing between buttons
  },
  buttonText: {
    color: '#ffffff',
    marginLeft: 8,
    fontSize: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllLink: {
    flexDirection: 'row',
    color: '#ef4444',
  },
});

export default Screen;
