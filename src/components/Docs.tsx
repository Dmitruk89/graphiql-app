import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Typography } from '@mui/material';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { setDocsOpen } from '../features/graphql/graphqlSlice';
import { selectTranslations } from '../features/translation/translationSlice';
import { Loading } from './Loading';
const DocsBody = React.lazy(() => import('./DocsBody'));

export default function Docs() {
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const theme = useTheme();

  const drawerWidth = useSelector((state: RootState) => state.graphql.docsWidth);
  const open = useSelector((state: RootState) => state.graphql.isDocsOpen);
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
      <>
        <DrawerHeader>
          <Typography variant="h6">{t.header.docs}</Typography>
          <IconButton onClick={handleDocsClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <React.Suspense fallback={<Loading text={t.loader.docs} fullHeight={false} />}>
          <DocsBody />
        </React.Suspense>
      </>
    </Drawer>
  );
}
