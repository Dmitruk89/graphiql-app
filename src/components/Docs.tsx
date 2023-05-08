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
import JSONPretty from 'react-json-pretty';

export default function Docs() {
  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data: docs } = useGetDocsQuery({});

  const handleDocsClose = () => {
    dispatch(setDocsOpen(false));
  };

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
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
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDocsClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider></Divider>
      <JSONPretty
        id="json-pretty"
        style={{ fontSize: '1rem' }}
        data={docs}
        mainStyle="line-height:1.3;color:#6e7781;background:#f5f5f5;overflow:auto;"
        errorStyle="line-height:1.3;color:#66d9ef;background:f5f5f5;overflow:auto;"
        keyStyle="color:#0550ae;"
        stringStyle="color:#116329;"
        valueStyle="color:#116329;"
        booleanStyle="color:#116329"
      ></JSONPretty>
    </Drawer>
  );
}
