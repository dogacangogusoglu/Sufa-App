import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../firebase';
import PrimaryButton from '../components/PrimaryButton';

export default function AccountInfoScreen({ navigation }) {
  const uid = auth.currentUser?.uid;
  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
  });

  useEffect(() => {
    if (!uid) return;
    const unsub = db
      .collection('users')
      .doc(uid)
      .onSnapshot(
        doc => {
          if (doc.exists) setInfo(doc.data());
        },
        err => {
          console.error(err);
          Alert.alert('Error', 'Could not load your info.');
        }
      );
    return () => unsub();
  }, [uid]);

  const handleSave = () => {
    if (!uid) return;

    const phoneRegex = /^5\d{9}$/;
    const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!phoneRegex.test(info.phone)) {
      Alert.alert("Invalid phone number", "Please enter a valid Turkish number (10 digits, starts with 5).");
      return;
    }

    if (!dobRegex.test(info.dob)) {
      Alert.alert("Invalid birth date", "Date of birth must be in format DD/MM/YYYY.");
      return;
    }

    if (!info.gender) {
      Alert.alert("Missing Gender", "Please select your gender.");
      return;
    }

    db.collection('users')
      .doc(uid)
      .set(info, { merge: true })
      .then(() => navigation.goBack())
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'Could not save your info.');
      });
  };

  const handleGenderSelect = () => {
    Alert.alert("Select Gender", null, [
      { text: "Female", onPress: () => setInfo({ ...info, gender: "Female" }) },
      { text: "Male", onPress: () => setInfo({ ...info, gender: "Male" }) },
      { text: "Non-binary", onPress: () => setInfo({ ...info, gender: "Non-binary" }) },
      { text: "I prefer not to say", onPress: () => setInfo({ ...info, gender: "I prefer not to say" }) },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8ffe6' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Account Info</Text>

          <TextInput
            placeholder="Full Name"
            value={info.name}
            onChangeText={text => setInfo({ ...info, name: text })}
            style={styles.input}
          />

          <TextInput
            placeholder="Email"
            value={info.email}
            editable={false}
            style={[styles.input, { backgroundColor: '#eee', color: '#777' }]}
          />

          <TextInput
            placeholder="Phone (5XXXXXXXXX)"
            value={info.phone}
            onChangeText={text =>
              setInfo({ ...info, phone: text.replace(/[^0-9]/g, '') })
            }
            style={styles.input}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TouchableOpacity
            style={styles.input}
            onPress={handleGenderSelect}
          >
            <Text style={{ color: info.gender ? '#000' : '#aaa' }}>
              {info.gender || "Select Gender"}
            </Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Date of Birth (DD/MM/YYYY)"
            value={info.dob}
            onChangeText={text => setInfo({ ...info, dob: text })}
            style={styles.input}
            keyboardType="numeric"
            maxLength={10}
          />

<PrimaryButton
  title="Back"
  onPress={() => navigation.goBack()}
  style={{ marginTop: 12 }}
/>

<PrimaryButton
  title="Save Info"
  onPress={handleSave}
  style={{ marginTop: 12 }}
/>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#2d2d2d',
    textAlign: 'left',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});
