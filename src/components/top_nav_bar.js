import React, { useState, useRef, useContext } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import cookie from "react-cookies";

import { ArrowLeftOutlined } from "@ant-design/icons";

import { getData } from "../components/HttpController";
import { AppContext } from "../contexts/AppContext";

import { Auth } from "aws-amplify";

/**
 * Main navigation bar
 */
function TopNavBar({ type }) {
  const [currentTab, setCurrentTab] = useState("");
  const appContext = useContext(AppContext);

  var lineHeight = "4vh";
  if (type == "main") {
    lineHeight = "6vh";
  } else {
    lineHeight = "5vh";
  }

  // Handle nav bar clicks
  const handleClick = (click) => {
    console.log("click ", click);
    if (click.key == "login/register") {
      // Clicking login/register button
      // LoginRegisterModalRef.current.openModal()
      // Auth.federatedSignIn();
      appContext.setAuthModalVisible(true);
    } else if (click.key === "logout") {
      // Clicking logout button
      logout();
    }
  };

  // Logout
  const logout = () => {
    Auth.signOut()
      .then((data) => {
        console.log(data);
        appContext.checkAuth();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "flex-start",
          height: lineHeight,
        }}
      >
        <Menu
          onClick={handleClick}
          selectedKeys={[currentTab]}
          mode="horizontal"
          theme="dark"
          style={{
            width: "100vw",
            display: "flex",
            flex: 1,
            alignContent: "center",
            justifyContent: "flex-end",
            backgroundColor: "#222222",
            lineHeight: lineHeight,
          }}
        >
          {!(type === "main") && (
            <Menu.Item key="back" style={{ marginRight: "auto" }}>
              <Link to={"/"}>Home</Link>
            </Menu.Item>
          )}

          {!appContext.isAuth && (
            <Menu.Item key="login/register" data-cy="login-register-link">
              <p>Login / Register</p>
            </Menu.Item>
          )}

          {appContext.isAuth && (
            <Menu.Item key="logout" data-cy="logout-link">
              <p>Logout</p>
            </Menu.Item>
          )}

          {appContext.isAuth && appContext.user_group === "admin" && (
            <Menu.Item key="admin" data-cy="admin-console-link">
              <Link to={"/admin"}>Admin Console</Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </div>
  );
}

export default TopNavBar;
