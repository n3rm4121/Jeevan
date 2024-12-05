import React from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Screen = () => {
  const donationRequests = [
    { id: '1', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '2', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '3', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '4', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '5', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '6', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '7', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '8', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
  ];

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
        <Text className="text-lg font-bold mt-6 mx-4">Donation Requests</Text>

        {/* Scrollable Donation Requests List */}
        <View className="flex-1 mt-8">
          <FlatList
            data={donationRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="bg-white p-4 rounded-lg mx-4 mb-4 shadow">
                <View className="flex-row justify-between items-center">
                  <Text className="text-lg font-bold">{item.name}</Text>
                  <Text
                    className={`text-sm px-2 py-1 rounded-lg ${item.rating === 'A+' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}
                  >
                    {item.rating}
                  </Text>
                </View>
                <Text className="text-gray-500">{item.hospital}</Text>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Screen;
