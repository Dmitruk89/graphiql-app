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
    dispatch(
      setDocsTypeName(
        type.name ? type.name : type.ofType.name ? type.ofType.name : type.ofType?.ofType?.name
      )
    );
    dispatch(setDocsType(type));
  };
  return (
    <List component="div" disablePadding sx={{ pl: 4 }}>
      {fields
        ? fields.map((field: DocsField) => {
            return (
              <li key={field.name}>
                <Typography mt={2} variant="body1">
                  <span className="fieldName">{field.name}</span>
                  {field.args ? <ArgList args={field.args}></ArgList> : null}:
                  <Link href="#" onClick={() => handleClick(field.type)}>
                    {' '}
                    {field.type.name ? (
                      <span className="fieldType">{field.type.name}</span>
                    ) : field.type.kind === 'LIST' ? (
                      <>
                        {'['}
                        <span className="fieldType">{field.type.ofType.name}</span>
                        {']'}
                      </>
                    ) : field.type.kind === 'NON_NULL' && field.type.ofType.kind === 'LIST' ? (
                      <>
                        {'['}
                        <span className="fieldType">{field.type.ofType?.ofType?.name}</span>
                        {']!'}
                      </>
                    ) : null}
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
