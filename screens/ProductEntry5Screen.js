import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Text,
  TextInput,
  Image,
  Alert,
  StyleSheet
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

export default function ProductEntry5Screen({ route, navigation }) {
  const {
    sentimental,
    usage,
    category,
    material,
    price,
    infrastructure
  } = route.params;

  const [title, setTitle] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleAddImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        return Alert.alert('Permission required', 'Please allow media library access.');
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      const canceled = result.canceled ?? result.cancelled;
      if (canceled) return;

      const uri = result.assets ? result.assets[0].uri : result.uri;
      if (uri) setImageUri(uri);
    } catch (e) {
      console.error('ImagePicker error:', e);
      Alert.alert('Error', 'Could not open image library.');
    }
  };

  const handleAnalyze = () => {
    if (!title.trim() || !imageUri) {
      return Alert.alert('Missing info', 'Please enter title and add an image.');
    }

    navigation.navigate('Analysis', {
      sentimental,
      usage,
      category,
      material,
      price,
      infrastructure,
      title: title.trim(),
      image: imageUri,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Name Your Product</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter product title"
        placeholderTextColor="#999"
        value={title}
        onChangeText={setTitle}
      />

      {/* <-- BURASI DEĞİŞTİ --> */}
      <PrimaryButton
        title={imageUri ? 'Change Image' : 'Add Image'}
        onPress={handleAddImage}
        style={{ marginBottom: 12 }}
      />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}

      <PrimaryButton title="Analyze" onPress={handleAnalyze} />
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
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  previewImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 16,
    marginBottom: 24,
  },
});