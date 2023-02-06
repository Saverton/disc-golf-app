import React from 'react';
import NavBar from './NavBar';
import UserStatus from '../features/user/UserStatus';
import { Grid, Image } from 'semantic-ui-react';

export default function Header() {
  return (
    <Grid as="header" columns={3}>
      <Grid.Row centered>
        <Grid.Column>
          <Image src={`${process.env['PUBLIC_URL']}/we_disc.png`} alt="logo" size="medium"/>
        </Grid.Column>
        <UserStatus />
      </Grid.Row>
      <NavBar />
    </Grid>
  );
}