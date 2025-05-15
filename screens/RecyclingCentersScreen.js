import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { db } from '../firebase';

export default function RecyclingCentersScreen({ navigation, route }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const title = route?.params?.title || 'Unnamed Product';
  const fromRecommendation = route?.params?.fromRecommendation;

  const handleDone = () => {
    if (fromRecommendation) {
      navigation.navigate('Impact', {
        type: 'recycling',
        title,
      });
    } else {
      navigation.navigate('Dashboard');
    }
  };

  const openInMaps = (lat, lng, label) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${encodeURIComponent(label)}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})`,
    });
    Linking.openURL(url);
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const snapshot = await db.collection('recycle_locations').get(); // <-- düzeltildi
        const data = snapshot.docs.map(doc => doc.data());
        setLocations(data);
        setLoading(false);
      } catch (err) {
        console.error('Recycling lokasyonları çekilemedi:', err);
      }
    };

    fetchLocations();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Recycling Locations</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#3c4a2a" />
        ) : (
          locations.map((loc, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.name}>{loc.address}</Text>
              <TouchableOpacity
                style={styles.mapButton}
                onPress={() => openInMaps(loc.latitude, loc.longitude, loc.address)}
              >
                <Text style={styles.mapButtonText}>Open in Maps</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneText}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8ffe6' },
  scroll: { padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2d2d2d',
  },
  card: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000',
  },
  mapButton: {
    backgroundColor: '#7ac81e',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  doneButton: {
    backgroundColor: '#b6e158',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 24,
    marginBottom: 24,
    borderRadius: 20,
  },
  doneText: {
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
});