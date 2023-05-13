import { Link, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPrevTypeName } from '../../features/graphql/graphqlSlice';
import { RootState } from '../../store';

export default function BreadCrumps() {
  const dispatch = useDispatch();
  const prevTypeName = useSelector((state: RootState) => state.graphql.typeNameStack.at(-2));
  const handleClick = () => {
    if (prevTypeName) {
      dispatch(setPrevTypeName());
    }
  };

  return (
    <Link href="#" onClick={handleClick}>
      <div className="previousContainer">
        {prevTypeName && <ChevronLeftIcon />}
        <Typography variant="body1">{prevTypeName}</Typography>
      </div>
    </Link>
  );
}
