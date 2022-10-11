import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Controller} from 'react-hook-form';
import {COLORS} from '../theme/Color';
import IntlPhoneField from 'react-native-intl-phone-field';
import countryList from 'react-select-country-list';

const CustomInput = props => {
  const [valid, setValid] = useState(true);
  const [list, setList] = useState({});

  const options = countryList().getLabels();

  useEffect(() => {
    setList(options.slice(0, 5));
  }, []);

  return (
    <Controller
      {...props}
      rules={
        props.name === 'phone'
          ? {validate: () => valid || 'Phone number is invalid.'}
          : props.name === 'country'
          ? {
              required: 'Country is required.',
              validate: () => valid || 'Country is invalid.',
            }
          : props.rules
      }
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.txtContainer,
              {borderColor: error ? COLORS.error : COLORS.black},
            ]}>
            {props.name === 'phone' ? (
              <IntlPhoneField
                flagUndetermined="?"
                defaultValue={value}
                onValueUpdate={onChange}
                onValidation={isValid => setValid(isValid)}
                defaultCountry="KH"
                defaultPrefix="+855"
                defaultFlag="🇰🇭"
                flagTextStyle={{color: 'black'}}
                textInputStyle={{color: 'black'}}
                containerStyle={{borderColor: '#0000'}}
              />
            ) : (
              <>
                <TextInput
                  value={value}
                  style={
                    props.editable === false
                      ? {color: '#808080'}
                      : {color: COLORS.black}
                  }
                  onBlur={onBlur}
                  onChangeText={txt => {
                    setValid(false);
                    props.name === 'country' &&
                      setList(
                        options.filter(item =>
                          item.toLowerCase().includes(txt.toLowerCase()),
                        ),
                      );
                    onChange(txt);
                  }}
                  placeholder={props.placeHolder}
                  placeholderTextColor={'#808080'}
                  secureTextEntry={props.secureTextEntry}
                  keyboardType={props.keyboardType}
                  autoCapitalize={props.autoCapitalize}
                  editable={props.editable}
                />
                {/* (props.name === 'country' &&
                  !countryList().getValue(value)) ||
                  value?.length !== 0 */}
                {props.name === 'country' &&
                  countryList().getValue(value)?.length !== 2 &&
                  value?.length !== 0 && (
                    <>
                      {list[0] && (
                        <TouchableOpacity
                          onPress={() => {
                            onChange(list[0]);
                            setValid(true);
                            setList({});
                          }}
                          style={{
                            borderTopColor: 'black',
                            borderTopWidth:
                              value?.length === 0 && !valid ? 0 : valid ? 0 : 1,
                          }}>
                          <Text style={{color: 'black', paddingVertical: 8}}>
                            {list[0]}
                          </Text>
                        </TouchableOpacity>
                      )}
                      {list[1] && (
                        <TouchableOpacity
                          onPress={() => {
                            onChange(list[1]);
                            setValid(true);
                            setList({});
                          }}>
                          <Text style={{color: 'black', paddingVertical: 8}}>
                            {list[1]}
                          </Text>
                        </TouchableOpacity>
                      )}
                      {list[2] && (
                        <TouchableOpacity
                          onPress={() => {
                            onChange(list[2]);
                            setValid(true);
                            setList({});
                          }}>
                          <Text style={{color: 'black', paddingVertical: 8}}>
                            {list[2]}
                          </Text>
                        </TouchableOpacity>
                      )}
                      {list[3] && (
                        <TouchableOpacity
                          onPress={() => {
                            onChange(list[3]);
                            setValid(true);
                            setList({});
                          }}>
                          <Text style={{color: 'black', paddingVertical: 8}}>
                            {list[3]}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </>
                  )}
              </>
            )}
          </View>

          {error && (
            <Text style={styles.errorTxt}>{error.message || 'Error'}</Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  txtContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  errorTxt: {
    color: COLORS.error,
    alignSelf: 'stretch',
    fontStyle: 'italic',
  },
  picker: {
    height: 50,
    width: 200,
  },
});
