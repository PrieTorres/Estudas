import Image from "next/image";
import google from "../../assets/google.svg"
import Link from "next/link";
import { Container } from "./style";
import { FormEvent, useContext, useState } from "react";
import { fetchTk } from "@/lib/helper";
import { PageContext } from "@/context/pageContext";
export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { updateSessionId } = useContext(PageContext);
  const [levels, setLevels] = useState(1)

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.value.includes("1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0")){

    }
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


  return <>
    <Container>

      <div className="h-screen  flex justify-center items-center">
        <main className="w-[475px]  p-16 placeholder:text-[#9caccb] bg-white shadow-lg rounded-md">

          <h1 className="mb-12 text-center text-black font-bold ">Sign Up</h1>

          <form onSubmit={handleSignUp}>

            <label className="block mt-6 text-black" htmlFor="username">Nome</label>
            <div className="relative w-full">
              {/* <svg className="absolute top-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z"></path></svg> */}
              <input className=" text-slate-500 block w-full h-12 border-b-[2px] border-[#9caccb] " placeholder="Insira seu username" type="text" name="username" id="username" value={username} onChange={handleUsernameChange} />
            </div>
            <div className="text-2xl pt-3 pl-4">
              <div className="text-black">Precisa ser composta de pelo menos 3 dos 4 grupos de caracteres: números, letras em
                minúsculo, letras em maiúsculo e caracteres especiais (!@?+-).
              </div>
              <div className="text-black">Ter no mínimo 8 caracteres.</div>
            </div>
            <label className="block mt-6 text-black" htmlFor="password">Senha</label>
            <div className="relative w-full">
              {/* <svg className="absolute top-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M208,82H174V56a46,46,0,0,0-92,0V82H48A14,14,0,0,0,34,96V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V96A14,14,0,0,0,208,82ZM94,56a34,34,0,0,1,68,0V82H94ZM210,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V96a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Zm-82-94a26,26,0,0,0-6,51.29V184a6,6,0,0,0,12,0V165.29A26,26,0,0,0,128,114Zm0,40a14,14,0,1,1,14-14A14,14,0,0,1,128,154Z"></path></svg> */}
              <input className="block text-slate-500 w-full h-12 border-b-[2px] border-[#9caccb] " placeholder="Insira sua senha" type="password" name="password" id="password" required={true} value={password} onChange={handlePasswordChange} />
            </div>

            <label className="block mt-6 text-black" htmlFor="password_confirm">Confirme a senha</label>
            <div className="relative w-full">
              {/* <svg className="absolute top-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M208,82H174V56a46,46,0,0,0-92,0V82H48A14,14,0,0,0,34,96V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V96A14,14,0,0,0,208,82ZM94,56a34,34,0,0,1,68,0V82H94ZM210,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V96a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Zm-82-94a26,26,0,0,0-6,51.29V184a6,6,0,0,0,12,0V165.29A26,26,0,0,0,128,114Zm0,40a14,14,0,1,1,14-14A14,14,0,0,1,128,154Z"></path></svg> */}
              <input className="block w-full text-slate-500 h-12 border-b-[2px] border-[#9caccb] " placeholder="Insira sua senha novamente" type="password" name="password_confirm" id="password_confirm" required={true} value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>
            <div className="mt-4 w-full h-2 flex justify-start gap-2">
              {
                [1, 2, 3, 4, 5].map(() => {
                  return <div className={"w-20 h-2 bg-slate-300 rounded-md"}></div>
                }
                )
              }

            </div>
            <input className="block mx-auto p-4 mt-6 rounded-full w-1/2 text-white font-bold bg-[#9caccb] hover:bg-[#8895ac] cursor-pointer" type="submit" value="Sign Up" />

          </form>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <p className="text-black" >Already have an account?</p>
            <strong><Link className="text-black" href="/login">Log In</Link></strong>
          </div>

        </main>



      </div>
    </Container>
  </>


}