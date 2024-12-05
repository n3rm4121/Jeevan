import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

type LocationCoords = Location.LocationObjectCoords | null;

interface DonationRequest {
    id: string;
    name: string;
    hospital: string;
    bloodGroup: string;
    location: { latitude: number; longitude: number };
    pint: string;
    required_by: string;
    distance?: number;
}

export const useDonationRequests = (donationRequests: DonationRequest[]) => {
    const [userLocation, setUserLocation] = useState<LocationCoords>(null);
    const [sortedRequests, setSortedRequests] = useState<DonationRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return null;
        }
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        return location.coords;
    };

    const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const toRadians = (deg: number) => (deg * Math.PI) / 180;
        const R = 6371; // Earth's radius in km
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };

    useEffect(() => {
        const handleGetLocation = async () => {
            try {
                setLoading(true); // Start loading
                const location = await getLocation();
                if (location) {
                    setUserLocation(location);
                }
            } catch {
                setErrorMsg('Failed to fetch location');
            } finally {
                setLoading(false); // End loading
            }
        };
        handleGetLocation();
    }, []);

    useEffect(() => {
        if (userLocation) {
            setLoading(true); // Start loading for sorting
            const sorted = donationRequests
                .map((request) => ({
                    ...request,
                    distance: getDistance(
                        userLocation.latitude,
                        userLocation.longitude,
                        request.location.latitude,
                        request.location.longitude
                    ),
                }))
                .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
            setSortedRequests(sorted);
            setLoading(false); // End loading
        }
    }, [userLocation, donationRequests]);

    return { sortedRequests, loading, errorMsg, userLocation };
};
