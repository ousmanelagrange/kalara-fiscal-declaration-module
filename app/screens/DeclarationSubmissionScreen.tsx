import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import DeclarationSubmission from '../components/DeclarationSubmission';

const DeclarationSubmissionScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <DeclarationSubmission />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default DeclarationSubmissionScreen;