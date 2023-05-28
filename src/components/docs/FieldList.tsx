import { Link, List, ListSubheader, Typography } from '@mui/material';
import { setDocsListName, setDocsField, setIsTypeQuery } from '../../features/graphql/graphqlSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DocsField } from '../../types/docsTypes';
import { ArgList } from './ArgList';
import TypeLink from './TypeLink';

export function FieldList(props: { fields: DocsField[] }) {
  const dispatch = useDispatch();
  const { fields } = props;

  const handleFieldClick = (field: DocsField) => {
    dispatch(setIsTypeQuery(false));
    dispatch(setDocsField(field));
    dispatch(setDocsListName({ name: field.name, isType: false }));
  };
  return (
    <List component="div" disablePadding sx={{ pl: 4 }}>
      {fields
        ? fields.map((field: DocsField) => {
            return (
              <li key={field.name}>
                <Typography mt={2} variant="body1">
                  <Link href="#" onClick={() => handleFieldClick(field)}>
                    <span className="fieldName">{field.name}</span>
                  </Link>
                  {field.args ? <ArgList args={field.args}></ArgList> : null}:
                  <TypeLink type={field.type}></TypeLink>
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
