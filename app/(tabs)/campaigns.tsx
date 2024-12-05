import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Campaigns = [
  {
    id: 1,
    title: 'विश्व रक्तदाता दिवस अभियान',
    image: 'https://cdn.who.int/media/images/default-source/nepal/health-topics_nepal/blood_nepal/1.jpg?sfvrsn=dfa76ed3_3',
    description: 'जीवन रक्षक बन्नुहोस्, रक्तदान गर्नुहोस् र जीवन बचाउनुहोस्।',
    details: 'यो अभियान विशेष गरी नेपालको दुर्गम क्षेत्रहरूमा लक्षित गरिएको हो जहाँ रक्तदानको कमी छ। यस अभियानको उद्देश्य मोबाइल रक्तदान शिविरहरू स्थापना गर्नु हो।',
    location: 'काठमाडौँ, नेपाल',
    date: '२० डिसेम्बर, २०२४',
    organizer: 'नेपाल रेडक्रस सोसाइटी',
  },
  {
    id: 2,
    title: 'Share Life, Give Blood - Nepal Red Cross Day Campaign',
    image: 'https://www.uri.org/sites/default/files/styles/hero_banner/public/media/images/2021/NU%20Blood%20Donation%20Program%20%20%282%29.jpg?h=9886a93b',
    description: 'Join us in the effort to save lives by donating blood. Your contribution is vital in times of need.',
    details: 'This campaign was held on the occasion of the 59th Nepal Red Cross Day at the Nepal Red Cross Society National Headquarters in Kalimati, Kathmandu. The program was organized to encourage blood donation and help those in need.',
    location: 'Kalimati, Kathmandu, Nepal',
    date: '4th September 2021',
    organizer: 'Nepal Red Cross Society',
  }
];

const CampaignPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const handleCampaignClick = (campaign: any) => {
    setSelectedCampaign(campaign);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCampaign(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Blood Donation Campaigns</Text>

        {Campaigns.map((campaign) => (
          <TouchableOpacity 
            key={campaign.id} 
            style={styles.campaignCard} 
            onPress={() => handleCampaignClick(campaign)}
          >
            <Image 
              source={{ uri: campaign.image }} 
              style={styles.campaignImage} 
              resizeMode="cover"
            />
            <View style={styles.campaignTextContainer}>
              <Text style={styles.campaignTitle} numberOfLines={2}>
                {campaign.title}
              </Text>
              <Text style={styles.campaignDescription} numberOfLines={3}>
                {campaign.description}
              </Text>
              <View style={styles.campaignFooter}>
                <Text style={styles.campaignDate}>{campaign.date}</Text>
                <Text style={styles.campaignLocation} numberOfLines={1}>
                  {campaign.location}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Modal for detailed campaign info */}
      <Modal
        visible={isModalVisible}
        onRequestClose={closeModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <LinearGradient
            colors={['rgba(255,255,255,0.9)', 'rgba(230,230,250,0.9)']}
            style={styles.modalContent}
          >
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <MaterialIcons name="close" size={30} color="#333" />
            </TouchableOpacity>
            
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.modalScrollContent}
            >
              <Image 
                source={{ uri: selectedCampaign?.image }} 
                style={styles.modalImage} 
                resizeMode="cover"
              />
              
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>{selectedCampaign?.title}</Text>
                
                <View style={styles.modalInfoSection}>
                  <MaterialIcons name="description" size={24} color="#3498db" />
                  <Text style={styles.modalInfoText}>{selectedCampaign?.details}</Text>
                </View>
                
                <View style={styles.modalInfoSection}>
                  <MaterialIcons name="location-on" size={24} color="#e74c3c" />
                  <Text style={styles.modalInfoText}>
                    Location: {selectedCampaign?.location}
                  </Text>
                </View>
                
                <View style={styles.modalInfoSection}>
                  <MaterialIcons name="date-range" size={24} color="#2ecc71" />
                  <Text style={styles.modalInfoText}>
                    Date: {selectedCampaign?.date}
                  </Text>
                </View>
                
                <View style={styles.modalInfoSection}>
                  <MaterialIcons name="business" size={24} color="#9b59b6" />
                  <Text style={styles.modalInfoText}>
                    Organizer: {selectedCampaign?.organizer}
                  </Text>
                </View>
              </View>
            </ScrollView>
          </LinearGradient>
        </View>
      </Modal>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  scrollViewContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  campaignCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  campaignImage: {
    width: '100%',
    height: 250,
  },
  campaignTextContainer: {
    padding: 16,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  campaignDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  campaignFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  campaignDate: {
    fontSize: 14,
    color: '#3498db',
  },
  campaignLocation: {
    fontSize: 14,
    color: '#27ae60',
    flex: 1,
    textAlign: 'right',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: width * 0.90,
    height: height * 0.85,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 16,
  },
  modalScrollContent: {
    flexGrow: 1,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalImage: {
    width: '100%',
    height: 300,
    borderRadius: 15,
  },
  modalTextContainer: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255,255,255,0.7)',
    padding: 12,
    borderRadius: 10,
  },
  modalInfoText: {
    fontSize: 16,
    color: '#34495e',
    marginLeft: 12,
    flex: 1,
  },
});

export default CampaignPage;