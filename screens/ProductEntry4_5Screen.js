import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';

const priceOptions = [
  "Free / gifted",
  "0-3000",
  "3000 TL +"
];

export default function ProductEntry4_5Screen({ route, navigation }) {
  const { sentimental, usage, category, material } = route.params;
  const [selectedPrice, setSelectedPrice] = useState(null);

  const handleContinue = () => {
    if (!selectedPrice) {
      return Alert.alert("Please select a price range");
    }

    navigation.navigate('ProductEntry4_3', {
      sentimental,
      usage,
      category,
      material,
      price: selectedPrice
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>How much did this item cost?</Text>

      {priceOptions.map((price) => (
        <TouchableOpacity
          key={price}
          style={[
            styles.option,
            selectedPrice === price && styles.selected
          ]}
          onPress={() => setSelectedPrice(price)}
        >
          <Text
            style={[
              styles.optionText,
              selectedPrice === price && styles.selectedText
            ]}
          >
            {price}
          </Text>
        </TouchableOpacity>
      ))}

      <PrimaryButton title="Next" onPress={handleContinue} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8ffe6',
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
    fontWeight: '600',
    color: '#3c4a2a',
  },
  selectedText: {
    color: '#3c4a2a',
    fontWeight: '700'
  }
});
