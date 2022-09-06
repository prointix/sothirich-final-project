import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import {COLORS} from '../../theme/Color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getAllProducts} from '../../services/auth';
import {FlatGrid} from 'react-native-super-grid';
import Spinner from 'react-native-loading-spinner-overlay';

const Home = ({navigation}) => {
  const {data, loading, error} = getAllProducts();
  const items = data?.products.items;

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
        <Pressable>
          <Ionicons name="cart-outline" color={'black'} size={32} />
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
        data={loading ? [] : items}
        itemDimension={150}
        style={styles.gridView}
        renderItem={({item}) => (
          <View style={styles.itemContainer}>
            <Image
              source={{
                uri: `${item.assets[0].source}?preset=medium&format=webp`,
              }}
              style={{flex: 1}}
            />
            <Text style={styles.itemName}>{item.name} </Text>
            <View style={styles.itemPriceContainer}>
              <Text style={styles.itemPrice}>{item.variants[0].price} $</Text>
            </View>
          </View>
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
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 5,
    height: 250,
  },
  itemName: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },
  itemPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000',
  },
  itemPriceContainer: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '70%',
  },
});

export default Home;
