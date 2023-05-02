// OIDCCallback.tsx
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingBox from "../components/common/LoadingBox";

export function useUserManager() {
  const auth = useAuth();
  // @ts-ignore: Access the private _userManager instance
  const userManager = auth._userManager;

  return userManager;
}

function OIDCCallback() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processAccessToken = async () => {
      const userManager = useUserManager();
      const urlSearchParams = new URLSearchParams(location.search);
      const accessToken = urlSearchParams.get("access_token");

      if (accessToken) {
        try {
          console.log(accessToken)
          const user = await userManager._loadUser(accessToken, false);
          userManager.events.load(user);
          navigate("/studies"); // Redirect to studies page if user is loaded
        } catch (error) {
          console.error("Error processing access token:", error);
        }
      } else {
        // Redirect to the login page if the access_token is not present
        navigate("/");
      }
    };

    processAccessToken();
  }, [auth, history, location]);

  return (
    <Container>
      <LoadingBox loadingMessage='Signing in...' />
    </Container>
  );
}

export default OIDCCallback;