import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import SinupPage from "./client";

async function SignUp() {
  const isAuthenticate = await getServerSession(authOptions);
  if (isAuthenticate) {
    return redirect("/");
  }
  return <SinupPage />;
}

export default SignUp;
