import { isAuthenticated } from "./permissionChecker";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userActions from "../../../_actions/user";
import userSelectors from "../../../_selectors/user";
import { configSocket } from "../../../sockets/rootSocket";
import { emitCheckStatus } from "../../../sockets/checkStatus";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const currentUser = useSelector(userSelectors.selectCurrentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated()) {
      configSocket();
      //emitCheckStatus();
    }
    // dispatch(socketActions.doConnect());
    if (!currentUser && isAuthenticated()) {
      dispatch(userActions.getCurrentUser());
    }
  }, []);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated() ? (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
