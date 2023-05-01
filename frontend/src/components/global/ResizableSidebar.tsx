import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Box, Divider, IconButton, Toolbar } from "@mui/material";
import React, { useRef, useState } from "react";
import "./ResizableSidebar.css";

import SidebarContext from "../../contexts/SidebarContext";
import { SidebarContent } from "./SidebarContent";

interface ResizableSidebarProps {
  open: boolean;
  toggleDrawer: () => void;
  content?: React.ReactNode;
}

export function ResizableSidebar({ open, toggleDrawer, content }: ResizableSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const { sidebarWidth, setSidebarWidth } = React.useContext(SidebarContext);
  const [isResizing, setIsResizing] = useState(false);
  const [maxWidth, setMaxWidth] = useState(window.innerWidth * 0.75);
  const minWidth = 150;

  const updateMaxWidth = () => {
    if (open && sidebarWidth > window.innerWidth) {
      setSidebarWidth(window.innerWidth);
    }
  };

  const startResizing = React.useCallback((mouseDownEvent: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    mouseDownEvent.preventDefault();
    setIsResizing(true);
  }, []);

  const stopResizing = React.useCallback(() => {
    setIsResizing(false);
  }, []);

  const resizeMouse = React.useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const newWidth =
          mouseMoveEvent.clientX - sidebarRef.current.getBoundingClientRect().left;
        updateWidth(newWidth);
      }
    },
    [isResizing]
  );

  const resizeTouch = React.useCallback(
    (touchMoveEvent: TouchEvent) => {
      if (isResizing && sidebarRef.current) {
        const newWidth =
          touchMoveEvent.touches[0].clientX - sidebarRef.current.getBoundingClientRect().left;
        updateWidth(newWidth);
      }
    },
    [isResizing]
  );

  const updateWidth = (newWidth: number) => {
    if (typeof setSidebarWidth === "function") {
      if (newWidth < minWidth) {
        setSidebarWidth(minWidth);
      } else if (newWidth > maxWidth) {
        setSidebarWidth(maxWidth);
      } else {
        setSidebarWidth(newWidth);
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateMaxWidth);
    return () => {
      window.removeEventListener('resize', updateMaxWidth);
    };
  }, []);

  React.useEffect(() => {
    window.addEventListener("mousemove", resizeMouse);
    window.addEventListener("mouseup", stopResizing);
    window.addEventListener("touchmove", resizeTouch);
    window.addEventListener("touchend", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resizeMouse);
      window.removeEventListener("mouseup", stopResizing);
      window.removeEventListener("touchmove", resizeTouch);
      window.removeEventListener("touchend", stopResizing);
    };
  }, [resizeMouse, stopResizing, resizeTouch]);

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
          <SidebarContent content={content} />
        </Box>
        <Box className="app-sidebar-resizer" onMouseDown={startResizing} onTouchStart={startResizing} />
      </Box>
      <Box className="app-frame" />
    </Box>
  );
}
