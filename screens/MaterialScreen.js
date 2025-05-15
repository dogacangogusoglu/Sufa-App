import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Picker, Platform } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function MaterialScreen({ navigation }) {
  const [primary, setPrimary] = useState('Polyester');
  const [secondary, setSecondary] = useState('Cotton');

  const handleNext = () => {
    navigation.navigate('AddTitle');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Materials</Text>

      <Text style={styles.label}>Primary Material:</Text>
      <Picker
        selectedValue={primary}
        style={styles.picker}
        onValueChange={(itemValue) => setPrimary(itemValue)}
      >
        <Picker.Item label="Polyester" value="Polyester" />
        <Picker.Item label="Cotton" value="Cotton" />
        <Picker.Item label="Wool" value="Wool" />
      </Picker>

      <Text style={styles.label}>Secondary Material:</Text>
      <Picker
        selectedValue={secondary}
        style={styles.picker}
        onValueChange={(itemValue) => setSecondary(itemValue)}
      >
        <Picker.Item label="Polyester" value="Polyester" />
        <Picker.Item label="Cotton" value="Cotton" />
        <Picker.Item label="Wool" value="Wool" />
      </Picker>

      <PrimaryButton title="Next" onPress={handleNext} style={styles.buttonSpacing} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8ffe6', padding: 24, justifyContent: 'center' },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3c4a2a',
    marginBottom: 32,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 4,
    color: '#3c4a2a',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    ...Platform.select({
      android: {
        color: '#3c4a2a',
      },
    }),
  },
  buttonSpacing: {
    marginTop: 32,
  },
});
