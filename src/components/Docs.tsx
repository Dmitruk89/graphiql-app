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

export default function Docs() {
  const [isSublistOpen, setIsSublistOpen] = React.useState(true);

  const handleClick = () => {
    setIsSublistOpen(!isSublistOpen);
  };
  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
  const dispatch = useDispatch();
  const theme = useTheme();

  const { data: docs } = useGetDocsQuery({});
  if (docs) {
    console.log(docs['__schema']['types']);
  }

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
            query:{' '}
            <Link href="#" onClick={handleClick}>
              Query
            </Link>
          </Typography>
        </li>
        <Collapse in={isSublistOpen} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {docs
              ? docs['__schema']['types'][0]['fields'].map(
                  (field: { name: string; description: string }) => {
                    return (
                      <li key={field.name}>
                        <Typography variant="body1">
                          {field.name}():
                          <Link href="#" onClick={handleClick}>
                            Type
                          </Link>
                        </Typography>
                        <ListSubheader
                          component="p"
                          id="nested-list-subheader"
                          sx={{ lineHeight: '1.3rem' }}
                        >
                          {field.description}
                        </ListSubheader>
                      </li>
                    );
                  }
                )
              : null}
          </List>
        </Collapse>
      </List>
    </Drawer>
  );
}
