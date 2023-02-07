import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Grid, Icon, Menu } from 'semantic-ui-react';

export default function NavBar() {
  const currentUser = useSelector(state => state.user);

  return (
    <Grid.Row width={16}>
      <Menu as="nav" fluid widths={5}>
        <Menu.Item as={NavLink} to="/site/feed">Feed</Menu.Item>
        <Menu.Item as={NavLink} to="/site/new_post">Post</Menu.Item>
        <Menu.Item as={NavLink} to="/site/courses">Courses</Menu.Item>
        <Menu.Item as={NavLink} to="/site/users" end>Find Friends</Menu.Item>
        {
          currentUser.id
          ? 
          <Menu.Item as={NavLink} to={`/site/users/${currentUser.id}`}>
            {
              currentUser.notifications
              ? 
              <>
                <Icon
                  name='circle'
                  color='red'
                  size='small'
                />
              </>
              : null
            }
            Profile
          </Menu.Item>
          : <Menu.Item as={NavLink} to="/site/login">Login</Menu.Item>
        }
      </Menu>
    </Grid.Row>
  );
}