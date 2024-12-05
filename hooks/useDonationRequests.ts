import { useState, useEffect } from 'react';
import DonationRequest from '~/app/types/DonationRequest';
import { getUserLocation } from '~/utils/getUserLocation';

type LocationCoords = { latitude: number; longitude: number } | null;

export const useDonationRequests = (donationRequests: DonationRequest[]) => {
    const [userLocation, setUserLocation] = useState<LocationCoords>(null);
    const [sortedRequests, setSortedRequests] = useState<DonationRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        const fetchUserLocation = async () => {
            try {
                setLoading(true);
                const location = await getUserLocation();
                if (location) {
                    setUserLocation(location);
                }
            } catch (error) {
                setErrorMsg('Failed to fetch location');
            } finally {
                setLoading(false);
            }
        };

        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (userLocation) {
            setLoading(true);
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
            setLoading(false);
        }
    }, [userLocation, donationRequests]);

    // console.log(sortedRequests);
    return { sortedRequests, loading, errorMsg, userLocation };
};
