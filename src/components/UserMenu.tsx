import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { selectTranslations } from '../features/translation/translationSlice';
import { getAuth, signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { removeTokenExpirationFromLocalStorage } from '../helpers/helperFuntions';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const auth = getAuth();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const t = useSelector(selectTranslations);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOutClick = () => {
    signOut(auth)
      .then(() => {
        removeTokenExpirationFromLocalStorage();
        navigate('/');
      })
      .catch(() => {
        console.error;
      });
  };
  return (
    <React.Fragment>
      <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
        {user && <Typography component="div">{user.email}</Typography>}
        <Button onClick={handleLogOutClick} color="info" sx={{ margin: ' 0 0.65rem 0 1rem' }}>
          {t.header.logoutButton}
        </Button>
      </Box>
      <Box sx={{ display: { xs: 'flex', sm: 'none' }, alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> {user && <Typography component="div">{user.email}</Typography>}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogOutClick}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t.header.logoutButton}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
