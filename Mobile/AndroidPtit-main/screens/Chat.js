import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo, MaterialIcons, FontAwesome5} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { Button } from 'galio-framework';
import Profiles from "../components/Profiles";
import Messages from "../components/Messages";
import selectors from "../redux/selectors/message";
import userSelectors from "../redux/selectors/user";
import constants from "../constants/message";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions/message";
import { textAbstract } from "../components/Shared/helper";
import { emitCheckStatus } from "../sockets/checkStatus";

const Chat = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const pan = useRef(new Animated.ValueXY()).current;
  const list = useRef(new Animated.ValueXY()).current;
  
  const record = useSelector(selectors.selectRecord);
  const messages = useSelector(selectors.selectMessages);
  const inputMessage = useSelector(selectors.selectInputMessage);
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  const messageListLoading = useSelector(selectors.selectMessageListLoading);
  const hasMoreMessageList = useSelector(selectors.selectHasMoreMessageList);

  useEffect(function () {
    Animated.timing(pan, {
      toValue: { x: -400, y: 0 },
      delay: 2000,
      useNativeDriver: false,
    }).start();

    Animated.timing(list, {
      toValue: { x: 0, y: -300 },
      delay: 3000,
      useNativeDriver: false,
    }).start();
    if (messages) setLoading(false);
  }, []);

  useEffect(() => {
    async function load(userId) {
      await dispatch(actions.list());
      if (lengthObjUserId > 0 && !target) {
        await dispatch({
          type: constants.TARGET_CONVERSATION,
          payload: userId,
        });
      }
    }
    /* async function getPeer() {
      await getPeerId();
    } */
    load(userId);
    emitCheckStatus();
  }, []);

  return (
    <LinearGradient colors={["#076585", "#fff"]} style={styles.gradient}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Chat</Text>
        <MaterialIcons name="add" color="#fff" size={30} />
      </View>
      <ScrollView
        horizontal
        style={styles.proContainer}
        showsHorizontalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Animated.View style={[pan.getLayout(), styles.card]}>
            {messages.map((item, index) => (
              <Profiles
                index={index}
                key={item._id}
                username={
                  item.members && item.members.length > 1
                    ? textAbstract(item.name, 7)
                    : textAbstract(item.userName, 7)
                }
                uri={item.avatar}
                status={item.online}
                onPress={() => {
                  setUserId(item._id);
                  dispatch({ type: constants.CLICK_TARGET });
                  dispatch({
                    type: constants.CHANGE_CONVERSATION,
                    payload: item._id,
                  });
                  dispatch({
                    type: constants.TARGET_CONVERSATION,
                    payload: item._id,
                  });
                  props.navigation.navigate("Discussion", {
                    itemId: item._id,
                    itemName: item.userName || item.name,
                    itemPic: item.avatar,
                  });
                }}
              />
            ))}
          </Animated.View>
        )}
      </ScrollView>
      <View style={styles.ops}>
        <View style={styles.col}>
          <Text style={styles.day}>Sunday</Text>
          {/* <Entypo name="edit" color="#000119" size={30}/>  */}
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("CreateGroup");
              }}
            >
              <LinearGradient style={styles.btn} colors={["#2980b9", "#2980a0"]}>
                <FontAwesome5 
                  name="pen"
                  size={22}
                  color="#FFF"
                  style={styles.icon}/>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" color="#f20042" />
          ) : (
            <Animated.View style={[list.getLayout(), styles.list]}>
              {messages.map((item, index) => (
                <Messages
                  key={item._id}
                  username={
                    item.members && item.members.length > 1
                      ? textAbstract(item.name, 15)
                      : textAbstract(item.userName, 15)
                  }
                  uri={item.avatar}
                  onPress={() => {
                    setUserId(item._id);
                    dispatch({ type: constants.CLICK_TARGET });
                    dispatch({
                      type: constants.CHANGE_CONVERSATION,
                      payload: item._id,
                    });
                    dispatch({
                      type: constants.TARGET_CONVERSATION,
                      payload: item._id,
                    });
                    props.navigation.navigate("Discussion", {
                      itemId: item._id,
                      itemName: item.userName || item.name,
                      itemPic: item.avatar,
                    });
                  }}
                  record={item}
                />
              ))}
            </Animated.View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default Chat;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
  },
  card: {
    marginLeft: 400,
    width: 400,
    flexDirection: "row",
  },
  gradient: {
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#FFF",
    flex: 1,
    fontSize: 24,
  },
  proContainer: {
    marginRight: -20,
    alignSelf: "center",
  },
  ops: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 420,
    backgroundColor: "#FFF",
    marginHorizontal: -20,
  },
  col: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000119",
    flex: 1,
    fontSize: 20,
  },
  button: {
    alignItems: "center",
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  icon: {
 
  },
});
