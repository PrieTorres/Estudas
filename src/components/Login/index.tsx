import Image from "next/image"

export const Login=()=>{
  return <>
   <div className="h-screen bg-slate-100 flex justify-center items-center">
    <main className="w-[475px]  p-16 bg-white shadow-lg rounded-md">

        <h1 className="mb-12 text-center font-bold text-4xl">Login</h1>

        <form action="">
            
            <label htmlFor="username">Nome</label>
            <div className="relative">
                <svg className="absolute top-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z"></path></svg>
                <input className="block w-full h-12 pl-8 border-b-[2px] border-[#9caccb] placeholder:text-[#9caccb]" placeholder="Insira seu username" type="text" name="username" id="username"/>
            </div>
            
            <label className="block mt-6" htmlFor="password">Password</label>
            <div className="relative">
                <svg className="absolute top-2.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#9caccb" viewBox="0 0 256 256"><path d="M208,82H174V56a46,46,0,0,0-92,0V82H48A14,14,0,0,0,34,96V208a14,14,0,0,0,14,14H208a14,14,0,0,0,14-14V96A14,14,0,0,0,208,82ZM94,56a34,34,0,0,1,68,0V82H94ZM210,208a2,2,0,0,1-2,2H48a2,2,0,0,1-2-2V96a2,2,0,0,1,2-2H208a2,2,0,0,1,2,2Zm-82-94a26,26,0,0,0-6,51.29V184a6,6,0,0,0,12,0V165.29A26,26,0,0,0,128,114Zm0,40a14,14,0,1,1,14-14A14,14,0,0,1,128,154Z"></path></svg>
                <input className="block w-full h-12 pl-8 border-b-[2px] border-[#9caccb] placeholder:text-[#9caccb]" placeholder="Insira sua senha" type="password" name="password" id="password"/>
                <a href="#"><small className="block text-right">Esqueceu sua senha?</small></a>
            </div>
            
            <input className="block mx-auto p-4 mt-6 rounded-full w-1/2 text-white font-bold bg-[#9caccb] hover:bg-[#8895ac] cursor-pointer" type="submit" value="Sign Up"/>

        </form>

        <p className="text-center mt-6"><small>Ou faça login usando</small></p>

        <section className="flex place-content-center mt-6 gap-12">
            <a href="">
                <Image className="rounded-full w-14 h-14" src={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"} alt="" />
            </a>

        </section>

    </main>

  </div>

  </>
}