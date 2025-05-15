import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

const conditionOptions = [
  "New / Excellent",
  "Some damage",
  "Unwearable"
];

export default function ProductEntry2Screen({ navigation, route }) {
  const [selectedCondition, setSelectedCondition] = useState(null);

  const handleNext = () => {
    if (!selectedCondition) {
      Alert.alert("Please select the item's condition");
      return;
    }

    navigation.navigate('ProductEntry3', {
      ...route.params,
      usage: selectedCondition
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>What is the item's condition?</Text>

      {conditionOptions.map((cond) => (
        <TouchableOpacity
          key={cond}
          style={[
            styles.option,
            selectedCondition === cond && styles.selected
          ]}
          onPress={() => setSelectedCondition(cond)}
        >
          <Text
            style={[
              styles.optionText,
              selectedCondition === cond && styles.selectedText
            ]}
          >
            {cond}
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
