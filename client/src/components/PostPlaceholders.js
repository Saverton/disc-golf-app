import React from 'react';
import Placeholder from './Placeholder';
import { Divider } from 'semantic-ui-react';

function PostPlaceholders() {
  return (
    <div>
      <Divider hidden />
      <Placeholder />
      <Placeholder />
      <Placeholder />      
    </div>
  );
}

export default PostPlaceholders