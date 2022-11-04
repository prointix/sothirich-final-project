import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ListItem} from '../../components/CartItem';
import {useAuth} from '../../contexts/auth';
import {
  useGetPayment,
  useGetShipping,
  useSetOrderBillingAddress,
  useSetOrderShippingAddress,
  useSetPaymentMethod,
  useSetShipping,
  useSetState,
} from '../../services/auth';
import {COLORS} from '../../theme/Color';
import CustomModal from './CustomModal';
const Payment = ({navigation}) => {
  const {shippingAddress, itemsCart, billingAddress, reloadCart, reloadUser} =
    useAuth();
  const [billAddress, setBillAddress] = useState({});
  const [setShippingMthod, {}] = useSetShipping();
  const [setOrderShipp, {}] = useSetOrderShippingAddress();
  const [setOrderBilll, {}] = useSetOrderBillingAddress();
  const [setState, {}] = useSetState();
  const [setPaymentMethd, {}] = useSetPaymentMethod();

  const [loading, setLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [shippingModal, setShippingModal] = useState(false);

  const {data} = useGetPayment();
  const [paymentMethod, setPaymentMethod] = useState();
  const [selectedPayMethod, setSelectedPayMethod] = useState({});

  const {data: data1} = useGetShipping();
  const [shippingMethod, setShippingMethod] = useState();
  const [selectedShipMethod, setSelectedShipMethod] = useState({});

  useEffect(() => {
    itemsCart?.totalQuantity === 0 && navigation.goBack();

    data && setPaymentMethod(data.eligiblePaymentMethods);
    data1 && setShippingMethod(data1.eligibleShippingMethods);
    data1 && setSelectedShipMethod(itemsCart?.shippingLines[0]);

    billingAddress
      ? setBillAddress(billingAddress)
      : setBillAddress(shippingAddress);
  }, [data, data1, billingAddress, itemsCart]);

  const setOrderShipAdd = async () => {
    await setOrderShipp({
      variables: {
        fullName: shippingAddress.fullName,
        streetLine1: shippingAddress.streetLine1,
        streetLine2: shippingAddress.streetLine2,
        city: shippingAddress.city,
        province: shippingAddress.province,
        postalCode: shippingAddress.postalCode,
        countryCode: shippingAddress.country.code,
        phoneNumber: shippingAddress.phoneNumber,
      },
    });
  };

  const setOrderBillAdd = async () => {
    await setOrderBilll({
      variables: {
        fullName: billAddress.fullName,
        streetLine1: billAddress.streetLine1,
        streetLine2: billAddress.streetLine2,
        city: billAddress.city,
        province: billAddress.province,
        postalCode: billAddress.postalCode,
        countryCode: billAddress.country?.code,
        phoneNumber: billAddress.phoneNumber,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.header}>
        <TouchableOpacity hitSlop={20} onPress={() => navigation.goBack()}>
          <View style={[styles.iconButton, {backgroundColor: COLORS.gray}]}>
            <Ionicons name="arrow-back-sharp" color={'black'} size={32} />
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Order Confirmation</Text>
        <View style={styles.iconButton}>
          <Ionicons name="arrow-back-sharp" />
        </View>
      </View>

      <ScrollView>
        <TouchableOpacity
          style={styles.boxshadow}
          onPress={() => navigation.navigate('Address')}>
          <Ionicons
            name="location-outline"
            color={'black'}
            size={20}
            style={{alignSelf: 'flex-start', paddingRight: 5}}
          />
          <View style={{flex: 1}}>
            <Text style={[styles.boldTxt, {textDecorationLine: 'underline'}]}>
              Shipping to
            </Text>
            {shippingAddress.streetLine1 ? (
              <>
                {shippingAddress.fullName && (
                  <Text style={{color: 'black'}}>
                    {shippingAddress.fullName}
                  </Text>
                )}
                <Text style={{color: 'black'}}>
                  {shippingAddress.phoneNumber}
                </Text>
                <Text style={{color: 'black'}}>
                  {shippingAddress.streetLine1}
                  {', '}
                  {shippingAddress.city}
                  {shippingAddress.city && shippingAddress.province && ', '}
                  {shippingAddress.province && shippingAddress.province}
                  {', '}
                  {shippingAddress.country?.name}
                  {shippingAddress.postalCode &&
                    ', ' + shippingAddress.postalCode}
                </Text>
              </>
            ) : (
              <Text style={styles.boldTxt}>: </Text>
            )}
          </View>
          <Ionicons
            name="md-chevron-forward-sharp"
            color={'black'}
            size={20}
            style={{justifyContent: 'flex-end'}}
          />
        </TouchableOpacity>

        <CustomModal
          name="Payment Method"
          data={paymentMethod}
          modal={paymentModal}
          selected={selectedPayMethod}
          onChange={data => setSelectedPayMethod(data)}
          onClose={state => setPaymentModal(state)}
        />

        <TouchableOpacity
          style={styles.boxshadow}
          onPress={() => setPaymentModal(!paymentModal)}>
          <Ionicons
            name="cash-outline"
            color={'black'}
            size={20}
            style={{alignSelf: 'flex-start', paddingRight: 5}}
          />
          <View style={{flex: 1}}>
            <Text style={[styles.boldTxt, {textDecorationLine: 'underline'}]}>
              Payment Method
            </Text>
            {selectedPayMethod ? (
              <Text style={styles.boldTxt}>: {selectedPayMethod.name} </Text>
            ) : (
              <Text />
            )}
          </View>
          <Ionicons
            name="md-chevron-forward-sharp"
            color={'black'}
            size={20}
            style={{justifyContent: 'flex-end'}}
          />
        </TouchableOpacity>

        <CustomModal
          name="Shipping Method"
          data={shippingMethod}
          modal={shippingModal}
          selected={selectedShipMethod}
          onClose={state => setShippingModal(state)}
          onChange={async data => {
            setLoading(true);
            await setShippingMthod({
              variables: {
                id: data.id,
              },
            });
            await reloadCart();
            setLoading(false);
          }}
        />

        <View style={styles.boxshadow}>
          <Ionicons
            name="cart-outline"
            color={'black'}
            size={20}
            style={{alignSelf: 'flex-start', paddingRight: 5}}
          />
          <View style={{flex: 1}}>
            <Text style={[styles.boldTxt, {textDecorationLine: 'underline'}]}>
              Items
            </Text>
            <FlatList
              data={itemsCart?.lines}
              renderItem={({item}) => (
                <ListItem items={item} reload={() => reloadCart()} />
              )}
              style={{padding: 15, paddingLeft: 0}}
            />
            <TouchableOpacity
              style={{flexDirection: 'row', marginTop: -10}}
              onPress={() => setShippingModal(!shippingModal)}>
              <View style={{flex: 1}}>
                {itemsCart?.shippingLines[0] ? (
                  <Text style={styles.boldTxt}>
                    {selectedShipMethod?.shippingMethod
                      ? selectedShipMethod.shippingMethod.name
                      : selectedShipMethod?.name}
                    : ${' '}
                    {(selectedShipMethod?.price / 100)
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                ) : (
                  <Text style={styles.boldTxt}>: </Text>
                )}
              </View>
              <Ionicons
                name="md-chevron-forward-sharp"
                color={'black'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.boxshadow}>
          <Ionicons
            name="server-outline"
            color={'black'}
            size={20}
            style={{alignSelf: 'flex-start', paddingRight: 5}}
          />
          <View style={{flex: 1}}>
            <Text style={styles.boldTxt}>Summary</Text>
            <View style={styles.summList}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>Total items cost </Text>
              </View>
              <Text style={{color: 'black', justifyContent: 'flex-end'}}>
                ${' '}
                {(itemsCart?.subTotal / 100)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>

            <View style={styles.summList}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>
                  Tax {itemsCart?.taxSummary[0]?.taxRate}%
                </Text>
              </View>
              <Text style={{color: 'black', justifyContent: 'flex-end'}}>
                ${' '}
                {(itemsCart?.taxSummary[0]?.taxTotal / 100)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>

            <View style={styles.summList}>
              <View style={{flex: 1}}>
                <Text style={{color: 'black'}}>Total shipping</Text>
              </View>
              <Text style={{color: 'black', justifyContent: 'flex-end'}}>
                ${' '}
                {(itemsCart?.shippingWithTax / 100)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>

            <View style={[styles.summList, {borderBottomWidth: 0}]}>
              <View style={{flex: 1}}>
                <Text />
              </View>
              <Text style={[styles.boldTxt, {justifyContent: 'flex-end'}]}>
                ${' '}
                {(itemsCart?.totalWithTax / 100)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
          </View>
          <Ionicons
            name="md-chevron-forward-sharp"
            color={'#F5F6F6'}
            size={20}
            style={{justifyContent: 'flex-end'}}
          />
        </View>
      </ScrollView>
      <View style={{paddingVertical: 10, borderTopWidth: 0.5}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[styles.boldTxt, {fontSize: 18, paddingHorizontal: 8}]}>
              ${' '}
              {(itemsCart?.totalWithTax / 100)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <View style={{width: '60%', paddingRight: 10}}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor:
                    shippingAddress.streetLine1 &&
                    selectedPayMethod.id &&
                    itemsCart?.shippingLines[0]
                      ? COLORS.primary
                      : COLORS.gray,
                },
              ]}
              disabled={
                shippingAddress.streetLine1 &&
                selectedPayMethod.id &&
                itemsCart?.shippingLines[0]
                  ? false
                  : true
              }
              onPress={async () => {
                setLoading(true);
                await setOrderShipAdd();
                await setOrderBillAdd();
                await setState({variables: {state: 'ArrangingPayment'}});
                setPaymentMethd({
                  variables: {method: selectedPayMethod.code},
                });
                await reloadUser();
                await reloadCart();
                setLoading(false);
                Alert.alert(
                  'You are all set',
                  'Your purchase was successful.',
                  [
                    {
                      text: 'OK',
                      onPress: () => {
                        navigation.goBack();
                      },
                    },
                  ],
                );
              }}>
              <Text style={{color: 'white'}}> Purchase</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
  boxshadow: {
    flexDirection: 'row',
    margin: 10,
    padding: 10,
    backgroundColor: '#F5F6F6',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  summList: {
    flex: 1,
    paddingVertical: 5,
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    paddingRight: 5,
  },
  modalTransparent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBoxShadow: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
  },
});

export default Payment;
