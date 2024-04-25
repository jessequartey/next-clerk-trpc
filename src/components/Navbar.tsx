import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <header>
      <nav className="sticky inset-x-0 top-0 z-50 flex h-14 w-full items-center border-b border-gray-200 bg-white/75  backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <div>
              <Link href="/" className="font-semibold">
                Title
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <Button>Sign In</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
    </header>
  );
}
