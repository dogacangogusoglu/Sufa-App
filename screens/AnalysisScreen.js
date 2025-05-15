import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { calculateDecisionScores } from '../utils/decisionAlgorithm';
import PrimaryButton from '../components/PrimaryButton';
import { Feather } from '@expo/vector-icons';
import { saveAnalysisReport } from '../utils/firebaseUtils';
import { saveImageToStorage } from '../utils/storageUtils'; 
import { useAnalysis } from '../context/AnalysisContext';

export default function AnalysisScreen({ route, navigation }) {
  const {
    sentimental,
    usage,
    material,
    price,
    infrastructure,
    category,
    title,
    image
  } = route.params;

  const [result, setResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(image); 
  const { addEntry } = useAnalysis();

  useEffect(() => {
    const process = async () => {
      const scores = calculateDecisionScores({
        sentimental,
        usage,
        material,
        price,
        infrastructure
      });

      setResult(scores);

      let imageUrl = image;
      try {
        imageUrl = await saveImageToStorage(image);
        setUploadedImage(imageUrl); 
      } catch (err) {
        console.warn("Image upload failed, using local URI.");
      }

      const entryData = {
        sentimental,
        usage,
        material,
        price,
        infrastructure,
        title,
        image: imageUrl,
        scores,
        type: scores.recommendation
      };

      await saveAnalysisReport(entryData).catch((err) =>
        console.error("Firebase save error:", err)
      );

      addEntry({
        ...entryData,
        date: new Date().toLocaleDateString()
      });
    };

    process();
  }, []);

  const handleImpactPress = (type) => {
    if (type === 'upcycle') {
      navigation.navigate('Impact', {
        type: 'upcycle',
        title,
        image: uploadedImage,
        category
      });
    } else {
      navigation.navigate('AnalysisDetail', {
        type,
        title,
        image: uploadedImage,
        date: new Date().toLocaleDateString(),
        fromAnalysis: true
      });
    }
  };

  if (!result) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Analyzing...</Text>
      </SafeAreaView>
    );
  }

  const options = ['recycle', 'donate', 'upcycle'];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Suggested Option</Text>

      <View style={styles.optionsWrapper}>
        {options.map((option) => {
          const isRecommended = result.recommendation === option;
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                isRecommended ? styles.recommended : styles.normal
              ]}
              onPress={() => handleImpactPress(option)}
            >
              <Text style={styles.optionText}>{option.toUpperCase()}</Text>
              {isRecommended && (
                <Feather name="check" size={20} color="#3c4a2a" style={{ marginLeft: 8 }} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      <Image source={{ uri: uploadedImage }} style={styles.image} />
      <Text style={styles.product}>{title}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ffe6',
    padding: 24,
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3c4a2a',
    marginBottom: 12,
    textAlign: 'center'
  },
  product: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 16,
    color: '#3c4a2a'
  },
  optionsWrapper: {
    width: '100%',
    marginTop: 12,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b6e158',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    marginBottom: 12,
    justifyContent: 'center',
    borderWidth: 2,
  },
  recommended: {
    borderColor: '#3c4a2a'
  },
  normal: {
    borderColor: '#b6e158'
  },
  optionText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#3c4a2a'
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginVertical: 16,
    resizeMode: 'cover'
  }
});
