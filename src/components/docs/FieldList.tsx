import { Link, List, ListSubheader, Typography } from '@mui/material';
import { setDocsType, setDocsTypeName } from '../../features/graphql/graphqlSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DocsField, DocsType } from '../../types/docsTypes';
import { ArgList } from './ArgList';

export function FieldList(props: { fields: DocsField[] }) {
  const dispatch = useDispatch();
  const { fields } = props;
  const handleClick = (type: DocsType) => {
    dispatch(setDocsTypeName(type.name));
    dispatch(setDocsType(type));
  };
  return (
    <List component="div" disablePadding sx={{ pl: 4 }}>
      {fields
        ? fields.map((field: DocsField) => {
            return (
              <li key={field.name}>
                <Typography variant="body1">
                  {field.name}
                  <ArgList args={field.args}></ArgList>:
                  <Link href="#" onClick={() => handleClick(field.type)}>
                    {field.type.name}
                  </Link>
                </Typography>
                <ListSubheader
                  component="p"
                  id="nested-list-subheader"
                  sx={{ lineHeight: '1.3rem' }}
                >
                  {field.description}
                </ListSubheader>
              </li>
            );
          })
        : null}
    </List>
  );
}
