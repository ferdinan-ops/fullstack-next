import { useState } from "react";
import { unauthPage } from "../../middlewares/authorizationPage";
import Link from "next/link";

export async function getServerSideProps(ctx) {
  await unauthPage(ctx);
  return { props: {} };
}

export default function Register() {
  const [fields, setFields] = useState({ email: "", password: "" });

  const [status, setStatus] = useState("normal");

  const registerHandler = async (e) => {
    e.preventDefault();

    setStatus("loading");

    const registerReq = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: { "Content-Type": "Aplication/json" },
    });

    if (!registerReq.ok) return setStatus("error" + registerReq.status);

    const registerRes = await registerReq.json();

    setStatus("Success");

    console.log(registerRes);
  };

  /* Ingat!! => utk mengubah property key pada object 
  secara dynamic atau lewat variabel haru pakai tanda 
  [] */
  const fieldHandler = (e) => {
    const { name, value } = e.target;

    setFields({ ...fields, [name]: value });
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <h1>Register</h1>
      <form action="" onSubmit={registerHandler}>
        <input
          type="email"
          placeholder="Email"
          value={fields.email}
          onChange={fieldHandler}
          name="email"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={fields.password}
          onChange={fieldHandler}
          name="password"
          autoComplete="on"
        />
        <br />
        <button type="submit">Register</button>

        <div>Output: {status}</div>
        <Link href="/auth/login">
          <a>Login</a>
        </Link>
      </form>
    </div>
  );
}
