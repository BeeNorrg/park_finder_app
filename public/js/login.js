const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in');
      }
    }
};
  
  document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector().value.trim();
  const email = document.querySelector().value.trim();
  const password = document.querySelector().value.trim();

  if (name && email && password) {
    const response = await fetch ('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type' : 'application/json' }
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up');
    }
  }
}

document.querySelector().addEventListener('click', signupFormHandler);