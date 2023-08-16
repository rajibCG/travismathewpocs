"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import Signup from '../Auth/Signup';
import Cart from '@/components/Cart/CartHelpInformation/Cart';
import configuration from '@/constants/configuration';
import { useDispatch } from 'react-redux';
import { fetchCartData, setCartGuid, setCartToken, setCartUserEmail } from '@/reducers/slices/CartSlice';
import { usePathname } from 'next/navigation';
import Cookies from 'js-cookie';

function Header() {
    const { data: session, status } = useSession();
    const pathName = usePathname()
    const dispatch = useDispatch();
    const userEmail = session?.user.email ? session.user.email : configuration.guestUserName

    const fetchHybrisToken = async () => {
        const response = await fetch('/api/occ/token', { method: 'POST' }).then(res => res.json());
        if (response.status === 200) {
            localStorage.setItem(configuration.hybrisTokenCookieName, response.response.access_token)
            dispatch(setCartToken(response.response.access_token))
            dispatch(setCartUserEmail(userEmail))
            dispatch(fetchCartData()).then(res => {
                console.log(res)
                Cookies.set(configuration.userTypeCookieName, userEmail !== configuration.guestUserName ? 'user' : configuration.guestUserName, {
                    expires: 7,
                })
            })

        }
    }

    useEffect(() => {
        if (status !== 'loading') {
            fetchHybrisToken()
        }

    }, [userEmail, status]);

    const logout = async () => {
        dispatch(setCartGuid(null))
        Cookies.set(configuration.cartCookieName, null, {
            expires: 7,
        })
        Cookies.set(configuration.cartCookieGuiName, null, {
            expires: 7,
        })
        signOut("credentials");
    }

    return (
        <section className='header pt-3'>
            <div className="flex gap-2 justify-end pr-4">
                <div className='pr-5'>
                    <Cart />
                </div>
                {session?.user ? (
                    <>
                        <p className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                            Hi, {session.user.name}
                        </p>
                        <button
                            type="button"
                            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                            onClick={logout}
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <Signup />
                        <p>/</p>
                        <Link
                            href={`/login${pathName === 'login' ? '' : '?referrar=' + encodeURIComponent(pathName)}`}
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