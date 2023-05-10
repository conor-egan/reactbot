import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./styles.module.scss";
import { CardHeader, TextField } from "@mui/material";
import { useState } from "react";

export const ChatCard = (): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const [messages, pushMessage] = useState<string[]>([]);

  const sendMessage = async () => {
    console.log("Sending message");
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ message: inputValue }),
      headers: { "Content-Type": "application/json" },
    };

    const data: string = await fetch(
      "http://localhost:8080/chat",
      requestOptions
    ).then((response) => {
      return response.json();
    });
    return data;
  };

  return (
    <Card className={styles.chatCard}>
      <CardHeader
        title="React Bot"
        subheader={new Date().toLocaleString() + ""}
      />
      <CardContent style={{ display: "block" }}>
        {messages.map((message, index) => {
          return (
            <TextField
              multiline
              key={index}
              className={index & 1 ? styles.chatOutput : styles.chatInput}
              variant="outlined"
              value={message}
            />
          );
        })}
        <TextField
          className={styles.chatInput}
          variant="outlined"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={async (e) => {
            if (e.key === "Enter") {
              const input = inputValue;
              console.log(input);
              sendMessage().then((response) => {
                pushMessage([...messages, input, response]);
              });
              console.log(messages);
              setInputValue("");
            }
          }}
        />
      </CardContent>
    </Card>
  );
};
