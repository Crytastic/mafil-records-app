import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { LoadingBox } from "../components/LoadingBox";

const OidcLogin: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUserLoaded = () => {
      if (auth.user && auth.user.profile) {
        navigate("/studies");
      } else {
        navigate("/");
      }
    };

    auth.events.addUserLoaded(handleUserLoaded);

    return () => {
      // Clean up the event listener when the component is unmounted
      auth.events.removeUserLoaded(handleUserLoaded);
    };
  }, [auth, navigate]);

  return (
    <LoadingBox loadingMessage='Signing in...' />
  );
};

export default OidcLogin;
