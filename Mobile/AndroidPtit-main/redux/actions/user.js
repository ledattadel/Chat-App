import * as constants from "../../constants/user";
import services from "../../services/user";

const actions = {
  getCurrentUser: () => async (dispatch) => {
    try {
      dispatch({
        type: constants.USER_GET_CURRENT_START,
      });

      let response = await services.getCurrentUser();

      dispatch({
        type: constants.USER_GET_CURRENT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: constants.USER_GET_CURRENT_ERROR,
      });
    }
  },
  list: (filter = {}) => async (dispatch) => {
    try {
      dispatch({ type: constants.USER_GET_START });

      let response = await services.listFriend(filter);

      dispatch({
        type: constants.USER_GET_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({ type: constants.USER_GET_ERROR });
    }
  },
  doUpdatePassword: (values) => async (dispatch) => {
    try {
      dispatch({ type: constants.USER_UPDATE_PASSWORD_START });
      await services.doUpdatePassword(values);

      dispatch({ type: constants.USER_UPDATE_PASSWORD_SUCCESS });

      // Time Logout
      
    } catch (error) {
      dispatch({
        type: constants.USER_UPDATE_PASSWORD_ERROR,
      });
    }
  },
  doGetUserUpdate: (id) => async (dispatch) => {
    try {
      dispatch({ type: constants.USER_FIND_START });

      const response = await services.getUserUpdate(id);

      dispatch({ type: constants.USER_FIND_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: constants.USER_FIND_ERROR });
    }
  },
  doUpdateInfo: (dataUpdate, userInfoNow) => async (dispatch) => {
    try {
      dispatch({
        type: constants.USER_UPDATE_START,
      });

      await services.updateInfo(dataUpdate);

      dispatch({
        type: constants.USER_UPDATE_SUCCESS,
        payload: userInfoNow,
      });

    } catch (error) {
      dispatch({
        type: constants.USER_UPDATE_ERROR,
      });
    }
  },

};

export default actions;
