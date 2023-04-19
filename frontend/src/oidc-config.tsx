import React from "react";
import { UserManagerSettings } from 'oidc-client';

const oidcConfig = {
  authority: 'https://oidc.muni.cz/oidc/authorize',
  client_id: '39a00844-84a6-4459-85fb-91d29539088c',
  redirect_uri: 'https://records.devel.mafildb.ics.muni.cz/oidc-login',
  response_type: 'code',
  scope: 'openid profile email',
  post_logout_redirect_uri: 'https://records.devel.mafildb.ics.muni.cz/',
  automaticSilentRenew: false,
  //silent_redirect_uri: 'http://localhost:3000/silent-renew.html',
};

export default oidcConfig;