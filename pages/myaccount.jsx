import { useRouter } from "next/router";
import React, { useEffect } from "react";

const myaccount = () => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.query]);

  return (
    <div>
      <h1 className="text-center p-8">My Account</h1>
    </div>
  );
};

export default myaccount;
