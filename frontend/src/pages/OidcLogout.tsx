import React, { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";
import { LoadingBox } from "../components/LoadingBox";
import { Container } from "@mui/material";

const OidcLogout: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <Container>
      <LoadingBox loadingMessage='Signing out...' />
    </Container>
  );
};

export default OidcLogout;
