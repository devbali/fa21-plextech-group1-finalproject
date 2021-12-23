import React, { Component }  from 'react';
import { GoogleLogin } from 'react-google-login';
// refresh token
import { refreshTokenSetup } from '../util/refreshToken';

import { useNavigate, useLocation} from "react-router-dom";
import {inMemoryUserManager} from '../util/fetcher'

import config from '../server-config'

function Login() {
  const history = useNavigate();
  const location = useLocation();

  const OnSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    inMemoryUserManager.setUser(res);
    refreshTokenSetup(res);
    console.log(history);
    if (location.state == undefined || location.state.referrer == undefined)
      history("/schedule");
    else
      history(location.state.referrer);
  };

  const OnFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  return (
    <div>
      <GoogleLogin
        clientId={config.google_oauth_clientid}
        buttonText="Login"
        onSuccess={OnSuccess}
        onFailure={OnFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
