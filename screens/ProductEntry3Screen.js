import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

const categoryOptions = [
  { label: "Tops / Dresses", value: "tops_dresses" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Under Garments", value: "undergarments" }
];

export default function ProductEntry3Screen({ route, navigation }) {
  const { sentimental, usage } = route.params;
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    if (!selected) {
      Alert.alert("Please select a category");
      return;
    }

    navigation.navigate('ProductEntry4', {
      sentimental,
      usage,
      category: selected.value
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What is the product category?</Text>

      {categoryOptions.map((cat) => (
        <TouchableOpacity
          key={cat.value}
          style={[
            styles.option,
            selected?.value === cat.value && styles.selected
          ]}
          onPress={() => setSelected(cat)}
        >
          <Text
            style={[
              styles.optionText,
              selected?.value === cat.value && styles.selectedText
            ]}
          >
            {cat.label}
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3c4a2a',
    marginBottom: 24,
    textAlign: 'center',
  },
  option: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: '#D4EC8F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderWidth: 2,
    borderColor: '#3c4a2a',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3c4a2a',
  },
  selectedText: {
    color: '#3c4a2a'
  }
});
