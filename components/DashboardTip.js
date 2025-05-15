import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

export default function DashboardTip() {
  const [tip, setTip] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.adviceslip.com/advice')
      .then(res => res.json())
      .then(data => {
        console.log('fetched tip:', data);
        setTip(data?.slip?.advice || 'Tip yüklenemedi.');
      })
      .catch(err => {
        console.error('DashboardTip fetch error:', err);
        setTip('Tip yüklenirken hata oldu.');
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <ActivityIndicator size="small" color="#3c4a2a" style={styles.loader} />;
  }

  return (
    <View style={styles.tipBox}>
      <Text style={styles.tipTitle}>Tip of the Day</Text>
      <Text style={styles.tipText}>{tip}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    marginVertical: 12
  },
  tipBox: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3c4a2a',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#3c4a2a',
    lineHeight: 20,
  },
});
