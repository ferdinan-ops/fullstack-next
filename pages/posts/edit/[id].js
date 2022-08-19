import { useState } from "react";
import { authPage } from "../../../middlewares/authorizationPage";
import Router from "next/router";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const { id } = ctx.query;

  const postReq = await fetch(`http://localhost:3000/api/posts/detail/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const res = await postReq.json();

  return {
    props: { token, post: res.data },
  };
}

export default function PostEdit(props) {
  const { post } = props;
  const [fields, setFields] = useState({
    title: post.title,
    content: post.content,
  });
  const [status, setStatus] = useState("Normal");

  const updateHandler = async (e) => {
    e.preventDefault();
    setStatus("Loading...");
    const updateReq = await fetch(`/api/posts/update/${post.id}`, {
      method: "PUT",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "Aplication/json",
        Authorization: `Bearer ${props.token}`,
      },
    });

    if (!updateReq.ok) return setStatus("Error" + updateReq.status);

    const updateRes = await updateReq.json();
    setStatus("Success");
    Router.push("/posts");
  };

  const fieldHandler = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <h1>Edit a Post</h1>
      <form onSubmit={updateHandler}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={fieldHandler}
          defaultValue={post.title}
        />
        <br />
        <textarea
          type="text"
          name="content"
          placeholder="Content"
          onChange={fieldHandler}
          defaultValue={post.content}
        ></textarea>
        <br />
        <button type="submit">Save Changes</button>
        <div>Status: {status}</div>
      </form>
    </div>
  );
}
