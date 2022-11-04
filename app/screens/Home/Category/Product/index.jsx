import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioButtonRN from 'radio-buttons-react-native';
import {useAddToCart, useProductDetail} from '../../../../services/auth';
import {COLORS} from '../../../../theme/Color';
import {useAuth} from '../../../../contexts/auth';

const Product = ({navigation, route}) => {
  const {reloadCart} = useAuth();
  const [loading, setLoading] = useState(false);
  const slug = route.params.productSlug;
  const [items, setItems] = useState({});
  const [addItem, {}] = useAddToCart();
  const screen = Dimensions.get('screen');

  const [list, setList] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const [error, setError] = useState('');

  const [amount, setAmount] = useState(1);

  const radioList = [];

  const onAddToCart = async () => {
    setLoading(true);
    await addItem({
      variables: {
        id: selectedItem.id,
        quantity: amount,
      },
    });
    await reloadCart();
    setLoading(false);
    navigation.goBack();
  };

  const {data} = useProductDetail(slug);

  useEffect(() => {
    if (data) {
      setItems(data.product);

      data.product.variantList?.items.map(item => {
        radioList.push({
          id: item.id,
          label: (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                paddingVertical: 5,
              }}>
              <Text
                ellipsizeMode="clip"
                numberOfLines={1}
                style={{
                  width: screen.width / 1.7,
                  color: 'black',
                }}>
                {item.name + `\n`}
              </Text>
              <Text style={{color: 'black'}}>
                $
                {(item.price / 100)
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
          ),
          price: item.price,
          stockLevel: item.stockLevel,
          value: item.sku,
        });
      });
      setList(radioList);

      if (radioList.length === 1) {
        setSelectedItem(radioList[0]);
      }
    }
  }, [, data]);

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.header}>
        <TouchableOpacity hitSlop={20} onPress={() => navigation.goBack()}>
          <View style={styles.iconButton}>
            <Ionicons name="arrow-back-sharp" color={'black'} size={32} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={{height: 250}}>
          {items.featuredAsset && (
            <Image
              source={{
                uri: `${items.featuredAsset.source}?preset=large&format=webp`,
              }}
              style={{flex: 1}}
            />
          )}
        </View>
        <View style={styles.titleContainer}>
          <View style={{width: '65%'}}>
            <Text
              style={[styles.boldTxt, {fontSize: 26}]}
              ellipsizeMode="clip"
              numberOfLines={2}>
              {items.name}
            </Text>
          </View>
          <Text style={{justifyContent: 'flex-end'}}>
            {list.length === 1 ? null : (
              <Text style={styles.description}>from </Text>
            )}
            <Text style={[styles.boldTxt, {fontSize: 16}]}>
              $
              {(list[0]?.price / 100)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </Text>
        </View>
        <Text style={styles.description}>{`\t\t` + items.description}</Text>

        {list.length === 1 ? null : (
          <View style={styles.BLContainer}>
            <Text style={[styles.boldTxt, {fontSize: 18}]}>Variation</Text>
            <Text style={styles.description}>Select one</Text>
            <View
              style={[
                styles.radioContainer,
                error === 'error' ? {backgroundColor: '#fbe2e2'} : null,
              ]}>
              <RadioButtonRN
                data={list}
                selectedBtn={item => setSelectedItem(item)}
                box={false}
                activeColor={COLORS.primary}
              />
            </View>
          </View>
        )}
      </ScrollView>

      <View style={{borderTopWidth: 2, paddingVertical: 10}}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              width: '40%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              hitSlop={20}
              onPress={() => setAmount(amount - 1)}
              disabled={amount === 1 ? true : false}>
              <View style={{borderRadius: 20}}>
                <Ionicons
                  name="md-remove-circle"
                  color={amount === 1 ? COLORS.gray : COLORS.primary}
                  size={40}
                />
              </View>
            </TouchableOpacity>
            <Text
              style={[styles.boldTxt, {fontSize: 18, paddingHorizontal: 8}]}>
              {amount}
            </Text>
            <TouchableOpacity
              hitSlop={20}
              onPress={() => setAmount(amount + 1)}>
              <View style={{borderRadius: 20}}>
                <Ionicons name="add-circle" color={COLORS.primary} size={40} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: '60%', paddingRight: 10}}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedItem.value
                  ? {backgroundColor: COLORS.primary}
                  : {backgroundColor: COLORS.gray},
              ]}
              onPress={onAddToCart}
              disabled={selectedItem.value ? false : true}>
              <Ionicons name="cart" color={'white'} size={20} />
              <Text style={{color: 'white'}}> Add to Shop cart</Text>
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
  iconButton: {
    backgroundColor: COLORS.gray,
    padding: 10,
    borderRadius: 50,
    alignSelf: 'flex-start',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  boldTxt: {
    color: COLORS.black,
    fontWeight: 'bold',
  },
  BLContainer: {
    paddingTop: 15,
    marginTop: 20,
    borderTopWidth: 2,
    borderColor: '#E0E2E2',
  },
  description: {
    color: '#888C8C',
    fontSize: 14,
    textAlign: 'justify',
  },
  radioContainer: {
    width: '100%',
  },
  button: {
    borderRadius: 10,
    width: '100%',
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Product;
