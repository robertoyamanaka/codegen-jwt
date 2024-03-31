"use client";
import { useState } from "react";
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  const [newScreen, setNewScreen] = useState(false);

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <SignIn />
      </div>
    </>
  );
}
