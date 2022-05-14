import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import createRootReducer from "../redux/reducers/index";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

const resetEnhanser = (rootReducer) => (state, action) => {
  if (action.type !== "RESET") return rootReducer(state, action);
  const newState = rootReducer(undefined, {});
  newState.router = state.router;
  return newState;
};

let store;
export function configStore(preloadState) {
  const middlewares = [thunkMiddleware].filter(
    Boolean,
  );
  store = createStore(
    resetEnhanser(createRootReducer()),
    preloadState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  );
  return store;
}


export default function getStore() {
  return store;
}
