import { Box } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "react-oidc-context";

import { BlueButton, RedButton } from "./Buttons";
import InfoItem from "./InfoItem";
import oidcConfig from "../../oidcConfig";

function LoginButton() {
  const auth = useAuth();

  function handleLogin() {
    auth.signinRedirect();
  }

  function handleLogout() {
    auth.signoutRedirect()
  }

  switch (auth.activeNavigator) {
    case "signinSilent":
      return <Box>Signing you in...</Box>;
    case "signoutRedirect":
      return <Box>Signing you out...</Box>;
  }

  if (auth.isLoading) {
    return <Box>Loading...</Box>;
  }

  if (auth.error) {
    return <Box>Oops... {auth.error.message}</Box>;
  }

  if (auth.user) {
    return (
      <React.Fragment>
        <InfoItem label="Measuring operator" text={auth.user.profile.name} />
        <RedButton text='Log out' onClick={handleLogin} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <InfoItem label="Measuring operator" text="Not yet logged in" />
      <BlueButton text='Log in' onClick={handleLogout} />
    </React.Fragment>
  );
}

export default LoginButton;

