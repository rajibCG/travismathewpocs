"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h2>404</h2>
        <p>Could not find requested resource</p>
      </div>
      <button type="button" onClick={handleClick}>
        Back to Home
      </button>
    </main>
  );
}
