import React from 'react';
import Divider from '@mui/material/Divider';
import { Box, Link, List, ListSubheader, Typography } from '@mui/material';
import { useGetDocsQuery } from '../features/api/apiSlice';
import { CircularProgress } from '@mui/material';
import { FieldList } from './docs/FieldList';
import Description from './docs/Description';
import BreadCrumps from './docs/BreadCrumps';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export default function DocsBody() {
  const [isSublistOpen, setIsSublistOpen] = React.useState(false);

  const docsTypeName = useSelector((state: RootState) => state.graphql.docsTypeName);

  const { data: docs, isFetching, isSuccess } = useGetDocsQuery({ docsTypeName });

  const handleClick = () => {
    setIsSublistOpen(!isSublistOpen);
  };

  let ListContent;
  const drawerRef = React.useRef(undefined);

  if (isFetching) {
    ListContent = (
      <Box
        ref={drawerRef}
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          color: '#8c959f',
          marginTop: '50px',
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    );
  } else if (isSuccess) {
    ListContent = docs['__type']['fields'] ? (
      <FieldList fields={docs['__type']['fields']}></FieldList>
    ) : docs['__type']['inputFields'] ? (
      <FieldList fields={docs['__type']['inputFields']}></FieldList>
    ) : docs['__type'] ? (
      <Description type={docs['__type']}></Description>
    ) : null;
  }

  return (
    <>
      <BreadCrumps></BreadCrumps>
      <Divider></Divider>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{
              lineHeight: '1.3rem',
              zIndex: 5,
              margin: 0,
              padding: '15px',
              top: '-15px',
              boxShadow: '0px 50px 71px -44px rgba(0,0,0,0.2)',
            }}
          >
            A GraphQL schema provides a root type for each kind of operation.
            <li>
              <Typography variant="body1">
                <span className="fieldName">Fields: </span>
                <Link href="#" onClick={handleClick}>
                  <span className="fieldType">{docsTypeName}</span>
                </Link>
              </Typography>
            </li>
          </ListSubheader>
        }
      >
        {ListContent}
      </List>
    </>
  );
}
