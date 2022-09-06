import {View, Text, StyleSheet, Pressable} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../theme/Color';

const DrawerComponents = props => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.header}>
        <Pressable onPress={() => props.navigation.closeDrawer()}>
          <Ionicons name="close" color={'black'} size={32} />
        </Pressable>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Der</Text>
          <Text>Tinh</Text>
        </Text>
        <Pressable>
          <Ionicons name="close" />
        </Pressable>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  );
};

export default DrawerComponents;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 23,
  },
  text: {
    color: COLORS.primary,
  },
});
