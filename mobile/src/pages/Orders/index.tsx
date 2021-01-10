import React from 'react';

import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';

export default function Orders() {
  return (
    <>
      <Header />
      <ScrollView>
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
