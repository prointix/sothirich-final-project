import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS} from '../../theme/Color';
import Fontisto from 'react-native-vector-icons/Fontisto';

const PaymentRadio = ({item, selected, onConfirm}) => {
  const [selectedMethod, setSelectedMethod] = useState({});

  useEffect(() => {
    selected && setSelectedMethod(selected);
  }, []);

  return (
    <>
      {item.map(item => (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 5,
          }}
          onPress={() => setSelectedMethod(item)}>
          <Fontisto
            name={
              item.code === selectedMethod.code ||
              item.code === selectedMethod.shippingMethod?.code
                ? 'radio-btn-active'
                : 'radio-btn-passive'
            }
            color={
              item.code === selectedMethod.code ||
              item.code === selectedMethod.shippingMethod?.code
                ? COLORS.primary
                : 'gray'
            }
            size={20}
          />
          <View style={{flexDirection: 'row', flex: 1}}>
            <Text style={[styles.boldTxt, {flex: 1}]}> {item.name}</Text>
            {item.price && (
              <Text
                style={{
                  color: 'black',
                }}>
                ${' '}
                {(item.price / 100)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={[
          styles.modalButton,
          {borderColor: selectedMethod.id ? COLORS.secondary : COLORS.gray},
        ]}
        onPress={() => onConfirm(selectedMethod)}
        hitSlop={20}
        disabled={selectedMethod.id ? false : true}>
        <Text style={styles.boldTxt}>Confirm</Text>
      </TouchableOpacity>
    </>
  );
};

export default PaymentRadio;

const styles = StyleSheet.create({
  boldTxt: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  modalButton: {
    padding: 5,
    paddingHorizontal: 15,
    alignSelf: 'center',
    borderWidth: 2,
    marginTop: 15,
    borderRadius: 20,
  },
});
