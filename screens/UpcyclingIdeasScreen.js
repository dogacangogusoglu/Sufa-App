import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, FlatList, Linking, Alert } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

const ideasByCategory = {
  tops_dresses: [
    "Crop the shirt and add fringe",
    "Use the fabric for scrunchies",
    "Turn an old dress into a two-piece outfit",
    "Frame embroidery from the chest area",
    "Make headbands from sleeves"
  ],
  bottoms: [
    "Turn old jeans into a skirt",
    "Cut sweatpants into summer shorts",
    "Make a pouch from trouser pockets",
    "Use linen pants for storage bins",
    "Sew thick cotton pants into dog toys"
  ],
  undergarments: [
    "Use lace for small pouches",
    "Make reusable cotton pads",
    "Turn bras into bra bags",
    "DIY bracelets from elastic bands",
    "Make heat packs from old socks"
  ]
};

export default function UpcyclingIdeasScreen({ route, navigation }) {
  const { category, fromAnalysis } = route.params || {};
  const isFiltered = !!category;

  let ideas = [];
  if (isFiltered) {
    ideas = ideasByCategory[category] || [];
  } else {
    Object.values(ideasByCategory).forEach(arr => {
      ideas = [...ideas, ...arr];
    });
  }

  const pinterestSearchUrl = isFiltered
    ? `https://www.google.com/search?q=${encodeURIComponent(category.replace('_', ' ') + " upcycling ideas site:pinterest.com")}`
    : null;

  const handleOpenPinterest = async () => {
    try {
      const supported = await Linking.canOpenURL(pinterestSearchUrl);
      if (supported) {
        await Linking.openURL(pinterestSearchUrl);
      } else {
        Alert.alert("Error", "Can't open Pinterest search link.");
      }
    } catch (err) {
      Alert.alert("Error", "Something went wrong while opening the link.");
      console.error(err);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.ideaCard}>
      <Text style={styles.ideaText}>• {item}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {isFiltered
          ? `Upcycle Ideas for Your ${category.replace('_', ' ')}`
          : 'Upcycle Ideas'}
      </Text>

      <FlatList
        data={ideas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />

      {pinterestSearchUrl && (
        <PrimaryButton
          title="See More on Pinterest"
          onPress={handleOpenPinterest}
        />
      )}

      
      {!fromAnalysis && (
        <PrimaryButton
          title="Back"
          onPress={() => navigation.goBack()}
          style={{ marginTop: 0 }}
        />
      )}
      {fromAnalysis && (
        <PrimaryButton
          title="Back"
          onPress={() => navigation.goBack()}
          style={{ marginTop: 12 }}
        />
      )}

      
      <PrimaryButton
        title="Back to Dashboard"
        onPress={() => navigation.navigate('Dashboard')}
        style={{ marginTop: 12 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8ffe6', padding: 24 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2d2d2d',
    textAlign: 'left',
  },
  ideaCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  ideaText: {
    fontSize: 16,
    color: '#3c4a2a',
    fontWeight: '500',
  },
});