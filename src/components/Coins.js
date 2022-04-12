import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from "react-native";

import Coin from "./Coin";

import colors from "../constants/colors";

import { getCoins } from "../services/cryptoService";

const Header = () => {
  return (
    <>
      <Text style={styles.title}>Markets</Text>

      <View style={styles.divider}></View>
    </>
  );
};

const Coins = ({ onSelectCoin }) => {
  const [coins, setCoins] = useState([]);

  const getMarketData = async () => {
    const marketData = await getCoins();

    setCoins(marketData);
  };

  useEffect(() => {
    getMarketData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={coins}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelectCoin(item)}>
            <Coin {...item} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Header />}
      />
    </View>
  );
};

export default Coins;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.Gray,
    marginTop: 16,
  },
});
