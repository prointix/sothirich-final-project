import React, {useState, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
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
  const [term, setTerm] = useState('');
  const {loading, data} = useAllProducts();
  const {itemsCart, signed} = useAuth();

  useEffect(() => {
    if (loading === false && data) {
      setItems(
        data.products.items.filter(item =>
          item.name.toLowerCase().match(term.trim().toLowerCase()),
        ),
      );
    }
  }, [loading, data, term]);

  onItemClicked = slug => {
    navigation.navigate('Product', {productSlug: slug});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner visible={loading} />
      <View style={styles.header}>
        <TouchableOpacity hitSlop={20} onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" color={'black'} size={32} />
        </TouchableOpacity>
        <Text style={styles.textContainer}>
          <Text style={styles.text}>Der</Text>
          <Text>Tinh</Text>
        </Text>
        <TouchableOpacity
          hitSlop={20}
          onPress={() =>
            signed ? navigation.navigate('Cart') : navigation.navigate('SignIn')
          }>
          <Ionicons name="cart-outline" color={'black'} size={32} />
          {itemsCart && itemsCart?.totalQuantity !== 0 && (
            <View style={styles.notify} />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for anything"
          placeholderTextColor={'gray'}
          onChangeText={setTerm}
          value={term}
          style={{color: 'black', width: '90%'}}
        />
        <TouchableOpacity
          hitSlop={20}
          onPress={() => {
            term.length === 0 || setTerm('');
          }}>
          <Ionicons
            name={term.length === 0 ? 'search' : 'backspace-outline'}
            color={'black'}
            size={23}
          />
        </TouchableOpacity>
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
