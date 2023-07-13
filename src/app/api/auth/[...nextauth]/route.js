import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
            const tokenData = new URLSearchParams();
            tokenData.append("client_id", process.env.HYBRIS_CLIENT_ID);
            tokenData.append("client_secret", process.env.HYBRIS_CLIENT_SECRET);
            tokenData.append("grant_type", "client_credentials");

            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    grant_type: "client_credentials",
                },
                grant_type: "client_credentials",
                body: tokenData.toString(),
            };
            try {
                const res = await fetch(
                    `${process.env.HYBRIS_API_URL}/authorizationserver/oauth/token`,
                    fetchOptions
                );

                tokenResponse = await res.json();
                // console.log(tokenResponse)
            } catch (ex) {
                // throw new Error('some error occuring')
                console.log(ex)
            }



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
    secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };