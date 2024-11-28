import React, {useEffect, useMemo} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getReview} from '../redux/GetReviewSlice';

const renderReviews = ({item}) => {
  return (
    <>
      {item?.status === 'Pending' && (
        <View style={styles.reviewWrapper}>
          <View style={styles.reviewHeader}>
            <Text style={styles.businessName}>{item.business_name}</Text>
            <View style={styles.invoiceContainer}>
              <Text style={styles.invoiceLabel}>Invoice No:</Text>
              <Text style={styles.invoiceNumber}>{item.invoice_number}</Text>
            </View>
          </View>

          <View style={styles.reviewDetails}>
            <Text>{item.date}</Text>
            <View style={styles.orderContainer}>
              <Text style={styles.orderLabel}>Order No:</Text>
              <Text style={styles.orderNumber}>{item.order_number}</Text>
            </View>
          </View>
          <Text style={styles.reviewText}>{item.description}</Text>
        </View>
      )}
    </>
  );
};

const PendingReview = () => {
  const review = useSelector(state => state.review.review);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReview());
  }, [dispatch]);

  const pendingReview = useMemo(() => {
    return review.filter(item => item.status === 'Pending');
  }, [review]);

  return (
    <FlatList
      data={pendingReview}
      renderItem={renderReviews}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

const styles = StyleSheet.create({
  reviewWrapper: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  invoiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  invoiceLabel: {
    color: '#F34343',
    fontSize: 15,
  },
  invoiceNumber: {
    fontSize: 16,
    color: '#00008B',
  },
  reviewDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  orderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderLabel: {
    color: '#F34343',
    fontSize: 15,
  },
  orderNumber: {
    fontSize: 16,
    color: '#00008B',
  },
  reviewText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  flatListContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PendingReview;
