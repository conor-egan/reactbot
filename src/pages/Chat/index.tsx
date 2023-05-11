import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import styles from "./styles.module.scss";
import { Box, CardHeader, LinearProgress, TextField } from "@mui/material";
import { useState } from "react";

export const ChatCard = (): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const [messages, pushMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
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
        {!loading ? (
          <TextField
            className={styles.chatInput}
            variant="outlined"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                setLoading(true);
                const input = inputValue;
                await sendMessage().then((response) => {
                  pushMessage([...messages, input, response]);
                });
                setInputValue("");
                setLoading(false);
              }
            }}
          />
        ) : (
          <Box className={styles.chatInput}>
            <LinearProgress />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
