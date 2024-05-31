import React from 'react';
import { View, StyleSheet } from 'react-native';
import ContentLoader, { Rect } from 'react-content-loader/native';

const SkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <ContentLoader 
        speed={2}
        width={400}
        height={160}
        viewBox="0 0 400 160"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <Rect x="10" y="10" rx="8" ry="8" width="120" height="120" />
        <Rect x="140" y="10" rx="4" ry="4" width="200" height="20" />
        <Rect x="140" y="40" rx="3" ry="3" width="150" height="15" />
        <Rect x="140" y="70" rx="3" ry="3" width="100" height="15" />
        <Rect x="140" y="100" rx="3" ry="3" width="80" height="15" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
    shadowColor: 'rgba(32, 32, 32, 0.05)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default SkeletonLoader;
