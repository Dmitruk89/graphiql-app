import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export function Loading(props: { text: string | null; fullHeight: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: props.fullHeight ? '100vh' : '',
      }}
    >
      {props.text && <Typography>{props.text}</Typography>}
      <CircularProgress color="inherit" />
    </Box>
  );
}
