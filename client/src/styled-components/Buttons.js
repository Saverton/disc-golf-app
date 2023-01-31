import styled from 'styled-components';

const Button = styled.button`
  color: black;
  text-decoration: none;
  padding: 0.5em;
  border: 1px solid black;
  background-color: transparent;

  &:hover {
    background-color: lightgray;
  }
`;

const LinkButton = styled(Button)`
  border: none;
`;

const NavButton = styled(LinkButton)`
  &.active {
    background-color: blue;
    color: white;
  }
`;

export { Button, NavButton, LinkButton };