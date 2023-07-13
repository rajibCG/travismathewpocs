"use client";
import React from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import Signup from '../Auth/Signup';

function Header() {
    const { data: session, status } = useSession();
    return (
        <section className='header pt-3'>
            <div className="flex gap-2 justify-end pr-4">
                {session?.user ? (
                    <>
                        <p className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            Hi, {session.user.name}
                        </p>
                        <button
                            type="button"
                            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                            onClick={() => signOut("credentials")}
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <Signup />
                        {/* <Link
                            href="/signup"
                        >
                            Sign Up
                        </Link> */}
                        <p>/</p>
                        <Link
                            href="/login"
                        >
                            Login
                        </Link>
                    </>

                )}
            </div>
        </section>
    );
}

export default Header;