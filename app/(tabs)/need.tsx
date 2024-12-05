import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from '~/components/ui/button';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getLocation } from '~/utils/locationUtils'; // Assuming you have locationUtils for fetching user location
import { app } from '~/firebaseConfig'; // Import Firebase app

export default function Need() {
  const [selectedPint, setSelectedPint] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientName, setPatientName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app); // Initialize Firestore

  const handleSubmit = async () => {
    if (!patientName || !selectedBloodGroup || !selectedPint || !selectedDate || !hospitalName || !phoneNumber) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      const userLocation = await getLocation(); // Fetch user's location
      if (!userLocation) {
        Alert.alert('Error', 'Unable to fetch your location.');
        return;
      }

      const newRequest = {
        patientName,
        bloodGroup: selectedBloodGroup,
        pint: selectedPint,
        requiredBy: selectedDate.toISOString(),
        hospital: hospitalName,
        phoneNumber: `+977${phoneNumber}`,
        location: {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        createdAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'donationRequests'), newRequest); // Save to Firestore

      Alert.alert('Success', 'Donation request submitted successfully.');
      // Optionally reset form fields
      setPatientName('');
      setSelectedBloodGroup(null);
      setSelectedPint(null);
      setSelectedDate(null);
      setHospitalName('');
      setPhoneNumber('');
    } catch (error) {
      Alert.alert('Error', 'Failed to submit donation request. Please try again.');
      console.error('Error submitting donation request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    setDatePickerVisibility(false);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handlePhoneChange = (text: string) => {
    const formatted = text.replace(/[^0-9]/g, '');
    if (formatted.length <= 7) {
      setPhoneNumber(formatted);
    }
  };

  const handleBloodGroupClick = (bloodGroup: string) => {
    setSelectedBloodGroup(bloodGroup);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-white rounded-lg p-5 shadow-md">
        <Text className="text-lg font-bold mb-2 text-gray-800">Patient Name</Text>
        <TextInput
          className="bg-gray-100 p-3 rounded-md mb-5 text-gray-700"
          placeholder="Enter patient name"
          placeholderTextColor="#999"
          value={patientName}
          onChangeText={setPatientName}
        />

        <Text className="text-lg font-bold mb-2 text-gray-800">Blood Group</Text>
        <View className="flex flex-row flex-wrap gap-2 mb-5">
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bloodGroup) => (
            <TouchableOpacity
              key={bloodGroup}
              className={`p-3 rounded-md w-[48%] text-center ${selectedBloodGroup === bloodGroup ? 'bg-red-500' : 'bg-gray-100'
                }`}
              onPress={() => handleBloodGroupClick(bloodGroup)}
            >
              <Text className="text-gray-800">{bloodGroup}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-lg font-bold mb-2 text-gray-800">Required Pint *</Text>
        <Picker
          selectedValue={selectedPint}
          style={{ marginBottom: 20, backgroundColor: '#f3f3f3', borderRadius: 8 }}
          onValueChange={(itemValue) => setSelectedPint(itemValue)}
        >
          <Picker.Item label="1 pint" value="1" />
          <Picker.Item label="2 pints" value="2" />
        </Picker>

        <Text className="text-lg font-bold mb-2 text-gray-800">Required by *</Text>
        <TouchableOpacity onPress={showDatePicker} className="flex-row items-center bg-gray-100 p-3 rounded-md mb-5">
          <Icon name="calendar" size={24} color="#333" />
          <Text className="text-gray-800 ml-3">
            {selectedDate
              ? `${selectedDate.toLocaleDateString()} - ${selectedDate.toLocaleString('en-US', {
                weekday: 'long',
              })}`
              : 'Select Date'}
          </Text>
        </TouchableOpacity>

        <Text className="text-lg font-bold mb-2 text-gray-800">Hospital Name*</Text>
        <TextInput
          className="bg-gray-100 p-3 rounded-md mb-5 text-gray-700"
          placeholder="Enter hospital name"
          placeholderTextColor="#999"
          value={hospitalName}
          onChangeText={setHospitalName}
        />

        <Text className="text-lg font-bold mb-2 text-gray-800">Phone number</Text>
        <View className="flex-row items-center mb-5">
          <Text className="text-gray-800">+977 | </Text>
          <TextInput
            className="bg-gray-100 p-3 rounded-md flex-1 text-gray-700"
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholder="Enter phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={7}
          />
        </View>

        <Button
          className="bg-red-500 p-4 rounded-md"
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text className="text-white text-center font-bold">
            {loading ? 'Submitting...' : 'Submit'}
          </Text>
        </Button>
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </SafeAreaView>
  );
}
