import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function AnalyzingScreen({ navigation, route }) {
  const { suggestion } = route.params || { suggestion: 'recycle' };

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Recommendation', { suggestion });
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analyzing your product...</Text>
      <ActivityIndicator size="large" color="#3c4a2a" style={{ marginTop: 24 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8ffe6' },
  title: { fontSize: 20, fontWeight: '600', color: '#3c4a2a', textAlign: 'center' },
});
