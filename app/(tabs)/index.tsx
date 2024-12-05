import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const Screen = () => {
  const donationRequests = [
    { id: '1', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '2', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '3', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
    { id: '4', name: 'Ram Rana', hospital: 'Bhaktapur Hospital', rating: 'A+' },
  ];

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <CardHeader>
          <CardTitle>Good Morning, Rajesh</CardTitle>
        </CardHeader>
        <CardContent>
          <Text style={styles.title}>Save a life</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons name="search" size={24} color="white" />
              <Text style={styles.buttonText}>Find donors</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Feather name="edit" size={24} color="white" />
              <Text style={styles.buttonText}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <MaterialIcons name="list" size={24} color="white" />
              <Text style={styles.buttonText}>Instructions</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Donation Requests</Text>
          <FlatList
            data={donationRequests}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.requestCard}>
                <View style={styles.requestHeader}>
                  <Text style={styles.requestName}>{item.name}</Text>
                  <Text style={[styles.requestRating, item.rating === 'A+' ? styles.ratingPositive : styles.ratingNegative]}>
                    {item.rating}
                  </Text>
                </View>
                <Text style={styles.requestHospital}>{item.hospital}</Text>
              </View>
            )}
          />
        </CardContent>
      </Card>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  card: {
    width: '90%',
    marginVertical: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  button: {
    backgroundColor: '#ff3b30',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  requestCard: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  requestName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  requestRating: {
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingPositive: {
    backgroundColor: '#4cd964',
    color: 'white',
  },
  ratingNegative: {
    backgroundColor: '#ff3b30',
    color: 'white',
  },
  requestHospital: {
    fontSize: 14,
    color: '#888',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  footerButton: {
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 8,
  },
});

export default Screen;