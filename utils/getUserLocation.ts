import * as Location from 'expo-location';

export const getUserLocation = async (): Promise<Location.LocationObjectCoords | null> => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            throw new Error('Permission to access location was denied');
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        return location.coords;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching location:', error.message);
        } else {
            console.error('Error fetching location:', error);
        }
        return null;
    }
};
