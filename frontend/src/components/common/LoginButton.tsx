import { Box } from "@mui/material";
import React from "react";
import { useAuth } from "react-oidc-context";

import { BlueButton, RedButton } from "./Buttons";
import InfoItem from "./InfoItem";

function LoginButton() {
  const auth = useAuth();

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
        <RedButton text='Log out' onClick={() => void auth.signoutRedirect()} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <InfoItem label="Measuring operator" text="Not yet logged in" />
      <BlueButton text='Log in' onClick={() => void auth.signinRedirect()} />
    </React.Fragment>
  );
}

export default LoginButton;