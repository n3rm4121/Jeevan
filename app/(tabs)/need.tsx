import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function Need() {
  const [selectedPint, setSelectedPint] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState<string | null>(null);
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
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  bloodGroupContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bloodGroupButton: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#ff5050',
  },
  bloodGroupText: {
    color: '#333',
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateText: {
    color: '#333',
    marginLeft: 10,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  countryCode: {
    color: '#333',
  },
  phoneInput: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#ff5050',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },


});
