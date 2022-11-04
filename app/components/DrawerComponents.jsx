import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
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
        <TouchableOpacity
          hitSlop={20}
          onPress={() => props.navigation.closeDrawer()}>
          <Ionicons name="close" color={'black'} size={32} />
        </TouchableOpacity>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Der</Text>
          <Text>Tinh</Text>
        </Text>
        <TouchableOpacity hitSlop={20}>
          <Ionicons name="close" />
        </TouchableOpacity>
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
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  profileTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  bigText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.black,
  },
  editButton: {
    padding: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    borderColor: COLORS.secondary,
    borderWidth: 2,
    marginTop: 15,
    borderRadius: 20,
  },
});
