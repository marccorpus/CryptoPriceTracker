import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Dimensions } from "react-native";

import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel,
} from "@rainbow-me/animated-charts";
import { useSharedValue } from "react-native-reanimated";

import colors from "../constants/colors";

export const { width: SIZE } = Dimensions.get("window");

const SelectedCoin = ({
  image,
  name,
  symbol,
  current_price,
  price_change_percentage_7d_in_currency,
  sparkline_in_7d: { price: sparkline },
}) => {
  const [isChartReady, setIsChartReady] = useState(false);
  const latestCurrentPrice = useSharedValue(current_price);

  useEffect(() => {
    latestCurrentPrice.value = current_price;

    setTimeout(() => {
      setIsChartReady(true);
    }, 0);
  }, [current_price]);

  const formatUSD = (value) => {
    "worklet";
    if (value === "") {
      const formattedValue = `$${latestCurrentPrice.value.toLocaleString(
        "en-US",
        { currency: "USD" }
      )}`;
      return formattedValue;
    }

    const formattedValue = `$${parseFloat(value)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
    return formattedValue;
  };

  return (
    <ChartPathProvider
      data={{ points: sparkline, smoothingStrategy: "bezier" }}
    >
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
        {/* <Text style={styles.boldTitle}>
          $
          {current_price.toLocaleString("en-US", {
            currency: "USD",
          })}
        </Text> */}
        <ChartYLabel format={formatUSD} style={styles.boldTitle} />
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

      {isChartReady && (
        <View>
          <ChartPath height={SIZE / 2} stroke={colors.Black} width={SIZE} />
          <ChartDot style={{ backgroundColor: colors.Black }} />
        </View>
      )}
    </ChartPathProvider>
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
