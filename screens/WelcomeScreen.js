import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function WelcomeScreen({ navigation }) {
 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  return (
    
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.titleContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Sufa</Text>
        <Text style={styles.subtitle}>"From Waste to Wardrobe"</Text>
      </Animated.View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.buttonPrimary, styles.shadow]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonSecondary, styles.shadow]}
          onPress={() => navigation.navigate('CreateAccount')}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8ffe6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  titleContainer: {
    marginBottom: 64,
    alignItems: 'center'
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 16
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#3c4a2a',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#5a6b47'
  },
  buttonContainer: {
    width: '100%'
  },
  buttonPrimary: {
    backgroundColor: '#a6d86b',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 16
  },
  buttonSecondary: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a6d86b'
  },
  buttonText: {
    color: '#3c4a2a',
    fontSize: 16,
    fontWeight: '600'
  },

  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4
  }
});
