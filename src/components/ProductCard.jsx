import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector, useDispatch } from 'react-redux';
import Add from '../assets/Add.png';
import Increment from '../assets/Increment.png';
import Decrement from '../assets/Decrement.png';
import {
  increaseQuantity,
  decreaseQuantity,
  addToCart,
  removeFromCart,
} from '../redux/slices/cartSlice';

const ProductCard = React.memo(({ data, variant = 'home' }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const cartItem = cartItems.find(item => item.id === data.id);
  
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({ id: data.id, title: data.title, image: data.image, price: data.price, quantity: 1 }));
  }, [dispatch, data]);

  const handleIncreaseQuantity = useCallback(() => {
    dispatch(increaseQuantity(data.id));
  }, [dispatch, data.id]);

  const handleDecreaseQuantity = useCallback(() => {
    if (cartItem.quantity === 1) {
      dispatch(removeFromCart(data.id));
    } else {
      dispatch(decreaseQuantity(data.id));
    }
  }, [dispatch, cartItem, data.id]);

  const styles = variant === 'home' ? homeStyles : cartStyles;

  return (
    <View style={styles.cardStyle}>
      <Image source={{ uri: data.image }} style={[styles.productImageStyle, { resizeMode: 'contain' }]} />
      <View style={styles.desc}>
        <Text style={styles.titleStyle} numberOfLines={variant === 'home' ? 1 : 2}>
          {data.title}
        </Text>
        <View style={styles.priceButtonContainerStyle}>
          <Text style={styles.priceStyle}>{`₹ ${data.price}`}</Text>
          {cartItem ? (
            <View style={styles.addRemoveItems}>
              <TouchableOpacity onPress={handleDecreaseQuantity} style={styles.button}>
                <Image source={Decrement} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{cartItem.quantity}</Text>
              <TouchableOpacity onPress={handleIncreaseQuantity} style={styles.button}>
                <Image source={Increment} />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity onPress={handleAddToCart}>
              <Image source={Add} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
});

export default ProductCard;

const homeStyles = StyleSheet.create({
  cardStyle: {
    borderRadius: 16,
    gap: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(32, 32, 32, 0.05)',
    width: 160,
    height: 200,
  },
  productImageStyle: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: 159.43,
    height: 120,
  },
  desc: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    gap: 8,
  },
  titleStyle: {
    lineHeight: 24,
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Avenir Next',
    color: 'rgba(39, 33, 77, 1)',
  },
  priceStyle: {
    lineHeight: 16,
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(34, 34, 34, 1)',
    fontFamily: 'Avenir Next',
  },
  priceButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addRemoveItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 164, 81, 1)',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#FFFFFF',
  },
  whiteText: {
    color: '#FFFFFF'
  },
  button: {
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const cartStyles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: 'rgba(32, 32, 32, 0.05)',
    marginBottom: 16,
  },
  productImageStyle: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 8,
  },
  desc: {
    flex: 1,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgba(39, 33, 77, 1)',
    marginBottom: 4,
  },
  priceStyle: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(34, 34, 34, 1)',
  },
  addRemoveItems: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 164, 81, 1)',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 16,
    color: '#FFFFFF',
  },
  priceButtonContainerStyle: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
