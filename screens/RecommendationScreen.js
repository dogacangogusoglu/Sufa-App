import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function RecommendationScreen({ route, navigation }) {
  const { suggestion } = route.params;

  const options = ['recycle', 'donation', 'upcycle'];

  const getEmoji = (type) => (type === suggestion ? '✅' : '');

  const handleSelect = (choice) => {
    if (choice === 'recycle') {
      navigation.navigate('RecyclingCenters', { fromRecommendation: true });
    } else if (choice === 'donation') {
      navigation.navigate('DonationCenters', { fromRecommendation: true });
    } else {
      navigation.navigate('UpcyclingIdeas', { fromRecommendation: true });
    }
  };

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>We suggest:</Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.optionButton,
            suggestion === option && styles.highlighted,
          ]}
          onPress={() => handleSelect(option)}
        >
          <Text style={styles.optionText}>
            {capitalize(option)} {getEmoji(option)}
          </Text>
        </TouchableOpacity>
      ))}
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
    marginBottom: 32,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#b6e158',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlighted: {
    borderWidth: 2,
    borderColor: '#3c4a2a',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3c4a2a',
  },
});
