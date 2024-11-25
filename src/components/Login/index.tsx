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
    fetch('/api/user/login', {
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

  return (<>
    <Container>

      <div className="h-screen   flex justify-center items-center">
        <main className="w-[475px] p-16 bg-white shadow-lg rounded-md">

          <h1 className="mb-12 text-center text-black font-bold ">Login</h1>

          <form onSubmit={handleLogin}>

            <label htmlFor="username">Username</label>
            <div className="relative">
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