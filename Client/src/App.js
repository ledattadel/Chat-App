import { ConnectedRouter } from "connected-react-router";
import React, { Suspense } from "react";
import { Provider } from "react-redux";
import RoutesComponent from "./components/Shared/Routes/RoutesComponent";
import CallPage from "./components/CallPage/index";
import Spinner from "./components/Shared/Spinner";
import { configStore, getHistory } from "./configs/configureStore";
import { GlobalStyles } from "./styles/GlobalStyles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = configStore();
function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Provider store={store}>
        <ToastContainer />
        <ConnectedRouter history={getHistory()}>
          <CallPage />
          <RoutesComponent />
        </ConnectedRouter>
      </Provider>
      <GlobalStyles />
    </Suspense>
  );
}

export default App;
