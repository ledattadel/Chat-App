import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
// import Icon from "@expo/vector-icons/AntDesign";
import LastWatch from "../components/LastWatch";
import Received from "../components/Received";
import Sent from "../components/Sent";
import Data from "../dummy/Data.json";
import Input from "../components/Input";
import selectors from "../redux/selectors/message";
import userSelectors from "../redux/selectors/user";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions/message";
import message from "../constants/message";
import { Buffer } from "buffer";
import { emitTypingOff, emitTypingOn } from "../sockets/chat";
import constants from "../constants/message";
import {
  Octicons,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { event } from "react-native-reanimated";
const Discussion = ({ route, navigation }) => {
  const { itemName, itemPic } = route.params;
  const inputMessageRef = useRef();
  const dispatch = useDispatch();

  //const [inputMessage, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [typing, setTyping] = useState(false);

  const record = useSelector(selectors.selectRecord);
  const currentUser = useSelector(userSelectors.selectCurrentUser);
  const inputMessage = useSelector(selectors.selectInputMessage);

  const isChatGroup = record && record.members ? true : false;
  const members = record && record.members ? record.members : null;

  const loadMoreConversation = () => {
    if (record && record.messages && record.messages.length >= 30)
      dispatch(actions.readMore(record._id, record.messages.length));
  };

  const handleTypingOff = () => {
    emitTypingOff({
      info: currentUser,
      receiverId: record._id,
      //conversationType: record.conversationType,
    });
  };

  const onInputMessageChange = (message) => {
    dispatch({
      type: constants.INPUT_MESSAGE_CHANGE,
      payload: message,
    });
    if (message.trim() === "") {
      handleTypingOff();
    }
  };

  const onInputImageListChange = ({ fileList }) => {
    dispatch({
      type: constants.INPUT_IMAGE_LIST_CHANGE,
      payload: [...fileList],
    });
  };

  const onInputFileListChange = ({ fileList }) => {
    dispatch({
      type: constants.INPUT_FILE_LIST_CHANGE,
      payload: [...fileList],
    });
  };

  const addEmoji = (e) => {
    onInputMessageChange(inputMessage.text + e.native);
    if (!isMobileDevice) inputMessageRef.current.focus();
  };

  const sendText = () => {
    // Gửi text và emoji
    if (inputMessage.text.trim() !== "") {
      dispatch(
        actions.doCreate({
          message: inputMessage.text,
          receiverId: record._id,
          conversationType: record.conversationType,
          isChatGroup: isChatGroup,
          members: members,
        }),
      );
      onInputMessageChange("");
    }
  };

  const sendImage = () => {
    // Nếu đang uploading thì không gửi
    let uploading = false;
    inputMessage.images.forEach((item) => {
      if (item.status === "uploading") uploading = true;
    });
    if (uploading) return;
    if (inputMessage.images.length > 0) {
      // gửi hình ảnh
      let images = [];
      inputMessage.images.forEach((item) => {
        if (item.response.name) {
          images.push(item.response);
        }
      });

      dispatch(
        actions.doCreateImages({
          images,
          type: "image",
          receiver: record._id,
          conversationType: record.conversationType,
          isChatGroup: isChatGroup,
          members: members,
        }),
      );
      onInputImageListChange({ fileList: [] });
    }
  };

  const sendFile = () => {
    // Nếu đang uploading thì không gửi
    let uploading = false;
    inputMessage.files.forEach((item) => {
      if (item.status === "uploading") uploading = true;
    });
    if (uploading) return;
    if (inputMessage.files.length > 0) {
      // gửi file
      let files = [];
      inputMessage.files.forEach((item) => {
        if (item.response.name) {
          files.push(item.response);
        }
      });

      dispatch(
        actions.doCreateFiles({
          files,
          type: "file",
          receiver: record._id,
          conversationType: record.conversationType,
          isChatGroup,
          members,
        }),
      );
      onInputFileListChange({ fileList: [] });
    }
  };

  const handleSendClick = () => {
    sendText();
    sendImage();
    sendFile();
    dispatch(actions.doToggleScrollToBottom());

    handleTypingOff();
    //inputMessageRef.current.focus();
  };

  const pan = useRef(new Animated.ValueXY()).current;
  const list = useRef(new Animated.ValueXY()).current;
  const scrollViewRef = useRef();

  const uri = `${itemPic}`;
  console.log(itemPic)

  let bufferToBase64 = (bufferFrom) => {
    return Buffer.from(bufferFrom).toString("base64");
  };

  const handleInfiniteOnLoad = () => {
    loadMoreConversation();
  };

  useEffect(
    function () {
      Animated.timing(pan, {
        toValue: { x: -400, y: 0 },
        delay: 2000,
        useNativeDriver: false,
      }).start();

      Animated.timing(list, {
        toValue: { x: 0, y: 0 },
        delay: 3000,
        useNativeDriver: false,
      }).start();
      if (record && record.messages) setLoading(false);
    },
    [record],
  );

  return (
    <LinearGradient colors={["#fff", "#076585"]} style={styles.container}>
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              dispatch({ type: constants.CLICK_BACK });
            }}
          >
            <AntDesign name="arrowleft" color="#000119" size={24} />
          </TouchableOpacity>
          <Text style={styles.username}>{itemName}</Text>
          <MaterialIcons
            name="call"
            size={22}
            color="#000119"
            style={styles.icon}
          />
          <FontAwesome5
            name="video"
            size={22}
            color="#000119"
            style={styles.icon}
          />
          <FontAwesome5
            name="info-circle"
            size={22}
            color="#000119"
            style={styles.icon}
          />
        </View>
        {loading ? (
          <ActivityIndicator size="small" color="#pink" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            onScroll={(event) => {
              if (event.nativeEvent.contentOffset.y == 0) {
                handleInfiniteOnLoad();
              }
            }}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            <Animated.View style={[list.getLayout(), styles.list]}>
              {record &&
                record.messages &&
                record.messages.map((message, index) => {
                  if (message.conversationType === "notification") {
                    return (
                      <View style={styles.notify}>
                        <Text key={index} style={styles.text_notify}>
                          {message.text}
                        </Text>
                      </View>
                    );
                  }

                  return (
                    <>
                      {message.senderId === currentUser._id ? (
                        <>
                          {message.messageType === "text" ? (
                            <Sent message={message.text} />
                          ) : message.messageType === "image" &&
                            message.file.length > 0 ? (
                            <>
                              {message.file.map((image, index) => (
                                <Image
                                  style={{
                                    width: 101,
                                    height: 101,
                                    resizeMode: "contain",
                                    alignSelf: "flex-end",
                                  }}
                                  key={index}
                                  source={{
                                    uri: `data:${
                                      image.contentType
                                    };base64,${bufferToBase64(image.data)}
                            `,
                                  }}
                                />
                              ))}
                            </>
                          ) : message.messageType === "file" ? (
                            <>
                              {message.file.map((file, index) => (
                                <Received
                                  key={index}
                                  image={uri}
                                  message={file.fileName}
                                />
                              ))}
                            </>
                          ) : null}
                        </>
                      ) : (
                        // Nếu người gửi không phải là user hiện tại
                        <>
                          {message.messageType === "text" ? (
                            <Received
                              image={
                                currentUser &&
                                message.senderId !== currentUser._id &&
                                message.conversationType === "group" &&
                                record
                                  ? `${message.sender.avatar}`
                                  : uri
                              }
                              message={message.text}
                            />
                          ) : message.messageType === "image" &&
                            message.file.length > 0 ? (
                            <>
                              {message.file.map((image, index) => (
                                <Received
                                  key={index}
                                  image={
                                    currentUser &&
                                    message.senderId !== currentUser._id &&
                                    message.conversationType === "group" &&
                                    record
                                      ? `${message.sender.avatar}`
                                      : uri
                                  }
                                  messageImg={`data:${
                                    image.contentType
                                  };base64,${bufferToBase64(image.data)}
                            `}
                                />
                              ))}
                            </>
                          ) : message.messageType === "file" ? (
                            <>
                              {message.file.map((file, index) => (
                                <Received
                                  key={index}
                                  image={
                                    currentUser &&
                                    message.senderId !== currentUser._id &&
                                    message.conversationType === "group" &&
                                    record
                                      ? `https://server-app-chat-v2.herokuapp.com/public/images/users/${message.sender.avatar}`
                                      : uri
                                  }
                                  message={file.fileName}
                                />
                              ))}
                            </>
                          ) : null}
                        </>
                      )}
                    </>
                  );
                })}
            </Animated.View>
          </ScrollView>
        )}
      </View>
      <Input
        inputMessage={inputMessage}
        setMessage={(inputMessage) => onInputMessageChange(inputMessage)}
        onSendPress={handleSendClick}
        onKeyPress={handleTypingOff}
      />
    </LinearGradient>
  );
};
export default Discussion;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  main: {
    backgroundColor: "#FFF",
    height: "86%",
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  list: {
    marginTop: 300,
  },
  notify: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10,
    width: 250,
  },
  text_notify: {
    fontSize: 12,
    textAlign: "center",
    color: "#000066",
    textDecorationStyle: "dotted",
  },
  icon: {
    marginLeft: 20,
  },
});
