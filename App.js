import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import products from './data/Products.json'

const App = () => {

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
      
      <Text style={styles.productName}>{item["Product Name"]}</Text>
      <Text style={styles.productPrice}>${item.Price.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Product List</Text>
      <FlatList
        data={products} // Using the imported products data
        renderItem={renderItem}
        keyExtractor={(item) => item["Product ID"]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    marginBottom: 15,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 5,
  },
  productName: {
    fontSize: 18,
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    color: 'green',
  },
});

export default App;
