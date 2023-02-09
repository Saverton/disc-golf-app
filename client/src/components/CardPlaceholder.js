import React from 'react';
import { Placeholder } from 'semantic-ui-react';

function CardPlaceholder() {
  return (
    <Placeholder>
      <Placeholder.Header>
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="very short" />
        <Placeholder.Line length="short" />
        <Placeholder.Line length="very short" />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  );
}

export default CardPlaceholder;