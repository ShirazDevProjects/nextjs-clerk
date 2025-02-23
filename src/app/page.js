"use client";

import { SignOutButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { isLoaded, user, isSignedIn } = useUser();

  if (!isLoaded) return;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 justify-center items-center">
        <Image
          className="invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />

        {isSignedIn ? (
          <>
            <Image
              src={user.imageUrl}
              alt=""
              width={100}
              height={100}
              className="rounded-full w-[150px] h-[150px]"
            />
            <p className="text-2xl text-white">{user.username}</p>
            <div className="flex gap-2 items-center flex-col">
              <SignOutButton className="rounded-full transition-colors flex items-center justify-center bg-red-500 text-white gap-2 hover:bg-[#383838] hover:text-[#fff] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5" />
              <Link
                href="/dashboard"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-background text-foreground gap-2 hover:bg-[#383838] hover:text-[#fff] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                Dashboard
              </Link>
            </div>
          </>
        ) : (
          <div className="flex gap-4 items-center flex-col">
            <div className="flex gap-4 flex-row">
              <Link
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-background text-foreground gap-2 hover:bg-[#383838] hover:text-[#fff] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="/signup"
              >
                Sign Up
              </Link>
              <Link
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-background text-foreground gap-2 hover:bg-[#383838] hover:text-[#fff] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="/login"
              >
                Login
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-background text-foreground gap-2 hover:bg-[#383838] hover:text-[#fff] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="/signup_and_login"
              >
                SignUp & Login Elements
              </Link>
              <Link
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-background text-foreground gap-2 hover:bg-[#383838] hover:text-[#fff] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="/signup_and_login_custom"
              >
                SignUp & Login Custom
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
