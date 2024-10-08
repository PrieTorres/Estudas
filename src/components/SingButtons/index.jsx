"use client";
import { Container } from './styles';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signInWithGoogle, auth } from '@/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export const SignButtons = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [user] = useAuthState(auth);

  return (
    <Container>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden' style={{ alignContent: "center", alignItems: "center" }}>
        {user ? (
          <div className='flex gap-3 md:gap-5'>
            <button
              type='button'
              onClick={() => firebaseSignOut(auth)}
              className='outline_btn'
            >
              Sign Out
            </button>

            <Link href='/profile' className='sm:flex hidden' style={{ alignContent: "center", alignItems: "center" }} >
              <Image
                src={user.photoURL}
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
            onClick={signInWithGoogle}
            className='black_btn'
          >
            Sign in
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {user ? (
          <div className='flex'>
            <Image
              src={user.photoURL}
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={() => setToggleDropdown(!toggleDropdown)}
            />

            {toggleDropdown && (
              <div className='dropdown'>
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
                    firebaseSignOut(auth);
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
            onClick={signInWithGoogle}
            className='black_btn'
          >
            Sign in
          </button>
        )}
      </div>
    </Container>
  );
};
