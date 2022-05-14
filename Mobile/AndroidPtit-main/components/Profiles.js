import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Badge } from "react-native-elements";

const Profile = ({ username, uri, status, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: `${uri}` }} style={styles.avatarStyle} />
        {status && (
          <Badge
            status="success"
            containerStyle={{ position: "absolute", top: 50, right: 4 }}
          />
        )}

        <Text style={styles.nameStyle}>{username}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default Profile;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
    marginRight: 17,
  },
  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  nameStyle: {
    marginTop: 10,
    fontSize: 11,
    color: "#fff",
    fontFamily: "Montserrat_700Bold",
  },
});
