"use client";

import { useContext } from "react";
import { PageContext } from "@/context/pageContext";
import { fetchTk } from '@/lib/helper';
import React, { FormEvent, useState } from 'react';
import { Container } from './styles';
import { LoadingSpin } from "../LoadingSpin";
import Link from "next/link";

export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateSessionId } = useContext(PageContext);

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
    setLoading(true);
    fetchTk('/api/user', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    }).then((userResponse: Response) => {
      userResponse.json().then((user) => {
        if (updateSessionId) updateSessionId(user?._id ?? "");
      }).catch((error) => {
        console.error('An error occurred while parsing the user response', error);
        setLoading(false);
      });
    }).finally(() => {
      setLoading(false);
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
      <div style={{ display: "flex", gap: 5 }}>
        <p>Already have an account?</p>
        <Link href="/login"><strong>Log In</strong></Link>
      </div>
      {
        loading && <LoadingSpin />
      }
    </Container>
  );
};

