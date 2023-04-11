import React, { createContext, useContext, useState } from 'react';
import { VisitProps } from './Visit';

interface AppContextType {
  visit: VisitProps | null;
  setVisit: (visit: VisitProps | null) => void;
}

const AppContext = createContext<AppContextType>({
  visit: null,
  setVisit: () => { },
});

export default AppContext;