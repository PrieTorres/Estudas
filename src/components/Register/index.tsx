"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "./style";
import { FormEvent, useContext, useEffect, useState } from "react";
import { fetchTk } from "@/lib/helper";
import { PageContext } from "@/context/pageContext";
import visibilityOn from "../../assets/visibilityOn.svg";
import visibilityOff from "../../assets/visibilityOff.svg";

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
  const [isVisibility, setIsVisibility] = useState(false);
  const [isErrorRegister, setIsErrorRegister] = useState(false);
  const [firstLaw, setFirstLaw] = useState(false);
  const [secondLaw, setSecondLaw] = useState(false);
  const [thirdLaw, setThirdLaw] = useState(false);
  const [fourthLaw, setFourthtLaw] = useState(false);
  const [fifthLaw, setFifthLaw] = useState(false);
  const { updateSessionId } = useContext(PageContext);
  const [levels, setLevels] = useState(0);

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const lowercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)); // a-z
  const uppercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const specialCharters = ["!", "@", "?", "+", "-", "="];

  useEffect(() => {
    window.addEventListener("resize", () => setWindowSize(window.innerWidth));

  }, []);

  useEffect(() => {
  }, [windowSize]);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (!firstLaw &&
      event.target.value.length >= 8) {
      setLevels(levels + 1);
      setFirstLaw((value) => !value);
    }
    if (!secondLaw &&
      specialCharters.some(e => event.target.value.includes(e))) {
      setLevels(levels + 1);
      setSecondLaw((value) => !value);
    }
    if (!thirdLaw &&
      uppercaseLetters.some(e => event.target.value.includes(e))) {
      setLevels(levels + 1);
      setThirdLaw((value) => !value);
    }

    if (!fourthLaw &&
      lowercaseLetters.some(e => event.target.value.includes(e))) {

      setLevels(levels + 1);
      setFourthtLaw((value) => !value);
    }

    if (!fifthLaw &&
      numbers.some(e => event.target.value.includes(e))) {
      setLevels(levels + 1);
      setFifthLaw((value) => !value);
    }

    if (event.target.value == "") {
      setLevels(0);
      setFirstLaw(false);
      setSecondLaw(false);
      setThirdLaw(false);
      setFourthtLaw(false);
      setFifthLaw(false);
    }
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(levels < 3){
      setIsErrorRegister(true);
      alert('Password must have at least 3 levels');
      return;
    }

    if (password === confirmPassword) {
      createUser(username, email, password);
    } else {
      setIsErrorRegister(true);
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


  return <Container>
    <div className="h-screen  flex justify-center items-center">
      <main className="lg:w-[875px] sm:w-[654px] flex lg:flex-nowrap sm:flex-wrap-reverse lg:divide-x-2 p-16 placeholder:text-[#9caccb] bg-white shadow-lg rounded-md">
        <div className="p-10 pt-6 lg:w-1/2 sm:w-full">
          <h1 className="mb-12 text-center sm:hidden lg:block text-black font-bold text-6xl ">Sign Up</h1>

          <form onSubmit={handleSignUp}>

            <label className="block mt-6 text-black" htmlFor="username">Username</label>
            <div className="relative w-full">
              <input
                className=" text-slate-500 block w-full h-12 border-b-[2px] border-[#9caccb] "
                placeholder="Insira seu username"
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={handleUsernameChange} />
            </div>

            <label className="block mt-6 text-black" htmlFor="password">Senha</label>
            <div className="relative flex gap-4 w-full">
              <input
                required
                className="block text-slate-500 w-full h-12 border-b-[2px] border-[#9caccb] "
                placeholder="Insira sua senha"
                type={isVisibility ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <Image src={isVisibility ? visibilityOff : visibilityOn}
                alt="icone para visualizar a senha"
                className="size-10"
                onClick={() => setIsVisibility(!isVisibility)}
              />
            </div>

            <label className="block mt-6 text-black" htmlFor="password_confirm">Confirme a senha</label>
            <div className="relative flex gap-4 w-full">
              <input
                required
                className="block w-full text-slate-500 h-12 border-b-[2px] border-[#9caccb] "
                placeholder="Insira sua senha novamente"
                type={isVisibility ? "text" : "password"}
                name="password_confirm"
                id="password_confirm"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange} />
              <Image
                src={isVisibility ? visibilityOff : visibilityOn}
                alt="icone para visualizar a senha"
                className="size-10"
                onClick={() => setIsVisibility(!isVisibility)}
              />
            </div>
            {
              isErrorRegister ?
                <>
                  <div className="text-red-500">Senhas divergentes ou não cumprindo todas as regras</div>
                </> : <></>
            }
            <div className={`mt-4 w-full h-2 flex justify-start gap-2 
              ${levels == 1 ? '[&>*:nth-child(-n+1)]:bg-red-400' :
                levels == 2 ? '[&>*:nth-child(-n+2)]:bg-orange-400' :
                  levels == 3 ? '[&>*:nth-child(-n+3)]:bg-yellow-400' :
                    levels == 4 ? '[&>*:nth-child(-n+4)]:bg-blue-400' :
                      levels == 5 ? '[&>*:nth-child(-n+5)]:bg-green-400' : ""}`}>
              {
                [1, 2, 3, 4, 5].map(() => {
                  return <div className={"w-20 h-2 bg-slate-300 rounded-md"}></div>;
                }
                )
              }

            </div>
            <input
              className="block mx-auto p-4 mt-6 rounded-full w-1/2 text-white font-bold bg-[#9caccb] hover:bg-[#8895ac] cursor-pointer"
              type="submit"
              value="Sign Up" />

          </form>

          <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
            <small><p className="text-black" >Já possui uma Conta?</p></small>
            <small><strong><Link className="text-black" href="/login">Log In</Link></strong></small>
          </div>
        </div>
        <div className="p-10 pb-0 lg:w-1/2">
          <div className="text-black ">
            <div className="text-black font-bold text-3xl pb-2">Regras para Senha</div>
            <div className="text-black text-2xl">Precisa ser composta de pelo menos 4 grupos de caracteres: números, letras em
              minúsculo, letras em maiúsculo e caracteres especiais (!@?+-).
            </div>
            <div className="text-black text-2xl">Ter no mínimo 8 caracteres.</div>
          </div>
        </div>
        <h1 className="pl-10 pb-4 text-center text-black lg:hidden sm:visible font-bold text-6xl ">Sign Up</h1>
      </main>
    </div>
  </Container>;
};