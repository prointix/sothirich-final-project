import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';
import {useAdjustCart, useRemoveCart} from '../services/auth';
import {COLORS} from '../theme/Color';

export const ListItem = ({items, reload}) => {
  const [editCart, {}] = useAdjustCart();
  const [removeCart, {}] = useRemoveCart();
  const amount = items.quantity;
  const [loading, setLoading] = useState(false);

  const onAddClicked = async () => {
    setLoading(true);
    await editCart({
      variables: {
        id: items.id,
        quantity: amount + 1,
      },
    });
    await reload();
    setLoading(false);
  };

  const onRemoveClicked = async () => {
    setLoading(true);

    if (amount > 1) {
      await editCart({
        variables: {
          id: items.id,
          quantity: amount - 1,
        },
      });
      await reload();
      setLoading(false);
    } else if (amount === 1) {
      setLoading(false);
      Alert.alert(
        'Remove Item',
        `Are you sure you want to remove ${items.productVariant.name} ?`,
        [
          {
            text: 'Cancel',
            onPress: () => {},
          },
          {
            text: 'OK',
            onPress: async () => {
              setLoading(true);
              await removeCart({
                variables: {
                  id: items.id,
                },
              });
              await reload();
              setLoading(false);
            },
          },
        ],
      );
    }
  };

  return (
    <View style={styles.listItem}>
      <Spinner visible={loading} />
      <Image source={{uri: items.featuredAsset.source}} style={styles.img} />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          paddingHorizontal: 10,
        }}>
        <Text
          style={[styles.subText, {paddingBottom: 5}]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {items.productVariant.name}
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={[styles.subText, {fontWeight: 'bold'}]}>
            ${' '}
            {(items.unitPrice / 100)
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.adjustButton}
              onPress={onRemoveClicked}>
              <Ionicons name="remove" size={15} color="black" />
            </TouchableOpacity>
            <Text style={styles.subText}>
              {'\t'}
              {amount}
              {'\t'}
            </Text>
            <TouchableOpacity
              style={[styles.adjustButton, {backgroundColor: COLORS.primary}]}
              onPress={onAddClicked}
              hitSlop={20}>
              <Ionicons name="add" size={15} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderBottomColor: '#404040',
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    marginBottom: 15,
    flexDirection: 'row',
  },
  subText: {
    fontSize: 17,
    color: '#404040',
  },
  adjustButton: {
    borderColor: 'black',
    borderWidth: 0.5,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray,
  },
});
