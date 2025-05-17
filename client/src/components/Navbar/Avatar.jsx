import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { useNavigate } from 'react-router-dom';
const settings = [
    { name: 'Profile', path: '/profile' },
    { name: 'Send Money', path: '/send-money' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Logout', action: 'logout' }
  ];
function AvatarMenu({image}) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
   
    navigate('/');
  };

  const handleClick = (setting) => {
    if (setting.action === 'logout') {
      handleLogout();
    } else {
      navigate(setting.path);
    }
  };

  return (
    <div>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="User Avatar" src={image} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((s,idx) => (
          <MenuItem key={idx} onClick={() => handleClick(s)}>
            <Typography textAlign="center">{s.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default AvatarMenu;
