import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Link, List, ListSubheader, Typography } from '@mui/material';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setDocsOpen } from '../features/graphql/graphqlSlice';
import { useGetDocsQuery } from '../features/api/apiSlice';
import { selectTranslations } from '../features/translation/translationSlice';
import { CircularProgress } from '@mui/material';
import { FieldList } from './docs/FieldList';
import Description from './docs/Description';
import BreadCrumps from './docs/BreadCrumps';
import FieldInfo from './docs/FieldInfo';

export default function Docs() {
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isSublistOpen, setIsSublistOpen] = React.useState(false);

  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  const docsTypeName = useSelector((state: RootState) => state.graphql.docsTypeName);
  const docsListName = useSelector((state: RootState) => state.graphql.docsListName);
  const isTypeQuery = useSelector((state: RootState) => state.graphql.isTypeQuery);
  const docsField = useSelector((state: RootState) => state.graphql.docsField);
  const { data: docs, isFetching, isSuccess } = useGetDocsQuery({ docsTypeName });

  const handleClick = () => {
    setIsSublistOpen(!isSublistOpen);
  };
  const handleDocsClose = () => {
    dispatch(setDocsOpen(false));
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }));

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
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          padding: '15px',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <Typography variant="h6">{t.docs.title}</Typography>
        <IconButton onClick={handleDocsClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
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
              <Typography color="info" variant="h6">
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
    </Drawer>
  );
}
