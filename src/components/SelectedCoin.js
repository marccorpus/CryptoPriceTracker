import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import colors from "../constants/colors";

const SelectedCoin = ({
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_7d_in_currency,
}) => {
  return (
    <>
      <View style={styles.firstRow}>
        <View style={styles.leftContent}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.subTitle}>
            {name} ({symbol.toUpperCase()})
          </Text>
        </View>
        <Text style={styles.subTitle}>7d</Text>
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.boldTitle}>
          $
          {current_price.toLocaleString("en-US", {
            currency: "USD",
          })}
        </Text>
        <Text
          style={[
            styles.title,
            price_change_percentage_7d_in_currency > 0 && styles.success,
            price_change_percentage_7d_in_currency < 0 && styles.danger,
          ]}
        >
          {price_change_percentage_7d_in_currency > 0 && <Text>+</Text>}
          {price_change_percentage_7d_in_currency.toFixed(2)}%
        </Text>
      </View>
    </>
  );
};

export default SelectedCoin;

const styles = StyleSheet.create({
  firstRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  subTitle: {
    fontSize: 14,
    color: colors.Gray,
  },
  secondRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 8,
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
  },
  success: {
    color: colors.Green,
  },
  danger: {
    color: colors.Red,
  },
});
