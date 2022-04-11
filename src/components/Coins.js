import React from "react";

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from "react-native";

import Coin from "./Coin";

import colors from "../constants/colors";

import { SAMPLE_DATA } from "../data/sampleData";

const Header = () => {
  return (
    <>
      <Text style={styles.title}>Markets</Text>

      <View style={styles.divider}></View>
    </>
  );
};

const Coins = ({ onSelectCoin }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={SAMPLE_DATA}
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
