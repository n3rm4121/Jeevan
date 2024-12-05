import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Loader from '~/components/Loader';
import { useDonationRequests } from '~/hooks/useDonationRequests';
import { Link } from 'expo-router';
import DonationRequestsList from '~/components/DonationRequestList';

const donationRequests = [
  { id: '1', name: 'Real Rana', hospital: 'Bhaktapur Hospital', bloodGroup: 'A+', pint: '1', required_by: 'date', location: { latitude: 27.671, longitude: 85.429 } },
  { id: '2', name: 'Bhu Rana', hospital: 'Bhaktapur Hospital', bloodGroup: 'A+', pint: '2', required_by: 'date', location: { latitude: 28.671, longitude: 86.429 } },
  { id: '3', name: 'Lha Rana', hospital: 'Bhaktapur Hospital', bloodGroup: 'A+', pint: '1', required_by: 'date', location: { latitude: 29.671, longitude: 87.429 } },
  { id: '4', name: 'Lasutohsh Rana', hospital: 'Bhaktapur Hospital', bloodGroup: 'A+', pint: '2', required_by: 'date', location: { latitude: 30.671, longitude: 88.429 } },
];

const Screen: React.FC = () => {
  const { sortedRequests, loading, errorMsg } = useDonationRequests(donationRequests);

  // if (loading) {
  //   return <Loader message="Fetching donation requests..." />;
  // }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-100">
        {/* Header Card */}
        <View className="p-4 bg-white shadow">
          <Text className="text-lg font-bold">Good Morning, Rajesh</Text>
        </View>

        {/* Title */}
        <Text className="text-xl font-bold mt-4 mx-4">Save a life</Text>

        {/* Buttons */}
        <View className="flex-row justify-around mt-4">
          <TouchableOpacity className="bg-red-500 px-4 py-3 rounded-lg flex-row items-center">
            <MaterialIcons name="search" size={24} color="white" />
            <Text className="text-white ml-2">Find donors</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 px-4 py-3 rounded-lg flex-row items-center">
            <Feather name="edit" size={24} color="white" />
            <Text className="text-white ml-2">Request</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-red-500 px-4 py-3 rounded-lg flex-row items-center">
            <MaterialIcons name="list" size={24} color="white" />
            <Text className="text-white ml-2">Instructions</Text>
          </TouchableOpacity>
        </View>

        {/* Section Title */}
        <View className="flex flex-row justify-between items-center mx-4">
          <Text className="text-lg font-bold mt-6">Donation Requests</Text>
          <Link href="/donate" className="text-red-500">View all</Link>
        </View>

        {/* Donation Requests List */}
        {loading ? <Loader message="Fetching donation requests..." /> :
          <DonationRequestsList sortedRequests={sortedRequests} errorMsg={errorMsg} />

        }
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Screen;
