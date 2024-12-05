import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Loader: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
    return (
        <View className="flex-1 justify-center items-center bg-gray-100">
            <ActivityIndicator size="large" color="#FF0000" />
            <Text className="mt-4 text-gray-600">{message}</Text>
        </View>
    );
};

export default Loader;
