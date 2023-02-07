import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from './userSlice';
import { Icon, Button, Dropdown, Grid } from 'semantic-ui-react';

export default function UserStatus() {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const trigger = (
    <span>
      <Icon
        name={currentUser.notifications ? 'exclamation circle' : 'user'}
        color={ currentUser.notifications ? 'red' : 'default'}  
      /> Welcome, <strong>{currentUser.username}</strong>
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
    <Grid.Column floated="right" width={4} verticalAlign="middle">
      {
        currentUser.id
        ? (
          <Dropdown trigger={trigger} button>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to={`/users/${currentUser.id}`}>
                Profile
                {
                  currentUser.notifications
                  ? 
                  <>
                    {' '}<Icon name="circle" color="red" size="small"/>
                  </>
                  : null
                }
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <Button as={Link} to="/login" primary>Sign In</Button>
        )
      }
    </Grid.Column>
  );
}