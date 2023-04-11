import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Card, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import { IconButtonProps } from '@material-ui/core';

interface AttributeProps {
  title: string;
  text: string;
}

export function Attribute({ title, text }: AttributeProps) {
  return (
    <Grid item xs={4} lg={4}>
      <Box
      >
        {title}
      </Box>
      <Box
        sx={{
          fontWeight: 'bold'
        }}
      >{text}</Box>
    </Grid>
  )
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface AnyProps {
  children?: ReactNode
}

export default function CommonCard({ children }: AnyProps) {
  return (
    <Card
      sx={{
        padding: 1,
        margin: 1,
        display: 'column',
        flexDirection: 'row',
      }}
    >
      {children}
    </Card>
  )
}