import React from 'react';
import { Placeholder as SemanticPlaceholder } from 'semantic-ui-react';

export default function Placeholder() {

  return (
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
  );
}