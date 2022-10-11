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
import {COLORS} from '../../../theme/Color';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Payment = ({navigation}) => {
  const [loading, setLoading] = useState(false);
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
              <Text style={styles.headerTxt}>Payment Method</Text>
              <View style={styles.iconButton}>
                <Ionicons name="arrow-back-sharp" />
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Payment;

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
});
