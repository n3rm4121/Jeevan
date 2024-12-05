import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function Need() {
  const [selectedPint, setSelectedPint] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
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
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Patient Name</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
        />
        <Text style={styles.heading}>Blood Group</Text>
        <View style={styles.bloodGroupContainer}>
          {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bloodGroup => (
            <TouchableOpacity
              key={bloodGroup}
              style={[styles.bloodGroupButton, selectedBloodGroup === bloodGroup && styles.activeButton]}
              onPress={() => handleBloodGroupClick(bloodGroup)}
            >
              <Text style={styles.bloodGroupText}>{bloodGroup}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.heading}>Required Pint *</Text>
        <Picker
          selectedValue={selectedPint}
          style={styles.input}
          onValueChange={(itemValue) => setSelectedPint(itemValue)}
        >
          <Picker.Item label="1 pint" value="1" />
          <Picker.Item label="2 pints" value="2" />
        </Picker>
        <Text style={styles.heading}>Required by *</Text>
        <TouchableOpacity onPress={showDatePicker} style={styles.datePickerButton}>
          <Icon name="calendar" size={24} color="#333" />
          <Text style={styles.dateText}>
            {selectedDate ? `${selectedDate.toLocaleDateString()} - ${selectedDate.toLocaleString('en-US', { weekday: 'long' })}` : "Select Date"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Hospital Name*</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
        />
        <Text style={styles.heading}>Phone number</Text>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+977 | </Text>
          <TextInput
            style={styles.phoneInput}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            placeholderTextColor="#999"
            keyboardType="phone-pad"
            maxLength={7}
          />
        </View>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
    justifyContent: 'center',
  },
  bloodGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 15,
  },
  bloodGroupButton: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  activeButton: {
    backgroundColor: '#FF3B30',
  },
  bloodGroupText: {
    color: '#333',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dateText: {
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  countryCode: {
    fontSize: 18,
    color: '#333',
    paddingHorizontal: 15,
  },
  phoneInput: {
    fontSize: 18,
    flex: 1,
    paddingHorizontal: 15,
    color: '#333',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
});