import { fetchHybrisClientToken } from "@/lib/HybrisMethods";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

let authData = new Object();

function getObject(theObject) {
    var result = null;
    if (theObject instanceof Array) {
        for (var i = 0; i < theObject.length; i++) {
            result = getObject(theObject[i]);
        }
    } else {
        for (var prop in theObject) {
            //console.log(prop + ': ' + theObject[prop]);
            if (prop == "user") {
                return theObject;
                // }
            }
            if (theObject[prop] instanceof Object || theObject[prop] instanceof Array)
                result = getObject(theObject[prop]);
        }
    }
    return result;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials, req) {
                const data = new URLSearchParams();
                data.append("apiKey", process.env.GIGYA_API_KEY);
                data.append("loginID", credentials.email);
                data.append("password", credentials.password);
                // data.append("captchaToken", '123456');

                const fetchOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                    body: data.toString(),
                };
                const res = await fetch(
                    `${process.env.GIGYA_API_URL}/accounts.login`,
                    fetchOptions
                );

                if (res.ok) {
                    let account = await res.json();
                    if (account.errorCode) {
                        throw new Error(account.errorMessage)
                    }
                    return { account };
                }

                // Return null if user data could not be retrieved
                return null;

            },
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24,
    },
    callbacks: {
        async session({ session, token }) {
            let userEmail = null;
            let tokenResponse = null;
            if (token) {
                session.user = getObject(token);
                authData = getObject(token);
                userEmail = authData.user.account.profile.email
            }
            try {
                const resp = await fetchHybrisClientToken()
                tokenResponse = resp.response
                // console.log(tokenResponse)
            } catch (ex) {
                // throw new Error('some error occuring')
                console.log(ex)
            }

            cookies().set({
                name: 'akug', value: 'user', expires: new Date('2023-10-05'),
                path: '/', // For all paths
            })

            return {
                access_token: tokenResponse ? tokenResponse.access_token : "oAdPWoo6pXZFskFbzCJGoDDBQ8k",
                // access_token: "oAdPWoo6pXZFskFbzCJGoDDBQ8k",
                user: authData.user.account ? {
                    ...authData.user.account,
                    name: authData.user.account.profile.firstName + ' ' + authData.user.account.profile.lastName,
                    email: authData.user.account.profile.email
                } : undefined,
            };

        },
        async jwt(token, account) {
            authData = token?.token?.user?.account;
            return token;
        },
    },
    events: {
        async signOut({ token }) {
            cookies().set({
                name: 'akug', value: 'guest', expires: new Date('2023-10-05'),
                path: '/', // For all paths
            })
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };