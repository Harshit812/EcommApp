import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} from 'react-native';
import Check from '../assets/tick.png';
import { useDispatch, useSelector } from 'react-redux';
import { setAppliedFilters, clearAppliedFilters } from '../redux/slices/filterSlice';

const FilterUtils = ({onClose}) => {

  const appliedFilters = useSelector(state => state.filter.applyFilters);
  const [selectedFilters, setSelectedFilters] = useState(appliedFilters);
  const dispatch = useDispatch();

  const filterSections = [
    {
      title: 'Price',
      filters: [
        {
          label: 'Lowest first',
          value: 'lowest',
        },
        {
          label: 'Highest first',
          value: 'highest',
        },
      ],
    },
    {
      title: 'Name',
      filters: [
        {
          label: 'Ascending',
          value: 'ascending',
        },
        {
          label: 'Descending',
          value: 'descending',
        },
      ],
    },
  ];

  const toggleFilter = (section, filter) => {
    setSelectedFilters({
      ...selectedFilters,
      [section]: filter,
    });
  };

  const onApplyFilters = () =>{
    dispatch(setAppliedFilters(selectedFilters));
    onClose();
  }

  const onClearFilters = () =>{
    setSelectedFilters({});
    dispatch(clearAppliedFilters());
    onClose();
  }

  return (
    <View>
      {filterSections.map(section => (
        <View key={section.title}>
          <View style={styles.container}>
            <Text style={styles.title}>{section.title}</Text>
            {section.filters.map(filter => (
              <TouchableOpacity
                key={filter.value}
                style={[styles.filterLayout, styles.container, selectedFilters[section.title] === filter.value ? styles.lightOrange : '']}
                onPress={() => toggleFilter(section.title, filter.value)}>
                <View style={[styles.spaceRow]}>
                  <Text style={styles.filterText}>{filter.label}</Text>
                  {selectedFilters[section.title] === filter.value && (
                    <Image source={Check} />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.lineSeparator} />
        </View>
      ))}
      <View style={[styles.spaceRow, styles.mt16, styles.container]}>
        <TouchableOpacity
          style={styles.clearOutButton}
          onPress={onClearFilters}>
          <Text style={styles.orangeText}>{'Clear all'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.showButton}
          onPress={onApplyFilters}>
          <Text style={styles.whiteText}>{'Show'} </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FilterUtils;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
    color: 'rgba(176, 176, 176, 1)',
    marginBottom: 8,
  },
  filterLayout: {
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
  },
  filterText: {
    fontSize: 16,
    fontWeight: '500',
  },
  orangeText: {
    color: 'rgba(235, 141, 55, 1)',
    fontWeight: '600',
  },
  lightOrange: {
    backgroundColor: 'rgba(255, 242, 231, 1)',
  },
  lineSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: 'rgba(176, 176, 176, 1)',
    marginVertical: 4,
  },
  clearOutButton: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderColor: 'rgba(255, 164, 81, 1)',
    backgroundColor: 'transparent',
    height: 52,
    width: 150,
   
  },
  showButton: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 50,
    paddingVertical: 14,
    borderColor: 'rgba(255, 164, 81, 1)',
    backgroundColor: 'rgba(255, 164, 81, 1)',
    height: 52,
    width: 150,
  },
  whiteText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  spaceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mt16: {
    marginTop: 16,
  },
});
