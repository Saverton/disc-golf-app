import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'semantic-ui-react';

function WelcomeModal() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user);

  /**
   * Automatically close the modal if the user is logged in through the browser session.
   */
  useEffect(() => {
    if (currentUser.id)
      setOpen(false);
  }, [currentUser]);

  /**
   * Redirect the user to the login page.
   */
  function toLogin() {
    setOpen(false);
    navigate('/login');
  }

  /**
   * Redirect the user to the signup page.
   */
  function toSignup() {
    setOpen(false);
    navigate('/signup');
  }

  /**
   * Redirect the user to the feed page.
   */
  function asGuest() {
    setOpen(false);
    navigate('/feed');
  }

  return (
    <Modal open={open}>
      <Modal.Header>Welcome to WeDisc!</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          This is a student project, but feel free to use it as any other site!
          User passwords are hashed in the database, so not even site developers with
          access to the database can see your password. It is still recommended that
          you use a different password for each site you belong to, however.
          Since database size is limited and our hosting services are free,
          service is not always guaranteed. For further questions, please
          contact the developer, Scott Meadows.
          <br />

          <a href="mailto:scottmeadows04@gmail.com">scottmeadows04@gmail.com</a>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={toLogin} primary>
          Log In
        </Button>
        <Button onClick={toSignup} primary>
          Sign Up
        </Button>
        <Button onClick={asGuest} secondary>
          Continue as Guest
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default WelcomeModal;