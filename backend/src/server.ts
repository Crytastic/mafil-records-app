const express = require("express");
import { Issuer } from "openid-client";
import oidcConfig from "./oidcConfig";
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Backend server is running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Initialize the OpenID Connect client
const initOpenIDClient = async () => {
  const oidcIssuer = await Issuer.discover(oidcConfig.authority);
  const client = new oidcIssuer.Client({
    client_id: oidcConfig.client_id,
    client_secret: oidcConfig.client_secret,
    redirect_uris: [oidcConfig.redirect_uri],
    response_types: [oidcConfig.response_type],
    scope: oidcConfig.scope,
  });
  return client;
};

// Backend route to check its accessible
app.get('/api', (req, res) => {
  res.send('Backend server is running and accessible');
});

// OIDC login route
app.get("/api/login", async (req, res) => {
  const client = await initOpenIDClient();
  const authorizationUrl = client.authorizationUrl({
    redirect_uri: oidcConfig.redirect_uri,
  });
  res.redirect(authorizationUrl);
});

app.get("/api/callback", async (req, res) => {
  const client = await initOpenIDClient();
  const params = client.callbackParams(req);
  const tokenSet = await client.callback(oidcConfig.redirect_uri, params);
  // You can store the tokenSet in a session or a cookie for later use
  res.redirect(`/oidc-login?access_token=${tokenSet.access_token}`);
});
