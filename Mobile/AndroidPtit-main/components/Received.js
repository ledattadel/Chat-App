import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Received = ({ image, message, messageImg }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.img} />
      {messageImg && (
        <Image source={{ uri: messageImg }} style={styles.messageImg} />
      )}
      {message && (
        <LinearGradient colors={["#ECE9E6", "#FFFFFF"]} style={styles.gradient}>
          <Text style={styles.text}>{message}</Text>
        </LinearGradient>
      )}
    </View>
  );
};
export default Received;
const styles = StyleSheet.create({
  duration: {
    color: "#b6b6b6",
    fontSize: 11,
    marginHorizontal: 15,
    marginTop: 5,
    //fontFamily: "Montserrat_600SemiBold",
  },
  container: {
    flexDirection: "row",
    marginTop: 15,
    width: 250,
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  message: {
    fontSize: 13,
    marginHorizontal: 15,
    //fontFamily: "Montserrat_700Bold",
  },
  gradient: {
    maxWidth: 220,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    marginLeft: 10,
    marginBottom: 5,
  },
  messageImg: {
    width: 101,
    height: 101,
    resizeMode: "contain",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
