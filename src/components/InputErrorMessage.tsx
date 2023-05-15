import React from 'react';
import { Typography } from '@mui/material';

export function InputErrorMessage(props: { error?: string }): JSX.Element {
  return <Typography style={{ color: 'red' }}>{props.error}</Typography>;
}
