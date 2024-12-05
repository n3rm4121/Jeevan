import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Button } from 'react-native';

import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid, Platform, Alert } from 'react-native';

const getLocation = async () => {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "We need your location to find nearby donors.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert("Permission Denied", "Location permission is required.");
      return null;
    }
  }

  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });
};

// Usage example:
const handleGetLocation = async () => {
  try {
    const location = await getLocation();
    if (location) {
      console.log('User location:', location);
      // Save to the request form or database
    }
  } catch (error) {
    console.error(error);
  }
};

export default function Need() {
  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;

    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  // Example Usage
  const recipientLocation = { latitude: 27.618268635607492, longitude: 85.5376467904822 }; // Kathmandu
  const donorLocation = { latitude: 30.618268635607492, longitude: 90.5376467904822 }; // Nearby Donor

  const distance = getDistance(
    recipientLocation.latitude,
    recipientLocation.longitude,
    donorLocation.latitude,
    donorLocation.longitude
  );

  console.log(`Distance: ${distance} km`);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Patient Name</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
        />
        <Button onPress={handleGetLocation} title="Get Location" />
        <Text style={styles.heading}>Blood Group</Text>
        <View style={styles.bloodGroupContainer}>
          <TouchableOpacity style={[styles.bloodGroupButton, styles.activeButton]}>
            <Text style={styles.bloodGroupText}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bloodGroupButton}>
            <Text style={styles.bloodGroupText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bloodGroupButton}>
            <Text style={styles.bloodGroupText}>B+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bloodGroupButton}>
            <Text style={styles.bloodGroupText}>B-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bloodGroupButton}>
            <Text style={styles.bloodGroupText}>O+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bloodGroupButton}>
            <Text style={styles.bloodGroupText}>O-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bloodGroupButton}>
            <Text style={styles.bloodGroupText}>AB+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bloodGroupButton}>
            <Text style={styles.bloodGroupText}>AB-</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading}>Number of Pint *</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="numeric"
        />
        <Text style={styles.heading}>Need by *</Text>
        <TextInput
          style={styles.input}
          placeholder="Date"
          placeholderTextColor="#999"
        />
        <Text style={styles.heading}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Select location"
          placeholderTextColor="#999"
        />
        <Text style={styles.heading}>Phone number</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 18,
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
    justifyContent: 'center'
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});