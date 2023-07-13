import { getServerSession } from "next-auth";
import LoginClient from "./client";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getCsrfToken } from "next-auth/react";

async function Login() {
  const isAuthenticate = await getServerSession(authOptions);
  if (isAuthenticate) {
    return redirect("/");
  }
  const csrftoken = await getCsrfToken();
  return <LoginClient csrftoken={csrftoken} />;
}

export default Login;
