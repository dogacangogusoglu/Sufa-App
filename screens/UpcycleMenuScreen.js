import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton'; 

export default function UpcycleMenuScreen({ navigation, route }) {
  const category = route?.params?.category;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Başlık */}
        <Text style={styles.header}>Upcycle Options</Text>

        {/* 1. Kart */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('UpcyclingIdeas', { category })}
        >
          <Feather name="repeat" size={24} color="#3c4a2a" />
          <Text style={styles.cardText}>
            View{'\n'}Upcycle Ideas
          </Text>
        </TouchableOpacity>

        {/* 2. Kart */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('UpcycleLocations')}
        >
          <Feather name="map-pin" size={24} color="#3c4a2a" />
          <Text style={styles.cardText}>
            View{'\n'}Upcycle Locations
          </Text>
        </TouchableOpacity>

       
        <View style={{ flex: 1 }} />

        {/* ↓ Dashboard’a dön */}
        <PrimaryButton
          title="Back to Dashboard"
          onPress={() => navigation.goBack()}
          style={{ marginTop: 12 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8ffe6',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2d2d2d',
    marginBottom: 16,
    textAlign: 'left',
  },
  card: {
    backgroundColor: '#e0f2b2',
    borderRadius: 16,
    width: '100%',
    height: 130,
    marginBottom: 20,
    padding: 16,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3c4a2a',
    lineHeight: 22,
    textAlign: 'left',
  },
});