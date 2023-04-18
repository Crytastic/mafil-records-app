import React from "react";

const SidebarContext = React.createContext({
    sidebarWidth: 380,
    setSidebarWidth: (width: number) => { },
});

export default SidebarContext;