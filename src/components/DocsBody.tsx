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
import { selectTranslations } from '../features/translation/translationSlice';
import FieldInfo from './docs/FieldInfo';

export default function DocsBody() {
  const t = useSelector(selectTranslations);
  const [isSublistOpen, setIsSublistOpen] = React.useState(false);
  const docsTypeName = useSelector((state: RootState) => state.graphql.docsTypeName);
  const docsListName = useSelector((state: RootState) => state.graphql.docsListName);
  const isTypeQuery = useSelector((state: RootState) => state.graphql.isTypeQuery);
  const docsField = useSelector((state: RootState) => state.graphql.docsField);

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
  } else if (isSuccess && isTypeQuery) {
    ListContent = docs['__type']['fields'] ? (
      <FieldList fields={docs['__type']['fields']}></FieldList>
    ) : docs['__type']['inputFields'] ? (
      <FieldList fields={docs['__type']['inputFields']}></FieldList>
    ) : docs['__type'] ? (
      <Description type={docs['__type']}></Description>
    ) : null;
  } else if (!isTypeQuery) {
    ListContent = docsField ? <FieldInfo field={docsField}></FieldInfo> : null;
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
            {t.docs.description}
            <li>
              <Typography variant="body1">
                <span className="fieldName">Fields: </span>
                <Link href="#" onClick={handleClick}>
                  {docsListName}
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
