import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import {COLORS} from '../../../theme/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useProducts} from '../../../services/auth';
import {FlatGrid} from 'react-native-super-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import DropDownPicker from 'react-native-dropdown-picker';
import GridItem from '../../../components/GridItem';
import {useAuth} from '../../../contexts/auth';

const Products = ({navigation, route}) => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([
    {label: 'Name by ASC', value: 'nameA'},
    {label: 'Name by DESC', value: 'nameZ'},
    {label: 'Lowest Price', value: 'price0'},
    {label: 'Highest Price', value: 'price9'},
  ]);
  const [value, setValue] = useState();
  const {itemsCart} = useAuth();

  const ids = route.params.id;
  const [items, setItems] = useState([]);
  const {loading, data} = useProducts(ids, value);

  useEffect(() => {
    if (loading === false && data) {
      setItems(data.search.items);
    }
  }, [loading, data]);

  onItemClicked = slug => {
    navigation.navigate('Product', {productSlug: slug});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" color={'black'} size={32} />
        </Pressable>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Der</Text>
          <Text>Tinh</Text>
        </Text>
        <Pressable onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" color={'black'} size={32} />
          {!itemsCart || itemsCart === '0' ? null : (
            <View style={styles.notify} />
          )}
        </Pressable>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for anything"
          placeholderTextColor={'gray'}
          style={{color: 'black', width: '90%'}}
        />
        <Ionicons name="search" color={'black'} size={23} />
      </View>
      <View style={[styles.header, {paddingTop: 30}]}>
        <Text style={styles.categoryName}>{route.name}</Text>
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          setList={setList}
          items={list}
          value={value}
          placeholder={'Filter'}
          containerStyle={{
            height: 30,
            width: '50%',
            zIndex: 10,
            justifyContent: 'center',
          }}
        />
      </View>
      <FlatGrid
        data={items}
        itemDimension={150}
        style={styles.gridView}
        renderItem={({item}) => (
          <GridItem
            name={item.productName}
            price={item.price.min}
            image={item.productAsset.preview}
            onPress={() => onItemClicked(item.slug)}
          />
        )}
      />
    </SafeAreaView>
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
  textContainer: {
    fontWeight: 'bold',
    color: COLORS.black,
    fontSize: 23,
  },
  notify: {
    backgroundColor: COLORS.primary,
    width: 15,
    height: 15,
    position: 'absolute',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  text: {
    color: COLORS.primary,
  },
  searchContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  categoryName: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default Products;
