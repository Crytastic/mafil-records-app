import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  sidebarWidth: number;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open' && prop !== 'sidebarWidth',
})<AppBarProps>(({ theme, open, sidebarWidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  ...(open && {
    marginLeft: sidebarWidth,
    width: `calc(100% - ${sidebarWidth}px)`,
  }),
}));

export default AppBar;