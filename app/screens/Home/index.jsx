import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import {COLORS} from '../../theme/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAllProducts} from '../../services/auth';
import {FlatGrid} from 'react-native-super-grid';
import Spinner from 'react-native-loading-spinner-overlay';
import GridItem from '../../components/GridItem';
import {useAuth} from '../../contexts/auth';

const Home = ({navigation}) => {
  const [items, setItems] = useState([]);
  const {loading, data} = useAllProducts();

  const {itemsCart, signed} = useAuth();

  useEffect(() => {
    if (loading === false && data) {
      setItems(data.products.items);
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
        <Pressable
          onPress={() =>
            signed ? navigation.navigate('Cart') : navigation.navigate('SignIn')
          }>
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
      <FlatGrid
        data={items}
        itemDimension={150}
        style={styles.gridView}
        renderItem={({item}) => (
          <GridItem
            name={item.name}
            price={item.variants[0].price}
            image={item.assets[0].source}
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
  text: {
    color: COLORS.primary,
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
  searchContainer: {
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 30,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#0000',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
});

export default Home;
