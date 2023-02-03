import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from './userSlice';
import { Icon, Button, Dropdown } from 'semantic-ui-react';

export default function UserStatus() {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const trigger = (
    <span>
      <Icon name="user" /> Welcome, <strong>{currentUser.username}</strong>
    </span>
  );

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          dispatch(logout());
          navigate('/login');
        } else {
          res.json().then(console.log);
        }
      })
  }

  return (
    <>
      {
        currentUser.id
        ? (
          <Dropdown trigger={trigger} button>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/users/${currentUser.id}`}>
                Profile
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button>Sign In</Button>
        )
      }
    </>
  );
}