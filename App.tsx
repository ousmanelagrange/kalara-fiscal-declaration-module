import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './app/providers/theme_provider';
import WelcomeScreen from './app/screens/WelcomeScreen';
import OnboardingScreen from './app/screens/OnboardingScreen';  // Nouveau
import DashboardScreen from './app/screens/DashboardScreen';   // Nouveau
import TaxConfigScreen from './app/screens/TaxConfigScreen';  // Nouveau
import DataImportScreen from './app/screens/DataImportScreen';  // Nouveau
import DocumentVerificationScreen from './app/screens/DocumentVerificationScreen';  // Nouveau
import TaxCalculationScreen from './app/screens/TaxCalculationScreen';  // Nouveau
import PreDeclarationSummaryScreen from './app/screens/PreDeclarationSummaryScreen';  // Nouveau
import DeclarationGenerationScreen from './app/screens/DeclarationGenerationScreen';  // Nouveau
import DeclarationSubmissionScreen from './app/screens/DeclarationSubmissionScreen';  // Nouveau
import DeclarationHistoryScreen from './app/screens/DeclarationHistoryScreen';  // Nouveau
import CompanySetupScreen from './app/screens/CompanySetupScreen';  // Nouveau



const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="DeclarationHistory" component={DeclarationHistoryScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="TaxConfig" component={TaxConfigScreen} />
          <Stack.Screen name="DataImport" component={DataImportScreen} />
          <Stack.Screen name="DocumentVerification" component={DocumentVerificationScreen} />
          <Stack.Screen name="TaxCalculation" component={TaxCalculationScreen} />
          <Stack.Screen name="PreDeclarationSummary" component={PreDeclarationSummaryScreen} />
          <Stack.Screen name="DeclarationGeneration" component={DeclarationGenerationScreen} />
          <Stack.Screen name="DeclarationSubmission" component={DeclarationSubmissionScreen} />
          <Stack.Screen name="CompanySetup" component={CompanySetupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}