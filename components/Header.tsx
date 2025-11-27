import Image from "next/image";
import Link from "next/link";
import { shadow } from "../app/Styles/utils";
import { Button } from "./ui/button";
import DarkModeToggle from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";
import { getUser } from "@/app/auth/server";

async function Header() {
  const user = await getUser();
  return (
    <header
      className="bg-popover relative flex h-24 w-full items-center justify-between px-3 sm:px-8"
      style={{ boxShadow: shadow }}
    >
      <Link className="flex items-end gap-2" href="/">
        <Image
          src="/goatius.png"
          alt="Goatius logo"
          width={60}
          height={60}
          className="rounded-full"
          priority
        />

        <h1 className="pd-1 flex flex-col text-2xl leading-6 font-semibold">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <>
            <Button asChild>
              <Link href="/sign-up" className="hidden sm:block">
                Sign Up
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  );
}

export default Header;
