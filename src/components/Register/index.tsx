import Image, { StaticImageData } from "next/image";
import google from "../../assets/google.svg"
import Link from "next/link";
import { Container } from "./style";
import { FormEvent, useContext, useState } from "react";
import { fetchTk } from "@/lib/helper";
import { PageContext } from "@/context/pageContext";
import visibilityOn from "../../assets/visibilityOn.svg"
import visibilityOff from "../../assets/visibilityOff.svg"

export const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isVisibility, setIsVisibility] = useState(false);
  const { updateSessionId } = useContext(PageContext);
  const [levels, setLevels] = useState("")

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const lowercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i)); // a-z
  const uppercaseLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const specialCharters = ["!", "@", "?", "+", "-", "="]

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  //TODO
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (numbers.some(e => event.target.value.includes(e))) {
      console.log("Nivel 1");
      setLevels("Nivel 1");
      if (lowercaseLetters.some(e => event.target.value.includes(e))) {
        console.log("Nivel 2");
        setLevels("Nivel 2");
        if (uppercaseLetters.some(e => event.target.value.includes(e))) {
          console.log("Nivel 3");
          setLevels("Nivel 3");
          if (specialCharters.some(e => event.target.value.includes(e))) {
            console.log("Nivel 4");
            setLevels("Nivel 4");
            if (event.target.value.length > 8) {
              console.log("Nivel 5");
              setLevels("Nivel 5");
            }
          }
        }
      }
    }else if(event.target.value=="") setLevels("");
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
        <main className="w-[875px] flex divide-x-2 gap-6  p-16 placeholder:text-[#9caccb] bg-white shadow-lg rounded-md">
          <div>
            <h1 className="mb-12 text-center text-black font-bold ">Sign Up</h1>

            <form onSubmit={handleSignUp}>

              <label className="block mt-6 text-black" htmlFor="username">Nome</label>
              <div className="relative w-full">
                <input className=" text-slate-500 block w-full h-12 border-b-[2px] border-[#9caccb] " placeholder="Insira seu username" type="text" name="username" id="username" value={username} onChange={handleUsernameChange} />
              </div>

              <label className="block mt-6 text-black" htmlFor="password">Senha</label>
              <div className="relative flex gap-4 w-full">
                {
                  isVisibility ?
                    <><input className="block text-slate-500 w-full h-12 border-b-[2px] border-[#9caccb] " placeholder="Insira sua senha" type="password" name="password" id="password" required={true} value={password} onChange={handlePasswordChange} /><Image src={visibilityOn} alt="icone para visualizar a senha" className="size-10" onClick={() => setIsVisibility(!isVisibility)} /></>
                    :
                    <><input className="block text-slate-500 w-full h-12 border-b-[2px] border-[#9caccb] " placeholder="Insira sua senha" type="text" name="password" id="password" required={true} value={password} onChange={handlePasswordChange} />
                      <Image src={visibilityOff} alt="icone para visualizar a senha" className="size-10" onClick={() => setIsVisibility(!isVisibility)} /></>
                }
                {/* <SafeImage src={visibilityOn} text={"icone para visualizar a senha"}  /> */}
              </div>

              <label className="block mt-6 text-black" htmlFor="password_confirm">Confirme a senha</label>
              <div className="relative flex gap-4 w-full">
                {
                  isVisibility ?
                    <><input className="block w-full text-slate-500 h-12 border-b-[2px] border-[#9caccb] " placeholder="Insira sua senha novamente" type="password" name="password_confirm" id="password_confirm" required={true} value={confirmPassword} onChange={handleConfirmPasswordChange} />
                      <Image src={visibilityOn} alt="icone para visualizar a senha" className="size-10" onClick={() => setIsVisibility(!isVisibility)} />
                    </>
                    :
                    <>
                      <input className="block w-full text-slate-500 h-12 border-b-[2px] border-[#9caccb] " placeholder="Insira sua senha novamente" type="text" name="password_confirm" id="password_confirm" required={true} value={confirmPassword} onChange={handleConfirmPasswordChange} />
                      <Image src={visibilityOff} alt="icone para visualizar a senha" className="size-10" onClick={() => setIsVisibility(!isVisibility)} /></>
                }
              </div>
              <div className={`mt-4 w-full h-2 flex justify-start gap-2 
              ${levels == "Nivel 1" ? '[&>*:nth-child(-n+1)]:bg-red-400' :
                  levels == "Nivel 2" ? '[&>*:nth-child(-n+2)]:bg-orange-400' :
                    levels == "Nivel 3" ? '[&>*:nth-child(-n+3)]:bg-yellow-400' :
                      levels == "Nivel 4" ? '[&>*:nth-child(-n+4)]:bg-blue-400' :
                        levels == "Nivel 5" ? '[&>*:nth-child(-n+5)]:bg-green-400' : ""}`}>
                {
                  [1, 2, 3, 4, 5].map(() => {
                    return <div className={"w-20 h-2 bg-slate-300 rounded-md"}></div>
                  }
                  )
                }

              </div>
              <input className="block mx-auto p-4 mt-6 rounded-full w-1/2 text-white font-bold bg-[#9caccb] hover:bg-[#8895ac] cursor-pointer" type="submit" value="Sign Up" />

            </form>

            <div style={{ marginTop: "16px", display: "flex", justifyContent: "center" }}>
              <small><p className="text-black" >Already have an account?</p></small>
              <small><strong><Link className="text-black" href="/login">Log In</Link></strong></small>
            </div>
          </div>
          <div className="">
            <div className="text-black pt-10  pl-4">
              Regras
              <div className="text-black text-3xl">Precisa ser composta de pelo menos 4 grupos de caracteres: números, letras em
                minúsculo, letras em maiúsculo e caracteres especiais (!@?+-).
              </div>
              <div className="text-black text-3xl">Ter no mínimo 8 caracteres.</div>
            </div>
          </div>
        </main>
      </div>
    </Container>
  </>


}