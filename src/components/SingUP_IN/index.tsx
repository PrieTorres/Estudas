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
import { signInWithGoogle, auth } from '@/firebase';
import { getUserByFirebaseUserId } from "@/lib/helper";
import { useAuthState } from "react-firebase-hooks/auth";

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
      <div className="h-screen flex justify-center items-center">
        <main className="w-[475px]  p-16 bg-slate-400 shadow-lg rounded-md">
          <h1 className="mb-12 text-center font-bold text-4xl">Cadastro</h1>

          <form onSubmit={handleSignUp}>

            <label htmlFor="username">Nome</label>
            <div className="relative">
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z"></path></svg>
              <input
                onChange={handleUsernameChange}
                value={username}
                className="block w-full h-12 pl-8 border-b-[2px] border-[#9caccb] placeholder:text-[#9caccb]"
                placeholder="Insira seu username"
                type="text"
                name="username"
                id="username"
              />
            </div>

            <label className="block mt-6" htmlFor="email">Email (Opcional)</label>
            <div className="relative">
              <svg className="absolute left-1.5" fill="#9caccb" height="24px" width="20px" viewBox="0 0 75.294 75.294">
                <g>
                  <path d="M66.097,12.089h-56.9C4.126,12.089,0,16.215,0,21.286v32.722c0,5.071,4.126,9.197,9.197,9.197h56.9
		c5.071,0,9.197-4.126,9.197-9.197V21.287C75.295,16.215,71.169,12.089,66.097,12.089z M61.603,18.089L37.647,33.523L13.691,18.089
		H61.603z M66.097,57.206h-56.9C7.434,57.206,6,55.771,6,54.009V21.457l29.796,19.16c0.04,0.025,0.083,0.042,0.124,0.065
		c0.043,0.024,0.087,0.047,0.131,0.069c0.231,0.119,0.469,0.215,0.712,0.278c0.025,0.007,0.05,0.01,0.075,0.016
		c0.267,0.063,0.537,0.102,0.807,0.102c0.001,0,0.002,0,0.002,0c0.002,0,0.003,0,0.004,0c0.27,0,0.54-0.038,0.807-0.102
		c0.025-0.006,0.05-0.009,0.075-0.016c0.243-0.063,0.48-0.159,0.712-0.278c0.044-0.022,0.088-0.045,0.131-0.069
		c0.041-0.023,0.084-0.04,0.124-0.065l29.796-19.16v32.551C69.295,55.771,67.86,57.206,66.097,57.206z"/>
                </g>
              </svg>
              <input
                onChange={handleEmailChange}
                value={email}
                className="block w-full h-12 pl-10 pr-4 border-b-[2px] border-[#9caccb] placeholder:text-[#9caccb]"
                placeholder="Insira seu email"
                type="email"
                name="email"
                id="email"
              />
            </div>

            <label className="block mt-6" htmlFor="password">Senha</label>
            <div className="relative">
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M208,82H174V56a46,46,0,0,0-92,0V82H48A14,14,0,0,0,34,96V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V96A14,14,0,0,0,208,82ZM94,56a34,34,0,0,1,68,0V82H94ZM210,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V96a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Zm-82-94a26,26,0,0,0-6,51.29V184a6,6,0,0,0,12,0V165.29A26,26,0,0,0,128,114Zm0,40a14,14,0,1,1,14-14A14,14,0,0,1,128,154Z"></path></svg>
              <input
                onChange={handlePasswordChange}
                value={password}
                className="block w-full h-12 pl-8 border-b-[2px] border-[#9caccb] placeholder:text-[#9caccb]"
                placeholder="Insira sua senha" type="password" name="password" id="password"
              />
            </div>


            <label className="block mt-6" htmlFor="password">Confirme sua senha</label>
            <div className="relative">
              <svg className="absolute" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M208,82H174V56a46,46,0,0,0-92,0V82H48A14,14,0,0,0,34,96V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V96A14,14,0,0,0,208,82ZM94,56a34,34,0,0,1,68,0V82H94ZM210,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V96a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Zm-82-94a26,26,0,0,0-6,51.29V184a6,6,0,0,0,12,0V165.29A26,26,0,0,0,128,114Zm0,40a14,14,0,1,1,14-14A14,14,0,0,1,128,154Z"></path></svg>
              <input
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                className="block w-full h-12 pl-8 border-b-[2px] border-[#9caccb] placeholder:text-[#9caccb]"
                placeholder="Insira sua senha" type="password" name="password" id="password"
              />
            </div>


            <button
              className="block mx-auto p-4 mt-6 rounded-full w-1/2 text-white font-bold bg-[#9caccb] hover:bg-[#8895ac] cursor-pointer"
              type="submit"
            >Cadastrar</button>

            {password.length > 0 &&
              <div style={{ width: "100%" }}>
                {!isPasswordCorrect && <p className="text-red-700">As senhas não são iguais</p>}
              </div>
            }
          </form>
          <p className="text-center mt-6"><small>Ou faça seu cadastro usando</small></p>

          <section className="flex place-content-center mt-6 gap-12" style={{ paddingBottom: 16 }}>
            <button onClick={handleGoogleLogin} >
              <Image className="rounded-full w-14 h-14" width={40} height={40} src={googleImage} alt="" />
            </button>

          </section>
          <div style={{ display: "flex", gap: 5 }}>
            <p>Já possui uma conta?</p>
            <Link href="/login"><strong>LogIn</strong></Link>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {loading && <LoadingSpin />}
          </div>
        </main>
      </div>
    </Container>
  );
};

