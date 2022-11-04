import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Pressable,
  FlatList,
  Dimensions,
} from 'react-native';
import {COLORS} from '../../../theme/Color';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAuth} from '../../../contexts/auth';
import {useDeleteAddress} from '../../../services/auth';

const Address = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [deleteAddress, {error}] = useDeleteAddress();
  const {user, reloadUser} = useAuth();
  const screen = Dimensions.get('screen');

  const removeAddress = id => {
    Alert.alert('Remove Address', `Are you sure you want to remove?`, [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'OK',
        onPress: async () => {
          setLoading(true);
          await deleteAddress({variables: {id}});
          await reloadUser();
          setLoading(false);
        },
      },
    ]);
  };

  const ListItem = ({items}) => {
    return (
      <View style={[styles.listItem, {width: screen.width - 50}]}>
        <View style={{padding: 20}}>
          {(items.defaultShippingAddress || items.defaultBillingAddress) && (
            <View style={{flexDirection: 'row'}}>
              {items.defaultShippingAddress && (
                <View style={styles.label}>
                  <Text style={{color: 'black', size: '15', fontWeight: '300'}}>
                    🚛 Default Shipping
                  </Text>
                </View>
              )}
              {items.defaultBillingAddress && (
                <View style={styles.label}>
                  <Text style={{color: 'black', size: '15', fontWeight: '300'}}>
                    📦 Default Billing
                  </Text>
                </View>
              )}
            </View>
          )}

          {items.fullName && (
            <Text style={styles.subText}>{items.fullName}</Text>
          )}
          {items.streetLine1 && (
            <Text style={styles.subText}>{items.streetLine1}</Text>
          )}
          {items.streetLine2 && (
            <Text style={styles.subText}>{items.streetLine2}</Text>
          )}
          {(items.city || items.province) && (
            <Text style={styles.subText}>
              {items.city}
              {items.city && items.province && ', '}
              {items.province && items.province}
            </Text>
          )}
          <Text style={styles.subText}>
            {items.country.name}
            {items.country.name && items.postalCode && ', '}
            {items.postalCode && items.postalCode}
          </Text>
          {items.phoneNumber && (
            <Text style={styles.subText}>{items.phoneNumber}</Text>
          )}
        </View>

        <View style={[styles.cardFooter, {width: screen.width - 50}]}>
          <View style={{width: '55%', alignItems: 'flex-end'}}>
            {items.defaultShippingAddress || items.defaultBillingAddress || (
              <TouchableOpacity
                onPress={() => removeAddress(items.id)}
                hitSlop={20}>
                <Text style={{color: COLORS.primary}}>Remove</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{width: '44%', paddingRight: 20, alignItems: 'flex-end'}}>
            <TouchableOpacity
              hitSlop={20}
              onPress={() =>
                navigation.navigate('EditAddress', {address: items})
              }>
              <Text style={{color: COLORS.secondary}}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, {padding: 15}]}>
      <Spinner visible={loading} />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <View style={[styles.iconButton, {backgroundColor: COLORS.gray}]}>
            <Ionicons name="arrow-back-sharp" color={'black'} size={32} />
          </View>
        </Pressable>
        <Text style={styles.headerTxt}>Address</Text>
        <View style={styles.iconButton}>
          <Ionicons name="arrow-back-sharp" size={32} color={'#0000'} />
        </View>
      </View>
      <View style={{marginVertical: 10, flex: 1}}>
        <FlatList
          data={user?.addresses}
          scrollEnabled
          renderItem={({item}) => <ListItem items={item} />}
          ListFooterComponent={
            <TouchableOpacity
              style={[
                styles.listItem,
                styles.addAddress,
                {width: screen.width - 50},
              ]}
              onPress={() => navigation.navigate('AddAddress')}>
              <Text style={{color: COLORS.secondary}}>+ Add new address</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerTxt: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 23,
  },
  iconButton: {
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  listItem: {
    borderColor: '#808080',
    borderWidth: 0.5,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 15,
  },
  subText: {
    fontSize: 17,
    color: '#404040',
  },
  cardFooter: {
    backgroundColor: '#e6e6e6',
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderTopColor: '#808080',
    flexDirection: 'row',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  addAddress: {
    padding: 60,
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  label: {
    marginBottom: 10,
    borderColor: 'black',
    borderWidth: 0.5,
    alignSelf: 'flex-start',
    marginRight: 10,
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 4,
    backgroundColor: '#e6e6e6',
  },
});
