import {StyleSheet, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default DrawerIcon = props => {
  return (
    <View
      style={{
        backgroundColor: props.backgroundColor,
        borderRadius: 25,
        width: 60,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Ionicons name={props.iconName} color={props.iconColor} size={25} />
    </View>
  );
};

const styles = StyleSheet.create({});
