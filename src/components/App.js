import React, { Component, Fragment } from "react";
import Location from "../components/Location";
import Weather from "../components/Weather";
import { createGlobalStyle } from "styled-components";
import { Provider } from "react-redux";
import store from "../stores";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  body {
    margin: 0 15px;
    padding: 0;
    font-size: 16px;
    font-family: arial, sans-serif;
    color: #878787;
  }
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Fragment>
          <GlobalStyle />
          <Location />
          <Weather />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
