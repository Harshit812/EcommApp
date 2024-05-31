import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { useNavigation } from '@react-navigation/native';
import ArrowBack from '../assets/Expand_left.png';
import { StyleSheet } from 'react-native';
import { resetCart } from '../redux/slices/cartSlice';
import SkeletonLoader from '../loaders/skeletonLoader';

const CartScreen = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setTotalPrice(cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2));
      setLoading(false);
    };

    fetchData();
  }, [cartItems]);

  const handleCheckout = () => {
    dispatch(resetCart());
    Alert.alert('Order Placed!', 'Thank you for Shopping with us :)', [
      {
        text: 'OK',
        onPress: () => navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        }),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={ArrowBack} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{'My Basket'}</Text>
      </View>
      {loading ? (
        <FlatList
          data={[...Array(5).keys()]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => <SkeletonLoader />}
        />
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard data={item} variant="cart" />
          )}
        />
      )}
      <View style={styles.footer}>
        <View>
          <Text style={styles.totalText}>{'Total'}</Text>
          <Text style={styles.totalPriceText}>{`₹ ${totalPrice}`}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout} disabled={cartItems.length === 0}>
          <Text style={styles.buttonText}>{'Checkout'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    height: 144,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 164, 81, 1)',
    backgroundColor: 'rgba(255, 164, 81, 1)',
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  checkoutButton: {
    height: 56,
    width: 199,
    gap: 0,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 164, 81, 1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Avenir Next',
    color: '#FFFFFF',
  },
  footer: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  totalText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Avenir Next',
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 1)',
  },
  totalPriceText: {
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Avenir Next',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
  },
});
