import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function Need() {
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