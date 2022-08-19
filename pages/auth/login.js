import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Router from "next/router";
import { unauthPage } from "../../middlewares/authorizationPage";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);
  return { props: {} };
}

export default function Login() {
  const [fields, setFields] = useState({ email: "", password: "" });

  const [status, setStatus] = useState("normal");

  // Check Login
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      Router.push("/posts");
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    setStatus("Loading");

    const loginReq = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: { "Content-Type": "Aplication/json" },
    });

    if (!loginReq.ok) return setStatus("Error" + loginReq.status);

    const loginRes = await loginReq.json();

    setStatus("Success");
    Cookies.set("token", loginRes.token); // cookies

    Router.push("/posts");
  };

  const fieldHandler = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={fields.email}
          onChange={fieldHandler}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={fields.password}
          onChange={fieldHandler}
          autoComplete="on"
        />
        <br />
        <button type="submit">Login</button>
        <div>Output: {status}</div>
        <Link href="/auth/register">
          <a>Register</a>
        </Link>
      </form>
    </div>
  );
}
