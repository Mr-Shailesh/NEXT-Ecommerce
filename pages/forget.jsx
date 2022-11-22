import React, { useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import LockIcon from "../svg/LockIcon";
import Image from "next/image";
// import Image from "next/image";

const forget = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Image
            className="mx-auto h-auto  w-auto"
            src="/Logo.png"
            alt=""
            width={80}
            height={100}
            priority
          />
          {/* <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
            // width={500}
            // height={500}
          /> */}
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Forgot Password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href="/login">
              <span className="font-medium text-hover hover:text-logo">
                {" "}
                Login
              </span>
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-hover focus:outline-none focus:ring-hover sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-hover py-2 px-4 text-sm font-medium text-white hover:bg-logo focus:outline-none focus:ring-2 focus:ring-hover focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon />
              </span>
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default forget;
