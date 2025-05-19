import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

// Static data for user bookings
const userBookings = [
  { 
    name: 'John Doe', 
    date: '2025-05-15', 
    time: '2:00 PM', 
    status: 'Confirmed', 
    description: 'Facial Treatment', 
    amount: '$100', 
    beauticianName: 'Jane Smith' 
  },
  { 
    name: 'Alice Johnson', 
    date: '2025-05-16', 
    time: '11:00 AM', 
    status: 'Pending', 
    description: 'Massage', 
    amount: '$80', 
    beauticianName: 'Emily White' 
  },
  { 
    name: 'Bob Lee', 
    date: '2025-05-17', 
    time: '4:00 PM', 
    status: 'Cancelled', 
    description: 'Manicure', 
    amount: '$50', 
    beauticianName: 'Sara Brown' 
  },  { 
    name: 'Bob Lee', 
    date: '2025-05-17', 
    time: '4:00 PM', 
    status: 'Cancelled', 
    description: 'Manicure', 
    amount: '$50', 
    beauticianName: 'Sara Brown' 
  },  { 
    name: 'Bob Lee', 
    date: '2025-05-17', 
    time: '4:00 PM', 
    status: 'Cancelled', 
    description: 'Manicure', 
    amount: '$50', 
    beauticianName: 'Sara Brown' 
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Confirmed':
      return '#4caf50'; 
    case 'Pending':
      return '#ff9800';
    case 'Cancelled':
      return '#f44336'; 
    default:
      return '#000000';
  }
};

 const sortedBookings = [...userBookings].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

export default function Booking() {
  return (
    <ScrollView style={styles.container}>
      {sortedBookings.map((booking, index) => (
        <View key={index} style={styles.bookingBox}>
          <Text style={styles.title}>{booking.description}</Text>

          {/* Name and Date Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Name:</Text>
            <Text style={styles.infoText}>{booking.name}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Date:</Text>
            <Text style={styles.infoText}>{booking.date}</Text>
          </View>

          {/* Time and Beautician Section */}
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Time:</Text>
            <Text style={styles.infoText}>{booking.time}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Beautician:</Text>
            <Text style={styles.infoText}>{booking.beauticianName}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoLabel}>Amount:</Text>
            <Text style={styles.infoText}>{booking.amount}</Text>
          </View>

          {/* Status Section */}
          <Text style={[styles.status, { color: getStatusColor(booking.status) }]}>
            Status: {booking.status}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fef2fe', 
  },
  bookingBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#f06292',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5, 
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
    color: '#f06292',
    textAlign: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    marginBottom: 3,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#333',
    width: 100,
  },
  infoText: {
    color: '#555',
    flex: 1,
  },
  status: {
    fontWeight: 'bold',
    // marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});
