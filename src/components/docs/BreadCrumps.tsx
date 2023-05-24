import { Link, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPrevListName } from '../../features/graphql/graphqlSlice';
import { RootState } from '../../store';

export default function BreadCrumps() {
  const dispatch = useDispatch();
  const prevListName = useSelector((state: RootState) => state.graphql.docsListStack.at(-2)?.name);
  const handleClick = () => {
    if (prevListName) {
      dispatch(setPrevListName());
    }
  };

  return (
    <Link href="#" onClick={handleClick}>
      <div className="previousContainer">
        {prevListName && <ChevronLeftIcon />}
        <Typography variant="body1">{prevListName}</Typography>
      </div>
    </Link>
  );
}
