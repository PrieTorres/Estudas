"use client";
import { Container } from './styles';
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { auth } from '@/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { PageContext } from '@/context/pageContext';
import defaultIcon from "@/assets/img/default_user_photo.png";
import { useRouter } from 'next/navigation';


export const SignButtons = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const { updateSessionId, userId, user } = useContext(PageContext);
  const router = useRouter();


  function handleSignOut() {
    firebaseSignOut(auth);
    if (typeof updateSessionId === 'function') {
      updateSessionId("");
    }
  }

  function handleSignIn() {
    router.push('/signIn');
  }

  return (
    <Container>
      {/* Desktop Navigation */}
      <div className='text-[1.9rem] sm:flex hidden' style={{ alignContent: "center", alignItems: "center" }}>
        {userId ? (
          <div className='flex gap-3 md:gap-5'>
            <button
              type='button'
              onClick={handleSignOut}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile' className='sm:flex hidden' style={{ alignContent: "center", alignItems: "center" }} >
              <Image
                src={user?.photoURL ?? defaultIcon}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <button
            type='button'
            onClick={handleSignIn}
            className='black_btn'
          >
            Sign in
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {userId ? (
          <div className='flex flex-col items-end'>
            <Image
              src={user?.photoURL ?? defaultIcon}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown text-center'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false);
                    handleSignOut();
                  }}
                  className='mt-5 w-full black_btn'
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            type='button'
            onClick={handleSignIn}
            className='black_btn'
          >
            Sign in
          </button>
        )}
      </div>
    </Container>
  );
};