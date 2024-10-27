import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getDeliveryEstimate, isStockAvailable, renderCountdownTimer } from './../utils';

const ProductItem = ({ item, provider, openProductDetails, currentDate, pincode }) => {
    const stockAvailable = isStockAvailable(item['Product ID']);
    const stockStatusMessage = stockAvailable ? "In Stock" : "Currently Unavailable";

    return (
        <View style={styles.productItem}>
            <TouchableOpacity onPress={() => openProductDetails(item)}>
                <Image source={require('../assets/adaptive-icon.png')} style={styles.image} />
                <Text style={styles.productName}>{item['Product Name']}</Text>
                <Text style={styles.productDescription}>Check out our new {item['Product Name']} by clicking on it!</Text>
                {stockAvailable ? (
                    <>
                        <View style={styles.ratingContainer}>
                            <Text style={styles.rating}>⭐⭐⭐⭐ {item.Rating}</Text>
                        </View>
                        <View style={styles.productDetails}>
                            <Text style={styles.productPrice}>₹{item.Price.toFixed(2)}</Text>
                            <Text style={styles.deliveryTime}>Estimated Delivery: {getDeliveryEstimate(provider, currentDate, pincode)}</Text>
                        </View>
                        <Text>{stockStatusMessage}</Text>
                        {renderCountdownTimer(provider, currentDate)}
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

const styles = StyleSheet.create({
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
});

export default ProductItem;
