import Stock from './data/Stock.json';
import pincodes from './data/Pincodes.json';
import { View, Text, FlatList, TextInput, Alert, StyleSheet } from 'react-native';

export const getDeliveryEstimate = (provider, currentDate, pincode) => {
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

export const isStockAvailable = (pid) => {
  return Stock["Stock Available"][pid] === "True";
};

export const renderCountdownTimer = (provider, currentDate) => {
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
    <View>
      <Text style={styles.timerText}>
        Order within {hours}h {minutes}m {seconds}s for same-day delivery
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerText: {
    color: '#FF8C00',
    fontSize: 14,
    marginTop: 5,
  },
})
