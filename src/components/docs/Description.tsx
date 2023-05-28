import { ListSubheader } from '@mui/material';
import React from 'react';
import { DocsType } from '../../types/docsTypes';

export default function Description(props: { type: DocsType }) {
  return (
    <ListSubheader component="p" id="nested-list-subheader" sx={{ lineHeight: '1.3rem' }}>
      {props.type.description}
    </ListSubheader>
  );
}
