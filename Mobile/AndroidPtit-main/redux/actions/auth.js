import * as constants from "../../constants/auth";
import {
  fetchSignin,
  fetchSignup,
  fetchChangePassword,
  fetchSendResetPassword,
  fetchVerifyEmailAccount,
} from "../../services/auth";

import { socketDisconnect, configSocket } from "../../sockets/rootSocket";
import { initSetting } from "../../components/Shared/settings";
import { isAuthenticated } from "../../components/Shared/Routes/permissionChecker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const actions = {
  doInitLoadingDone: () => {
    return { type: constants.SIGNIN_INIT_LOADING_DONE };
  },
  /* doClearErrorMessage: () => {
    return { type: constants.ERROR_MESSAGE_CLEAR };
  }, */

  doSignOut: () => (dispatch) => {
    /* window.localStorage.removeItem("asauth");
    socketDisconnect();

    getHistory().push("/signin"); */
    dispatch({ type: "RESET" });
  },

  doSignin: (userInfo, navigation) => async (dispatch) => {
    try {
      dispatch({ type: constants.SIGNIN_START });
      let response = await fetchSignin(userInfo);

      Alert.alert(response.data.message);

      const value = await JSON.stringify(response.data);

      await AsyncStorage.setItem("@asauth", value);
      dispatch({
        type: constants.UPDATE_INFO,
        payload: response.data,
      });

      let token = await isAuthenticated();

      dispatch({
        type: constants.SIGNIN_SUCCESS,
        payload: { token, message: response.data.message },
      });

      /* getHistory().push("/"); */
      await configSocket();
      initSetting();
      navigation.navigate("MainScreen");
    } catch (error) {
      console.log("errr", error);
      if (error.response && error.response.data) {
        Alert.alert(error.response.data.message);
      } else {
        Alert.alert("Error server");
      }

      /* dispatch({
        type: constants.SIGNIN_ERROR,
        payload: JSON.stringify(error),
      }); */
    }
  },
  doSignup: (userInfo, navigation) => async (dispatch) => {
    try {
      dispatch({ type: constants.SIGNUP_START });

      // call api: signin
      let response = await fetchSignup(userInfo);
      console.log(response);
      /* console.log(response);
      window.localStorage.setItem("asauth", JSON.stringify(response.data)); */
      dispatch({
        type: constants.SIGNUP_SUCCESS,
        payload: response.data,
      });

      Alert.alert(response.data.message[0]);
      navigation.navigate("SignInScreen");
    } catch (error) {
      Alert.alert("Đăng ký thất bại!");
      dispatch({
        type: constants.SIGNUP_ERROR,
        payload: error,
      });
    }
  },

  doSendResetPassword: (email) => async (dispatch) => {
    try {
      dispatch({ type: constants.SEND_RESET_PASSWORD_START });

      // call api: signin
      let response = await fetchSendResetPassword(email);

      dispatch({
        type: constants.SEND_RESET_PASSWORD_SUCCESS,
        payload: response.data,
      });
      Message.success("Reset email sent. Please check your inbox!");
    } catch (error) {
      Message.error(error.response.data.message);
      dispatch({
        type: constants.SEND_RESET_PASSWORD_ERROR,
        payload: Errors.selectMessage(error),
      });
    }
  },
  doChangePassword: (data) => async (dispatch) => {
    try {
      dispatch({ type: constants.CHANGE_PASSWORD_START });

      // call api: signin
      let response = await fetchChangePassword(data);

      dispatch({
        type: constants.CHANGE_PASSWORD_SUCCESS,
        payload: response.data,
      });
      Message.success("Your password has been changed successfully!");
      /* getHistory().push("/signin"); */
    } catch (error) {
      Message.error(error.response.data.message);
      dispatch({
        type: constants.CHANGE_PASSWORD_ERROR,
        payload: Errors.selectMessage(error),
      });
    }
  },
  verifyEmailAccount: (data) => async (dispatch) => {
    try {
      dispatch({ type: constants.VERIFY_EMAIL_ACCOUNT_START });

      // call api: verify email
      let response = await fetchVerifyEmailAccount(data);

      dispatch({
        type: constants.VERIFY_EMAIL_ACCOUNT_SUCCESS,
        payload: response.data,
      });
      Message.success(response.data.message);

      /*    setTimeout(() => {
        getHistory().push("/signin");
      }, 3000); */
    } catch (error) {
      Message.error(error.response.data.message);
      dispatch({
        type: constants.VERIFY_EMAIL_ACCOUNT_ERROR,
        payload: Errors.selectMessage(error),
      });
    }
  },
};
export default actions;
