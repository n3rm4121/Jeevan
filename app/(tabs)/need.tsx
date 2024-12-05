import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Button } from '~/components/ui/button';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '~/utils/firebaseConfig';
import { getUserLocation } from '~/utils/getUserLocation';

export default function Need() {
  const [selectedPint, setSelectedPint] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientName, setPatientName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [loading, setLoading] = useState(false);

  const db = getFirestore(app);

  const handleSubmit = async () => {
    if (!patientName || !selectedBloodGroup || !selectedPint || !selectedDate || !hospitalName || !phoneNumber) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    try {
      setLoading(true);
      const userLocation = await getUserLocation();
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

      await addDoc(collection(db, 'donationRequests'), newRequest);

      Alert.alert('Success', 'Donation request submitted successfully.');
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
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Patient Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter patient name"
          placeholderTextColor="#999"
          value={patientName}
          onChangeText={setPatientName}
        />

        <Text style={styles.label}>Blood Group</Text>
        <View style={styles.bloodGroupContainer}>
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bloodGroup) => (
            <TouchableOpacity
              key={bloodGroup}
              style={[
                styles.bloodGroupButton,
                selectedBloodGroup === bloodGroup && styles.selectedBloodGroupButton,
              ]}
              onPress={() => handleBloodGroupClick(bloodGroup)}
            >
              <Text style={styles.bloodGroupText}>{bloodGroup}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Required Pint *</Text>
        <Picker
          selectedValue={selectedPint}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedPint(itemValue)}
        >
          <Picker.Item label="1 pint" value="1" />
          <Picker.Item label="2 pints" value="2" />
        </Picker>

        <Text style={styles.label}>Required by *</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
          <Icon name="calendar" size={24} color="#333" />
          <Text style={styles.dateText}>
            {selectedDate
              ? `${selectedDate.toLocaleDateString()} - ${selectedDate.toLocaleString('en-US', {
                  weekday: 'long',
                })}`
              : 'Select Date'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Hospital Name*</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter hospital name"
          placeholderTextColor="#999"
          value={hospitalName}
          onChangeText={setHospitalName}
        />

        <Text style={styles.label}>Phone number</Text>
        <View style={styles.phoneContainer}>
          <Text style={styles.phonePrefix}>+977 | </Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholder="Enter phone number"
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={7}
          />
        </View>

        <Button style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
          <Text style={styles.submitButtonText}>{loading ? 'Submitting...' : 'Submit'}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    color: '#333',
  },
  bloodGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  bloodGroupButton: {
    width: '48%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedBloodGroupButton: {
    backgroundColor: '#f87171',
  },
  bloodGroupText: {
    color: '#333',
  },
  picker: {
    marginBottom: 16,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  dateText: {
    marginLeft: 8,
    color: '#333',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  phonePrefix: {
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#f87171',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
