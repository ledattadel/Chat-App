import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { Button, Block, Text, Input, theme } from "galio-framework";
import { materialTheme } from "../constants/index";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { TextInput } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import actions from "../redux/actions/auth";

const SignUpScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState({
    sdt: "",
    password: "",
    check_input: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const userInfo = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      gender: "male"
    };
    dispatch(actions.doSignup(userInfo, navigation));
  };

  console.log(`error2`, errors);

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        sdt: val,
        check_input: true,
      });
    } else {
      setData({
        ...data,
        sdt: val,
        check_input: false,
      });
    }
  };

  const passwordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const checkSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const confirmCheckSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <LinearGradient colors={["#076585", "#fff"]} style={styles.container}>
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
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome name="user" color="#05375a" size={20} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  textInputChange(value);
                }}
                value={value}
                placeholder="Email"
              />
            )}
            name="email"
            rules={
              ({ required: { value: true, message: "Không được bỏ trống." } },
              { pattern: { value: /^\S+@\S+$/i, message: "Nhập sai email." } })
            }
            defaultValue=""
          />
          {data.check_input && !errors.email ? (
            <Feather name="check-circle" color="green" size={20} />
          ) : null}
        </View>
        {errors.email && errors.email.type === "pattern" ? (
          <TextInput style={styles.textError}>{errors.email.message}</TextInput>
        ) : null}
        <Text style={[styles.text_footer, { marginTop: 20 }]}>Mật khẩu</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#05375a" size={20} />
          <Controller
            name="password"
            rules={{
              required: true,
              minLength: { value: 8, message: "Mật khẩu tối thiểu 8 ký tự." },
            }}
            defaultValue=""
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  passwordChange(value);
                }}
                value={value}
                secureTextEntry={data.secureTextEntry}
                autoCapitalize={false}
                placeholder="Mật khẩu"
              />
            )}
          />

          <TouchableOpacity onPress={checkSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {errors.password ? (
          <TextInput style={styles.textError}>
            {errors.password.message}
          </TextInput>
        ) : null}

        <Text style={[styles.text_footer, { marginTop: 20 }]}>
          Xác nhận mật khẩu
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user" color="#05375a" size={20} />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.textInput}
                onBlur={onBlur}
                onChangeText={(value) => {
                  onChange(value);
                  textInputChange(value);
                }}
                value={value}
                placeholder="Confirm password"
                secureTextEntry={data.confirm_secureTextEntry}
                autoCapitalize={false}
              />
            )}
            name="confirmPassword"
            rules={
              ({ required: { value: true, message: "Không được bỏ trống." } },
              {
                minLength: { value: 8, message: "Mật khẩu tối thiểu 8 ký tự." },
              })
            }
            defaultValue=""
          />
          <TouchableOpacity onPress={confirmCheckSecureTextEntry}>
            {data.confirm_secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {errors.confirm_password ? (
          <TextInput style={styles.textError}>
            {errors.confirm_password.message}
          </TextInput>
        ) : null}
        <View style={styles.button}>
          <TouchableOpacity
            onPress={
              handleSubmit(onSubmit)
              //navigation.navigate("SignInScreen");
            }
          >
            <LinearGradient style={styles.btn} colors={["#2980b9", "#2980a0"]}>
              <Text style={styles.textSign}>Đăng ký</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </LinearGradient>
  );
};

export default SignUpScreen;

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
    flex: 2,
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
    color: "white",
  },
  textError: { color: "red", fontWeight: "normal", fontStyle: "italic" },
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
    width: "100%",
  },
  btn: {
    width: 360,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
});
