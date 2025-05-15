import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function UsageConditionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is the condition of the item?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Category')}>
        <Text style={styles.buttonText}>Unused</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Category')}>
        <Text style={styles.buttonText}>Used / Good</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Category')}>
        <Text style={styles.buttonText}>Used / Flawed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8ffe6', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: '#3c4a2a', marginBottom: 32, textAlign: 'center' },
  button: {
    backgroundColor: '#a6d86b',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: { color: '#3c4a2a', fontSize: 16, fontWeight: '600' },
});
