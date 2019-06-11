import React, { Component } from "react";
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";

import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./MyContainer";

class App extends Component {
  render() {
/*    let debugInfo = "";

    let drizzle = this.context.drizzle;
    let state = drizzle.store.getState();
    debugInfo = JSON.stringify({
      drizzleStatus: state.drizzleStatus,
      web3Status: state.web3.status,
      windowEthereum: window.ethereum.selectedAddress,
      windowWeb3: window.web3.currentProvider.selectedAddress,
      web3All: state.web3
    });
    */
    //console.log("before log");
    //console.log(LoadingContainer);
    //console.log("after log");

    return (
      <div>
        <div>Put debug output here</div>
        <DrizzleProvider options={drizzleOptions}>
          <LoadingContainer>
            <MyContainer />
          </LoadingContainer>
        </DrizzleProvider>
      </div>
    );
  }
}

export default App;
