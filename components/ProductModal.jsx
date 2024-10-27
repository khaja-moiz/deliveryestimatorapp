import React from 'react';
import { View, Text, Modal, Image, StyleSheet, TextInput, Button } from 'react-native';
import { getDeliveryEstimate, renderCountdownTimer, isStockAvailable } from './../utils';

const ProductModal = ({ visible, closeModal, selectedProduct, provider, currentDate, validatePincode, pincode, setPincode }) => {
    const stockAvailable = selectedProduct ? isStockAvailable(selectedProduct['Product ID']) : false;
    const stockStatusMessage = stockAvailable ? "In Stock" : "Currently Unavailable";

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                {selectedProduct && (
                    <>
                        <Text style={styles.modalTitle} onPress={closeModal}>Back</Text>
                        <Image source={require('../assets/adaptive-icon.png')} style={styles.modalImage} />
                        <Text style={styles.modalTitle}>{selectedProduct['Product Name']}</Text>
                        <Text style={styles.modalDescription}>This is {selectedProduct['Product Name']}, displayed for demonstration purposes only. The details provided here are placeholders and are not representative of the actual {selectedProduct['Product Name']}. When the live project is launched, the real product description will be added to provide specific information, features, and benefits.</Text>
                        <View style={styles.btnctn}>
                            <Text style={styles.rating}>⭐⭐⭐⭐</Text>
                            <Text style={styles.rating}>HURRY, FEW LEFT!</Text>
                        </View>
                        {stockAvailable ? (
                            <>
                                <Text style={styles.modalPrice}>MRP: ₹{selectedProduct.Price.toFixed(2)}</Text>
                                <Text style={styles.stockStatus}>{stockStatusMessage}</Text>
                                <TextInput
                                    style={styles.pincodeInput}
                                    placeholder="Enter your pincode"
                                    keyboardType="numeric"
                                    value={pincode}
                                    onChangeText={setPincode}
                                    onBlur={() => validatePincode(pincode)}
                                />
                                
                                <Text style={styles.deliveryTime}>🚚 Get It By: {getDeliveryEstimate(provider, currentDate, pincode)}</Text>
                                {renderCountdownTimer(provider, currentDate)}
                                <View style={styles.buttonContainer}>
                                    <Button title="Add to Cart" onPress={closeModal} />
                                    <Button title="Buy Now" onPress={closeModal} />
                                </View>
                            </>
                        ) : (
                            <>
                                <Text style={styles.stockStatus}>{stockStatusMessage}</Text>
                                <Text style={styles.unavailableText}>
                                    We don't know when or if this item will be back in stock
                                </Text>
                            </>
                        )}
                        {/* <TextInput
                            style={styles.pincodeInput}
                            placeholder="Enter your pincode"
                            keyboardType="numeric"
                            onBlur={(e) => validatePincode(e.nativeEvent.text)}
                        />
                        <Button title="Close" onPress={closeModal} /> */}
                    </>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
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
    pincodeInput: {
        padding: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
    },
});

export default ProductModal;
