import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  Linking,
  Platform,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import { db } from '../firebase';

export default function UpcycleLocationsScreen({ navigation }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  const openInMaps = (lat, lng, label) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?q=${encodeURIComponent(label)}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})`,
    });
    Linking.openURL(url);
  };

  useEffect(() => {
    (async () => {
      try {
        const snap = await db.collection('upcycle_locations').get();
        setLocations(snap.docs.map((d) => d.data()));
      } catch (err) {
        console.error('Upcycle locations fetch error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Upcycle Locations</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#3c4a2a" />
        ) : (
          locations.map((loc, i) => (
            <View key={i} style={styles.card}>
              <Text style={styles.name}>{loc.address}</Text>
              <PrimaryButton
                title="Open in Maps"
                onPress={() =>
                  openInMaps(loc.latitude, loc.longitude, loc.address)
                }
                style={styles.mapButton}
                textStyle={styles.mapButtonText}
              />
            </View>
          ))
        )}
      </ScrollView>

      {/*  ImpactScreen’e geri dön */}
      <PrimaryButton
        title="Back"
        onPress={() => navigation.goBack()}
        style={{ marginTop: 0 }}
      />

      {/*  Dashboard’a dön */}
      <PrimaryButton
        title="Back to Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
        style={{ marginTop: 12 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ffe6',
    padding: 24,
  },
  scroll: {
    paddingBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2d2d2d',
    textAlign: 'left',
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
    marginTop: 0,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
