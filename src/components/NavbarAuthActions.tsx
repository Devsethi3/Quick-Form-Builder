"use client";

import { memo } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

interface Props {
  mobile?: boolean;
}

export const NavbarAuthActions = memo(({ mobile }: Props) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Show lightweight placeholder while loading
  if (!isLoaded) {
    return <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />;
  }

  if (user) {
    return (
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: "w-9 h-9",
          },
        }}
      />
    );
  }

  return (
    <div className={mobile ? "grid grid-cols-2 gap-2" : "hidden md:flex gap-2"}>
      <Button variant="outline" onClick={() => router.push("/sign-in")}>
        Log in
      </Button>
      <Button onClick={() => router.push("/sign-up")}>Sign up</Button>
    </div>
  );
});

NavbarAuthActions.displayName = "NavbarAuthActions";
