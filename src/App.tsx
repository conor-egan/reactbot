import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { ChatCard } from "./pages/Chat";
import { Generator } from "./pages/Generate";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatCard />} />
          <Route path="/generate" element={<Generator />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
