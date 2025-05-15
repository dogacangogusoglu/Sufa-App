import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { useAnalysis } from '../context/AnalysisContext';

export default function ImpactScreen({ route, navigation }) {
  const { type, title, image, category } = route.params || {};
  const { addEntry } = useAnalysis();

  const headings = {
    recycle: 'Thanks for Recycling!',
    donation: 'Thanks for Donating!',
    upcycle: 'Thanks for Upcycling!',
  };

  const impacts = {
    recycle: [
      { label: 'Water Saved', value: '123 tons' },
      { label: 'Trees Saved', value: '75 kg' },
      { label: 'Textiles Diverted', value: '60 kg' },
    ],
    donation: [
      { label: 'People Helped', value: '1+ person' },
      { label: 'Waste Reduced', value: 'Yes' },
      { label: 'Resources Saved', value: 'Significant' },
    ],
    upcycle: [
      { label: 'New Life Created', value: '✓' },
      { label: 'Waste Avoided', value: '✓' },
      { label: 'Resources Saved', value: '✓' },
    ],
  };

  const handleViewIdeas = () => {
    navigation.navigate('UpcyclingIdeas', {
      title,
      category,
      fromAnalysis: true
    });
  };

  const handleViewLocations = () => {
    navigation.navigate('UpcycleLocations', {
      title,
      fromRecommendation: true,
    });
  };

  const heading = headings[type] || 'Impact Summary';
  const impactItems = impacts[type] || [];

  return (
    <SafeAreaView style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Text style={styles.title}>{heading}</Text>
      <Text style={styles.subtitle}>{title}</Text>

      <View style={styles.impactBox}>
        {impactItems.map((item, index) => (
          <View key={index} style={styles.impactRow}>
            <Text style={styles.label}>{item.label}:</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>

      {type === 'upcycle' && (
        <>
          <PrimaryButton title="View Upcycle Ideas" onPress={handleViewIdeas} />
          <PrimaryButton title="View Upcycle Locations" onPress={handleViewLocations} />
          <PrimaryButton
            title="Back to Analyses"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 24 }}
          />
        </>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ffe6',
    padding: 24,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 24,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3c4a2a',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  impactBox: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3c4a2a',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3c4a2a',
  },
});
