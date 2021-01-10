import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Order } from '../../types';

import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';
import api from '../../services/api';

type Props = {
  route: {
    params: {
      order: Order;
    };
  };
};

export default function OrderDetails({ route }: Props) {
  const { order } = route.params;
  const navigation = useNavigation();

  const handleOnCancel = () => {
    navigation.navigate('Orders');
  };

  function handleConfirmDelivery(orderId: number) {
    api
      .put(`orders/${orderId}/delivered`)
      .then(() => {
        Alert.alert(`Pedido ${order.id} confirmado com sucesso!`);

        navigation.navigate('Orders');
      })
      .catch(() => {
        Alert.alert(`Houve um erro ao confirmar o pedido ${order.id}`);
      });
  }

  const handleStartNavigation = () => {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${order.latitude},${order.longitude}`
    );
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <OrderCard order={order} />
        <RectButton style={styles.button} onPress={handleStartNavigation}>
          <Text style={styles.buttonText}>INICIAR NAVEGAÇÃO</Text>
        </RectButton>
        <RectButton
          style={styles.button}
          onPress={() => handleConfirmDelivery(order.id)}
        >
          <Text style={styles.buttonText}>CONFIRMAR ENTREGA</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleOnCancel}>
          <Text style={styles.buttonText}>CANCELAR</Text>
        </RectButton>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%',
  },

  button: {
    backgroundColor: '#DA5C5C',
    flexDirection: 'row',
    borderRadius: 10,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FFF',
    letterSpacing: -0.24,
    fontFamily: 'OpenSans_700Bold',
  },
});
