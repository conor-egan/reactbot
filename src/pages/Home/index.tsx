import React from "react";
import { Link } from "react-router-dom";

export const Home = (): JSX.Element => {
  return (
    <>
      <div style={{ width: "60%", margin: "auto" }}>
        <h1>Welcome to ReactBot</h1>
        <p>
          This project is a frontend for my BootBot Rest API project that
          utilises the OpenAI API service. Not sure exactly what direction this
          is gonna take yet, but we're gonna see what we can do with ChatGPT
        </p>
        <ul>
          <li>
            <Link to="/chat">Chat</Link>
          </li>
          <li>
            <Link to="/generate">CSS Generator</Link>
          </li>
        </ul>
      </div>
    </>
  );
};
