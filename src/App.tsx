import "./App.css";
import React from "react";
import { ChatCard } from "./components/ChatCard";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>REACT-BOT</h1>
      </header>
      <ChatCard />
    </div>
  );
}

export default App;
