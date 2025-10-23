import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import DocumentVerification from '../components/DocumentVerification';

const DocumentVerificationScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <DocumentVerification />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default DocumentVerificationScreen;