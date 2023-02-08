import React from 'react';
import { Placeholder as SemanticPlaceholder, Divider } from 'semantic-ui-react';

export default function Placeholder() {

  return (
    <>
      <Divider hidden />
      <SemanticPlaceholder fluid>
        <SemanticPlaceholder.Header image>
          <SemanticPlaceholder.Line />
          <SemanticPlaceholder.Line />
        </SemanticPlaceholder.Header>
        <SemanticPlaceholder.Paragraph>
          <SemanticPlaceholder.Line />
          <SemanticPlaceholder.Line />
          <SemanticPlaceholder.Line />
        </SemanticPlaceholder.Paragraph>
      </SemanticPlaceholder>
    </>
  );
}