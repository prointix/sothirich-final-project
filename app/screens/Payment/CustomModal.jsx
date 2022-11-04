import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PaymentRadio from './PaymentRadio';
import {COLORS} from '../../theme/Color';

const CustomModal = props => {
  const [selectedData, setSelectedData] = useState({});
  const [modalVisible, setModalVisible] = useState();

  useEffect(() => {
    setModalVisible(props.modal);
    setSelectedData(props.selected);
  }, [props.modal]);

  return (
    <Modal
      isVisible={modalVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      onBackdropPress={() => props.onClose(!modalVisible)}
      backdropColor={COLORS.transparent}>
      <View style={styles.modalTransparent}>
        <View style={styles.modalBoxShadow}>
          <TouchableOpacity
            onPress={() => {
              props.onClose(!modalVisible);
            }}
            hitSlop={15}
            style={{position: 'absolute', top: 10, right: 10}}>
            <Ionicons name="close" size={30} color={COLORS.primary} />
          </TouchableOpacity>
          <Text
            style={[
              styles.boldTxt,
              {fontSize: 20, paddingBottom: 15, paddingHorizontal: 40},
            ]}>
            {props.name}
          </Text>

          <PaymentRadio
            item={props.data}
            selected={selectedData}
            onConfirm={item => {
              props.onChange(item);
              props.onClose(!modalVisible);
              setSelectedData(item);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
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
  boldTxt: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
});
