import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Moment from "moment";
import { textAbstract } from "../components/Shared/helper";
import { Badge, Icon, withBadge } from "react-native-elements";

const renderStampTime = (stampTime) => {
  Moment.locale("en");
  const time = Moment(stampTime).fromNow();
  return time;
};

const Messages = ({ username, uri, count, onPress, record }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {count > 0 ? (
        <LinearGradient
          colors={["#f26a50", "#f20045", "#f20045"]}
          style={styles.gradientStyle}
        >
          <Text style={styles.count}>{count}</Text>
        </LinearGradient>
      ) : null}
      <View>
        <Image
          source={{
            uri: `${uri}`,
          }}
          style={styles.image}
        />
        {record.online && (
          <Badge
            status="success"
            containerStyle={{ position: "absolute", top: 50, right: 4 }}
          />
        )}
      </View>
      <View style={{ marginLeft: 10 }}>
        <Text style={styles.username}>{username}</Text>
        <Text
          style={
            record.nSeen && record.nSeen === true
              ? styles.text_seen
              : styles.text
          }
        >
          {record.messages && record.messages.length > 0 ? (
            record.messages[+(record.messages.length - 1)].messageType ===
            "text" ? (
              record.messages[+(record.messages.length - 1)].text ? (
                textAbstract(
                  record.messages[+(record.messages.length - 1)].text,
                  27,
                )
              ) : (
                ""
              )
            ) : record.messages[+(record.messages.length - 1)].messageType ===
              "image" ? (
              <>Photo(s)</>
            ) : record.messages[+(record.messages.length - 1)].messageType ===
              "file" ? (
              <>File(s)</>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Text>
      </View>
      <Text style={styles.duration}>
        {record.updatedAt ? renderStampTime(record.updatedAt) : ""}
      </Text>
    </TouchableOpacity>
  );
};
export default Messages;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 30,
  },
  gradientStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  count: {
    color: "#fff",
    //fontFamily: "Montserrat_700Bold",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  text: {
    color: "#b6b6b6",
    //fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
  },
  text_seen: {
    color: "red",
    //fontFamily: "Montserrat_600SemiBold",
    fontSize: 11,
  },
  duration: {
    color: "#000119",
    fontSize: 12,
    flex: 1,
    marginLeft: 290,
    position: "absolute",
    //fontFamily: "Montserrat_600SemiBold",
  },
  username: {
    color: "#000119",
    //fontFamily: "Montserrat_700Bold",
  },
});
