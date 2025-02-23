"use client";

import { Protect, useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Layout({ userDashboard, adminDashboard }) {
  const { isLoaded, user } = useUser();

  if (!isLoaded) return;

  return (
    <Protect>
      <nav className="bg-white">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <p className="text-dark text-xl fw-bold">Logo</p>
              </div>
            </div>
            <Link href="/dashboard/profile" className="btn btn-primary mr-3">
              Custom Profile Update
            </Link>
            <UserButton />
          </div>
        </div>
      </nav>
      {user.publicMetadata.role === "admin" ? adminDashboard : userDashboard}
    </Protect>
  );
}
