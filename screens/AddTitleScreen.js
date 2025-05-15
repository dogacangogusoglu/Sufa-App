import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddTitleScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
   
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera permission is needed to take a photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAnalyze = () => {
    if (!title || !imageUri) {
      Alert.alert('Missing Information', 'Please enter a title and add an image.');
      return;
    }

   
    navigation.navigate('Analyzing', {
      suggestion: 'recycle', 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Add Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Old T-shirt"
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Add Image</Text>
      </TouchableOpacity>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.preview} />
      )}

      <TouchableOpacity style={styles.analyzeButton} onPress={handleAnalyze}>
        <Text style={styles.analyzeText}>Analyze</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8ffe6', padding: 24 },
  label: { fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#3c4a2a' },
  input: {
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 16,
    color: '#3c4a2a',
  },
  imageButton: {
    backgroundColor: '#a6d86b',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: { color: '#3c4a2a', fontWeight: '600' },
  preview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 24,
    borderRadius: 8,
  },
  analyzeButton: {
    backgroundColor: '#3c4a2a',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  analyzeText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});
