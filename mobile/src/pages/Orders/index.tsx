import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';

import { StyleSheet, ScrollView, View, Alert, Text } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';

import api from '../../services/api';

import { Order } from '../../types';

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const fetchData = () => {
    setIsLoading(true);

    api
      .get('orders')
      .then((response) => setOrders(response.data))
      .catch(() => Alert.alert('Houve um erro ao buscar os pedidos!'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    isFocused && fetchData();
  }, [isFocused]);

  const handleOnPress = (order: Order) => {
    navigation.navigate('OrderDetails', { order });
  };

  return (
    <>
      <Header />
      <ScrollView>
        {isLoading ? (
          <View style={styles.container}>
            <Text>Buscando pedidos...</Text>
          </View>
        ) : (
          orders.map((order) => (
            <TouchableWithoutFeedback
              key={order.id}
              onPress={() => handleOnPress(order)}
            >
              <OrderCard order={order} />
            </TouchableWithoutFeedback>
          ))
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '50%',
  },
});
