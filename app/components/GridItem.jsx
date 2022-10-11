import {Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import React, {PureComponent} from 'react';
import {COLORS} from '../theme/Color';

/**
 * @param {string} name
 * @param {string} price
 * @param {string} image
 */
export class GridItem extends PureComponent {
  render() {
    return (
      <TouchableOpacity {...this.props}>
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: `${this.props.image}?preset=medium&format=webp`,
            }}
            style={styles.itemImage}
          />
          <Text style={styles.itemName}>{this.props.name} </Text>
          <View style={styles.itemPriceContainer}>
            <Text style={styles.itemPrice}>
              $
              {(this.props.price / 100)
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default GridItem;

const styles = StyleSheet.create({
  gridView: {
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
    padding: 5,
    height: 250,
  },
  itemImage: {
    flex: 1,
    borderRadius: 5,
  },
  itemName: {
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
    marginVertical: 8,
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
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
});
