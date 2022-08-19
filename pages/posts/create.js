import { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Router from "next/router";
import Nav from "../../components/nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);
  return {
    props: { token },
  };
}

export default function PostCreate(props) {
  const [fields, setFields] = useState({ title: "", content: "" });
  const [status, setStatus] = useState("Normal");

  const createHandler = async (e) => {
    e.preventDefault();
    setStatus("Loading...");
    const createReq = await fetch("/api/posts/create", {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "Aplication/json",
        Authorization: `Bearer ${props.token}`,
      },
    });

    if (!createReq.ok) return setStatus("Error" + createReq.status);

    const createRes = await createReq.json();
    setStatus("Success");
    Router.push("/posts");
  };

  const fieldHandler = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <Nav />
      <h1>Create a Post</h1>
      <form onSubmit={createHandler}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={fieldHandler}
        />
        <br />
        <textarea
          type="text"
          name="content"
          placeholder="Content"
          onChange={fieldHandler}
        ></textarea>
        <br />
        <button type="submit">Create Post</button>
        <div>Status: {status}</div>
      </form>
    </div>
  );
}
