import React, { useState, useRef, useMemo } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Text,
  View,
} from "react-native";

import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import Coins from "./src/components/Coins";
import SelectedCoin from "./src/components/SelectedCoin";

import colors from "./src/constants/colors";

export default function App() {
  const [selectedCoin, setSelectedCoin] = useState(null);

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["40%"], []);

  const selectCoinHandler = (coin) => {
    setSelectedCoin(coin);

    bottomSheetModalRef.current?.present();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Coins onSelectCoin={selectCoinHandler} />

          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.bottomSheet}
          >
            <SelectedCoin {...selectedCoin} />
          </BottomSheetModal>
        </View>
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: Platform.OS === "android" ? 8 : 0,
  },
  bottomSheet: {
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
});
