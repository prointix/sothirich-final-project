import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useRegisterUser} from '../../services/auth';
import {COLORS} from '../../theme/Color';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';

const SignUp = ({navigation}) => {
  const [register, {loading, error}] = useRegisterUser();
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = input => {
    const {firstName, lastName, password, email, phone} = input;
    register({
      variables: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        phoneNumber: phone,
      },
    });

    if (!error) {
      reset();
      Alert.alert('Success', 'Account created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container} scrollEnabled={false}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={'position'}>
            <Spinner visible={loading} />
            <View style={styles.header}>
              <Pressable onPress={() => navigation.goBack()}>
                <Ionicons name="close" color={'black'} size={32} />
              </Pressable>
              <Text>
                <Text style={[styles.boldText, {color: COLORS.primary}]}>
                  Der
                </Text>
                <Text style={[styles.boldText, {color: COLORS.black}]}>
                  Tinh
                </Text>
              </Text>
              <Pressable>
                <Ionicons name="close" />
              </Pressable>
            </View>

            <View style={{padding: 30}}>
              <Text style={styles.title}>Sign Up</Text>
              <CustomInput
                name="firstName"
                placeHolder="First Name"
                control={control}
                rules={{required: 'First Name is required.'}}
              />
              <CustomInput
                name="lastName"
                placeHolder="Last Name"
                control={control}
                rules={{required: 'Last Name is required.'}}
              />
              <CustomInput
                name="phone"
                placeHolder="Phone Number"
                keyboardType={'numeric'}
                control={control}
              />
              <CustomInput
                name="email"
                placeHolder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                control={control}
                rules={{
                  required: 'Email is required.',
                  pattern: {
                    value: reg,
                    message: 'Email is Invalid.',
                  },
                }}
              />
              <CustomInput
                name="password"
                placeHolder="Password"
                secureTextEntry={true}
                autoCapitalize="none"
                control={control}
                rules={{
                  required: 'Password is required.',
                  minLength: {
                    value: 8,
                    message: 'Password should be minimum 8 characters long.',
                  },
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <View style={styles.switchText}>
                <Text style={{color: COLORS.black}}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
                  <Text style={{color: COLORS.secondary, fontWeight: 'bold'}}>
                    {' '}
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 23,
  },
  title: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontSize: 30,
    paddingBottom: 40,
  },
  button: {
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
  switchText: {
    paddingVertical: 10,
    fontSize: 15,
    flexDirection: 'row',
    alignSelf: 'center',
  },
});

export default SignUp;
