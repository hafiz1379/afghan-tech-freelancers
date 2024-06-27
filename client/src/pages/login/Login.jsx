import React from "react";

const Login = () => {
  return (
    <div>
      <form className="max-w-[500px] rounded border p-5 mx-auto my-auto mt-5">
        <h1 className="text-3xl font-semibold mb-2.5">Sign in</h1>
        <div className="my-2">
          <label htmlFor="username" className="block">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="block w-full"
          />
        </div>

        <div className="my-2">
          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            type="text"
            name="password"
            id="password"
            className="block w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-400 text-white py-2 w-full my-2 rounded"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
