import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setDocsOpen } from '../features/graphql/graphqlSlice';
import { useGetDocsQuery } from '../features/api/apiSlice';
import { Collapse, Link, List, ListSubheader, Typography } from '@mui/material';
import { FieldList } from './docs/FieldList';
import Description from './docs/Description';

export default function Docs() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [isSublistOpen, setIsSublistOpen] = React.useState(false);

  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  const docsTypeName = useSelector((state: RootState) => state.graphql.docsTypeName);

  const { data: docs } = useGetDocsQuery({ docsTypeName });

  if (docs && docs['__type']) {
    console.log(docs['__type']);
  }

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
        <Typography variant="h6">Docs</Typography>
        <IconButton onClick={handleDocsClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider></Divider>
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="p" id="nested-list-subheader" sx={{ lineHeight: '1.3rem' }}>
            A GraphQL schema provides a root type for each kind of operation.
          </ListSubheader>
        }
      >
        <li>
          <Typography variant="body1">
            <span className="fieldName">query: </span>
            <Link href="#" onClick={handleClick}>
              <span className="fieldType">{docsTypeName}</span>
            </Link>
          </Typography>
        </li>
        <Collapse in={isSublistOpen} timeout="auto" unmountOnExit>
          {docs && docs['__type']['fields'] ? (
            <FieldList fields={docs['__type']['fields']}></FieldList>
          ) : docs && docs['__type']['inputFields'] ? (
            <FieldList fields={docs['__type']['inputFields']}></FieldList>
          ) : docs && docs['__type'] ? (
            <Description type={docs['__type']}></Description>
          ) : null}
        </Collapse>
      </List>
    </Drawer>
  );
}
