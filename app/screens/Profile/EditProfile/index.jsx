import React, {useState} from 'react';
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
import {useAuth} from '../../../contexts/auth';
import {COLORS} from '../../../theme/Color';
import {useUpdateCustomer} from '../../../services/auth';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomInput from '../../../components/CustomInput';

const EditProfile = ({navigation}) => {
  const {user, reloadUser} = useAuth();
  const [loading, setLoading] = useState(false);
  const [updateInfo, {}] = useUpdateCustomer();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      phone: user?.phoneNumber,
      email: user?.emailAddress,
    },
  });

  const onSubmit = async input => {
    setLoading(true);
    const {firstName, lastName, phone} = input;

    await updateInfo({
      variables: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phone.replace(/\s/g, ''),
      },
    });
    await reloadUser();
    setLoading(false);
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container} scrollEnabled={false}>
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
              <Text style={styles.headerTxt}>Edit Profle</Text>
              <View style={styles.iconButton}>
                <Ionicons name="arrow-back-sharp" />
              </View>
            </View>
            <View style={styles.profileTab}>
              <View style={{paddingLeft: 50, paddingRight: 25}}>
                <Image
                  source={{
                    uri: 'https://i.imgur.com/DKiC9TV.png?preset=small',
                  }}
                  style={styles.img}
                />
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity
                  style={[
                    styles.outlinedButton,
                    {borderColor: COLORS.secondary},
                  ]}>
                  <Ionicons name="image-outline" color={'black'} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.outlinedButton,
                    {borderColor: COLORS.primary},
                  ]}>
                  <Ionicons name="trash-outline" color={'black'} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{width: '60%'}}>
                <CustomInput
                  name="firstName"
                  placeHolder="First Name"
                  control={control}
                  rules={{required: 'First Name is required.'}}
                />
              </View>
              <View style={{width: '40%', paddingLeft: 10}}>
                <CustomInput
                  name="lastName"
                  placeHolder="Last Name"
                  control={control}
                  rules={{required: 'Last Name is required.'}}
                />
              </View>
            </View>

            <CustomInput
              name="phone"
              placeHolder="Phone Number"
              keyboardType={'numeric'}
              control={control}
            />
            <CustomInput
              name="email"
              placeHolder="Email"
              control={control}
              editable={false}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Save change</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

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
  outlinedButton: {
    padding: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    borderWidth: 2,
    borderRadius: 20,
    marginVertical: 10,
  },

  img: {
    width: 150,
    height: 150,
    borderRadius: 150,
    resizeMode: 'contain',
  },
  profileTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
});
