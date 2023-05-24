import React from 'react';
import { DocsArg } from '../../types/docsTypes';
import TypeLink from './TypeLink';

export function ArgList(props: { args: DocsArg[] }) {
  return (
    <span>
      {props.args.length ? '(' : null}
      {props.args.map((arg: DocsArg) => {
        return (
          <span key={arg.name}>
            {props.args.length > 1 ? <br /> : ''}
            <span className="argName">{arg.name}</span>
            {': '}
            <TypeLink type={arg.type}></TypeLink>
          </span>
        );
      })}
      {props.args.length > 1 ? <br /> : ''}
      {props.args.length ? ')' : null}
    </span>
  );
}
