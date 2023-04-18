import React from "react";
import { useState, useEffect, useRef } from "react";
import "./ResizableSidebar.css";
import { Stage } from "./Stage";
import { Box, Divider, IconButton, Toolbar } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CommonInfo } from "./CommonInfo";
import SidebarContext from "./SidebarContext";

interface ResizableSidebarProps {
  stage: Stage;
  open: boolean;
  toggleDrawer: () => void;
}

export function ResizableSidebar({ stage, open, toggleDrawer }: ResizableSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { sidebarWidth, setSidebarWidth } = React.useContext(SidebarContext);
  const [isResizing, setIsResizing] = useState(false);
  const minWidth = window.innerWidth * 0.22;
  const maxWidth = window.innerWidth * 0.60;

  const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent<HTMLDivElement>) => {
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const newWidth =
          mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left;
        if (typeof setSidebarWidth === "function") {
          if (newWidth < minWidth) {
            setSidebarWidth(minWidth);
          } else if (newWidth > maxWidth) {
            setSidebarWidth(maxWidth);
          } else {
            setSidebarWidth(newWidth);
          }
        }
      }
    },
    [isResizing]
  );

  React.useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <Box className="app-container">
      <Box
        ref={sidebarRef}
        className="app-sidebar"
        sx={{
          width: open ? (isResizing ? sidebarWidth : "auto") : 0,
          minWidth: open ? sidebarWidth : 0,
          overflowX: "hidden",
        }}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Box className="app-sidebar-content">
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <CommonInfo stage={stage} />
        </Box>
        <Box className="app-sidebar-resizer" onMouseDown={startResizing} />
      </Box>
      <Box className="app-frame" />
    </Box>
  );
}
