import React from 'react';
import { FieldError } from 'react-hook-form/dist/types/errors';
import { Typography } from '@mui/material';

export function InputErrorMessage(props: { error: FieldError }): JSX.Element {
  return <Typography style={{ color: 'red' }}>{props.error.message}</Typography>;
}
