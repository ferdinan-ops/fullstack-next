import Router from "next/router";
import { useState } from "react";
import { authPage } from "../../middlewares/authorizationPage";
import Nav from "../../components/nav";

export async function getServerSideProps(ctx) {
  const { token } = await authPage(ctx);

  const postReq = await fetch("http://localhost:3000/api/posts/", {
    headers: { Authorization: `Bearer ${token}` },
  });

  const posts = await postReq.json();
  return { props: { posts: posts.data, token } };
}

export default function PostIndex(props) {
  const [posts, setPosts] = useState(props.posts);

  const deleteHandler = async (id, e) => {
    e.preventDefault();
    const { token } = props;
    const ask = confirm("Apakah Anda Yakin, Ingin Menghapus Data ini?");
    if (ask) {
      const deleteReq = await fetch(`/api/posts/delete/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const deleteRes = await deleteReq.json();

      // update state utk single page tanpa reload
      const postFiltered = posts.filter((post) => post.id !== id);
      setPosts(postFiltered);
    }
  };

  const editHandler = (id) => {
    Router.push(`/posts/edit/${id}`);
  };

  return (
    <div style={{ padding: "0 20px" }}>
      <Nav />
      <h1>Posts</h1>
      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <div>
              <button onClick={editHandler.bind(this, post.id)}>Edit</button>
              <button onClick={deleteHandler.bind(this, post.id)}>
                Delete
              </button>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
}
