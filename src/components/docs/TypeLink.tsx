import { Link } from '@mui/material';
import {
  setDocsType,
  setDocsTypeName,
  setDocsListName,
  setIsTypeQuery,
} from '../../features/graphql/graphqlSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DocsType } from '../../types/docsTypes';

export default function TypeLink(props: { type: DocsType }) {
  const dispatch = useDispatch();
  const handleTypeClick = (type: DocsType) => {
    const name = type.name
      ? type.name
      : type.ofType.name
      ? type.ofType.name
      : type.ofType?.ofType?.name;
    dispatch(setIsTypeQuery(true));
    dispatch(setDocsTypeName(name));
    dispatch(setDocsListName({ name: name, isType: true }));
    dispatch(setDocsType(type));
  };
  return (
    <Link href="#" onClick={() => handleTypeClick(props.type)}>
      {' '}
      {props.type.ofType?.kind === 'LIST' ? '[' : null}
      <span className="argType">
        {props.type.name
          ? props.type.name
          : props.type.ofType?.name
          ? props.type.ofType?.name
          : props.type.ofType?.ofType?.name
          ? props.type.ofType?.ofType?.name
          : props.type.ofType?.ofType?.ofType?.name}
      </span>
      {props.type.kind === 'NON_NULL' ? '!' : null}
      {props.type.ofType?.kind === 'LIST' ? ']!' : null}
    </Link>
  );
}
