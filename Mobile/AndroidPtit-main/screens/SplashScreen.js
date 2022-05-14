import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { materialTheme } from "../constants/index";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";

const SplashScreen = ({ navigation }) => {
  return (
    <LinearGradient colors={["#076585", "#fff"]} style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration="5000"
          source={require("../assets/images/LogoRA.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Welcome to Ahoo Chat</Text>
        <Text style={styles.text}>Sign up with account</Text>

        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <LinearGradient
              style={styles.signIn}
              colors={["#2980b9", "#2980a0"]}
            >
              <Text style={styles.textSign}>Continue</Text>
              <MaterialIcons
                style={styles.textSign}
                name="navigate-next"
                size={20}
                fontWeight="bold"
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${materialTheme.COLORS.PRIMARY}`,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  signIn: {
    width: 140,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  textButton: {
    color: "white",
  },
});
