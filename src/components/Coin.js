import React from "react";

import { StyleSheet, View, Text, Image } from "react-native";

import colors from "../constants/colors";

const Coin = ({
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_7d_in_currency,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        <Image source={{ uri: image }} style={styles.image} />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.title}>
          $
          {current_price.toLocaleString("en-US", {
            currency: "USD",
          })}
        </Text>
        <Text
          style={[
            styles.subTitle,
            price_change_percentage_7d_in_currency > 0 && styles.success,
            price_change_percentage_7d_in_currency < 0 && styles.danger,
          ]}
        >
          {price_change_percentage_7d_in_currency > 0 && <Text>+</Text>}
          {price_change_percentage_7d_in_currency.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

export default Coin;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 14,
    color: colors.Gray,
  },
  rightContent: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  success: {
    color: colors.Green,
  },
  danger: {
    color: colors.Red,
  },
});
