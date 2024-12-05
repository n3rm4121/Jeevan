import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface HeaderProps {
    name: string;
    isHomeScreen: boolean;
}

const Header: React.FC<HeaderProps> = ({ name, isHomeScreen }) => {
    return (
        <View style={[styles.container, isHomeScreen ? styles.homeContainer : styles.defaultContainer]}>
            {isHomeScreen && (
                <Image
                    source={{ uri: 'https://via.placeholder.com/40x40.png?text=Logo' }} // Replace with your logo URL
                    style={styles.logo}
                />
            )}
            <Text style={styles.headerText}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
    },
    homeContainer: {
        backgroundColor: 'red', // Blue background for home screen
    },
    defaultContainer: {
        backgroundColor: 'red', // Gray background for other screens
    },
    logo: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        flex: 1, // To allow the text to occupy remaining space
    },
});

export default Header;
