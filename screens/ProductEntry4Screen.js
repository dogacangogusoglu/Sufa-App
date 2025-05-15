import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

const materials = [
  "100% Cotton / Linen",
  "Polyester blend",
  "Non-recyclable"
];

export default function ProductEntry4Screen({ route, navigation }) {
  const { sentimental, usage, category } = route.params;
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const handleNext = () => {
    if (!selectedMaterial) {
      Alert.alert("Please select a material");
      return;
    }

    navigation.navigate('ProductEntry4_5', {
      sentimental,
      usage,
      category,
      material: selectedMaterial
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Main Material</Text>

      {materials.map((mat) => (
        <TouchableOpacity
          key={mat}
          style={[
            styles.option,
            selectedMaterial === mat && styles.selected
          ]}
          onPress={() => setSelectedMaterial(mat)}
        >
          <Text
            style={[
              styles.optionText,
              selectedMaterial === mat && styles.selectedText
            ]}
          >
            {mat}
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
    color: '#3c4a2a'
  },
  selectedText: {
    color: '#3c4a2a'
  }
});
