import React, { useState, useEffect } from "react";

import "./global.scss";
import "./App.scss";

import * as whaleApi from "../util/whaleApi";

import SyncedTabs from "./components/SyncedTabs";
import History from "./components/History";
import Footer from "./components/Footer";

import { Key, getStorageData } from "./storage";

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <h1>{whaleApi.i18nGetMessage("header__title")}</h1>
          <button
            type="button"
            onClick={() => whale.tabs.create({ url: "whale://history/" })}
          >
            {whaleApi.i18nGetMessage("header__open_whale_history_page")}
          </button>
        </div>
      </header>
      <main>
        <SyncedTabs />
        <History />
      </main>
      <Footer />
    </div>
  );
}

export default App;
