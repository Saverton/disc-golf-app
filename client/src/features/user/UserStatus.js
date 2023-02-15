import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from './userSlice';
import { Icon, Button, Dropdown, Menu } from 'semantic-ui-react';

export default function UserStatus() {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const trigger = (
    <span>
      <Icon
        name={currentUser.notifications ? 'exclamation circle' : 'user'}
        color={currentUser.notifications ? 'red' : 'black'}
      /> Welcome, <strong>{currentUser.username}</strong>
    </span>
  );

  // Logs out the current user, navigates to sign in page
  const handleLogout = () => {
    dispatch(logout())
      .then(() => navigate('/login'))
  }

  // Navigates the user to the profile page
  const handleProfileNavigate = () => {
    navigate(`/users/${currentUser.id}`)
  }

  if (currentUser.id) {
    return (
      <Dropdown trigger={trigger} button>
        <Dropdown.Menu>
          <Button animated="fade" fluid onClick={handleProfileNavigate}>
            <Button.Content visible>
              Profile{' '}
              {
                currentUser.notifications && <Icon name="circle" color="red" size="small"/>
              }
            </Button.Content>
            <Button.Content hidden>
              <Icon name="user circle" />
            </Button.Content>
          </Button>

          <Button animated="fade" onClick={handleLogout} fluid>
            <Button.Content visible>
              Logout
            </Button.Content>
            <Button.Content hidden>
              <Icon name="logout" />
            </Button.Content>
          </Button>
        </Dropdown.Menu>
      </Dropdown>
    );
  } else {
    return <Button as={Link} to="/login" primary>Sign In</Button>
  }
}