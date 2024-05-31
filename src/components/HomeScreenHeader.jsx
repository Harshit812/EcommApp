import {StyleSheet, Text, View, Image, ToastAndroid} from 'react-native';
import React from 'react';
import BagIcon from '../assets/Bag_alt.png';
import SortIcon from '../assets/Sort.png';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const HomeScreenHeader = () => {
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);

  const totalItems = cartItems.reduce((sum, item)=>{
    return sum+item.quantity;
  },0);

  return (
    <View style={styles.headerStyle}>
      <TouchableOpacity onPress={() => {
        ToastAndroid.show('Developed by Harshit', ToastAndroid.SHORT)
      }}>
        <Image source={SortIcon} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Cart');
      }}>
        <View style={styles.totalItem}>
        <Text style={styles.whiteText}>{totalItems}</Text>
        </View>
        <Image source={BagIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8
  },
  totalItem: {
    position: 'absolute',
    width: 15,
    height: 18,
    top: -5,
    right: -8,
    borderRadius: 12,
    gap: 10,
    backgroundColor: 'rgba(255, 164, 81, 1)',
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  whiteText:{
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '500'
  }
});
