import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

function NoPostsFeed() {
  return (
    <Header textAlign='center' size='large' icon>
      <Icon name="frown outline"/>
      <Header.Content>No Posts Found...</Header.Content>
      <Header.Subheader>Come back later or find new friends</Header.Subheader>
    </Header>
  );
}

export default NoPostsFeed;