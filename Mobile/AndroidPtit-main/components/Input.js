import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from "@expo/vector-icons/Fontisto";
//import * as  ImagePicker from 'expo-image-picker';

const Input = ({ inputMessage, onSendPress, setMessage, onKeyPress }) => {
  const [input, setInput] = useState("");

  useEffect(() => {
    setInput(inputMessage.text);
  }, [inputMessage]);
  return (
    <View style={styles.container}>
      <Entypo name="emoji-happy" color="#fff" size={20} />
      <TextInput
        placeholder="Some text"
        value={input}
        onChangeText={setMessage}
        style={styles.input}
        onKeyPress={onKeyPress}
      />
      <View style={styles.icon}>
        <TouchableOpacity>
          <Entypo
            name="attachment"
            color="#FFF"
            size={20}
            style={styles.item}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Fontisto name="camera" color="#FFF" size={20} style={styles.item} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSendPress}>
          <Ionicons
            name="ios-send"
            color="#FFF"
            size={20}
            style={styles.item}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    width: "85%",
    position: "absolute",
    bottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
  },
  input: {
    fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
    color: "#fff",
    paddingHorizontal: 10,
    flex: 1,
  },
  icon: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    width: "28%",
  },
  item: {
    marginLeft: 10,
  },
});
