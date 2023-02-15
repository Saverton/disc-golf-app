import React from 'react';
import UserStatus from '../features/user/UserStatus';
import { Grid, Image } from 'semantic-ui-react';

export default function Header() {
  return (
      <Grid.Row columns={3} textAlign="center">
        <Grid.Column width={6} verticalAlign="middle">
          <Image src="./we_disc.png" alt="logo" size="medium"/>
        </Grid.Column>

        <Grid.Column computer={6} mobile={2} />

        <Grid.Column computer={4} mobile={8} verticalAlign="middle">
          <UserStatus />
        </Grid.Column>
      </Grid.Row>
  );
}