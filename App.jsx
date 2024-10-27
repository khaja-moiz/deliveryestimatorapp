import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Alert, StyleSheet } from 'react-native';
import products from './data/Products.json';
import pincodes from './data/Pincodes.json';
import Stock from './data/Stock.json';
import ProductItem from './components/ProductItem';
import ProductModal from './components/ProductModal';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pincode, setPincode] = useState('100001');
  const [provider, setProvider] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const validatePincode = (pincode) => {
    const pincodeInfo = pincodes.find(item => item.Pincode === parseInt(pincode));
    if (pincodeInfo) {
      setProvider(pincodeInfo["Logistics Provider"]);
      return true;
    } else {
      Alert.alert('Invalid Pincode', 'Please enter a valid pincode.');
      return false;
    }
  };

  const handleSearch = () => {
    const filtered = products.filter(item =>
      item['Product Name'].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const openProductDetails = (item) => {
    setSelectedProduct(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.t}>MY APP</Text>
      <Text style={styles.header}>Product List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={searchText}
        onChangeText={setSearchText}
        onEndEditing={handleSearch}
      />
      <TextInput
        style={styles.pincodeInput}
        placeholder="Enter your pincode"
        keyboardType="numeric"
        value={pincode}
        onChangeText={setPincode}
        onBlur={() => validatePincode(pincode)}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductItem item={item} provider={provider} openProductDetails={openProductDetails} currentDate={currentDate} pincode={pincode}/>
        )}
        keyExtractor={(item) => item['Product ID']}
      />
      <ProductModal
        visible={modalVisible}
        closeModal={closeModal}
        selectedProduct={selectedProduct}
        provider={provider}
        currentDate={currentDate}
        validatePincode={validatePincode}
        pincode={pincode}
        setPincode={setPincode}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    maxWidth: 520,
    marginHorizontal: 'auto',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    // marginTop: 10,
    color: '#333',
  },
  t: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 16,
    color: '#333',
  },
  searchInput: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
  pincodeInput: {
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
  },
});

export default App;
