import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

function FriendButton({ text, positive, negative, onClick }) {
  return (
    <Button onClick={onClick} positive={positive} negative={negative} animated="fade">
      <Button.Content visible content={text} />
      <Button.Content hidden>
        <Icon name={positive ? 'add user' : 'remove user'} />
      </Button.Content>
    </Button>
  );
}

export default FriendButton;