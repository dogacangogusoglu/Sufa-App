import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

const infrastructureOptions = [
  "Recycling bin and Upcycling options nearby",
  "Needs transport or shipping",
  "No known recycling  or upcycling options"
];

export default function ProductEntry4_3Screen({ route, navigation }) {
  const { sentimental, usage, category, material, price } = route.params;
  const [selectedInfrastructure, setSelectedInfrastructure] = useState(null);

  const handleNext = () => {
    if (!selectedInfrastructure) {
      Alert.alert("Please select an infrastructure option.");
      return;
    }

    navigation.navigate("ProductEntry5", {
      sentimental,
      usage,
      category,
      material,
      price,
      infrastructure: selectedInfrastructure
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recycling Infrastructure Availability</Text>

      {infrastructureOptions.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.option,
            selectedInfrastructure === option && styles.selected
          ]}
          onPress={() => setSelectedInfrastructure(option)}
        >
          <Text
            style={[
              styles.optionText,
              selectedInfrastructure === option && styles.selectedText
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}

      <PrimaryButton title="Next" onPress={handleNext} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ffe6',
    padding: 24,
    justifyContent: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3c4a2a',
    marginBottom: 24,
    textAlign: 'center'
  },
  option: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#D4EC8F',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selected: {
    borderWidth: 2,
    borderColor: '#3c4a2a'
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3c4a2a',
    textAlign: 'center'  // <-- Bu satır eklendi
  },
  selectedText: {
    color: '#3c4a2a'
  }
});