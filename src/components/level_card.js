import React from "react";
import { Card, Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import { Link } from "react-router-dom";

import "./level_card.css";
import styles from "../style.module.css";

const { Meta } = Card;

function LevelCard({ title, description, link, difficulty, completion }) {
  return (
    <div className="level-card" data-cy="level-card">
      <Card
        style={{
          width: "600px",
          height: "175px",
          margin: "30px",
          backgroundColor: "#214775",
        }}
      >
        <Meta title={title} description={description} />
        <div className="level-card-row">
          <Button
            className={`${styles.ui_font} button`}
            data-cy="level-start-button"
          >
            <Link to={link}>Start</Link>
          </Button>
          <div className="level-card-difficulty">
            Difficulty: <strong>{difficulty}</strong>
          </div>

          <div className="level-card-completion">
            {
              //< CheckOutlined />
            }
          </div>
        </div>
      </Card>
    </div>
  );
}

export default LevelCard;
