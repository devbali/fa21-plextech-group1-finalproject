import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
// refresh token
import { refreshTokenSetup } from "../util/refreshToken";

import { useNavigate, useLocation } from "react-router-dom";
import { fetcher, inMemoryUserManager } from "../util/fetcher";

import config from "../server-config";

function Login() {
  const history = useNavigate();
  const location = useLocation();

  const OnSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    inMemoryUserManager.setUser(res);
    refreshTokenSetup(res);
    console.log(history);
    // need to check if user in database
    // if (location.state == undefined || location.state.referrer == undefined)
    //   history("/register");
    // else
    //   history(location.state.referrer);
    fetcher("/users")
      .then((res) => res.json())
      .then((data) => {
        if (data["uninitialized"] === true) {
          history("/register");
        } else {
          history("/schedule");
        }
        console.log(data)
      });
  };

  const OnFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login.`);
  };

  return (
    <div>
      <GoogleLogin
        clientId={config.google_oauth_clientid}
        buttonText="Login"
        onSuccess={OnSuccess}
        onFailure={OnFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
