"use client";

import Image from "next/image";
import { useContext } from "react";
import { PageContext } from "@/context/pageContext";
import { fetchTk } from '@/lib/helper';
import React, { FormEvent, useState } from 'react';
import { Container } from './styles';
import { LoadingSpin } from "../LoadingSpin";
import googleImage from "@/assets/google.svg";
import Link from "next/link";
import { Register } from "../Register";


export const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateSessionId } = useContext(PageContext);
  const [user] = useAuthState(auth);

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

  const handleGoogleLogin = () => {
    signInWithGoogle();
    if (typeof updateSessionId === 'function') {
      if (user) {
        getUserByFirebaseUserId({ firebaseUserId: user?.uid ?? "", createUser: true, userData: user }).then((response) => {
          updateSessionId(response?._id ?? response?.id ?? "");
        });
      }
    }
  };

  const isPasswordCorrect = password === confirmPassword;

  return (

    <Container>
      <Register></Register>
    </Container>

  );
};

