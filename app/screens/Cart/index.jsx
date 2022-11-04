import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListItem} from '../../components/CartItem';
import {useAuth} from '../../contexts/auth';
import {COLORS} from '../../theme/Color';

const Cart = ({navigation}) => {
  const {itemsCart, reloadCart} = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity hitSlop={20} onPress={() => navigation.goBack()}>
          <View style={[styles.iconButton, {backgroundColor: COLORS.gray}]}>
            <Ionicons name="arrow-back-sharp" color={'black'} size={32} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Shop Cart</Text>
        <View style={styles.iconButton}>
          <Ionicons name="arrow-back-sharp" />
        </View>
      </View>
      {itemsCart?.totalQuantity ? (
        <>
          <View style={{flex: 1}}>
            <FlatList
              data={itemsCart.lines}
              renderItem={({item}) => (
                <ListItem items={item} reload={() => reloadCart()} />
              )}
              style={{padding: 15}}
            />
          </View>
          <View style={{borderTopWidth: 2, paddingVertical: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: '40%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={[
                    styles.boldTxt,
                    {fontSize: 18, paddingHorizontal: 8},
                  ]}>
                  ${' '}
                  {(itemsCart.subTotal / 100)
                    .toFixed(2)
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Text>
              </View>
              <View style={{width: '60%', paddingRight: 10}}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    itemsCart.totalQuantity
                      ? {backgroundColor: COLORS.primary}
                      : {backgroundColor: COLORS.gray},
                  ]}
                  disabled={itemsCart.totalQuantity ? false : true}
                  onPress={() => navigation.replace('Payment')}>
                  <Text style={{color: 'white'}}> Proceed to Payment</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : (
        <View style={{justifyContent: 'center', flex: 1}}>
          <Image
            source={{uri: 'https://i.imgur.com/vOByH7v.png'}}
            style={styles.img}
          />
          <Text style={{color: 'black', alignSelf: 'center'}}>
            You haven't added anything to your cart yet!
          </Text>
          <View
            style={{
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={[styles.outlinedButton, {borderColor: COLORS.primary}]}
              onPress={() => navigation.navigate('Home')}>
              <Text style={{color: 'black'}}>Browse</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 15,
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
  boldTxt: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  outlinedButton: {
    padding: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 10,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});

export default Cart;
