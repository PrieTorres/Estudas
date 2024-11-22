"use client";

import { FormEvent, useContext, useState } from "react";
import { PageContext } from "@/context/pageContext";
import Image from "next/image";
import googleImage from "@/assets/google.svg";
import { signInWithGoogle, auth } from '@/firebase';
import { getUserByFirebaseUserId } from "@/lib/helper";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingSpin } from "../LoadingSpin";
import { Container } from "./style";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateSessionId } = useContext(PageContext);
  const [isPopUpSingUpIn, setIsPopUpSingUpIn] = useState(false);
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

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password && (email || username)) {
      login(username, email, password);
    } else {
      alert('Passwords do not match');
    }
  };

  const login = (username: string, email: string, password: string) => {
    setLoading(true);
    fetch('/api/user', {
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
    setIsPopUpSingUpIn(true);

    signInWithGoogle();
    if (typeof updateSessionId === 'function') {
      if (user) {
        getUserByFirebaseUserId({ firebaseUserId: user?.uid ?? "", createUser: true, userData: user }).then((response) => {
          updateSessionId(response?._id ?? response?.id ?? "");
        });
      }
    }
  };

  return (<>
    <Container>

      <div className="h-screen   flex justify-center items-center">
        <main className="w-[475px] p-16 bg-white shadow-lg rounded-md">

          <h1 className="mb-12 text-center text-black font-bold ">Login</h1>

          <form onSubmit={handleLogin}>

            <label htmlFor="username">Nome</label>
            <div className="relative">
              {/* <svg className="absolute top-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z"></path></svg> */}
              <input
                onChange={handleUsernameChange}
                value={username}
                className="block w-full h-12 text-slate-500 border-b-[2px] border-[#9caccb] "
                placeholder="Insira seu username"
                type="text"
                name="username"
                id="username"
              />
            </div>

            <label className="block mt-6" htmlFor="email">Email</label>
            <div className="relative">
              {/* <svg className="absolute top-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M128,0C57.31,0,0,57.31,0,128s57.31,128,128,128,128-57.31,128-128S198.69,0,128,0Zm0,32a96,96,0,0,0,0,192,8,8,0,0,0,8-8V136a8,8,0,0,0-16,0v56a8,8,0,0,0,8,8,80,80,0,1,1,80-80,8,8,0,0,0-16,0Zm0,144a8,8,0,0,0,8-8V136a8,8,0,0,0-16,0v32a8,8,0,0,0,8,8Z"></path></svg> */}
              <input
                onChange={handleEmailChange}
                value={email}
                className="block w-full h-12 text-slate-500 border-b-[2px] border-[#9caccb]"
                placeholder="Insira seu email"
                type="email"
                name="email"
                id="email"
              />
            </div>

            <label className="block mt-6" htmlFor="password">Password</label>
            <div className="relative">
              {/* <svg className="absolute top-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M208,82H174V56a46,46,0,0,0-92,0V82H48A14,14,0,0,0,34,96V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V96A14,14,0,0,0,208,82ZM94,56a34,34,0,0,1,68,0V82H94ZM210,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V96a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Zm-82-94a26,26,0,0,0-6,51.29V184a6,6,0,0,0,12,0V165.29A26,26,0,0,0,128,114Zm0,40a14,14,0,1,1,14-14A14,14,0,0,1,128,154Z"></path></svg> */}
              <input
                onChange={handlePasswordChange}
                value={password}
                className="block w-full h-12 text-slate-500 border-b-[2px] border-[#9caccb]"
                placeholder="Insira sua senha" type="password" name="password" id="password"
              />
              <a href="#"><small className="block text-black text-left">Esqueceu sua senha?</small></a>
            </div>

            <input className="block mx-auto p-4 mt-6 rounded-full w-1/2 text-white font-bold bg-[#9caccb] hover:bg-[#8895ac] cursor-pointer" type="submit" value="Sign Up" />

          </form>

          <small><p className="text-center text-black mt-6">Ou faça login usando</p></small>

          <section className="flex place-content-center mt-6 gap-12">
            <button onClick={handleGoogleLogin} >
              <Image className="rounded-full w-14 h-14" width={40} height={40} src={googleImage} alt="" />
            </button>

          </section>

          {loading && <LoadingSpin />}
        </main>

      </div>
    </Container>
  </>);
};