import React from 'react';
import { Menu, Label } from 'semantic-ui-react';
export default function ProfileNav({ options, currentChoice, setChoice }) {
  const navOptions = options.map((o, idx) => (
    <Menu.Item
      key={`profile-nav-${idx}`}
      name={o.name}
      active={o.name === currentChoice}
      onClick={() => setChoice(o.name)}
    >
      {o.name}
      {o.label
        ? <Label circular color="red">{o.label}</Label>
        : null
      }
    </Menu.Item>
  ));

  return (
    <Menu fluid widths={options.length}>
      {navOptions}
    </Menu>
  );
}