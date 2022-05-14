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
import { Entypo, MaterialIcons, FontAwesome5, AntDesign, } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Profiles from "../components/Profiles";
import contactSelectors from "../redux/selectors/contact";
import userSelectors from "../redux/selectors/user";
import constants from "../constants/message";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions/message";
import contactActions from "../redux/actions/contact";
import { textAbstract } from "../components/Shared/helper";
import { emitCheckStatus } from "../sockets/checkStatus";

const CreateGroup = (props) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [newMembers, setNewMembers] = useState(null);
  const [groupName, setGroupName] = useState("Group name");

  const list = useRef(new Animated.ValueXY()).current;

  let listFriends = useSelector(contactSelectors.selectContacts);
  const currentUser = useSelector(userSelectors.selectCurrentUser);

  const idNewMemberAdded = (userId) => {
    // Check new members
    const memberExists = newMembers.find((item) => item._id === userId);
    return memberExists ? true : false;
  };
  console.log(listFriends.length);
  useEffect(function () {
    Animated.timing(list, {
      toValue: { x: 0, y: -300},
      useNativeDriver: false,
    }).start();
    if (listFriends) setLoading(false);
  }, []);

  useEffect(() => {
    async function load(newMembers) {
      await dispatch(actions.list());
      if (lengthObjUserId > 0 && !target) {
        await dispatch({
          type: constants.TARGET_CONVERSATION,
          payload: newMembers,
        });
      }
    }
    /* async function getPeer() {
      await getPeerId();
    } */
    load(newMembers);
    emitCheckStatus();
  }, []);

   useEffect(() => {
    dispatch(contactActions.getContacts());
  }, []);

  return (
    <LinearGradient colors={["#076585", "#fff"]} style={styles.gradient}>
      <View style={styles.headerContainer}>
      <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("MainScreen");
            }}
          >
              <AntDesign name="arrowleft" color="#fff" size={30} />
          </TouchableOpacity>
        
        <Text style={styles.header}>Thêm thành viên</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Discussion");
            }}
          >
              <Text style={styles.text}>Tiếp</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.ops}>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" color="#f20042" />
          ) : (
            <Animated.View style={[list.getLayout(), styles.list]}>
              {listFriends.map((item, index) => (
                <Profiles
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
export default CreateGroup;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
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
    marginLeft: 20,
  },
  ops: {
    marginTop: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "#FFF",
    marginHorizontal: -20,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  button: {
    alignItems: "center",
    //marginTop: 30,
  },
});
