import React from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {COLORS} from '../../theme/Color';

const Splash = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
});
