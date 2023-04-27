import React from "react";
import { Box } from "@mui/material";

interface MessageProps {
  title: string;
  text: string;
}

function Message({ title, text }: MessageProps) {
  return (
    <Box sx={{ justifyContent: 'center', textAlign: 'center' }}>
      <h1>{title}</h1>
      <Box>{text}</Box>
    </Box>
  )
}

export default Message;