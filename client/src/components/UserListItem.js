import React from "react";
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';

export default function UserListItem({ user }) {

  return (
    <List.Item as={Link} to={`/users/${user.id}`}>
      <List.Icon name="user" verticalAlign="middle"/>
      <List.Content>
        <List.Header content={user.username} />
        <List.Description content={user.full_name} />
      </List.Content>
    </List.Item>
  );
}