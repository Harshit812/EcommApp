import { StyleSheet, FlatList, View, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchIcon from '../assets/Search.png';
import CloseIcon from '../assets/close.png';
import DefaultFilterIcon from '../assets/BlueFilter.png';
import FilterIcon from '../assets/OrangeFilter.png';
import products from '../data/products';
import ProductCard from '../components/ProductCard';
import { setProducts } from '../redux/slices/productSlice';
import BottomSheet from '../components/FilterBottomSheet';
import SkeletonLoader from '../loaders/skeletonLoader';

const SearchScreen = () => {
  const [searchProduct, setSearchProduct] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const dispatch = useDispatch();
  const productList = useSelector(state => state.products.products);
  const appliedFilters = useSelector(state => state.filter.applyFilters);

  const [filteredProducts, setFilteredProducts] = useState(productList);
  const [loading, setLoading] = useState(true);

  const toggleBottomSheet = () => {
    setBottomSheetVisible(!bottomSheetVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      dispatch(setProducts(products));
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    let filteredProducts = [...products];

    if (searchProduct !== '') {
      filteredProducts = filteredProducts.filter(product =>
        product.title.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }

    if (appliedFilters['Price']) {
      if (appliedFilters['Price'] === 'lowest') {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (appliedFilters['Price'] === 'highest') {
        filteredProducts.sort((a, b) => b.price - a.price);
      }
    }

    if (appliedFilters['Name']) {
      if (appliedFilters['Name'] === 'ascending') {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
      } else if (appliedFilters['Name'] === 'descending') {
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
      }
    }

    setFilteredProducts(filteredProducts);
  }, [searchProduct, appliedFilters]);

  return (
    <>
      <View style={styles.searchLayoutStyle}>
        <TouchableOpacity style={styles.searchBarStyle}>
          {searchProduct === '' && <Image source={SearchIcon} />}
          <TextInput
            style={
              searchProduct === ''
                ? styles.searchDefaultInput
                : styles.searchInput
            }
            numberOfLines={1}
            placeholder="Search for fruit salad combos"
            value={searchProduct}
            onChangeText={setSearchProduct}
          />
          {searchProduct !== '' && (
            <TouchableOpacity
              onPress={() => {
                setSearchProduct('');
              }}>
              <Image source={CloseIcon} />
            </TouchableOpacity>
          )}
        </TouchableOpacity>
        <View
          style={
            Object.keys(appliedFilters).length > 0
              ? styles.filterIconStyle
              : styles.nonFilterIconStyle
          }>
          <TouchableOpacity onPress={toggleBottomSheet}>
            {Object.keys(appliedFilters).length > 0 ? (
              <Image source={FilterIcon} />
            ) : (
              <Image source={DefaultFilterIcon} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <FlatList
          data={[...Array(6).keys()]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={() => <SkeletonLoader />}
          numColumns={2}
          horizontal={false}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <ProductCard data={item} />}
          numColumns={2}
          horizontal={false}
          columnWrapperStyle={styles.columnWrapperStyle}
        />
      )}
      <BottomSheet visible={bottomSheetVisible} onClose={toggleBottomSheet} />
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchBarStyle: {
    width: 274,
    height: 58.08,
    paddingHorizontal: 24,
    paddingVertical: 8,
    gap: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(243, 244, 249, 1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchLayoutStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 58.08,
    gap: 27,
    width: 341.15,
    marginBottom: 20,
  },
  filterIconStyle: {
    backgroundColor: 'rgba(255, 242, 231, 1)',
    gap: 16,
    padding: 16,
    borderRadius: 16,
    height: 56.08,
    width: 56.08,
  },
  nonFilterIconStyle: {
    gap: 16,
    padding: 16,
    borderRadius: 16,
    height: 56.08,
    width: 56.08,
  },
  searchDefaultInput: {
    color: 'rgba(134, 134, 158, 1)',
  },
  searchInput: {
    color: 'rgba(0, 0, 0, 1)',
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
    gap: 24,
    marginBottom: 20,
  },
});
