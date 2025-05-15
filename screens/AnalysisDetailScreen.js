import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Image } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function AnalysisDetailScreen({ route, navigation }) {
  const { title, type, date, image, fromAnalysis, category } = route.params || {};
  const [impactItems, setImpactItems] = useState([]);

  useEffect(() => {
    const getRandomInt = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const getRandomItem = (arr) =>
      arr[Math.floor(Math.random() * arr.length)];

    const generateImpacts = () => {
      if (type === 'recycle') {
        return [
          { label: 'Water Saved', value: `${getRandomInt(70, 150)} liters` },
          { label: 'Trees Saved', value: `${(Math.random() * 0.4 + 0.1).toFixed(2)} trees` },
          { label: 'Textiles Diverted', value: `${(Math.random() * 1.5 + 0.5).toFixed(1)} kg` }
        ];
      } else if (type === 'donate') {
        return [
          { label: 'People Helped', value: `${getRandomInt(1, 3)} person${Math.random() > 0.5 ? 's' : ''}` },
          { label: 'Waste Reduced', value: Math.random() > 0.3 ? 'Yes' : 'Likely' },
          { label: 'Resources Saved', value: getRandomItem(['Moderate', 'High', 'Significant']) }
        ];
      } else if (type === 'upcycle') {
        return [
          { label: 'New Life Created', value: '✓' },
          { label: 'Waste Avoided', value: '✓' },
          { label: 'Resources Saved', value: getRandomItem(['Reused', 'Repurposed', 'Reimagined']) }
        ];
      }
      return [];
    };

    setImpactItems(generateImpacts());
  }, [type]);

  const goToCenters = () => {
    if (type === 'recycle') {
      navigation.navigate('RecyclingCenters');
    } else if (type === 'donate') {
      navigation.navigate('DonationCenters');
    } else if (type === 'upcycle') {
      navigation.navigate('UpcyclingIdeas', {
        fromRecommendation: true,
        category,
        title,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{date}</Text>

      <View style={styles.impactBox}>
        {impactItems.map((item, index) => (
          <View key={index} style={styles.impactRow}>
            <Text style={styles.label}>{item.label}:</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>

      {fromAnalysis && (
        <PrimaryButton
          title={
            type === 'recycle'
              ? 'View Recycling Centers'
              : type === 'donate'
              ? 'View Donation Centers'
              : 'View Upcycling Ideas'
          }
          onPress={goToCenters}
        />
      )}

      <PrimaryButton title="Back" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8ffe6',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  impactBox: {
    backgroundColor: '#f8ffe6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  impactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  value: {
    color: '#555',
  },
});