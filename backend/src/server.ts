import express from "express";
import { Issuer } from "openid-client";

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
  const oidcIssuer = await Issuer.discover("https://oidc.muni.cz/oidc");
  const client = new oidcIssuer.Client({
    client_id: "39a00844-84a6-4459-85fb-91d29539088c",
    client_secret: "abcda",
    redirect_uris: ["https://records.devel.mafildb.ics.muni.cz/oidc-login"],
    response_types: ["code"],
    scope: "openid profile email eduperson_entitlement",
  });
  return client;
};

// OIDC login route
app.get("/api/login", async (req, res) => {
  const client = await initOpenIDClient();
  const authorizationUrl = client.authorizationUrl({
    redirect_uri: "https://records.devel.mafildb.ics.muni.cz/oidc-login",
  });
  res.redirect(authorizationUrl);
});

app.get("/api/callback", async (req, res) => {
  const client = await initOpenIDClient();
  const params = client.callbackParams(req);
  const tokenSet = await client.callback("https://records.devel.mafildb.ics.muni.cz/oidc-login", params);
  // You can store the tokenSet in a session or a cookie for later use
  res.redirect(`/oidc-login?access_token=${tokenSet.access_token}`);
});
