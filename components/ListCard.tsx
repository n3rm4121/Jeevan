import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

interface HospitalCardProps {
    avatar: string;
    name: string;
    address: string;
    phone: string;
    bloodType: string;
    distance: string;
    isUrgent?: boolean;
}

const HospitalCard: React.FC<HospitalCardProps> = ({
    avatar,
    name,
    address,
    phone,
    bloodType,
    distance,
    isUrgent
}) => {
    return (
        <View className="bg-gray-200 flex-row gap-4 mb-4 items-center justify-between p-4 rounded-lg shadow-md">
            {/* Left Section: Avatar and Info */}
            <View className="flex-row items-center">
                {/* Avatar */}
                <View className="mr-4">
                    <Image
                        source={{ uri: avatar }}
                        className="w-12 h-12 rounded-full"
                        alt="avatar"
                    />
                    {isUrgent && (
                        <Text className="bg-red-500 text-white text-xs rounded-full px-2 mt-1 self-center">
                            Urgent
                        </Text>
                    )}
                </View>

                {/* Hospital Info */}
                <View>
                    <Text className="text-lg font-bold">{name}</Text>
                    <View className="flex-row items-center">
                        <MaterialIcons name="location-on" size={16} color="gray" />
                        <Text className="text-sm text-gray-600">{address}</Text>
                    </View>
                    <View className="flex-row items-center">
                        <FontAwesome name="phone" size={16} color="gray" />
                        <Text className="text-sm text-gray-600 ml-1">{phone}</Text>
                    </View>
                </View>
            </View>

            {/* Right Section: Blood Type and Distance */}
            <View className="flex-col items-end">
                <TouchableOpacity className="bg-red-500 px-3 py-1 rounded-full mb-2">
                    <Text className="text-white font-bold">{bloodType}</Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-green-500 px-3 py-1 rounded-full">
                    <Text className="text-white font-bold">{distance}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HospitalCard;
