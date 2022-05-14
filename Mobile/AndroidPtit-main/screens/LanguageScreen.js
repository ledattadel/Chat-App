import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  CheckBox,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as Animatable from "react-native-animatable";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { materialTheme } from "../constants/index";
import { AuthContext } from "../components/authContext";

const LanguageScreen = ({ navigation }) => {
  const { chooseLang } = React.useContext(AuthContext);

  const [checkboxes, setCheckboxes] = React.useState([
    {
      id: 1,
      title: "Vietnamese",
      checked: true,
    },
    {
      id: 2,
      title: "English",
      checked: false,
    },
  ]);

  const toggleCheckbox = (index) => {
    const checkboxData = [...checkboxes];
    if (index === 0) {
      checkboxData[index].checked = true;
      checkboxData[1].checked = false;
    } else {
      checkboxData[index].checked = true;
      checkboxData[0].checked = false;
    }
    chooseLang(checkboxData[index].title);
    setCheckboxes(checkboxData);
  };

  const renderCheckBox = checkboxes.map((cb, index) => (
    <TouchableOpacity
      style={styles.checkboxContainer}
      onPress={() => toggleCheckbox(index)}
    >
      <CheckBox style={styles.checkbox} key={cb.id} value={cb.checked} />
      <Text style={styles.label}>{cb.title}</Text>
    </TouchableOpacity>
  ));

  useEffect(() => {
    chooseLang("Vietnamese");
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duration="1000"
          source={require("../assets/images/LogoRA.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>Vui lòng chọn ngôn ngữ</Text>
        {renderCheckBox}
        {checkboxes[0].checked || checkboxes[1].checked ? (
          <View style={styles.button}>
            <Button
              color={materialTheme.COLORS.BUTTON_COLOR}
              shadowless
              onPress={() => navigation.navigate("SignInScreen")}
            >
              Tiếp tục
            </Button>
          </View>
        ) : null}
      </Animatable.View>
    </View>
  );
};

export default LanguageScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${materialTheme.COLORS.PRIMARY}`,
  },
  logo: {
    height: height_logo,
    width: height_logo,
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 30,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
