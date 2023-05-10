import { setDocsType, setDocsTypeName } from '../../features/graphql/graphqlSlice';
import React from 'react';
import { useDispatch } from 'react-redux';
import { DocsArg, DocsType } from '../../types/docsTypes';
import { Link } from '@mui/material';

export function ArgList(props: { args: DocsArg[] }) {
  const dispatch = useDispatch();
  const handleClick = (type: DocsType) => {
    dispatch(setDocsTypeName(type.name ? type.name : type.ofType?.name));
    dispatch(setDocsType(type));
  };
  return (
    <span>
      {props.args.map((arg: DocsArg) => {
        return (
          <span key={arg.name}>
            {props.args.length > 1 ? <br /> : ''}
            <span className="argName">
              {'('}
              {arg.name}
            </span>
            {': '}
            <Link href="#" onClick={() => handleClick(arg.type)}>
              <span className="argType">
                {arg.type.name ? arg.type.name : arg.type.ofType?.name}
                {')'}
              </span>
            </Link>
          </span>
        );
      })}
      {props.args.length > 1 ? <br /> : ''}
    </span>
  );
}
