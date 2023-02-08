
function fetchLogin(loginData) {
  return (
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(res => res.json())
  );
}

function fetchSignup(signupData) {
  return (
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupData)
    })
      .then(res => res.json())
  );
}

function fetchLogout() {
  return (
    fetch('/api/logout', {
      method: 'DELETE'
    })
  );
}

function fetchMe() {
  return (
    fetch('/api/me')
      .then(res => res.json())
  );
}

export { fetchLogin, fetchLogout, fetchSignup, fetchMe };