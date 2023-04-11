

import React from 'react';
import Box from '@mui/material/Box';
import { CircularProgress } from "@material-ui/core";

export function LoadingBox() {
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
			<CircularProgress color="primary" thickness={4} size={80} />
		</Box>);
}