"use client";
import React, { useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import Link from 'next/link';
import Signup from '../Auth/Signup';
import Cart from '@/components/Cart/CartHelpInformation/Cart';
import configuration from '@/constants/configuration';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setCartCount, setCartGuid, setCartItems, setCartToken, setCartUserEmail } from '@/reducers/slices/CartSlice';

function Header() {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const userEmail = session?.user.email ? session.user.email : configuration.guestUserName
    const fetchHybrisToken = async () => {
        const response = await fetch('/api/occ/token', { method: 'POST' }).then(res => res.json());
        if (response.status === 200) {
            localStorage.setItem(configuration.hybrisTokenCookieName, response.response.access_token)

            dispatch(setCartToken(response.response.access_token))
            dispatch(setCartUserEmail(userEmail))

            const cardBody = new URLSearchParams();
            cardBody.append("user", userEmail);
            cardBody.append("token", response.response.access_token);
            cardBody.append("guid", Cookies.get(configuration.cartCookieName));
            const resp = await fetch(`/api/occ/cart?${cardBody.toString()}`, { method: 'GET' })
                .then(res => res.json())
            if (resp.response) {
                const CartGuid = userEmail !== configuration.guestUserName ? resp.response.code : resp.response.guid;
                Cookies.set(configuration.cartCookieName, CartGuid, {
                    expires: 7,
                })
                const { totalItem, entries } = resp.response
                dispatch(setCartGuid(CartGuid))
                dispatch(setCartCount(totalItem))
                dispatch(setCartItems(entries))
            }

        }
    }

    useEffect(() => {
        fetchHybrisToken()
    }, [userEmail]);

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
                            onClick={() => signOut("credentials")}
                        >
                            Sign out
                        </button>
                    </>
                ) : (
                    <>
                        <Signup />
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