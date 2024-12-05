import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HeaderProps {
    name: string;
    isHomeScreen: boolean;
}

const Header: React.FC<HeaderProps> = ({ name, isHomeScreen }) => {
    return (
        <View style={styles.container}>
            {isHomeScreen && (
                <Image
                    source={{ uri: 'https://i.pinimg.com/1200x/1e/37/d8/1e37d8625499a2a1ea1a19174ee7a180.jpg' }}
                    style={styles.logo}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },

    logo: {
        width: 150,
        height: 60,
        marginRight: 10,
        marginLeft: 70,
        resizeMode: 'contain',
        backgroundColor: 'f8f9fa'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#1f2937', // Dark text color
    },
});

export default Header;
