import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, TextInput, Alert, Button, Modal } from 'react-native';
import products from './data/Products.json';
import pincodes from './data/Pincodes.json';
import Stock from './data/Stock.json';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [pincode, setPincode] = useState('100001');
  const [provider, setProvider] = useState('');
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000); // Update every second
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

  const isStockAvailable = (pid) => {
    return Stock["Stock Available"][pid] === "True";
  };

  const getDeliveryEstimate = (provider) => {
    const cutoffA = new Date();
    cutoffA.setHours(17, 0, 0, 0); // 5 PM cutoff for Provider A
    const cutoffB = new Date();
    cutoffB.setHours(9, 0, 0, 0); // 9 AM cutoff for Provider B
    const now = currentDate;
    let deliveryDate = new Date(now);

    if (provider === 'Provider A') {
      if (now < cutoffA) {
        return 'Same-day delivery';
      } else {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
    } else if (provider === 'Provider B') {
      if (now < cutoffB) {
        return 'Same-day delivery';
      } else {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
      }
    } else {
      const tat = pincodes.find((item) => item.Pincode === parseInt(pincode))?.TAT || 3;
      deliveryDate.setDate(deliveryDate.getDate() + tat);
    }

    return deliveryDate.toDateString();
  };

  const renderCountdownTimer = (provider) => {
    const cutoff = new Date(currentDate);
    if (provider === 'Provider A') {
      cutoff.setHours(17, 0, 0, 0); // 5 PM cutoff
    } else if (provider === 'Provider B') {
      cutoff.setHours(9, 0, 0, 0); // 9 AM cutoff
    } else {
      return null;
    }

    const timeRemaining = cutoff - currentDate;
    if (timeRemaining <= 0) return null;

    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    return (
      <Text style={styles.timerText}>
        Order within {hours}h {minutes}m {seconds}s for same-day delivery
      </Text>
    );
  };

  const handleSearch = () => {
    const filtered = products.filter(item =>
      item['Product Name'].toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const openProductDetails = (item) => {
    setSelectedProduct(item);
    setModalVisible(true); // Show modal with product details
  };

  const renderItem = ({ item }) => {
    const stockAvailable = isStockAvailable(item['Product ID']);
    const stockStatusMessage = stockAvailable ? "In Stock" : "Currently Unavailable";

    return (
      <View style={styles.productItem}>
        <TouchableOpacity onPress={() => openProductDetails(item)}>
          <Image source={require('./assets/adaptive-icon.png')} style={styles.image} />
          <Text style={styles.productName}>{item['Product Name']}</Text>
          <Text style={styles.productDescription}>Check out our new {item['Product Name']} by clicking on it!</Text>
          {stockAvailable ? (
            <>
              <View style={styles.ratingContainer}>
                <Text style={styles.rating}>⭐⭐⭐⭐ {item.Rating}</Text>
              </View>
              <View style={styles.productDetails}>
                <Text style={styles.productPrice}>₹{item.Price.toFixed(2)}</Text>
                <Text style={styles.deliveryTime}>Estimated Delivery: {getDeliveryEstimate(provider)}</Text>
              </View>
              <Text>{stockStatusMessage}</Text>
              {renderCountdownTimer(provider)}
              <TouchableOpacity style={styles.cartButton}>
                <Text style={styles.cartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text>{stockStatusMessage}</Text>
              <Text style={styles.unavailableText}>
                We don't know when or if this item will be back in stock
              </Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    );
  };
  const closeModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const stockAvb = selectedProduct ? isStockAvailable(selectedProduct['Product ID']) : false;
  const stockStatusMSG = stockAvb ? "In Stock" : "Currently Unavailable";
  return (
    <View style={styles.container}>
      <Text style={styles.t}>MY APP</Text>
      <Text style={styles.header}>Product List</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products"
        value={searchText}
        onChangeText={setSearchText}
        onEndEditing={handleSearch} // Trigger search on end editing
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
        renderItem={renderItem}
        keyExtractor={(item) => item['Product ID']}
      />
      {/* Modal for Product Details */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          {selectedProduct && (
            <>
              <Text style={styles.modalTitle} onPress={closeModal}>Back</Text>
              <Image source={require('./assets/adaptive-icon.png')} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedProduct['Product Name']}</Text>
              <Text style={styles.modalDescription}>This is {selectedProduct['Product Name']}, displayed for demonstration purposes only. The details provided here are placeholders and are not representative of the actual {selectedProduct['Product Name']}. When the live project is launched, the real product description will be added to provide specific information, features, and benefits.</Text>

              <View style={styles.btnctn}>
                <Text style={styles.rating}>⭐⭐⭐⭐</Text>
                <Text style={styles.rating}>HURRY, FEW LEFT!</Text>
              </View>
              {stockAvb ? (
                <>
                  <Text style={styles.modalPrice}>MRP: ₹{selectedProduct.Price.toFixed(2)}</Text>
                  <Text style={styles.stockStatus}>{stockStatusMSG}</Text>
                  <TextInput
                    style={styles.pincodeInput}
                    placeholder="Enter your pincode"
                    keyboardType="numeric"
                    value={pincode}
                    onChangeText={setPincode}
                    onBlur={() => validatePincode(pincode)}
                  />
                  <Text style={styles.deliveryTime}>🚚 Get It By: {getDeliveryEstimate(provider)}</Text>
                  {renderCountdownTimer(provider)}
                  <View style={styles.buttonContainer}>
                    <Button title="Add to Cart" onPress={closeModal} />
                    <Button title="Buy Now" onPress={closeModal} />
                  </View>
                </>
              ) : (
                <>
                  <Text>{stockStatusMSG}</Text>
                  <Text style={styles.unavailableText}>
                    We don't know when or if this item will be back in stock
                  </Text>
                </>
              )}
            </>
          )}
        </View>
      </Modal>
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
  productItem: {
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
    marginBottom: 5,
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  deliveryTime: {
    fontSize: 14,
    color: '#888',
  },
  timerText: {
    color: '#FF8C00',
    fontSize: 14,
    marginTop: 5,
  },
  cartButton: {
    backgroundColor: '#ff8c00',
    borderRadius: 5,
    paddingVertical: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  unavailableText: {
    fontSize: 14,
    color: 'red',
    marginTop: 5,
  },
  ratingContainer: {
    marginTop: 5,
  },
  rating: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    maxWidth: 520,
    marginHorizontal: 'auto',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btnctn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default App;
