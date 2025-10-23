import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import CompanySetup from '../components/CompanySetup';

const CompanySetupScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <CompanySetup />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default CompanySetupScreen;