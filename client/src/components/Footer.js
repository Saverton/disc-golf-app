import React from 'react';
import { Divider, Grid, Header, List, Item, Icon } from 'semantic-ui-react';

function Footer() {
  return (
    <footer>
      <Divider />
      <Grid centered columns={4} divided="vertically">
        <Grid.Column>
          <div>
            <Header>
              Contact Developer
            </Header>
            <List relaxed>
              <List.Item>
                <List.Icon name="linkedin" />
                <List.Content>
                  <a href="https://www.linkedin.com/in/scottmeadows-se/" target="_blank" rel="noreferrer">LinkedIn</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="github" />
                <List.Content>
                  <a href="https://github.com/Saverton" target="_blank" rel="noreferrer">GitHub</a>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name="mail" />
                <List.Content>
                  <a href="mailto:scottmeadows04@gmail.com">Email</a>
                </List.Content>
              </List.Item>
            </List>
          </div>
        </Grid.Column>
        <Grid.Column>
          <Header>
            Report an Issue
          </Header>
          <Item>
            <Item.Content>
              <Icon name="github" />
              <a href="https://github.com/Saverton/disc-golf-app/issues" target="_blank" rel="noreferrer">GitHub Issue Tracker</a>
            </Item.Content>
          </Item>
        </Grid.Column>
      </Grid>
    </footer>
  );
}

export default Footer;