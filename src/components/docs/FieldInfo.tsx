import { ListSubheader, Typography } from '@mui/material';
import React from 'react';
import { DocsField } from '../../types/docsTypes';
import { ArgList } from './ArgList';
import TypeLink from './TypeLink';

export default function FieldInfo(props: { field: DocsField }) {
  return (
    <Typography mt={2} variant="subtitle1">
      <ListSubheader component="p" id="nested-list-subheader" sx={{ lineHeight: '1.3rem' }}>
        {props.field.description}
      </ListSubheader>
      <Typography pl={2}>
        Type:<TypeLink type={props.field.type}></TypeLink>
        <br />
        {props.field.args && props.field.args?.length > 0 && 'Args: '}
        {props.field.args && <ArgList args={props.field.args}></ArgList>}
      </Typography>
    </Typography>
  );
}
