import React, { useState } from "react";
import styles from "./styles.module.scss";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  LinearProgress,
  TextField,
} from "@mui/material";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { CircularProgress } from "@mui/material";

export const Generator = (): JSX.Element => {
  const [inputValue, setInputValue] = useState("");

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const [code, setCode] = React.useState(
    "Enter your functional component to test here"
  );

  const sendMessage = async () => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({ message: code }),
      headers: { "Content-Type": "application/json" },
    };

    console.log(requestOptions);

    const data: string = await fetch(
      "http://localhost:8080/generate",
      requestOptions
    ).then((response) => {
      return response.json();
    });
    return data;
  };

  return (
    <Card className={styles.chatCard}>
      <CardHeader
        title="ReactBot Unit Test Generator"
        subheader={
          "Generates unit tests built using Jest and React testing library"
        }
      />
      <CardContent className={styles.cardContent}>
        <Editor
          className={styles.codeInput}
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages.js, "js")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        <div className={styles.buttonContainer}>
          {!loading ? (
            <Button
              className={styles.button}
              variant="contained"
              endIcon={<SmartToyIcon />}
              onClick={async () => {
                setLoading(true);
                await sendMessage().then((response) => {
                  setResponse(response);
                });
                setLoading(false);
              }}
            >
              {" "}
              Generate!
            </Button>
          ) : (
            <CircularProgress />
          )}
        </div>
        <Editor
          className={styles.codeOutput}
          value={response}
          onValueChange={() => {}}
          highlight={(code) => highlight(code, languages.js, "js")}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </CardContent>
    </Card>
  );
};
