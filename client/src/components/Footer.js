import React from 'react';
import { Grid, Header, List, Icon, Label } from 'semantic-ui-react';

function Footer() {
  return (
    <Grid.Row as="footer" id="page-footer" columns={4} centered color="blue" inverted>
      <Grid.Column>
        <Header inverted>
          Contact Developer
        </Header>

        <List>
          <List.Item>
            <Label as="a" href="https://www.linkedin.com/in/scottmeadows-se/" target="_blank" rel="noreferrer" color="white">
              <Icon name="linkedin" />
              <Label.Detail>
                LinkedIn
              </Label.Detail>
            </Label>
          </List.Item>

          <List.Item>
            <Label as="a" href="https://github.com/Saverton" target="_blank" rel="noreferrer">
              <Icon name="github" />
              <Label.Detail>
                GitHub
              </Label.Detail>
            </Label>
          </List.Item>

          <List.Item>
            <Label as="a" href="mailto:scottmeadows04@gmail.com">
              <Icon name="mail" />
              <Label.Detail>
                Email
              </Label.Detail>
            </Label>
          </List.Item>
        </List>
      </Grid.Column>

      <Grid.Column textAlign='right'>
        <Header inverted>
          Report an Issue
        </Header>

        <Label as="a" href="https://github.com/Saverton/disc-golf-app/issues" target="_blank" rel="noreferrer">
          <Icon name="github" />
          <Label.Detail>
            GitHub Issue Tracker
          </Label.Detail>
        </Label>
      </Grid.Column>
    </Grid.Row>
  );
}

export default Footer;