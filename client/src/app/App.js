import React from "react";

import { Provider } from "react-redux";
import store from "./store/createStore";

import { NavBar } from "../entities";
import Routing from "./Routing/Routing";

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Routing />
    </Provider>
  );
}

export default App;
