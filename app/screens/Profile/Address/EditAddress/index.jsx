import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  Pressable,
  Image,
} from 'react-native';
import {useForm} from 'react-hook-form';
import {useAuth} from '../../../../contexts/auth';
import {useAddAddress, useChangeAddress} from '../../../../services/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {COLORS} from '../../../../theme/Color';
import CustomInput from '../../../../components/CustomInput';
import countryList from 'react-select-country-list';

const EditAddress = ({navigation, route}) => {
  const {address} = route.params;
  const [EditAddress, {error, loading}] = useChangeAddress();
  const [defaultShipping, setDefaultShipping] = useState(
    address.defaultShippingAddress,
  );
  const [defaultBilling, setDefaultBilling] = useState(
    address.defaultBillingAddress,
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      fullName: address.fullName,
      streetLine1: address.streetLine1,
      streetLine2: address.streetLine2,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      country: countryList().getLabel(address.country.code),
      phone: address.phoneNumber,
    },
  });

  const onSubmit = async input => {
    const {
      fullName,
      streetLine1,
      streetLine2,
      city,
      province,
      postalCode,
      country,
      phone,
    } = input;

    let res = await EditAddress({
      variables: {
        id: address.id,
        fullName: fullName,
        streetLine1: streetLine1,
        streetLine2: streetLine2,
        city: city,
        province: province,
        postalCode: postalCode,
        countryCode: countryList().getValue(country),
        phoneNumber: phone.replace(/\s/g, ''),
        shipping: defaultShipping,
        billing: defaultBilling,
      },
    });

    console.log(res);

    if (!error) {
      Alert.alert('Success', 'Address updated successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Address');
          },
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        style={styles.container}
        scrollEnabled={false}
        nestedScrollEnabled={true}>
        <SafeAreaView style={[styles.container, {padding: 15}]}>
          <KeyboardAvoidingView behavior={'position'}>
            <Spinner visible={loading} />
            <View style={styles.header}>
              <Pressable onPress={() => navigation.goBack()}>
                <View
                  style={[styles.iconButton, {backgroundColor: COLORS.gray}]}>
                  <Ionicons name="arrow-back-sharp" color={'black'} size={32} />
                </View>
              </Pressable>
              <Text style={styles.headerTxt}>Edit Address</Text>
              <View style={styles.iconButton}>
                <Ionicons name="arrow-back-sharp" size={32} color={'#0000'} />
              </View>
            </View>

            <CustomInput
              name="fullName"
              placeHolder="Full Name (optional)"
              control={control}
            />

            <CustomInput
              name="streetLine1"
              placeHolder="Street line 1"
              control={control}
              rules={{required: 'Street line 1 is required.'}}
            />

            <CustomInput
              name="streetLine2"
              placeHolder="Street line 2 (optional)"
              control={control}
            />
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%'}}>
                <CustomInput name="city" placeHolder="City" control={control} />
              </View>
              <View style={{width: '50%', paddingLeft: 10}}>
                <CustomInput
                  name="province"
                  placeHolder="Province"
                  control={control}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <View style={{width: '60%'}}>
                <CustomInput
                  name="country"
                  placeHolder="Country"
                  control={control}
                  rules={{required: 'Country is required.'}}
                />
              </View>
              <View style={{width: '40%', paddingLeft: 10}}>
                <CustomInput
                  name="postalCode"
                  placeHolder="Postal Code"
                  keyboardType={'numeric'}
                  control={control}
                />
              </View>
            </View>

            <CustomInput
              name="phone"
              placeHolder="Phone Number"
              keyboardType={'numeric'}
              control={control}
            />
            <TouchableOpacity
              style={{flexDirection: 'row', padding: 10}}
              onPress={() => setDefaultShipping(!defaultShipping)}>
              <Fontisto
                size={20}
                name={defaultShipping ? 'checkbox-active' : 'checkbox-passive'}
                color={defaultShipping ? COLORS.secondary : COLORS.primary}
              />
              <Text style={styles.confirmText}> Default shipping address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{flexDirection: 'row', padding: 10}}
              onPress={() => setDefaultBilling(!defaultBilling)}>
              <Fontisto
                size={20}
                name={defaultBilling ? 'checkbox-active' : 'checkbox-passive'}
                color={defaultBilling ? COLORS.secondary : COLORS.primary}
              />
              <Text style={styles.confirmText}> Default billing address</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 30,
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
  submitButton: {
    marginVertical: 20,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.white,
  },
  confirmText: {
    color: COLORS.black,
    paddingLeft: 5,
  },
});
