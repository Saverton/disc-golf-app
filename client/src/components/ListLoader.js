import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

function ListLoader({ loading }) {
  return (
    <Dimmer active={loading === 'pending'} inverted>
      <Loader content="Loading"/>
    </Dimmer>
  );
}

export default ListLoader;