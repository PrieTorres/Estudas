"use client";
import { Container } from './styles';
import Link from "next/link";
import Image from "next/image";
import { useContext, useState } from "react";
import { signInWithGoogle, auth } from '@/firebase';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { PageContext } from '@/context/pageContext';

export const SignButtons = () => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [user] = useAuthState(auth);
  const { updateSessionId } = useContext(PageContext);

  function handleSignOut() {
    firebaseSignOut(auth);
    if (typeof updateSessionId === 'function') {
      updateSessionId("");
    }
  }

  function handleSignIn() {
    signInWithGoogle();

    if (typeof updateSessionId === 'function') {
      if (user) {
        getUserByFirebaseUserId({ firebaseUserId: user?.uid ?? "", createUser: true, userData: user }).then((response) => {
          updateSessionId(response?._id ?? response?.id ?? "");
        });
      }
    }
  }

  return (
    <Container>
      {/* Desktop Navigation */}
      <div className='sm:flex hidden' style={{ alignContent: "center", alignItems: "center" }}>
        {user ? (
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
            onClick={handleSignIn}
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
