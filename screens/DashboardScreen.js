import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DashboardTip from '../components/DashboardTip';
import { auth } from '../firebase'; // ← added

export default function DashboardScreen({ navigation }) {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    } catch (err) {
      console.error('Logout error:', err);
      Alert.alert('Error', 'Could not log out. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />

          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('AccountInfo')}
            >
              <Feather name="user" size={24} color="#3c4a2a" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleLogout}
            >
              <Feather name="log-out" size={24} color="#3c4a2a" />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.welcome}>Welcome to Sufa</Text>
        <Text style={styles.subtitle}>Dashboard</Text>

        {/*  Günlük sürdürülebilirlik ipucu */}
        <DashboardTip />

        {/* Grid */}
        <View style={styles.grid}>
          <TouchableOpacity
            style={[styles.card, styles.cardFull]}
            onPress={() => navigation.navigate('ProductEntry1')}
          >
            <Feather name="plus" size={22} color="#3c4a2a" style={styles.icon} />
            <Text style={styles.cardText}>
              Add{'\n'}Product
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('MyReports')}
          >
            <Feather name="bar-chart" size={22} color="#3c4a2a" style={styles.icon} />
            <Text style={styles.cardText}>
              Analysis{'\n'}Reports
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('RecyclingCenters')}
          >
            <Feather name="map" size={22} color="#3c4a2a" style={styles.icon} />
            <Text style={styles.cardText}>
              Recycling{'\n'}Locations
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DonationCenters')}
          >
            <Feather name="gift" size={22} color="#3c4a2a" style={styles.icon} />
            <Text style={styles.cardText}>
              Donation{'\n'}Locations
            </Text>
          </TouchableOpacity>

          {/* Burada UpcyclingIdeas yerine UpcycleMenu’e yönlendiriyoruz */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('UpcycleMenu')}
          >
            <Feather name="zap" size={22} color="#3c4a2a" style={styles.icon} />
            <Text style={styles.cardText}>
              Upcycle{'\n'}Options
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8ffe6',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
  welcome: {
    fontSize: 16,
    color: '#3c4a2a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#3c4a2a',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#e0f2b2',
    borderRadius: 16,
    width: '48%',
    height: 130,
    marginBottom: 20,
    padding: 16,
    justifyContent: 'space-between',
  },
  cardFull: {
    width: '100%',
    height: 130,
  },
  icon: {
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3c4a2a',
    textAlign: 'left',
    lineHeight: 22,
  },
});