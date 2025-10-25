import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../providers/theme_provider';
import { Colors } from '../constants/Colors';
import ProfileCompletion from '../components/ProfileCompletion';

const ProfileCompletionScreen = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[theme].background }]}>
      <ProfileCompletion />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 
  },

});

export default ProfileCompletionScreen;