import { fetchTk } from '@/lib/helper';
import React, { FormEvent, useState } from 'react';
import { Container } from './styles';

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === confirmPassword) {
      createUser(username, email, password);
    } else {
      alert('Passwords do not match');
    }
  };

  const createUser = (username: string, email: string, password: string) => {
    fetchTk('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }).then((userResponse) => {
      console.log(userResponse);
    });
  };

  const isPasswordCorrect = password === confirmPassword;

  return (
    <Container>
      <form onSubmit={handleSignUp}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>

        <label>
          Email (optional):
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>

        <label>
          Password:
          <input required={true} type="password" value={password} onChange={handlePasswordChange} />
        </label>

        <label>
          Confirm Password:
          <input required={true} type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>

        <button type='submit'>Sign Up</button>
        {password.length > 0 &&
          <div style={{ width: "100%" }}>
            {isPasswordCorrect ? <p>Passwords match</p> : <p>Passwords do not match</p>}
          </div>
        }
      </form>
    </Container>
  );
};

