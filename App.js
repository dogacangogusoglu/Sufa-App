import './firebase';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AnalysisProvider } from './context/AnalysisContext';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import DashboardScreen from './screens/DashboardScreen';
import AccountInfoScreen from './screens/AccountInfoScreen';
import ProductEntry1Screen from './screens/ProductEntry1Screen';
import ProductEntry2Screen from './screens/ProductEntry2Screen';
import ProductEntry3Screen from './screens/ProductEntry3Screen';
import ProductEntry4Screen from './screens/ProductEntry4Screen';
import ProductEntry4_3Screen from './screens/ProductEntry4_3Screen';
import ProductEntry4_5Screen from './screens/ProductEntry4_5Screen';
import ProductEntry5Screen from './screens/ProductEntry5Screen';
import AnalysisScreen from './screens/AnalysisScreen';
import AnalyzingScreen from './screens/AnalyzingScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import RecyclingCentersScreen from './screens/RecyclingCentersScreen';
import DonationCentersScreen from './screens/DonationCentersScreen';
import UpcyclingIdeasScreen from './screens/UpcyclingIdeasScreen';
import RecycleImpactScreen from './screens/RecycleImpactScreen';
import DonationImpactScreen from './screens/DonationImpactScreen';
import UpcycleImpactScreen from './screens/UpcycleImpactScreen';
import AnalysisDetailScreen from './screens/AnalysisDetailScreen';
import ImpactScreen from './screens/ImpactScreen';
import MyReportsScreen from './screens/MyReportsScreen';
import UpcycleMenuScreen from './screens/UpcycleMenuScreen';
import UpcycleLocationsScreen from './screens/UpcycleLocationsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <AnalysisProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="AccountInfo" component={AccountInfoScreen} />
            <Stack.Screen name="ProductEntry1" component={ProductEntry1Screen} />
            <Stack.Screen name="ProductEntry2" component={ProductEntry2Screen} />
            <Stack.Screen name="ProductEntry3" component={ProductEntry3Screen} />
            <Stack.Screen name="ProductEntry4" component={ProductEntry4Screen} />
            <Stack.Screen name="ProductEntry4_3" component={ProductEntry4_3Screen} />
            <Stack.Screen name="ProductEntry4_5" component={ProductEntry4_5Screen} />
            <Stack.Screen name="ProductEntry5" component={ProductEntry5Screen} />
            <Stack.Screen name="Analysis" component={AnalysisScreen} />
            <Stack.Screen name="Analyzing" component={AnalyzingScreen} />
            <Stack.Screen name="Recommendation" component={RecommendationScreen} />
            <Stack.Screen name="RecyclingCenters" component={RecyclingCentersScreen} />
            <Stack.Screen name="DonationCenters" component={DonationCentersScreen} />
            <Stack.Screen name="UpcyclingIdeas" component={UpcyclingIdeasScreen} />
            <Stack.Screen name="UpcycleMenu" component={UpcycleMenuScreen} />
            <Stack.Screen name="UpcycleLocations" component={UpcycleLocationsScreen} />
            <Stack.Screen name="RecycleImpact" component={RecycleImpactScreen} />
            <Stack.Screen name="DonationImpact" component={DonationImpactScreen} />
            <Stack.Screen name="UpcycleImpact" component={UpcycleImpactScreen} />
            <Stack.Screen name="AnalysisDetail" component={AnalysisDetailScreen} />
            <Stack.Screen name="Impact" component={ImpactScreen} />
            <Stack.Screen name="MyReports" component={MyReportsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AnalysisProvider>
    </SafeAreaProvider>
  );
}