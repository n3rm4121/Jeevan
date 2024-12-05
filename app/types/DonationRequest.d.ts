export default interface DonationRequest {
    id: string;
    hospital: string;
    bloodGroup: string;
    pint: string;
    requiredBy: Date;
    location: {
        latitude: number;
        longitude: number;
    };
    phoneNumber: string;
    patientName: string;
}