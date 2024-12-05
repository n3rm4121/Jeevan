export interface DonationRequest {
    id: string;
    name: string;
    hospital: string;
    bloodGroup: string;
    pint: string;
    required_by: Date;
    location: {
        latitude: number;
        longitude: number;
    };
    phoneNumber: string;
    patientName: string;
}