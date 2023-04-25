import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import { LoadingBox } from "../components/LoadingBox";

const OidcLogin: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //if (auth.user) {
      navigate("/studies");
    //}
  }, [auth.user, navigate]);

  return (
    <Container maxWidth="sm">
      <LoadingBox loadingMessage="Logging in..." />
    </Container>
  );
};

export default OidcLogin;
