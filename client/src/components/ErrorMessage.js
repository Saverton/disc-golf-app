import React from 'react';
import { List } from 'semantic-ui-react';

export default function ErrorMessage({ error }) {
  return (
    <List.Item style={{backgroundColor: 'coral'}}>
      <List.Icon name="warning" color="red" />
      <List.Content>
        {error}
      </List.Content>
    </List.Item>
  );
}