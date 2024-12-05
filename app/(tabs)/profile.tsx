import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const ProfilePage = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [availableToDonate, setAvailableToDonate] = useState(true);

    return (
        <View className="flex-1 bg-white">
            {/* Header Section */}
            <View className="relative bg-red-500 items-center py-8">
                <FontAwesome name="user-circle" size={80} color="#fff" className="mb-2" />
                <Text className="text-lg font-bold text-white">Rajesh</Text>
                <Text className="text-base text-white">+977-9812345678</Text>

                {/* Overlay Section */}
                <View className="absolute -bottom-10 w-11/12 mx-auto bg-white p-4 rounded-lg shadow-md flex-row justify-between">
                    <View className="items-center">
                        <FontAwesome name="heart" size={24} color="#ff5050" />
                        <Text className="text-base mt-2 text-center">2 lives saved</Text>
                    </View>
                    <View className="items-center">
                        <FontAwesome name="eyedropper" size={24} color="#ff5050" />
                        <Text className="text-base mt-2 text-center">AB+ Group</Text>
                    </View>
                    <View className="items-center">
                        <Feather name="calendar" size={24} color="#ff5050" />
                        <Text className="text-base mt-2 text-center">Next Donation</Text>
                    </View>
                </View>
            </View>

            {/* Settings Section */}
            <View className="mt-16 px-6">
                <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-base">Available to donate</Text>
                    <Switch
                        value={availableToDonate}
                        onValueChange={setAvailableToDonate}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={availableToDonate ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-base">Notification</Text>
                    <Switch
                        value={notificationsEnabled}
                        onValueChange={setNotificationsEnabled}
                        trackColor={{ false: '#767577', true: '#81b0ff' }}
                        thumbColor={notificationsEnabled ? '#f5dd4b' : '#f4f3f4'}
                    />
                </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity className="bg-red-500 mt-6 mx-auto px-6 py-3 rounded-lg">
                <Text className="text-white text-center text-base">Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ProfilePage;
