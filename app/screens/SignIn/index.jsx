import React, {useState, useEffect} from 'react';
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
import {useLogin} from '../../services/auth';
import {COLORS} from '../../theme/Color';
import {useForm} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import {useAuth} from '../../contexts/auth';

const SignIn = ({navigation}) => {
  const [loginUser, {loading}] = useLogin();
  const [isLoading, setIsLoading] = useState(false);
  const {reloadUser, reloadCart} = useAuth();

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    defaultValues: {
      password: '',
      email: '',
    },
  });

  const onSubmit = async input => {
    setIsLoading(true);
    const {email, password} = input;
    const res = await loginUser({
      variables: {
        email: email,
        password: password,
      },
    });

    if (res.data.login.id && loading === false) {
      await reloadUser();
      setIsLoading(false);
      navigation.goBack();
    } else {
      // reset();
      setIsLoading(false);
      Alert.alert(res.data.login.errorCode, res.data.login.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container} scrollEnabled={false}>
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView behavior={'position'}>
            <Spinner visible={isLoading} />
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
              <Text style={styles.title}>Sign In</Text>
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
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <View style={styles.switchText}>
                <Text style={{color: COLORS.black}}>
                  Don't have any account yet?
                </Text>
                <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                  <Text style={{color: COLORS.secondary, fontWeight: 'bold'}}>
                    {' '}
                    Register
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

export default SignIn;
