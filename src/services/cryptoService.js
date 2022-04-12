import axios from "axios";
import moment from "moment";

const formatSparkline = (numbers) => {
  const sevenDaysAgo = moment().subtract(7, "days").unix();

  let formattedSparkline = numbers.map((item, index) => {
    return {
      x: sevenDaysAgo + (index + 1) * 3600,
      y: item,
    };
  });

  return formattedSparkline;
};

const formatCoins = (coins) => {
  const data = coins.map((coin) => {
    const formattedSparkline = formatSparkline(coin.sparkline_in_7d.price);

    return {
      ...coin,
      sparkline_in_7d: {
        price: formattedSparkline,
      },
    };
  });

  return data;
};

export const getCoins = async () => {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=true&price_change_percentage=7d";

  const response = await axios.get(url);

  return formatCoins(response.data);
};
