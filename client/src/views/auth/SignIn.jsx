import React from "react";
import logo from "../../assets/img/logo.png"

export default function SignIn() {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-28 w-auto" src={logo} alt="Your Company"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight to-blue-500">Sign in to continue</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label for="email" className="block text-sm font-medium leading-6 text-balance">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-cyan-600 shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-balck sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label for="password" className="block text-sm font-medium leading-6 text-black">Password</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-red-500 hover:text-red-400">Forgot password?</a>
            </div>
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-red-500 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500">Sign in</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-400">
        Not a member?
        <a href="#" className="font-semibold leading-6 text-red-500 hover:text-red-400">Start a 7 days free trial</a>
      </p>
    </div>
  </div>
  );
}