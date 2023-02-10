import React from 'react';
import { Grid } from 'semantic-ui-react';

export default function DetailPage({ primary, secondary }) {

  return (
    <Grid columns={2} stackable>
      <Grid.Column width={4}>
        {/* Primary details (card) */}
        {primary}
      </Grid.Column>
      <Grid.Column width={12}>
        {/* Secondary details (lists) */}
        {secondary}
      </Grid.Column>
    </Grid>
  );
}