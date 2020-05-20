import React, { useContext } from "react";

import { Row, Col, Button } from "antd";
import styles from "../style_modules/button.module.css";

import { postData, getData } from "../components/HttpController";
import { submitUserCode, stopUserCode } from "../sockets/emit";
import { GamePageContext } from "../contexts/GamePageContext";
import { AppContext } from "../contexts/AppContext";

import * as graphqlController from "../graphql/graphql-controller";

/**
 * Control bar for submitting user code and other
 * gameplay controls
 */

function PlayModeControls({ level_name }) {
  // creating the Editor class
  const appContext = useContext(AppContext);
  const gamePageContext = useContext(GamePageContext);

  // POST user code to graphql API
  const pushUserCode = () => {
    if (appContext.isAuth) {
      submitUserCode(gamePageContext.editorContent);
      graphqlController.createProgress({
        username: appContext.username,
        level_name: level_name,
        user_code: gamePageContext.editorContent,
      });
    } else {
      // Guest user
      appContext.setAuthModalVisible(true);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignContent: "flex-end",
        justifyContent: "flex-end",
      }}
    >
      <Button
        type="primary"
        className={styles.dark_control_buttons}
        loading={gamePageContext.isLoading}
        onClick={() => {
          stopUserCode();
        }}
      >
        Stop
      </Button>
      <Button
        type="primary"
        className={styles.dark_control_buttons}
        loading={gamePageContext.isLoading}
        onClick={() => {
          pushUserCode();
        }}
      >
        Submit
      </Button>
    </div>
  );
}

export default PlayModeControls;
