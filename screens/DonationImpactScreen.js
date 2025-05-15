// screens/DonationImpactScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function DonationImpactScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>With this donation, you have saved:</Text>
      <View style={styles.impactBox}>
        <Text style={styles.impactText}>💧 200L of water</Text>
        <Text style={styles.impactText}>🧥 1 person’s clothing needs</Text>
        <Text style={styles.impactText}>📦 Reduced landfill waste</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>Go to Main Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8ffe6', padding: 24, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: '#3c4a2a', marginBottom: 32, textAlign: 'center' },
  impactBox: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    marginBottom: 32,
  },
  impactText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3c4a2a',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#a6d86b',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#3c4a2a', fontSize: 16, fontWeight: '600' },
});
