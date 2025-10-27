"use client";

import { SignIn, useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen flex-col mx-auto bg-linear-to-br from-purple-50 to-purple-100">
      <SignIn />
    </div>
  );
}
