import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from "react-router-dom";
import {inMemoryUserManager} from '../util/fetcher'

import config from '../server-config'


function Logout() {
  const history = useNavigate();
  const onSuccess = () => {
    console.log('Logout made successfully');
    history("/");
    inMemoryUserManager.deleteUser();
  };

  return (
    <div>
      <GoogleLogout
        clientId={config.google_oauth_clientid}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default Logout;
