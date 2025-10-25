import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './app/providers/theme_provider';
import WelcomeScreen from './app/screens/WelcomeScreen';
import OnboardingScreen from './app/screens/OnboardingScreen';  
import DashboardScreen from './app/screens/DashboardScreen';   
import TaxConfigScreen from './app/screens/TaxConfigScreen';  
import DataImportScreen from './app/screens/DataImportScreen';  
import DocumentVerificationScreen from './app/screens/DocumentVerificationScreen';  
import TaxCalculationScreen from './app/screens/TaxCalculationScreen';  
import PreDeclarationSummaryScreen from './app/screens/PreDeclarationSummaryScreen';  
import DeclarationGenerationScreen from './app/screens/DeclarationGenerationScreen';  
import DeclarationSubmissionScreen from './app/screens/DeclarationSubmissionScreen';  
import DeclarationHistoryScreen from './app/screens/DeclarationHistoryScreen';  
import CompanySetupScreen from './app/screens/CompanySetupScreen';  
import ProfileCompletionScreen from './app/screens/ProfileCompletionScreen';


const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <ProfileCompletionScreen />

    </ThemeProvider>
  );
}