import React from 'react';
import { Menu } from 'semantic-ui-react';
export default function ProfileNav({ options, currentChoice, setChoice }) {
  const navOptions = options.map((o, idx) => (
    <Menu.Item
      key={`profile-nav-${idx}`}
      name={o}
      active={o === currentChoice}
      onClick={() => setChoice(o)}
    >
      {o}
    </Menu.Item>
  ));

  return (
    <Menu fluid widths={options.length}>
      {navOptions}
    </Menu>
  );
}