/*!

 =========================================================
 * Material Kit React Native - v1.4.0
 =========================================================
 * Product Page: https://demos.creative-tim.com/material-kit-react-native/
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/material-kit-react-native/blob/master/LICENSE)
 =========================================================
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect, Suspense } from "react";
import { Platform, StatusBar, Image, ActivityIndicator } from "react-native";
import AppLoading from "expo-app-loading";
import { Asset } from "expo-asset";

import { Images, products, materialTheme } from "./constants/";

import { NavigationContainer } from "@react-navigation/native";
import Screens from "./navigation/Screens";

// Before rendering any navigation stack
import { enableScreens } from "react-native-screens";

import RootStackScreen from "./screens/RootStackScreen";

import { Provider } from "react-redux";
import { configStore, getHistory } from "./configs/configureStore";
import * as Font from "expo-font";
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";

const store = configStore();

// cache app images
const assetImages = [
  Images.Pro,
  Images.Profile,
  Images.Avatar,
  Images.Onboarding,
];

// cache product images
products.map((product) => assetImages.push(product.image));

function cacheImages(images) {
  return images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}
const App = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf"),
  });

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <Suspense fallback={<div>...</div>}>
        <Provider store={store}>
          <NavigationContainer>
            {/*  {userInfo !== null ? (
              <GalioProvider theme={materialTheme}>
                <Block flex>
                  {Platform.OS === "ios" && <StatusBar barStyle="default" />}
                  <Screens />
                </Block>
              </GalioProvider>
            ) : (
              <RootStackScreen />
            )} */}
            <RootStackScreen />
          </NavigationContainer>
        </Provider>
      </Suspense>
    );
  }
};

export default App;
