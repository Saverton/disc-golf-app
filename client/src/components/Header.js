import React from 'react';
import UserStatus from '../features/user/UserStatus';
import { Grid, Image } from 'semantic-ui-react';

export default function Header() {
  return (
      <Grid.Row columns={3} textAlign="center">
        <Grid.Column width={6}>
          <Image src="./we_disc.png" alt="logo" size="medium"/>
        </Grid.Column>

        <Grid.Column width={6}/>

        <Grid.Column width={4} verticalAlign="middle">
          <UserStatus />
        </Grid.Column>
      </Grid.Row>
  );
}