import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts } from '../redux/slices/productSlice';
import products from '../data/products';
import { SafeAreaView } from 'react-native-safe-area-context';
import Productcard from '../components/ProductCard';
import HomeScreenHeader from '../components/HomeScreenHeader';
import SearchScreen from './SearchScreen';

const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader />
      <SearchScreen />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex:1 ,
    margin: 8,
  },
})
