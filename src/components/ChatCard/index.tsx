import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import styles from "./styles.module.scss";
import { TextField } from "@mui/material";
import { useState } from "react";
import { fetchResponse } from "../../api/fetchResponse";

export const ChatCard = (): JSX.Element => {
  const [inputValue, setInputValue] = useState("");
  const [responseValue, setResponseValue] = useState("");

  const sendMessage = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ message: inputValue }),
      headers: { "Content-Type": "application/json" },
    };

    const data = await fetch("http://localhost:8080/chat", requestOptions).then(
      (response) => {
        return response.json();
      }
    );
    setResponseValue(data);
  };

  return (
    <Card className={styles.chatCard}>
      <CardContent style={{ display: "block" }}>
        <div style={{ width: "60%", display: "block" }}>
          <TextField
            fullWidth
            className={styles.chatOutput}
            variant="outlined"
            disabled
            value={responseValue}
          />
        </div>
        <div
          style={{
            width: "60%",
            display: "block",
            marginTop: "18px",
            float: "right",
          }}
        >
          <TextField
            fullWidth
            className={styles.chatInput}
            variant="outlined"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
